import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const columns = [
  { title: 'Discover', links: [['All homes', '/properties'], ['Saved homes', '/wishlist'], ['Compare homes', '/compare'], ['Our agents', '/agents']] },
  { title: 'Estately', links: [['Our story', '/about'], ['What we do', '/services'], ['Journal', '/blog'], ['List your home', '/submit-property']] },
  { title: 'Help', links: [['Get in touch', '/contact'], ['Frequently asked questions', '/faq'], ['Mortgage calculator', '/mortgage-calculator'], ['Sign in', '/login']] },
];

export default function Footer() {
  return (
    <footer className="bg-[#1c3529] text-[#f8f7f3]">
      <div className="site-container pt-16 pb-7 sm:pt-20">
        <div className="grid gap-12 border-b border-white/20 pb-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-8">
          <div className="max-w-[300px]">
            <Link to="/" aria-label="Estately home" className="font-serif text-[42px] leading-none tracking-[-.06em]">estately<span className="text-[#c4a782]">.</span></Link>
            <p className="mt-5 text-[13px] leading-7 text-white/70">A more personal way to find a place to call your own.</p>
            <a href="mailto:hello@estately.com" className="mt-6 inline-flex items-center gap-1 border-b border-white/60 pb-1 text-[13px] transition-opacity hover:opacity-60">
              hello@estately.com <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-[#b9c8ba]">{column.title}</h3>
              <ul className="space-y-3.5">
                {column.links.map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-[13px] text-white/80 transition-colors hover:text-white">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-2 pt-7 text-[11px] text-white/50 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Estately. All rights reserved.</span>
          <span>Find a place to feel at home.</span>
        </div>
      </div>
    </footer>
  );
}