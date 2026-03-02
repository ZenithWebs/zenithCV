import React from "react";
import { useResume } from "../../context/ResumeContext";

const TemplateCreative = ({ themeColor }) => {
  const { resumeData } = useResume();

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
      relationship: "Manager",
      contact: "janesmith@email.com",
    },
  ];

  return (
    <div
      className="resume-container bg-white shadow-xl flex overflow-hidden"
      style={{
        //width: "210mm",
        //minHeight: "297mm",
      }}
    >
      <div
        className={`w-1/3 text-white p-8 flex flex-col gap-6 ${themeColor}`}
      >
        <div className="flex flex-col justify-center items-center gap-1.5">
          {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="profile"
            className="w-20 h-20 object-cover rounded-full flex mx-auto border shrink-0"
          />
        )}
        <p className="text-2xl font-medium  capitalize text-center">
          {personalInfo.fullName || "John Doe"}
        </p>
        <div className="h-0.5 w-1/2 bg-gray-200"/>
        <p>{personalInfo.jobTitle}</p>
        </div>
        

        <div className="text-sm opacity-90 space-y-1">
          <p>{personalInfo.email || "johndoe@email.com"}</p>
          <p>{personalInfo.phone || "+234 800 000 0000"}</p>
          <p>{personalInfo.location || "Lagos, Nigeria"}</p>
          <p>{personalInfo.linkedin || "linkedin.com/in/johndoe"}</p>
          <p>{personalInfo.portfolio || "www.johndoe.com"}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-semibold uppercase text-sm mb-2">
            Skills
          </h2>
          <ul className="space-y-1 text-sm">
            {(skills.length > 0 ? skills : ["React", "JavaScript", "Tailwind CSS"]).map(
              (skill, i) => (
                <li key={i}>• {skill}</li>
              )
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-2">
            Languages
          </h2>
          <ul className="space-y-1 text-sm">
            {(languages.length > 0
              ? languages
              : [{ language: "English", level: "Fluent" }]
            ).map((lang, i) => (
              <li key={i}>
                {lang.name} – {lang.level}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-2">
            Certifications
          </h2>
          <ul className="space-y-2 text-sm">
            {(certifications.length > 0
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
                <p className="opacity-80">
                  {cert.organization} ({cert.year})
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="w-2/3 p-8 space-y-6">
        {/* Summary */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-1 text-gray-700">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-base">
            {professionalSummary ||
              "Passionate and results-driven professional with experience building scalable applications and delivering high-quality digital products."}
          </p>
        </div>

        {/* Experience */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-1 text-gray-700">
            Experience
          </h2>
          {(experience.length > 0 ? experience : dummyExperience).map((exp) => (
            <div key={exp.id} className="mb-4">
              <p className="font-semibold text-base">
                {exp.jobTitle} – {exp.company}
              </p>
              <p className="font-medium">{exp.location}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="mt-1 text-base"> <b>Description:</b> <br />{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-1 text-gray-700">
            Education
          </h2>
          {(education.length > 0 ? education : dummyEducation).map((edu) => (
            <div key={edu.id} className="mb-3">
              <p className="font-semibold text-base">
                {edu.degree} – {edu.school}
              </p>
              <p className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-1 text-gray-700">
            Projects
          </h2>
          {(projects.length > 0 ? projects : dummyProjects).map((proj) => (
            <div key={proj.id} className="mb-3">
              <p className="font-semibold text-base">{proj.title}</p>
              <p className="text-base">{proj.description}</p>
              <p className="text-sm text-blue-600">{proj.link}</p>
            </div>
          ))}
        </div>

        {/* References */}
        <div className="resume-section">
          <h2 className="font-semibold uppercase text-sm mb-1 text-gray-700">
            References
          </h2>
          {(references.length > 0 ? references : dummyReferences).map((ref) => (
            <div key={ref} className="mb-3 text-sm">
              <p className="font-medium">Name: {ref.name}</p>
              <p>Position: {ref.position}</p>
              <p>Contact: {ref.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCreative;