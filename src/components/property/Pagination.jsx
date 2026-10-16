import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { perPageOptions } from '../../utils/helpers.js';

export default function Pagination({ currentPage, totalPages, onPageChange, total, startIndex, endIndex }) {
  const { perPage, setPerPage } = useApp();
  if (!total) return null;

  const first = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const last = Math.min(totalPages, first + 4);
  const pages = Array.from({ length: last - first + 1 }, (_, index) => first + index);

  return (
    <nav aria-label="Property pagination" className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-6 text-[12px] text-gray-600 sm:flex-row">
      <p>Showing {startIndex}-{endIndex} of {total} homes</p>
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1">
          <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="flex h-9 w-9 items-center justify-center text-primary-900 transition-colors hover:bg-gray-100 disabled:opacity-30"><ChevronLeft size={17} strokeWidth={1.5} /></button>
          {first > 1 && <><button type="button" onClick={() => onPageChange(1)} className="h-9 w-9 text-primary-900 hover:bg-gray-100">1</button>{first > 2 && <span className="px-0.5">...</span>}</>}
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`h-9 w-9 text-[12px] transition-colors ${page === currentPage ? 'bg-primary-900 font-semibold text-white' : 'text-primary-900 hover:bg-gray-100'}`}
            >{page}</button>
          ))}
          {last < totalPages && <>{last < totalPages - 1 && <span className="px-0.5">...</span>}<button type="button" onClick={() => onPageChange(totalPages)} className="h-9 w-9 text-primary-900 hover:bg-gray-100">{totalPages}</button></>}
          <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="flex h-9 w-9 items-center justify-center text-primary-900 transition-colors hover:bg-gray-100 disabled:opacity-30"><ChevronRight size={17} strokeWidth={1.5} /></button>
        </div>
      )}
      <label className="flex items-center gap-2 whitespace-nowrap text-gray-500">
        Show
        <select
          value={perPage}
          onChange={(event) => { setPerPage(Number(event.target.value)); onPageChange(1); }}
          className="border-b border-gray-300 bg-transparent py-1 text-primary-900 outline-none"
          aria-label="Properties per page"
        >
          {perPageOptions.map((option) => <option key={option.value} value={option.value}>{option.value} per page</option>)}
        </select>
      </label>
    </nav>
  );
}