import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Columns2, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { formatPrice } from '../../utils/helpers.js';
import { editorialEase } from '../../utils/motion.js';

export default function PropertyCard({ property, index = 0, viewMode = 'grid' }) {
  const [loaded, setLoaded] = useState(false);
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare, compareList } = useApp();
  const saved = isInWishlist(property.id);
  const comparing = isInCompare(property.id);
  const comparisonFull = compareList.length >= 4 && !comparing;
  const location = property.address.split(',').slice(1).join(',').replace(/\s+\d{5}$/, '').trim() || property.address;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-25px' }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.12, ease: editorialEase }}
      className={`group flex min-w-0 flex-col ${viewMode === 'list' ? 'md:flex-row md:gap-8 md:border-b md:border-gray-200 md:pb-8' : ''}`}
    >
      <div className={`relative min-w-0 ${viewMode === 'list' ? 'md:w-[42%] md:shrink-0' : ''}`}>
        <Link
          to={`/properties/${property.id}`}
          aria-label={`View ${property.title}`}
          className="block overflow-hidden rounded-[5px] bg-gray-200"
        >
          <div className={`relative ${viewMode === 'list' ? 'aspect-[4/3] md:aspect-[1.65]' : 'aspect-[1.31]'}`}>
            <motion.img
              src={property.images[0]}
              alt={property.title}
              loading={index > 2 ? 'lazy' : 'eager'}
              onLoad={() => setLoaded(true)}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: editorialEase }}
              className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </Link>
        <span className="absolute left-3.5 top-3.5 bg-[#f8f7f3]/95 px-3 py-2 text-[10px] font-semibold tracking-[.04em] text-primary-900 sm:left-4 sm:top-4">
          {property.status === 'rent' ? 'For rent' : 'For sale'}
        </span>
        <motion.button
          type="button"
          onClick={() => toggleWishlist(property.id)}
          aria-label={saved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
          aria-pressed={saved}
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.82 }}
          transition={{ type: 'spring', stiffness: 440, damping: 20 }}
          className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f7f3]/95 transition-colors sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${saved ? 'text-primary-700' : 'text-primary-900 hover:bg-white'}`}
        >
          <Heart size={18} strokeWidth={1.6} fill={saved ? 'currentColor' : 'none'} />
        </motion.button>
      </div>

      <div className={`flex min-h-[128px] min-w-0 flex-1 flex-col pt-4 ${viewMode === 'list' ? 'md:min-h-0 md:justify-center md:pt-0' : ''}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="min-w-0 font-serif text-[23px] leading-[1.15] tracking-[-.025em] text-primary-900 sm:text-[25px]">
            <Link to={`/properties/${property.id}`} className="inline-flex items-baseline gap-1.5 transition-colors hover:text-primary-600">
              <span>{property.title}</span>
              <ArrowUpRight size={15} strokeWidth={1.5} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </h3>
          <span className="whitespace-nowrap font-sans text-[13px] font-semibold tracking-[-.01em] text-primary-900 sm:text-sm">
            {formatPrice(property.price, property.status)}
          </span>
        </div>
        <p className="mt-1.5 truncate text-[12px] leading-5 text-gray-500 sm:text-[13px]" title={property.address}>{location}</p>

        <div className="mt-auto flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-gray-200 pt-3">
          <p className="min-w-0 text-[11px] tracking-[.01em] text-gray-600 sm:text-[12px]">
            {property.bedrooms} bd <span className="mx-1 text-gray-400">·</span> {property.bathrooms} ba <span className="mx-1 text-gray-400">·</span> {property.area.toLocaleString()} sqft
          </p>
          <motion.button
            type="button"
            onClick={() => toggleCompare(property.id)}
            disabled={comparisonFull}
            title={comparisonFull ? 'You can compare up to four homes' : undefined}
            aria-pressed={comparing}
            whileTap={{ scale: 0.93 }}
            className={`inline-flex items-center gap-1.5 text-[11px] transition-colors sm:text-[12px] ${comparing ? 'font-semibold text-primary-800' : 'text-gray-500 hover:text-primary-900'} disabled:opacity-40`}
          >
            <Columns2 size={15} strokeWidth={1.4} />
            {comparing ? 'Added to compare' : 'Compare'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}