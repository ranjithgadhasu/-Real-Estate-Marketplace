import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader.jsx';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  User,
  Check,
  Building2,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\n${formData.message}`;
    window.location.href = `mailto:hello@estately.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const offices = [
    {
      city: 'New York',
      address: '123 Park Avenue, New York, NY 10022',
      phone: '(212) 555-0100',
      email: 'ny@estately.com',
    },
    {
      city: 'Miami',
      address: '456 Ocean Drive, Miami Beach, FL 33139',
      phone: '(305) 555-0200',
      email: 'miami@estately.com',
    },
    {
      city: 'Los Angeles',
      address: '789 Sunset Blvd, Los Angeles, CA 90069',
      phone: '(310) 555-0300',
      email: 'la@estately.com',
    },
  ];

  return (
    <div className="bg-[#f8f7f3] min-h-screen">
      <PageHeader eyebrow="Get in touch" title="Let's talk about your next move." description="Have a question about a home or need a little guidance? We would love to hear from you." />

      <div className="site-container pt-12 pb-20 sm:pt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-200 p-6 lg:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="font-serif text-[30px] text-primary-900 mb-2">Your message is ready.</h2>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Your email app should open with your message ready to send to our team.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-serif text-[30px] text-primary-900 mb-2">Send us a note.</h2>
                  <p className="text-gray-500 mb-6">Fill out the form below and we'll get back to you shortly.</p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="buying">Buying a Property</option>
                        <option value="selling">Selling a Property</option>
                        <option value="agent">Become an Agent</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="general">General Question</option>
                        <option value="support">Customer Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-primary-900 text-white text-[13px] font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Open email app
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-serif text-[23px] text-primary-900 mb-5 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" />
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:+18005551234" className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:hello@estately.com" className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                      hello@estately.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="font-semibold text-gray-900">Mon - Fri: 9AM - 6PM</p>
                    <p className="text-sm text-gray-500">Sat: 10AM - 4PM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Headquarters</p>
                    <p className="font-semibold text-gray-900">123 Park Avenue</p>
                    <p className="text-sm text-gray-500">New York, NY 10022</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-6">
              <h3 className="font-serif text-[23px] text-primary-900 mb-2">Need immediate help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak with one of our real estate experts right now.
              </p>
              <a
                href="tel:+18005551234"
                className="text-link flex items-center gap-2 text-primary-900"
              >
                <Phone className="w-5 h-5" />
                Call (800) 555-1234
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-gray-200 pt-14"
        >
          <h2 className="font-serif text-[32px] text-primary-900 mb-8">Our offices.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="border-t border-gray-300 pt-6"
              >
                <h3 className="font-serif text-[24px] text-primary-900 mb-3">{office.city}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    {office.address}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    {office.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    {office.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
