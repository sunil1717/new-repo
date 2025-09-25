import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BsRecycle, BsShieldCheck, BsMap, BsTree, BsCheckCircle } from "react-icons/bs";
import { Helmet } from 'react-helmet';

const Recycling = () => {
  const services = [
  {
    icon: <BsRecycle size={40} className="text-red-600" />,
    title: "Convenient Mobile Tyre Collection",
    description:
      "We come to your home, business, or worksite in suburbs like Glen Waverley, Oakleigh, and Springvale to collect old tyres—no need to transport them yourself.",
    image: "/tyre services/tyre recycle.jpg",
  },
  {
    icon: <BsShieldCheck size={40} className="text-red-600" />,
    title: "Environmentally Responsible & Compliant",
    description:
      "We follow strict recycling guidelines, ensuring your tyres are disposed of sustainably and safely without harming Melbourne’s environment.",
    image: "/tyre services/tyre recycle (2).jpg",
  },
  {
    icon: <BsMap size={40} className="text-red-600" />,
    title: "Serving Melbourne’s Wide Suburbs",
    description:
      "Our mobile tyre recycling covers Dandenong, Frankston, Berwick, Knox, Narre Warren, and many other south-eastern and bayside suburbs.",
    image: "/tyre services/tyre recycle (3).jpg",
  },
  {
    icon: <BsTree size={40} className="text-red-600" />,
    title: "Supporting a Cleaner Community",
    description:
      "By recycling your tyres with us, you help reduce waste and contribute to a greener Melbourne for future generations.",
    image: "/tyre services/tyre recycle (4).jpg",
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
    <title>Eco-Friendly Tyre Recycling Melbourne | Aussie Mobile Tyres</title>
<meta name="title" content="Eco-Friendly Tyre Recycling Melbourne | Aussie Mobile Tyres" />
<meta name="description" content="Responsible tyre recycling services across south east melbourne. Dispose of old tyres safely with our mobile collection and eco-friendly recycling solutions." />
<meta name="keywords" content="tyre recycling Melbourne, eco-friendly tyre disposal, mobile tyre recycling, tyre disposal service, sustainable tyre recycling" />

 </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Tyre Recycling Services
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Responsible Tyre Recycling Services Near You
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Dispose of your old tyres safely and sustainably with Aussie Mobile Tyre’s mobile tyre recycling—conveniently collected from your home or business.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/tyrerecycle.png"
            alt="Tyre Recycling Service"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Eco-Friendly Tyre Recycling Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              At Aussie Mobile Tyres, we understand the importance of responsible tyre disposal to protect the environment. That’s why we offer easy mobile tyre recycling services throughout Melbourne’s south-eastern, eastern, and bayside suburbs. Whether you’re in Glen Waverley, Dandenong, Frankston, Clayton, or Berwick, we collect your used tyres directly from your location and ensure they are recycled according to industry best practices. Recycling your tyres helps reduce landfill waste, prevent pollution, and supports the circular economy by turning old tyres into useful products.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Mobile Collection of Old & Worn Tyres
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Environmentally Responsible Disposal
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Recycling of Passenger & Light Commercial Tyres
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Bulk & Single Tyre Recycling Options
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Advice on Sustainable Tyre Replacement
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Tyre Recycling Service?
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

export default Recycling;
