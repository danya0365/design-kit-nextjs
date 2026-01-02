"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const jobs = [
  { title: "Senior Frontend Developer", type: "Full-time", location: "Remote", dept: "Engineering" },
  { title: "UI/UX Designer", type: "Full-time", location: "Remote", dept: "Design" },
  { title: "Community Manager", type: "Part-time", location: "Remote", dept: "Marketing" },
];

export function CareersView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">💼 Careers</h1>
        <p style={{ marginBottom: "12px", fontSize: "11px" }}>Join our growing team!</p>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📋 Open Positions</span>
          <div style={{ padding: "8px" }}>
            {jobs.map((j, i) => (
              <div key={i} className="retro-card" style={{ marginBottom: "4px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>{j.title}</div>
                <div style={{ fontSize: "10px", color: "gray" }}>{j.dept} • {j.type} • {j.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">💼 Careers</h1><p className="text-xl text-gray-600">Join our growing team!</p></div>
      <div className="space-y-4">
        {jobs.map((j, i) => (
          <div key={i} className="main-card hover:border-indigo-500 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{j.title}</h3>
            <p className="text-gray-500">{j.dept} • {j.type} • {j.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
