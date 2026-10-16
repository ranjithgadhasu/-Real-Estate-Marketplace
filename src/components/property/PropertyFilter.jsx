import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { defaultFilters, useApp } from '../../context/AppContext.jsx';
import { bathroomOptions, bedroomOptions, propertyStatuses, propertyTypes } from '../../data/properties.js';

const popularAmenities = ['Pool', 'Garage', 'Fireplace', 'Pet Friendly'];
const fieldClass = 'w-full min-w-0 rounded-[4px] border border-gray-200 bg-[#f8f7f3] px-3.5 py-3 text-[13px] text-primary-900 outline-none focus:border-primary-500';

export default function PropertyFilter() {
  const { filters, setFilters, setCurrentPage } = useApp();
  const [draft, setDraft] = useState(filters);
  const [open, setOpen] = useState(false);

  useEffect(() => { setDraft(filters); }, [filters]);

  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }));

  const apply = (event) => {
    event?.preventDefault();
    setFilters(draft);
    setCurrentPage(1);
    setOpen(false);
  };

  const clear = () => {
    setDraft(defaultFilters);
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const toggleAmenity = (amenity) => {
    update('amenities', draft.amenities.includes(amenity)
      ? draft.amenities.filter((item) => item !== amenity)
      : [...draft.amenities, amenity]);
  };

  const activeCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'search') return count;
    if (key === 'amenities') return count + value.length;
    return count + (value && value !== 'all' && value !== 'any' ? 1 : 0);
  }, 0);

  return (
    <form onSubmit={apply} className="border-y border-gray-200 py-4 sm:py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-3 border-b border-gray-300 px-1 py-2.5 sm:border-b-0 sm:py-1">
          <Search size={19} strokeWidth={1.5} className="shrink-0 text-gray-500" />
          <input
            type="search"
            value={draft.search}
            onChange={(event) => update('search', event.target.value)}
            placeholder="City, neighborhood, or property name"
            aria-label="Search properties"
            className="w-full min-w-0 border-0 bg-transparent text-[13px] text-primary-900 outline-none placeholder:text-gray-400 sm:text-sm"
          />
        </label>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className={`flex flex-1 items-center justify-center gap-2 border px-5 py-3 text-[12px] font-semibold transition-colors sm:flex-none ${open || activeCount ? 'border-primary-800 text-primary-900' : 'border-gray-300 text-gray-700 hover:border-primary-800'}`}
          >
            <SlidersHorizontal size={17} strokeWidth={1.5} /> Filters {activeCount > 0 && <span>({activeCount})</span>}
          </button>
          <button type="submit" className="flex flex-1 items-center justify-center gap-2 bg-primary-900 px-6 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-primary-700 sm:flex-none">
            Search homes
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-5 border-t border-gray-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block text-[12px] font-semibold text-primary-900">
                Property type
                <select value={draft.type} onChange={(event) => update('type', event.target.value)} className={`mt-2 ${fieldClass}`}>
                  {propertyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="block text-[12px] font-semibold text-primary-900">
                Listing status
                <select value={draft.status} onChange={(event) => update('status', event.target.value)} className={`mt-2 ${fieldClass}`}>
                  {propertyStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="block text-[12px] font-semibold text-primary-900">
                Bedrooms
                <select value={draft.bedrooms} onChange={(event) => update('bedrooms', event.target.value)} className={`mt-2 ${fieldClass}`}>
                  {bedroomOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="block text-[12px] font-semibold text-primary-900">
                Bathrooms
                <select value={draft.bathrooms} onChange={(event) => update('bathrooms', event.target.value)} className={`mt-2 ${fieldClass}`}>
                  {bathroomOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <div className="sm:col-span-2">
                <span className="text-[12px] font-semibold text-primary-900">Price range</span>
                <div className="mt-2 flex min-w-0 items-center gap-3">
                  <input type="number" min="0" value={draft.minPrice} onChange={(event) => update('minPrice', event.target.value)} placeholder="Minimum $" aria-label="Minimum price" className={fieldClass} />
                  <span className="text-gray-400">-</span>
                  <input type="number" min="0" value={draft.maxPrice} onChange={(event) => update('maxPrice', event.target.value)} placeholder="Maximum $" aria-label="Maximum price" className={fieldClass} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[12px] font-semibold text-primary-900">Features</span>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                  {popularAmenities.map((amenity) => (
                    <label key={amenity} className="flex cursor-pointer items-center gap-2 text-[12px] text-gray-600">
                      <input type="checkbox" checked={draft.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-primary-800" />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
              <button type="button" onClick={clear} className="flex items-center gap-1.5 text-[12px] text-gray-600 transition-colors hover:text-primary-900"><X size={14} /> Clear filters</button>
              <button type="submit" className="border-b border-primary-900 pb-1 text-[12px] font-semibold text-primary-900">Apply filters</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}