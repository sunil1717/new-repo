import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiCarWheel } from "react-icons/gi";
import { Helmet } from 'react-helmet';

import { BsTruckFront, BsClipboardCheck, BsPersonBadge, BsCashStack, BsCheckCircle } from "react-icons/bs";
const Wheelbalancing = () => {
  const services = [
  {
    icon: <BsTruckFront size={40} className="text-red-600" />,
    title: "Convenient Mobile Service Saves You Time",
    description:
      "No need to visit a garage or tyre shop. We bring professional wheel balancing right to your driveway or workplace in suburbs like Glen Waverley, Clayton, and Springvale.",
    image: "/tyre services/wheel balancing.jpg",
  },
  {
    icon: <BsClipboardCheck size={40} className="text-red-600" />,
    title: "Improve Ride Comfort & Safety",
    description:
      "Balanced wheels prevent vibrations and steering issues, making every drive smoother and safer on Melbourne’s roads.",
    image: "/tyre services/wheel balancing (2).jpg",
  },
  {
    icon: <BsPersonBadge size={40} className="text-red-600" />,
    title: "Serving Wide Melbourne Suburbs",
    description:
      "We provide reliable wheel balancing in Dandenong, Frankston, Berwick, Narre Warren, Knoxfield, and many other south-eastern suburbs—wherever you are, we’re ready to help.",
    image: "/tyre services/wheel balancing (3).jpg",
  },
  {
    icon: <BsCashStack size={40} className="text-red-600" />,
    title: "Skilled Technicians & Quality Equipment",
    description:
      "Our technicians use state-of-the-art mobile balancing machines to ensure your wheels are perfectly balanced for optimum performance.",
    image: "/tyre services/wheel balancing (4).jpg",
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
<title>Mobile Wheel Balancing Melbourne | Smooth & Safe Ride</title>
<meta name="title" content="Mobile Wheel Balancing Melbourne | Smooth & Safe Ride" />
<meta name="description" content="Get professional mobile wheel balancing across south east melbourne. Enhance tyre performance and vehicle safety with our convenient onsite service." />
<meta name="keywords" content="wheel balancing Melbourne, mobile wheel balancing, onsite wheel balancing service, tyre performance, vehicle safety" />

 </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Precise Mobile Wheel Balancing
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Precise Mobile Wheel Balancing at Your Doorstep
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Ensure a smooth and safe ride with Aussie Mobile Tyre’s expert wheel balancing service—performed conveniently at your home, work, or anywhere you need.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/tyre services/wheel balancing (6).jpg"
            alt="Mobile Wheel Balancing"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Professional Wheel Balancing Services Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              Wheel balancing is key to preventing uneven tyre wear, vibration, and poor handling. Aussie Mobile Tyres offers mobile wheel balancing services throughout Melbourne’s south-eastern, eastern, and bayside suburbs. Whether you’re in Glen Waverley, Oakleigh, Frankston, Dandenong, or Berwick, our experienced technicians come directly to you with the latest balancing equipment to deliver precise, effective results. Properly balanced wheels improve driving comfort, extend tyre life, and enhance vehicle safety—without the hassle of visiting a workshop.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Onsite Wheel Balancing & Adjustment
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Tyre & Wheel Inspection Before Service
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Vibration Diagnosis & Correction
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Balancing for Cars, SUVs & Light Commercial Vehicles
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Advice on Tyre Maintenance & Safety
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Wheel Balancing Service?
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
};

export default Wheelbalancing;
