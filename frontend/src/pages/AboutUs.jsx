import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Faq from "../components/Faq";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
          <Helmet>
<title>About Aussie Mobile Tyres | Trusted Mobile Tyre Services Melbourne</title>
<meta name="title" content="About Aussie Mobile Tyres | Trusted Mobile Tyre Services Melbourne" />
<meta name="description" content="Learn about Aussie Mobile Tyres – Melbourne’s trusted mobile tyre specialists. Professional, reliable, and eco-friendly tyre services delivered to your doorstep." />
<meta name="keywords" content="about Aussie Mobile Tyres, mobile tyre specialists Melbourne, trusted tyre service, professional tyre experts, eco-friendly tyre services" />

      </Helmet>
      <Navbar />

      {/* Hero Section */}
     <div
  className="relative text-white py-20 px-6 mt-25 sm:mt-35 text-center"
  style={{ backgroundColor: "#DA2627" }}
>
  <motion.h1
    className="text-4xl md:text-6xl font-bold mb-4"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
  >
    About Us
  </motion.h1>
</div>


      {/* Who We Are Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="/tyre services/tyre inspection (3).jpg"
          alt="Our Team"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Aussie Mobile Tyres</h2>
          <p className="text-gray-600 leading-relaxed">
            At Aussie Mobile Tyres, we bring convenience to your doorstep with reliable and professional mobile tyre services across Melbourne’s south-eastern suburbs. Whether you’re at home, work, or on the road, our team is equipped to handle everything from tyre sales and puncture repairs to fleet servicing and tyre recycling. With a strong focus on quality and customer care, we ensure your safety and satisfaction with every visit. Servicing areas from Glen Waverley to Frankston and beyond, we’re your trusted mobile tyre specialists—making tyre care easy, accessible, and stress-free, wherever you are.
          </p>
        </motion.div>
      </div>

      {/* Mission / Vision / Values Section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {/* Card 1 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i class="bi bi-tools text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">We Come to You</h3>
            <p className="text-gray-600">
              No need to waste time at a workshop. Our mobile service vans come directly to your location, whether it's your driveway, office, or roadside. We make tyre services simple and hassle-free.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i className="bi bi-bullseye text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Wide Range of Services</h3>
            <p className="text-gray-600">
              From tyre fitting and sales to wheel balancing, puncture repairs, and recycling—we do it all. Our comprehensive range of services means you only need one tyre expert for every need.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i className="bi bi-award text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Trusted by Fleets</h3>
            <p className="text-gray-600">
              Our team is trusted by businesses to maintain their vehicle fleets with prompt, professional, and reliable tyre services. We help keep your operations running smoothly and safely.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i className="bi bi-award text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Quality Brands & Advice</h3>
            <p className="text-gray-600">
              We stock trusted tyre brands and provide honest advice tailored to your vehicle, budget, and driving needs. Your safety is our priority, and we never cut corners on quality.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i className="bi bi-person text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Local Experts You Can Rely On</h3>
            <p className="text-gray-600">
              As a locally owned business, we know the roads and the communities we serve. Our reputation is built on personal service, trust, and a commitment to getting the job done right.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <i className="bi bi-recycle text-red-500 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly Tyre Recycling</h3>
            <p className="text-gray-600">
              We care about the environment as much as we care about your tyres. That’s why we offer responsible tyre disposal and recycling, reducing waste and supporting a cleaner future.
            </p>
          </motion.div>
        </div>
      </div>
    <Faq/>
      {/* Call to Action */}
      
      <Footer />
    </>
  );
};

export default AboutUs;
