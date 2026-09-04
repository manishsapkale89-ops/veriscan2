import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header
      data-ocid="navbar"
      className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 sm:px-6"
    >
      <Button
        data-ocid="mobile_menu_button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open navigation menu"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>

      <Link data-ocid="brand_link" to="/" className="flex items-center gap-2.5">
        <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-xl text-white shadow-sm">
          <ShieldCheck className="size-5" />
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          veriscan
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <Button
          data-ocid="upload_button"
          asChild
          className="bg-brand-gradient text-white shadow-sm hover:opacity-90"
        >
          <Link to="/upload">New Verification</Link>
        </Button>
      </div>
    </header>
  );
}
