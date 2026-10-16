import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Columns2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getPropertyById } from '../../data/properties.js';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useApp();
  const { pathname } = useLocation();
  const properties = compareList.map(getPropertyById).filter(Boolean);

  return (
    <AnimatePresence>
      {properties.length > 0 && pathname !== '/compare' && (
        <motion.aside
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-[#f8f7f3]/98 shadow-[0_-8px_28px_rgba(25,47,36,.07)] backdrop-blur-lg"
          aria-label="Property comparison selection"
        >
          <div className="site-container flex min-h-[76px] items-center justify-between gap-4 py-3">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <Columns2 size={21} strokeWidth={1.5} className="shrink-0 text-primary-800" />
              <div className="shrink-0">
                <p className="text-[13px] font-semibold text-primary-900">Compare homes</p>
                <p className="text-[11px] text-gray-500">{properties.length} of 4 selected</p>
              </div>
              <div className="hidden items-center gap-2 border-l border-gray-200 pl-5 md:flex">
                {properties.map((property) => (
                  <div key={property.id} className="relative">
                    <img src={property.images[0]} alt={property.title} className="h-11 w-14 rounded-[3px] object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFromCompare(property.id)}
                      aria-label={`Remove ${property.title} from comparison`}
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-900 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <button type="button" onClick={clearCompare} className="hidden text-[12px] text-gray-500 hover:text-primary-900 sm:block">Clear</button>
              {properties.length >= 2 ? (
                <Link to="/compare" className="inline-flex items-center gap-2 bg-primary-900 px-4 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-primary-700 sm:px-5">
                  Compare <span className="hidden sm:inline">homes</span> <ArrowRight size={15} />
                </Link>
              ) : (
                <span className="text-right text-[11px] text-gray-500 sm:text-[12px]">Add one more<br className="sm:hidden" /> home to compare</span>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}