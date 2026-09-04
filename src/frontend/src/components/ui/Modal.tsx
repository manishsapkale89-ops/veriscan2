import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="modal" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle data-ocid="modal_title">{title}</DialogTitle>
          {description && (
            <DialogDescription data-ocid="modal_description">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter>
          {footer ?? (
            <>
              <Button
                data-ocid="cancel_button"
                variant="outline"
                onClick={() => {
                  onCancel?.();
                  onOpenChange(false);
                }}
              >
                {cancelLabel}
              </Button>
              <Button
                data-ocid="confirm_button"
                onClick={() => {
                  onConfirm?.();
                  onOpenChange(false);
                }}
              >
                {confirmLabel}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
