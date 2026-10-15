import React, { useState } from 'react';

export default function CalculatorsSuite() {
  const [activeTab, setActiveTab] = useState<'sip' | 'tax' | 'prepay' | 'cagr'>('sip');

  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState<number>(25000);
  const [sipRate, setSipRate] = useState<number>(12.5);
  const [sipYears, setSipYears] = useState<number>(15);

  // Post-Tax Yield State
  const [taxSlab, setTaxSlab] = useState<number>(31.2); // 30% + 4% cess
  const [fdRate, setFdRate] = useState<number>(7.25);
  const [equityRate, setEquityRate] = useState<number>(12.0);

  // Prepayment vs SIP State
  const [loanPrincipal, setLoanPrincipal] = useState<number>(5000000);
  const [loanRate, setLoanRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [expectedEquityReturn, setExpectedEquityReturn] = useState<number>(12.5);

  // CAGR State
  const [startVal, setStartVal] = useState<number>(100000);
  const [endVal, setEndVal] = useState<number>(350000);
  const [cagrYears, setCagrYears] = useState<number>(7.5);

  // Calculations:
  // 1. SIP
  const monthlyRate = sipRate / 100 / 12;
  const totalMonths = sipYears * 12;
  const sipMaturity = sipAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const sipInvested = sipAmount * totalMonths;
  const sipGains = sipMaturity - sipInvested;

  // 2. Post-Tax Yield
  const postTaxFdYield = fdRate * (1 - taxSlab / 100);
  const equityLtcgTaxEffective = 12.5 * 1.04; // 13% effective
  const postTaxEquityYield = equityRate * (1 - equityLtcgTaxEffective / 100);

  // 3. Loan Prepayment vs SIP
  const monthlyLoanRate = loanRate / 100 / 12;
  const totalLoanMonths = loanTenureYears * 12;
  const emi = (loanPrincipal * monthlyLoanRate * Math.pow(1 + monthlyLoanRate, totalLoanMonths)) /
    (Math.pow(1 + monthlyLoanRate, totalLoanMonths) - 1);
  const totalLoanRepayment = emi * totalLoanMonths;
  const totalLoanInterest = totalLoanRepayment - loanPrincipal;

  // 4. CAGR
  const cagrResult = Math.pow(endVal / startVal, 1 / cagrYears) - 1;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 overflow-x-auto space-x-2 text-sm font-medium">
        <button
          onClick={() => setActiveTab('sip')}
          className={`py-3 px-4 border-b-2 font-serif transition-colors whitespace-nowrap ${
            activeTab === 'sip'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          📈 SIP Compounding
        </button>
        <button
          onClick={() => setActiveTab('tax')}
          className={`py-3 px-4 border-b-2 font-serif transition-colors whitespace-nowrap ${
            activeTab === 'tax'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          ⚖️ Post-Tax Real Yield
        </button>
        <button
          onClick={() => setActiveTab('prepay')}
          className={`py-3 px-4 border-b-2 font-serif transition-colors whitespace-nowrap ${
            activeTab === 'prepay'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          🏠 Home Loan Prepay vs SIP
        </button>
        <button
          onClick={() => setActiveTab('cagr')}
          className={`py-3 px-4 border-b-2 font-serif transition-colors whitespace-nowrap ${
            activeTab === 'cagr'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          🔬 CAGR & XIRR
        </button>
      </div>

      {/* Tab 1: SIP */}
      {activeTab === 'sip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Monthly SIP Amount: <span className="font-mono text-stone-900 dark:text-stone-100 font-bold">₹{sipAmount.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={sipAmount}
                onChange={(e) => setSipAmount(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Expected Annual Return: <span className="font-mono text-stone-900 dark:text-stone-100 font-bold">{sipRate}%</span>
              </label>
              <input
                type="range"
                min="5"
                max="22"
                step="0.5"
                value={sipRate}
                onChange={(e) => setSipRate(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Horizon: <span className="font-mono text-stone-900 dark:text-stone-100 font-bold">{sipYears} Years</span>
              </label>
              <input
                type="range"
                min="1"
                max="35"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-5 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs text-stone-500 block">Total Invested Capital</span>
              <span className="text-xl font-mono font-bold text-stone-900 dark:text-stone-100">
                ₹{(sipInvested / 100000).toFixed(2)} Lakhs
              </span>
            </div>

            <div>
              <span className="text-xs text-stone-500 block">Estimated Capital Growth</span>
              <span className="text-xl font-mono font-bold text-emerald-600">
                ₹{(sipGains / 100000).toFixed(2)} Lakhs
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
              <span className="text-xs text-stone-500 block uppercase font-semibold">Total Maturity Corpus</span>
              <span className="text-3xl font-mono font-bold text-amber-600">
                ₹{(sipMaturity / 10000000).toFixed(2)} Crores
              </span>
              <span className="text-xs text-stone-400 block font-mono">
                (₹{(sipMaturity / 100000).toFixed(2)} Lakhs)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Post-Tax Yield */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Your Marginal Tax Slab (%)
              </label>
              <select
                value={taxSlab}
                onChange={(e) => setTaxSlab(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5"
              >
                <option value={0}>0% (Nil)</option>
                <option value={5.2}>5% (+ 4% Cess = 5.2%)</option>
                <option value={10.4}>10% (+ 4% Cess = 10.4%)</option>
                <option value={15.6}>15% (+ 4% Cess = 15.6%)</option>
                <option value={20.8}>20% (+ 4% Cess = 20.8%)</option>
                <option value={31.2}>30% (+ 4% Cess = 31.2%)</option>
                <option value={39}>30% + 15% Surcharge = ~39%</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Bank FD Nominal Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={fdRate}
                onChange={(e) => setFdRate(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Equity / Equity MF Nominal CAGR (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={equityRate}
                onChange={(e) => setEquityRate(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 font-mono"
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-5 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs text-stone-500 block">Bank FD Real Net Return</span>
              <span className="text-2xl font-mono font-bold text-red-600">
                {postTaxFdYield.toFixed(2)}% p.a.
              </span>
              <span className="text-xs text-stone-400 block mt-0.5">
                After subtracting {taxSlab}% income tax. At 6% inflation, real purchasing power return is {(postTaxFdYield - 6).toFixed(2)}%!
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
              <span className="text-xs text-stone-500 block">Equity LTCG Net Return (Post-12.5% Tax)</span>
              <span className="text-2xl font-mono font-bold text-emerald-600">
                {postTaxEquityYield.toFixed(2)}% p.a.
              </span>
              <span className="text-xs text-stone-400 block mt-0.5">
                Gains exceeding ₹1.25L taxed at 12.5%. Real return after 6% inflation is {(postTaxEquityYield - 6).toFixed(2)}%!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Prepay vs SIP */}
      {activeTab === 'prepay' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Loan Outstanding (INR)
              </label>
              <input
                type="number"
                step="100000"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Home Loan Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={loanRate}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Expected Equity SIP Return (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={expectedEquityReturn}
                onChange={(e) => setExpectedEquityReturn(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-5 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs text-stone-500 block">Monthly Home Loan EMI</span>
              <span className="text-xl font-mono font-bold text-stone-900 dark:text-stone-100">
                ₹{Math.round(emi).toLocaleString('en-IN')}/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Total Interest Over {loanTenureYears} Years</span>
              <span className="text-xl font-mono font-bold text-red-600">
                ₹{(totalLoanInterest / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <strong>Quant Verdict:</strong> If your home loan interest rate is {loanRate}%, every rupee prepaid yields a guaranteed {loanRate}% risk-free post-tax return. However, if your investment horizon is &gt;10 years and expected equity return is {expectedEquityReturn}%, investing surplus capital in an equity SIP generates an estimated {((expectedEquityReturn * 0.875) - loanRate).toFixed(1)}% annual alpha over prepayment!
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: CAGR */}
      {activeTab === 'cagr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Initial Investment Value (INR)
              </label>
              <input
                type="number"
                value={startVal}
                onChange={(e) => setStartVal(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Final Realized Value (INR)
              </label>
              <input
                type="number"
                value={endVal}
                onChange={(e) => setEndVal(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Compounding Period (Years)
              </label>
              <input
                type="number"
                step="0.5"
                value={cagrYears}
                onChange={(e) => setCagrYears(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-5 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs text-stone-500 block uppercase font-semibold">Calculated CAGR</span>
              <span className="text-3xl font-mono font-bold text-amber-600">
                {(cagrResult * 100).toFixed(2)}% p.a.
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Absolute Return Multiple</span>
              <span className="text-xl font-mono font-bold text-stone-900 dark:text-stone-100">
                {(endVal / startVal).toFixed(2)}x
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
