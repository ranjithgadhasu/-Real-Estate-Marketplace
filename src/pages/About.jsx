import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';

const values = [
  ['Thoughtful by design', 'We make finding a home feel clear, personal, and considered.'],
  ['People first', 'The best real estate experience starts by listening to what matters to you.'],
  ['Rooted in place', 'Local knowledge turns a good address into the right neighborhood.'],
];

const team = [
  { name: 'Alexandra Reyes', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85' },
  { name: 'Marcus Johnson', role: 'Chief Operating Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85' },
  { name: 'Priya Patel', role: 'Head of Technology', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&q=85' },
  { name: 'David Kim', role: 'Director of Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700&q=85' },
];

export default function About() {
  return (
    <div className="bg-[#f8f7f3]">
      <PageHeader eyebrow="Our story" title="Home is where our story begins." description="A more personal approach to real estate, built around the places and people that matter most." />
      <section className="site-container grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[590px]">
          <p className="eyebrow mb-4">The beginning</p>
          <h2 className="editorial-heading">A better way to find your place.</h2>
          <p className="mt-6 text-[15px] leading-8 text-gray-600">Founded in 2010, Estately started with a simple belief: buying or selling a home should feel exciting, transparent, and empowering. What began as a small team of passionate real estate professionals has grown into a marketplace built around people, not just properties.</p>
          <p className="mt-4 text-[15px] leading-8 text-gray-600">We bring together considered homes, trusted local expertise, and simple tools to make the journey feel more human at every step.</p>
          <Link to="/services" className="text-link mt-8">Discover our approach <ArrowRight size={17} strokeWidth={1.5} /></Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[5px]"><img src="https://images.pexels.com/photos/33752181/pexels-photo-33752181.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1500" alt="Modern home surrounded by greenery" loading="lazy" className="aspect-[1.14] w-full object-cover" /></motion.div>
      </section>
      <section className="border-y border-gray-200 bg-[#f1f0e9] py-20 sm:py-24">
        <div className="site-container">
          <p className="eyebrow mb-4">What we believe</p><h2 className="editorial-heading mb-10">The things that guide us.</h2>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            {values.map(([title, description], index) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="border-t border-gray-300 pt-6"><span className="text-[11px] text-gray-500">0{index + 1}</span><h3 className="mt-3 font-serif text-[26px] text-primary-900">{title}</h3><p className="mt-2 text-[13px] leading-7 text-gray-600">{description}</p></motion.div>)}
          </div>
        </div>
      </section>
      <section className="site-container py-20 sm:py-28">
        <p className="eyebrow mb-4">Behind Estately</p><h2 className="editorial-heading mb-10">Meet the people making it personal.</h2>
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((member, index) => <motion.div key={member.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><div className="overflow-hidden rounded-[4px]"><img src={member.image} alt={member.name} loading="lazy" className="aspect-[4/4.7] w-full object-cover" /></div><h3 className="mt-4 font-serif text-[22px] text-primary-900">{member.name}</h3><p className="mt-1 text-xs text-gray-500">{member.role}</p></motion.div>)}
        </div>
      </section>
      <section className="bg-primary-900 py-18 text-[#f8f7f3] sm:py-20">
        <div className="site-container flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><h2 className="max-w-[700px] font-serif text-[clamp(2.5rem,5vw,4.3rem)] leading-[1.07] tracking-[-.04em]">Ready to find a place that's yours?</h2><Link to="/properties" className="inline-flex shrink-0 items-center gap-3 border-b border-white pb-2 text-sm font-semibold">Explore homes <ArrowRight size={17} strokeWidth={1.5} /></Link></div>
      </section>
    </div>
  );
}