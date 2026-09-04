import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  FileScan,
  Fingerprint,
  Gauge,
  Layers,
  Lock,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ScanLine,
    title: "AI Document Screening",
    description:
      "Deep-learning models inspect every document for tampering, ghosting, and digital manipulation across 40+ authenticity signals.",
  },
  {
    icon: Fingerprint,
    title: "Identity Cross-Check",
    description:
      "Facial, biometric, and registry data are cross-referenced in real time to confirm the person matches the document.",
  },
  {
    icon: Gauge,
    title: "Confidence Scoring",
    description:
      "Every verification returns a transparent 0–100% confidence score with granular fraud indicators you can audit.",
  },
  {
    icon: Layers,
    title: "Multi-Document Support",
    description:
      "Verify passports, driving licenses, Aadhaar, PAN, and voter ID cards from a single unified screening pipeline.",
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    description:
      "Most documents are screened in under three seconds, so you can approve or flag without slowing your workflow.",
  },
  {
    icon: Lock,
    title: "Privacy-First Processing",
    description:
      "Documents are processed in isolated, encrypted sessions and never stored or shared without your explicit consent.",
  },
];

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload a document",
    description:
      "Drop in a photo or scan of any identity document. VeriScan accepts passports, licenses, and government-issued IDs.",
  },
  {
    number: "02",
    icon: FileScan,
    title: "AI analyzes authenticity",
    description:
      "Our models inspect the document for forgery, tampering, and inconsistencies while cross-checking identity data.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Get a verified result",
    description:
      "Receive a clear verdict with a confidence score, fraud indicators, and a shareable verification report.",
  },
];

const footerLinks = [
  {
    heading: "Product",
    links: ["Dashboard", "Upload", "Reports", "Settings"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API Reference", "Security", "Status"],
  },
];

const footerLinkRoutes: Record<string, string> = {
  Dashboard: "/dashboard",
  Upload: "/upload",
  Reports: "/reports",
  Settings: "/settings",
};

export function LandingPage() {
  return (
    <div data-ocid="landing_page" className="flex flex-col">
      {/* Hero */}
      <section className="bg-hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-6"
          >
            <div className="glass-subtle inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="size-4" />
              AI-powered document authenticity
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered Identity &{" "}
              <span className="text-gradient">Document Verification</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              VeriScan detects forged Aadhaar, PAN, passport, driving license,
              and voter ID documents with confidence scoring and fraud
              indicators — in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                data-ocid="primary_button"
                asChild
                size="lg"
                className="bg-brand-gradient text-white shadow-sm hover:opacity-90"
              >
                <Link to="/upload">
                  Start a verification <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                data-ocid="secondary_button"
                asChild
                size="lg"
                variant="outline"
              >
                <Link to="/dashboard">View dashboard</Link>
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="size-4 text-primary" /> 98.4% accuracy
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="size-4 text-primary" /> &lt; 3s per scan
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-4 text-primary" /> Privacy-first
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <GlassCard strong className="overflow-hidden p-0">
              <img
                src="/assets/generated/hero-verification.dim_1200x800.png"
                alt="Floating glass identity documents with a glowing blue verification shield and checkmark on a dark indigo-navy background"
                className="h-auto w-full object-cover"
              />
            </GlassCard>

            {/* Floating verified badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-strong absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-8"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <BadgeCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Document Verified</p>
                <p className="text-xs text-muted-foreground">
                  Confidence 98.4% · Authentic
                </p>
              </div>
            </motion.div>

            {/* Floating confidence gauge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-strong absolute -top-5 -right-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-8"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Gauge className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">98.4%</p>
                <p className="text-xs text-muted-foreground">
                  Confidence score
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section
        data-ocid="features_section"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to trust every document
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            VeriScan combines computer vision, biometric matching, and fraud
            analytics into one seamless screening platform.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <GlassCard interactive className="flex h-full flex-col gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        data-ocid="how_it_works_section"
        className="border-y bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Verify in three simple steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From upload to verified result in under a minute — no technical
              setup required.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="relative flex h-full flex-col gap-4 p-6">
                  <span className="font-display absolute right-6 top-6 text-4xl font-bold text-primary/15">
                    {step.number}
                  </span>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <step.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section data-ocid="cta_section" className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard
            strong
            className="bg-hero-glow relative overflow-hidden p-10 text-center sm:p-16"
          >
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-sm">
                <ShieldCheck className="size-7" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Start screening documents with confidence
              </h2>
              <p className="text-lg text-muted-foreground">
                Join teams that verify thousands of identity documents every day
                with VeriScan's AI-powered authenticity checks.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  data-ocid="cta_button"
                  asChild
                  size="lg"
                  className="bg-brand-gradient text-white shadow-sm hover:opacity-90"
                >
                  <Link to="/upload">
                    Start a verification <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  data-ocid="cta_secondary_button"
                  asChild
                  size="lg"
                  variant="outline"
                >
                  <Link to="/dashboard">Explore the dashboard</Link>
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer data-ocid="footer" className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  <ShieldCheck className="size-4" />
                </div>
                <span className="font-display text-lg font-bold">VeriScan</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                AI-powered identity and document verification that detects
                forgery with confidence scoring and fraud indicators.
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold">{group.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const route = footerLinkRoutes[link];
                    const content = (
                      <span className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                      </span>
                    );
                    return (
                      <li key={link}>
                        {route ? (
                          <Link to={route}>{content}</Link>
                        ) : (
                          <span>{content}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} VeriScan. All rights reserved.</p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              © {new Date().getFullYear()}. Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
