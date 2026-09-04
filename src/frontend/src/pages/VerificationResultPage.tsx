import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  FileSearch,
  Fingerprint,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  type DocumentType,
  type ExtractedField,
  type RiskIndicator,
  type VerificationRecord,
  type VerificationStatus,
  getVerificationById,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

const DOCUMENT_ICONS: Record<DocumentType, typeof FileSearch> = {
  Aadhaar: Fingerprint,
  PAN: FileSearch,
  Passport: ScanSearch,
  "Driving License": FileSearch,
  "Voter ID": FileSearch,
};

const STATUS_ICONS: Record<VerificationStatus, typeof ShieldCheck> = {
  verified: ShieldCheck,
  suspicious: ShieldAlert,
  fake: ShieldX,
};

const STATUS_ACCENT: Record<
  VerificationStatus,
  { ring: string; glow: string; text: string }
> = {
  verified: {
    ring: "text-emerald-500",
    glow: "bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  suspicious: {
    ring: "text-amber-500",
    glow: "bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  fake: {
    ring: "text-rose-500",
    glow: "bg-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
  },
};

const RISK_TONE: Record<
  RiskIndicator["severity"],
  { badge: string; dot: string; label: string }
> = {
  low: {
    badge:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    label: "Low",
  },
  medium: {
    badge:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    label: "Medium",
  },
  high: {
    badge: "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
    label: "High",
  },
};

interface AiAnalysis {
  title: string;
  description: string;
  score: number;
  verdict: string;
  icon: typeof Sparkles;
  tone: "success" | "warning" | "danger";
}

function buildAiAnalysis(record: VerificationRecord): AiAnalysis[] {
  const base = record.confidence;
  return [
    {
      title: "Document Authenticity",
      description:
        "Structural integrity, security features and issuer holograms cross-checked against known templates.",
      score: Math.max(0, Math.min(100, base + 0.6)),
      verdict: record.status === "fake" ? "Not authentic" : "Authentic",
      icon: ShieldCheck,
      tone: record.status === "fake" ? "danger" : "success",
    },
    {
      title: "Face Match",
      description:
        "Portrait compared against the document photo for biometric consistency and liveness cues.",
      score: Math.max(0, Math.min(100, base - 1.2)),
      verdict: record.status === "suspicious" ? "Review needed" : "Matched",
      icon: Fingerprint,
      tone: record.status === "suspicious" ? "warning" : "success",
    },
    {
      title: "Tamper Detection",
      description:
        "Pixel-level analysis for cloned regions, spliced edges and altered text or photo areas.",
      score: Math.max(0, Math.min(100, base - 2.4)),
      verdict: record.status === "fake" ? "Tampering found" : "No tampering",
      icon: ScanSearch,
      tone: record.status === "fake" ? "danger" : "success",
    },
    {
      title: "Data Consistency",
      description:
        "Extracted fields validated against registry records and cross-field logical checks.",
      score: Math.max(0, Math.min(100, base - 0.8)),
      verdict: record.status === "verified" ? "Consistent" : "Inconsistent",
      icon: FileSearch,
      tone: record.status === "verified" ? "success" : "warning",
    },
  ];
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CircularGauge({
  value,
  status,
}: {
  value: number;
  status: VerificationStatus;
}) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const accent = STATUS_ACCENT[status];

  return (
    <div className="relative flex items-center justify-center">
      <svg
        data-ocid="confidence_gauge"
        width="148"
        height="148"
        viewBox="0 0 148 148"
        role="img"
        aria-label={`Confidence score ${value.toFixed(1)} percent`}
      >
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-muted/60"
        />
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 74 74)"
          className={cn("transition-all duration-1000 ease-out", accent.ring)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-bold tracking-tight text-foreground">
          {value.toFixed(1)}
          <span className="text-lg text-muted-foreground">%</span>
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Confidence
        </span>
      </div>
    </div>
  );
}

