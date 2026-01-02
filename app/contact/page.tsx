// Contact Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useState } from 'react';

export default function ContactPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📧 Contact Us</h1>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <form onSubmit={handleSubmit}>
              <div className="retro-groupbox">
                <span className="retro-groupbox-title">Send a Message</span>
                <div style={{ padding: '8px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <label className="retro-input-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="retro-input"
                      required
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label className="retro-input-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="retro-input"
                      required
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label className="retro-input-label">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="retro-select"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label className="retro-input-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="retro-input"
                      rows={5}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="retro-btn retro-btn-primary"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Sending...' : '📤 Send Message'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div style={{ flex: '1', minWidth: '250px' }}>
            <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
              <span className="retro-groupbox-title">📍 Contact Info</span>
              <div style={{ padding: '8px', fontSize: '12px' }}>
                <p style={{ marginBottom: '8px' }}>📧 support@designkit.com</p>
                <p style={{ marginBottom: '8px' }}>🐦 @designkit</p>
                <p>💬 Discord: designkit.gg/discord</p>
              </div>
            </div>
            <div className="retro-groupbox">
              <span className="retro-groupbox-title">⏰ Support Hours</span>
              <div style={{ padding: '8px', fontSize: '12px' }}>
                <p>Monday - Friday</p>
                <p>9:00 AM - 6:00 PM (PST)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📧 Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Have questions? We&apos;re here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="main-card">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="main-input-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="main-input"
                    required
                  />
                </div>
                <div>
                  <label className="main-input-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="main-input"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="main-input-label">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="main-select"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label className="main-input-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="main-input"
                  rows={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="main-btn main-btn-primary"
              >
                {isSubmitting ? 'Sending...' : '📤 Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="main-card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              📍 Contact Info
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <span>📧</span> support@designkit.com
              </p>
              <p className="flex items-center gap-2">
                <span>🐦</span> @designkit
              </p>
              <p className="flex items-center gap-2">
                <span>💬</span> Discord: designkit.gg/discord
              </p>
            </div>
          </div>

          <div className="main-card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              ⏰ Support Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday<br />
              9:00 AM - 6:00 PM (PST)
            </p>
          </div>

          <div className="main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <h3 className="font-semibold mb-2">
              🚀 Enterprise Support
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Need priority support for your team?
            </p>
            <button className="main-btn bg-white text-indigo-600 hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
