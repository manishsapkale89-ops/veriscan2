import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  FileCheck2,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Upload", to: "/upload", icon: UploadCloud },
  { label: "Verification", to: "/verify/vs-1001", icon: FileCheck2 },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/verify/vs-1001") {
      return pathname.startsWith("/verify");
    }
    return pathname === to;
  };

  return (
    <div
      data-ocid="sidebar"
      className="flex h-full flex-col gap-6 overflow-y-auto p-4"
    >
      <div className="flex items-center gap-2.5 px-2">
        <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-xl text-white shadow-sm">
          <ShieldCheck className="size-5" />
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          veriscan
        </span>
      </div>

      <nav data-ocid="sidebar_nav" className="flex flex-col gap-1">
        <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              data-ocid={`nav_link_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth",
                active
                  ? "bg-brand-gradient text-white shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-primary/15 bg-primary/5 p-4">
        <p className="text-sm font-semibold text-foreground">
          Verification API
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          AI-powered authenticity checks with confidence scoring.
        </p>
      </div>
    </div>
  );
}
