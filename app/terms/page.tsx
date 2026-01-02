// Terms of Service Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

export default function TermsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Design Kit, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    },
    {
      title: '2. Use License',
      content: 'Upon purchasing a component, you are granted a non-exclusive, perpetual license to use the component in personal and commercial projects. You may not redistribute, resell, or share the source code with others.',
    },
    {
      title: '3. User Accounts',
      content: 'You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account. You may not use another person\'s account without permission.',
    },
    {
      title: '4. Payment Terms',
      content: 'All purchases are final. Prices are in USD and may be subject to applicable taxes. We reserve the right to change pricing at any time.',
    },
    {
      title: '5. Creator Terms',
      content: 'Creators must have the right to sell their components. Creators receive 80% of each sale. We may remove components that violate our guidelines.',
    },
    {
      title: '6. Prohibited Uses',
      content: 'You may not: reverse engineer components, use components in competing marketplaces, claim ownership of components you didn\'t create, or use our platform for illegal activities.',
    },
    {
      title: '7. Intellectual Property',
      content: 'Design Kit and its original content are protected by copyright, trademark, and other intellectual property laws.',
    },
    {
      title: '8. Limitation of Liability',
      content: 'Design Kit is provided "as is" without warranties. We are not liable for any damages arising from your use of our services.',
    },
    {
      title: '9. Changes to Terms',
      content: 'We may update these terms at any time. Continued use of the platform constitutes acceptance of any changes.',
    },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📜 Terms of Service</h1>
        <p style={{ marginBottom: '12px', fontSize: '11px', color: 'gray' }}>
          Last updated: January 1, 2026
        </p>

        {sections.map((section) => (
          <div key={section.title} className="retro-card" style={{ marginBottom: '8px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
              {section.title}
            </h2>
            <p style={{ fontSize: '11px' }}>{section.content}</p>
          </div>
        ))}

        <div style={{ marginTop: '16px', fontSize: '11px' }}>
          Questions? <Link href="/contact" className="retro-link">Contact us</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        📜 Terms of Service
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Last updated: January 1, 2026
      </p>

      <div className="prose dark:prose-invert max-w-none">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          Questions about our terms?{' '}
          <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
