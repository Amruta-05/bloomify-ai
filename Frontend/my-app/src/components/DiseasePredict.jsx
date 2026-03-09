import React, { useState } from "react";

export default function DiseasePredict({ selectedImage, onShowModal }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      
      // Show modal with result data
      if (onShowModal) {
        onShowModal(data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button className="upload-btn" onClick={handlePredict}>
        Diagnose Plant
      </button>

      {loading && <p style={{ color: "var(--text-secondary)" }}>Analyzing image...</p>}
    </div>
  );
}
