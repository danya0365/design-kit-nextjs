"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const services = [
  { name: "Website", status: "operational", uptime: "99.9%" },
  { name: "API", status: "operational", uptime: "99.8%" },
  { name: "CDN", status: "operational", uptime: "100%" },
  { name: "Database", status: "operational", uptime: "99.9%" },
];

export function StatusView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🟢 System Status</h1>
        <div className="retro-card" style={{ textAlign: "center", marginBottom: "12px", background: "#90EE90" }}>
          <div style={{ fontWeight: "bold" }}>All Systems Operational</div>
        </div>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📊 Services</span>
          <div style={{ padding: "8px" }}>
            {services.map((s) => (
              <div key={s.name} className="retro-card" style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px" }}>🟢 {s.name}</span>
                <span style={{ fontSize: "10px", color: "gray" }}>{s.uptime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🟢 System Status</h1>
      <div className="main-card bg-green-50 dark:bg-green-900/20 border-green-500 text-center mb-8">
        <span className="text-2xl">✅</span>
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">All Systems Operational</h2>
      </div>
      <div className="main-card">
        <h3 className="font-semibold mb-4">Services</h3>
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full" />{s.name}</span>
              <span className="text-sm text-gray-500">{s.uptime} uptime</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
