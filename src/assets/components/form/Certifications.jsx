import { Plus, Trash2 } from "lucide-react";

const Certifications = ({ data = [], setResumeData }) => {

  const handleChange = (index, e) => {
    const updated = [...data];
    updated[index][e.target.name] = e.target.value;

    setResumeData(prev => ({
      ...prev,
      certifications: updated,
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", organization: "", year: "" }
      ],
    }));
  };

  const removeCertification = (index) => {
    const updated = data.filter((_, i) => i !== index);

    setResumeData(prev => ({
      ...prev,
      certifications: updated,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Certifications</h2>

      {data.map((cert, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="organization"
            placeholder="Issuing Organization"
            value={cert.organization}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={cert.year}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={() => removeCertification(index)}
            className="text-red-500 flex items-center gap-1 text-sm"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="flex items-center gap-2 text-sm text-blue-600"
      >
        <Plus size={16} /> Add Certification
      </button>
    </div>
  );
};

export default Certifications;