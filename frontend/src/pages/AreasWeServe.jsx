import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet";

const AreasWeServe = () => {
  const [suburbs, setSuburbs] = useState([]);

  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        const res = await axios.get("/api/service/suburbs");
        if (res.data.suburbs && res.data.suburbs.length > 0) {
          setSuburbs(res.data.suburbs);
        }
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    };
    fetchSuburbs();
  }, []);

  // ✅ custom marker icon
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // ✅ service suburbs
  const serviceAreas = [

  ];

  // ✅ Polygon boundary (approximate based on your screenshot)
  const polygonCoords = [
    [-37.867, 144.980], // St Kilda
    [-37.876, 145.140], // Glen Waverley
    [-37.889, 145.282], // Ferntree Gully
    [-38.051, 145.318], // Berwick
    [-38.070, 145.490], // Pakenham
    [-38.308, 145.190], // Hastings
    [-38.141, 145.125], // Frankston
    [-37.867, 144.980], // back to St Kilda
  ];

  // ✅ map center
  const centerPosition = [-37.95, 145.15];

  return (
    <>
                <Helmet>
        <title>Areas We Serve | Mobile Tyre Services Melbourne South-East</title>
        <meta
          name="title"
          content="Areas We Serve | Mobile Tyre Services Melbourne South-East"
        />
        <meta
          name="description"
          content="Aussie Mobile Tyre proudly serves Melbourne’s south-eastern suburbs including Glen Waverley, Frankston, and surrounding areas with expert mobile tyre services."
        />
        <meta
          name="keywords"
          content="mobile tyre services Melbourne, tyre services Glen Waverley, tyre services Frankston, Melbourne south-east tyre service, mobile tyre fitting Melbourne"
        />
      </Helmet>
      <Navbar />
      <div className="min-h-screen mt-27 sm:mt-35 bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Service Areas</h1>
          <p className="text-lg opacity-90">
            We proudly serve many suburbs Across South East Melbourne. Select any suburb to learn more.
          </p>
        </div>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - List of Suburbs */}
          <div className="lg:col-span-1 bg-white shadow-md rounded-xl p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" /> Suburbs We Serve
            </h2>
            <ul className="space-y-2">
              {suburbs.map((suburb, idx) => (
                <li key={idx}>
                  <Link
                    to={`/area-we-serve/${suburb.replace(/\s+/g, "-").toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 rounded-lg cursor-pointer transition bg-gray-100 hover:bg-blue-100"
                  >
                    {suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Map */}
          <div
            className="w-full max-w-full lg:max-w-4xl h-[500px] rounded-xl overflow-hidden shadow-md bg-gray-200 mx-auto"
            style={{ minHeight: "400px", width: "720px" }}
          >
            <MapContainer
              center={centerPosition}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "720px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Highlighted Service Area */}
              <Polygon
                positions={polygonCoords}
                pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.2 }}
              />

              {/* Suburb Pins */}
              {serviceAreas.map(({ postcode, name, lat, lng }) => (
                <Marker key={`${postcode}-${name}`} position={[lat, lng]} icon={customIcon}>
                  <Popup>
                    {name} ({postcode})
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AreasWeServe;
