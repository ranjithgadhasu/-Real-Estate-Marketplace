import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] items-center bg-[#f8f7f3] py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="site-container">
        <p className="eyebrow mb-4">404 / Page not found</p>
        <h1 className="max-w-[700px] font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[1.02] tracking-[-.05em] text-primary-900">This isn't quite the place.</h1>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-gray-600">The page you are looking for may have moved. Let's get you back to the homes.</p>
        <Link to="/properties" className="text-link mt-9">Explore homes <ArrowRight size={18} strokeWidth={1.5} /></Link>
      </motion.div>
    </div>
  );
}