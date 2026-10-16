import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { getPropertyById } from '../data/properties.js';
import { useApp } from '../context/AppContext.jsx';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useApp();
  const saved = wishlist.map(getPropertyById).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      <PageHeader eyebrow="Your collection" title="The homes you love." description={`${saved.length} ${saved.length === 1 ? 'home' : 'homes'} saved for a closer look. Keep the places that speak to you in one place.`} />
      <div className="site-container pt-10 sm:pt-14">
        {saved.length ? (
          <>
            <div className="mb-7 flex justify-end"><button type="button" onClick={() => saved.forEach((property) => toggleWishlist(property.id))} className="border-b border-gray-400 pb-1 text-[12px] text-gray-600 hover:text-primary-900">Clear saved homes</button></div>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-7">
              {saved.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
            </div>
          </>
        ) : (
          <div className="border-t border-gray-200 py-20 text-center">
            <Heart size={29} strokeWidth={1.25} className="mx-auto text-gray-500" />
            <h2 className="mt-5 font-serif text-[32px] text-primary-900">Your collection starts here.</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-600">Save the homes you want to come back to. They will be waiting here whenever you are ready.</p>
            <Link to="/properties" className="text-link mx-auto mt-6">Explore homes <ArrowRight size={17} strokeWidth={1.5} /></Link>
          </div>
        )}
      </div>
    </div>
  );
}