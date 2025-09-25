import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/testimonial.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 md:px-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-12 text-gray-800 text-center md:text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
What Our Customers Say About Us      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* Red Rating Box */}
        <motion.div
          className="bg-red-900 text-white rounded-xl p-6 flex flex-col justify-between shadow-md"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="text-lg font-semibold mb-6 leading-snug">
              Aussie Mobile Tyres Best Mobile Tyres Services In South East Melbourne
            </h3>
          </div>
          <div>
            <p className="uppercase text-sm mb-1">Excellent Reviews On Google</p>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.072 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.071-3.292a1 1 0 00-.364-1.118L2.427 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.951-.69l1.071-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Elfsight Widget Container */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="elfsight-app-dd93d0ad-b197-4c20-8abf-41b2aabd6c50" data-elfsight-app-lazy></div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
