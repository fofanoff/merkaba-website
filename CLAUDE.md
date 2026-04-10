@AGENTS.md

# Merkaba Digital - GEO Agency Website

Domain: merkaba.vip
Stack: Next.js 16.2, React 19, Tailwind CSS v4, Framer Motion 12, TypeScript 5
Hosting: Vercel (auto-deploy from GitHub fofanoff/merkaba-website)
Dashboard: separate project at app.merkaba.vip (repo: fofanoff/merkaba-dashboard)

## Architecture

### Routing
- /[locale]/page structure with 4 locales: ru (default), en, tr, ar (RTL)
- Static params generated for all locales via generateStaticParams()
- RTL handled automatically - `dir="rtl"` set on `<html>` when locale is "ar"

### i18n
- JSON dictionaries in `src/dictionaries/` (ru.json, en.json, tr.json, ar.json)
- `getDictionary(locale)` in `src/lib/i18n.ts` - dynamic import, returns full dict
- Dictionary top-level keys: nav, hero, pain, solution, dashboard, pricing, closing, services, contact, partners, terminal, cases, about, blog, footer

### Component structure
- `src/components/sections/` - page-level sections (HeroSection, PainSection, etc.)
- `src/components/ui/` - reusable UI (HeroEffects, HeroTerminal, GradientOrbs, etc.)
- `src/components/layout/` - Header, Footer
- `src/components/SchemaOrg.tsx` - JSON-LD structured data

### Pages and routes

| Route | Components |
|---|---|
| /[locale] | HeroSection, PainSection, SolutionSection, DashboardSection, PricingSection, FaqSection, ClosingSection |
| /[locale]/services | ServicesHero, MethodologySection |
| /[locale]/cases | CasesPage |
| /[locale]/about | AboutPage |
| /[locale]/blog | BlogList |
| /[locale]/blog/[slug] | BlogArticle |
| /[locale]/partners | PartnersPage |
| /[locale]/contact | ContactForm |

### Navigation items (Header.tsx)
Home, Services, Cases, About, Blog, Partners, Contact + CTA button + language switcher

### Data
- `src/data/blog.ts` - blog post data (titles, slugs, content per locale)

### External services
- Formspree (@formspree/react) - contact and partner forms
- next-intl (v4.9) - installed but i18n is custom via getDictionary()

## Design System

### Colors (defined in globals.css @theme)
- Background: bg-primary #0B0E1A, bg-secondary #111827, bg-surface #1A1F35, bg-card #1E2445
- Brand accents: accent-purple #9B59B6, accent-indigo #6366F1, accent-blue #3B82F6, accent-pink #E879A8, accent-gold #D4A843, accent-cyan #22D3EE
- Text: text-primary #F1F5F9, text-secondary #94A3B8, text-muted #64748B
- Status: success #10B981, warning #F59E0B, danger #EF4444

### Fonts
- Heading: Space Grotesk (--font-heading)
- Body: Inter with cyrillic subset (--font-body)
- Mono: JetBrains Mono (--font-mono)

### Key CSS classes
- `btn-gradient` - pink-to-blue gradient button with hover glow
- `text-gradient` - pink-to-blue gradient text
- `text-gradient-gold` - gold gradient text
- `card-glow` - card with gradient border on hover
- `glass` - frosted glass effect (header on scroll)
- `prose-blog` - blog article typography with RTL support
- `hero-bg-pulse` - opacity 0.4-0.6 pulsation, 8s cycle
- `hero-bg-mask` - responsive radial gradient mask (wider on mobile, tighter on desktop)

## Hero Section (IMPORTANT - complex, do not break)

The hero is a full-viewport section with layered visual effects. Changes here are high-risk.

### Background layers (z-index order)
1. `z-[1]` - Background image: hero-bg.webp (desktop landscape), centered, height-constrained
2. `z-[1]` - Canvas effects (HeroEffects.tsx) - animated glows and synapses
3. `z-[2]` - Dark gradient overlays (mobile: top/bottom fade, desktop: left-fade)
4. `z-[3]` - Bottom fade to bg-primary
5. `z-[5]` - Content: left text + right terminal card

