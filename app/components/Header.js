'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '🏠 Home' },
    { href: '/about', label: '📋 About' },
    { href: '/contact', label: '📞 Contact' },
    { href: '/faq', label: '❓ FAQ' },
    { href: '/shipping-policy', label: '🚚 Shipping' },
    { href: '/refund-policy', label: '↩️ Returns' },
  ];

  return (
    <>
      <header className="main-header">
        {/* Ticker */}
        <div className="sale-ticker">
          <span className="ticker-inner">
            🔥 DIWALI MEGA SALE — EVERYTHING UNDER ₹49 &nbsp;&nbsp;|&nbsp;&nbsp; 📦 CASH ON DELIVERY ONLY &nbsp;&nbsp;|&nbsp;&nbsp; 🚚 FREE SHIPPING ABOVE ₹99 &nbsp;&nbsp;|&nbsp;&nbsp; ⚡ STOCK SELLING OUT FAST — ORDER NOW &nbsp;&nbsp;|&nbsp;&nbsp; 🇮🇳 MADE IN INDIA &nbsp;&nbsp;|&nbsp;&nbsp; 🔥 DIWALI MEGA SALE — EVERYTHING UNDER ₹49 &nbsp;&nbsp;|&nbsp;&nbsp; 📦 CASH ON DELIVERY ONLY
          </span>
        </div>

        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link href="/" className="logo">
              Bazaar<span className="logo-badge">49</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/faq" className="nav-link">FAQ</Link>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <span className="cod-pill">✅ COD Only</span>

              {/* Desktop cart icon */}
              <Link href="/cart" style={{ textDecoration: 'none' }}>
                <button className="cart-btn" aria-label="Shopping Cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </button>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="mobile-menu-btn"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <div className={`mobile-nav-drawer${menuOpen ? ' open' : ''}`}>
        <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)} />
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" onClick={() => setMenuOpen(false)}>✕</button>

          <div style={{ marginBottom: 8 }}>
            <Link href="/" className="logo" style={{ fontSize: '1.4rem' }} onClick={() => setMenuOpen(false)}>
              Bazaar<span className="logo-badge">49</span>
            </Link>
          </div>

          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: '#f97316', fontWeight: 700 }}
          >
            🛒 Cart {totalItems > 0 && <span style={{ background: '#dc2626', color: '#fff', borderRadius: '99px', padding: '1px 7px', fontSize: '0.78rem' }}>{totalItems}</span>}
          </Link>

          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1.5px solid #e8e5df', fontSize: '0.8rem', color: '#a8a29e' }}>
            💵 Cash on Delivery Only · 🇮🇳 Made in India
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-inner">
          <Link href="/" className={`mobile-nav-item${pathname === '/' ? ' active' : ''}`}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link href="/cart" className={`mobile-nav-item${pathname === '/cart' ? ' active' : ''}`}>
            <span className="nav-icon">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && <span className="mobile-cart-badge">{totalItems}</span>}
          </Link>
          <Link href="/checkout" className={`mobile-nav-item${pathname === '/checkout' ? ' active' : ''}`}>
            <span className="nav-icon">📝</span>
            <span>Checkout</span>
          </Link>
          <Link href="/contact" className={`mobile-nav-item${pathname === '/contact' ? ' active' : ''}`}>
            <span className="nav-icon">📞</span>
            <span>Contact</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
