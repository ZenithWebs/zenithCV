import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Education = () => {
  const { resumeData, setResumeData } = useResume();

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const deleteEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
        Education
        <button
          onClick={addEducation}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add
        </button>
      </h2>

      <AnimatePresence>
        {resumeData.education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded p-4 mb-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                className="input w-full mr-2"
              />
              <button onClick={() => deleteEducation(edu.id)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              className="input w-full mb-2"
            />

            <input
              type="text"
              placeholder="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
              className="input w-full mb-2"
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                className="input w-1/2"
              />
              <input
                type="text"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                className="input w-1/2"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Education;
