import { AtSign } from "lucide-react";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800">
                <AtSign className="w-10 h-10 text-white" />
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Threads Post Generator
                </h1>
                <p className="text-neutral-400">
                    Turn your Shopee product details into viral Threads content instantly.
                </p>
            </div>
        </header>
    );
}
