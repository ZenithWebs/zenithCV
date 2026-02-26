import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const PayButton = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handlePayment = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const idToken = await currentUser.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/subscription/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Payment initiation failed");
        setLoading(false);
        return;
      }

      if (data?.link) window.location.href = data.link;
      else alert("Payment link not generated");
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="mt-8 w-full py-3 rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
    >
      {loading ? "Processing..." : "Upgrade to Pro"}
    </button>
  );
};

export default PayButton;