import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-white text-black hover:bg-neutral-200": variant === "default",
                    "bg-transparent text-threads-text border border-threads-border hover:bg-neutral-800": variant === "outline",
                    "hover:bg-neutral-800 text-threads-text": variant === "ghost",
                    "h-10 px-4 py-2": size === "default",
                    "h-8 rounded-full px-3": size === "sm",
                    "h-12 rounded-3xl px-8 text-base": size === "lg",
                },
                className
            )}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