### HeroEffects.tsx - Canvas animation
- 4 purple/pink CW glows at innerOrbitR (R * 1.25), speed 0.0018 rad/frame
- 3 gold CCW glows at outerOrbitR (R * 2.2), speed -0.0012 rad/frame
- Brain breathing glow - soft pulsing radial gradient at center
- Brain synapse flashes - white sparks at random positions within brain ellipse, 0.3-0.8s spawn interval, 0.4-0.7s lifetime
- R is calculated from image height: imageH * 0.155
- Mobile detection: w < 1024

### HeroTerminal.tsx
- Fake terminal card showing AI visibility audit results
- Typing animation with staggered delays (framer-motion)
- Results: ChatGPT/Gemini/Perplexity/Claude/Copilot status from dict.terminal
- Shows score bar at 4% (danger)
- Desktop only (hidden lg:flex)

### CSS for hero
- `hero-bg-pulse`: keyframes opacity 0.4-0.6, 8s ease-in-out infinite
- `hero-bg-mask`: mobile = ellipse 120% 100%, desktop = ellipse 70% 80%
- Image uses `mixBlendMode: "lighten"`

## Public Assets
- hero-bg.webp - main hero background (flower of life + brain)
- og-image.png - Open Graph image (1200x630)
- logo.png - company logo
- llms.txt - AI crawler info file
- robots.txt, sitemap.xml - SEO
- Favicons: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome-*.png

## Key Files Reference
- `src/app/[locale]/layout.tsx` - locale layout with fonts, Header, Footer, GradientOrbs
- `src/app/[locale]/page.tsx` - homepage with all sections
- `src/app/globals.css` - theme colors, gradients, hero animations, prose styles
- `src/lib/i18n.ts` - locale config and getDictionary()
- `src/dictionaries/ru.json` - primary dictionary (all others mirror this structure)
- `src/components/sections/HeroSection.tsx` - hero layout and content
- `src/components/ui/HeroEffects.tsx` - canvas glow/synapse animations
- `src/components/ui/HeroTerminal.tsx` - terminal card component
- `src/components/SchemaOrg.tsx` - JSON-LD structured data
- `src/data/blog.ts` - blog post data

## Build and Dev
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run lint` - ESLint
- `npm run og` - generate OG image (scripts/generate-og.mjs)

## Deployment

### Website (merkaba.vip)
- Git remote: https://github.com/fofanoff/merkaba-website.git
- Branch: main
- Hosting: Vercel, auto-deploy on push to main
- To deploy: `git add <files> && git commit -m "message" && git push`
- Vercel picks up the push automatically, builds and deploys in 1-2 minutes
- No manual Vercel commands needed, no tokens, no CLI - just git push
- Always run `npx next build` before pushing to catch errors locally
- Domain: merkaba.vip (+ www.merkaba.vip redirects)
- If git remote is not set: `git remote add origin https://github.com/fofanoff/merkaba-website.git`

### Dashboard (app.merkaba.vip)
- Git remote: https://github.com/fofanoff/merkaba-dashboard.git
- Branch: main
- Separate Vercel project, same auto-deploy on push
- Working directory: /Users/arzuhan/Projects/Merkaba/dashboard
- To deploy: cd to dashboard dir, git add/commit/push
- If git remote is not set: `git remote add origin https://github.com/fofanoff/merkaba-dashboard.git`

### Deploy checklist
1. Run `npx next build` - must pass with zero errors
2. `git add` only the files you changed (not `git add -A` blindly)
3. `git commit -m "descriptive message"`
4. `git push` - Vercel auto-deploys
5. Wait 1-2 min, check the live site
6. If user reports cached old version: tell them Ctrl+Shift+R (hard refresh)

## Formatting Rules (STRICT - apply everywhere, always)

- NEVER use em-dashes "-" - only short hyphens "-"
- Section/block headings: NO trailing period on the last sentence
- Labels, short descriptions, FAQ headings, subtitles: NO trailing period
- List items and bullet points: NO trailing period
- Periods ONLY in full paragraphs (3+ sentences)
- Use straight quotes "" - never typographic/curly quotes
- Apply these rules to ALL content: dictionaries, components, copy, comments
