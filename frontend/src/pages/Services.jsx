import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Service from "../components/Service";
import { Helmet } from 'react-helmet';  // <-- Import Helmet

import { useNavigate } from "react-router-dom";
import { FaTruck, FaRecycle } from "react-icons/fa";
import { MdBuild, MdReportProblem } from "react-icons/md";
import { GiCarWheel, GiFlatTire } from "react-icons/gi";
import { GrRotateRight } from "react-icons/gr";

import { motion } from "framer-motion";  // <-- You forgot to import motion

const Services = () => {
  const navigate = useNavigate();

  

  return (
    <>
     <Helmet>
<title>Mobile Tyre Services in Melbourne | Aussie Mobile Tyres</title>
<meta name="title" content="Mobile Tyre Services in Melbourne | Aussie Mobile Tyres" />
<meta name="description" content="Explore expert mobile tyre services Across South East Melbourne including tyre sales, puncture repairs, fleet services, wheel balancing & more. We come to you!" />
<meta name="keywords" content="mobile tyre services Melbourne, tyre sales, onsite tyre fitting, puncture repair, tyre rotation, wheel balancing, fleet tyre services, tyre recycling" />


      </Helmet>
      <Navbar />
      <div
        className="relative text-white py-20 px-6 mt-25 sm:mt-35 text-center"
        style={{ backgroundColor: "#DA2627" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Services
        </motion.h1>
      </div>
      <div className="text-center my-8 bg-gray-50">
  <h2 style={{ fontSize: '40px' }} className="font-semibold">
    Explore our services
  </h2>
  <p className="mt-2 text-gray-600 max-w-xl mx-auto">
    Discover a wide range of tyre services tailored to meet your vehicle's needs—from puncture repairs to wheel balancing and everything in between.
  </p>
</div>
        <Service />


      
      <Footer />
    </>
  )
}

export default Services



