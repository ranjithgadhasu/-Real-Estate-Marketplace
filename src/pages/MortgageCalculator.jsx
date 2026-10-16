import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader.jsx';

const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

function SliderField({ label, value, min, max, step, onChange, formatter = money, description }) {
  return (
    <label className="block border-b border-gray-200 pb-7">
      <span className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-[13px] font-medium text-gray-700">{label}</span><span className="text-[18px] font-semibold text-primary-900">{formatter(value)}</span></span>
      <input type="range" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} className="mt-5 w-full cursor-pointer accent-primary-800" aria-label={label} />
      {description && <span className="mt-2 block text-[11px] text-gray-500">{description}</span>}
    </label>
  );
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);

  useEffect(() => { setDownPayment((current) => Math.min(current, homePrice * 0.5)); }, [homePrice]);

  const result = useMemo(() => {
    const principal = homePrice - Math.min(downPayment, homePrice);
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    const principalAndInterest = monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    const monthlyTax = tax / 12;
    const monthlyInsurance = insurance / 12;
    return { principal, principalAndInterest, monthlyTax, monthlyInsurance, monthly: principalAndInterest + monthlyTax + monthlyInsurance, interest: principalAndInterest * months - principal, total: (principalAndInterest + monthlyTax + monthlyInsurance) * months };
  }, [homePrice, downPayment, rate, term, tax, insurance]);

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      <PageHeader eyebrow="A helpful tool" title="Make the numbers feel clearer." description="Explore what a monthly mortgage payment could look like. Adjust the details to fit your plans." />
      <div className="site-container grid gap-9 pt-12 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-16 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="border border-gray-200 bg-white p-6 sm:p-9">
          <p className="eyebrow mb-3">Your details</p><h2 className="mb-8 font-serif text-[30px] text-primary-900">The home and the loan.</h2>
          <div className="space-y-7">
            <SliderField label="Home price" value={homePrice} min={50000} max={5000000} step={10000} onChange={setHomePrice} />
            <SliderField label="Down payment" value={downPayment} min={0} max={homePrice * 0.5} step={5000} onChange={setDownPayment} description={`${Math.round((downPayment / homePrice) * 100)}% of the purchase price`} />
            <SliderField label="Interest rate" value={rate} min={1} max={15} step={0.1} onChange={setRate} formatter={(value) => `${value.toFixed(1)}%`} />
            <SliderField label="Loan term" value={term} min={5} max={40} step={5} onChange={setTerm} formatter={(value) => `${value} years`} />
            <div className="grid gap-7 sm:grid-cols-2"><SliderField label="Annual property tax" value={tax} min={0} max={30000} step={100} onChange={setTax} /><SliderField label="Annual home insurance" value={insurance} min={0} max={10000} step={50} onChange={setInsurance} /></div>
          </div>
        </motion.div>
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="bg-primary-900 p-7 text-[#f8f7f3] sm:p-9 lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/65">Estimated monthly payment</p>
            <p className="mt-4 font-serif text-[clamp(3rem,5vw,4.6rem)] leading-none tracking-[-.04em]">{money(result.monthly)}</p>
            <div className="mt-8 space-y-4 border-t border-white/25 pt-6 text-[13px]">
              {[['Principal & interest', result.principalAndInterest], ['Property tax', result.monthlyTax], ['Home insurance', result.monthlyInsurance]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><span className="text-white/70">{label}</span><span>{money(value)}</span></div>)}
            </div>
            <div className="mt-8 space-y-3 border-t border-white/25 pt-6 text-[12px]">
              <div className="flex justify-between gap-3"><span className="text-white/70">Loan amount</span><span>{money(result.principal)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/70">Interest over term</span><span>{money(result.interest)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/70">Total payments</span><span>{money(result.total)}</span></div>
            </div>
          </motion.div>
          <p className="mt-5 text-[11px] leading-6 text-gray-500">For illustration only. Taxes, insurance, interest rates, and loan terms may vary. Speak with a mortgage professional before making a decision.</p>
        </div>
      </div>
    </div>
  );
}