// Pricing Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out',
    features: [
      'Access to free components',
      'HTML & CSS export',
      'Community support',
      'Personal use license',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For professional developers',
    features: [
      'All free features',
      'React & Next.js export',
      'Tailwind CSS support',
      'Commercial license',
      'Priority support',
      'Early access to new components',
    ],
    cta: 'Start Pro Trial',
    featured: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'For teams and agencies',
    features: [
      'All Pro features',
      'Unlimited team members',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Custom component requests',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title" style={{ textAlign: 'center' }}>💰 Pricing</h1>
        <p style={{ textAlign: 'center', marginBottom: '16px' }}>Choose a plan that works for you</p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className="retro-card" 
              style={{ 
                width: '220px',
                border: plan.featured ? '3px outset #000080' : undefined,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>{plan.name}</h3>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {plan.price}
                  {plan.period && <span style={{ fontSize: '12px' }}>{plan.period}</span>}
                </div>
                <p style={{ fontSize: '11px', color: 'gray' }}>{plan.description}</p>
              </div>
              <ul style={{ fontSize: '11px', marginBottom: '12px' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ marginBottom: '4px' }}>✓ {feature}</li>
                ))}
              </ul>
              <button className={`retro-btn ${plan.featured ? 'retro-btn-primary' : ''}`} style={{ width: '100%' }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Choose a plan that works for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`main-card ${plan.featured ? 'ring-2 ring-indigo-500 scale-105' : ''}`}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
                {plan.period && (
                  <span className="text-base font-normal text-gray-500">{plan.period}</span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full main-btn ${plan.featured ? 'main-btn-primary' : 'main-btn-secondary'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400">
          Need a custom plan?{' '}
          <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
