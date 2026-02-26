import {
  Plus,
  Pencil,
  LogOut,
  LayoutTemplate,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import ResumeThumbnail from "../components/ResumeThumbnail";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", currentUser.uid));
      if (userSnap.exists()) {

        if (userSnap.exists()) {
        setIsProUser(userSnap.data().pro === true);
      }
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
      className={`min-h-screen flex transition-all duration-500 ${
        isProUser
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gray-50"
      }`}
    >
      <aside
        className={`w-64 border-r ${
          isProUser ? "bg-black/40 border-gray-700" : "bg-white"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-6 border-b flex items-center gap-2">
            <img src={logo} className="w-9" alt="logo" />
            <span className="font-bold text-lg">ZenithCV</span>
          </div>

          <nav className="flex-1 px-6 py-6 space-y-6 text-sm">
            <button
              onClick={() => navigate("/templates")}
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <LayoutTemplate size={16} /> Templates
            </button>

            <button
              onClick={() => navigate("/profile")}
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


      <main className="flex-1 px-8 py-10">

        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-5">
            <h1 className="text-3xl font-bold">
              Welcome back 👋
            </h1>

            {isProUser  && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 blur-xl rounded-full bg-yellow-400"
                />

                <div className="relative flex items-center gap-2 px-5 py-2 rounded-full 
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 
                  text-black font-bold text-sm shadow-2xl border border-yellow-300">
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Crown size={16} />
                  </motion.div>
                  PRO MEMBER
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/templates")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              isProUser
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                : "bg-black text-white"
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            Create Resume
          </motion.button>
        </div>

        {!isProUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-10 shadow-lg flex justify-between items-center"
          >
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
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Upgrade
            </button>
          </motion.div>
        )}

   
        <h2 className="text-xl font-semibold mb-6">
          Your Saved Resumes
        </h2>

        {resumes.length === 0 ? (
          <div className={` rounded-2xl ${isProUser ? 'bg-gray-900' : 'bg-white'} border border-dashed border-gray-300 p-12 text-center`}>
            <h3 className={`${isProUser ? 'text-gray-500' : 'text-white'}text-lg font-semibold mb-2`}>
              No resumes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first resume to get started.
            </p>
            <Link
              to="/templates"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                whileHover={{ y: -6 }}
                className={`rounded-2xl overflow-hidden transition ${
                  isProUser
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400 shadow-[0_0_25px_rgba(255,215,0,0.3)]"
                    : "bg-white shadow-md hover:shadow-xl"
                }`}
              >
                <div className={`p-4 bg-gray-50`}>
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
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;