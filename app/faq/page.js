'use client';
import React from 'react';
import AdSlot from '../components/AdSlot';

export default function FAQPage() {
  const faqs = [
    {
      q: "Why is everything under ₹49? Is it a scam?",
      a: "No! It is 100% genuine. We specialize in clearance stock, factory surplus, and end-of-season designer fabrics. Instead of destroying unsold inventory, textile mills sell to us in massive bulk quantities. We pass these savings directly to customers, keeping all fashion items between ₹9 and ₹49."
    },
    {
      q: "What payment methods do you accept?",
      a: "To ensure complete security and building trust for our shoppers, we accept Cash on Delivery (COD) ONLY. You do not pay anything online. You pay cash to the courier boy only when you receive your packet."
    },
    {
      q: "Can I pay using UPI (GPay/PhonePe) at the door?",
      a: "Yes! Many of our courier delivery partners carry QR code scanners. You can scan and pay them via UPI when they deliver the package, or pay with paper cash."
    },
    {
      q: "Is shipping free?",
      a: "Shipping is FREE for all orders of ₹99 and above. For orders under ₹99, we charge a flat fee of ₹40 to cover handling and logistics."
    },
    {
      q: "How long will it take to receive my order?",
      a: "Most orders are shipped within 24 hours of placement. Standard delivery takes 3 to 5 business days for metro cities, and 5 to 7 days for other regions."
    },
    {
      q: "Can I return or exchange my items?",
      a: "Yes! We offer a hassle-free 7-day return policy. If you are not satisfied with the fit or quality, simply contact support@bazaar49.in, and we will arrange a reverse pickup from your address."
    }
  ];

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <h1 className="page-title">❓ Frequently Asked Questions</h1>
      <p className="page-subtitle">Got questions? We have the answers!</p>

      <AdSlot type="banner" />

      <div className="static-page-layout">
        
        {/* FAQs */}
        <div className="static-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: idx !== faqs.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: '16px' }}>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  Q: {faq.q}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.5' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Ads */}
        <aside className="sidebar-section">
          <AdSlot type="sidebar" />
          <AdSlot type="sidebar" />
        </aside>

      </div>

      <AdSlot type="native-grid" />
    </div>
  );
}