function DocumentPreview({ record }: { record: VerificationRecord }) {
  const Icon = DOCUMENT_ICONS[record.documentType];
  const accent = STATUS_ACCENT[record.status];

  return (
    <GlassCard strong className="relative overflow-hidden p-6">
      <div
        className={cn(
          "absolute -right-10 -top-10 size-40 rounded-full blur-3xl",
          accent.glow,
        )}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-xl text-white shadow-sm">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {record.documentType}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {record.documentNumber}
            </p>
          </div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      {/* Stylized document */}
      <div
        data-ocid="document_preview"
        className="relative mx-auto mt-6 aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 shadow-inner"
      >
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex items-center justify-between">
            <span className="bg-brand-gradient flex size-8 items-center justify-center rounded-lg text-white">
              <Icon className="size-4" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {record.documentType}
            </span>
          </div>

          <div className="mt-4 flex flex-1 items-center justify-center">
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-full border-2 border-dashed",
                accent.ring,
              )}
            >
              <Icon className={cn("size-8", accent.ring)} />
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-muted/70" />
            <div className="h-1.5 w-1/2 rounded-full bg-muted/50" />
            <div className="h-1.5 w-2/3 rounded-full bg-muted/50" />
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-muted/40 pt-2">
            <span className="text-[9px] text-muted-foreground">
              {record.holderName}
            </span>
            <span className="text-[9px] font-mono text-muted-foreground">
              {record.documentNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">Submitted</p>
          <p className="mt-0.5 text-xs font-medium text-foreground">
            {formatDateTime(record.submittedAt)}
          </p>
        </div>
        <div className="rounded-xl bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">Verified</p>
          <p className="mt-0.5 text-xs font-medium text-foreground">
            {formatDateTime(record.verifiedAt)}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function ExtractedFieldRow({
  field,
  index,
}: {
  field: ExtractedField;
  index: number;
}) {
  return (
    <div
      data-ocid={`extracted_field.${index + 1}`}
      className="flex flex-col gap-1.5 border-b py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {field.label}
        </p>
        <p className="mt-0.5 break-words font-medium text-foreground">
          {field.value}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:w-40 sm:shrink-0">
        <ProgressBar value={field.confidence} className="flex-1" />
        <span className="w-11 shrink-0 text-right font-mono text-xs text-muted-foreground">
          {field.confidence.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function AiAnalysisCard({
  analysis,
  index,
}: {
  analysis: AiAnalysis;
  index: number;
}) {
  const Icon = analysis.icon;
  const tone =
    analysis.tone === "success"
      ? "text-emerald-600 dark:text-emerald-400"
      : analysis.tone === "warning"
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  return (
    <GlassCard
      interactive
      data-ocid={`ai_analysis_card.${index + 1}`}
      className="flex flex-col gap-3 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gradient flex size-10 shrink-0 items-center justify-center rounded-xl text-white">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              {analysis.title}
            </p>
            <p className={cn("text-xs font-medium", tone)}>
              {analysis.verdict}
            </p>
          </div>
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          {analysis.score.toFixed(0)}
          <span className="text-sm text-muted-foreground">%</span>
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {analysis.description}
      </p>
      <ProgressBar
        value={analysis.score}
        indicatorClassName={
          analysis.tone === "success"
            ? "bg-emerald-500"
            : analysis.tone === "warning"
              ? "bg-amber-500"
              : "bg-rose-500"
        }
      />
    </GlassCard>
  );
}

function RiskIndicatorRow({
  risk,
  index,
}: {
  risk: RiskIndicator;
  index: number;
}) {
  const tone = RISK_TONE[risk.severity];
  return (
    <div
      data-ocid={`risk_indicator.${index + 1}`}
      className="flex items-center justify-between gap-3 border-b py-3 last:border-0"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            tone.badge,
          )}
        >
          <TriangleAlert className="size-4" />
        </span>
        <p className="min-w-0 break-words text-sm font-medium text-foreground">
          {risk.label}
        </p>
      </div>
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
          tone.badge,
        )}
      >
        <span
          className={cn("size-1.5 rounded-full", tone.dot)}
          aria-hidden="true"
        />
        {tone.label}
      </span>
    </div>
  );
}

