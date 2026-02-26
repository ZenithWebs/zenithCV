import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 relative overflow-hidden">

      <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ZenithCV</h2>
          <p className="text-gray-400 leading-relaxed">
            AI-powered resume rewriting designed to help professionals
            stand out and secure more interviews.
          </p>

          <div className="mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} ZenithCV. All rights reserved.
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <div className="space-y-3 flex flex-col">
            <Link to={'#features'} className="hover:text-white transition cursor-pointer">
              Features
            </Link>
            <Link to={'#pricing'} className="hover:text-white transition cursor-pointer">
              Pricing
            </Link>
            <Link to={'/login'} className="hover:text-white transition cursor-pointer">
              Resume Builder
            </Link>
            <Link to={'#example'} className="hover:text-white transition cursor-pointer">
              Examples
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3">
            <li className="hover:text-white transition cursor-pointer">
              About
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Blog
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Careers
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Join Our Newsletter
          </h3>

          <p className="text-gray-400 mb-4">
            Get resume tips and AI updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-2xl bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500 text-white"
            />
            <button className="px-5 py-3 bg-blue-900 text-white rounded-r-2xl hover:bg-blue-800 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-10 py-6 text-center text-sm text-gray-500">
        Built with AI. Designed for success.
      </div>
    </footer>
  );
}
