import { Link } from 'react-router-dom';
import { ArrowRight, Columns2, X } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { getPropertyById } from '../data/properties.js';
import { useApp } from '../context/AppContext.jsx';
import { formatArea, formatPrice, getPropertyTypeLabel } from '../utils/helpers.js';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useApp();
  const homes = compareList.map(getPropertyById).filter(Boolean);
  const features = [...new Set(homes.flatMap((home) => home.features))];
  const details = [
    ['Bedrooms', (home) => home.bedrooms],
    ['Bathrooms', (home) => home.bathrooms],
    ['Living area', (home) => formatArea(home.area)],
    ['Year built', (home) => home.yearBuilt],
    ['Property type', (home) => getPropertyTypeLabel(home.type)],
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      <PageHeader eyebrow="Side by side" title="Choose with confidence." description="Put the details next to each other and find the home that feels right for you." aside={homes.length > 0 && <span className="text-[13px] text-gray-600">{homes.length} of 4 homes selected</span>} />
      <div className="site-container pt-9 sm:pt-12">
        {homes.length ? (
          <>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
              {homes.length < 4 ? <Link to="/properties" className="text-link">Add another home <ArrowRight size={16} strokeWidth={1.5} /></Link> : <span className="text-[12px] text-gray-500">Your comparison is full.</span>}
              <button type="button" onClick={clearCompare} className="shrink-0 text-[12px] text-gray-600 hover:text-primary-900">Clear comparison</button>
            </div>

            <div className="space-y-9 lg:hidden">
              {homes.map((home) => (
                <article key={home.id} className="border-b border-gray-200 pb-9">
                  <Link to={`/properties/${home.id}`} className="block overflow-hidden rounded-[4px]"><img src={home.images[0]} alt={home.title} className="aspect-[1.65] w-full object-cover" /></Link>
                  <div className="mt-4 flex items-start justify-between gap-3"><div><Link to={`/properties/${home.id}`} className="font-serif text-[24px] text-primary-900">{home.title}</Link><p className="mt-1 text-[13px] font-semibold text-primary-900">{formatPrice(home.price, home.status)}</p></div><button type="button" onClick={() => removeFromCompare(home.id)} aria-label={`Remove ${home.title} from comparison`} className="flex h-8 w-8 shrink-0 items-center justify-center border border-gray-300 text-primary-900"><X size={16} /></button></div>
                  <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-gray-200 pt-4">
                    {details.map(([label, value]) => <div key={label}><dt className="text-[11px] text-gray-500">{label}</dt><dd className="mt-0.5 text-[13px] text-primary-900">{value(home)}</dd></div>)}
                  </dl>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[.14em] text-gray-500">Features</p>
                  <p className="mt-2 text-[12px] leading-6 text-gray-700">{home.features.join(' / ')}</p>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[780px] table-fixed border-collapse text-left">
                <thead>
                  <tr>
                    <th scope="col" className="w-[165px] border-b border-gray-300 p-4 align-bottom text-[10px] font-semibold uppercase tracking-[.14em] text-gray-500">The details</th>
                    {homes.map((home) => (
                      <th key={home.id} scope="col" className="min-w-[200px] border-b border-gray-300 p-4 align-top font-normal">
                        <div className="relative">
                          <Link to={`/properties/${home.id}`} className="block overflow-hidden rounded-[4px]"><img src={home.images[0]} alt={home.title} className="aspect-[1.4] w-full object-cover" /></Link>
                          <button type="button" onClick={() => removeFromCompare(home.id)} aria-label={`Remove ${home.title}`} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f7f3] text-primary-900"><X size={15} strokeWidth={1.5} /></button>
                        </div>
                        <Link to={`/properties/${home.id}`} className="mt-4 block font-serif text-[22px] leading-tight text-primary-900 hover:text-primary-600">{home.title}</Link>
                        <p className="mt-1.5 text-[13px] font-semibold text-primary-900">{formatPrice(home.price, home.status)}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {details.map(([label, value]) => (
                    <tr key={label} className="border-b border-gray-200">
                      <th scope="row" className="px-4 py-4 text-[12px] font-medium text-gray-500">{label}</th>
                      {homes.map((home) => <td key={home.id} className="px-4 py-4 text-[13px] text-primary-900">{value(home)}</td>)}
                    </tr>
                  ))}
                  {features.map((feature) => (
                    <tr key={feature} className="border-b border-gray-200">
                      <th scope="row" className="px-4 py-4 text-[12px] font-medium text-gray-500">{feature}</th>
                      {homes.map((home) => <td key={home.id} className="px-4 py-4 text-[13px] text-primary-900">{home.features.includes(feature) ? 'Included' : '-'}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="border-t border-gray-200 py-20 text-center">
            <Columns2 size={31} strokeWidth={1.25} className="mx-auto text-gray-500" />
            <h2 className="mt-5 font-serif text-[32px] text-primary-900">See the difference, clearly.</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-600">Choose up to four homes to compare their details side by side.</p>
            <Link to="/properties" className="text-link mx-auto mt-6">Explore homes <ArrowRight size={17} strokeWidth={1.5} /></Link>
          </div>
        )}
      </div>
    </div>
  );
}