export function VerificationResultPage() {
  const { id } = useParams({ from: "/app-layout/verify/$id" });
  const record = getVerificationById(id);

  if (!record) {
    return (
      <div
        data-ocid="verification_result_page"
        className="flex flex-col items-center justify-center gap-4 py-24 text-center"
      >
        <span className="bg-brand-gradient flex size-16 items-center justify-center rounded-2xl text-white shadow-sm">
          <FileSearch className="size-8" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Verification not found
          </h1>
          <p className="mt-1 max-w-md text-muted-foreground">
            We couldn't find a verification record matching that ID. It may have
            been removed or the link may be incorrect.
          </p>
        </div>
        <Button
          data-ocid="back_to_dashboard_button"
          asChild
          size="lg"
          className="bg-brand-gradient border-0 text-white shadow-sm hover:opacity-90"
        >
          <Link to="/dashboard">
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const StatusIcon = STATUS_ICONS[record.status];
  const accent = STATUS_ACCENT[record.status];
  const aiAnalysis = buildAiAnalysis(record);

  return (
    <div data-ocid="verification_result_page" className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          data-ocid="back_button"
          variant="ghost"
          size="sm"
          asChild
          className="w-fit text-muted-foreground"
        >
          <Link to="/dashboard">
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="bg-brand-gradient flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm">
              <StatusIcon className="size-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {record.documentType} Verification
                </h1>
                <StatusBadge status={record.status} />
              </div>
              <p className="mt-1 text-muted-foreground">
                {record.holderName} · {record.documentNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-sm">
            <BadgeCheck className={cn("size-4", accent.text)} />
            <span className="text-muted-foreground">Result ID</span>
            <span className="font-mono font-medium text-foreground">
              {record.id}
            </span>
          </div>
        </div>
      </div>

      {/* Top grid: preview + confidence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DocumentPreview record={record} />
        </div>

        <GlassCard
          strong
          className="flex flex-col items-center justify-center gap-5 p-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-accent" />
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Overall Confidence
            </h2>
          </div>
          <CircularGauge value={record.confidence} status={record.status} />
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            {record.status === "verified" &&
              "This document passed all authenticity checks with high confidence."}
            {record.status === "suspicious" &&
              "Some checks returned inconclusive results. Manual review is recommended."}
            {record.status === "fake" &&
              "Multiple critical checks failed. This document is likely fraudulent."}
          </p>
        </GlassCard>
      </div>

      {/* Extracted information */}
      <GlassCard className="p-6">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-lg text-white">
            <FileSearch className="size-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Extracted Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Fields read from the document with per-field confidence.
            </p>
          </div>
        </div>
        <div className="mt-4">
          {record.extractedFields.map((field, index) => (
            <ExtractedFieldRow key={field.label} field={field} index={index} />
          ))}
        </div>
      </GlassCard>

      {/* AI analysis */}
      <section data-ocid="ai_analysis_section" aria-label="AI analysis">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-lg text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              AI Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              Static authenticity checks performed on this document.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {aiAnalysis.map((analysis, index) => (
            <AiAnalysisCard
              key={analysis.title}
              analysis={analysis}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Risk indicators */}
      <GlassCard className="p-6">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-lg text-white">
            <ShieldAlert className="size-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Risk Indicators
            </h2>
            <p className="text-sm text-muted-foreground">
              Flags raised during the verification process, by severity.
            </p>
          </div>
        </div>
        <div className="mt-4">
          {record.riskIndicators.length > 0 ? (
            record.riskIndicators.map((risk, index) => (
              <RiskIndicatorRow key={risk.label} risk={risk} index={index} />
            ))
          ) : (
            <p className="py-4 text-sm text-muted-foreground">
              No risk indicators were raised for this document.
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
