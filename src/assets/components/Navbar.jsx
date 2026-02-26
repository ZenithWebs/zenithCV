import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from '../logos/logo.png'
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center justify-between px-8 py-4 rounded-3xl border transition-all duration-300
        ${scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-xl border-gray-200" 
          : "bg-white/50 backdrop-blur-md border-gray-100"}`}
      >
        <h1 className="text-xl flex items-center gap-1.5 font-bold bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
         <img src={logo} className="w-10" alt="" /> ZenithCV
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#example">Examples</a>
          <a href="#contact">Contact</a>

          <Link to={'/login'} className="px-6 py-2 bg-blue-900 text-white rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300">
            Start Free
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-800"
        >
          ☰
        </button>
      </motion.div>

      {mobileOpen && (
        <div className="md:hidden mt-3 flex flex-col bg-white rounded-2xl shadow-xl border p-6 space-y-4">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#example">Examples</a>
          <a href="#contact">Contact</a>

          <Link to={'/login'} className="w-full mt-4 px-6 py-3 bg-blue-900 text-white rounded-2xl">
            Start Free
          </Link>
        </div>
      )}
    </div>
  );
}

function a({ label }) {
  return (
    <div className="relative group cursor-pointer">
      <span className="group-hover:text-blue-900 transition">
        {label}
      </span>

      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
    </div>
  );
}
