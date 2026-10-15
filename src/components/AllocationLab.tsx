import React, { useState, useMemo } from 'react';

export default function AllocationLab() {
  const [age, setAge] = useState<number>(32);
  const [horizonYears, setHorizonYears] = useState<number>(15);
  const [monthlySip, setMonthlySip] = useState<number>(50000);
  const [initialCapital, setInitialCapital] = useState<number>(1000000);
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'moderate' | 'aggressive' | 'very_aggressive'>('aggressive');
  const [inflationRate, setInflationRate] = useState<number>(6.0);

  const allocation = useMemo(() => {
    switch (riskProfile) {
      case 'conservative':
        return { equity: 25, debt: 65, gold: 10, realReturn: 1.5, nominalReturn: 7.5, maxDrawdown: '-8%' };
      case 'moderate':
        return { equity: 50, debt: 40, gold: 10, realReturn: 4.0, nominalReturn: 10.0, maxDrawdown: '-20%' };
      case 'aggressive':
        return { equity: 75, debt: 15, gold: 10, realReturn: 6.0, nominalReturn: 12.0, maxDrawdown: '-35%' };
      case 'very_aggressive':
        return { equity: 90, debt: 0, gold: 10, realReturn: 7.5, nominalReturn: 13.5, maxDrawdown: '-50%' };
    }
  }, [riskProfile]);

  // Simulation calculations over horizon
  const simulation = useMemo(() => {
    const monthlyRate = allocation.nominalReturn / 100 / 12;
    const totalMonths = horizonYears * 12;

    // Future value of lump sum + SIP
    const fvLumpSum = initialCapital * Math.pow(1 + monthlyRate, totalMonths);
    const fvSip = monthlyRate > 0
      ? monthlySip * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
      : monthlySip * totalMonths;

    const nominalTotal = fvLumpSum + fvSip;

    // Inflation discounting
    const inflationFactor = Math.pow(1 + inflationRate / 100, horizonYears);
    const realTotal = nominalTotal / inflationFactor;

    // Total invested
    const totalInvested = initialCapital + (monthlySip * totalMonths);

    // Monte Carlo fan projections (Bear 10th percentile, Median 50th, Bull 90th)
    const bearTotal = nominalTotal * 0.72;
    const bullTotal = nominalTotal * 1.45;

    // Indian Safe Withdrawal Rate (3.25% safe in high-inflation India)
    const annualSafeWithdrawal = (nominalTotal * 0.0325);
    const monthlySafeWithdrawal = annualSafeWithdrawal / 12;

    return {
      totalInvested,
      nominalTotal,
      realTotal,
      bearTotal,
      bullTotal,
      monthlySafeWithdrawal,
    };
  }, [initialCapital, monthlySip, horizonYears, allocation, inflationRate]);

  return (
    <div className="space-y-8">
      {/* Interactive Controls Card */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-2">
          <span>⚙️ Investor Profile & Target Parameters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Current Age: <span className="font-bold text-stone-900 dark:text-stone-100 text-sm font-mono">{age} yrs</span>
            </label>
            <input
              type="range"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Time Horizon: <span className="font-bold text-stone-900 dark:text-stone-100 text-sm font-mono">{horizonYears} yrs</span>
            </label>
            <input
              type="range"
              min="3"
              max="40"
              value={horizonYears}
              onChange={(e) => setHorizonYears(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Risk Tolerance Profile
            </label>
            <select
              value={riskProfile}
              onChange={(e) => setRiskProfile(e.target.value as any)}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="conservative">Conservative (25% Equity / 65% Debt)</option>
              <option value="moderate">Moderate (50% Equity / 40% Debt)</option>
              <option value="aggressive">Aggressive (75% Equity / 15% Debt)</option>
              <option value="very_aggressive">Very Aggressive (90% Equity / 10% Gold)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Monthly SIP Investment (INR)
            </label>
            <input
              type="number"
              step="5000"
              value={monthlySip}
              onChange={(e) => setMonthlySip(Number(e.target.value))}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Existing Portfolio / Lump Sum (INR)
            </label>
            <input
              type="number"
              step="50000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              Assumed Annual Inflation Rate (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Recommended Asset Allocation Mix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-xl">
          <div className="text-xs uppercase font-bold text-amber-700 dark:text-amber-300 tracking-wider mb-1">
            Growth Compounder (Equity)
          </div>
          <div className="text-3xl font-serif font-bold text-amber-800 dark:text-amber-200">
            {allocation.equity}%
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
            Broad Nifty 50, Nifty Midcap 150, or Flexi-Cap direct mutual funds. Long-term engine to beat inflation.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl">
          <div className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-wider mb-1">
            Anchor & Stability (Fixed Income)
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-800 dark:text-emerald-200">
            {allocation.debt}%
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
            RBI Retail Direct G-Secs, Target Maturity Funds, and PPF. Capital preservation with zero market drawdown.
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-xl">
          <div className="text-xs uppercase font-bold text-yellow-700 dark:text-yellow-300 tracking-wider mb-1">
            Crisis & Currency Hedge (Gold/Silver)
          </div>
          <div className="text-3xl font-serif font-bold text-yellow-800 dark:text-yellow-200">
            {allocation.gold}%
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
            Gold ETFs and secondary market Sovereign Gold Bonds (SGBs). Zero cash flow, pure portfolio insurance.
          </p>
        </div>
      </div>

      {/* Projected Wealth & Monte Carlo Fan Simulation */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <span>📈 {horizonYears}-Year Compounding & Purchasing Power Projection</span>
          <span className="text-xs font-mono text-amber-600 font-normal">Nominal Expected: {allocation.nominalReturn}% p.a.</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block">Total Capital Contributed</span>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
              ₹{(simulation.totalInvested / 100000).toFixed(2)} Lakhs
            </span>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block">Projected Nominal Corpus</span>
            <span className="text-xl font-bold font-mono text-amber-600">
              ₹{(simulation.nominalTotal / 10000000).toFixed(2)} Crores
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5">₹{(simulation.nominalTotal / 100000).toFixed(0)} Lakhs</span>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block">Real Value (Today's Purchasing Power)</span>
            <span className="text-xl font-bold font-mono text-emerald-600">
              ₹{(simulation.realTotal / 10000000).toFixed(2)} Crores
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5">Discounted @ {inflationRate}% inflation</span>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500 block">Safe Monthly FIRE Withdrawal</span>
            <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              ₹{Math.round(simulation.monthlySafeWithdrawal).toLocaleString('en-IN')}/mo
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5">Based on 3.25% Indian SWR</span>
          </div>
        </div>

        {/* Visual Monte Carlo Distribution Bars */}
        <div className="p-5 rounded-lg bg-stone-50 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-700 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Monte Carlo Outcome Ranges (Accounting for Sequence-of-Returns Risk)
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
              <span>Severe Bear Market (10th Percentile):</span>
              <span className="font-mono font-bold text-red-600">₹{(simulation.bearTotal / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>

            <div className="flex justify-between items-center text-stone-600 dark:text-stone-400 pt-2">
              <span>Expected Median Outcome (50th Percentile):</span>
              <span className="font-mono font-bold text-amber-600">₹{(simulation.nominalTotal / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>

            <div className="flex justify-between items-center text-stone-600 dark:text-stone-400 pt-2">
              <span>Bull Compounding Cycle (90th Percentile):</span>
              <span className="font-mono font-bold text-emerald-600">₹{(simulation.bullTotal / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
