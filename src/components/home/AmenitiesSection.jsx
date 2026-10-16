import { motion } from 'framer-motion';

const amenities = [
  {
    title: 'Swimming pool',
    description: 'A private or shared pool for recreation.',
    image: 'https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    alt: 'Modern home with an outdoor swimming pool',
  },
  {
    title: 'Gym / Fitness center',
    description: 'A place for residents to exercise.',
    image: 'https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    alt: 'Bright fitness center with exercise equipment',
  },
  {
    title: "Garden / Children's play area",
    description: 'Outdoor spaces for relaxation and play.',
    image: 'https://images.pexels.com/photos/14545177/pexels-photo-14545177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    alt: 'Neighborhood play area surrounded by greenery',
  },
];

export default function AmenitiesSection() {
  return (
    <section aria-labelledby="amenities-heading" className="border-b border-gray-200 bg-[#f8f7f3] py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          className="max-w-[790px]"
        >
          <p className="eyebrow mb-3">A little more to love</p>
          <h2 id="amenities-heading" className="editorial-heading">Amenities.</h2>
          <div className="mt-5 space-y-3 text-[14px] leading-7 text-gray-700 sm:text-[15px]">
            <p>Amenities are the extra facilities, features, or comforts available in a property or its surrounding community.</p>
            <p>In a real estate website, amenities help buyers or renters understand what makes a property comfortable and convenient.</p>
          </div>
        </motion.div>

        <div className="mt-9 max-w-[790px]">
          {amenities.map((amenity, index) => (
            <motion.article
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="flex items-center gap-4 border-b border-gray-200 py-5 first:pt-0 last:border-b-0 sm:gap-6"
            >
              <img
                src={amenity.image}
                alt={amenity.alt}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-[8px] object-cover sm:h-[100px] sm:w-[100px]"
              />
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-primary-900 sm:text-[16px]">{amenity.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-gray-500 sm:text-[14px]">{amenity.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}