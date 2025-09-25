import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BsTruckFront, BsClipboardCheck, BsPersonBadge, BsCashStack, BsCheckCircle } from "react-icons/bs";
import { Helmet } from 'react-helmet';


const Rotations = () => {
  const services = [
  {
    icon: <BsTruckFront size={40} className="text-red-600" />,
    title: "Mobile Service That Saves You Time",
    description:
      "Forget the tyre shop wait times. We come to your home or work in suburbs like Glen Waverley, Oakleigh, and Springvale to rotate your tyres on-site—fast and hassle-free.",
    image: "/tyre repair (2).jpg",
  },
  {
    icon: <BsClipboardCheck size={40} className="text-red-600" />,
    title: "Improve Tyre Life & Vehicle Safety",
    description:
      "Proper rotation helps avoid uneven wear, enhancing tyre longevity and vehicle handling. Our expert service keeps you safer on Melbourne’s roads.",
    image: "/tyre services/tyre rotation.jpg",
  },
  {
    icon: <BsPersonBadge size={40} className="text-red-600" />,
    title: "Serving a Wide Range of Suburbs",
    description:
      "We provide reliable tyre rotation services in Melbourne’s southeast including Berwick, Narre Warren, Cranbourne, Knox, and surrounding areas—anywhere your vehicle needs us.",
    image: "/tyre services/tyre rotation (2).jpg",
  },
  {
    icon: <BsCashStack size={40} className="text-red-600" />,
    title: "Professional Technicians & Quality Service",
    description:
      "Our experienced team uses the right techniques and tools, ensuring tyre rotation is done efficiently and to the highest standards.",
    image: "/tyre services/tyre rotation (3).jpg",
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
   <title>Mobile Tyre Rotation Service Melbourne | Aussie Mobile Tyres</title>
<meta name="title" content="Mobile Tyre Rotation Service Melbourne | Aussie Mobile Tyres" />
<meta name="description" content="Professional mobile tyre rotation service across south east melbourne. Improve tyre life and vehicle safety with our convenient onsite tyre rotation." />
<meta name="keywords" content="tyre rotation Melbourne, mobile tyre rotation, onsite tyre rotation service, tyre maintenance Melbourne, mobile tyre care" />

 </Helmet>
    <Navbar />

    {/* Page Banner */}
    <div
      className="relative text-white py-20 px-6 mt-24 sm:mt-32 text-center"
      style={{ backgroundColor: "#DA2627" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
        Expert Mobile Tyre Rotation
      </h1>
    </div>

    <div className="mt-10 px-6 sm:px-12 mb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center my-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Expert Mobile Tyre Rotation at Your Convenience
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Maintain even tyre wear and extend tyre life with Aussie Mobile Tyre’s
            professional tyre rotation service—conveniently performed wherever your
            vehicle is parked.
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white">
          <img
            src="/tyre services/tyre rotation (4).jpg"
            alt="Mobile Tyre Rotation"
            className="w-full md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <h3 style={{ fontSize: "40px" }} className="font-semibold">
              Convenient Tyre Rotation Services Across South East Melbourne
            </h3>
            <p className="text-gray-700 text-lg">
              Regular tyre rotation is essential for safe driving and maximizing your tyres’ lifespan.
              At Aussie Mobile Tyres, we bring expert tyre rotation services right to your home,
              workplace, or roadside in Melbourne’s south-eastern, eastern, and bayside suburbs.
              Whether you’re in Glen Waverley, Clayton, Frankston, Dandenong, or Berwick, our skilled
              technicians ensure your tyres wear evenly, improving handling, fuel efficiency, and safety.
              Using industry best practices, we carefully rotate your tyres based on vehicle type and
              manufacturer guidelines—helping you get the most from your investment without disrupting
              your busy day.
            </p>
            <ul className="list-inside text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Mobile Tyre Rotation at Your Location
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Even Wear Assessment & Advice
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Tyre Pressure & Tread Depth Checks
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Recommendations for Tyre Maintenance
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircle className="text-red-500" /> Service for Cars, SUVs, and Light Commercial Vehicles
              </li>
            </ul>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "40px" }} className="font-semibold">
            Why Choose Our Tyre Rotation Service?
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

export default Rotations;
