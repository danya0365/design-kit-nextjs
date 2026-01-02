// Invite Friends Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useState } from 'react';

export default function InvitePage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const referralLink = 'https://designkit.com/ref/abc123';
  const referralCode = 'FRIEND25';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    addToast('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Invitation sent to ${email}!`, 'success');
    setEmail('');
  };

  const rewards = [
    { earned: '1 friend', reward: '$5 credit' },
    { earned: '3 friends', reward: '$20 credit + Badge' },
    { earned: '5 friends', reward: '1 Free Component' },
    { earned: '10 friends', reward: 'Pro Plan 1 Month' },
  ];

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">👥 Invite Friends</h1>

        <div className="retro-card" style={{ marginBottom: '12px' }}>
          <p style={{ marginBottom: '8px' }}>
            Share Design Kit with friends and earn rewards! Give them 25% off their first purchase.
          </p>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">🔗 Your Referral Link</span>
          <div style={{ padding: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="retro-input"
                value={referralLink}
                readOnly
                style={{ flex: 1 }}
              />
              <button className="retro-btn retro-btn-primary" onClick={handleCopyLink}>
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div style={{ marginTop: '8px', fontSize: '11px' }}>
              Code: <strong>{referralCode}</strong>
            </div>
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">📧 Email Invite</span>
          <form onSubmit={handleSendInvite} style={{ padding: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                className="retro-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@email.com"
                required
                style={{ flex: 1 }}
              />
              <button type="submit" className="retro-btn retro-btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">🎁 Rewards</span>
          <table style={{ width: '100%', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#c0c0c0' }}>
                <th style={{ padding: '4px', textAlign: 'left' }}>Invite</th>
                <th style={{ padding: '4px', textAlign: 'left' }}>Get</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{r.earned}</td>
                  <td style={{ padding: '4px', border: '1px solid #808080' }}>{r.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          👥 Invite Friends
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Share Design Kit and earn rewards when friends sign up!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Link */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            🔗 Your Referral Link
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Friends get 25% off their first purchase when they use your link!
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="main-input flex-1"
              value={referralLink}
              readOnly
            />
            <button onClick={handleCopyLink} className="main-btn main-btn-primary">
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Or share code: <span className="font-mono font-bold">{referralCode}</span>
          </p>
        </div>

        {/* Email Invite */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            📧 Send Email Invite
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We&apos;ll send a beautiful invite email on your behalf.
          </p>
          <form onSubmit={handleSendInvite} className="flex gap-2">
            <input
              type="email"
              className="main-input flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@email.com"
              required
            />
            <button type="submit" className="main-btn main-btn-primary">
              Send Invite
            </button>
          </form>
        </div>
      </div>

      {/* Rewards */}
      <div className="main-card mt-8">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-6 text-center">
          🎁 Referral Rewards
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rewards.map((r, i) => (
            <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {r.earned}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {r.reward}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Share on social media:</p>
        <div className="flex gap-4 justify-center">
          <button className="main-btn main-btn-secondary">🐦 Twitter</button>
          <button className="main-btn main-btn-secondary">📘 Facebook</button>
          <button className="main-btn main-btn-secondary">💼 LinkedIn</button>
        </div>
      </div>
    </div>
  );
}
