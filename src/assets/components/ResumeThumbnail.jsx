import {
  Briefcase,
  User,
  FileText,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ResumeThumbnail = ({ resume }) => {
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setIsProUser(snap.data().pro === true);
      }
    };

    checkUser();
  }, []);

  const templateType = resume.templateId || "elegant";

  const templateStyles = {
    elegant: "border-gray-200",
    creative: "border-blue-400",
    "corporate-pro": "border-gray-600",
  };

  return (
    <div
      className={`relative w-full h-56 rounded-xl p-4 text-[9px] flex flex-col justify-between transition-all duration-300
      ${
        isProUser
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-yellow-100 shadow-[0_0_25px_rgba(234,179,8,0.4)] border border-yellow-500/30"
          : "bg-white shadow-sm border"
      }
      ${templateStyles[templateType] || "border-gray-200"}
      hover:scale-105`}
    >
      {/* PRO BADGE */}
      {isProUser && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-yellow-400 text-[8px]">
          <Crown size={10} />
          PRO
        </div>
      )}

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 font-bold text-[11px]">
          <User size={10} />
          {resume.personalInfo?.fullName || "Unnamed Resume"}
        </div>

        <div className="mt-1 text-[9px] opacity-70">
          {resume.personalInfo?.jobTitle || "No Job Title"}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mt-2 border-t pt-2 border-gray-300/40 overflow-hidden">
        <div className="flex items-center gap-1 font-semibold text-[9px] mb-1">
          <FileText size={9} />
          Summary
        </div>

        <p className="line-clamp-3 text-[8px] opacity-80">
          {resume.professionalSummary || "No summary available"}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mt-2 border-t pt-2 border-gray-300/40 overflow-hidden">
        <div className="flex items-center gap-1 font-semibold text-[9px] mb-1">
          <Briefcase size={9} />
          Experience
        </div>

        {resume.experience && resume.experience.length > 0 ? (
          <ul className="list-disc ml-4 line-clamp-3 text-[8px] opacity-90">
            {resume.experience.slice(0, 3).map((exp, index) => (
              <li key={index}>
                {exp.position || "Position"}
                {exp.company ? ` - ${exp.company}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[8px] opacity-70">No experience listed</p>
        )}
      </div>

      {/* TEMPLATE LABEL */}
      <div className="absolute bottom-2 right-3 text-[7px] opacity-50 uppercase tracking-wide">
        {templateType}
      </div>
    </div>
  );
};

export default ResumeThumbnail;