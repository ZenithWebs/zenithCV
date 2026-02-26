import React, { useState } from "react";
import { useResume } from "../..//context/ResumeContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const { resumeData, setResumeData } = useResume();
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));
    setSkillInput("");
  };

  const deleteSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
        Skills
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="input flex-1"
        />
        <button
          onClick={addSkill}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <AnimatePresence>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded"
            >
              {skill}
              <Trash2
                size={14}
                className="cursor-pointer"
                onClick={() => deleteSkill(index)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Skills;
