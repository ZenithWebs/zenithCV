import { Crown, Lock } from "lucide-react";

const TemplateCard = ({ template, onSelect, isProUser }) => {
  const locked = template.premium && !isProUser;

  return (
    <div
      onClick={onSelect}
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
    >

      {template.premium && (
        <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full flex items-center gap-1 z-20">
          <Crown size={12} />
          PRO
        </div>
      )}


      <div className="relative h-60 overflow-hidden">

        <img
          src={template.image}
          alt={template.name}
          className={`w-full h-full object-cover object-top transition duration-300 ${
            locked ? "blur-[1px] scale-105" : "group-hover:scale-105"
          }`}
        />

        {locked && (
          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white">
            <Lock size={24} />
            <p className="text-sm mt-2 font-medium">
              Upgrade to Unlock
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">
          {template.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {template.description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;