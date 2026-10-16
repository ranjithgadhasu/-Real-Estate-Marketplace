import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { sortOptions } from '../../data/properties.js';

export default function PropertySort({ total, viewMode, setViewMode }) {
  const { sortBy, setSortBy, setCurrentPage } = useApp();

  return (
    <div id="results" className="flex scroll-mt-24 flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center sm:py-7">
      <p className="text-[13px] text-gray-600"><span className="font-semibold text-primary-900">{total}</span> {total === 1 ? 'home' : 'homes'} to explore</p>
      <div className="flex items-center gap-4">
        <label className="flex min-w-0 flex-1 items-center gap-2 text-gray-500 sm:flex-none">
          <ArrowUpDown size={15} strokeWidth={1.5} className="shrink-0" />
          <span className="sr-only">Sort properties</span>
          <select
            value={sortBy}
            onChange={(event) => { setSortBy(event.target.value); setCurrentPage(1); }}
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent py-2 pr-5 text-[12px] font-medium text-primary-900 outline-none sm:flex-none"
          >
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <div className="hidden items-center gap-1 border-l border-gray-200 pl-4 md:flex" aria-label="View layout">
          <button type="button" onClick={() => setViewMode('grid')} aria-label="Grid view" aria-pressed={viewMode === 'grid'} className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-primary-900' : 'text-gray-400 hover:text-primary-800'}`}><LayoutGrid size={17} strokeWidth={1.5} /></button>
          <button type="button" onClick={() => setViewMode('list')} aria-label="List view" aria-pressed={viewMode === 'list'} className={`p-2 transition-colors ${viewMode === 'list' ? 'text-primary-900' : 'text-gray-400 hover:text-primary-800'}`}><List size={18} strokeWidth={1.5} /></button>
        </div>
      </div>
    </div>
  );
}