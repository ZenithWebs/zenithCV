import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useResume } from "../context/ResumeContext";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
import {
  ArrowLeft,
  Save,
  Download,
  RefreshCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

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

  const { resumeData, setResumeData } = useResume();
  const pdfRef = useRef(null);

  const [themeColor, setThemeColor] = useState("blue");
  const [accentColor, setAccentColor] = useState("textBlue");
  const [savedMessage, setSavedMessage] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [mobileView, setMobileView] = useState("form");
  const [zoom, setZoom] = useState(0.8);

  const templateSupportsColor =
    selectedTemplate === "creative" ||
    selectedTemplate === "corporate-pro";

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setZoom(0.5);
    } else {
      setZoom(0.8);
    }
  }, []);

  useEffect(() => {
    if (!resumeId) return;
    const fetchResume = async () => {
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
      accentColor,
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

  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("ZenithCV-Resume.pdf");
  };

  const renderTemplate = () => {
    const themeClass = colorMap[themeColor];
    const accentHex = colorMap[accentColor];

    switch (selectedTemplate) {
      case "creative":
        return (
          <TemplateCreative
            data={resumeData}
            themeColor={themeClass}
          />
        );
      case "corporate-pro":
        return (
          <TemplateCorporatePro
            data={resumeData}
            themeColor={themeClass}
            accentColor={accentHex}
          />
        );
      default:
        return (
          <TemplateElegant
            data={resumeData}
            themeColor={themeClass}
          />
        );
    }
  };

  const ColorPicker = () => (
    <div className="flex flex-wrap gap-2">
      {["blue", "green", "yellow", "purple", "red", "gray"].map((color) => (
        <button
          key={color}
          onClick={() => {
            setThemeColor(color);
            setAccentColor(
              `text${color.charAt(0).toUpperCase() + color.slice(1)}`
            );
          }}
          className={`w-6 h-6 rounded-full ${colorMap[color]} ${
            themeColor === color ? "ring-2 ring-black" : ""
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <img src={logo} className="w-9" alt="logo" />
          <span className="font-semibold text-lg">ZenithCV</span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {templateSupportsColor && <ColorPicker />}
          <button
            onClick={saveResume}
            className="px-4 py-2 bg-black text-white rounded-lg"
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
            <Download size={16} /> Download PDF
          </button>
        </div>
      </header>

      {savedMessage && (
        <div className="bg-green-100 text-green-700 text-center py-2 text-sm">
          {savedMessage}
        </div>
      )}

      <div className="lg:hidden flex flex-col items-center py-3 bg-white border-b gap-3">
        <div className="relative flex bg-gray-200 rounded-full p-1 w-56">
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 bg-black rounded-full"
            style={{ left: mobileView === "form" ? "4px" : "50%" }}
          />
          <button
            onClick={() => setMobileView("form")}
            className={`relative z-10 w-1/2 py-1 text-sm ${
              mobileView === "form" ? "text-white" : "text-gray-700"
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setMobileView("preview")}
            className={`relative z-10 w-1/2 py-1 text-sm ${
              mobileView === "preview" ? "text-white" : "text-gray-700"
            }`}
          >
            Preview
          </button>
        </div>
        {templateSupportsColor && <ColorPicker />}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {(mobileView === "form" || window.innerWidth >= 1024) && (
            <motion.div
              key="form"
              className="lg:w-1/2 w-full overflow-y-auto bg-white p-6"
            >
              <motion.div key={formKey}>
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(mobileView === "preview" || window.innerWidth >= 1024) && (
            <motion.div
              key="preview"
              className="lg:w-1/2 w-full flex flex-col items-center overflow-y-auto bg-gray-200 p-6"
            >
              <div className="flex items-center gap-4 mb-4 bg-white px-4 py-2 rounded-xl shadow">
                <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>
                  <ZoomOut size={18} />
                </button>
                <span className="text-sm font-medium">
                  {Math.round(zoom * 100)}%
                </span>
                <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}>
                  <ZoomIn size={18} />
                </button>
              </div>

              <div
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                }}
                className="bg-white shadow-2xl"
              >
                {renderTemplate()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "210mm",
          background: "white",
        }}
      >
        <div
          ref={pdfRef}
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {renderTemplate()}
        </div>
      </div>

      {mobileView === "preview" && (
        <div className="lg:hidden fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={saveResume}
            className="p-3 bg-black text-white rounded-full shadow-lg"
          >
            <Save size={20} />
          </button>
          <button
            onClick={resetResume}
            className="p-3 bg-red-500 text-white rounded-full shadow-lg"
          >
            <RefreshCcw size={20} />
          </button>
          <button
            onClick={downloadPDF}
            className="p-3 bg-blue-700 text-white rounded-full shadow-lg"
          >
            <Download size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;