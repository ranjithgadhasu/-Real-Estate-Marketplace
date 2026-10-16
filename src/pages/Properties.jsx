import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import PropertyFilter from '../components/property/PropertyFilter.jsx';
import PropertySort from '../components/property/PropertySort.jsx';
import Pagination from '../components/property/Pagination.jsx';
import { properties } from '../data/properties.js';
import { defaultFilters, useApp } from '../context/AppContext.jsx';
import { filterProperties, paginateProperties, sortProperties } from '../utils/helpers.js';
import { editorialEase } from '../utils/motion.js';

export default function Properties() {
  const { filters, setFilters, sortBy, currentPage, setCurrentPage, perPage } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const reduceMotion = useReducedMotion();
  const filtered = useMemo(() => sortProperties(filterProperties(properties, filters), sortBy), [filters, sortBy]);
  const { properties: visible, totalPages, total, startIndex, endIndex } = useMemo(
    () => paginateProperties(filtered, currentPage, perPage), [filtered, currentPage, perPage]
  );
  const resultsKey = `${currentPage}-${perPage}-${sortBy}-${viewMode}-${JSON.stringify(filters)}`;

  const goToPage = (page) => {
    setCurrentPage(page);
    requestAnimationFrame(() => document.getElementById('results')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-20 sm:pb-28">
      <PageHeader
        eyebrow="The collection"
        title="Find a place to call your own."
        description="Explore homes selected for the way you want to live. Search by place, refine the details, and find one that feels right."
      />
      <div className="site-container">
        <div className="pt-7"><PropertyFilter /></div>
        <PropertySort total={total} viewMode={viewMode} setViewMode={setViewMode} />
        <AnimatePresence mode="wait" initial={false}>
          {visible.length ? (
            <motion.div
              key={resultsKey}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.23, ease: editorialEase }}
              className={`grid gap-x-6 gap-y-12 xl:gap-x-7 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
            >
              {visible.map((property, index) => <PropertyCard key={property.id} property={property} index={index} viewMode={viewMode} />)}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${resultsKey}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: editorialEase }}
              className="border-t border-gray-200 py-20 text-center"
            >
              <Search size={30} strokeWidth={1.25} className="mx-auto text-gray-400" />
              <h2 className="mt-5 font-serif text-[32px] text-primary-900">No homes found this time.</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-600">Try a different neighborhood or adjust your filters to find more places.</p>
              <button type="button" onClick={clearFilters} className="text-link mx-auto mt-6">Clear all filters</button>
            </motion.div>
          )}
        </AnimatePresence>
        {visible.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} total={total} startIndex={startIndex} endIndex={endIndex} />}
      </div>
    </div>
  );
}