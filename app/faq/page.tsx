// FAQ Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useState } from 'react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Design Kit?',
        a: 'Design Kit is a marketplace for beautiful, production-ready UI components. You can browse, purchase, and export components to HTML, React, or Next.js with various styling options.',
      },
      {
        q: 'How do I use the components?',
        a: 'After purchasing a component, go to the component detail page and use the export options to copy the code. You can choose your preferred platform (HTML, React, Next.js) and styling system (CSS, Tailwind, CSS Modules).',
      },
      {
        q: 'Can I use components in commercial projects?',
        a: 'Yes! All components come with a commercial license. You can use them in unlimited personal and commercial projects.',
      },
    ],
  },
  {
    category: 'Pricing & Payments',
    questions: [
      {
        q: 'Are there free components?',
        a: 'Yes! We have a selection of free components that you can use without any payment. Look for the "Free" label on component cards.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal through our secure payment processor.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Due to the digital nature of our products, we generally do not offer refunds. However, if you experience technical issues, please contact our support team.',
      },
    ],
  },
  {
    category: 'For Creators',
    questions: [
      {
        q: 'How do I become a creator?',
        a: 'Sign up for an account and apply for creator status from your profile. We review applications within 2-3 business days.',
      },
      {
        q: 'What is the revenue share?',
        a: 'Creators earn 80% of each sale. We handle payment processing, hosting, and customer support.',
      },
      {
        q: 'How do I get paid?',
        a: 'Payments are processed monthly via PayPal or bank transfer. Minimum payout threshold is $50.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What frameworks are supported?',
        a: 'We support HTML, React, and Next.js. Components can be exported with CSS, Tailwind CSS, or CSS Modules styling.',
      },
      {
        q: 'Are components accessible?',
        a: 'Yes, we prioritize accessibility. All components follow WCAG guidelines and include proper ARIA attributes.',
      },
      {
        q: 'Do components work with TypeScript?',
        a: 'Absolutely! All React and Next.js components include full TypeScript types.',
      },
    ],
  },
];

export default function FAQPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">❓ Frequently Asked Questions</h1>

        {faqs.map((category) => (
          <div key={category.category} className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">{category.category}</span>
            <div style={{ padding: '8px' }}>
              {category.questions.map((faq, idx) => {
                const id = `${category.category}-${idx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} style={{ marginBottom: '8px' }}>
                    <button
                      onClick={() => toggleQuestion(id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px',
                        background: isOpen ? '#000080' : '#c0c0c0',
                        color: isOpen ? 'white' : 'black',
                        border: '2px outset #c0c0c0',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                    >
                      {isOpen ? '▼' : '▶'} {faq.q}
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '8px',
                        background: 'white',
                        border: '2px inset #808080',
                        fontSize: '12px',
                      }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Find answers to common questions
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {category.category}
            </h2>
            <div className="space-y-2">
              {category.questions.map((faq, idx) => {
                const id = `${category.category}-${idx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} className="main-card">
                    <button
                      onClick={() => toggleQuestion(id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.q}
                      </span>
                      <span className="text-gray-400 ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-4 text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
