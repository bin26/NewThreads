# Threads Post Generator (Gemini AI Powered)

A modern web application that generates viral, engagement-focused text for Threads (by Meta) using Google's Gemini AI. Simply paste your product details, and the AI crafts a "Netizen-style" post instantly.

![App Preview](./public/preview.png)

## ✨ Features

- **AI-Powered**: Uses Google's `gemini-1.5-flash` for fast, free, and high-quality generation.
- **Auto-Discovery Fallback**: Automatically finds available models if the default one isn't supported by your API Key.
- **Secure**: API Keys are stored locally in your browser (`localStorage`) and never sent to our servers.
- **Crash Protection**: Built-in Error Boundary to prevent white-screen crashes.
- **Premium UI**: Dark mode aesthetic inspired by Threads, with smooth animations and copy-to-clipboard functionality.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1.  **Clone the repository** (or download source):
    ```bash
    git clone <your-repo-url>
    cd NewThreads
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Go to `http://localhost:5173`

## 📖 Usage

1.  **Enter API Key**: Paste your Google Gemini API Key in the top input field. (One-time setup, key is saved locally).
2.  **Input Content**: Paste product title, description, or features into the large text area.
3.  **Generate**: Click the "Generate Threads Post" button.
4.  **Copy**: Click the "Copy" button on the result card and post it to Threads!

## 🛠️ Built With

- **Vite** - Next Generation Frontend Tooling
- **React** - UI Library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations
- **Google Generative AI SDK** - Integration with Gemini
