"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setMessage(null);
  
    const formData = new FormData();
    formData.append("demo", selectedFile);
  
    const token = localStorage.getItem("fragly-token");
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Upload failed");
  
      const data = await res.json();
      setMessage("Upload successful. Match ID: " + data.matchId);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold text-sky-400 mb-6">Upload a CS2 Match</h1>

      <div
        className="border-2 border-dashed border-sky-500 rounded-xl p-10 text-center cursor-pointer hover:bg-neutral-900 transition"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-sky-300 mb-2">Drag & drop your .dem file here</p>
        <p className="text-gray-400">or</p>
        <input
          type="file"
          accept=".dem"
          onChange={handleFileChange}
          className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-400"
        />
      </div>

      {selectedFile && (
        <div className="mt-4 text-sky-300">
          Selected: <span className="font-semibold">{selectedFile.name}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="mt-6 bg-sky-400 hover:bg-sky-300 text-black font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-4 text-sky-300">{message}</p>}
    </div>
  );
}