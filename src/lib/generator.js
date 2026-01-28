/**
 * Generates a Threads post using Google Gemini API via direct REST call.
 * This avoids potential SDK version mismatches or default config issues.
 * includes dynamic model discovery if the default model is not found (404).
 */

/**
 * Helper to list available models and find a suitable one.
 */
async function getFallbackModel(apiKey) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            // Prefer gemini models, sort by newer version logic simply
            const viableModels = data.models
                .filter(m => m.name.includes("gemini") && m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name.split("/").pop()); // extract 'gemini-pro' from 'models/gemini-pro'

            // Try to find specific preferred ones, or just take the first
            const preferred = viableModels.find(m => m.includes("flash")) || viableModels.find(m => m.includes("pro")) || viableModels[0];
            return preferred;
        }
    } catch (e) {
        console.error("Failed to list models:", e);
    }
    return null;
}

export async function generateThreadsPost(content, apiKey) {
    if (!content) return "";
    if (!apiKey) throw new Error("API Key is required");

    let modelName = "gemini-1.5-flash";

    // Helper to perform the request
    const doGenerate = async (model) => {
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const prompt = `
You are a social media expert who specializes in creating viral Threads (by Meta) posts.
Your goal is to take the following product information and turn it into a distinctively "Threads-style" post.

**Threads Style/Vibe:**
- **Casual & Authentic:** Use "Gen Z" or "Netizen" slang naturally (e.g., 家人們, 誰懂, 絕了, 勸敗).
- **Direct & Personal:** Start with a strong hook that feels like a friend sharing a secret.
- **Structured but Clean:** Use spacing and bullet points (e.g., ▫️, ✨) to make it readable.
- **Engagement Driven:** Encourage saving, sharing, or commenting without being pushy.
- **Emojis:** Use them liberally but tastefully to convey emotion.
- **Formatting:** Keep paragraphs short.

**Format Structure:**
1. **Hook:** A catchy 1-line intro (e.g., "I can't believe I found this...", "Stop scrolling 🛑").
2. **Body:** 3-4 key selling points extracted from the product info, formatted as bullet points.
3. **Opinion/Vibe:** A personal endorsement (e.g., "The quality is insane for this price").
4. **Call to Action/Outro:** A subtle nudge to check the link or save the post.

**Input Product Info:**
${content}

**Output Requirement:**
- Language: Traditional Chinese (Taiwan).
- Tone: Exciting, "Quiet Luxury" or "Hidden Gem" vibe.
- **Do NOT** include any markdown code blocks (like \`\`\`). Just return the raw text.
- **Do NOT** include placeholders like [Link].
        `;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            // If 404, throw specific error to trigger retry
            if (response.status === 404) throw new Error("MODEL_NOT_FOUND");
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
            throw new Error("No content generated.");
        }
        return data.candidates[0].content.parts[0].text;
    };

    try {
        return await doGenerate(modelName);
    } catch (error) {
        if (error.message === "MODEL_NOT_FOUND") {
            console.warn("Default model not found, attempting auto-discovery...");
            const fallbackModel = await getFallbackModel(apiKey);
            if (fallbackModel) {
                console.log("Retrying with fallback model:", fallbackModel);
                return await doGenerate(fallbackModel);
            } else {
                throw new Error("API Key Valid, but NO available Gemini models found. Check Google Cloud Project permissions.");
            }
        }
        throw error; // Rethrow if not 404 or no fallback found
    }
}
