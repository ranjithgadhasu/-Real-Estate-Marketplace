import { motion } from 'framer-motion';
import { Calendar, User, Clock, BookOpen, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';

const blogPosts = [
  {
    id: 1,
    title: '10 Tips for First-Time Home Buyers in 2025',
    excerpt: 'Navigating the real estate market as a first-time buyer can be overwhelming. Here are 10 essential tips to help you make informed decisions and find the perfect home.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    author: 'Sarah Mitchell',
    date: 'March 15, 2025',
    category: 'Buying',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: '2025 Real Estate Market Forecast: What to Expect',
    excerpt: 'Our expert analysis of what the housing market has in store for buyers, sellers, and investors this year. Interest rates, inventory trends, and hot markets to watch.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    author: 'James Chen',
    date: 'March 10, 2025',
    category: 'Market Trends',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 3,
    title: 'How to Increase Your Home Value Before Selling',
    excerpt: 'Strategic renovations and upgrades that yield the highest return on investment. Learn which improvements buyers care about most and which ones you should skip.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    author: 'Amanda Rodriguez',
    date: 'March 5, 2025',
    category: 'Selling',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 4,
    title: 'Understanding Mortgage Rates: A Complete Guide',
    excerpt: 'Fixed-rate, adjustable-rate, FHA, VA, conventional — we break down all the mortgage options and help you choose the right one for your situation.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    author: 'Michael Thompson',
    date: 'February 28, 2025',
    category: 'Financing',
    readTime: '10 min read',
  },
  {
    id: 5,
    title: 'The Ultimate Neighborhood Guide to Miami',
    excerpt: 'From South Beach to Coral Gables, explore Miami\'s most desirable neighborhoods, average home prices, amenities, and lifestyle.',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&q=80',
    author: 'Emily Watson',
    date: 'February 20, 2025',
    category: 'Neighborhoods',
    readTime: '12 min read',
  },
  {
    id: 6,
    title: 'Home Staging Secrets That Sell Properties Fast',
    excerpt: 'Professional stagers share their top tips for making your home look irresistible to buyers — without spending a fortune.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    author: 'David Park',
    date: 'February 15, 2025',
    category: 'Selling',
    readTime: '5 min read',
  },
  {
    id: 7,
    title: 'Renting vs. Buying: Which is Right for You?',
    excerpt: 'We weigh the pros and cons of each option with updated financial analysis to help you make the best decision for your lifestyle and goals.',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    author: 'Sarah Mitchell',
    date: 'February 8, 2025',
    category: 'Buying',
    readTime: '9 min read',
  },
  {
    id: 8,
    title: 'Investment Properties: Beginner\'s Guide to Rental Income',
    excerpt: 'Everything you need to know about building passive income through real estate investing, from finding properties to managing tenants.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    author: 'James Chen',
    date: 'January 30, 2025',
    category: 'Investing',
    readTime: '11 min read',
  },
  {
    id: 9,
    title: 'Eco-Friendly Home Upgrades That Pay Off',
    excerpt: 'Green improvements that reduce your carbon footprint and save you money long-term. Many of these also boost your home value.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    author: 'Amanda Rodriguez',
    date: 'January 22, 2025',
    category: 'Home Improvement',
    readTime: '6 min read',
  },
];

const categories = ['All', 'Buying', 'Selling', 'Financing', 'Investing', 'Market Trends', 'Neighborhoods', 'Home Improvement'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="bg-[#f8f7f3] min-h-screen pb-20">
      <PageHeader eyebrow="The journal" title="Notes on living well." description="Perspectives on places, thoughtful buying, and everything that makes a house a home." />

      <div className="site-container py-12 sm:py-16">
        <label className="mb-10 flex max-w-xl items-center gap-3 border-b border-gray-300 pb-3">
          <SearchIcon size={18} strokeWidth={1.5} className="shrink-0 text-gray-500" />
          <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search the journal" aria-label="Search articles" className="w-full min-w-0 border-0 bg-transparent text-[13px] text-primary-900 outline-none placeholder:text-gray-400" />
        </label>
        {!searchTerm && activeCategory === 'All' && (
          <section className="mb-16">
            <h2 className="font-serif text-[30px] text-primary-900 mb-7">Featured stories.</h2>
            <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {featuredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-0"
                >
                  <div className="aspect-[1.35] overflow-hidden rounded-[4px]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-[24px] leading-[1.18] text-primary-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-[13px] leading-6 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <span className="text-[11px] text-gray-500">{post.category}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        <div className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border-b pb-3 text-[12px] transition-colors ${
                activeCategory === category
                  ? 'border-primary-900 font-semibold text-primary-900'
                  : 'border-transparent text-gray-600 hover:text-primary-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {(searchTerm || activeCategory !== 'All' ? filteredPosts : regularPosts).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="min-w-0"
            >
              <div className="aspect-[1.35] overflow-hidden rounded-[4px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-[23px] leading-[1.2] text-primary-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-[13px] leading-6 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500 pt-3 border-t border-gray-200">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                  <span className="ml-auto">{post.category}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif text-[30px] text-primary-900 mb-2">No articles found.</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}
