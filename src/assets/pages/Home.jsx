import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import { Link } from "react-router-dom";
import banner_img from "../images/banner.png"

export default function Home() {
  return (
    <div className="bg-white text-gray-900 scroll-smooth">
      <Navbar />

      <section className="relative py-28 overflow-hidden">
        
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Build a{" "}
              <span className="bg-gradient-to-r from-green-600 via-blue-900 to-indigo-600 bg-clip-text text-transparent">
                Global-Ready Resume
              </span>{" "}
              from Nigeria
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              ZenithCV helps Nigerian graduates and professionals create ATS-optimized resumes 
              that win remote jobs, internships, NYSC placements, and international opportunities.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to={'/dashboard'} className="px-8 py-4 bg-blue-900 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                Start Free
              </Link>

              <a href="#example" className="px-8 py-4 border border-gray-300 rounded-2xl hover:bg-gray-100 transition">
                See Example
              </a>
            </div>
          </motion.div>

            <motion.img initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }} src={banner_img} alt="" className="w-full" />

        </div>
      </section>

      <section className="py-28 bg-gray-50" id="features">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-6">
      Get Remote Jobs. Earn in Dollars.
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Whether you're applying to companies in the US, UK, Canada, or remote startups,
      ZenithCV structures your resume to pass ATS filters and impress global recruiters.
    </p>

    <div className="grid md:grid-cols-3 gap-10">
      <div className="p-8 bg-white rounded-3xl shadow-md">
        <h3 className="font-semibold text-xl mb-4">ATS Optimized</h3>
        <p className="text-gray-600">
          Designed to pass Applicant Tracking Systems used by global companies.
        </p>
      </div>

      <div className="p-8 bg-white rounded-3xl shadow-md">
        <h3 className="font-semibold text-xl mb-4">AI Rewriting</h3>
        <p className="text-gray-600">
          Turns simple job descriptions into powerful achievement statements.
        </p>
      </div>

      <div className="p-8 bg-white rounded-3xl shadow-md">
        <h3 className="font-semibold text-xl mb-4">Professional Templates</h3>
        <p className="text-gray-600">
          Clean layouts trusted by international recruiters.
        </p>
      </div>
    </div>
  </div>
</section>
      <section className="py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Built for Nigerian Graduates 🇳🇬
              </h2>

              <p className="text-gray-600 mb-6">
                We understand the challenges Nigerian graduates face - limited experience,
                competitive job markets, and international application standards.
              </p>

              <ul className="space-y-4 text-gray-700">
                <li>✔ Optimized for international ATS systems</li>
                <li>✔ Perfect for remote job applications</li>
                <li>✔ NYSC & internship friendly formats</li>
                <li>✔ Clean, professional templates recruiters love</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-10 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Why ZenithCV?
              </h3>
              <p className="text-gray-700">
                Most Nigerian resumes get rejected not because of lack of skills,
                but because they are poorly structured. ZenithCV fixes that instantly.
              </p>
            </div>

          </div>
        </section>
        <section className="py-28">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-6">
      No Experience? No Problem.
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto mb-10">
      ZenithCV helps fresh graduates transform SIWES, NYSC, school projects,
      volunteer work, and internships into professional-level experience.
    </p>

    <div className="bg-green-50 p-10 rounded-3xl shadow-md max-w-3xl mx-auto">
      <p className="text-green-800 font-medium">
        Your experience is more valuable than you think. We help you present it properly.
      </p>
    </div>
  </div>
</section>
      <section className="py-28" id="example">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            See The Transformation
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-red-50 rounded-3xl shadow-md"
            >
              <p className="text-red-600 font-semibold mb-3">Before</p>
              <p>I worked at a shop and helped customers.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-green-50 rounded-3xl shadow-md"
            >
              <p className="text-green-600 font-semibold mb-3">After</p>
              <p>
                Delivered exceptional customer service while managing daily
                retail operations and driving repeat business growth.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Stop Sending Weak Resumes.
          <br />
          Start Getting Interviews.
        </motion.h2>

        <Link to={'/login'} className="px-10 py-5 bg-white text-blue-900 rounded-3xl font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          Start Free Now
        </Link>
      </section>
      <Pricing/>
      <Contact />
      <Footer/>
    </div>
  );
}
