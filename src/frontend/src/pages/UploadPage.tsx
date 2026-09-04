import { useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  FileText,
  IdCard,
  Landmark,
  Plane,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toastSuccess } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import { DOCUMENT_TYPES } from "@/data/mockData";

const DOCUMENT_ICONS: Record<string, typeof IdCard> = {
  Aadhaar: IdCard,
  PAN: FileText,
  Passport: Plane,
  "Driving License": Landmark,
  "Voter ID": BadgeCheck,
};

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
];

interface SelectedFile {
  name: string;
  size: number;
  type: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function UploadPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<SelectedFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFile = useCallback((selected: File | undefined | null) => {
    if (!selected) return;
    setFile({
      name: selected.name,
      size: selected.size,
      type: selected.type || "application/octet-stream",
    });
    setProgress(0);
    setDone(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile],
  );

  const startUpload = useCallback(() => {
    if (!file || uploading) return;
    setUploading(true);
    setProgress(0);
    setDone(false);
  }, [file, uploading]);

  useEffect(() => {
    if (!uploading) return;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + Math.random() * 14 + 4);
        if (next >= 100) {
          window.clearInterval(interval);
          setUploading(false);
          setDone(true);
          toastSuccess(
            "Document uploaded",
            "Verification started. Redirecting to results…",
          );
          window.setTimeout(() => {
            navigate({ to: "/verify/$id", params: { id: "vs-1001" } });
          }, 900);
        }
        return next;
      });
    }, 180);
    return () => window.clearInterval(interval);
  }, [uploading, navigate]);

  const reset = useCallback(() => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setDone(false);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return (
    <div data-ocid="upload_page" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Upload Document
        </h1>
        <p className="text-muted-foreground">
          Submit a document for authenticity verification.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upload + progress column */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <GlassCard className="p-6">
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              data-ocid="file_input"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {!file ? (
              <button
                type="button"
                data-ocid="dropzone"
                aria-label="Upload a document"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={cnDropzone(dragOver)}
              >
                <div className="bg-brand-gradient flex size-16 items-center justify-center rounded-2xl text-white shadow-lg shadow-primary/20">
                  <UploadCloud className="size-8" />
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-semibold text-foreground">
                    Drag &amp; drop your document
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or{" "}
                    <span className="font-medium text-primary">
                      click to browse
                    </span>{" "}
                    — PNG, JPG, WEBP or PDF
                  </p>
                </div>
                <Button
                  type="button"
                  data-ocid="browse_button"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Choose file
                </Button>
              </button>
            ) : (
              <div className="flex flex-col gap-5">
                {/* File preview */}
                <div className="flex items-center gap-4">
                  <div className="bg-brand-gradient flex size-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-primary/20">
                    <FileText className="size-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      data-ocid="file_name"
                      className="truncate font-medium text-foreground"
                    >
                      {file.name}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {formatBytes(file.size)} ·{" "}
                      {file.type.split("/")[1]?.toUpperCase() ?? "FILE"}
                    </p>
                  </div>
                  {!uploading && (
                    <Button
                      type="button"
                      data-ocid="remove_file_button"
                      variant="ghost"
                      size="icon"
                      aria-label="Remove file"
                      onClick={reset}
                    >
                      <X className="size-5" />
                    </Button>
                  )}
                </div>

                {/* Progress */}
                {uploading || done ? (
                  <div className="flex flex-col gap-2">
                    <ProgressBar
                      value={progress}
                      showLabel
                      label={
                        done
                          ? "Verification started"
                          : "Uploading & analyzing document"
                      }
                      indicatorClassName="bg-brand-gradient"
                    />
                    <p className="text-xs text-muted-foreground">
                      {done
                        ? "Document accepted. Preparing results…"
                        : "Running simulated authenticity checks…"}
                    </p>
                  </div>
                ) : (
                  <Button
                    type="button"
                    data-ocid="upload_button"
                    size="lg"
                    className="w-full"
                    onClick={startUpload}
                  >
                    <UploadCloud className="size-4" />
                    Start verification
                  </Button>
                )}
              </div>
            )}
          </GlassCard>

          {/* Supported document types */}
          <GlassCard className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Supported document types
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DOCUMENT_TYPES.map((type) => {
                const Icon = DOCUMENT_ICONS[type] ?? FileText;
                return (
                  <div
                    key={type}
                    data-ocid={`doc_type_${type.toLowerCase().replace(/\s+/g, "_")}`}
                    className="glass-subtle flex items-center gap-3 rounded-xl p-3 transition-smooth hover:border-primary/30"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Info column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <GlassCard strong className="p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              How verification works
            </h2>
            <ol className="mt-4 flex flex-col gap-4">
              {[
                {
                  title: "Upload",
                  desc: "Securely upload a clear scan or photo of your document.",
                },
                {
                  title: "Analyze",
                  desc: "Our engine inspects holograms, fonts, watermarks and MRZ data.",
                },
                {
                  title: "Review",
                  desc: "Get a confidence score and a detailed authenticity report.",
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="bg-brand-gradient flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Privacy first
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your documents are processed in a sandboxed environment and never
              shared. This prototype uses simulated analysis with static sample
              data.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function cnDropzone(active: boolean): string {
  return [
    "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 text-center transition-smooth",
    active
      ? "border-primary bg-primary/10 scale-[1.01]"
      : "border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5",
  ].join(" ");
}
