import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ExportPDF from "../components/ExportPDF";
import { useResume } from "../context/ResumeContext";

import PersonalInfo from "../components/form/PersonalInfo";
import ProfessionalSummary from "../components/form/ProfessionalSummary";
import Experience from "../components/form/Experience";
import Education from "../components/form/Education";
import Skills from "../components/form/Skills";
import Projects from "../components/form/Projects";
import Certifications from "../components/form/Certifications";
import Languages from "../components/form/Languages";
import References from "../components/form/References";

import TemplateCreative from "../components/templates/TemplateCreative";
import TemplateElegant from "../components/templates/TemplateElegant";
import TemplateCorporatePro from "../components/templates/TemplateCorporatePro";

import logo from "../logos/logo.png";
import { ArrowLeft, Save } from "lucide-react";

import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTemplate = searchParams.get("template");
  const resumeId = searchParams.get("resumeId");

  const [themeColor, setThemeColor] = useState("blue");
  const [savedMessage, setSavedMessage] = useState("");
  const [activeTab, setActiveTab] = useState("form");
  const [formKey, setFormKey] = useState(0);

  const { resumeData, setResumeData } = useResume();

  const calculateProgress = () => {
    let total = 0;
    let filled = 0;

    const checkValue = (value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => checkValue(item));
      } else if (typeof value === "object" && value !== null) {
        Object.values(value).forEach((val) => checkValue(val));
      } else {
        total++;
        if (value !== "" && value !== null && value !== undefined) {
          filled++;
        }
      }
    };

    checkValue(resumeData);

    return total === 0 ? 0 : Math.round((filled / total) * 100);
  };

  useEffect(() => {
    const fetchResume = async () => {
      if (!resumeId) return;
      try {
        const resumeRef = doc(db, "resumes", resumeId);
        const resumeSnap = await getDoc(resumeRef);
        if (resumeSnap.exists()) {
          setResumeData(resumeSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
  }, [resumeId, setResumeData]);

  const saveResume = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setSavedMessage("You must be logged in ❌");
        return;
      }

      const resumePayload = {
        userId: user.uid,
        templateId: selectedTemplate,
        ...resumeData,
        updatedAt: serverTimestamp(),
      };

      if (resumeId) {
        await updateDoc(doc(db, "resumes", resumeId), resumePayload);
      } else {
        const docRef = await addDoc(collection(db, "resumes"), {
          ...resumePayload,
          createdAt: serverTimestamp(),
        });
        navigate(
          `/resumebuilder?template=${selectedTemplate}&resumeId=${docRef.id}`
        );
      }

      setSavedMessage("Resume saved successfully ☁️✅");
      setTimeout(() => setSavedMessage(""), 2500);
    } catch (error) {
      console.error(error);
      setSavedMessage("Failed to save ❌");
    }
  };

  const resetResume = () => {
    setResumeData({
      personalInfo: {},
      professionalSummary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      references: [],
    });
    setFormKey((prev) => prev + 1);
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "creative":
        return (
          <TemplateCreative data={resumeData} themeColor={themeColor} />
        );
      case "corporate-pro":
        return (
          <TemplateCorporatePro
            data={resumeData}
            accentColor={themeColor}
          />
        );
      default:
        return <TemplateElegant data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-30 shadow-sm">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <img src={logo} className="w-9" alt="logo" />
          <span className="text-lg font-semibold">ZenithCV</span>
        </div>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
          <button
            onClick={saveResume}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg"
          >
            Save
          </button>
          <button
            onClick={resetResume}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            Reset
          </button>
          <ExportPDF />
        </div>
      </header>

      {savedMessage && (
        <div className="bg-green-100 text-green-700 text-center py-2 text-sm">
          {savedMessage}
        </div>
      )}

      <div className="lg:hidden flex border-b bg-white">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "form"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Form
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div
          className={`w-full lg:w-1/2 bg-white border-r overflow-y-auto ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="px-4 sm:px-8 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  calculateProgress() < 40
                    ? "bg-red-500"
                    : calculateProgress() < 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {calculateProgress()}% Completed
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-10">
            <motion.div key={formKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <PersonalInfo data={resumeData.personalInfo} setResumeData={setResumeData} />
              <ProfessionalSummary data={resumeData.professionalSummary} setResumeData={setResumeData} />
              <Experience data={resumeData.experience} setResumeData={setResumeData} />
              <Education data={resumeData.education} setResumeData={setResumeData} />
              <Skills data={resumeData.skills} setResumeData={setResumeData} />
              <Projects data={resumeData.projects} setResumeData={setResumeData} />
              <Certifications data={resumeData.certifications} setResumeData={setResumeData} />
              <Languages data={resumeData.languages} setResumeData={setResumeData} />
              <References data={resumeData.references} setResumeData={setResumeData} />
            </motion.div>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 bg-gray-100 flex flex-col items-center overflow-y-auto ${
            activeTab === "form" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="w-full flex justify-center px-3 sm:px-6 py-6">
            <motion.div
              key={selectedTemplate}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-full sm:max-w-[700px] lg:max-w-[800px] bg-white shadow-md rounded-md overflow-hidden scale-[0.95] sm:scale-100"
            >
              {renderTemplate()}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={saveResume}
        className="lg:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl active:scale-95 transition z-50"
      >
        <Save size={22} />
      </motion.button>
    </div>
  );
};

export default ResumeBuilder;
