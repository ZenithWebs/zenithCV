import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const { resumeData, setResumeData } = useResume();

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          link: "",
        },
      ],
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const deleteProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
        Projects
        <button
          onClick={addProject}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add
        </button>
      </h2>

      <AnimatePresence>
        {resumeData.projects.map((proj) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded p-4 mb-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                className="input w-full mr-2"
              />
              <button
                onClick={() => deleteProject(proj.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <textarea
              placeholder="Description"
              value={proj.description}
              onChange={(e) =>
                updateProject(proj.id, "description", e.target.value)
              }
              className="input w-full h-20 mb-2"
            />

            <input
              type="text"
              placeholder="Project Link"
              value={proj.link}
              onChange={(e) => updateProject(proj.id, "link", e.target.value)}
              className="input w-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
