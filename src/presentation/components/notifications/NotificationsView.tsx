"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const mockNotifications = [
  { id: "1", type: "purchase", title: "Purchase Complete", message: "Your order #12345 is confirmed", time: "5 min ago", read: false },
  { id: "2", type: "update", title: "New Components Available", message: "10 new components added to Buttons category", time: "1 hour ago", read: false },
  { id: "3", type: "promo", title: "Weekend Sale", message: "Get 25% off all components this weekend", time: "3 hours ago", read: true },
];

export function NotificationsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔔 Notifications</h1>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📬 Recent</span>
          <div style={{ padding: "8px" }}>
            {mockNotifications.map((n) => (
              <div key={n.id} className="retro-card" style={{ marginBottom: "4px", background: n.read ? undefined : "#ffffcc" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>{n.read ? "" : "🔵 "}{n.title}</div>
                <div style={{ fontSize: "10px" }}>{n.message}</div>
                <div style={{ fontSize: "9px", color: "gray" }}>{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🔔 Notifications</h1>
      <div className="space-y-4">
        {mockNotifications.map((n) => (
          <div key={n.id} className={`main-card ${!n.read ? "border-l-4 border-l-indigo-600" : ""}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{n.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{n.message}</p>
              </div>
              {!n.read && <span className="w-3 h-3 bg-indigo-600 rounded-full" />}
            </div>
            <p className="text-sm text-gray-500 mt-2">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
