import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/contact/send', form);
      setForm({ email: '', subject: '', message: '', name: '', phone: '' });
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error('Failed to send message. Try again.');
    }
  };

  return (
    <section
      className="text-white px-4 sm:px-7 md:px-17 py-10 rounded-xl max-w-5xl mx-auto mt-16 scroll-mt-[140px]"
      id="contact"
      style={{ backgroundColor: "#c01e1eff" }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Contact us</h2>
      <p className="text-sm text-white mb-8 leading-relaxed">
        Let us know how we can help! Fill in your details below and our team will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full sm:w-1/2 bg-transparent border border-white text-white placeholder-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full sm:w-1/2 bg-transparent border border-white text-white placeholder-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full sm:w-1/2 bg-transparent border border-white text-white placeholder-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full sm:w-1/2 bg-transparent border border-white text-white placeholder-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            required
          />
        </div>

        <textarea
          placeholder="Your Message"
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border border-white text-white placeholder-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 text-sm resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-white hover:bg-red-500 text-black font-semibold px-6 py-2 rounded-full transition text-sm sm:text-base"
        >
          Send
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default ContactUs;
