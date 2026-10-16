import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import CompareBar from './components/property/CompareBar.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Compare from './pages/Compare.jsx';
import Agents from './pages/Agents.jsx';
import AgentDetail from './pages/AgentDetail.jsx';
import SubmitProperty from './pages/SubmitProperty.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import MortgageCalculator from './pages/MortgageCalculator.jsx';
import FAQ from './pages/FAQ.jsx';
import Services from './pages/Services.jsx';
import Blog from './pages/Blog.jsx';
import { useApp } from './context/AppContext.jsx';
import { editorialEase } from './utils/motion.js';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const { compareList } = useApp();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        {!isAuthPage && <Navbar />}
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: editorialEase }}
              className="w-full min-w-0"
            >
              <ScrollToTop />
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agents/:id" element={<AgentDetail />} />
                <Route path="/submit-property" element={<SubmitProperty />} />
                <Route path="/services" element={<Services />} />
                <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAuthPage && <Footer />}
        {!isAuthPage && location.pathname !== '/compare' && compareList.length > 0 && <div className="h-[76px]" />}
        {!isAuthPage && <CompareBar />}
      </div>
    </MotionConfig>
  );
}
