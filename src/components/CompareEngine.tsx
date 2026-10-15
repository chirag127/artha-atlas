import React, { useState, useMemo } from 'react';

export interface AvenueItem {
  id: string;
  name: string;
  category: string;
  regulator: string;
  minTicket: number;
  lockInDays: number;
  liquidityDays: number;
  historicalReturn: string;
  volatility: string;
  maxDrawdown: string;
  expectedRealReturn: string;
  creditRisk: string;
  fraudRisk: string;
  taxation: {
    stcg: string;
    ltcg: string;
    dividendTax: string;
  };
  suitability: string;
  keyRisks: string[];
  verifiedOn: string;
}

interface Props {
  initialAvenues: AvenueItem[];
}

export default function CompareEngine({ initialAvenues }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>(['large-cap-stocks', 'index-mutual-funds', 'rbi-retail-direct-gsec']);

  const categories = useMemo(() => {
    const set = new Set(initialAvenues.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, [initialAvenues]);

  const filteredAvenues = useMemo(() => {
    return initialAvenues.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (riskFilter !== 'All') {
        if (riskFilter === 'Low' && !item.volatility.toLowerCase().includes('low') && !item.creditRisk.toLowerCase().includes('zero')) return false;
        if (riskFilter === 'High' && !item.volatility.toLowerCase().includes('high') && !item.volatility.toLowerCase().includes('extreme')) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchRegulator = item.regulator.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchRegulator) return false;
      }
      return true;
    });
  }, [initialAvenues, selectedCategory, riskFilter, searchQuery]);

  const comparisonItems = useMemo(() => {
    return initialAvenues.filter((a) => selectedIds.includes(a.id));
  }, [initialAvenues, selectedIds]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 6) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Category", "Regulator", "Min Ticket (INR)", "Lock-in (Days)", "Liquidity (Days)", "Historical Return", "Expected Real Return", "Max Drawdown", "LTCG Tax"];
    const rows = filteredAvenues.map(a => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.category,
      a.regulator,
      a.minTicket,
      a.lockInDays,
      a.liquidityDays,
      `"${a.historicalReturn}"`,
      `"${a.expectedRealReturn}"`,
      `"${a.maxDrawdown}"`,
      `"${a.taxation.ltcg}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "artha_atlas_avenues_comparison.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Search Instrument
            </label>
            <input
              type="text"
              placeholder="e.g. Nifty, SGB, REIT, G-Sec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Asset Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Risk Profile
            </label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Risk Profiles</option>
              <option value="Low">Low / Capital Preservation</option>
              <option value="High">High / Aggressive Growth</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={exportCSV}
              className="w-full text-xs font-semibold px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg border border-stone-300 dark:border-stone-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>📥 Export CSV ({filteredAvenues.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      {comparisonItems.length > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
          <div className="p-4 bg-amber-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center space-x-2">
              <span>⚖️ Side-by-Side Comparison Matrix</span>
              <span className="text-xs text-amber-600 font-sans">({comparisonItems.length} selected of max 6)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40">
                  <th className="p-3 font-semibold text-stone-500 uppercase tracking-wider w-44">Attribute</th>
                  {comparisonItems.map((item) => (
                    <th key={item.id} className="p-3 font-serif font-bold text-stone-900 dark:text-stone-100 min-w-[200px]">
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <button
                          onClick={() => toggleSelect(item.id)}
                          className="text-stone-400 hover:text-red-500 font-sans text-xs ml-2"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Category & Regulator</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">{item.category}</span>
                      <span className="block text-[11px] text-stone-500">Regulated by {item.regulator}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Historical Nominal Return</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                      {item.historicalReturn}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Expected Real Return (Post-Inflation)</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.expectedRealReturn}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Max Historical Drawdown</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 text-red-600 dark:text-red-400 font-mono">
                      {item.maxDrawdown}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Minimum Ticket Size</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 font-mono font-medium">
                      ₹{item.minTicket.toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Lock-in & Liquidity</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3">
                      <div>Lock-in: {item.lockInDays === 0 ? "None" : `${item.lockInDays} days`}</div>
                      <div className="text-[11px] text-stone-500">Settles in T+{item.liquidityDays}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">LTCG Tax Treatment</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 text-[11px] leading-relaxed">
                      {item.taxation.ltcg}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium bg-stone-50/30 dark:bg-stone-950/20">Suitability</td>
                  {comparisonItems.map((item) => (
                    <td key={item.id} className="p-3 text-[11px] text-stone-600 dark:text-stone-400">
                      {item.suitability}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Complete Sortable Table */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
          <h2 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
            All Indian Investment Avenues ({filteredAvenues.length})
          </h2>
          <span className="text-xs text-stone-500">Click row or checkbox to compare</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-950 text-stone-500 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800 font-semibold">
              <tr>
                <th className="p-3 text-center w-10">Select</th>
                <th className="p-3">Instrument</th>
                <th className="p-3">Category</th>
                <th className="p-3">Regulator</th>
                <th className="p-3">Min Ticket</th>
                <th className="p-3">Nominal Return</th>
                <th className="p-3">Real Return</th>
                <th className="p-3">Max Drawdown</th>
                <th className="p-3">Credit Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredAvenues.map((a) => {
                const isSelected = selectedIds.includes(a.id);
                return (
                  <tr
                    key={a.id}
                    onClick={() => toggleSelect(a.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-50/60 dark:bg-amber-950/20'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(a.id)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                    </td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                      {a.name}
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400">
                      {a.category}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px] text-stone-700 dark:text-stone-300">
                        {a.regulator}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-medium">
                      ₹{a.minTicket.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                      {a.historicalReturn}
                    </td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {a.expectedRealReturn}
                    </td>
                    <td className="p-3 font-mono text-red-600 dark:text-red-400">
                      {a.maxDrawdown}
                    </td>
                    <td className="p-3 text-[11px] text-stone-500">
                      {a.creditRisk}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
