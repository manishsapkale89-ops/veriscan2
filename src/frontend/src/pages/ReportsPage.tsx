import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  FileSearch,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toastSuccess } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DOCUMENT_TYPES,
  type DocumentType,
  STATUS_META,
  type VerificationStatus,
  mockVerifications,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | VerificationStatus;
type DocFilter = "all" | DocumentType;

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReportsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [docType, setDocType] = useState<DocFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockVerifications.filter((record) => {
      if (status !== "all" && record.status !== status) return false;
      if (docType !== "all" && record.documentType !== docType) return false;
      if (!q) return true;
      return (
        record.holderName.toLowerCase().includes(q) ||
        record.documentNumber.toLowerCase().includes(q)
      );
    });
  }, [query, status, docType]);

  const hasFilters =
    query.trim() !== "" || status !== "all" || docType !== "all";

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setDocType("all");
  };

  const handleExport = () => {
    toastSuccess(
      "Report exported",
      "Your verification report has been generated.",
    );
  };

  return (
    <div data-ocid="reports_page" className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Reports
          </h1>
          <p className="mt-1 text-muted-foreground">
            Review and export a history of all document verifications.
          </p>
        </div>
        <Button
          data-ocid="export_button"
          onClick={handleExport}
          className="bg-brand-gradient shrink-0 text-white shadow-sm hover:opacity-90"
        >
          <Download className="size-4" />
          Export report
        </Button>
      </div>

      {/* Toolbar */}
      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-ocid="search_input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by holder name or document number…"
              className="pl-9"
              aria-label="Search verifications"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as StatusFilter)}
            >
              <SelectTrigger
                data-ocid="status_filter"
                className="w-full sm:w-44"
                aria-label="Filter by status"
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {Object.entries(STATUS_META).map(([key, meta]) => (
                  <SelectItem key={key} value={key}>
                    {meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={docType}
              onValueChange={(v) => setDocType(v as DocFilter)}
            >
              <SelectTrigger
                data-ocid="doc_type_filter"
                className="w-full sm:w-48"
                aria-label="Filter by document type"
              >
                <SelectValue placeholder="All document types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All document types</SelectItem>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                data-ocid="clear_filters_button"
                variant="ghost"
                onClick={clearFilters}
                className="shrink-0"
              >
                <X className="size-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Results summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="size-4" />
        <span>
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          of {mockVerifications.length} verifications
        </span>
      </div>

      {/* Table */}
      <GlassCard strong className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div
            data-ocid="empty_state"
            className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center"
          >
            <span className="bg-primary/10 flex size-12 items-center justify-center rounded-2xl">
              <FileSearch className="size-6 text-primary" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                No verifications found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or clearing the active filters.
              </p>
            </div>
            <Button
              data-ocid="empty_state_action"
              variant="outline"
              onClick={clearFilters}
              className="mt-1"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-5">Document</TableHead>
                <TableHead>Holder</TableHead>
                <TableHead>Document number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-40">Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" aria-label="View" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((record, index) => (
                <TableRow
                  key={record.id}
                  data-ocid={`reports_row_${index + 1}`}
                  className="group"
                >
                  <TableCell className="px-5">
                    <span className="font-medium text-foreground">
                      {record.documentType}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {record.holderName}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {record.documentNumber}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(record.verifiedAt)}
                  </TableCell>
                  <TableCell className="w-40">
                    <ProgressBar
                      value={record.confidence}
                      showLabel
                      label="Confidence"
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="w-10">
                    <Link
                      to="/verify/$id"
                      params={{ id: record.id }}
                      data-ocid={`reports_link_${index + 1}`}
                      aria-label={`View verification for ${record.holderName}`}
                      className={cn(
                        "text-muted-foreground transition-colors hover:text-primary",
                      )}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </GlassCard>
    </div>
  );
}
