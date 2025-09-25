import React from 'react';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-white px-4 sm:px-8 md:px-20 py-12 mt-10 "  style={{ backgroundColor: "#c01e1eff" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold mb-3"> Aussie Mobile Tyres</h2>
          <p className="text-sm text-white leading-relaxed">
            At Aussie Mobile Tyres, we’re dedicated to providing fast, reliable tyre services across Melbourne’s south-eastern suburbs. Our expert team brings quality tyre sales, repairs, and fleet services right to your doorstep—ensuring safety, convenience, and great value every time you need us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">QUICK LINK</h3>
         <ul className="text-sm text-white space-y-1">
  <li>
  <a href="/services/tyre-sales" className="hover:text-white">Tyre Sales</a>
</li>
<li>
  <a href="/services/fleet" className="hover:text-white">Fleet Tyre Services</a>
</li>
<li>
  <a href="/services/onsite-fitting" className="hover:text-white">Onsite Tyre Fitting</a>
</li>
<li>
  <a href="/services/puncture-repair" className="hover:text-white">Puncture Repair</a>
</li>
<li>
  <a href="/services/rotations" className="hover:text-white">Tyre Rotations</a>
</li>
<li>
  <a href="/services/wheel-balancing" className="hover:text-white">Wheel Balancing</a>
</li>
<li>
  <a href="/services/inspections" className="hover:text-white">Tyre Inspections</a>
</li>
<li>
  <a href="/services/recycling" className="hover:text-white">Tyre Recycling</a>
</li>

</ul>

        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">CONTACT US</h3>
         
          <h3 className="text-lg font-semibold mb-3">Areas We Serve</h3>
          <ul className="text-sm text-white space-y-1">
            <li> Bennettswood</li>
  <li> Burwood</li>
  <li> Surrey Hills South</li>
  <li> Caulfield East</li>
  <li> Central Park</li>
  
          </ul>
        </div>

        {/* More Regions & Payment Icons */}
        <div className="flex flex-col justify-between h-full">
          <ul className="text-sm text-white space-y-1">
            <li> Malvern East</li>
    <li>Ashburton</li>
  <li>Ashwood</li>
  <li>Chadstone</li>
  <li>Chadstone Centre</li>
  <li>Chelsea</li>
  <li>Chelsea Heights</li>
  <li>Cheltenham</li>
  <li>Cheltenham East</li>
  <li>Cheltenham North</li>
          </ul>
          {/* <div className="flex gap-4 text-white mt-6">
            <FaCcMastercard size={28} />
            <FaCcVisa size={28} />
            <FaCcAmex size={28} />
            <FaCcPaypal size={28} />
          </div> */}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white my-6" />

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white gap-4 text-left">
        <p>© 2025 AUSSIE MOBILE TYRES <br /> DESIGNED AND DEVELOPED BY <a href="https://webfusionstudio.in" target="_blank" rel="noopener noreferrer">WEB FUSION STUDIO</a></p>

        <div className="flex justify-center">
  <ul className="flex text-sm text-white space-x-4">
    <li>
      <a href="/privacy" className="hover:text-white">Privacy Policy</a>
    </li>
    <li>
      <a href="/terms" className="hover:text-white">Terms & Conditions</a>
    </li>
  </ul>
</div>

      </div>
    </footer>
  );
};

export default Footer;
