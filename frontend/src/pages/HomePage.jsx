import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/AboutUsSection';
import BlogsSection from '../components/BlogsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import Faq from '../components/Faq'
import Service from '../components/Service'
import RecommendedProducts from "../components/RecommendedProducts"
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";

import { Truck, ShieldCheck, DollarSign, Filter } from 'lucide-react';


import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';




import { useShopStore } from '../store/shopStore';
import { useNavigate } from "react-router-dom";

import useScrollToHash from "../hooks/useScrollToHash"


import filterOptions from "../data/tyre_unique_values.json";

import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { Link } from "react-router-dom";

import CartDrawer from "../components/CartDrawer";

import axios from "../utils/axiosInstance"

import StaggeredFitModal from '../components/StaggeredFitModal';


export default function HomePage() {
  useScrollToHash();

  const resultsRef = useRef(null);


  const navigate = useNavigate();

  const {
    searchByRego,
    searchBySize,

    addToCart,
    cart,
  } = useShopStore();



  const [sizeForm, setSizeForm] = useState({ width: '', profile: '', rimSize: '' });

  const [results, setResults] = useState([]);



  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


  const [loading, setLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("hasSeenLogo");
    return !hasLoaded;
  });

  const [selectedPriceOption, setSelectedPriceOption] = useState({});

  const [openCardKey, setOpenCardKey] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);



  //showShopTyre section---------------------------

  const [showShopTyre, setShowShopTyre] = useState(false);
  const [activeTab, setActiveTab] = useState("size");

  const [activetyreTab, setActivetyreTab] = useState("front");
  const [staggerfit, setstaggerfit] = useState(false)



  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = window.innerWidth < 768 ? 5 : 10;
  // mobile 1 row (5 items), desktop 2 rows (10 items)

  const handleNext = () => {
    if (currentIndex < Math.ceil(filterOptions.BrandLogo.length / itemsPerPage) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleShopTyreClick = () => {
    setShowShopTyre(true);

    setTimeout(() => {
      document.getElementById("shopTyreSection")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  //search by Brand-----

  const handleBrandClick = async (brand) => {

    setSearching(true);

    setFilters(prev => ({ ...prev, brand: brand }));

    try {

      const res = await axios.get(`/api/tyreall/brand/${brand}`);






      if (res.data.success) {
        setTyres(res.data.data)
      } else {
        setTyres([])
      }

    } catch (error) {
      console.error("Error fetching brand tyres:", error);

    } finally {
      setHasSearched(true);
      setSearching(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };





  // for filtering------------------------------------
  const [tyres, setTyres] = useState([]);
  const [filters, setFilters] = useState({
    width: '', profile: '', rim: '',
    brand: '', type: '', runflat: '', load_index: '', speed_rating: '', sort: ''
  });


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [Totaldata, setTotaldata] = useState("");



  // Fetch tyres whenever filters change
  const fetchFilterTyres = async (pageNumber = 1, isNewFilter = false) => {
    setSearching(true);

    const params = { page: pageNumber, limit: 50 }; // backend pagination
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });

    const res = await axios.get('/api/tyreall/search', { params });

    if (isNewFilter) {
      setTyres(res.data.tyres); // reset when filters change
      setTotaldata(res.data.total);
    } else {
      setTyres(prev => [...prev, ...res.data.tyres]); // append for infinite scroll
    }

    setHasMore(pageNumber < res.data.totalPages); // check if more pages exist
    setSearching(false);
  };

  useEffect(() => {
    setPage(1);
    fetchFilterTyres(1, true); // fresh fetch when filter changes
  }, [filters]);



  const observer = useRef();

  const lastTyreRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (page > 1) {
      fetchFilterTyres(page, false);
    }
  }, [page]);


  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };







  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);








  const getTyreKey = (tyre) => {

    const size = tyre.SIZE ||
      (tyre?.profile
        ? `${tyre?.width}/${tyre?.profile}R${tyre?.rimSize}`
        : `${tyre?.width}R${tyre?.rimSize}`);
    const rating = tyre["LOAD/SPEED RATING"] || tyre.rating;
    const Marking = tyre.Marking;
    const RunFlat = tyre.RunFlat;
    const Type = tyre.Type;

    return `${tyre?.brand || tyre?.Brand}-${tyre?.model || tyre?.Model}-${size}-${rating}-${Marking}-${Type}-${RunFlat}`;
  };




  const parsedSizes = filterOptions.SIZE.map(sizeStr => {
    const match = sizeStr.match(/^([A-Z]*\d+)(?:\/(\d+))?R(\d+[A-Z]*)$/i);
    return match ? { width: match[1], profile: match[2], rimSize: match[3] } : null;
  }).filter(Boolean);

  const uniqueWidths = [...new Set(parsedSizes.map(s => s.width))].sort();
  const uniqueProfiles = [...new Set(parsedSizes.map(s => s.profile))].sort();
  const uniqueRimSizes = [...new Set(parsedSizes.map(s => s.rimSize))].sort();










  const handleSizeSearch = async () => {

    setSearching(true);
    setstaggerfit(false);


    setFilters(prev => ({ ...prev, width: sizeForm.width }));
    if (sizeForm.profile) {
      setFilters(prev => ({ ...prev, profile: sizeForm.profile }));
    }

    setFilters(prev => ({ ...prev, rim: sizeForm.rimSize }));




    const res = await searchBySize(sizeForm);

    setTyres(res)
    setResults(res);


    setHasSearched(true);
    setSearching(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };




  //stagger Fitting logic********************************************************************************************************************

  const [showModal, setShowModal] = useState(false);
  const [tyreData, setTyreData] = useState(null);

  const handleTyreSubmit = async (data) => {
    setstaggerfit(true);
    setTyreData(data);
    setActivetyreTab("front")




    const newSizeForm = {
      width: data.front.width,
      profile: data.front.profile,
      rimSize: data.front.rim
    };

    setSizeForm(newSizeForm);

    setSearching(true);

    setFilters(prev => ({ ...prev, width: newSizeForm.width }));
    if (newSizeForm.profile) {
      if (newSizeForm.profile) {
        setFilters(prev => ({ ...prev, profile: newSizeForm.profile }));
      }
    }
    setFilters(prev => ({ ...prev, rim: newSizeForm.rimSize }));

    const res = await searchBySize(newSizeForm);

    setTyres(res);


    setHasSearched(true);
    setSearching(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);





  };




  const handleTyreSubmitForSpecific = async (tab) => {



    if (tab === "rear") {

      const newSizeForm = {
        width: tyreData.rear.width,
        profile: tyreData.rear.profile,
        rimSize: tyreData.rear.rim
      };
      setSizeForm(newSizeForm);
      setSearching(true);
      setFilters(prev => ({ ...prev, width: newSizeForm.width }));
      if (newSizeForm.profile) {
        if (newSizeForm.profile) {
          setFilters(prev => ({ ...prev, profile: newSizeForm.profile }));
        }
      }
      setFilters(prev => ({ ...prev, rim: newSizeForm.rimSize }));
      setFilters(prev => ({ ...prev, brand: "" }));

      const res = await searchBySize(newSizeForm);

      setTyres(res);
      setHasSearched(true);
      setSearching(false);
      return;

    }

    const newSizeForm = {
      width: tyreData.front.width,
      profile: tyreData.front.profile,
      rimSize: tyreData.front.rim
    };

    setSizeForm(newSizeForm);

    setSearching(true);

    setFilters(prev => ({ ...prev, width: newSizeForm.width }));
    if (newSizeForm.profile) {
      if (newSizeForm.profile) {
        setFilters(prev => ({ ...prev, profile: newSizeForm.profile }));
      }
    }
    setFilters(prev => ({ ...prev, rim: newSizeForm.rimSize }));
    setFilters(prev => ({ ...prev, brand: "" }));


    const res = await searchBySize(newSizeForm);

    setTyres(res);


    setHasSearched(true);
    setSearching(false);




  };










  const renderTyreCard = (tyre) => {


    const tyreKey = getTyreKey(tyre);
    const isOutofstock = Number(tyre["In Stock"]) === 0;
    const isAlreadyInCart = cart.some(
      (item) => getTyreKey(item) === tyreKey
    );


    let width = '', profile = '', rimSize = '';
    if (tyre.SIZE && typeof tyre.SIZE === 'string') {
      const match = tyre.SIZE.match(/^([A-Z]*\d+)(?:\/(\d+))?R(\d+[A-Z]*)$/i);
      if (match) {
        [, width, profile, rimSize] = match;
      }
    }

    const priceOptions = [
      { qty: 1, label: "1 Tyre", price: tyre["Price for 1"] },
      { qty: 2, label: "2 Tyres", price: tyre["Price for 2"] },
      { qty: 3, label: "3 Tyres", price: tyre["Price for 3"] },
      { qty: 4, label: "4 Tyres", price: tyre["Price for 4"] },
      { qty: 5, label: "5 Tyres", price: tyre["Price for 5"] },
    ].filter(option => option.price != null);

    const selectedQty = selectedPriceOption[tyreKey];
    const selectedOption = priceOptions.find(option => option.qty === selectedQty);




    return (
      <div
        key={tyreKey}
        onClick={() => {
          if (isMobile) {
            setOpenCardKey((prevKey) => (prevKey === tyreKey ? null : tyreKey));
          }
        }}
        style={{ paddingBottom: tyre.RunFlat === "YES" ? '14px' : '53px' }}
        className="relative group bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300 "
      >





        {/* Tyre logo Image */}

        {(
          <img
            src={tyre.brand_logo_url}
            alt={`${tyre.Brand}`}
            className="  h-30  w-45 object-contain mx-auto mix-blend-multiply mb-2"
          />
        )}

        <h4 className="text-md font-bold text-gray-800 mb-1 text-center">
          {tyre.Model}
        </h4>
        <p className="text-sm text-gray-600 text-center mb-4 flex flex-row justify-center items-center ">
          <span> {width}/{profile}R{rimSize} ({tyre["LOAD/SPEED RATING"]})</span>
          {tyre.Marking && tyre.Marking !== "NaN" && (
            <div className="flex items-center justify-center ml-2">
              <span className="text-sm text-gray-600 text-center ">
                {tyre.Marking}
              </span>
            </div>
          )}
        </p>



        {
          tyre.RunFlat === "YES" &&
          (<div className="flex flex-cols items-center justify-center mb-4">
            <img className='h-5 w-5' src="/runflat.svg" alt="Runflat" />
            <span className='text-black font-medium text-center ml-1 '>Runflat</span>
          </div>

          )

        }




        {/* Tyre Image */}

        {tyre.image_url && (
          <img
            src={tyre.image_url}
            alt={`${tyre.Brand} ${tyre.Model}`}
            className="w-30 h-30 object-contain mx-auto mb-4"
          />
        )}


        <p className='text-center mb-2 text-gray-600 text-sm'>From</p>

        <p className="text-2xl font-bold text-gray-800 text-center mb-1">
          ${(tyre["Price for 4"]).toFixed(2)} ea
        </p>


        <p className='text-center mb-2 text-gray-600 text-sm'> Mobile Fitting Included</p>

        {
          isMobile && (
            <button className="w-full p-2 text-center text-red-400 underline" >Buy Now</button>
          )
        }

        {/* Drop-up Hover Box */}
        {(
          <div
            className={`absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-xl border border-black/20 rounded-xl shadow-lg p-1 z-10 transition-all duration-300 ease-in-out transform
    ${isMobile
                ? openCardKey === tyreKey
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0 pointer-events-none'
                : 'group-hover:translate-y-0 group-hover:opacity-100 translate-y-full opacity-0'
              }`}
          >
            <div onClick={(e) => e.stopPropagation()} className="space-y-0">
              {isMobile && (
                <button onClick={() => {

                  setOpenCardKey(null);

                }}
                  className=' text-end text-gray-500'><ChevronDownIcon className="w-5 h-5" /></button>
              )}
              {priceOptions.map((option) => {

                const isAvailable = option.qty <= parseInt(tyre["In Stock"], 10);


                return (
                  <label
                    key={option.qty}
                    className={`flex items-center justify-between text-sm text-black/90 font-medium cursor-pointer px-3 py-2 border border-gray-300 bg-gray-100 mb-1  hover:bg-red-500 rounded-lg transition `}
                  >
                    <div className="flex items-center  gap-1">
                      {isAvailable && (<input
                        type="radio"
                        name={`price-option-home-${tyreKey}`}
                        value={option.qty}
                        checked={selectedPriceOption[tyreKey] === option.qty}
                        onChange={() =>
                          setSelectedPriceOption((prev) => ({
                            ...prev,
                            [tyreKey]: option.qty,
                          }))
                        }
                        disabled={!isAvailable}
                        className="appearance-none w-4 h-4 border border-black rounded-lg bg-white/20 checked:bg-red-500 checked:border-gray-500 transition-all shadow-sm"
                      />)
                      }
                      <span
                        className={`${isAvailable
                          ? "text-black/90"
                          : "line-through text-black/90 cursor-not-allowed"
                          }`}
                      >
                        {option.qty} {option.qty === 1 ? "Tyre" : "Tyres"}
                      </span>
                    </div>
                    <span className="text-black font-semibold">${option.price.toFixed(2)} ea</span>
                  </label>
                )
              })}

              {(




                <button
                  onClick={() => {

                    const newTyre = {
                      width: width,
                      profile: profile,
                      rimSize,
                      brand: tyre.Brand,
                      model: tyre.Model,
                      rating: tyre["LOAD/SPEED RATING"],
                      Type: tyre.Type,
                      RunFlat: tyre.RunFlat,
                      Marking: tyre.Marking,
                      logo: tyre.brand_logo_url,
                      image: tyre.image_url,
                      price: selectedOption.price,
                      "In Stock": tyre["In Stock"],
                      "Price for 1": tyre["Price for 1"],
                      "Price for 2": tyre["Price for 2"],
                      "Price for 3": tyre["Price for 3"],
                      "Price for 4": tyre["Price for 4"],
                      "Price for 5": tyre["Price for 5"],
                    };
                    addToCart(newTyre, selectedOption.qty);
                    setIsCartOpen(true)


                  }}

                  disabled={isAlreadyInCart || !selectedOption}
                  className={`w-full  ${isAlreadyInCart ? "bg-red-400 " : isOutofstock ? "bg-red-400 " : !selectedOption ? "bg-gray-400 " : " bg-red-500 hover:bg-red-600"}  text-white font-semibold py-2 rounded-lg shadow-md transition`}
                >
                  {isAlreadyInCart ? "Already in Cart" : isOutofstock ? <span>
                    <span>
                      Currently out of stock. For assistance, please contact us on {" "}
                      fill out our contact form:{" "}
                    </span>
                    <a href="#contact">Contact us</a></span> : "Add to Cart "}
                </button>




              )}
              {/* View Product button */}
              <div className="flex items-center justify-center">
                <a
                  href={`/product/${tyre.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 mb-2 text-red-600 underline"
                >
                  View Product
                </a>
              </div>


            </div>
          </div>


        )}
      </div>
    );
  };











  const [showTopBtn, setShowTopBtn] = useState(false);



  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasSeenLogo", "true");

      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);




  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };





  const sortedTyres = tyres?.sort((a, b) => {
    // Convert "In Stock" to numeric value
    const stockA = parseInt(a["In Stock"]) || 0; // fallback to 0
    const stockB = parseInt(b["In Stock"]) || 0;

    // Descending: in-stock first, out-of-stock last
    return stockB - stockA;
  })



  const filteredResults = sortedTyres.sort((a, b) => {
    if (filters.sort === "low-to-high") return a["Price Incl GST"] - b["Price Incl GST"];
    if (filters.sort === "high-to-low") return b["Price Incl GST"] - a["Price Incl GST"];
    return 0;
  });


  const ShortTyreFinal = [...filteredResults].sort((a, b) => {
    if (a.Brand === "ZETA" && b.Brand !== "ZETA") return -1;
    if (a.Brand !== "ZETA" && b.Brand === "ZETA") return 1;
    return 0;
  });



  const uniqueBrands = tyres.length > 0
    ? [...new Set(tyres.map(tyre => tyre.Brand))]
    : [];

  const uniqueTypes = tyres.length > 0
    ? [...new Set(tyres.map(tyre => tyre.Type))]
    : [];


  const { widths, profiles, rimSizes } = useMemo(() => {
    const widthsSet = new Set();
    const profilesSet = new Set();
    const rimSizesSet = new Set();

    tyres.forEach((tyre) => {
      if (tyre.SIZE && tyre.SIZE.includes("/")) {
        const [width, rest] = tyre.SIZE.split("/");
        if (rest && rest.includes("R")) {
          const [profile, rim] = rest.split("R");
          if (width) widthsSet.add(width);
          if (profile) profilesSet.add(profile);
          if (rim) rimSizesSet.add(rim);
        }
      }
    });

    return {
      widths: [...widthsSet].sort(),
      profiles: [...profilesSet].sort(),
      rimSizes: [...rimSizesSet].sort(),
    };
  }, [tyres]);


  const infoData = [
    {
      icon: <Truck className="text-red-600 w-7 h-7" />,
      title: "Expert Tyre Sales with Fitting at Your Location",
      description:
        "We supply high-quality tyres for all vehicles and fit them onsite. Our team helps you choose the right tyres based on your driving needs, safety requirements, and budget.",
    },
    {
      icon: <ShieldCheck className="text-red-600 w-7 h-7" />,
      title: "On-Demand Puncture Repairs and Tyre Rotations",
      description:
        "Whether it's a flat tyre or uneven tread wear, we offer quick puncture repairs and rotations to extend tyre life and improve your vehicle’s performance and safety.",
    },
    {
      icon: <DollarSign className="text-red-600 w-7 h-7" />,
      title: "Fleet Tyre Services to Keep Your Business Moving",
      description:
        "We work with businesses to manage and maintain vehicle fleets. From regular inspections to emergency callouts, we ensure every vehicle runs safely, efficiently, and without delay.",
    },
  ];





  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <img
          src="/logoB.jpg"
          alt="Loading..."
          className="w-25 h-25 animate-pulse"
        />
      </div>
    );
  }







  return (
    <>
      <Helmet>
        <title>Aussie Mobile Tyres - Convenient Mobile Tyre Services in Melbourne</title>
        <meta name="title" content="Aussie Mobile Tyres - Convenient Mobile Tyre Services in Melbourne" />
        <meta name="description" content="Aussie Mobile Tyres offers reliable, professional, and convenient mobile tyre services across Melbourne’s south-eastern suburbs. From tyre sales to puncture repairs, we bring quality tyre care to your door." />
        <meta name="keywords" content="mobile tyre services, tyre sales, puncture repairs, tyre fitting, wheel balancing, tyre recycling, fleet tyre services, tyre inspection, tyre rotations, tyre repair Melbourne, mobile tyre fitting Melbourne, eco-friendly tyre recycling" />

      </Helmet>
      <div className="font-sans ">

        {searching && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md transition-opacity duration-500">
            <div className="flex flex-col items-center justify-center space-y-4  rounded-xl ">


              <span className='text-white '>Loading Please Wait...</span>

              {/* Animated progress bar */}
              <div className="relative w-15 h-1 bg-gray-300 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-red-500 animate-progress-bar rounded-full"></div>
              </div>



            </div>
          </div>
        )}


        {/* Navbar */}
        <Navbar onShopTyreClick={handleShopTyreClick} />

        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-35">
          {/* Background Image with zoom and fade effect */}
          <motion.div
            className="h-150 bg-cover bg-center bg-no-repeat flex items-center justify-start sm:justify-center px-4"
            style={{ backgroundImage: `url('/banner.jpg')` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-black/50 z-0" />
            {/* search  Container with slide-up animation */}
            <motion.div
              className="mt-5 z-10 rounded-lg text-start sm:text-center w-4xl  sm:max-w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              {/* typewritter */}

              <div className="mb-6 min-h-[4rem] sm:min-h-[3rem]">
                <h1 className="text-3xl sm:text-5xl text-white font-bold drop-shadow-lg mt-8">
                  Your Local Mobile<span className='text-red-500'> Tyre Experts</span>
                </h1>
                <div className="text-white text-xl mt-8">
                  <p>
                    We provide premium tyre services across Melbourne’s south-eastern suburbs.
                  </p>
                </div>
              </div>


              {/* search box */}

              <div className="bg-white/5 backdrop-blur-md shadow-lg border border-white/30 p-6 rounded mt-10 sm:mt-20 w-full max-w-md sm:max-w-7xl  mx-auto">

                <div className="flex justify-items-start mb-4">

                  <h3 className='text-md  text-white'>Search by Size :</h3>
                </div>

                {(
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-white/95 sm:mt-7 ">

                    {/* Width Dropdown */}
                    <select
                      value={sizeForm.width}
                      onChange={(e) => setSizeForm({ ...sizeForm, width: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option className="text-gray-700" value="">Select Width</option>
                      {uniqueWidths.sort((a, b) => a - b).map((w) => (  // Sorts the widths numerically before rendering
                        <option className="text-gray-700" key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    {/* Profile Dropdown */}
                    <select
                      value={sizeForm.profile}
                      onChange={(e) => setSizeForm({ ...sizeForm, profile: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option className="text-gray-700" value="">Select Profile</option>
                      <option className="text-gray-700" value="no-profile">No Profile</option>

                      {uniqueProfiles.map((p) => (
                        <option className="text-gray-700" key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {/* Rim Dropdown */}
                    <select
                      value={sizeForm.rimSize}
                      onChange={(e) => setSizeForm({ ...sizeForm, rimSize: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option className="text-gray-700" value="">Select Rim Size</option>
                      {uniqueRimSizes.map((r) => (
                        <option className="text-gray-700" key={r} value={r}>R{r}</option>
                      ))}
                    </select>

                    {/* === Buttons Row  === */}
                    <div className="col-span-1 sm:col-span-3 flex gap-4 justify-center sm:justify-start">
                      <button
                        onClick={handleSizeSearch}
                        disabled={searching || !sizeForm.rimSize || !sizeForm.width}
                        className={`px-4 py-2 rounded w-full sm:w-40 transition
        ${searching ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
                      >
                        {searching ? "Searching..." : "Search Tyre"}
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full sm:w-40"
                        onClick={() => setShowModal(true)}
                      >
                        Staggered Fit
                      </button>
                    </div>

                    {showModal && (
                      <StaggeredFitModal
                        onClose={() => setShowModal(false)}
                        onSubmit={handleTyreSubmit}
                      />
                    )}
                  </div>

                )}

              </div>


            </motion.div>
          </motion.div>
        </section>


        {/* Hidden Shop Tyre Section */}
        {showShopTyre && (
          <div id="shopTyreSection" className="px-6 py-10 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Shop Tyres</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Menu */}
              <div className="bg-white shadow rounded p-4">
                <h3 className="font-semibold mb-4">Search Options</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setActiveTab("size")}
                      className={`w-full text-left px-4 py-2 rounded ${activeTab === "size"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                      By Size
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("brand")}
                      className={`w-full text-left px-4 py-2 rounded ${activeTab === "brand"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                      By Brand
                    </button>
                  </li>
                </ul>
              </div>

              {/* Right Content */}
              <div className="md:col-span-3 bg-white shadow rounded p-6">
                {activeTab === "size" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-black sm:mt-7 ">
                    <select
                      value={sizeForm.width}

                      onChange={(e) => setSizeForm({ ...sizeForm, width: e.target.value })}
                      className="border  px-3 py-2 rounded w-full  "
                    >
                      <option className='text-gray-700' value="">Select Width</option>
                      {uniqueWidths.map(w => (
                        <option className='text-gray-700' key={w} value={w}>{w}</option>
                      ))}
                    </select>

                    <select
                      value={sizeForm.profile}

                      onChange={(e) => setSizeForm({ ...sizeForm, profile: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option className='text-gray-700' value="">Select Profile</option>
                      {uniqueProfiles.map(p => (
                        <option className='text-gray-700' key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    <select
                      value={sizeForm.rimSize}

                      onChange={(e) => setSizeForm({ ...sizeForm, rimSize: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option className='text-gray-700' value="">Select Rim Size</option>
                      {uniqueRimSizes.map(r => (
                        <option className='text-gray-700' key={r} value={r}>R{r}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleSizeSearch}
                      disabled={searching || !sizeForm.rimSize || !sizeForm.width}
                      className={`px-4 py-2 rounded col-span-1 sm:col-span-3 w-40 transition 
    ${searching ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
                    >
                      {searching ? "Searching..." : "Search Tyre"}
                    </button>

                  </div>
                )}

                {activeTab === "brand" && (
                  <div>
                    <h3 className="font-semibold mb-3">Search by Brand</h3>

                    <div className="relative">
                      {/* Slider Container */}
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500"
                          style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                          }}
                        >
                          {filterOptions.BrandLogo.map((brand, idx) => (
                            <div
                              key={idx}
                              className="w-1/2 sm:w-1/3 md:w-1/5 flex items-center justify-center p-4 cursor-pointer"
                              onClick={() => handleBrandClick(brand.brand)}
                              title={brand.brand}
                            >
                              <div className="h-20 w-28 flex items-center justify-center">
                                <img
                                  src={brand.logo_url}
                                  alt={brand.brand}
                                  className="max-h-full max-w-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prev Button */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white  shadow px-2 py-1 rounded-full"
                      >
                        ◀
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                )}



              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <section  >
          <div className="bg-gray-100 py-10 px-6 sm:px-10 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              {infoData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="bg-white shadow-md rounded-full p-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>





        <div ref={resultsRef} className='scroll-mt-[110px]'>

          {/* Recommended Products */}
          {hasSearched && tyres.length > 0 && <RecommendedProducts tyres={filteredResults} />}
        </div>

        {/*Filter section */}
        {hasSearched && (
          <>







            <div className=" max-w-full mx-auto px-4 sm:px-4 lg:px-6 mt-1 ">



              <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Filters */}
                <div className="lg:w-1/4 bg-white shadow rounded p-4">



                  <h3 className="text-lg font-semibold text-white bg-red-500 mb-3 px-3" style={{ borderRadius: '7px' }}>Filter Tyres</h3>

                  <div className="space-y-3">
                    {/* Brand Filter */}
                    <div className="width-full border border-gray-400 rounded px-3 space-y-2 py-2">
                      <select
                        value={filters.brand}
                        name='brand'
                        onChange={handleChange}
                        className={`w-full border ${filters.brand ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >
                        <option value="">All Brands</option>
                        {uniqueBrands.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>

                      {/* Type Filter */}
                      <select
                        value={filters.type}
                        name='type'
                        onChange={handleChange}
                        className={`w-full border ${filters.type ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >
                        <option value="">All Types</option>
                        {uniqueTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>

                      {/* Sort by Price */}
                      <select
                        value={filters.sort}
                        name='sort'
                        onChange={handleChange}
                        className={`w-full border ${filters.sort ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >
                        <option value="">Sort by Price</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                      </select>
                    </div>

                    <div className="width-full border border-gray-400 rounded px-3 space-y-2 py-2">
                      <select type="number"
                        name="width"
                        placeholder="Width"
                        value={filters.width}
                        onChange={handleChange}
                        className={`w-full border ${filters.width ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >
                        <option value="">All Width</option>

                        {uniqueWidths.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))

                        }
                      </select>
                      <select type="number"
                        name="profile"
                        placeholder="Profile"
                        value={filters.profile}
                        onChange={handleChange}
                        className={`w-full border ${filters.profile ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >

                        <option value="">All Profile</option>
                        <option value="no-profile">No Profile</option>


                        {uniqueProfiles.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))

                        }

                      </select>
                      <select type="number"
                        name="rim"
                        placeholder="Rim Size"
                        value={filters.rim}
                        onChange={handleChange}
                        className={`w-full border ${filters.rim ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >

                        <option value="">All Rimsize</option>

                        {uniqueRimSizes.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))

                        }

                      </select>
                      <select type="text"
                        name="load_index"
                        placeholder="Load Index"
                        value={filters.load_index}
                        onChange={handleChange}
                        className={`w-full border ${filters.load_index ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >

                        <option value="">Load Index</option>

                        {filterOptions.loadIndex.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))

                        }


                      </select>



                      <select type="text"
                        name="speed_rating"
                        placeholder="Speed Rating"
                        value={filters.speed_rating}
                        onChange={handleChange}
                        className={`w-full border ${filters.speed_rating ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}
                      >

                        <option value="">Speed Rating</option>

                        {filterOptions.speedRating.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))

                        }

                      </select>

                      <select name="runflat"
                        value={filters.runflat}
                        onChange={handleChange}
                        className={`w-full border ${filters.runflat ? "bg-red-500" : ""} border-gray-500 rounded px-3 py-2`}>
                        <option value="">RunFlat</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                </div>






                {/* Results Section */}
                <div className=" w-full">

                  {/* Size Summary Box */}

                  <div className="sticky sm:top-38 top-29 z-15">

                    <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-500 border border-gray-300 rounded-lg px-4 py-3 shadow-md mt-3 gap-3">


                      {staggerfit && (<div className="flex gap-2 self-start">
                        <button
                          onClick={() => {
                            setActivetyreTab("front")
                            handleTyreSubmitForSpecific("front")
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-medium border ${activetyreTab === "front"
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                          Front Tyre
                        </button>

                        <button
                          onClick={() => {
                            setActivetyreTab("rear")
                            handleTyreSubmitForSpecific("rear")
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-medium border ${activetyreTab === "rear"
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                          Rear Tyre
                        </button>
                      </div>)}



                      {/* Filter Chips */}
                      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                        {/* Width */}
                        <span className="bg-gray-50 px-3 py-1 rounded-lg shadow-sm">
                          Width : <span className="font-semibold">{filters.width || "-"}</span>
                        </span>

                        {/* Profile */}
                        <span className="bg-gray-50 px-3 py-1 rounded-lg shadow-sm">
                          Profile : <span className="font-semibold">{filters.profile || "-"}</span>
                        </span>

                        {/* Rim Size */}
                        <span className="bg-gray-50 px-3 py-1 rounded-lg shadow-sm">
                          Rim Size : <span className="font-semibold">{filters.rim || "-"}</span>
                        </span>
                      </div>

                      {/* Total count */}
                      <div className="text-sm text-white">
                        Total: <span className="font-semibold">{Totaldata} {Totaldata <= 1 ? "Result" : "Results"}</span>
                      </div>

                    </div>
                  </div>





                  <h1 className='text-start text-3xl text-gray-800 m-2 font-medium'>Browse our full range</h1>

                  {ShortTyreFinal.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {ShortTyreFinal.map((tyre, index) => {
                        // Antarctica 5 hiding logic
                        if (tyre.Brand?.toLowerCase() === 'zeta' && tyre.Model?.toLowerCase().includes('antarctica 5')) {
                          return null;
                        }

                        const isLastElement = index === tyres.length - 1;

                        return (
                          <div ref={isLastElement ? lastTyreRef : null} key={getTyreKey(tyre) + index}>
                            {renderTyreCard(tyre)}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    hasSearched && !searching && (
                      <div className="text-center text-black font-bold  text-2xl sm:text-3xl mt-10">
                        <p>No tyres found for your search. Please try different tyres give us a call at .</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

          </>)}




        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Why Choose Us */}
        <About />

        <Service />        <TestimonialsSection />

        <Faq />
        {/* Testimonials */}

        {/* Blog Section */}
        <section id='blog'>
          <BlogsSection />
        </section>

        { /* Contact Us*/}

        <ContactUs />

        {/* Footer */}
        <Footer />
      </div>
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
