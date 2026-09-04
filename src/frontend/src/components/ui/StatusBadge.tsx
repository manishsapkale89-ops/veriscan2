import { Badge } from "@/components/ui/badge";
import { STATUS_META, type VerificationStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";

const toneClasses: Record<
  "success" | "warning" | "danger",
  { badge: string; dot: string }
> = {
  success: {
    badge:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  warning: {
    badge:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  danger: {
    badge: "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

interface StatusBadgeProps {
  status: VerificationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = STATUS_META[status];
  const tone = toneClasses[meta.tone];
  return (
    <Badge
      data-ocid="status_badge"
      variant="outline"
      className={cn("gap-1.5 font-medium", tone.badge, className)}
    >
      <span
        data-ocid="status_dot"
        className={cn("size-1.5 rounded-full", tone.dot)}
        aria-hidden="true"
      />
      {meta.label}
    </Badge>
  );
}
