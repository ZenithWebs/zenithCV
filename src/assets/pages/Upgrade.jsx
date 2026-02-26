import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../logos/logo.png";
import PayButton from "../components/PayButton";

const Upgrade = () => {
  const navigate = useNavigate();

  const features = {
    free: [
      { label: "1 Resume Template", included: true },
      { label: "Basic Resume Builder", included: true },
      { label: "PDF Export (Watermarked)", included: true },
      { label: "Multiple Templates", included: false },
      { label: "Premium Designs", included: false },
      { label: "Unlimited Downloads", included: false },
      { label: "Priority Support", included: false },
    ],
    pro: [
      { label: "All Resume Templates", included: true },
      { label: "Premium Modern Designs", included: true },
      { label: "PDF Export (No Watermark)", included: true },
      { label: "Unlimited Downloads", included: true },
      { label: "Unlimited Edits", included: true },
      { label: "Priority Support", included: true },
      { label: "Future Template Access", included: true },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="font-semibold text-lg">ZenithCV</h1>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Go Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Upgrade to Pro
          </h2>
          <p className="text-gray-500 mt-4">
            Unlock premium resume templates and powerful features to stand out
            and land your dream job faster.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-md p-8 border">
            <h3 className="text-xl font-semibold">Free Plan</h3>
            <p className="text-3xl font-bold mt-4">₦0</p>
            <p className="text-gray-500 mb-6">Forever Free</p>

            <ul className="space-y-4">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  {feature.included ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <X size={18} className="text-red-400" />
                  )}
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full py-3 rounded-lg border hover:bg-gray-100 transition">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-black text-white rounded-2xl shadow-xl p-8 relative scale-105">

            <div className="absolute -top-3 right-6 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>

            <h3 className="text-xl font-semibold">Pro Plan</h3>
            <p className="text-3xl font-bold mt-4">₦ 3000.00</p>
            <p className="text-gray-300 mb-6">One-time payment</p>

            <ul className="space-y-4">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <Check size={18} className="text-green-400" />
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <PayButton />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Upgrade;