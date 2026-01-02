// About Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

export default function AboutPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Sam Wilson', role: 'Lead Designer', avatar: 'https://i.pravatar.cc/150?u=sam' },
    { name: 'Maya Patel', role: 'Head of Engineering', avatar: 'https://i.pravatar.cc/150?u=maya' },
    { name: 'Jordan Lee', role: 'Community Manager', avatar: 'https://i.pravatar.cc/150?u=jordan' },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">ℹ️ About Design Kit</h1>
        
        <div className="retro-card" style={{ marginBottom: '12px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Our Mission</h2>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>
            Design Kit is a marketplace for beautiful, production-ready UI components.
            We believe in &quot;Design once, export anywhere&quot; - making it easy for developers
            to build stunning interfaces without starting from scratch.
          </p>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">🎯 What We Offer</span>
          <ul style={{ padding: '8px 24px', fontSize: '12px' }}>
            <li>Production-ready UI components</li>
            <li>Export to HTML, React, or Next.js</li>
            <li>Multiple style systems (CSS, Tailwind)</li>
            <li>Fair revenue sharing for creators</li>
            <li>Active community support</li>
          </ul>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">👥 Our Team</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '8px' }}>
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: '48px', height: '48px', borderRadius: '4px', border: '2px outset #c0c0c0' }}
                />
                <div style={{ fontWeight: 'bold', fontSize: '11px', marginTop: '4px' }}>{member.name}</div>
                <div style={{ fontSize: '10px', color: 'gray' }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="retro-card" style={{ marginTop: '12px', textAlign: 'center' }}>
          <p style={{ marginBottom: '8px' }}>Want to learn more?</p>
          <Link href="/docs">
            <button className="retro-btn retro-btn-primary">View Documentation</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Design Kit
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We&apos;re building the marketplace for beautiful, production-ready UI components
        </p>
      </div>

      {/* Mission */}
      <div className="main-card mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Design Kit is a marketplace for beautiful, production-ready UI components.
          We believe in &quot;Design once, export anywhere&quot; - making it easy for developers
          to build stunning interfaces without starting from scratch. Our platform connects
          talented designers with developers who value quality and efficiency.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="main-card">
          <div className="text-3xl mb-3">📦</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Production-Ready Components
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every component is built with best practices, accessibility, and performance in mind.
          </p>
        </div>
        <div className="main-card">
          <div className="text-3xl mb-3">🔄</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Multi-Platform Export
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Export to HTML, React, or Next.js with your preferred styling system.
          </p>
        </div>
        <div className="main-card">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Fair Revenue Sharing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Creators earn 80% of each sale, keeping more of their hard-earned money.
          </p>
        </div>
        <div className="main-card">
          <div className="text-3xl mb-3">🌐</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Global Community
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of designers and developers from around the world.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Our Team
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {team.map((member) => (
          <div key={member.name} className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.avatar}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 opacity-90">Join thousands of developers and designers already using Design Kit</p>
        <div className="flex gap-4 justify-center">
          <Link href="/components" className="main-btn bg-white text-indigo-600 hover:bg-gray-100">
            Browse Components
          </Link>
          <Link href="/pricing" className="main-btn bg-indigo-700 text-white hover:bg-indigo-800">
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
