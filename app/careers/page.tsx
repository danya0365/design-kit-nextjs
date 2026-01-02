// Careers Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

const jobs = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Build and maintain our React/Next.js component marketplace.',
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design beautiful UI components and improve user experience.',
  },
  {
    id: 'job-3',
    title: 'Developer Advocate',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create tutorials, documentation, and engage with our community.',
  },
  {
    id: 'job-4',
    title: 'Customer Success Manager',
    department: 'Support',
    location: 'Remote (APAC)',
    type: 'Full-time',
    description: 'Help our creators and customers succeed with Design Kit.',
  },
];

const benefits = [
  { icon: '🌍', title: 'Remote First', description: 'Work from anywhere in the world' },
  { icon: '💰', title: 'Competitive Pay', description: 'Top-tier salaries + equity' },
  { icon: '🏖️', title: 'Unlimited PTO', description: 'Take time off when you need it' },
  { icon: '📚', title: 'Learning Budget', description: '$2,000/year for courses & books' },
  { icon: '🏥', title: 'Health Insurance', description: 'Full medical, dental, vision' },
  { icon: '🖥️', title: 'Equipment', description: 'MacBook + monitor + accessories' },
];

export default function CareersPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">💼 Careers at Design Kit</h1>

        <div className="retro-card" style={{ marginBottom: '12px' }}>
          <p>Join our team and help build the future of UI components! We&apos;re a remote-first company looking for passionate people.</p>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">🎁 Benefits</span>
          <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {benefits.map((benefit) => (
              <div key={benefit.title} style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '20px' }}>{benefit.icon}</div>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{benefit.title}</div>
                <div style={{ fontSize: '10px', color: 'gray' }}>{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📋 Open Positions</span>
          <div style={{ padding: '8px' }}>
            {jobs.map((job) => (
              <div key={job.id} className="retro-card" style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '13px' }}>{job.title}</strong>
                    <div style={{ fontSize: '11px', color: 'gray' }}>
                      {job.department} • {job.location} • {job.type}
                    </div>
                  </div>
                  <button className="retro-btn retro-btn-primary" style={{ fontSize: '10px' }}>
                    Apply
                  </button>
                </div>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          💼 Careers at Design Kit
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join our remote-first team and help build the future of UI components
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎁 Why Work With Us
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="main-card text-center">
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          📋 Open Positions
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="main-card hover:border-indigo-500 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {job.department}
                    </span>
                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {job.location}
                    </span>
                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {job.description}
                  </p>
                </div>
                <button className="main-btn main-btn-primary whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Don&apos;t see your role?</h3>
        <p className="opacity-90 mb-4">
          We&apos;re always looking for talented people. Send us your resume!
        </p>
        <Link href="/contact" className="main-btn bg-white text-indigo-600 hover:bg-gray-100">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
