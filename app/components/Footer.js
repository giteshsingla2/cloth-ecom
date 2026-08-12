'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-text">Bazaar<span>49</span></div>
            <p className="footer-desc">
              India's favourite budget fashion destination. Premium co-ord sets, kurtas, kids wear, knitwear and accessories — all under ₹49. Cash on Delivery only.
            </p>
            <div className="footer-trust">
              <span className="trust-chip">🤝 COD Only</span>
              <span className="trust-chip">🚚 Fast Delivery</span>
              <span className="trust-chip">🇮🇳 Made in India</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Shop Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link href="/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/refund-policy">Return & Refund</Link></li>
              <li><Link href="/faq">Help Centre</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@bazaar49.in">support@bazaar49.in</a></li>
              <li><a href="tel:+911149490099">+91 11-4949-0099</a></li>
              <li style={{ color: '#78716c', lineHeight: '1.5' }}>D-12, Okhla Industrial Area, Phase-III, New Delhi 110020</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bazaar49. All Rights Reserved. Prices valid during sale period only.</p>
        </div>
      </div>
    </footer>
  );
}
