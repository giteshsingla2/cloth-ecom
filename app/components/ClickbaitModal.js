'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClickbaitModal() {
  const { isPopupOpen, setIsPopupOpen, recentProductAdded, getClickbaitRecommendations } = useCart();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (isPopupOpen) {
      setRecommendations(getClickbaitRecommendations());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

  const handleViewCart = () => {
    setIsPopupOpen(false);
    router.push('/cart');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPopupOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsPopupOpen(false)}>✕</button>

        <div className="modal-header">
          <div className="modal-eyebrow">⚡ Wait! Don't Miss These Deals</div>
          <h2 className="modal-title-flash">Customers Also Grabbed These!</h2>
          <p className="modal-subtitle">
            Some are <strong style={{ color: '#dc2626' }}>₹0 (FREE!)</strong> and some at just ₹9 — click any item to view details & add to cart.
          </p>
          {recentProductAdded && (
            <div style={{ marginTop: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', color: '#065f46', fontWeight: 600 }}>
              ✅ Added to cart: {recentProductAdded.title.slice(0, 50)}…
            </div>
          )}
        </div>

        {/* Upsell items — clicking navigates to product page */}
        <div className="modal-upsell-list">
          {recommendations.map(item => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="upsell-item"
              onClick={() => setIsPopupOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <img src={item.image} alt={item.title} className="upsell-img" />
              <div className="upsell-info">
                <p className="upsell-title">{item.title}</p>
                <div className="upsell-price-row">
                  <span className="upsell-price">
                    {item.price === 0 ? '🆓 FREE (₹0)' : `₹${item.price}`}
                  </span>
                  <span className="upsell-original">₹{item.originalPrice}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', background: '#fef2f2', padding: '1px 6px', borderRadius: '99px' }}>
                    {item.price === 0 ? '100% OFF' : `${Math.round(100 - (item.price / item.originalPrice) * 100)}% OFF`}
                  </span>
                </div>
              </div>
              <span className="upsell-btn" style={{ pointerEvents: 'none' }}>View →</span>
            </Link>
          ))}
        </div>

        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={() => setIsPopupOpen(false)}>
            Continue Shopping
          </button>
          <button className="modal-btn-primary animate-shake" onClick={handleViewCart}>
            🛒 View Cart & Checkout →
          </button>
        </div>

        <p className="modal-urgency">⏳ These deals expire soon — grab them now!</p>
      </div>
    </div>
  );
}
