import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  FileX2,
  Files,
  ShieldAlert,
  UploadCloud,
} from "lucide-react";
import { useEffect, useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
} from "@/components/ui/LoadingSkeleton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  type VerificationRecord,
  getDashboardStats,
  mockVerifications,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: number;
  icon: typeof Files;
  iconClass: string;
  accentClass: string;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCardView({ stat }: { stat: StatCard }) {
  const Icon = stat.icon;
  return (
    <GlassCard interactive className="group relative overflow-hidden p-5">
      <div
        className={cn(
          "absolute -right-6 -top-6 size-24 rounded-full blur-2xl transition-opacity",
          stat.accentClass,
        )}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>
          <p className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground">
            {stat.value}
          </p>
        </div>
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            stat.iconClass,
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </GlassCard>
  );
}

export function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const stats = getDashboardStats();

  const statCards: StatCard[] = [
    {
      label: "Total Verifications",
      value: stats.total,
      icon: Files,
      iconClass: "bg-primary/15 text-primary",
      accentClass: "bg-primary/20",
    },
    {
      label: "Verified",
      value: stats.verified,
      icon: FileCheck2,
      iconClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      accentClass: "bg-emerald-500/20",
    },
    {
      label: "Suspicious",
      value: stats.suspicious,
      icon: ShieldAlert,
      iconClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      accentClass: "bg-amber-500/20",
    },
    {
      label: "Fake",
      value: stats.fake,
      icon: FileX2,
      iconClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
      accentClass: "bg-rose-500/20",
    },
  ];

  return (
    <div data-ocid="dashboard_page" className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your document verification activity.
          </p>
        </div>
        <Button
          data-ocid="upload_button"
          asChild
          size="lg"
          className="bg-brand-gradient border-0 text-white shadow-sm hover:opacity-90"
        >
          <Link to="/upload">
            <UploadCloud className="size-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      {/* Statistics cards */}
      {loading ? (
        <section
          data-ocid="stats_skeleton"
          aria-label="Loading verification statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {["total", "verified", "suspicious", "fake"].map((key) => (
            <SkeletonCard key={key} />
          ))}
        </section>
      ) : (
        <section
          data-ocid="stats_section"
          aria-label="Verification statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {statCards.map((stat) => (
            <StatCardView key={stat.label} stat={stat} />
          ))}
        </section>
      )}

      {/* Recent documents */}
      <GlassCard className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b p-5">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Recent Documents
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest verification results across your workspace.
            </p>
          </div>
          <Button
            data-ocid="view_all_button"
            variant="ghost"
            size="sm"
            asChild
            className="shrink-0"
          >
            <Link to="/reports">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div data-ocid="recent_skeleton" className="p-5">
            <SkeletonTable rows={5} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              data-ocid="recent_table"
              className="w-full min-w-[720px] text-sm"
            >
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Document</th>
                  <th className="px-5 py-3 font-medium">Holder</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Confidence</th>
                  <th className="px-5 py-3 font-medium">Verified</th>
                  <th className="px-5 py-3 text-right font-medium">Detail</th>
                </tr>
              </thead>
              <tbody>
                {mockVerifications.map((record, index) => (
                  <RecentRow key={record.id} record={record} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function RecentRow({
  record,
  index,
}: {
  record: VerificationRecord;
  index: number;
}) {
  return (
    <tr
      data-ocid={`recent_row.${index + 1}`}
      className="border-b transition-colors last:border-0 hover:bg-muted/40"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gradient flex size-9 shrink-0 items-center justify-center rounded-lg text-white">
            <Files className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {record.documentType}
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {record.documentNumber}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-foreground">{record.holderName}</td>
      <td className="px-5 py-4">
        <StatusBadge status={record.status} />
      </td>
      <td className="px-5 py-4">
        <ProgressBar
          value={record.confidence}
          className="w-28"
          showLabel
          label="Confidence"
        />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
        {formatDate(record.verifiedAt)}
      </td>
      <td className="px-5 py-4 text-right">
        <Button
          data-ocid={`detail_link.${index + 1}`}
          variant="ghost"
          size="icon"
          asChild
          aria-label={`View details for ${record.documentType} of ${record.holderName}`}
        >
          <Link to="/verify/$id" params={{ id: record.id }}>
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </td>
    </tr>
  );
}
