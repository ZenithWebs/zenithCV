// src/components/BeforeAfter.jsx
import React from "react";

const BeforeAfter = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
      <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
        <h3 className="text-xl font-semibold mb-2 text-red-700">Before</h3>
        <p className="text-gray-600">
          Generic descriptions, weak impact statements, and low ATS score.
        </p>
      </div>
      <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
        <h3 className="text-xl font-semibold mb-2 text-green-700">After</h3>
        <p className="text-gray-600">
          Strong professional tone, optimized impact, and ATS-ready resume.
        </p>
      </div>
    </div>
  </section>
);

export default BeforeAfter;
