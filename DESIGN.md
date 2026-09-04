# Design Brief

## Direction

VeriScan — a premium AI identity & document screening dashboard with glassmorphism surfaces, dark-first, in a blue/white/purple security-grade palette.

## Tone

Precision-trust aesthetic: a dark indigo-navy command center with electric-blue CTAs, violet glow accents, and frosted glass cards — Stripe/Vercel polish applied to a verification workflow.

## Differentiation

Signature glass "verification card" with a live confidence ring and pulsing scan state that makes trust tangible at a glance.

## Color Palette

| Token      | OKLCH (dark)      | OKLCH (light)     | Role                          |
| ---------- | ----------------- | ----------------- | ----------------------------- |
| background | 0.14 0.025 265    | 0.985 0.008 265   | deep indigo-navy / cool white |
| foreground | 0.95 0.015 265    | 0.17 0.02 265     | primary text                  |
| card       | 0.17 0.03 265     | 1.0 0.004 265     | glass surface base            |
| primary    | 0.62 0.18 255     | 0.42 0.16 260     | electric blue (CTAs, links)   |
| accent     | 0.62 0.24 295     | 0.5 0.2 290       | vivid violet (highlights)     |
| muted      | 0.22 0.03 265     | 0.95 0.012 265    | secondary surfaces            |
| success    | 0.62 0.16 150     | 0.55 0.18 150     | verified / pass state         |
| warning    | 0.75 0.15 85      | 0.72 0.15 85      | review / flagged state        |
| destructive| 0.55 0.2 25       | 0.55 0.22 25      | rejected / fail state         |

## Typography

- Display: Space Grotesk — headings, hero, brand, metric numerals
- Body: DM Sans — paragraphs, UI labels, nav
- Mono: JetBrains Mono — confidence scores, IDs, timestamps, code-like data
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Layered glass surfaces on a gradient-orb background: `glass`/`glass-strong` translucent cards with backdrop blur, `shadow-subtle` for resting cards, `shadow-elevated` for hover/dialogs, `shadow-glass-glow` reserved for the hero verification card.

## Structural Zones

| Zone    | Background            | Border     | Notes                              |
| ------- | --------------------- | ---------- | ---------------------------------- |
| Header  | `glass` translucent   | `border-b` | sticky, backdrop blur, brand + nav |
| Content | `bg-background`       | —          | alternate `bg-muted/40` sections   |
| Footer  | `bg-muted/40`         | `border-t` | muted, quiet links                 |

## Spacing & Rhythm

Section gaps `py-24 md:py-32`; card grids `gap-6`; content max-width `max-w-7xl`; micro-spacing `gap-2/3` inside cards; generous whitespace for a premium, unhurried feel.

## Component Patterns

- Buttons: `rounded-xl`; primary `bg-gradient-primary text-primary-foreground`; hover `shadow-elevated` + translate-y; ghost `border-border`
- Cards: `rounded-2xl` glass surfaces, `border-border`, `shadow-subtle`, hover `shadow-elevated`
- Badges: `rounded-full` pills; success green for Verified, warning amber for Review, destructive red for Rejected
- Confidence ring: circular SVG progress with `--primary` stroke and JetBrains Mono numeral

## Motion

- Entrance: `animate-fade-up` staggered on hero + cards (0.6s cubic-bezier)
- Hover: `transition-smooth` — cards lift `-translate-y-1`, buttons brighten
- Decorative: `animate-float` on hero orbs, `animate-pulse-ring` on live scan state, `animate-shimmer` on progress skeletons

## Constraints

- Token-only styling — no raw hex/rgb color literals in components
- 3–5 core colors; blue/violet primary-accent, green/amber/red only for status
- Glassmorphism via `glass`/`glass-strong` utilities, not arbitrary backdrop-filter
- No real AI/OCR or auth — mock/static JSON data only
- Fully responsive mobile-first (`sm:`/`md:`/`lg:`)

## Signature Detail

The glass verification result card with a pulsing scan ring and JetBrains Mono confidence numeral — the single trust moment that defines VeriScan.
