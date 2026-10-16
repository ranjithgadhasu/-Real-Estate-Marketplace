import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { agents } from '../data/agents.js';

export default function Agents() {
  const [query, setQuery] = useState('');
  const visible = agents.filter((agent) => {
    const term = query.toLowerCase();
    return agent.name.toLowerCase().includes(term) || agent.location.toLowerCase().includes(term) || agent.specialties.some((specialty) => specialty.toLowerCase().includes(term));
  });

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      <PageHeader eyebrow="Our people" title="People who know the places." description="Real local expertise, thoughtful advice, and a personal connection at every step of your search." />
      <div className="site-container pt-8 sm:pt-12">
        <label className="mb-10 flex max-w-[530px] items-center gap-3 border-b border-gray-300 pb-3 sm:mb-14">
          <Search size={18} strokeWidth={1.5} className="shrink-0 text-gray-500" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, location, or specialty" aria-label="Search agents" className="w-full min-w-0 border-0 bg-transparent text-[13px] text-primary-900 outline-none placeholder:text-gray-400" />
        </label>
        {visible.length ? (
          <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((agent, index) => (
              <motion.article key={agent.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: Math.min(index, 3) * 0.07 }}>
                <Link to={`/agents/${agent.id}`} className="group block">
                  <div className="overflow-hidden rounded-[4px] bg-gray-200"><img src={agent.image} alt={agent.name} loading="lazy" className="aspect-[1.12] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /></div>
                  <div className="mt-4 flex items-start justify-between gap-3"><div><h2 className="font-serif text-[26px] leading-tight text-primary-900">{agent.name}</h2><p className="mt-1 text-[12px] text-gray-500">{agent.title} / {agent.location}</p></div><ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0 text-primary-900 opacity-0 transition-opacity group-hover:opacity-100" /></div>
                </Link>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-3 text-[12px] text-gray-600"><span>{agent.experience} years experience</span><Link to={`/agents/${agent.id}`} className="inline-flex items-center gap-1 font-semibold text-primary-900">View profile <ArrowRight size={14} strokeWidth={1.5} /></Link></div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="border-t border-gray-200 py-16 text-center"><h2 className="font-serif text-[30px]">No agents found.</h2><p className="mt-2 text-sm text-gray-500">Try a different name or location.</p></div>
        )}
      </div>
    </div>
  );
}