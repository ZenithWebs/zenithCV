import React from "react";
import { useResume } from "../../context/ResumeContext";

const colorMap = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-700",
  red: "bg-red-500",
  gray: "bg-gray-800",
};

const TemplateCreative = ({ themeColor = "blue" }) => {
  const { resumeData = {} } = useResume();

  const {
    personalInfo = {},
    professionalSummary = "",
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    references = [],
  } = resumeData;

  const dummyExperience = [
    {
      id: "1",
      jobTitle: "Frontend Developer",
      company: "Tech Company Ltd",
      startDate: "2022",
      endDate: "Present",
      description:
        "Developed responsive web applications and improved UI performance by 30%.",
    },
  ];

  const dummyEducation = [
    {
      id: "1",
      degree: "B.Sc Computer Science",
      school: "University of Lagos",
      startDate: "2018",
      endDate: "2022",
    },
  ];

  const dummyProjects = [
    {
      id: "1",
      title: "Portfolio Website",
      description:
        "Built a personal portfolio website using React and Tailwind CSS.",
      link: "www.myportfolio.com",
    },
  ];

  const dummyReferences = [
    {
      id: "1",
      name: "Jane Smith",
      company: "Tech Company Ltd",
      position: "Manager",
      contact: "janesmith@email.com",
    },
  ];

  return (
    <div className="flex justify-center px-4 py-8 bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* Sidebar */}
        <div
          className={`w-full md:w-1/3 text-white p-6 md:p-8 flex flex-col gap-6 ${colorMap[themeColor]}`}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {personalInfo.fullName || "John Doe"}
            </h1>
            <div className="text-xs md:text-sm opacity-90 space-y-1">
              <p>{personalInfo.email || "johndoe@email.com"}</p>
              <p>{personalInfo.phone || "+234 800 000 0000"}</p>
              <p>{personalInfo.location || "Lagos, Nigeria"}</p>
              <p>{personalInfo.linkedin || "linkedin.com/in/johndoe"}</p>
              <p>{personalInfo.portfolio || "www.johndoe.com"}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 tracking-wider">
              Skills
            </h2>
            <ul className="space-y-1 text-sm">
              {(skills.length ? skills : ["React", "JavaScript", "Tailwind CSS"]).map(
                (skill, i) => (
                  <li key={i}>• {skill}</li>
                )
              )}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 tracking-wider">
              Languages
            </h2>
            <ul className="space-y-1 text-sm">
              {(languages.length
                ? languages
                : [{ language: "English", level: "Fluent" }]
              ).map((lang, i) => (
                <li key={i}>
                  {lang.language} – {lang.level}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 tracking-wider">
              Certifications
            </h2>
            <ul className="space-y-2 text-sm">
              {(certifications.length
                ? certifications
                : [
                    {
                      name: "Google UX Design",
                      organization: "Google",
                      year: "2023",
                    },
                  ]
              ).map((cert, i) => (
                <li key={i}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-xs opacity-80">
                    {cert.organization} ({cert.year})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 md:p-8 space-y-8">

          {/* Summary */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 text-gray-700 tracking-wider">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {professionalSummary ||
                "Passionate and results-driven professional with experience building scalable applications and delivering high-quality digital products."}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 text-gray-700 tracking-wider">
              Experience
            </h2>
            {(experience.length ? experience : dummyExperience).map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-semibold text-sm">
                  {exp.jobTitle} – {exp.company}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 text-gray-700 tracking-wider">
              Education
            </h2>
            {(education.length ? education : dummyEducation).map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="font-semibold text-sm">
                  {edu.degree} – {edu.school}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 text-gray-700 tracking-wider">
              Projects
            </h2>
            {(projects.length ? projects : dummyProjects).map((proj) => (
              <div key={proj.id} className="mb-3">
                <p className="font-semibold text-sm">{proj.title}</p>
                <p className="text-sm">{proj.description}</p>
                <p className="text-xs text-blue-600 break-all">{proj.link}</p>
              </div>
            ))}
          </div>

          {/* References */}
          <div>
            <h2 className="font-semibold uppercase text-xs mb-2 text-gray-700 tracking-wider">
              References
            </h2>
            {(references.length ? references : dummyReferences).map((ref) => (
              <div key={ref.id} className="mb-3 text-sm">
                <p className="font-medium">{ref.name}</p>
                <p className="text-xs text-gray-500">
                  {ref.position} – {ref.company}
                </p>
                <p className="text-xs text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateCreative;