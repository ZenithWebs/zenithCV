import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-28 bg-gray-50" id="contact">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Get In Touch
        </h2>

        <p className="text-gray-600 mb-12">
          Have questions? We'd love to hear from you.
        </p>

        <motion.form
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl shadow-lg space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-900"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-900"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-900"
          />

          <button
            type="submit"
            className="w-full py-4 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition"
          >
            Send Message
          </button>
        </motion.form>

      </div>
    </section>
  );
}
