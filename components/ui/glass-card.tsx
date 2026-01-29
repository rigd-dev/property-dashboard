import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    active?: boolean;
}

export function GlassCard({ children, className, active, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[24px]", // 24px rounded corners
                "bg-white/40 dark:bg-black/30",            // Translucent base
                "backdrop-blur-xl",                        // The frost effect
                "border border-white/20 dark:border-white/10", // Subtle border
                "shadow-lg shadow-black/5",                // Soft shadow
                "transition-all duration-300",
                active && "ring-2 ring-primary ring-offset-2 ring-offset-background", // Active state
                className
            )}
            {...props}
        >
            {/* Optional: subtle noise or gradient overlay could go here */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
