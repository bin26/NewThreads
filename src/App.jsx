import { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { generateThreadsPost } from '@/lib/generator';
import ApiKeyInput from '@/components/ApiKeyInput';
import { Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!input.trim()) return;
        if (!apiKey) {
            setError('Please enter your Gemini API Key first.');
            return;
        }

        setLoading(true);
        setResult('');
        setError('');

        try {
            const post = await generateThreadsPost(input, apiKey.trim());
            setResult(post);
        } catch (e) {
            console.error(e);
            const msg = e?.message || (typeof e === 'string' ? e : 'Something went wrong. Please check your API key.');
            setError(String(msg));
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#101010] text-[#F3F5F7] font-sans selection:bg-neutral-800">
            <div className="container max-w-2xl mx-auto px-4 pb-20">
                <Header />
                <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

                <main className="space-y-8">
                    {/* Input Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-neutral-400 pl-1">
                                Product Content
                            </label>
                            <span className="text-xs text-neutral-600">Paste title & description</span>
                        </div>
                        <Card className="border-neutral-800 bg-neutral-900/50 focus-within:ring-1 focus-within:ring-neutral-700 transition-all">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste Shopee product title and description here...&#10;Example: &#10;AirPods Pro 2nd Generation&#10;Active Noise Cancellation&#10;Adaptive Transparency..."
                                className="bg-transparent border-none focus-visible:ring-0 min-h-[160px] text-base leading-relaxed"
                            />
                        </Card>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            onClick={handleGenerate}
                            disabled={loading || !input.trim()}
                            size="lg"
                            className="w-full font-bold text-base shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] transition-all duration-300"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 animate-spin" />
                                    Magic Generating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Generate Threads Post
                                </span>
                            )}
                        </Button>
                    </section>

                    {/* Result Section */}
                    <AnimatePresence>
                        {result && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div className="flex items-center justify-between mb-4 pl-1">
                                    <label className="text-sm font-medium text-neutral-400">
                                        Preview
                                    </label>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setResult('')}
                                            className="text-neutral-500 hover:text-red-400"
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                </div>

                                <Card className="overflow-hidden bg-[#181818] border-[#333333]">
                                    <CardContent className="p-0">
                                        <div className="flex p-4 gap-3 border-b border-[#262626]">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-orange-400 flex-shrink-0" />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-sm">user_name</span>
                                                    <span className="text-neutral-500 text-xs">now</span>
                                                </div>
                                                <p className="whitespace-pre-wrap text-[15px] leading-6 text-[#F3F5F7]">
                                                    {result}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-[#101010] p-4 flex justify-between items-center">
                                            <span className="text-xs text-neutral-600">Simulation Preview</span>
                                            <Button
                                                variant={copied ? "default" : "outline"}
                                                size="sm"
                                                onClick={handleCopy}
                                                className={cn(
                                                    "transition-all duration-300",
                                                    copied ? "bg-green-500 hover:bg-green-600 text-white border-transparent" : "border-neutral-700"
                                                )}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-4 h-4 mr-2" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Copy Text
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}

export default App
