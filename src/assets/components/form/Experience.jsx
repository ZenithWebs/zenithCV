import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Experience = () => {
  const { resumeData, setResumeData } = useResume();

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const deleteExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
        Experience
        <button
          onClick={addExperience}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add
        </button>
      </h2>

      <AnimatePresence>
        {resumeData.experience.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded p-4 mb-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                className="input w-full mr-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button onClick={() => deleteExperience(exp.id)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              className="input mb-2 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
              className="input w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
            />

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                className="input w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                className="input w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500
"
              />
            </div>

            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              className="input w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 h-20"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
