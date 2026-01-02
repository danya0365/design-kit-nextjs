"use client";

import { ProfileViewModel } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useProfilePresenter } from "@/src/presentation/presenters/profile/useProfilePresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

interface ProfileViewProps {
  initialViewModel?: ProfileViewModel;
}

export function ProfileView({ initialViewModel }: ProfileViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading } = useProfilePresenter(initialViewModel);

  if (loading && !viewModel) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" /></div>;
  }

  if (!viewModel) return null;

  const { user, stats } = viewModel;

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">👤 My Profile</h1>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "12px" }}>
          <div className="retro-card" style={{ textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.avatar_url} alt={user.full_name} style={{ width: "80px", height: "80px", borderRadius: "50%", margin: "0 auto 8px" }} />
            <div style={{ fontWeight: "bold" }}>{user.full_name}</div>
            <div style={{ fontSize: "10px", color: "gray" }}>@{user.username}</div>
            <div style={{ fontSize: "10px", marginTop: "4px" }}>{user.role.toUpperCase()}</div>
          </div>
          <div>
            <div className="retro-groupbox" style={{ marginBottom: "8px" }}>
              <span className="retro-groupbox-title">📊 Stats</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", padding: "8px" }}>
                <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{stats.purchases}</div><div style={{ fontSize: "10px" }}>Purchases</div></div>
                <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{stats.favorites}</div><div style={{ fontSize: "10px" }}>Favorites</div></div>
                <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{stats.downloads}</div><div style={{ fontSize: "10px" }}>Downloads</div></div>
              </div>
            </div>
            <div className="retro-groupbox">
              <span className="retro-groupbox-title">🔗 Quick Links</span>
              <div style={{ padding: "8px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                <Link href="/favorites"><button className="retro-btn">❤️ Favorites</button></Link>
                <Link href="/downloads"><button className="retro-btn">📥 Downloads</button></Link>
                <Link href="/settings"><button className="retro-btn">⚙️ Settings</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="main-card flex flex-col md:flex-row items-center gap-8 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.avatar_url} alt={user.full_name} className="w-24 h-24 rounded-full" />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.full_name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full text-sm">{user.role}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="main-card text-center"><div className="text-3xl font-bold text-indigo-600">{stats.purchases}</div><div className="text-gray-500">Purchases</div></div>
        <div className="main-card text-center"><div className="text-3xl font-bold text-pink-600">{stats.favorites}</div><div className="text-gray-500">Favorites</div></div>
        <div className="main-card text-center"><div className="text-3xl font-bold text-green-600">{stats.downloads}</div><div className="text-gray-500">Downloads</div></div>
      </div>
      <div className="main-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/favorites" className="main-btn main-btn-secondary text-center">❤️ Favorites</Link>
          <Link href="/downloads" className="main-btn main-btn-secondary text-center">📥 Downloads</Link>
          <Link href="/cart" className="main-btn main-btn-secondary text-center">🛒 Cart</Link>
          <Link href="/settings" className="main-btn main-btn-secondary text-center">⚙️ Settings</Link>
        </div>
      </div>
    </div>
  );
}
