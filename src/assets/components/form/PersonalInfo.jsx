import React from "react";
import { useResume } from "../../context/ResumeContext";

const PersonalInfo = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Personal Information</h2>

      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              setResumeData(prev => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  photo: reader.result,
                },
              }));
            };

            if (file) reader.readAsDataURL(file);
          }}
          className="mt-2"
        />
        <input
          type="text"
          name="fullName"
          value={resumeData.personalInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input w-full"
        />
        <input
          type="text"
          name="jobTitle"
          value={resumeData.personalInfo.jobTitle}
          onChange={handleChange}
          placeholder="jobTitle"
          className="input w-full"
        />

        <input
          type="email"
          name="email"
          value={resumeData.personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="input w-full"
        />

        <input
          type="text"
          name="phone"
          value={resumeData.personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="input w-full"
        />

        <input
          type="text"
          name="location"
          value={resumeData.personalInfo.location}
          onChange={handleChange}
          placeholder="Location"
          className="input w-full"
        />

        <input
          type="text"
          name="linkedin"
          value={resumeData.personalInfo.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="input w-full"
        />

        <input
          type="text"
          name="portfolio"
          value={resumeData.personalInfo.portfolio}
          onChange={handleChange}
          placeholder="Portfolio URL"
          className="input w-full"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
