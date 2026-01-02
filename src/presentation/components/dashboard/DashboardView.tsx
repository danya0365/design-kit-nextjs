"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const mockStats = { totalEarnings: 1250, totalSales: 45, totalViews: 3200, activeComponents: 8 };

export function DashboardView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📊 Creator Dashboard</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" }}>
          <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>${mockStats.totalEarnings}</div><div style={{ fontSize: "10px" }}>Earnings</div></div>
          <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{mockStats.totalSales}</div><div style={{ fontSize: "10px" }}>Sales</div></div>
          <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{mockStats.totalViews}</div><div style={{ fontSize: "10px" }}>Views</div></div>
          <div className="retro-card" style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "bold" }}>{mockStats.activeComponents}</div><div style={{ fontSize: "10px" }}>Components</div></div>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <Link href="/dashboard/upload"><button className="retro-btn retro-btn-primary">📤 Upload New</button></Link>
          <Link href="/dashboard/analytics"><button className="retro-btn">📈 Analytics</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 Creator Dashboard</h1>
        <Link href="/dashboard/upload" className="main-btn main-btn-primary">📤 Upload Component</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="main-card text-center"><div className="text-3xl font-bold text-green-600">${mockStats.totalEarnings}</div><div className="text-gray-500">Earnings</div></div>
        <div className="main-card text-center"><div className="text-3xl font-bold text-indigo-600">{mockStats.totalSales}</div><div className="text-gray-500">Sales</div></div>
        <div className="main-card text-center"><div className="text-3xl font-bold text-blue-600">{mockStats.totalViews}</div><div className="text-gray-500">Views</div></div>
        <div className="main-card text-center"><div className="text-3xl font-bold text-purple-600">{mockStats.activeComponents}</div><div className="text-gray-500">Components</div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/analytics" className="main-card hover:border-indigo-500"><h3 className="text-lg font-semibold mb-2">📈 Analytics</h3><p className="text-gray-500">View detailed statistics</p></Link>
        <Link href="/dashboard/upload" className="main-card hover:border-indigo-500"><h3 className="text-lg font-semibold mb-2">📤 Upload</h3><p className="text-gray-500">Add new components</p></Link>
      </div>
    </div>
  );
}
