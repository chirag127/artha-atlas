# 🇮🇳 Artha Atlas (अर्थ एटलस)

> **Every Indian investment avenue — tax, returns, risks, laws — compared honestly.**

[![Deploy Artha Atlas to GitHub Pages](https://github.com/chirag127/artha-atlas/actions/workflows/deploy.yml/badge.svg)](https://github.com/chirag127/artha-atlas/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Verified for Indian FY 2026-27](https://img.shields.io/badge/Tax%20Rules-FY%202026--27-emerald.svg)](https://incometax.gov.in)

Artha Atlas is an encyclopedia, quant-finance comparative engine, and regulatory guide covering every major investment avenue available to Indian citizens and NRIs.

---

## 🎯 Mission & Philosophy

Most Indian finance portals suffer from one of two vices:
1. **Institutional Sales Pitch**: Sanitized brochures designed to push high-commission ULIPs, regular-plan mutual funds, or speculative F&O accounts.
2. **Finfluencer Hype**: Unregistered, unregulated claims promising "15% risk-free returns" without disclosing credit defaults, illiquidity locks, or catastrophic drawdowns.

**Artha Atlas exists to provide the unvarnished mathematical truth**:
- **Gross vs Real Post-Tax Returns**: Every return number is scrutinized after accounting for Indian inflation (6-7%) and the current tax regime (Income-tax Act 2025/1961 updates).
- **Failure Modes & Case Studies**: From Franklin Templeton's 2020 debt freeze to the collapse of PACL, Saradha, and DHFL, we document exactly how and why capital is lost.
- **Regulatory Grounding**: Every avenue references primary statutes from SEBI, RBI, PFRDA, IRDAI, and the Ministry of Corporate Affairs.

---

## 🧭 Key Features & Sections

| Route | Feature | Description |
| :--- | :--- | :--- |
| **`/`** | **Home** | The Financial Atlas dashboard, asset class risk-return frontier, and featured masterclasses. |
| **`/start-here/`** | **The Investor Journey** | Step-by-step roadmap: Emergency fund -> Health/Term Insurance -> Asset Allocation. |
| **`/avenues/`** | **The Avenues Directory** | Complete catalog of 40+ investment instruments grouped across 8 asset classes. |
| **`/compare/`** | **Comparative Engine** | High-performance TanStack table comparing returns, risk tier, tax, liquidity, and ticket size. |
| **`/allocation/`** | **Asset Allocation Lab** | Interactive allocation modeler with Monte Carlo simulations and Indian inflation glidepaths. |
| **`/calculators/`** | **Quant Calculators** | Client-side financial calculators: SIP, SWP, XIRR, CAGR, Post-tax Yield, and Home Loan Prepay vs SIP. |
| **`/tax/`** | **Indian Tax Centre** | FY 2026-27 capital gains rates, holding periods, grandfathering rules, and Section mappings. |
| **`/laws-and-regulators/`** | **Statutory Hub** | Guide to SEBI, RBI, PFRDA, IRDAI, SCORES 2.0, and investor complaint mechanisms. |
| **`/scams-and-fraud/`** | **How Money Really Works**| Anatomy of Ponzi schemes, BUDS Act 2019, front-running, and real forensic case studies. |
| **`/books/`** | **Indian Finance Library** | Curated catalog of essential Indian and global financial literature categorized by domain. |
| **`/glossary/`** | **Financial Dictionary** | 500+ Indian and quantitative financial terms with instant search and hover explanations. |
| **`/about/`** | **About the Author** | Background on Chirag Singhal, editorial standards, and contact channels. |

---

## 🛠️ Technology Stack

- **Framework**: [Astro 5](https://astro.build/) static output for lightning-fast edge delivery.
- **UI Islands**: [React 19](https://react.dev/) for interactive tables, calculators, and search modals.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a bespoke editorial "Financial Atlas" color palette.
- **Mathematical Equations**: `remark-math` + `rehype-katex` for rendering LaTeX formulas directly at build time.
- **Diagrams**: Mermaid.js for structural flows, settlement cycles, and legal hierarchies.
- **Data Engine**: Headless `@tanstack/react-table` for multi-column sort, filter, and CSV exports.
- **Search**: Fully static client-side indexing.

---

## 👤 Author & Contact

- **Author**: Chirag Singhal
- **Email**: [chirag@oriz.in](mailto:chirag@oriz.in)
- **GitHub**: [@chirag127](https://github.com/chirag127)
- **Facebook**: [singhal127](https://facebook.com/singhal127)
- **Support the Project**: [Buy Me a Coffee](https://buymeacoffee.com/chirag127)

---

## ⚖️ Statutory Disclaimer

*Artha Atlas is an independent educational and research portal created by Chirag Singhal. The content provided on this website does not constitute financial, legal, investment, or tax advice. The author is not a SEBI-registered investment advisor or research analyst. Historical performance is not indicative of future returns. Investments in securities, mutual funds, real estate, and market-linked instruments are subject to market risks. Readers are strongly advised to consult certified financial planners (CFP) and chartered accountants (CA) before making investment decisions.*

---

## 📄 License

Code is licensed under the [MIT License](LICENSE). Educational editorial content is licensed under [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
