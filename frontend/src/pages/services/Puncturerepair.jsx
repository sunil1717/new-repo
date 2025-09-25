import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BsTruckFront, BsClipboardCheck, BsPersonBadge, BsCashStack, BsCheckCircle } from "react-icons/bs";
import { Helmet } from 'react-helmet';

const PunctureRepair = () => {
  const services = [
  {
    icon: <BsTruckFront size={40} className="text-red-600" />,
    title: "Fast Response When You Need It Most",
    description:
      "Flat tyres don’t wait—and neither do we. Our mobile team responds promptly to get you back on the road with minimal downtime.",
    image: "/tyre services/puncture repair (2).jpg",
  },
  {
    icon: <BsClipboardCheck size={40} className="text-red-600" />,
    title: "Safe, Reliable Repairs at Your Location",
    description:
      "We come equipped with professional tools and repair kits to handle punctures safely and effectively, right where your vehicle is parked.",
    image: "/tyre repair (3).jpg",
  },
  {
    icon: <BsPersonBadge size={40} className="text-red-600" />,
    title: "Serving Melbourne’s Wide Suburbs",
    description:
      "From Glen Waverley and Oakleigh to Springvale, Berwick, and Frankston, we provide quick puncture repairs wherever you are in Melbourne’s south east and bayside areas.",
    image: "/tyre services/puncture repair (3).jpg",
  },
  {
    icon: <BsCashStack size={40} className="text-red-600" />,
    title: "Transparent Pricing and Honest Advice",
    description:
      "We assess whether a puncture can be safely repaired or if tyre replacement is needed—and always provide clear, upfront pricing and recommendations.",
    image: "/tyre services/puncture repair (4).jpg",
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
<title>Mobile Puncture Repair Melbourne | Fast & Reliable Tyre Repair</title>
<meta name="title" content="Mobile Puncture Repair Melbourne | Fast & Reliable Tyre Repair" />
<meta name="description" content="Get quick and reliable mobile puncture repair anywhere in Melbourne. Our expert team fixes tyre punctures onsite to get you back on the road fast." />
<meta name="keywords" content="mobile puncture repair Melbourne, tyre puncture repair, onsite puncture repair, mobile tyre repair, fast tyre repair Melbourne" />
 </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Fast Mobile Puncture Repair
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Fast Mobile Puncture Repair Wherever You Are
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Flat tyre? Aussie Mobile Tyres offers fast, reliable puncture repair
            services right at your home, workplace, or roadside—so you can get
            back on the road quickly and safely.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/tyre services/puncture repair.jpg"
            alt="Mobile Puncture Repair"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Professional Puncture Repair Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              Aussie Mobile Tyres specialises in quick, effective puncture repairs
              across Melbourne’s south-east, eastern, and bayside suburbs. Our expert
              technicians come to your location fully equipped to assess and repair
              most tyre punctures safely on the spot. Whether you’re stuck in Glen
              Waverley, Frankston, Dandenong, Clayton, or Cranbourne, we’ll be there
              fast to fix your tyre without the hassle of a tow or workshop visit.
              We use industry-approved techniques to ensure your tyre is sealed
              correctly and ready to drive on, saving you time and money.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Mobile Onsite Tyre Puncture Repair
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Safety Inspections Before Repair
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Quick Emergency Roadside Service
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Advice on Tyre Condition & Replacement
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Seamless Repairs for Cars, SUVs & Light Commercials
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Puncture Repair Service?
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

export default PunctureRepair;
