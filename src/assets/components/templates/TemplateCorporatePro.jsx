import React from "react";

const TemplateCorporatePro = ({ data = {}, accentColor = "#1f2937" }) => {
  const {
    personalInfo = {},
    professionalSummary,
    experience = [],
    education = [],
    skills = [],
    certifications = [],
  } = data;

  // -------------------------
  // Dummy fallback data
  // -------------------------

  const dummyPersonal = {
    fullName: "HERMA WALTON",
    jobTitle: "FINANCIAL ANALYST",
    location: "Market Street 12, New York, 1021, USA",
    phone: "(412) 479-6342",
    email: "example@email.com",
  };

  const dummySummary =
    "Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments.";

  const dummyExperience = [
    {
      jobTitle: "Financial Analyst",
      company: "GE Corp.",
      startDate: "Jan 2012",
      endDate: "Present",
      description:
        "• Created financial reports on completed projects.\n• Increased profit margin by 15%.\n• Managed budgets and forecast analysis.",
    },
  ];

  const dummyEducation = [
    {
      degree: "Bachelor in Computer Engineering",
      institution: "University of Arizona",
      startDate: "Aug 2004",
      endDate: "Oct 2006",
    },
  ];

  const dummySkills = [
    "Analytical Thinking",
    "Innovation",
    "Agile Methodologies",
    "Collaboration",
  ];

  const dummyCertifications = [
    "Certified Financial Analyst License",
  ];

  // -------------------------
  // Final data selection
  // -------------------------

  const finalPersonal =
    Object.keys(personalInfo).length > 0 ? personalInfo : dummyPersonal;

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
      className="bg-white w-full h-full p-10 text-[14px] leading-relaxed"
      style={{
        fontFamily: "Arial, sans-serif",
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-2 pb-4">
        <div className="flex-1 pr-4">
          <h1
            className="text-3xl font-bold tracking-wide uppercase"
            style={{ color: accentColor }}
          >
            {finalPersonal.fullName}
          </h1>

          <p className="uppercase text-sm font-semibold mt-1">
            {finalPersonal.jobTitle}
          </p>

          <p className="text-xs text-gray-600 mt-2 break-words">
            {finalPersonal.location} | {finalPersonal.phone} |{" "}
            {finalPersonal.email}
          </p>

          <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-1">
            <span>
              {finalPersonal.linkedin || "https://linked.in/123"}
            </span>
            <span>|</span>
            <span>
              {finalPersonal.portfolio || "www.myportfolio.com"}
            </span>
          </div>
        </div>

        {finalPersonal.photo && (
          <img
            src={finalPersonal.photo}
            alt="profile"
            className="w-28 h-28 object-cover border shrink-0"
          />
        )}
      </div>

      {/* SUMMARY */}
      <Section title="SUMMARY" accentColor={accentColor}>
        <p>{finalSummary}</p>
      </Section>

      {/* EXPERIENCE */}
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

      {/* EDUCATION */}
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

      {/* SKILLS */}
      <Section title="TECHNICAL SKILLS" accentColor={accentColor}>
        <div className="grid grid-cols-2 gap-2">
          {finalSkills.map((skill, index) => (
            <div key={index} className="text-sm break-words">
              • {typeof skill === "string" ? skill : skill.name}
            </div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section title="ADDITIONAL INFORMATION" accentColor={accentColor}>
        {finalCertifications.map((cert, index) => (
          <div key={index} className="text-sm mb-1 break-words">
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

// SECTION COMPONENT
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