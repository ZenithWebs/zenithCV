import React from "react";
import { useResume } from "../../context/ResumeContext";

const SectionTitle = ({ children }) => (
  <h3 className="text-[11px] tracking-[3px] font-semibold text-gray-700 uppercase border-b border-gray-300 pb-1 mb-3">
    {children}
  </h3>
);

const TemplateElegant = () => {
  const { resumeData } = useResume();

  const dummyData = {
    personalInfo: {
      fullName: "JOHN DOE",
      jobTitle: "Frontend Developer",
      email: "john.doe@email.com",
      phone: "+1 (234) 567-8901",
      location: "New York, USA",
      linkedin: "linkedin.com/in/johndoe",
      portfolio: "johndoe.dev",
    },
    professionalSummary:
      "Creative and detail-oriented Frontend Developer with 4+ years of experience building responsive and user-friendly web applications. Passionate about crafting clean UI, optimizing performance, and delivering exceptional user experiences.",
    education: [
      {
        degree: "B.Sc. Computer Science",
        school: "University of Technology",
        startDate: "2016",
        endDate: "2020",
      },
    ],
    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "New York, USA",
        startDate: "2021",
        endDate: "Present",
        description:
          "Developed and maintained scalable React applications, improved website performance by 30%, and collaborated with cross-functional teams to deliver high-quality digital products.",
      },
      {
        jobTitle: "Junior Web Developer",
        company: "Creative Studio",
        location: "Remote",
        startDate: "2020",
        endDate: "2021",
        description:
          "Built responsive landing pages and implemented modern UI components using React and Tailwind CSS while ensuring cross-browser compatibility.",
      },
    ],
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Git"],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Spanish", level: "Intermediate" },
    ],
    projects: [
      {
        title: "E-commerce Website",
        description:
          "Developed a full-featured e-commerce platform with product filtering, cart system, and secure checkout integration.",
        link: "https://ecommerce-demo.com",
      },
      {
        title: "Portfolio Website",
        description:
          "Designed and developed a personal portfolio showcasing projects, blogs, and contact integration.",
        link: "https://johndoe.dev",
      },
    ],
    certifications: [
      { name: "Frontend Web Development", year: "2022" },
      { name: "React Advanced Concepts", year: "2023" },
    ],
    references: [
      {
        name: "Jane Smith",
        position: "Project Manager",
        company: "Tech Solutions Inc.",
        contact: "jane.smith@email.com",
      },
    ],
  };

  const finalData = {
    personalInfo:
      resumeData?.personalInfo?.fullName ? resumeData.personalInfo : dummyData.personalInfo,
    professionalSummary:
      resumeData?.professionalSummary || dummyData.professionalSummary,
    education:
      resumeData?.education?.length > 0 ? resumeData.education : dummyData.education,
    experience:
      resumeData?.experience?.length > 0 ? resumeData.experience : dummyData.experience,
    skills:
      resumeData?.skills?.length > 0 ? resumeData.skills : dummyData.skills,
    languages:
      resumeData?.languages?.length > 0 ? resumeData.languages : dummyData.languages,
    projects:
      resumeData?.projects?.length > 0 ? resumeData.projects : dummyData.projects,
    certifications:
      resumeData?.certifications?.length > 0
        ? resumeData.certifications
        : dummyData.certifications,
    references:
      resumeData?.references?.length > 0
        ? resumeData.references
        : dummyData.references,
  };

  return (
    <div className="resume-container print-container bg-white text-gray-800 font-serif pt-0 p-12">
      <div className="text-center mb-8 resume-section">
        <h1 className="text-3xl tracking-[6px] font-light uppercase">
          {finalData.personalInfo.fullName}
        </h1>

        <p className="text-xs tracking-[4px] text-gray-500 uppercase">
          {finalData.personalInfo.jobTitle}
        </p>

        <div className="border-t border-gray-300 mt-6"></div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 space-y-8">
          <div className="resume-section">
            <SectionTitle>Contact</SectionTitle>
            <div className="text-xs space-y-1 leading-relaxed">
              <p>{finalData.personalInfo.email}</p>
              <p>{finalData.personalInfo.phone}</p>
              <p>{finalData.personalInfo.location}</p>
              <p>{finalData.personalInfo.linkedin}</p>
              <p>{finalData.personalInfo.portfolio}</p>
            </div>
          </div>

          <div className="resume-section">
            <SectionTitle>Education</SectionTitle>
            <div className="text-xs space-y-4">
              {finalData.education.map((edu, index) => (
                <div key={index}>
                  <p>
                    <b>{edu.degree}</b>
                  </p>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="italic text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <SectionTitle>Skills</SectionTitle>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {finalData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
            <SectionTitle>Languages</SectionTitle>
            <ul className="text-xs space-y-1">
              {finalData.languages.map((lang, index) => (
                <li key={index}>
                  {lang.name || lang} {lang.level && `- ${lang.level}`}
                </li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
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

        <div className="col-span-2 space-y-10">
          <div className="resume-section">
            <SectionTitle>Profile Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-700">
              {finalData.professionalSummary}
            </p>
          </div>

          <div className="resume-section">
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

          <div className="resume-section">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {finalData.projects.map((project, index) => (
                <div key={index}>
                  <p className="font-semibold text-sm">{project.title}</p>
                  <p className="text-sm text-gray-700">
                    {project.description}
                  </p>
                  {project.link && (
                    <p className="italic text-[10px]">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <SectionTitle>References</SectionTitle>
            <div className="space-y-3">
              {finalData.references.map((ref, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold">{ref.name}</p>
                  <p>{ref.position}</p>
                  <p>{ref.company}</p>
                  <p className="text-sm text-gray-600">{ref.contact}</p>
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