// Privacy Policy Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

export default function PrivacyPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly: name, email, payment information, and profile data. We also collect usage data including IP address, browser type, and pages visited.',
    },
    {
      title: '2. How We Use Information',
      content: 'We use your information to: process purchases, send transaction emails, improve our services, provide customer support, and send marketing communications (with your consent).',
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell your personal information. We may share data with: payment processors (Stripe), email providers, and analytics services. We may also share data when required by law.',
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.',
    },
    {
      title: '5. Cookies',
      content: 'We use cookies to: remember your preferences, analyze site traffic, and personalize content. You can disable cookies in your browser settings.',
    },
    {
      title: '6. Your Rights',
      content: 'You have the right to: access your data, correct inaccuracies, delete your account, export your data, and opt-out of marketing communications.',
    },
    {
      title: '7. Children\'s Privacy',
      content: 'Our services are not intended for users under 13 years of age. We do not knowingly collect data from children.',
    },
    {
      title: '8. International Transfers',
      content: 'Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.',
    },
    {
      title: '9. Changes to This Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of significant changes via email or a prominent notice on our website.',
    },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔒 Privacy Policy</h1>
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
        🔒 Privacy Policy
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
          Questions about privacy?{' '}
          <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
