# Technology Stack: Artha Atlas

**Date Checked**: 2026-10-15  
**Platform**: Node.js 26.4+ / Windows & Linux GitHub Actions runner  

| Layer / Package | Version / Selection | Rationale |
| :--- | :--- | :--- |
| **Framework** | Astro (`^5.0.0` or `^5.4.0` / latest stable) | Best-in-class static performance for content-heavy publishing, island architecture, native MDX, content collections with Zod validation. |
| **UI Components** | React (`^19.0.0` or `^18.3.1`) + `@astrojs/react` | Hydrated islands for interactive calculators, TanStack comparison tables, Monte Carlo simulations, and search modal. |
| **Styling** | Tailwind CSS + `@tailwindcss/typography` | Rapid design token expression, custom editorial typography, dynamic dark/light CSS variables, and zero-runtime CSS. |
| **Math & Equations**| `remark-math` (`^6.0.0`) + `rehype-katex` (`^7.0.1`) + `katex` (`^0.16.21` / `^0.19.0`) | Build-time TeX rendering for XIRR, CAGR, Modified Duration, Fisher Equation, Sharpe/Sortino/Treynor ratios, Black-Scholes Greeks. |
| **Diagrams** | `mermaid` (`^11.0.0`) | Architectural cash flow waterfalls, SPV trust structures (REIT/InvIT), SEBI regulatory routes, settlement cycles. |
| **Data Tables** | `@tanstack/react-table` (`^8.20.0`) | Headless data table for high-performance sorting, filtering, column pinning, and CSV export. |
| **Icons** | `lucide-react` (`^1.0.0` / latest) | Modern, clean iconography for financial metrics, risk ratings, and navigation. |
| **Full-Text Search**| `astro-pagefind` (`^1.7.0` / `^2.0.0`) | Fully static client-side indexing with sub-50ms query response and multi-dimensional faceting. |
| **Testing & E2E** | `playwright` (`^1.50.0`) + `vitest` | Cross-browser visual regression, accessibility, responsive viewport checks, and KaTeX/Mermaid SVG validation. |
