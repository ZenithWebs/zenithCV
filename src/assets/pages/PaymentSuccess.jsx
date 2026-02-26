import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase/firebase";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const transactionId = searchParams.get("transaction_id");
      if (!transactionId) {
        setMessage("No transaction ID found.");
        setLoading(false);
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        setMessage("Please login to complete payment verification.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const idToken = await user.getIdToken();

        const response = await fetch(
          "http://localhost:5000/api/subscription/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ userId: user.uid, transactionId }),
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setMessage("Payment successful! Your subscription is now active.");
        } else {
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred while verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg text-center">
      {loading ? (
        <p className="text-gray-600">Verifying your payment...</p>
      ) : (
        <>
          <p className="text-lg font-semibold">{message}</p>
          {!message.includes("successful") && (
            <button
              onClick={() => navigate("/upgrade")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
            >
              Try Again
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;