import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from 'react-helmet';

import {   BsTruckFront,
  BsClipboardCheck,
  BsPersonBadge,
  BsCashStack,
  BsCheckCircle,
} from "react-icons/bs";

const OnsiteFitting = () => {
   const services = [
  {
    icon: <BsTruckFront size={40} className="text-red-600" />,
    title: "We Come to You – Anytime, Anywhere",
    description:
      "Stuck at home or busy at work? We’ll come to you with everything needed for a full tyre replacement—saving you time, effort, and inconvenience.",
    image: "/tyre services/onsite fitting.jpg",
  },
  {
    icon: <BsClipboardCheck size={40} className="text-red-600" />,
    title: "Fast & Hassle-Free Service",
    description:
      "Our mobile service vans are fully equipped for quick and efficient tyre fitting. No delays, no detours—just quality service at your convenience.",
    image: "/tyre services/onsite fitting (2).jpg",
  },
  {
    icon: <BsPersonBadge size={40} className="text-red-600" />,
    title: "Trusted Experts with the Right Tools",
    description:
      "Our experienced technicians use professional tools to ensure your new tyres are fitted, balanced, and road-ready the first time, every time.",
    image: "/tyre services/onsite fitting (4).jpg",
  },
  {
    icon: <BsCashStack size={40} className="text-red-600" />,
    title: "Serving Local Melbourne Suburbs",
    description:
      "We offer onsite tyre fitting in Glen Waverley, Oakleigh, Springvale, Cranbourne, Berwick, and beyond—wherever you need us, we’re only a call away.",
    image: "/tyre services/onsite fitting (3).jpg",
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
   <title>Mobile Onsite Tyre Fitting Melbourne | Fast, Expert Service</title>
<meta name="title" content="Mobile Onsite Tyre Fitting Melbourne | Fast, Expert Service" />
<meta name="description" content="Need tyres fitted at home or work? Get expert onsite tyre fitting anywhere in Melbourne. Fast, professional mobile tyre replacement – we come to you!" />
<meta name="keywords" content="onsite tyre fitting Melbourne, mobile tyre fitting, tyre fitting at home, mobile tyre service Melbourne, tyre replacement service, mobile tyre change" />

 </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Onsite Tyre Fitting
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Onsite Tyre Fitting at Your Location
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Need new tyres but don’t have time to visit a workshop? Our onsite
            tyre fitting service brings expert tyre replacement straight to
            your driveway, workplace, or roadside—wherever you are.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/onsite1.jpg"
            alt="Mobile Tyre Fitting"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Convenient Mobile Tyre Fitting Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              At Aussie Mobile Tyres, we make tyre replacement easy and
              stress-free with our fully mobile onsite tyre fitting service. No
              more waiting in queues or losing hours at a tyre shop—our trained
              technicians come directly to your home, office, or job site. We
              carry a wide range of tyres to suit all vehicle types and budgets,
              along with the latest tools for safe removal, installation, and
              balancing.
              <br />
              <br />
              Whether you're in Glen Waverley, Dandenong, Frankston, Clayton, or
              Rowville, we’ve got your tyre needs covered. It’s fast,
              professional, and done right where you need it.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Tyre Removal & Replacement
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> New Tyre Installation at Your Location
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Wheel Balancing Onsite
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Tyre Pressure & Safety Checks
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Emergency Onsite Tyre Fitting
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Onsite Tyre Fitting?
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

export default OnsiteFitting;
