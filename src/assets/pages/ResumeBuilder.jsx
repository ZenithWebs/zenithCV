import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
import { ArrowLeft, Save, Download } from "lucide-react";

import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const colorMap = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-700",
  red: "bg-red-500",
  gray: "bg-gray-800",

  textBlue: "#3b82f6",
  textGreen: "#10b981",
  textYellow: "#facc15",
  textPurple: "#7c3aed",
  textRed: "#ef4444",
  textGray: "#1f2937",
};

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTemplate = searchParams.get("template");
  const resumeId = searchParams.get("resumeId");

  const [themeColor, setThemeColor] = useState("blue");
  const [accentColor, setAccentColor] = useState("blue");
  const [savedMessage, setSavedMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  const { resumeData, setResumeData } = useResume();

  const resumeRef = useRef(null);
  const previewWrapperRef = useRef(null);

  useEffect(() => {
    const scaleToFit = () => {
      if (!resumeRef.current || !previewWrapperRef.current) return;

      const containerWidth = previewWrapperRef.current.clientWidth;
      const resumeWidth = resumeRef.current.offsetWidth;

      const scale = Math.min(containerWidth / resumeWidth, 1);

      resumeRef.current.style.transform = `scale(${scale})`;
      resumeRef.current.style.transformOrigin = "top center";
    };

    scaleToFit();
    window.addEventListener("resize", scaleToFit);
    return () => window.removeEventListener("resize", scaleToFit);
  }, [resumeData]);

  useEffect(() => {
    const fetchResume = async () => {
      if (!resumeId) return;
      const snap = await getDoc(doc(db, "resumes", resumeId));
      if (snap.exists()) setResumeData(snap.data());
    };
    fetchResume();
  }, [resumeId, setResumeData]);

  const saveResume = async () => {
    const user = auth.currentUser;
    if (!user) {
      setSavedMessage("Login required ❌");
      return;
    }

    const payload = {
      userId: user.uid,
      templateId: selectedTemplate,
      themeColor,
      ...resumeData,
      updatedAt: serverTimestamp(),
    };

    if (resumeId) {
      await updateDoc(doc(db, "resumes", resumeId), payload);
    } else {
      const ref = await addDoc(collection(db, "resumes"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      navigate(
        `/resumebuilder?template=${selectedTemplate}&resumeId=${ref.id}`
      );
    }

    setSavedMessage("Saved successfully ☁️");
    setTimeout(() => setSavedMessage(""), 2500);
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const originalTransform = resumeRef.current.style.transform;
    resumeRef.current.style.transform = "scale(1)";

    const canvas = await html2canvas(resumeRef.current, {
      scale: 3,
      useCORS: true,
    });

    resumeRef.current.style.transform = originalTransform;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("ZenithCV-Resume.pdf");
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
  const colorClass = colorMap[themeColor];
  const accentColorClass = colorMap[accentColor];
  switch (selectedTemplate) {
    case "creative":
      return <TemplateCreative data={resumeData} themeColor={colorClass} />;
    case "corporate-pro":
      return <TemplateCorporatePro data={resumeData} themeColor={colorClass} accentColor={accentColorClass} />;
    default:
      return <TemplateElegant data={resumeData} themeColor={colorClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">

      <header className="bg-white/80 backdrop-blur border-b px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <img src={logo} className="w-9" alt="logo" />
          <span className="text-lg font-semibold">ZenithCV</span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme colors — only show for templates that use themeColor */}
              {["creative",].includes(selectedTemplate) && (
                <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
                  {["blue", "green", "yellow", "purple", "red", "gray"].map((color) => (
                    <div
                      key={color}
                      onClick={() => setThemeColor(color)}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 transition ${colorMap[color]} ${
                        themeColor === color ? "border-black scale-110" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Accent colors — only show for templates that use accentColor */}
              {["corporate-pro"].includes(selectedTemplate) && (
                <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
                  {["textBlue", "textGreen", "textYellow", "textPurple", "textRed", "textGray"].map((textColor) => (
                    <div
                      key={textColor}
                      onClick={() => setAccentColor(textColor)}
                      style={{ backgroundColor: colorMap[textColor] }}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 transition ${
                        accentColor === textColor ? "border-black scale-110" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          <button
            onClick={saveResume}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            Save
          </button>

          <button
            onClick={resetResume}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Reset
          </button>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </header>

      {savedMessage && (
        <div className="bg-green-100 text-green-700 text-center py-2 text-sm">
          {savedMessage}
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-10">
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
          ref={previewWrapperRef}
          className="w-full relative lg:w-1/2 flex justify-center items-start overflow-auto p-6"
        >
          <div
            ref={resumeRef}
            className="bg-white shadow-2xl rounded-sm"
            style={{
              width: "210mm",
              minHeight: "297mm",
            }}
          >
            {renderTemplate()}
          </div>
          <div className="left-1 top-20 flex flex-col md:hidden absolute gap-2 bg-white p-2 rounded-xl shadow-sm">
            {["creative", ].includes(selectedTemplate) &&
              ["blue", "green", "yellow", "purple", "red", "gray"].map((color) => (
                <div
                  key={color}
                  onClick={() => setThemeColor(color)}
                  style={{ backgroundColor: colorMap[color] }}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 transition ${colorMap[color]} ${
                    themeColor === color ? "border-black scale-110" : "border-transparent"
                  }`}
                />
              ))}
          </div>

          <div className="left-1 top-20 flex flex-col md:hidden absolute gap-2 bg-white p-2 rounded-xl shadow-sm">
            {["corporate-pro"].includes(selectedTemplate) &&
              ["textBlue", "textGreen", "textYellow", "textPurple", "textRed", "textGray"].map((textColor) => (
                <div
                  key={textColor}
                  onClick={() => setAccentColor(textColor)}
                  style={{ backgroundColor: colorMap[textColor] }}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 transition ${
                    accentColor === textColor ? "border-black scale-110" : "border-transparent"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
      

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={saveResume}
        className="lg:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl"
      >
        <Save size={22} />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={downloadPDF}
        className="lg:hidden fixed bottom-24 right-6 bg-blue-700 text-white p-4 rounded-full shadow-2xl"
      >
        <Download size={22} />
      </motion.button>
    </div>
  );
};

export default ResumeBuilder;