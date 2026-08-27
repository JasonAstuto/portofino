import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-slate-100 text-slate-700": variant === "default",
          "border border-slate-300 text-slate-600": variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
