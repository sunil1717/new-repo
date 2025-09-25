import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from 'react-helmet';  // <-- Import Helmet
import {   BsTruckFront,
  BsClipboardCheck,
  BsPersonBadge,
  BsCashStack,
  BsCheckCircle,
} from "react-icons/bs";

const Fleet = () => {
  const services = [
    {
      icon: <BsTruckFront size={40} className="text-red-600" />,
      title: "Onsite Tyre Services – We Come to You",
      description:
        "No more lost time sending vehicles to a workshop. Our fully equipped mobile units perform tyre services at your location—reducing downtime and keeping your team productive.",
      image: "/tyre services/fleet tyre replace.jpg",
    },
    {
      icon: <BsClipboardCheck size={40} className="text-red-600" />,
      title: "Fleet-Focused Maintenance Programs",
      description:
        "We tailor our services to suit your fleet’s size, usage, and needs. Regular inspections and preventative maintenance help reduce blowouts, extend tyre life, and avoid costly repairs.",
      image: "/tyre services/fleet repair.jpg",
    },
    {
      icon: <BsPersonBadge size={40} className="text-red-600" />,
      title: "Experienced Technicians You Can Trust",
      description:
        "Our team has extensive experience servicing commercial and business fleets across south east melbourne. We work efficiently, professionally, and with minimal disruption to your operations.",
      image: "/tyre services/fleet tyre replace (3).jpg",
    },
    {
      icon: <BsCashStack size={40} className="text-red-600" />,
      title: "Competitive Rates & Clear Reporting",
      description:
        "We offer fair pricing for all fleet services and provide detailed records for each vehicle. Whether it's a single van or an entire fleet, you'll know exactly what was done and when.",
      image: "/tyre services/fleet tyre replace (4).jpg",
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
    <title>Fleet Tyre Services in Melbourne | Aussie Mobile Tyres</title>
<meta name="title" content="Fleet Tyre Services in Melbourne | Aussie Mobile Tyres" />
<meta name="description" content="Professional fleet tyre services across south east melbourne. Reliable onsite tyre fitting, repairs, and maintenance to keep your business vehicles moving." />
<meta name="keywords" content="fleet tyre services Melbourne, mobile fleet tyre fitting, fleet tyre maintenance, commercial tyre services, onsite fleet tyre repair" />
 </Helmet>
      <Navbar />

      {/* Page Banner */}
      <div
        className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
        style={{ backgroundColor: "#DA2627" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
          Fleet Tyre Services
        </h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center my-8">
            <h2 style={{ fontSize: "40px" }} className="font-semibold">
              Fleet Tyre Services for Melbourne Businesses
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Keep your business on the move with expert fleet tyre services
              delivered right to your location. Aussie Mobile Tyres ensures your
              fleet is safe, roadworthy, and always ready to go.
            </p>
          </div>

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
            <img
              src="/tyre services/fleet tyre replace (2).jpg"
              alt="Tyre Sales"
              className="w-full md:w-1/2 h-100 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <h3 style={{ fontSize: "40px" }} className="font-semibold">
                Reliable Fleet Tyre Services Across South East Melbourne
              </h3>
              <p className="text-gray-700 text-lg">
                At Aussie Mobile Tyres, we understand that your fleet is the
                heart of your business. Downtime costs money—that’s why we
                provide fast, reliable, and professional fleet tyre services
                across Melbourne’s eastern, southeastern, and bayside suburbs.
                Whether you manage a small delivery fleet, trades vehicles, or a
                large corporate fleet, we deliver on-site tyre fitting,
                replacements, puncture repairs, balancing, and
                inspections—minimizing disruption and keeping your vehicles
                road-ready. We bring top-tier tyre care to your depot, office,
                or worksite, saving you the hassle of sending vehicles to a
                traditional tyre shop. With expert technicians, quality tyres,
                and flexible scheduling, Aussie Mobile Tyres is your fleet's
                trusted partner.
              </p>
              <ul className="list-inside text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <BsCheckCircle className="text-red-500" /> Scheduled Fleet Tyre Inspections
                </li>
                <li className="flex items-center gap-2">
                  <BsCheckCircle className="text-red-500" /> Onsite Tyre Replacement & Repairs
                </li>
                <li className="flex items-center gap-2">
                  <BsCheckCircle className="text-red-500" /> Tyre Rotation & Wheel Balancing
                </li>
                <li className="flex items-center gap-2">
                  <BsCheckCircle className="text-red-500" /> Emergency Roadside Tyre Support
                </li>
                <li className="flex items-center gap-2">
                  <BsCheckCircle className="text-red-500" /> Ongoing Tyre Maintenance Programs
                </li>
              </ul>
            </div>
          </div>

          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 style={{ fontSize: "40px" }} className="font-semibold">
              Why Choose Aussie Mobile Tyres for Your Fleet?
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
  )
}

export default Fleet;
