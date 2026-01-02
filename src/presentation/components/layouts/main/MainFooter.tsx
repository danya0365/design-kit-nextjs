// MainFooter - Modern footer with links
'use client';

import Link from 'next/link';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer-container">
        <div className="main-footer-brand">
          <span className="main-footer-logo">🎨 Design Kit</span>
          <span className="main-footer-copyright">
            © {currentYear} Design Kit. All rights reserved.
          </span>
        </div>

        <nav className="main-footer-nav">
          <Link href="/about" className="main-footer-link">
            About
          </Link>
          <Link href="/docs" className="main-footer-link">
            Documentation
          </Link>
          <Link href="/support" className="main-footer-link">
            Support
          </Link>
          <Link href="/privacy" className="main-footer-link">
            Privacy
          </Link>
          <Link href="/terms" className="main-footer-link">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
