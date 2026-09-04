import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-hero-glow flex min-h-svh flex-col">
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-6 px-4 py-6 sm:px-6">
        {/* Desktop sidebar */}
        <aside
          data-ocid="sidebar_desktop"
          className="glass-subtle sticky top-24 hidden h-[calc(100svh-7rem)] w-64 shrink-0 rounded-2xl md:block"
        >
          <Sidebar />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="glass-strong w-72 border-r p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex justify-end p-2">
              <Button
                data-ocid="close_button"
                variant="ghost"
                size="icon"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main data-ocid="main_content" className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <footer
        data-ocid="footer"
        className="border-t bg-card/60 py-6 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 text-sm text-muted-foreground sm:flex-row">
          <span className="font-display font-semibold text-foreground">
            veriscan
          </span>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
