import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Columns2, Heart, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import ImageGallery from '../components/property/ImageGallery.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { getPropertyById, getRelatedProperties } from '../data/properties.js';
import { getAgentById } from '../data/agents.js';
import { useApp } from '../context/AppContext.jsx';
import { formatArea, formatPrice, getPropertyTypeLabel, getStatusLabel } from '../utils/helpers.js';

const inputClass = 'w-full rounded-[3px] border border-gray-200 bg-[#f8f7f3] px-4 py-3 text-[13px] text-primary-900 outline-none placeholder:text-gray-400 focus:border-primary-500';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyById(id);
  const agent = property ? getAgentById(property.agentId) : null;
  const related = property ? getRelatedProperties(property.id, 3) : [];
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare, compareList } = useApp();
  const [tab, setTab] = useState('overview');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [notice, setNotice] = useState('');
  const [shareNotice, setShareNotice] = useState('');

  if (!property) {
    return <div className="site-container py-24"><h1 className="editorial-heading">This home could not be found.</h1><Link to="/properties" className="text-link mt-7">Explore other homes <ArrowRight size={17} /></Link></div>;
  }

  const saved = isInWishlist(property.id);
  const comparing = isInCompare(property.id);
  const comparisonFull = compareList.length >= 4 && !comparing;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: property.title, url });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareNotice('Link copied');
        window.setTimeout(() => setShareNotice(''), 2800);
      } else window.prompt('Copy this property link', url);
    } catch {
      setShareNotice('Unable to share right now');
      window.setTimeout(() => setShareNotice(''), 2800);
    }
  };

  const scheduleTour = () => {
    setForm((previous) => ({ ...previous, message: `I would like to schedule a tour of ${property.title}. Please let me know what times are available.` }));
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const sendEnquiry = (event) => {
    event.preventDefault();
    if (!agent) return;
    const subject = `Enquiry about ${property.title}`;
    const body = `Hi ${agent.name},\n\n${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}`;
    window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with your message ready to send.');
  };

  return (
    <div className="bg-[#f8f7f3] pb-24">
      <div className="site-container pt-7 sm:pt-10">
        <Link to="/properties" className="inline-flex items-center gap-2 text-[12px] text-gray-600 transition-colors hover:text-primary-900"><ArrowLeft size={15} strokeWidth={1.5} /> All homes</Link>
        <div className="mt-6 flex flex-col justify-between gap-5 sm:mt-8 lg:flex-row lg:items-end">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="eyebrow mb-3">{getStatusLabel(property.status)} / {getPropertyTypeLabel(property.type)}</p>
            <h1 className="font-serif text-[clamp(2.7rem,5.4vw,5rem)] leading-[1.05] tracking-[-.045em] text-primary-900">{property.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-gray-600 sm:text-[14px]"><MapPin size={16} strokeWidth={1.4} />{property.address}</p>
          </motion.div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4 lg:flex-col lg:items-end">
            <p className="whitespace-nowrap text-[23px] font-semibold tracking-[-.035em] text-primary-900 sm:text-[28px]">{formatPrice(property.price, property.status)}</p>
            <div className="flex flex-wrap items-center gap-5 text-[12px] text-gray-600">
              <button type="button" onClick={() => toggleWishlist(property.id)} aria-pressed={saved} className="inline-flex items-center gap-1.5 hover:text-primary-900"><Heart size={17} strokeWidth={1.4} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}</button>
              <button type="button" onClick={() => toggleCompare(property.id)} aria-pressed={comparing} disabled={comparisonFull} title={comparisonFull ? 'You can compare up to four homes' : undefined} className="inline-flex items-center gap-1.5 hover:text-primary-900 disabled:opacity-40"><Columns2 size={17} strokeWidth={1.4} />{comparing ? 'Comparing' : 'Compare'}</button>
              <button type="button" onClick={share} className="inline-flex items-center gap-1.5 hover:text-primary-900"><Share2 size={16} strokeWidth={1.4} />Share</button>
              {shareNotice && <span role="status" className="text-primary-700">{shareNotice}</span>}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10"><ImageGallery images={property.images} title={property.title} /></div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-y-7 border-y border-gray-200 py-7 sm:grid-cols-4 sm:gap-y-0">
              {[
                ['Bedrooms', property.bedrooms], ['Bathrooms', property.bathrooms], ['Living area', formatArea(property.area)], ['Year built', property.yearBuilt],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] text-gray-500">{label}</p>
                  <p className="mt-1 text-[17px] font-semibold text-primary-900 sm:text-[19px]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex gap-6 overflow-x-auto border-b border-gray-200 sm:gap-9">
              {[
                ['overview', 'Overview'], ['features', 'Features & amenities'], ['location', 'Location'],
              ].map(([key, label]) => (
                <button key={key} type="button" onClick={() => setTab(key)} className={`relative shrink-0 pb-4 text-[13px] transition-colors ${tab === key ? 'font-semibold text-primary-900' : 'text-gray-500 hover:text-primary-900'}`}>
                  {label}
                  {tab === key && <motion.span layoutId="property-tab" className="absolute inset-x-0 bottom-0 h-[1.5px] bg-primary-900" />}
                </button>
              ))}
            </div>

            <div className="min-h-[230px] pt-8">
              {tab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-[32px] tracking-[-.025em] text-primary-900">About this home</h2>
                  <p className="mt-4 max-w-[720px] text-[15px] leading-8 text-gray-600">{property.description}</p>
                  {property.tourAvailable && <p className="mt-5 text-[12px] text-gray-500">Virtual tour available. Contact the agent for details.</p>}
                </motion.div>
              )}
              {tab === 'features' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-[32px] tracking-[-.025em] text-primary-900">Details worth noticing</h2>
                  <div className="mt-6 grid gap-x-9 sm:grid-cols-2">
                    {property.features.map((feature) => <div key={feature} className="flex items-center gap-3 border-b border-gray-200 py-3.5 text-[13px] text-gray-700"><Check size={16} strokeWidth={1.5} className="shrink-0 text-primary-600" />{feature}</div>)}
                  </div>
                </motion.div>
              )}
              {tab === 'location' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-[32px] tracking-[-.025em] text-primary-900">In the neighborhood</h2>
                  <p className="mt-4 text-[15px] text-gray-600">{property.address}</p>
                  <p className="mt-2 text-[12px] text-gray-500">{Math.abs(property.lat).toFixed(4)}° {property.lat >= 0 ? 'N' : 'S'}, {Math.abs(property.lng).toFixed(4)}° {property.lng >= 0 ? 'E' : 'W'}</p>
                  <a href={`https://www.google.com/maps?q=${property.lat},${property.lng}`} target="_blank" rel="noopener noreferrer" className="text-link mt-7">Open in Google Maps <ArrowRight size={17} strokeWidth={1.4} /></a>
                </motion.div>
              )}
            </div>
          </div>

          {agent && (
            <aside id="enquiry" className="h-fit scroll-mt-28 border border-gray-200 bg-white p-6 lg:sticky lg:top-28 lg:p-7">
              <p className="eyebrow mb-4">A question about this home?</p>
              <Link to={`/agents/${agent.id}`} className="group flex items-center gap-3 border-b border-gray-200 pb-5">
                <img src={agent.image} alt={agent.name} className="h-12 w-12 rounded-full object-cover" />
                <span><span className="block font-serif text-[20px] leading-tight text-primary-900 group-hover:text-primary-600">{agent.name}</span><span className="mt-1 block text-[11px] text-gray-500">{agent.title}</span></span>
              </Link>
              <div className="mt-5 flex items-center gap-5 text-[12px] text-primary-900">
                <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-1.5 hover:opacity-60"><Phone size={15} strokeWidth={1.5} /> Call</a>
                <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-1.5 hover:opacity-60"><Mail size={15} strokeWidth={1.5} /> Email</a>
                <button type="button" onClick={scheduleTour} className="border-b border-primary-900 pb-0.5 hover:opacity-60">Schedule a tour</button>
              </div>
              <form onSubmit={sendEnquiry} className="mt-7 space-y-3">
                <label className="sr-only" htmlFor="property-name">Your name</label><input id="property-name" type="text" required placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputClass} />
                <label className="sr-only" htmlFor="property-email">Email address</label><input id="property-email" type="email" required placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputClass} />
                <label className="sr-only" htmlFor="property-phone">Phone number</label><input id="property-phone" type="tel" placeholder="Phone number (optional)" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={inputClass} />
                <label className="sr-only" htmlFor="property-message">Your message</label><textarea id="property-message" required rows={4} placeholder="Tell us what you would like to know..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${inputClass} resize-none`} />
                <button type="submit" className="flex w-full items-center justify-center gap-2 bg-primary-900 px-5 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-primary-700">Contact {agent.name.split(' ')[0]} <ArrowRight size={16} strokeWidth={1.5} /></button>
                {notice && <p role="status" className="text-[11px] leading-5 text-primary-700">{notice}</p>}
              </form>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-14 sm:mt-24 sm:pt-16">
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><p className="eyebrow mb-3">Keep exploring</p><h2 className="editorial-heading">More homes like this.</h2></div>
              <Link to="/properties" className="text-link shrink-0">All homes <ArrowRight size={17} strokeWidth={1.4} /></Link>
            </div>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-7">{related.map((item, index) => <PropertyCard key={item.id} property={item} index={index} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}