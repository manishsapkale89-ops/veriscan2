import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  subtle?: boolean;
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  strong = false,
  subtle = false,
  interactive = false,
}: GlassCardProps) {
  return (
    <div
      data-ocid="glass_card"
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : subtle ? "glass-subtle" : "glass",
        interactive &&
          "transition-smooth hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-16px_rgb(59_91_219/0.32)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
