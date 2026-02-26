import {
  Plus,
  Pencil,
  LogOut,
  LayoutTemplate,
  Crown,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import ResumeThumbnail from "../components/ResumeThumbnail";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", currentUser.uid));
      if (userSnap.exists()) {
        setIsProUser(userSnap.data().pro === true);
      }

      const q = query(
        collection(db, "resumes"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const fetchedResumes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResumes(fetchedResumes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = (id, templateId) =>
    navigate(`/resumebuilder?template=${templateId}&resumeId=${id}`);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "resumes", id));
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex ${
        isProUser
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gray-50"
      }`}
    >
      {/* ================= MOBILE TOPBAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8" alt="logo" />
          <span className="font-bold">ZenithCV</span>
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          isProUser ? "bg-black/90 border-gray-700" : "bg-white"
        } border-r`}
      >
        <div className="h-full flex flex-col">
          {/* Close button (mobile) */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="px-6 py-6 border-b flex items-center gap-2">
            <img src={logo} className="w-9" alt="logo" />
            <span className="font-bold text-lg">ZenithCV</span>
          </div>

          <nav className="flex-1 px-6 py-6 space-y-6 text-sm">
            <button
              onClick={() => {
                navigate("/templates");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <LayoutTemplate size={16} /> Templates
            </button>

            <button
              onClick={() => {
                navigate("/profile");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <Pencil size={16} /> Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 px-4 md:px-8 py-24 md:py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back 👋
            </h1>

            {isProUser && (
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
                <Crown size={14} />
                PRO MEMBER
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/templates")}
            className={`px-5 py-3 rounded-xl font-semibold transition w-full md:w-auto ${
              isProUser
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                : "bg-black text-white"
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            Create Resume
          </button>
        </div>

        {/* UPGRADE CARD */}
        {!isProUser && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-10 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Unlock Premium Templates 🚀
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Upgrade to Pro for unlimited exports and exclusive designs.
              </p>
            </div>

            <button
              onClick={() => navigate("/upgrade")}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold w-full md:w-auto"
            >
              Upgrade
            </button>
          </div>
        )}

        {/* RESUMES */}
        <h2 className="text-lg md:text-xl font-semibold mb-6">
          Your Saved Resumes
        </h2>

        {resumes.length === 0 ? (
          <div
            className={`rounded-2xl ${
              isProUser ? "bg-gray-900" : "bg-white"
            } border border-dashed border-gray-300 p-10 text-center`}
          >
            <h3 className="text-lg font-semibold mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first resume to get started.
            </p>
            <Link
              to="/templates"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className={`rounded-2xl overflow-hidden transition ${
                  isProUser
                    ? "bg-gray-900 border border-yellow-400"
                    : "bg-white shadow-md"
                }`}
              >
                <div className="p-4 bg-gray-50">
                  <ResumeThumbnail resume={resume} />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg">
                    {resume.personalInfo?.fullName ||
                      "Untitled Resume"}
                  </h3>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        handleEdit(resume.id, resume.templateId)
                      }
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
