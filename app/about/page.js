'use client';
import React from 'react';
import AdSlot from '../components/AdSlot';

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <h1 className="page-title">ℹ️ About Bazaar49</h1>
      <p className="page-subtitle">India's most loved budget-friendly fashion bazaar</p>

      {/* Top Banner Ad */}
      <AdSlot type="banner" />

      <div className="static-page-layout">
        
        {/* Main Content Area */}
        <div className="static-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2026, Bazaar49 was created with a simple mission: to make trendy, premium-quality Indian fashion accessible to every single household in India without breaking the bank. We believe that looking good shouldn't cost a fortune.
          </p>
          <p>
            By working directly with manufacturers, weavers, and design studios across Rajasthan, Gujarat, Uttar Pradesh, and Delhi, we eliminate middle-men markups and pass 100% of the savings directly to you. That's why every single item on our store costs no more than ₹49!
          </p>

          <h2>Why Are Our Prices So Low?</h2>
          <p>
            It sounds too good to be true, but it's simple! We bulk purchase clearance stock, end-of-season designer samples, and surplus fabrics. Instead of letting beautiful clothes go to waste, we list them at minimal, pocket-friendly clearance rates (₹9, ₹19, ₹29, ₹39, and ₹49).
          </p>
          <p>
            To keep operations low-cost, we don't spend on expensive TV commercials or celebrities. We rely on the love and word-of-mouth of our amazing customers who share our deals with friends and family.
          </p>

          <h2>100% Cash on Delivery (COD) Only</h2>
          <p>
            To guarantee complete trust, we do not accept credit cards, debit cards, or UPI prepayments. You only pay cash to our delivery executive when the package is physically handed to you. This ensures absolute safety for every online shopper in India.
          </p>
          
          <h2>Our Manufacturing Partners</h2>
          <p>
            We are proud supporters of the **Make in India** initiative. 100% of our kurtas, co-ord sets, kids coats, and knitwear are sourced and manufactured locally by skilled artisans.
          </p>
        </div>

        {/* Sidebar containing Ads */}
        <aside className="sidebar-section">
          <AdSlot type="sidebar" />
          <AdSlot type="sidebar" />
        </aside>

      </div>

      {/* Bottom Ad feed */}
      <AdSlot type="native-grid" />
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .static-page-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
