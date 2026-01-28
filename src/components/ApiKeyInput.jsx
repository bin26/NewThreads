import { useState, useEffect } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiKeyInput({ apiKey, setApiKey }) {
    const [isVisible, setIsVisible] = useState(false);
    const [localKey, setLocalKey] = useState(apiKey || "");

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) {
            setApiKey(storedKey);
            setLocalKey(storedKey);
        }
    }, [setApiKey]);

    const handleSave = (value) => {
        setLocalKey(value);
        setApiKey(value);
        localStorage.setItem("gemini_api_key", value);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-neutral-500 group-focus-within:text-white transition-colors" />
                </div>
                <input
                    type={isVisible ? "text" : "password"}
                    value={localKey}
                    onChange={(e) => handleSave(e.target.value)}
                    placeholder="Enter your Gemini API Key"
                    className="flex h-10 w-full rounded-xl border border-neutral-800 bg-[#121212] px-10 py-2 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-neutral-700"
                />
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white transition-colors"
                >
                    {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
            <p className="mt-2 text-xs text-neutral-600 pl-1">
                Your key is stored locally in your browser. Get one here:{" "}
                <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-500 underline hover:text-white transition-colors"
                >
                    Google AI Studio
                </a>
            </p>
        </div>
    );
}
