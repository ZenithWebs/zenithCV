import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { SidebarClose, XCircle } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg relative">
      <XCircle size={26} onClick={() => navigate(-1) || navigate('/dashboard')} className="absolute left-5 top-5 cursor-pointer"/>
        <div className="flex flex-col items-center">
          <img
            src={
              user.photoURL ||
              "https://ui-avatars.com/api/?name=" + user.email
            }
            alt="profile"
            className="w-24 h-24 rounded-full mb-4"
          />

          <h2 className="text-xl font-semibold">
            {user.displayName || "User"}
          </h2>

          <p className="text-gray-500 text-sm">{user.email}</p>

          {userData?.pro ? (
            <span className="mt-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
              PRO Member
            </span>
          ) : (
            <span className="mt-3 bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              Free Plan
            </span>
          )}
        </div>

        <div className="mt-8 border-t pt-6 text-sm">

          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Subscription Status</span>
            <span className={userData?.pro ? "text-green-600" : "text-gray-600"}>
              {userData?.pro ? "Active" : "Inactive"}
            </span>
          </div>

          {userData?.subscriptionEnds && (
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Expires</span>
              <span>
                {new Date(
                  userData.subscriptionEnds.seconds * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          )}

        </div>

        <button
          onClick={async () => {
            await signOut(auth);
            navigate("/login");
          }}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;