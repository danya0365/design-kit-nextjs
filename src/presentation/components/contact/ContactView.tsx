"use client";

import { ContactViewModel } from "@/src/presentation/presenters/contact/ContactPresenter";
import { useContactPresenter } from "@/src/presentation/presenters/contact/useContactPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import { useState } from "react";

interface ContactViewProps {
  initialViewModel?: ContactViewModel;
}

export function ContactView({ initialViewModel }: ContactViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading } = useContactPresenter(initialViewModel);
  const { addToast } = useToastStore();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!viewModel) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Message sent! We'll get back to you soon.", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📧 Contact Us</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {/* Form */}
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">✉️ Send a Message</span>
            <form onSubmit={handleSubmit} style={{ padding: "8px" }}>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", display: "block", marginBottom: "2px" }}>Name:</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="retro-input" style={{ width: "100%" }} required />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", display: "block", marginBottom: "2px" }}>Email:</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="retro-input" style={{ width: "100%" }} required />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", display: "block", marginBottom: "2px" }}>Message:</label>
                <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="retro-input" style={{ width: "100%", height: "80px" }} required />
              </div>
              <button type="submit" className="retro-btn retro-btn-primary" style={{ width: "100%" }}>Send</button>
            </form>
          </div>

          {/* Info */}
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">📞 Contact Info</span>
            <div style={{ padding: "8px", fontSize: "11px" }}>
              <p style={{ marginBottom: "8px" }}>📧 {viewModel.email}</p>
              <p style={{ marginBottom: "8px" }}>📞 {viewModel.phone}</p>
              <p style={{ marginBottom: "8px" }}>📍 {viewModel.address}</p>
              <div style={{ marginTop: "12px" }}>
                {viewModel.socialLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ marginRight: "8px" }}>
                    {link.icon} {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">📧 Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">We&apos;d love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="main-card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="main-input w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="main-input w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="main-input w-full h-32" required />
            </div>
            <button type="submit" className="main-btn main-btn-primary w-full">Send Message</button>
          </form>
        </div>

        {/* Info */}
        <div className="main-card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Info</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <span className="text-gray-600 dark:text-gray-400">{viewModel.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <span className="text-gray-600 dark:text-gray-400">{viewModel.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span className="text-gray-600 dark:text-gray-400">{viewModel.address}</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {viewModel.socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition-transform">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
