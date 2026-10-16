import { motion } from 'framer-motion';
import { heroSequence, riseIn } from '../../utils/motion.js';

export default function PageHeader({ eyebrow, title, description, aside }) {
  return (
    <section className="border-b border-gray-200 bg-[#f8f7f3] py-12 sm:py-16 lg:py-20">
      <div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          variants={heroSequence}
          initial="hidden"
          animate="visible"
        >
          {eyebrow && <motion.p variants={riseIn} className="eyebrow mb-4">{eyebrow}</motion.p>}
          <motion.h1 variants={riseIn} className="max-w-[840px] font-serif text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.02] tracking-[-.045em] text-primary-900">{title}</motion.h1>
          {description && <motion.p variants={riseIn} className="mt-4 max-w-[640px] text-[14px] leading-7 text-gray-600 sm:text-[15px]">{description}</motion.p>}
        </motion.div>
        {aside && <div className="shrink-0 md:pb-2">{aside}</div>}
      </div>
    </section>
  );
}