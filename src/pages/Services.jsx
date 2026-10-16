import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';

const services = [
  { title: 'Buy a home', description: 'Find your dream home with expert guidance from first search to closing.', features: 'Personal matching / Home tours / Expert negotiation', to: '/properties', action: 'Explore homes' },
  { title: 'Sell a home', description: 'Present your property beautifully and reach the right people with a considered plan.', features: 'Pricing guidance / Photography / Marketing', to: '/submit-property', action: 'List your home' },
  { title: 'Investment properties', description: 'Discover opportunities with the help of local market knowledge.', features: 'Market insight / Rental search / Portfolio support', to: '/properties', action: 'Explore properties' },
  { title: 'Property management', description: 'A thoughtful approach to looking after properties and the people who live in them.', features: 'Tenant support / Maintenance / Reporting', to: '/contact', action: 'Get in touch' },
  { title: 'Mortgage guidance', description: 'Understand your options and make confident decisions about your next move.', features: 'Payment estimates / Rate guidance / Lender connections', to: '/mortgage-calculator', action: 'Estimate a payment' },
  { title: 'Commercial real estate', description: 'Explore spaces for work, investment, and what your business becomes next.', features: 'Office / Retail / Multi-family properties', to: '/contact', action: 'Start a conversation' },
  { title: 'Relocation', description: 'Make a new city feel like your own, one neighborhood at a time.', features: 'Area orientation / Local knowledge / Housing support', to: '/contact', action: 'Plan your move' },
  { title: 'Agent partnership', description: 'Join a team that believes great real estate starts with good people.', features: 'Tools / Marketing support / Professional growth', to: '/contact', action: 'Connect with us' },
];

const process = [
  ['01', 'Get acquainted', 'We learn what matters to you, from your daily routines to your long-term plans.'],
  ['02', 'Explore together', 'We help you narrow the search and see the places that feel most promising.'],
  ['03', 'Find your fit', 'Tour, ask questions, and get clear advice without feeling rushed.'],
  ['04', 'Move with confidence', 'We help with the details through negotiation, paperwork, and closing.'],
];

export default function Services() {
  return (
    <div className="bg-[#f8f7f3]">
      <PageHeader eyebrow="What we do" title="Real estate, more thoughtfully." description="From your first home to your next investment, we make space for better decisions and a more personal experience." />
      <section className="site-container py-20 sm:py-24">
        <p className="eyebrow mb-4">Ways we can help</p><h2 className="editorial-heading mb-10">For every next chapter.</h2>
        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.article key={service.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (index % 2) * 0.08 }} className="border-t border-gray-300 pt-6">
              <div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-semibold tracking-[.15em] text-gray-500">0{index + 1}</span><h3 className="mt-2 font-serif text-[29px] tracking-[-.025em] text-primary-900">{service.title}</h3></div><ArrowUpRight size={19} strokeWidth={1.4} className="text-primary-900" /></div>
              <p className="mt-3 max-w-lg text-[14px] leading-7 text-gray-600">{service.description}</p>
              <p className="mt-4 text-[11px] leading-5 text-gray-500">{service.features}</p>
              <Link to={service.to} className="text-link mt-6">{service.action} <ArrowRight size={16} strokeWidth={1.5} /></Link>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="border-t border-gray-200 bg-[#f1f0e9] py-20 sm:py-24">
        <div className="site-container"><p className="eyebrow mb-4">The process</p><h2 className="editorial-heading mb-10">Simple steps, good guidance.</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">{process.map(([number, title, description]) => <div key={number} className="border-t border-gray-300 pt-5"><p className="text-[11px] text-gray-500">{number}</p><h3 className="mt-4 font-serif text-[24px] text-primary-900">{title}</h3><p className="mt-2 text-[13px] leading-7 text-gray-600">{description}</p></div>)}</div>
        </div>
      </section>
      <section className="bg-primary-900 py-20 text-[#f8f7f3]"><div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="max-w-[680px] font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.07] tracking-[-.04em]">Let's make your next move a good one.</h2><Link to="/contact" className="inline-flex shrink-0 items-center gap-3 border-b border-white pb-2 text-sm font-semibold">Get in touch <ArrowRight size={17} strokeWidth={1.5} /></Link></div></section>
    </div>
  );
}