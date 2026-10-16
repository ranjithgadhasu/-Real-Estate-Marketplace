import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Search, UserRound, X } from 'lucide-react';
import { defaultFilters, useApp } from '../../context/AppContext.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, wishlist, compareList, logout, setFilters, setCurrentPage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navigation = [
    { to: '/properties', label: 'Explore' },
    { to: '/agents', label: 'Agents' },
    { to: '/wishlist', label: 'Saved', count: wishlist.length },
    { to: '/compare', label: 'Compare', count: compareList.length },
  ];

  const search = (event) => {
    event.preventDefault();
    setFilters({ ...defaultFilters, search: query.trim() });
    setCurrentPage(1);
    navigate('/properties');
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e2da] bg-[#f8f7f3]/95 backdrop-blur-xl"
      >
        <div className="site-container grid h-[68px] grid-cols-[1fr_auto] items-center lg:h-[76px] lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="group inline-flex w-fit flex-col justify-center leading-none" aria-label="Estately home">
            <span className="font-serif text-[31px] leading-[.85] tracking-[-.055em] text-primary-900 transition-colors group-hover:text-primary-600 sm:text-[34px]">
              estately<span className="text-accent-500">.</span>
            </span>
            <span className="mt-[6px] pl-[2px] text-[7px] font-bold tracking-[.24em] text-gray-500 sm:text-[8px]">
              A MORE PERSONAL WAY HOME
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `relative flex h-[76px] items-center gap-1.5 text-[13px] transition-colors ${isActive ? 'font-semibold text-primary-900' : 'text-gray-600 hover:text-primary-900'}`}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {item.count > 0 && <span className="text-[10px] text-primary-600">{item.count}</span>}
                    {isActive && (
                      <motion.span
                        layoutId="primary-nav-underline"
                        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-primary-800"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-5 lg:flex xl:gap-7">
            <button
              type="button"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className="text-primary-900 transition-opacity hover:opacity-60"
            >
              {searchOpen ? <X size={19} strokeWidth={1.6} /> : <Search size={19} strokeWidth={1.6} />}
            </button>
            <Link to="/submit-property" className="whitespace-nowrap text-[13px] font-semibold text-primary-900 transition-opacity hover:opacity-60">
              List your home
            </Link>
            <span className="h-5 w-px bg-gray-200" />
            {user ? (
              <button type="button" onClick={logout} className="flex items-center gap-2 whitespace-nowrap text-[13px] text-primary-900 hover:opacity-60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 font-serif text-lg">{user.name?.charAt(0) || 'U'}</span>
                Sign out
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 whitespace-nowrap text-[13px] text-primary-900 transition-opacity hover:opacity-60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"><UserRound size={16} strokeWidth={1.5} /></span>
                Sign in
              </Link>
            )}
          </div>

          <div className="flex items-center justify-end gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => { setSearchOpen((open) => !open); setMenuOpen(false); }}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              className="flex h-11 w-11 items-center justify-center text-primary-900"
            >
              <Search size={21} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => { setMenuOpen((open) => !open); setSearchOpen(false); }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center text-primary-900"
            >
              {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={search}
              className="overflow-hidden border-t border-gray-200 bg-[#f8f7f3]"
            >
              <div className="site-container flex items-center gap-4 py-4">
                <Search size={20} strokeWidth={1.5} className="shrink-0 text-gray-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="City, neighborhood, or address"
                  aria-label="Search homes"
                  autoFocus
                  className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-primary-900 outline-none placeholder:text-gray-400"
                />
                <button type="submit" className="flex items-center gap-2 text-sm font-semibold text-primary-900">
                  Search <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              aria-label="Mobile navigation"
              className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-gray-200 bg-[#f8f7f3] lg:hidden"
            >
              <div className="site-container py-5">
                {[...navigation, { to: '/services', label: 'Our services' }, { to: '/about', label: 'About us' }, { to: '/contact', label: 'Contact' }].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `flex items-center justify-between border-b border-gray-200 py-3.5 font-serif text-[24px] ${isActive ? 'text-primary-600' : 'text-primary-900'}`}
                  >
                    {item.label}
                    {item.count > 0 ? <span className="font-sans text-xs">{item.count}</span> : <ArrowRight size={17} strokeWidth={1.4} />}
                  </NavLink>
                ))}
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-6 text-sm font-medium text-primary-900">
                  <Link to="/submit-property" className="border-b border-primary-900 pb-1">List your home</Link>
                  {user ? (
                    <button type="button" onClick={() => { logout(); setMenuOpen(false); }}>Sign out</button>
                  ) : (
                    <>
                      <Link to="/login">Sign in</Link>
                      <Link to="/register">Create an account</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="h-[68px] lg:h-[76px]" />
    </>
  );
}