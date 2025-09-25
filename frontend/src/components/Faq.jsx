import React, { useState } from "react";

const faqData = [
  {
    question: "1. What areas do Aussie Mobile Tyres services cover?",
    answer:
      "We provide mobile tyre services across a wide range of Melbourne suburbs, including Glen Waverley, Frankston, Dandenong, and surrounding areas. Check our full service area list to see if we cover your location.",
  },
  {
    question: "2. How does mobile tyre fitting work?",
    answer:
      "Our expert technicians come directly to your home, workplace, or roadside to fit new tyres on-site, saving you time and hassle compared to visiting a tyre.",
  },
  {
    question: "3. Can Aussie Mobile Tyres repair punctures on all tyre types?",
    answer:
      "Yes, we repair punctures on most passenger vehicle tyres safely and efficiently, ensuring your tyre is roadworthy and durable after repair.",
  },
  {
    question: "4. What tyre brands do you sell and fit?",
    answer:
      "We stock a variety of trusted tyre brands to suit different budgets and vehicle types. Our team will recommend the best options based on your driving needs.",
  },
  {
    question: "5. How often should I get my tyres rotated and balanced?",
    answer:
      "Tyre rotation and wheel balancing are recommended every 10,000 to 12,000 kilometers or as advised by your vehicle’s manufacturer to ensure even wear and extend tyre life.",
  },
  {
    question: "6. Do you offer fleet tyre services for businesses?",
    answer:
      "Yes, we provide comprehensive fleet tyre management, including regular inspections, repairs, replacements, and maintenance to keep your business vehicles safe and operational.",
  },
  {
    question: "7. What is your tyre recycling process?",
    answer:
      "We responsibly collect and recycle old tyres to minimize environmental impact. Aussie Mobile Tyres ensures tyres are disposed of in compliance with local regulations and eco-friendly standards.",
  },{
  question: "8. Do you offer runflat tyres?",
  answer:
    "Yes, we do offer runflat tyres. Contact us to check availability for your specific vehicle and tyre size.",
},
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // first one open by default

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="pt-28 pb-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-center gap-10">
          {/* Left content */}
          <div className="lg:w-1/2" >
            <div className="mb-10">
              <span
                style={{ color: "#DA2627" }}
                className="font-semibold uppercase text-sm mb-2 inline-block"
              >
                FAQ
              </span>
              <h2 className="text-4xl font-bold mb-4">
                Why you should choose our services
              </h2>
              <p className="mb-6 text-gray-700">
                Do you have questions about Aussie Mobile Tyres?
              </p>
              <ul className="flex gap-4 mb-10">
                {["Quality Services", "Affordable Cost", "Professional"].map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-lg font-semibold"
                      style={{ color: "#DA2627" }}
                    >
                      <i className="bi bi-star-fill"></i>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl shadow-md overflow-hidden ${
                    activeIndex === idx ? "open" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                    aria-expanded={activeIndex === idx}
                  >
                    <span className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    <span
                      className={`right-icon transition-transform duration-300 ${
                        activeIndex === idx ? "rotate-180" : ""
                      }`}
                    >
                      {/* Chevron down icon from Bootstrap Icons */}
                      <i
                        className="bi bi-chevron-down text-2xl"
                        style={{ color: "#DA2627" }}
                      ></i>
                    </span>
                  </button>
                  {activeIndex === idx && (
                    <div className="faq-content p-5 pt-0 text-gray-600 border-t border-gray-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="lg:w-1/2">
            <img
              src="/tyre services/wheel balancing (4).jpg"
              alt="about us faq"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
