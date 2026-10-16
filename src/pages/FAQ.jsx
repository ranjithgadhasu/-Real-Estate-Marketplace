import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';

const faqs = [
  {
    category: 'Buying a Home',
    questions: [
      {
        q: 'How do I start the home buying process?',
        a: 'Start by getting pre-approved for a mortgage, then determine your budget. Next, create a list of must-have features and preferred locations. Browse properties on our platform, connect with an experienced agent, and begin viewing homes that match your criteria.',
      },
      {
        q: 'What is the difference between pre-qualification and pre-approval?',
        a: 'Pre-qualification is an informal estimate of how much you can borrow based on self-reported information. Pre-approval is a formal process where a lender verifies your financial information and commits to lending you a specific amount, making your offers much stronger.',
      },
      {
        q: 'How much down payment do I need?',
        a: 'Down payment requirements vary by loan type. Conventional loans typically require 5-20%, FHA loans require as little as 3.5%, and VA loans may require 0%. 20% down avoids private mortgage insurance (PMI) but is not always required.',
      },
      {
        q: 'What closing costs should I expect?',
        a: 'Closing costs typically range from 2-5% of the purchase price and include loan origination fees, appraisal fees, title insurance, property taxes, homeowners insurance, and various recording fees. Your lender will provide a Loan Estimate within 3 days of application.',
      },
    ],
  },
  {
    category: 'Selling a Home',
    questions: [
      {
        q: 'How do I determine the right price for my home?',
        a: 'A comparative market analysis (CMA) from an experienced agent examines recently sold homes similar to yours in your area, accounts for current market conditions, and evaluates your home\'s unique features to determine the optimal listing price.',
      },
      {
        q: 'What is the best time to sell my home?',
        a: 'Spring and early summer typically see the most buyer activity, with homes often selling faster and at higher prices. However, the "best" time depends on your local market, your timeline, and personal circumstances. Our agents can advise based on your specific situation.',
      },
      {
        q: 'Should I make repairs before listing?',
        a: 'Focus on repairs that affect structural integrity, safety, or are immediately visible. Cosmetic updates like fresh paint or new flooring can improve first impressions. Consult with your agent before major renovations — they may not yield a positive return on investment.',
      },
      {
        q: 'How long does it take to sell a home?',
        a: 'The average time on market varies by location and season, but nationally it takes about 30-60 days to go under contract, plus an additional 30-45 days to close. Price, condition, location, and market conditions all impact timeline.',
      },
    ],
  },
  {
    category: 'Rentals',
    questions: [
      {
        q: 'What documents do I need to apply for a rental?',
        a: 'Most landlords require proof of income (pay stubs, tax returns, or offer letter), photo ID, rental history, credit report, references, and sometimes bank statements. International applicants may need additional documentation.',
      },
      {
        q: 'How much is a security deposit?',
        a: 'Security deposits are typically equal to one month\'s rent, but can be up to 2-3 months\' rent in competitive markets or for furnished units. This deposit is held to cover damages beyond normal wear and tear and is returned after move-out per local laws.',
      },
      {
        q: 'Are utilities included in rent?',
        a: 'This varies by property. Some rentals include water, trash, or gas, while others require tenants to pay all utilities. Always clarify which utilities are included before signing a lease. Listings on our platform clearly indicate included utilities.',
      },
    ],
  },
  {
    category: 'Agents & Our Platform',
    questions: [
      {
        q: 'How do I choose the right real estate agent?',
        a: 'Look for agents with experience in your target neighborhood, strong client reviews, relevant certifications, and communication style that matches yours. Browse our agent directory to see reviews, active listings, and specialties.',
      },
      {
        q: 'What does it cost to list my property on Estately?',
        a: 'Basic listings on Estately are free. We offer premium listing packages with enhanced visibility, professional photography, virtual tours, and featured placement. There are no upfront costs — agent commissions are paid at closing. Contact us for custom pricing for agents and brokerages.',
      },
      {
        q: 'Are listings on Estately verified?',
        a: 'Yes! Every listing on our platform is verified by our team before going live. We confirm property details, listing status, and agent credentials to ensure accuracy and prevent fraud.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredFaqs = searchTerm
    ? faqs.map((cat, originalCategoryIndex) => ({
        ...cat,
        originalCategoryIndex,
        questions: cat.questions.filter(
          q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : faqs;

  return (
    <div className="bg-[#f8f7f3] min-h-screen">
      <PageHeader eyebrow="Help & guidance" title="Good questions lead to good decisions." description="Answers to the things people ask most about buying, selling, renting, and finding their place." />

      <div className="site-container py-12 sm:py-16">
        <label className="mb-9 flex max-w-xl items-center gap-3 border-b border-gray-300 pb-3">
          <Search size={18} strokeWidth={1.5} className="shrink-0 text-gray-500" />
          <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search your question" aria-label="Search frequently asked questions" className="w-full min-w-0 border-0 bg-transparent text-[13px] text-primary-900 outline-none placeholder:text-gray-400" />
        </label>
        {!searchTerm && (
          <div className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-gray-200">
            {faqs.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`border-b pb-3 text-[12px] transition-colors ${
                  activeCategory === idx
                    ? 'border-primary-900 font-semibold text-primary-900'
                    : 'border-transparent text-gray-600 hover:text-primary-900'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        <div className="max-w-4xl space-y-8">
          {searchTerm ? (
            filteredFaqs.map((cat) => (
              <div key={cat.category}>
                <h2 className="mb-4 font-serif text-[25px] text-primary-900">{cat.category}</h2>
                <div className="border-t border-gray-200">
                  {cat.questions.map((item, qIdx) => {
                    const originalIdx = faqs[cat.originalCategoryIndex].questions.findIndex(q => q.q === item.q);
                    return (
                      <FAQItem
                        key={qIdx}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItems[`${cat.originalCategoryIndex}-${originalIdx}`]}
                        onToggle={() => toggleItem(cat.originalCategoryIndex, originalIdx)}
                      />
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="border-t border-gray-200">
              {faqs[activeCategory].questions.map((item, qIdx) => (
                <FAQItem
                  key={qIdx}
                  question={item.q}
                  answer={item.a}
                  isOpen={openItems[`${activeCategory}-${qIdx}`]}
                  onToggle={() => toggleItem(activeCategory, qIdx)}
                />
              ))}
            </div>
          )}
          {searchTerm && filteredFaqs.length === 0 && <p className="text-sm text-gray-600">No matching questions. Try a different search.</p>}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl bg-primary-900 p-8 text-[#f8f7f3] sm:p-12"
        >
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] mb-3">Still have questions?</h2>
          <p className="mb-8 max-w-lg text-[14px] leading-7 text-white/75">
            Can't find the answer you're looking for? Our team of real estate experts is here to help.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-b border-white pb-1 text-[13px] font-semibold text-white"
              >
                Contact Support
              </motion.button>
            </Link>
            <Link to="/agents">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-b border-white/50 pb-1 text-[13px] font-semibold text-white/80"
              >
                Talk to an Agent
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className="overflow-hidden border-b border-gray-200"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={Boolean(isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-[20px] text-primary-900 sm:text-[22px]">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-3xl pb-6 text-[14px] leading-7 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
