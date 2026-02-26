import { Plus, Trash2 } from "lucide-react";

const Languages = ({ data = [], setResumeData }) => {

  const handleChange = (index, e) => {
    const updated = [...data];
    updated[index][e.target.name] = e.target.value;

    setResumeData(prev => ({
      ...prev,
      languages: updated,
    }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        { name: "", level: "" }
      ],
    }));
  };

  const removeLanguage = (index) => {
    const updated = data.filter((_, i) => i !== index);

    setResumeData(prev => ({
      ...prev,
      languages: updated,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Languages</h2>

      {data.map((lang, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Language"
            value={lang.name}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          />

          <select
            name="level"
            value={lang.level}
            onChange={(e) => handleChange(index, e)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Proficiency</option>
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Fluent</option>
            <option>Native</option>
          </select>

          <button
            onClick={() => removeLanguage(index)}
            className="text-red-500 flex items-center gap-1 text-sm"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="flex items-center gap-2 text-sm text-blue-600"
      >
        <Plus size={16} /> Add Language
      </button>
    </div>
  );
};

export default Languages;