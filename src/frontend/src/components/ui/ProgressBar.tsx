import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  className,
  indicatorClassName,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono font-medium text-foreground">
            {clamped.toFixed(1)}%
          </span>
        </div>
      )}
      <div
        data-ocid="progress_bar"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={-1}
        className="bg-primary/15 h-2 w-full overflow-hidden rounded-full"
      >
        <div
          data-ocid="progress_indicator"
          className={cn(
            "h-full rounded-full transition-all duration-500",
            indicatorClassName ??
              (clamped >= 80
                ? "bg-emerald-500"
                : clamped >= 50
                  ? "bg-amber-500"
                  : "bg-rose-500"),
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
