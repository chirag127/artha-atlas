import React, { useState, useEffect, useRef } from 'react';

interface SearchItem {
  title: string;
  url: string;
  category: string;
  snippet: string;
}

const DEFAULT_INDEX: SearchItem[] = [
  { title: "Home: The Financial Atlas", url: "/artha-atlas/", category: "Overview", snippet: "Dashboard of all Indian investment avenues, risk frontiers, and asset classes." },
  { title: "Start Here: The Investor Roadmap", url: "/artha-atlas/start-here/", category: "Guide", snippet: "Emergency fund, health insurance, term insurance, and asset allocation foundations." },
  { title: "The Avenues Directory", url: "/artha-atlas/avenues/", category: "Catalog", snippet: "Complete catalog of all 40+ Indian investment instruments and asset classes." },
  { title: "Comparison Engine", url: "/artha-atlas/compare/", category: "Tool", snippet: "Sortable, filterable TanStack comparison table across returns, taxes, risks, and lock-ins." },
  { title: "Asset Allocation Lab", url: "/artha-atlas/allocation/", category: "Tool", snippet: "Interactive Monte Carlo simulator for Indian inflation, SWR, and glidepaths." },
  { title: "Quant Calculators", url: "/artha-atlas/calculators/", category: "Tool", snippet: "SIP, SWP, CAGR, XIRR, Post-tax real return, and prepayment calculators." },
  { title: "Indian Tax Centre (FY 2026-27)", url: "/artha-atlas/tax/", category: "Tax", snippet: "Current capital gains tax rates, holding periods, grandfathering rules, and section mappings." },
  { title: "Statutory Regulators (SEBI, RBI, PFRDA)", url: "/artha-atlas/laws-and-regulators/", category: "Legal", snippet: "Mandates of SEBI, RBI, PFRDA, IRDAI, SCORES 2.0, and investor complaint mechanisms." },
  { title: "How Money Really Works: Scams & Fraud", url: "/artha-atlas/scams-and-fraud/", category: "Forensics", snippet: "BUDS Act 2019, Ponzi schemes, front-running, and real forensic case studies." },
  { title: "Financial Glossary (500+ Terms)", url: "/artha-atlas/glossary/", category: "Reference", snippet: "Searchable dictionary of Indian and quant finance terms, formulas, and definitions." },
  { title: "Curated Indian Financial Books", url: "/artha-atlas/books/", category: "Reference", snippet: "Essential reading list on Indian capital markets, taxation, and investing history." },
  { title: "Pillar: Indian Public Equities Complete Guide", url: "/artha-atlas/blog/indian-equity-investing-complete-guide/", category: "Equities", snippet: "Large, mid, small, and micro caps; factor investing; and survivorship bias." },
  { title: "Pillar: Indian Mutual Funds & ETFs Master Guide", url: "/artha-atlas/blog/indian-mutual-funds-and-etfs-master-guide/", category: "Mutual Funds", snippet: "SEBI fund categories, TER drag, direct vs regular math, and portfolio overlap." },
  { title: "Pillar: Fixed Income & Sovereign Debt", url: "/artha-atlas/blog/indian-fixed-income-and-bonds-guide/", category: "Fixed Income", snippet: "RBI Retail Direct, G-Secs, T-Bills, corporate NCDs, and duration risk." },
  { title: "Pillar: Real Estate, REITs & SM REITs", url: "/artha-atlas/blog/indian-real-estate-and-reits-guide/", category: "Real Estate", snippet: "Commercial REITs, SM REIT fractional platforms, RERA, and rental yields." },
  { title: "Pillar: Gold, Silver & SGB Secondary Market", url: "/artha-atlas/blog/gold-and-silver-investing-india-guide/", category: "Precious Metals", snippet: "Physical gold, ETFs, and the legacy tax advantages of Sovereign Gold Bonds." },
  { title: "Pillar: High-Return Alternatives (AIF, PMS, Private Credit)", url: "/artha-atlas/blog/alternative-investments-aif-pms-private-credit-india/", category: "Alternatives", snippet: "SEBI accredited investor avenues, fee hurdles, and private debt risk." },
  { title: "Pillar: FIRE in India (Safe Withdrawal Rates)", url: "/artha-atlas/blog/fire-financial-independence-retire-early-india-guide/", category: "Personal Finance", snippet: "Sequence-of-returns risk, Indian inflation (6-7%), and the 3-bucket strategy." },
  { title: "Pillar: Financial Scams, Fraud & Investor Protection", url: "/artha-atlas/blog/financial-scams-fraud-laws-india-investor-protection/", category: "Legal & Fraud", snippet: "Ponzi schemes, BUDS Act 2019, Saradha, Sahara, and PACL case studies." }
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>(DEFAULT_INDEX);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleExternalTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    const btn = document.getElementById('search-open-btn');
    btn?.addEventListener('click', handleExternalTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      btn?.removeEventListener('click', handleExternalTrigger);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(DEFAULT_INDEX.slice(0, 8));
      return;
    }
    const q = query.toLowerCase();
    const filtered = DEFAULT_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-stone-200 dark:border-stone-800">
          <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search guides, asset classes, tax laws, formulas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none text-sm"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 px-2 py-1 rounded border border-stone-200 dark:border-stone-700"
          >
            ESC
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-stone-500 dark:text-stone-400">
              No matching pages or avenues found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className="block p-3 rounded-lg hover:bg-amber-50/70 dark:hover:bg-stone-800/80 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                  {item.snippet}
                </p>
              </a>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-950/50 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 flex justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>Artha Atlas Instant Search</span>
        </div>
      </div>
    </div>
  );
}
