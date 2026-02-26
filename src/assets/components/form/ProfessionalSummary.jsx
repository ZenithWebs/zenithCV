import React from "react";

const ProfessionalSummary = ({ data, setResumeData }) => {
  const handleChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      professionalSummary: e.target.value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>

      <textarea
        value={data}
        onChange={handleChange}
        rows={5}
        placeholder="Write a short professional summary..."
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
      />
    </div>
  );
};

export default ProfessionalSummary;