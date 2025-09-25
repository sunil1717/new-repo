import React from 'react'
import { motion } from 'framer-motion' // You need to import motion if you're using it
import Navbar from '../components/Navbar' // Assuming Navbar is a component you have
import Faq from '../components/Faq'       // Assuming Faq is a component you have
import Footer from '../components/Footer' // Assuming Footer is a component you have
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
    <Helmet>
<title>Privacy Policy - Aussie Mobile Tyres</title>
<meta name="title" content="Privacy Policy - Aussie Mobile Tyres" />
<meta name="description" content="Read the Privacy Policy of Aussie Mobile Tyres to understand how we collect, use, and protect your personal information. Your privacy and data security are our priority." />
<meta name="keywords" content="privacy policy, data protection, personal information, tyre service privacy, Aussie Mobile Tyres privacy, data security, online privacy policy, Melbourne tyre services" />

      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative text-white py-20 px-6 mt-25 sm:mt-35 text-center"
        style={{ backgroundColor: "#DA2627" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Aussie Mobile Tyres – Privacy Policy
        </motion.h1>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 leading-relaxed space-y-6">
        <p>This Privacy Policy explains how Aussie Mobile Tyres (ABN 70 671 055 995) (“Aussie Mobile Tyres”, “we”, “our”, or “us”) collects, stores, and uses personal information provided through our website and services. By using our website, you agree to the terms outlined in this Privacy Policy.</p>

        <p>We take your privacy seriously and are committed to handling your personal information responsibly and in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).</p>

        <h2 className="text-2xl font-semibold mt-8">Information We Collect</h2>
        <p>We only collect personal information that you voluntarily provide, such as:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Contact details (name, phone number, email, address)</li>
          <li>Vehicle information (make, model, tyre details)</li>
          <li>Payment information when processing purchases</li>
          <li>Any enquiries, feedback, or correspondence you send to us</li>
        </ul>
        <p>We do not collect information that is unnecessary or unrelated to our services.</p>

        <h2 className="text-2xl font-semibold mt-8">How We Use Your Information</h2>
        <p>Your personal information is used for purposes including:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Processing and completing tyre purchases, bookings, and payments</li>
          <li>Responding to enquiries or customer service requests</li>
          <li>Providing reminders, updates, and service notifications</li>
          <li>Improving our website, services, and customer experience</li>
          <li>Meeting any legal or regulatory obligations</li>
        </ul>
        <p>We will not use your personal information for any other purpose without your consent, unless required by law.</p>

        <h2 className="text-2xl font-semibold mt-8">Disclosure of Information</h2>
        <p>We do not sell or rent your information to third parties. However, we may share your information when:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Required by law, regulation, or legal process</li>
          <li>It is necessary to protect the rights, safety, or property of Aussie Mobile Tyres, our customers, or the public</li>
          <li>Third-party providers (e.g., payment processors, IT support, couriers) require it to deliver our services</li>
        </ul>
        <p>Any third parties engaged by us are required to handle your information securely and in compliance with privacy laws.</p>

        <h2 className="text-2xl font-semibold mt-8">Security of Your Information</h2>
        <p>We take reasonable precautions to protect personal information from loss, misuse, unauthorised access, or disclosure. These measures include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Secure servers and data storage systems</li>
          <li>Limited access to personal information by authorised personnel only</li>
          <li>Ongoing monitoring and updates to our security systems</li>
        </ul>
        <p>While we work hard to protect your data, no internet transmission can be guaranteed as fully secure. You share information with us at your own risk.</p>

        <h2 className="text-2xl font-semibold mt-8">Cookies and Website Tracking</h2>
        <p>Our website may use cookies and similar technologies to improve user experience, store preferences, and analyse site performance. You can manage or disable cookies in your browser settings, though some features of our site may not function properly without them.</p>

        <h2 className="text-2xl font-semibold mt-8">Access and Correction</h2>
        <p>You may request access to the personal information we hold about you at any time. If you believe any information is inaccurate or out of date, please contact us so we can update it.</p>

        <h2 className="text-2xl font-semibold mt-8">Links to External Websites</h2>
        <p>Our website may contain links to third-party websites. These are provided for convenience only. Aussie Mobile Tyres is not responsible for the privacy practices or content of external websites. We recommend reviewing the privacy policies of those sites before providing personal information.</p>
        <p>
          For more information about privacy issues in Australia and protecting your privacy, visit the 
          {' '}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
            Office of the Australian Information Commissioner (OAIC)
          </a>{' '}
          or the{' '}
          <a href="https://www.privacy.gov.au" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
            Australian Federal Privacy Commissioner’s website
          </a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be published on our website, and your continued use of our services will be taken as acceptance of the updated policy.</p>

        
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy