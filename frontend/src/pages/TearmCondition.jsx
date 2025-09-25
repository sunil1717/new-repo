import React from 'react'
import { motion } from 'framer-motion' // You need to import motion if you're using it
import Navbar from '../components/Navbar' // Assuming Navbar is a component you have
import Faq from '../components/Faq'       // Assuming Faq is a component you have
import Footer from '../components/Footer' // Assuming Footer is a component you have
import { Helmet } from "react-helmet";

const TermsCondition = () => {
  return (
    <>
    <Helmet>
<title>Terms and Conditions - Aussie Mobile Tyres</title>
<meta name="title" content="Terms and Conditions - Aussie Mobile Tyres" />
<meta name="description" content="Review the Terms and Conditions for using the services of Aussie Mobile Tyres. Learn about our policies, service agreements, and customer responsibilities." />
<meta name="keywords" content="terms and conditions, Aussie Mobile Tyres terms, service agreements, customer policies, mobile tyre services, Melbourne tyre services, legal terms, service terms" />

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
          Aussie Mobile Tyres – Terms and Conditions
        </motion.h1>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
        <p>Please read these Terms and Conditions carefully before using our website or engaging our services. By accessing the website or booking services with Aussie Mobile Tyres (ABN 70 671 055 995) (“Aussie Mobile Tyres”, “Company”, “we”, “us” or “our”), you agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree, you must not use our website or services.</p>

        <ol className="list-decimal list-inside space-y-6 mt-8">
          <li>
            <strong>Eligibility</strong><br />
            Our services are available only to individuals and businesses capable of entering into legally binding contracts under Australian law. By engaging us, you warrant that you are legally eligible to do so.
          </li>
          <li>
            <strong>Bookings, Cancellations and Non-Attendance</strong><br />
            A cancellation fee of $60 applies where a customer cancels a confirmed appointment.<br />
            If we attend and are unable to carry out the service due to reasons including, but not limited to: inaccessible vehicles, incorrect tyre selection, absence of required lock nuts, or other preventable issues, a fee of $99 will apply.<br />
            Customers are responsible for ensuring that the tyres ordered are the correct size, load, and speed rating for their vehicle. Incorrect orders may result in additional costs or failure of service.
          </li>
          <li>
            <strong>Offer, Order Acceptance and Payment</strong><br />
            All prices are in AUD.<br />
            Accepted payment methods: Visa, MasterCard, American Express, Zip, and Afterpay.<br />
            By submitting payment details, you authorise us to charge the nominated account.<br />
            Shipping and processing fees are non-refundable.<br />
            Our technician may request to sight the original payment card before commencing work.
          </li>
          <li>
            <strong>Delivery and Delays</strong><br />
            We are not liable for delays caused by events beyond our reasonable control, including but not limited to weather, accidents, strikes, supply shortages, transport disruptions, or other force majeure events. Orders deemed fraudulent or inaccurate may be reviewed, suspended, or cancelled.
          </li>
          <li>
            <strong>Wheel and Tyre Damage Disclaimer</strong><br />
            The Customer acknowledges that the tyre fitting and removal process requires mechanical equipment which applies pressure to wheels, tyres, and related components.<br />
            While all reasonable care is taken, Aussie Mobile Tyres accepts no liability for damage to wheels, rims, nuts, valves, tyre pressure monitoring systems (TPMS), or associated parts where damage results from:<br />
            - Pre-existing cracks, corrosion, rust, scratches, or structural weakness;<br />
            - Prior improper fitting, removal, or repair work;<br />
            - Aftermarket or unusual wheel designs incompatible with standard equipment;<br />
            - Seized, cross-threaded, or overtightened wheel nuts, bolts, or studs.<br />
            The Customer accepts full responsibility for any such pre-existing or consequential damage.<br />
            If, in our technician’s professional opinion, proceeding with fitting presents a high risk of damage, we reserve the right to decline the work. A call-out fee will still apply as per Section 2.
          </li>
          <li>
            <strong>Returns and Warranty</strong><br />
            Returns are only accepted where required under Australian Consumer Law (ACL).<br />
            All tyres are supplied with manufacturer warranties and protections under the ACL. Customers are entitled to a refund or replacement for major failures and compensation for reasonably foreseeable loss or damage.<br />
            Claims relating to faulty, damaged, or incorrect products must be notified to us immediately.
          </li>
          <li>
            <strong>Intellectual Property and Content</strong><br />
            All website content, branding, logos, and materials are the property of Aussie Mobile Tyres unless otherwise stated. You may not copy, reproduce, or use them without prior written consent. Content is provided for general information only and may contain errors. Customers must confirm details independently.
          </li>
          <li>
            <strong>Business Transitions</strong><br />
            In the event of a merger, acquisition, or sale of the business, customer information may be transferred as part of the business assets.
          </li>
          <li>
            <strong>Submissions and Prohibited Conduct</strong><br />
            Customers and users must not post or transmit illegal, defamatory, or infringing material via our platforms. We reserve the right to monitor, remove, or disclose such material where required by law.
          </li>
          <li>
            <strong>Termination</strong><br />
            We reserve the right to suspend or terminate access to our website or services without notice where a breach of these Terms is identified.
          </li>
          <li>
            <strong>Indemnity</strong><br />
            You agree to indemnify and hold harmless Aussie Mobile Tyres, its officers, employees, and affiliates from all claims, damages, losses, and expenses (including legal fees) arising from your breach of these Terms or misuse of our services.
          </li>
          <li>
            <strong>Disclaimer of Liability</strong><br />
            Our website and services are provided on an “as is” and “as available” basis. To the maximum extent permitted by law, we disclaim all warranties regarding accuracy, reliability, or suitability for purpose. We are not liable for any indirect, incidental, or consequential damages arising from use of our services or website.
          </li>
          <li>
            <strong>Costs of Recovery</strong><br />
            The Customer agrees to reimburse all reasonable costs incurred by Aussie Mobile Tyres (including legal, enforcement, and debt collection costs) in recovering overdue payments.
          </li>
          <li>
            <strong>Governing Law</strong><br />
            These Terms and Conditions are governed by the laws of Victoria, Australia. Disputes shall be subject to the exclusive jurisdiction of the courts of Victoria.
          </li>
          <li>
            <strong>Changes to Terms</strong><br />
            We reserve the right to amend these Terms and Conditions at any time without notice. Continued use of our services constitutes acceptance of the revised Terms.
          </li>
          <li>
    
  </li>
        </ol>
      </div>

      <Footer />
    </>
  )
}

export default TermsCondition