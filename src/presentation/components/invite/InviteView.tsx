"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import { useState } from "react";

export function InviteView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [email, setEmail] = useState("");
  const handleInvite = (e: React.FormEvent) => { e.preventDefault(); addToast(`Invitation sent to ${email}!`, "success"); setEmail(""); };
  const referralLink = "https://designkit.com/invite/abc123";
  const handleCopy = () => { navigator.clipboard.writeText(referralLink); addToast("Link copied!", "success"); };

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🎁 Invite Friends</h1>
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📧 Send Invite</span>
          <form onSubmit={handleInvite} style={{ padding: "8px", display: "flex", gap: "4px" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="friend@email.com" className="retro-input" style={{ flex: 1 }} required />
            <button type="submit" className="retro-btn retro-btn-primary">Send</button>
          </form>
        </div>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">🔗 Share Link</span>
          <div style={{ padding: "8px", display: "flex", gap: "4px" }}>
            <input type="text" value={referralLink} readOnly className="retro-input" style={{ flex: 1, fontSize: "10px" }} />
            <button onClick={handleCopy} className="retro-btn">Copy</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎁 Invite Friends</h1><p className="text-gray-600">Share Design Kit and earn rewards!</p></div>
      <div className="main-card mb-6">
        <h3 className="font-semibold mb-4">Send Invitation</h3>
        <form onSubmit={handleInvite} className="flex gap-2">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="friend@email.com" className="main-input flex-1" required />
          <button type="submit" className="main-btn main-btn-primary">Send</button>
        </form>
      </div>
      <div className="main-card">
        <h3 className="font-semibold mb-4">Share Your Link</h3>
        <div className="flex gap-2">
          <input type="text" value={referralLink} readOnly className="main-input flex-1" />
          <button onClick={handleCopy} className="main-btn main-btn-secondary">Copy</button>
        </div>
      </div>
    </div>
  );
}
