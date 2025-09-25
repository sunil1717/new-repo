import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { useShopStore } from "../store/shopStore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from "./CartDrawer";

export default function Navbar({ onShopTyreClick }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [iconState, setIconState] = useState("search");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const checkServiceArea = useShopStore((state) => state.checkServiceArea);
  const { fetchCart } = useShopStore();
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const navigate = useNavigate();
  const cart = useShopStore((state) => state.cart);
  const itemCount = (cart || []).reduce((acc, item) => acc + item.quantity, 0);

  const [pincode, setPincode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [serviceable, setServiceable] = useState(null);
  const [step, setStep] = useState("pincode");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSearch = async () => {
    if (!pincode.trim() || !suburb.trim()) return;

    setIconState("loading");
    const isServiceable = await checkServiceArea(pincode.trim(), suburb.trim());
    setServiceable(isServiceable);
    setSearched(true);
    setIconState("done");

    setTimeout(() => {
      setIconState("search");
    }, 1500);
  };

  useEffect(() => {
    setSearched(false);
    setServiceable(null);
  }, [pincode, suburb]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md fixed top-0 left-0 right-0 z-50"
    >
      <header className="bg-white shadow-md px-2 sm:px-6 py-2 relative z-50 ">
        <div className="flex items-center justify-between max-w-[1300px] mx-auto">

          {/* Left: Logo */}
          <div className="flex items-center gap-2"><a href="/">
            <img src="/logoB.jpg" alt="Logo" className="h-25 w-25 sm:h-34 sm:w-34" /></a>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-md font-medium text-gray-900">
            <a href="/" className={` ${currentPath === '/' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Home</a>
            {/* Services Dropdown */}
            <div className="relative group">
              <a
                href="/services"
                className={`inline-block px-4 py-2 ${currentPath === '/services' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}
              >
                Services
              </a>
              <ul className="absolute left-0 z-10 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-300 ease-in-out">
                <li>
                  <a href="/services/tyre-sales" className="block px-4 py-2 hover:bg-gray-100">
                    Tyre Sales
                  </a>
                </li>
                <li>
                  <a href="/services/fleet" className="block px-4 py-2 hover:bg-gray-100">
                    Fleet Tyre Services
                  </a>
                </li>
                <li>
                  <a href="/services/onsite-fitting" className="block px-4 py-2 hover:bg-gray-100">
                    Onsite Tyre Fitting
                  </a>
                </li>
                <li>
                  <a href="/services/puncture-repair" className="block px-4 py-2 hover:bg-gray-100">
                    Puncture Repair
                  </a>
                </li>
                <li>
                  <a href="/services/rotations" className="block px-4 py-2 hover:bg-gray-100">
                    Tyre Rotations
                  </a>
                </li>
                <li>
                  <a href="/services/wheel-balancing" className="block px-4 py-2 hover:bg-gray-100">
                    Wheel Balancing
                  </a>
                </li>
                <li>
                  <a href="/services/inspections" className="block px-4 py-2 hover:bg-gray-100">
                    Tyre Inspections
                  </a>
                </li>
                <li>
                  <a href="/services/recycling" className="block px-4 py-2 hover:bg-gray-100">
                    Tyre Recycling
                  </a>
                </li>
              </ul>
            </div>
            <a href="/about-us" className={` ${currentPath === '/about-us' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>About us</a>
            <a href="/area-we-serve" className={` ${currentPath === '/area-we-serve' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Areas we serve</a>
            <a href="/blogs" className={` ${currentPath === '/blogs' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Blog</a>
          </nav>

          {/* Right: Cart + Phone number + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Phone Number with Red Phone Emoji */}
            

            {/* Cart Icon */}
            <div className={`relative ${currentPath === '/checkout' ? "pointer-events-none opacity-50" : ""}`} onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart size={25} className="text-gray-700 hover:cursor-pointer" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 hover:cursor-pointer md:hidden">
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.3, transformOrigin: "top" }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.3 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="md:hidden font-medium space-y-3 text-sm text-gray-800 px-4 py-4 rounded-b-2xl shadow-lg origin-top"
            >
                <a href="/" className={`block ${currentPath === '/' ? ' text-red-600 font-semibold' : 'hover:text-red-600'}`}>Home</a>
      <a href="/services" className={`block ${currentPath === '/services' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Services</a>
      <a href="/area-we-serve" className={`block ${currentPath === '/area-we-serve' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Areas we serve</a>
      <a href="/about-us" className={`block ${currentPath === '/about-us' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>About us</a>
      <a href="/blogs" className={`block ${currentPath === '/blogs' ? 'text-red-600 font-semibold' : 'hover:text-red-600'}`}>Blog</a>
    </motion.div>
          )}
        </AnimatePresence>
      </header>
    </motion.nav>
  );
}
