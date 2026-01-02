// Status Page - System Status
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';

const services = [
  { name: 'API', status: 'operational' as const, uptime: '99.99%' },
  { name: 'Website', status: 'operational' as const, uptime: '99.98%' },
  { name: 'Authentication', status: 'operational' as const, uptime: '99.99%' },
  { name: 'Component CDN', status: 'operational' as const, uptime: '99.95%' },
  { name: 'Payment Processing', status: 'operational' as const, uptime: '99.99%' },
  { name: 'Email Notifications', status: 'degraded' as const, uptime: '98.50%' },
];

const incidents = [
  {
    date: '2025-12-30',
    title: 'Email Delivery Delays',
    status: 'monitoring',
    description: 'Some users may experience delayed email notifications. We are working with our email provider to resolve this.',
  },
  {
    date: '2025-12-15',
    title: 'API Latency Spike',
    status: 'resolved',
    description: 'Resolved - API response times returned to normal after scaling our infrastructure.',
  },
  {
    date: '2025-12-01',
    title: 'Scheduled Maintenance',
    status: 'resolved',
    description: 'Resolved - Planned maintenance completed successfully with no issues.',
  },
];

const statusColors = {
  operational: { bg: 'bg-green-500', text: 'text-green-600 dark:text-green-400', label: 'Operational' },
  degraded: { bg: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400', label: 'Degraded' },
  outage: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400', label: 'Outage' },
};

export default function StatusPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  const allOperational = services.every(s => s.status === 'operational');

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🚦 System Status</h1>

        <div
          className="retro-card"
          style={{
            marginBottom: '12px',
            padding: '12px',
            textAlign: 'center',
            background: allOperational ? '#90EE90' : '#FFD700',
          }}
        >
          <strong style={{ fontSize: '14px' }}>
            {allOperational ? '✅ All Systems Operational' : '⚠️ Some Systems Degraded'}
          </strong>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">Services</span>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#c0c0c0' }}>
                <th style={{ padding: '4px', textAlign: 'left' }}>Service</th>
                <th style={{ padding: '4px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Uptime</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.name}>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{service.name}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: service.status === 'operational' ? 'green' : service.status === 'degraded' ? 'orange' : 'red',
                      marginRight: '4px',
                    }} />
                    {statusColors[service.status].label}
                  </td>
                  <td style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>{service.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">Recent Incidents</span>
          <div style={{ padding: '8px' }}>
            {incidents.map((incident) => (
              <div key={incident.date} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #c0c0c0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <strong>{incident.title}</strong>
                  <span>{incident.date}</span>
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  padding: '2px 4px',
                  background: incident.status === 'resolved' ? '#90EE90' : '#FFD700',
                }}>
                  {incident.status.toUpperCase()}
                </span>
                <p style={{ fontSize: '11px', color: 'gray', marginTop: '4px' }}>{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🚦 System Status
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Real-time status of Design Kit services
        </p>
      </div>

      {/* Overall Status */}
      <div className={`main-card mb-8 text-center ${allOperational ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
        <div className="text-4xl mb-2">{allOperational ? '✅' : '⚠️'}</div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {allOperational ? 'All Systems Operational' : 'Some Systems Degraded'}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Services */}
      <div className="main-card mb-8">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h2>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${statusColors[service.status].bg}`} />
                <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm ${statusColors[service.status].text}`}>
                  {statusColors[service.status].label}
                </span>
                <span className="text-sm text-gray-500">{service.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents */}
      <div className="main-card">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Incidents</h2>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.date} className="border-l-4 pl-4 py-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {incident.title}
                </h3>
                <span className="text-sm text-gray-500">{incident.date}</span>
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                incident.status === 'resolved'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {incident.status.toUpperCase()}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {incident.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
