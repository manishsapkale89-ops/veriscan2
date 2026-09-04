import { CheckCircle2, Info, TriangleAlert, XCircle } from "lucide-react";
import { toast } from "sonner";

type ToastTone = "success" | "error" | "warning" | "info";

const toneIcons: Record<ToastTone, typeof Info> = {
  success: CheckCircle2,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
};

const toneClasses: Record<ToastTone, string> = {
  success: "text-emerald-500",
  error: "text-rose-500",
  warning: "text-amber-500",
  info: "text-primary",
};

export function showToast(
  message: string,
  tone: ToastTone = "info",
  description?: string,
) {
  const Icon = toneIcons[tone];
  toast.custom((id) => (
    <div
      data-ocid="toast"
      className="glass-strong pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl p-4"
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${toneClasses[tone]}`} />
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        type="button"
        data-ocid="toast_close"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(id)}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <XCircle className="size-4" />
      </button>
    </div>
  ));
}

export const toastSuccess = (message: string, description?: string) =>
  showToast(message, "success", description);
export const toastError = (message: string, description?: string) =>
  showToast(message, "error", description);
export const toastWarning = (message: string, description?: string) =>
  showToast(message, "warning", description);
export const toastInfo = (message: string, description?: string) =>
  showToast(message, "info", description);
