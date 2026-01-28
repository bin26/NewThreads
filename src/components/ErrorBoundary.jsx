import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("React Error Boundary Caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#101010] text-[#F3F5F7] p-4 text-center">
                    <div className="bg-[#181818] p-8 rounded-3xl border border-red-900/50 max-w-md w-full flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                        <p className="text-neutral-400 mb-6 text-sm">
                            The application encountered a critical error.
                        </p>
                        <div className="w-full bg-black/50 p-4 rounded-xl mb-6 text-left overflow-auto max-h-[200px]">
                            <code className="text-xs text-red-400 font-mono break-all">
                                {this.state.error?.message || "Unknown Error"}
                            </code>
                        </div>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-white text-black hover:bg-neutral-200"
                        >
                            Reload Application
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
