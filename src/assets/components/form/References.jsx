import { Plus, Trash2 } from "lucide-react";

const References = ({ data = [], setResumeData }) => {

  const handleChange = (index, e) => {
    const updated = [...data];
    updated[index][e.target.name] = e.target.value;

    setResumeData(prev => ({
      ...prev,
      references: updated,
    }));
  };

  const addReference = () => {
    setResumeData(prev => ({
      ...prev,
      references: [
        ...prev.references,
        { name: "", position: "", company: "", contact: "" }
      ],
    }));
  };

  const removeReference = (index) => {
    const updated = data.filter((_, i) => i !== index);

    setResumeData(prev => ({
      ...prev,
      references: updated,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">References</h2>

      {data.map((ref, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={ref.name}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={ref.position}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={ref.company}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={ref.contact}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={() => removeReference(index)}
            className="text-red-500 flex items-center gap-1 text-sm"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      ))}

      <button
        onClick={addReference}
        className="flex items-center gap-2 text-sm text-blue-600"
      >
        <Plus size={16} /> Add Reference
      </button>
    </div>
  );
};

export default References;