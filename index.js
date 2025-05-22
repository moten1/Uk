import React, { useState } from "react";

export default function AuraDx() {
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/medgemma-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, notes }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AuraDx Wellness Scan</h1>
      <div className="space-y-4">
        <label className="block">Upload Face or Skin Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded" />}

        <label className="block">Describe Your Current State</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., tired, low energy, anxious..."
          className="w-full border rounded p-2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Get Insights"}
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Wellness Insights</h2>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Recommendations:</strong> {result.recommendations}</p>
          </div>
        )}
      </div>
    </div>
  );
}