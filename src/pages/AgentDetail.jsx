import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone, Star } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { getAgentById } from '../data/agents.js';
import { properties } from '../data/properties.js';

const fieldClass = 'w-full rounded-[3px] border border-gray-200 bg-[#f8f7f3] px-4 py-3 text-[13px] text-primary-900 outline-none placeholder:text-gray-400 focus:border-primary-500';

export default function AgentDetail() {
  const { id } = useParams();
  const agent = getAgentById(id);
  const listings = properties.filter((property) => property.agentId === Number(id));
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [notice, setNotice] = useState('');

  if (!agent) return <div className="site-container py-24"><h1 className="editorial-heading">Agent not found.</h1><Link to="/agents" className="text-link mt-6">Meet our team <ArrowRight size={17} /></Link></div>;

  const submit = (event) => {
    event.preventDefault();
    const body = `Hi ${agent.name},\n\n${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}`;
    window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent('Real estate enquiry')}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with your message ready to send.');
  };

  return (
    <div className="bg-[#f8f7f3] pb-24">
      <div className="site-container pt-8">
        <Link to="/agents" className="inline-flex items-center gap-2 text-[12px] text-gray-600 hover:text-primary-900"><ArrowLeft size={15} strokeWidth={1.5} /> All agents</Link>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[4px] bg-gray-200">
            <img src={agent.image.replace('w=400', 'w=950')} alt={agent.name} className="aspect-[4/4.5] w-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="lg:pt-9">
            <p className="eyebrow mb-4">Meet your local expert</p>
            <h1 className="font-serif text-[clamp(3rem,5.5vw,5.4rem)] leading-[1.03] tracking-[-.045em] text-primary-900">{agent.name}</h1>
            <p className="mt-3 text-[15px] text-gray-600">{agent.title}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-gray-600">
              <span className="inline-flex items-center gap-1.5"><MapPin size={15} strokeWidth={1.5} /> {agent.location}</span>
              <span className="inline-flex items-center gap-1.5"><Star size={15} strokeWidth={1.5} /> {agent.rating} ({agent.reviews} reviews)</span>
            </div>
            <p className="mt-8 max-w-[670px] text-[15px] leading-8 text-gray-600">{agent.bio}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              <a href={`tel:${agent.phone}`} className="text-link"><Phone size={16} strokeWidth={1.5} /> {agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="text-link"><Mail size={16} strokeWidth={1.5} /> Email {agent.name.split(' ')[0]}</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
              {[[agent.experience, 'Years of experience'], [agent.sold, 'Homes sold'], [agent.listings, 'Active listings']].map(([value, label]) => <div key={label}><p className="font-serif text-[28px] text-primary-900 sm:text-[34px]">{value}</p><p className="mt-1 text-[11px] leading-4 text-gray-500">{label}</p></div>)}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-14 border-t border-gray-200 pt-12 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-20">
          <div>
            <h2 className="font-serif text-[31px] tracking-[-.025em] text-primary-900">A little more about {agent.name.split(' ')[0]}</h2>
            <div className="mt-7 grid gap-8 sm:grid-cols-2">
              <div><p className="eyebrow mb-3">Specialties</p><ul className="space-y-2 text-[13px] leading-6 text-gray-700">{agent.specialties.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><p className="eyebrow mb-3">Languages</p><p className="text-[13px] leading-6 text-gray-700">{agent.languages.join(', ')}</p></div>
            </div>
          </div>
          <aside className="border border-gray-200 bg-white p-6 lg:p-7">
            <p className="eyebrow mb-3">Let's connect</p>
            <h2 className="font-serif text-[28px] leading-tight text-primary-900">Ask {agent.name.split(' ')[0]} a question.</h2>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="sr-only" htmlFor="agent-name">Name</label><input id="agent-name" required type="text" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={fieldClass} />
              <label className="sr-only" htmlFor="agent-email">Email</label><input id="agent-email" required type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={fieldClass} />
              <label className="sr-only" htmlFor="agent-phone">Phone</label><input id="agent-phone" type="tel" placeholder="Phone number (optional)" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={fieldClass} />
              <label className="sr-only" htmlFor="agent-message">Message</label><textarea id="agent-message" required rows={4} placeholder="How can I help you?" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${fieldClass} resize-none`} />
              <button type="submit" className="flex w-full items-center justify-center gap-2 bg-primary-900 px-5 py-3.5 text-[12px] font-semibold text-white hover:bg-primary-700">Open email app <ArrowRight size={16} /></button>
              {notice && <p role="status" className="text-[11px] leading-5 text-primary-700">{notice}</p>}
            </form>
          </aside>
        </div>

        {listings.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-14 sm:mt-24 sm:pt-16">
            <p className="eyebrow mb-3">The collection</p>
            <h2 className="editorial-heading mb-9">Homes with {agent.name.split(' ')[0]}.</h2>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-7">{listings.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}