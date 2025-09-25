import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTruck,
  FaTools,
  FaMapMarkedAlt,
  FaUserShield,
  FaClock,
  FaRecycle
} from 'react-icons/fa';

const features = [
  {
  icon: <FaTruck size={30} className="text-red-600" />,
  title: 'We Come to You – Anytime, Anywhere',
  description:
    'Say goodbye to long waits at tyre shops. Our fully equipped mobile units come to your home, office, or roadside location to provide top-quality tyre services at your convenience.'
},
{
  icon: <FaTools size={30} className="text-red-600" />,
  title: 'Comprehensive Tyre Services Under One Roof',
  description:
    'From puncture repair to wheel balancing and tyre recycling, we do it all. Whether it\'s regular maintenance or an urgent fix, we’ve got your tyre needs covered.'
},
{
  icon: <FaMapMarkedAlt size={30} className="text-red-600" />,
  title: 'Servicing Over 100 South-East Melbourne Suburbs',
  description:
    'We proudly serve suburbs like Glen Waverley, Dandenong, Frankston, Cranbourne, Berwick, and more. Our broad service area means you’re never far from expert mobile tyre support.'
},
{
  icon: <FaUserShield size={30} className="text-red-600" />,
  title: 'Experienced Technicians Who Care About Your Safety',
  description:
    'Our technicians are trained, certified, and experienced in all aspects of tyre service. We don’t just replace tyres—we make sure your vehicle is safe and road-ready every time.'
},
{
  icon: <FaClock size={30} className="text-red-600" />,
  title: 'Fast Response Times, Transparent Pricing',
  description:
    "We value your time. That’s why we offer rapid response across all suburbs, with upfront quotes and no hidden costs. You’ll know exactly what you're paying for before we begin."
},
{
  icon: <FaRecycle size={30} className="text-red-600" />,
  title: 'Eco-Friendly Tyre Recycling for a Greener Future',
  description:
    'We dispose of old tyres responsibly through certified recycling programs. By choosing us, you\'re not only ensuring safe driving—you’re also supporting a cleaner, more sustainable environment.'
}

];

// Motion variants for staggered card animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const WhyUsSection = () => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 md:px-20">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-start mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Why Choose Aussie Mobile Tyres?
      </motion.h2>

      <motion.p
        className="text-start max-w-3xl mx-0.5 text-gray-600 mb-12 text-sm sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We combine convenience with expert service—offering fast, professional, and affordable tyre solutions right at your home, workplace, or roadside. Your safety and satisfaction are always our top priorities.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition hover:-translate-y-1 hover:scale-105"
            variants={cardVariants}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyUsSection;
