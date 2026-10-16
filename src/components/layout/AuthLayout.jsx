import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen bg-[#f8f7f3] lg:grid-cols-[.95fr_1.05fr]">
      <div className="relative hidden overflow-hidden bg-primary-900 lg:block">
        <img src="https://images.pexels.com/photos/5997992/pexels-photo-5997992.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1100" alt="Contemporary home and garden" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,43,31,.75),transparent_65%),linear-gradient(180deg,rgba(20,43,31,.45),transparent_33%)]" />
        <Link to="/" className="absolute left-10 top-9 font-serif text-[38px] leading-none tracking-[-.055em] text-white">estately<span className="text-[#c4a782]">.</span></Link>
        <p className="absolute bottom-12 left-10 right-10 max-w-[500px] font-serif text-[clamp(2.2rem,3.4vw,3.5rem)] leading-[1.06] text-white">A more personal way to find your place.</p>
      </div>
      <div className="flex min-w-0 flex-col justify-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[420px]">
          <Link to="/" className="mb-12 inline-block font-serif text-[32px] leading-none tracking-[-.055em] text-primary-900 lg:hidden">estately<span className="text-accent-500">.</span></Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="eyebrow mb-3">Welcome to Estately</p>
            <h1 className="font-serif text-[clamp(2.7rem,4vw,4rem)] leading-[1.05] tracking-[-.04em] text-primary-900">{title}</h1>
            <p className="mt-3 text-[13px] leading-7 text-gray-600">{subtitle}</p>
            <div className="mt-9">{children}</div>
            {footer && <p className="mt-8 text-[13px] text-gray-600">{footer}</p>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}