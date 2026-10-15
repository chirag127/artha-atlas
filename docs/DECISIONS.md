# Architectural & Design Decisions: Artha Atlas

**Date**: 2026-10-15  
**Author**: Chirag Singhal / Antigravity AI Engine  
**Status**: Adopted  

---

## 1. Core Identity & Branding
- **Site Name**: Artha Atlas
- **Tagline**: "Every Indian investment avenue — tax, returns, risks, laws — compared honestly."
- **Repository**: `chirag127/artha-atlas`
- **Hosting Target**: GitHub Pages at `https://chirag127.github.io/artha-atlas/` (Site: `https://chirag127.github.io`, Base: `/artha-atlas`)
- **Author**: Chirag Singhal (`chirag@oriz.in`)
- **Links**:
  - Support: `https://buymeacoffee.com/chirag127`
  - GitHub: `https://github.com/chirag127`
  - Facebook: `https://facebook.com/singhal127`

---

## 2. Design System & Aesthetics
- **Theme Archetype**: Editorial "Financial Atlas"
  - **Typography**: 
    - Display / Headings: Editorial Serif (`Cinzel` / `Playfair Display` / `Newsreader` font fallback stack)
    - Body: Clean Sans (`Plus Jakarta Sans` / `Inter` / system-ui)
    - Numbers / Code / Financial tables: Monospace Tabular (`JetBrains Mono` / `Fira Code` / font-variant-numeric: tabular-nums)
  - **Palette**:
    - Light Mode: Cream / Parchment background (`#FBF9F5`), Deep Ink text (`#111827`), Warm Saffron / Amber accent (`#D97706`), Imperial Emerald (`#059669`), Slate Blue secondary.
    - Dark Mode: Obsidian / Dark Charcoal (`#0B0F17`), Cream text (`#F3F4F6`), Radiant Saffron (`#F59E0B`), Vibrant Emerald (`#10B981`), Border Glow (`#1F2937`).
  - **Micro-Interactions**:
    - Animated financial counters (SIP/Lump sum/Tax impact)
    - Hover-reveal glossary tooltips for 500+ Indian financial terms
    - Reading progress bar and sticky dynamic table-of-contents
    - Mode toggle (Dark, Light, System) and Beginner / Advanced reading-mode toggle (collapsing or expanding deep quantitative analysis).

---

## 3. Technology Stack Decisions
- **Framework**: Astro 5/7 static output + `@astrojs/mdx` + `@astrojs/react`.
  - Zero-JS by default for pure reading pages; islands hydrated on `client:load` or `client:visible` for dynamic calculators, interactive comparisons, and Monte Carlo simulations.
- **Styling**: Tailwind CSS + Custom CSS Variables Design Tokens for seamless dark/light/system switching and high-contrast print stylesheets.
- **Mathematics**: `remark-math` + `rehype-katex` with preloaded KaTeX CSS and custom macros for Indian financial metrics (XIRR, CAGR, Modified Duration, YTM, Fisher real return, Kelly criterion, VaR).
- **Diagrams**: Mermaid support with automatic dark/light theme switching, build-time SVG rendering and robust client-side fallback renderer.
- **Data Tables**: `@tanstack/react-table` for multi-column sorting, fuzzy search, column pinning, risk-tier filtering, CSV/JSON export, and URL query persistence.
- **Charts**: Interactive Apache ECharts / SVG charts for asset class risk-return frontiers, SIP/SWP Monte Carlo fan charts, rolling return heatmaps, and asset allocation donuts.
- **Search**: `Pagefind` (instant full-text search with facets for risk tier, tax treatment, difficulty, and asset class).

---

## 4. Indian Regulatory & Tax Framework (FY 2026-27 & Income-tax Act 2025/1961)
- Explicit side-by-side mapping of Income-tax Act 2025 clauses alongside historical Section numbers (e.g. 111A, 112A, 115BBH, 80C, 54EC, 54F).
- Accurate capital gains rates:
  - Listed equity & equity MFs: STCG 20%, LTCG 12.5% (with ₹1.25L annual exemption).
  - Unlisted shares / Real Estate / Gold: LTCG 12.5% (holding period normalized to 24 months for RE/unlisted and 12 months for listed securities; physical gold 24 months, Gold ETF 12 months).
  - Debt mutual funds & market-linked debentures: taxed at applicable slab rate (Section 50AA treatment).
  - Virtual Digital Assets (VDA / Crypto): 30% flat tax + 1% TDS, no loss set-off across pairs.
  - SGBs: Existing secondary market tranche tax rules tracked; new sovereign issuances accounted for.
- Prominent statutory disclaimers: Not SEBI registered investment advice; educational research portal.
