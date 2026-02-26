import React from "react";

const TemplateCorporatePro = ({ data = {}, accentColor = "#1f4e79" }) => {
  const {
    personalInfo = {},
    professionalSummary,
    experience = [],
    education = [],
    skills = [],
    certifications = [],
  } = data;


  const dummyPersonal = {
    fullName: "HERMA WALTON",
    jobTitle: "FINANCIAL ANALYST",
    location: "Market Street 12, New York, 1021, USA",
    phone: "(412) 479-6342",
    email: "example@email.com",
  };

  const dummySummary =
    "Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments. Works to reduce business expenses and develop focused and aggressive operational plans.";

  const dummyExperience = [
    {
      jobTitle: "Financial Analyst",
      company: "GE Corp.",
      startDate: "Jan 2012",
      endDate: "Present",
      description:
        "• Created financial reports on completed projects.\n• Increased profit margin by 15%.\n• Managed budgets and forecast analysis.",
    },
    {
      jobTitle: "Financial Analyst",
      company: "Cisco Enterprises",
      startDate: "Feb 2008",
      endDate: "Dec 2012",
      description:
        "• Provided reports and analysis.\n• Collaborated with cross-functional teams.\n• Created weekly labor finance reports.",
    },
  ];

  const dummyEducation = [
    {
      degree: "Diploma in Computer Engineering",
      institution: "University of Arizona",
      startDate: "Aug 2006",
      endDate: "Oct 2008",
    },
    {
      degree: "Bachelor in Computer Engineering",
      institution: "University of Arizona",
      startDate: "Aug 2004",
      endDate: "Oct 2006",
    },
  ];

  const dummySkills = [
    "Solution Strategies",
    "Analytical Thinking",
    "Innovation",
    "Agile Methodologies",
    "Customer Service",
    "Market Assessment",
    "Collaboration",
    "Creative Problem Solving",
  ];

  const dummyCertifications = [
    "Certified Financial Analyst License",
    "Most Innovative Employer of the Year (2011)",
  ];



  const finalPersonal =
    Object.keys(personalInfo).length > 0
      ? personalInfo
      : dummyPersonal;

  const finalSummary = professionalSummary || dummySummary;
  const finalExperience =
    experience.length > 0 ? experience : dummyExperience;
  const finalEducation =
    education.length > 0 ? education : dummyEducation;
  const finalSkills = skills.length > 0 ? skills : dummySkills;
  const finalCertifications =
    certifications.length > 0 ? certifications : dummyCertifications;

  return (
    <div
      className="bg-white shadow-lg w-[800px] min-h-[1100px] p-10 text-[14px] leading-relaxed"
      style={{ fontFamily: "Arial, sans-serif" }}
    >

      <div className="flex justify-between items-start border-b-2 pb-4">
        <div>
          <h1
            className="text-3xl font-bold tracking-wide uppercase"
            style={{ color: accentColor }}
          >
            {finalPersonal.fullName}
          </h1>

          <p className="uppercase text-sm font-semibold mt-1">
            {finalPersonal.jobTitle}
          </p>

          <p className="text-xs text-gray-600 mt-2">
            {finalPersonal.location} | {finalPersonal.phone} |{" "}
            {finalPersonal.email}
          </p>
          <div className="flex gap-1.5">
            <p className="text-gray-500 text-sm p-0">{finalPersonal.linkedin || "https://linked.in/123"} </p> |
            <p className="text-gray-500 text-sm p-0">{finalPersonal.portfolio || "www.myportfolio.com"}  </p>
        </div>
        </div>
        

        {finalPersonal.photo && (
          <img
            src={finalPersonal.photo}
            alt="profile"
            className="w-28 h-28 object-cover border"
          />
        )}
      </div>

      <Section title="SUMMARY" accentColor={accentColor}>
        <p>{finalSummary}</p>
      </Section>

      <Section title="PROFESSIONAL EXPERIENCE" accentColor={accentColor}>
        {finalExperience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between font-semibold">
              <span>
                {exp.jobTitle} — {exp.company}
              </span>
              <span className="text-xs">
                {exp.startDate} — {exp.endDate || "Present"}
              </span>
            </div>

            <div className="text-sm mt-2 whitespace-pre-line">
              {exp.description}
            </div>
          </div>
        ))}
      </Section>

      <Section title="EDUCATION" accentColor={accentColor}>
        {finalEducation.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between font-semibold">
              <span>{edu.degree}</span>
              <span className="text-xs">
                {edu.startDate} — {edu.endDate}
              </span>
            </div>
            <p className="text-sm mt-1">{edu.institution}</p>
          </div>
        ))}
      </Section>

      <Section title="TECHNICAL SKILLS" accentColor={accentColor}>
        <div className="grid grid-cols-2 gap-2">
          {finalSkills.map((skill, index) => (
            <div key={index} className="text-sm">
              • {typeof skill === "string" ? skill : skill.name}
            </div>
          ))}
        </div>
      </Section>

      <Section title="ADDITIONAL INFORMATION" accentColor={accentColor}>
        {finalCertifications.map((cert, index) => (
            <div key={index} className="text-sm mb-1">
            •{" "}
            {typeof cert === "string"
                ? cert
                : `${cert.name || ""} ${
                    cert.organization ? `- ${cert.organization}` : ""
                } ${cert.year ? `(${cert.year})` : ""}`}
            </div>
        ))}
        </Section>
    </div>
  );
};


const Section = ({ title, children, accentColor }) => (
  <div className="mt-6">
    <h2
      className="text-sm font-bold border-b-2 pb-1 mb-3 uppercase"
      style={{
        color: accentColor,
        borderColor: accentColor,
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

export default TemplateCorporatePro;