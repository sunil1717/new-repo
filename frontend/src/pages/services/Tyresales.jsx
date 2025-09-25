import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiAutoRepair, GiSpeedometer } from "react-icons/gi";
import { BsTruck, BsTags, BsPeople, BsLightningCharge } from "react-icons/bs";
import { Helmet } from 'react-helmet';


const Tyresales = () => {
  const services = [
  {
    icon: <BsTruck size={40} className="text-red-600" />,
    title: "Tyre Services That Come to You",
    description: "Skip the waiting room—we bring tyre services directly to your home, office, or roadside location. It’s the most convenient way to replace or repair your tyres.",
    image: "/tyre services/tyre sales.jpg",
  },
  {
    icon: <BsTags size={40} className="text-red-600" />,
    title: "Top Tyre Brands, Honest Advice",
    description: "We carry a wide range of reliable tyre brands to suit your needs and budget. Not sure what you need? Our technicians offer clear, helpful advice with no pressure.",
    image: "/tyre services/tyre sales (3).jpg",
  },
  {
    icon: <BsPeople size={40} className="text-red-600" />,
    title: "Expert Technicians You Can Trust",
    description: "All our technicians are trained professionals with experience in fitting and repairing tyres across all vehicle types. We care about getting the job done right, every time.",
    image: "/tyre services/tyre sales (4).jpg",
  },
  {
    icon: <BsLightningCharge size={40} className="text-red-600" />,
    title: "Fast, Affordable, and Reliable",
    description: "We pride ourselves on punctual service, fair pricing, and quality workmanship. Whether it’s one tyre or an entire fleet, we deliver dependable results when and where you need them.",
    image: "/tyre services/tyre sales (5).jpg",
  },
];

  // Function to chunk array into groups of 2
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
<title>Tyre Sales Melbourne | Quality Tyres Delivered & Fitted</title>
<meta name="title" content="Tyre Sales Melbourne | Quality Tyres Delivered & Fitted" />
<meta name="description" content="Browse and buy quality tyres from trusted brands in Melbourne. Mobile delivery and fitting available—convenient, professional, and reliable service." />
<meta name="keywords" content="tyre sales Melbourne, buy tyres Melbourne, mobile tyre delivery, quality tyres, tyre fitting Melbourne" />

 </Helmet>
      <Navbar />

      {/* Page Banner */}
      <div
        className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
        style={{ backgroundColor: "#DA2627" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Tyre Sales</h1>
      </div>

      <div className="mt-10 mb-20 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center my-8">
            <h2 style={{ fontSize: "40px" }} className="font-semibold">
Mobile Tyre Service at Your Doorstep            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Looking for a local tyre shop near you? Aussie Mobile Tyres delivers professional tyre services right to your location—saving you time, money, and the hassle of visiting a workshop.
            </p>
          </div>

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row  items-center md:items-start gap-8 bg-white ">
            <img
              src="/tyre services/tyre sales (2).jpg"
              alt="Tyre Sales"
              className="w-full md:w-1/2 h-100 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
            <h3  style={{ fontSize: "40px" }} className="font-semibold">Professional Mobile Tyre Service</h3>
              <p className="text-gray-700 text-lg">
Aussie Mobile Tyres is your trusted Mobile Tyre Service, servicing homes, businesses, and fleets across Melbourne’s southeast. We stock a wide range of tyre brands to suit all vehicles and budgets, with expert fitters ready to install, balance, and rotate your tyres on-site. Whether you need one tyre or a full replacement set, we bring the tyre shop to you. Our technicians are fully equipped to handle everything on the spot—saving you valuable time. We offer honest advice, fast service, and high-quality tyres that keep you safe and confident on the road.              </p>
              <ul className=" list-inside text-gray-700 space-y-2">
                <li><i class="bi bi-check2-circle text-red-500"></i> New Tyre Sales & Fitting</li>
                <li><i class="bi bi-check2-circle text-red-500"></i> Mobile Tyre Installation</li>
                <li><i class="bi bi-check2-circle text-red-500"></i> Wheel Balancing & Rotation</li>
                <li><i class="bi bi-check2-circle text-red-500"></i> Tyre Safety Inspections</li>
                <li><i class="bi bi-check2-circle text-red-500"></i> Puncture Repairs & Replacements</li>
              </ul>
            </div>
          </div>

<div className="text-center mb-8">
  <h2 style={{ fontSize: "40px" }} className="font-semibold">
    Why Choose Our Mobile Tyre Service?
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

export default Tyresales;
