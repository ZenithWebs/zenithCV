import React from "react";
import { useResume } from "../../context/ResumeContext";

const SectionTitle = ({ children }) => (
  <h3 className="text-[11px] tracking-[3px] font-semibold text-gray-700 uppercase border-b border-gray-300 pb-1 mb-3">
    {children}
  </h3>
);

const TemplateElegant = () => {
  const { resumeData } = useResume();

  const {
    personalInfo = {},
    professionalSummary = "",
    experience = [],
    education = [],
    skills = [],
    languages = [],
    projects = [],
    certifications = [],
    references = [],
  } = resumeData || {};

  const dummyData = {
    personalInfo: {
      fullName: "John Doe",
      title: "Frontend Developer",
      email: "john.doe@email.com",
      phone: "+234 800 000 0000",
      location: "Lagos, Nigeria",
      linkedin: "linkedin.com/in/johndoe",
      portfolio: "johndoe.dev",
    },
    professionalSummary:
      "Passionate Frontend Developer with 4+ years of experience building responsive and user-friendly web applications. Skilled in React, Tailwind CSS, and modern JavaScript frameworks.",
    education: [
      {
        degree: "B.Sc. Computer Science",
        school: "University of Lagos",
        year: "2019",
      },
    ],
    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "Tech Solutions Ltd",
        location: "Lagos",
        startDate: "2021",
        endDate: "Present",
        description:
          "Developed and maintained responsive web applications using React and Tailwind CSS. Improved website performance by 30%.",
      },
    ],
    skills: ["React", "JavaScript", "Tailwind CSS", "Firebase", "UI/UX"],
    languages: ["English - Fluent", "Yoruba - Native"],
    projects: [
      {
        title: "E-commerce Website",
        description:
          "Built a fully responsive e-commerce platform with cart and payment integration.",
        link: "github.com/johndoe/ecommerce",
      },
    ],
    certifications: [
      { name: "Google UX Design Certificate", year: "2022" },
    ],
    references: [
      { name: "Jane Smith", phone: "+234 900 000 0000" },
    ],
  };

  const finalData = {
    personalInfo:
      Object.keys(personalInfo).length > 0
        ? personalInfo
        : dummyData.personalInfo,
    professionalSummary:
      professionalSummary || dummyData.professionalSummary,
    education: education.length > 0 ? education : dummyData.education,
    experience: experience.length > 0 ? experience : dummyData.experience,
    skills: skills.length > 0 ? skills : dummyData.skills,
    languages: languages.length > 0 ? languages : dummyData.languages,
    projects: projects.length > 0 ? projects : dummyData.projects,
    certifications:
      certifications.length > 0
        ? certifications
        : dummyData.certifications,
    references:
      references.length > 0 ? references : dummyData.references,
  };

  return (
    <div className="w-[794px] min-h-[1123px] bg-white shadow-lg text-gray-800 font-serif p-12">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl tracking-[6px] font-light uppercase">
          {finalData.personalInfo.fullName || dummyData.personalInfo.fullName}
        </h1>

        <p className="text-xs tracking-[4px] text-gray-500 mt-2 uppercase">
          {finalData.personalInfo.title || dummyData.personalInfo.title}
        </p>

        <div className="border-t border-gray-300 mt-6"></div>
      </div>

      <div className="grid grid-cols-3 gap-10">

 
        <div className="col-span-1 space-y-8">

          <div>
            <SectionTitle>Contact</SectionTitle>
            <div className="text-xs space-y-2 leading-relaxed">
              <p>{finalData.personalInfo.email || dummyData.personalInfo.email}</p>
              <p>{finalData.personalInfo.phone || dummyData.personalInfo.phone}</p>
              <p>{finalData.personalInfo.location || dummyData.personalInfo.location}</p>
              <p>{finalData.personalInfo.linkedin || dummyData.personalInfo.linkedin}</p>
              <p>{finalData.personalInfo.portfolio || dummyData.personalInfo.portfolio}</p>
            </div>
          </div>

          <div>
            <SectionTitle>Education</SectionTitle>
            <div className="text-xs space-y-4">
              {finalData.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="italic">{edu.school}</p>
                  <p className="text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Skills</SectionTitle>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {finalData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle>Languages</SectionTitle>
            <ul className="text-xs space-y-1">
              {finalData.languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="text-xs space-y-2">
              {finalData.certifications.map((cert, index) => (
                <li key={index}>
                  {cert.name} {cert.year && `(${cert.year})`}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-2 space-y-10">

          <div>
            <SectionTitle>Profile Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-700">
              {finalData.professionalSummary}
            </p>
          </div>

          <div>
            <SectionTitle>Work Experience</SectionTitle>
            <div className="space-y-6">
              {finalData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-semibold">
                    <p>{exp.jobTitle}</p>
                    <p className="text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <p className="italic text-sm">{exp.company}</p>
                  <p className="italic text-sm">{exp.location}</p>
                  <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {finalData.projects.map((project, index) => (
                <div key={index}>
                  <p className="font-semibold text-sm">{project.title}</p>
                  <p className="text-sm text-gray-700">
                    {project.description}
                  </p>
                  <p className="italic text-[10px]">{project.link}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>References</SectionTitle>
            <div className="space-y-3">
              {finalData.references.map((ref, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold">{ref.name}</p>
                  <p className="text-sm text-gray-600">{ref.phone}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateElegant;