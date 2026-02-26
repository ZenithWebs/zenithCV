import { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();
export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("zenithcv-data");

    return saved
      ? JSON.parse(saved)
      : {
          personalInfo: {
            fullName: "",
            title: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            portfolio: "",
          },
          professionalSummary: "",
          experience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: [],
          references: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("zenithcv-data", JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
