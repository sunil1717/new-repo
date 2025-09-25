import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from 'react-helmet';

import { BsInfoCircle, BsClipboardCheck, BsPersonBadge,  BsCheckCircle } from "react-icons/bs";
const Inspections = () => {
 const services = [
  {
    icon: <BsClipboardCheck size={40} className="text-red-600" />,
    title: "Convenient Mobile Inspections at Your Location",
    description:
      "No need to visit a workshop—our mobile team inspects your tyres wherever you are, whether it’s home, work, or roadside in Glen Waverley, Clayton, or Springvale.",
    image: "/inspection1.avif",
  },
  {
    icon: <BsCheckCircle size={40} className="text-red-600" />,
    title: "Enhance Vehicle Safety & Performance",
    description:
      "Regular inspections detect issues early, helping to avoid dangerous blowouts and improve handling on Melbourne’s roads.",
    image: "/tyre services/tyre inspection (4).jpg",
  },
  {
    icon: <BsPersonBadge size={40} className="text-red-600" />,
    title: "Serving a Wide Range of Melbourne Suburbs",
    description:
      "We offer mobile tyre inspections throughout Dandenong, Frankston, Berwick, Knoxfield, Narre Warren, and many other south-eastern and bayside suburbs.",
    image: "/tyre services/tyre inspection (3).jpg",
  },
  {
    icon: <BsInfoCircle size={40} className="text-red-600" />,
    title: "Expert Advice & Honest Reporting",
    description:
      "Our experienced technicians provide clear reports and recommendations, helping you make informed decisions about tyre repairs or replacements.",
    image: "/tyre services/tyre inspection.jpg",
  },
];

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const serviceRows = chunkArray(services, 2);

return (
  <>
  <Helmet>
      <title>Mobile Tyre Inspections in Melbourne | Aussie Mobile Tyres</title>
<meta name="title" content="Mobile Tyre Inspections in Melbourne | Aussie Mobile Tyres" />
<meta name="description" content="Ensure your safety with expert mobile tyre inspections across south east melbourne. We check tread depth, wear patterns & tyre condition at your location." />
<meta name="keywords" content="tyre inspection Melbourne, mobile tyre inspection, tyre safety check, tyre condition check, tyre tread inspection, onsite tyre services" />

   </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Tyre Inspections
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Comprehensive Mobile Tyre Inspections 
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Wherever You Are Stay safe on the road with thorough tyre inspections from Aussie Mobile Tyres—conveniently conducted at your home, workplace, or roadside.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/inspection.jpg"
            alt="Mobile Tyre Inspection"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Expert Tyre Inspection Services Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              Regular tyre inspections are essential to ensure your tyres are safe, roadworthy, and performing optimally. Aussie Mobile Tyres offers professional mobile tyre inspection services across Melbourne’s south-eastern, eastern, and bayside suburbs. Whether you’re located in Glen Waverley, Dandenong, Frankston, Oakleigh, or Berwick, our skilled technicians come directly to you, checking tread depth, tyre pressure, sidewall condition, and overall tyre health. Early detection of wear or damage helps prevent blowouts and costly repairs, keeping you and your passengers safe on Melbourne’s busy roads.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Detailed Tyre Tread & Pressure Checks
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Sidewall & Valve Condition Assessment
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Identification of Uneven Tyre Wear
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Safety Recommendations & Repair Advice
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Inspections for Cars, SUVs, and Light Commercial Vehicles
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Tyre Inspection Service?
          </h2>
        </div>

        {/* Services Cards */}
        {serviceRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col md:flex-row gap-8">
            {row.map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex-1 h-full md:h-80"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full md:w-1/2 h-64 md:h-full object-cover"
                />
                <div className="p-6 flex flex-col justify-center space-y-4 md:w-1/2">
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
      <Footer />
    </>
  );
}

export default Inspections;
