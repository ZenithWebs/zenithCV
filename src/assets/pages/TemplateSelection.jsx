import {
  FileText,
  LayoutTemplate,
  User,
  LogOut,
  Menu,
  ArrowLeft,
  Crown,
  Filter,
  Sparkles,
  Lock,
  CheckCircle,
} from "lucide-react";
import { templates } from "../data/templatesdata";
import TemplateCard from "../components/TemplateCard";
import { useNavigate } from "react-router-dom";
import logo from "../logos/logo.png";
import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [isProUser, setIsProUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsProUser(userSnap.data().pro === true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSelect = (template) => {
    if (template.premium && !isProUser) {
      navigate("/upgrade");
      return;
    }
    navigate(`/resumebuilder?template=${template.id}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const filteredTemplates = templates.filter((template) => {
    if (filter === "free") return !template.premium;
    if (filter === "premium") return template.premium;
    return true;
  });

  return (
    <div
      className={`min-h-screen flex relative transition-all duration-500 ${
        isProUser
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-yellow-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Golden Glow Background */}
      {isProUser && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[140px] opacity-20 top-0 left-0 animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-amber-400 rounded-full blur-[120px] opacity-20 bottom-0 right-0 animate-pulse"></div>
        </div>
      )}

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-full w-64
        backdrop-blur-xl border-r transition-all duration-300
        ${
          isProUser
            ? "bg-yellow-500/5 border-yellow-400/20 shadow-[0_0_40px_rgba(234,179,8,0.2)]"
            : "bg-white border-gray-200"
        }
        transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="h-full flex flex-col">

          <div className="px-6 py-6 border-b border-yellow-400/10 flex items-center gap-3">
            <img src={logo} className="w-9" alt="logo" />
            <span className="font-bold text-lg tracking-wide">
              ZenithCV
            </span>
          </div>

          <nav className="flex-1 px-6 py-8 space-y-6 text-sm">

            <button onClick={() => navigate(-1)} className="flex items-center gap-3 hover:text-yellow-400 transition">
              <ArrowLeft size={16} /> Back
            </button>

            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3 hover:text-yellow-400 transition">
              <FileText size={16} /> Dashboard
            </button>

            <button onClick={() => navigate("/templates")} className="flex items-center gap-3 text-yellow-400 font-medium">
              <LayoutTemplate size={16} /> Templates
            </button>

            <button onClick={() => navigate("/profile")} className="flex items-center gap-3 hover:text-yellow-400 transition">
              <User size={16} /> Profile
            </button>

            <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-500 transition">
              <LogOut size={16} /> Logout
            </button>

          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 w-full px-4 sm:px-8 py-12">
        <div className="md:hidden flex justify-between items-center mb-8">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
          <h2 className="font-semibold text-lg">Templates</h2>
        </div>

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-6">

            <div>
              <h1
                className={`text-4xl font-bold ${
                  isProUser
                    ? "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                    : ""
                }`}
              >
                Choose a Template
              </h1>

              <p className={`${isProUser ? "text-yellow-200/70" : "text-gray-500"} mt-3`}>
                Filter and select your preferred design.
              </p>
            </div>

            {!isProUser ? (
              <button
                onClick={() => navigate("/upgrade")}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold px-6 py-3 rounded-full shadow-lg"
              >
                <Crown size={18} />
                Upgrade to Pro
              </button>
            ) : (
              <span className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold shadow-[0_0_20px_rgba(234,179,8,0.7)]">
                <Sparkles size={16} />
                PRO ELITE
              </span>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <Filter size={18} />
            {["all", "free", "premium"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === type
                    ? isProUser
                      ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                      : "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {type === "free" && <CheckCircle size={14} className="inline mr-1" />}
                {type === "premium" && <Lock size={14} className="inline mr-1" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <TiltCard
                key={template.id}
                isProUser={isProUser}
              >
                <TemplateCard
                  template={template}
                  image={template.image}
                  onSelect={() => handleSelect(template)}
                  isProUser={isProUser}
                />
              </TiltCard>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

/* 3D Tilt Wrapper */
const TiltCard = ({ children, isProUser }) => {
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    if (!isProUser) return;

    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;

    const rotateY = ((offsetX / width) * 30 - 15).toFixed(2);
    const rotateX = ((offsetY / height) * -30 + 15).toFixed(2);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`,
    });
  };

  const reset = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={`transition-all duration-300 ${
        isProUser
          ? "hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]"
          : "hover:scale-105"
      }`}
    >
      {children}
    </div>
  );
};

export default TemplateSelection;