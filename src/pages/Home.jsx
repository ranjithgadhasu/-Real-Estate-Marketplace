import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import AmenitiesSection from '../components/home/AmenitiesSection.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { properties, propertyTypes } from '../data/properties.js';
import { agents } from '../data/agents.js';
import { defaultFilters, useApp } from '../context/AppContext.jsx';
import { editorialEase, heroSequence, riseIn } from '../utils/motion.js';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: editorialEase },
};

export default function Home() {
  const [query, setQuery] = useState('');
  const { setFilters, setCurrentPage } = useApp();
  const navigate = useNavigate();
  const featured = properties.filter((property) => property.featured).slice(0, 3);

  const searchHomes = (event) => {
    event.preventDefault();
    setFilters({ ...defaultFilters, search: query.trim() });
    setCurrentPage(1);
    navigate('/properties');
  };

  const browseType = (type) => {
    setFilters({ ...defaultFilters, type });
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f8f7f3]">
      <section className="relative isolate flex min-h-[650px] items-end overflow-hidden bg-primary-950 sm:min-h-[700px] lg:min-h-[calc(100svh-76px)]">
        <motion.img
          initial={{ scale: 1.14, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 2.4, ease: editorialEase }, opacity: { duration: 1.3 } }}
          src="https://images.pexels.com/photos/7587880/pexels-photo-7587880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200"
          alt="Contemporary home surrounded by a green garden"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,37,29,.82)_0%,rgba(16,37,29,.55)_48%,rgba(16,37,29,.10)_100%),linear-gradient(0deg,rgba(16,37,29,.28),transparent_40%)]" />
        <motion.div
          variants={heroSequence}
          initial="hidden"
          animate="visible"
          className="site-container relative z-10 pb-14 pt-24 text-[#fbfaf6] sm:pb-20 lg:pb-[11vh]"
        >
          <motion.div variants={riseIn}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.25em] text-white/80 sm:text-xs">A more personal way home</p>
            <h1 className="font-serif text-[clamp(4rem,11.5vw,10.5rem)] leading-[.83] tracking-[-.07em]">Estately<span className="text-[#c4a782]">.</span></h1>
          </motion.div>
          <motion.div variants={riseIn}>
            <h2 className="mt-7 max-w-[680px] font-serif text-[clamp(2.25rem,4.2vw,4.15rem)] leading-[1.04] tracking-[-.04em]">
              Find a place that feels like yours.
            </h2>
          </motion.div>
          <motion.p variants={riseIn} className="mt-5 max-w-[500px] text-[15px] leading-7 text-white/85 sm:text-[16px]">
            Thoughtfully selected homes, trusted local experts, and room to imagine what comes next.
          </motion.p>
          <motion.form
            variants={riseIn}
            onSubmit={searchHomes}
            className="relative mt-9 flex max-w-[590px] items-center gap-3 border-b border-white/40 pb-2 sm:mt-11"
          >
            <Search className="hidden shrink-0 text-white/80 sm:block" size={19} strokeWidth={1.6} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="City, neighborhood, or address"
              aria-label="Find a home by city, neighborhood, or address"
              className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[14px] text-white outline-none placeholder:text-white/75 sm:text-[15px]"
            />
            <motion.button type="submit" whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.96 }} className="flex shrink-0 items-center gap-2 rounded-[3px] bg-[#f8f7f3] px-4 py-3 text-[12px] font-semibold text-primary-900 transition-colors hover:bg-white sm:px-6 sm:text-[13px]">
              Search homes <ArrowRight size={16} strokeWidth={1.6} />
            </motion.button>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, delay: 1.05, ease: editorialEase }}
              className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-[#d2ba9b]"
            />
          </motion.form>
        </motion.div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28" id="featured">
        <div className="site-container">
          <motion.div {...reveal} className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">A collection worth exploring</p>
              <h2 className="editorial-heading max-w-[760px]">Homes with a little more feeling.</h2>
              <p className="mt-3 text-[14px] leading-6 text-gray-500 sm:text-[15px]">A small collection of places we think you should see.</p>
            </div>
            <Link to="/properties" className="text-link shrink-0 md:mb-2">
              View all homes <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-7">
            {featured.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f1f0e9] py-20 sm:py-24">
        <div className="site-container">
          <motion.div {...reveal} className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Find your kind of place</p>
            <h2 className="editorial-heading">Every home tells a different story.</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {propertyTypes.filter((type) => type.value !== 'all').map((type, index) => {
              const count = properties.filter((property) => property.type === type.value).length;
              return (
                <motion.div key={type.value} {...reveal} transition={{ duration: 0.55, delay: index * 0.07 }}>
                  <Link to="/properties" onClick={() => browseType(type.value)} className="group flex items-end justify-between border-t border-gray-300 py-7 sm:py-9">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[.15em] text-gray-500">0{index + 1} / {count} HOMES</span>
                      <h3 className="mt-3 font-serif text-[27px] tracking-[-.03em] text-primary-900 transition-colors group-hover:text-primary-600 sm:text-[30px]">{type.label}s</h3>
                    </div>
                    <ArrowUpRight size={21} strokeWidth={1.3} className="mb-1 text-primary-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AmenitiesSection />

      <section className="py-20 sm:py-28">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <motion.div {...reveal} className="max-w-[490px] lg:py-10">
            <p className="eyebrow mb-4">The Estately approach</p>
            <h2 className="editorial-heading">The right home changes everything.</h2>
            <p className="mt-6 text-[15px] leading-8 text-gray-600">
              A home is more than a listing. It is where your days unfold. We bring together considered properties and people who know their neighborhoods to help you find your place.
            </p>
            <Link to="/services" className="text-link mt-8">How we can help <ArrowRight size={18} strokeWidth={1.5} /></Link>
          </motion.div>
          <motion.div {...reveal} className="overflow-hidden rounded-[5px]">
            <img
              src="https://images.pexels.com/photos/6970051/pexels-photo-6970051.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1050&w=1450"
              alt="Light-filled living space with a view"
              loading="lazy"
              className="aspect-[1.2] w-full object-cover lg:aspect-[1.3]"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-gray-200 py-20 sm:py-24">
        <div className="site-container">
          <motion.div {...reveal} className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">People behind the places</p>
              <h2 className="editorial-heading">Good guidance feels personal.</h2>
              <p className="mt-3 max-w-xl text-[14px] leading-6 text-gray-500 sm:text-[15px]">Meet local experts who know the details that make a place feel like home.</p>
            </div>
            <Link to="/agents" className="text-link shrink-0 md:mb-2">Meet our agents <ArrowRight size={18} strokeWidth={1.5} /></Link>
          </motion.div>
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {agents.slice(0, 4).map((agent, index) => (
              <motion.div key={agent.id} {...reveal} transition={{ duration: 0.55, delay: index * 0.07 }}>
                <Link to={`/agents/${agent.id}`} className="group block">
                  <div className="overflow-hidden rounded-[5px] bg-gray-200">
                    <img src={agent.image} alt={agent.name} loading="lazy" className="aspect-[4/4.6] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="font-serif text-[23px] leading-tight text-primary-900">{agent.name}</h3>
                    <ArrowUpRight size={17} strokeWidth={1.5} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{agent.title} / {agent.location}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-20 text-[#f8f7f3] sm:py-24">
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div {...reveal}>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#b9c8ba]">Your next chapter starts here</p>
            <h2 className="max-w-[720px] font-serif text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.06] tracking-[-.04em]">Let's find somewhere you love to come home to.</h2>
          </motion.div>
          <Link to="/properties" className="inline-flex shrink-0 items-center gap-3 border-b border-[#f8f7f3] pb-2 text-sm font-semibold transition-[gap] hover:gap-5">
            Explore homes <ArrowUpRight size={18} strokeWidth={1.4} />
          </Link>
        </div>
      </section>
    </div>
  );
}