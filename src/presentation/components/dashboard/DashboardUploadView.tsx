"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import { useState } from "react";

export function DashboardUploadView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [form, setForm] = useState({ name: "", description: "", category: "", price: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Component uploaded successfully!", "success");
    setForm({ name: "", description: "", category: "", price: "" });
  };

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📤 Upload Component</h1>
        <form onSubmit={handleSubmit} className="retro-groupbox">
          <span className="retro-groupbox-title">📝 Component Details</span>
          <div style={{ padding: "8px" }}>
            <div style={{ marginBottom: "8px" }}><label style={{ fontSize: "11px" }}>Name:</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="retro-input" style={{ width: "100%" }} required /></div>
            <div style={{ marginBottom: "8px" }}><label style={{ fontSize: "11px" }}>Description:</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="retro-input" style={{ width: "100%", height: "60px" }} required /></div>
            <div style={{ marginBottom: "8px" }}><label style={{ fontSize: "11px" }}>Category:</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="retro-input" style={{ width: "100%" }}><option value="">Select...</option><option value="buttons">Buttons</option><option value="cards">Cards</option><option value="modals">Modals</option></select></div>
            <div style={{ marginBottom: "8px" }}><label style={{ fontSize: "11px" }}>Price ($):</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="retro-input" style={{ width: "100%" }} /></div>
            <button type="submit" className="retro-btn retro-btn-primary" style={{ width: "100%" }}>📤 Upload</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📤 Upload Component</h1>
      <form onSubmit={handleSubmit} className="main-card space-y-6">
        <div><label className="block text-sm font-medium mb-2">Name</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="main-input w-full" required /></div>
        <div><label className="block text-sm font-medium mb-2">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="main-input w-full h-32" required /></div>
        <div><label className="block text-sm font-medium mb-2">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="main-select w-full"><option value="">Select category...</option><option value="buttons">Buttons</option><option value="cards">Cards</option><option value="modals">Modals</option></select></div>
        <div><label className="block text-sm font-medium mb-2">Price ($)</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="main-input w-full" placeholder="0 for free" /></div>
        <button type="submit" className="main-btn main-btn-primary w-full">📤 Upload Component</button>
      </form>
    </div>
  );
}
