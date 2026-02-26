import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <section className="py-28 bg-gray-50" id="pricing">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 mb-16">
          Start free. Upgrade when you're ready.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-lg border"
          >
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-4xl font-bold mb-6"> ₦0</p>

            <ul className="space-y-4 text-left text-gray-600 mb-8">
              <li>✓ 1 Resume Template</li>
              <li>✓ Basic Resume Builder</li>
              <li>✓ Standard PDF Download</li>
              <li>✓ Save Resumes</li>
              <p><b>Best for:</b> Students & first-time job seekers</p>
            </ul>

            <Link to={'/login'} className="w-full py-4 border flex justify-center items-center border-gray-300 rounded-2xl hover:bg-gray-100 transition">
              Get Started
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-blue-900 relative"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-sm px-4 py-1 rounded-full">
              Most Popular
            </span>

            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-6">₦3000</p>

            <ul className="text-left space-y-4 text-gray-700 mb-8">
              <li>✓ Advanced ATS Optimization</li>
              <li>✓ Unlimited Saves & Downloads</li>
              <li>✓ Remote Job Optimized Format</li>
              <li>✓ Premium Templates</li>
              <p> <b>Best for:</b> Graduates, remote job seekers & professionals serious about getting interviews</p>
            </ul>

            <Link to={ '/login'} className="flex items-center justify-center w-full py-4 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition">
              Upgrade Now
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
