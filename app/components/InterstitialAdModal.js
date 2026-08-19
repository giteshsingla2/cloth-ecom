'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getProducts } from '../utils/products';

export default function InterstitialAdModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [canClose, setCanClose] = useState(false);
  const [adProduct, setAdProduct] = useState(null);
  const [navCount, setNavCount] = useState(0);

  const products = getProducts();

  useEffect(() => {
    // Only trigger interstitial after initial mount and on route changes
    setNavCount((prev) => {
      const nextCount = prev + 1;
      // Trigger interstitial on page transitions (e.g. route changes after initial load)
      if (nextCount > 1 && Math.random() < 0.7) {
        triggerInterstitial();
      }
      return nextCount;
    });
  }, [pathname]);

  const triggerInterstitial = () => {
    if (!products || !products.length) return;
    const randomProd = products[Math.floor(Math.random() * products.length)];
    setAdProduct(randomProd);
    setCountdown(3);
    setCanClose(false);
    setIsOpen(true);
  };

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen || !adProduct) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="interstitial-overlay">
      <div className="interstitial-container">
        {/* Interstitial Header */}
        <div className="interstitial-top-bar">
          <div className="interstitial-badge">
            <span className="interstitial-icon">📢</span> SPONSORED INTERSTITIAL AD
          </div>
          <button
            className={`interstitial-close-btn ${canClose ? 'active' : ''}`}
            onClick={handleClose}
            disabled={!canClose}
          >
            {canClose ? '✕ Close Ad' : `Skip in ${countdown}s`}
          </button>
        </div>

        {/* Ad Body */}
        <div className="interstitial-content">
          <div className="interstitial-media">
            <img src={adProduct.image} alt={adProduct.title} className="interstitial-img" />
            <span className="interstitial-discount-badge">90% OFF DEAL</span>
          </div>

          <div className="interstitial-info">
            <span className="interstitial-tag">LIMITED TIME CLEARANCE</span>
            <h2 className="interstitial-title">{adProduct.title}</h2>
            <p className="interstitial-desc">
              Exclusive flash price drop! Available with Cash on Delivery & Free Home Delivery.
            </p>

            <div className="interstitial-price-row">
              <span className="interstitial-new-price">₹{adProduct.price}</span>
              <span className="interstitial-old-price">₹{adProduct.originalPrice}</span>
              <span className="interstitial-save">Save ₹{adProduct.originalPrice - adProduct.price}</span>
            </div>

            <div className="interstitial-actions">
              <Link
                href={`/product/${adProduct.id}`}
                className="interstitial-cta-btn"
                onClick={handleClose}
              >
                ⚡ CLAIM THIS DEAL (COD) →
              </Link>
              <button className="interstitial-skip-link" onClick={handleClose}>
                Continue to website
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .interstitial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .interstitial-container {
          background: #ffffff;
          border-radius: 20px;
          max-width: 540px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .interstitial-top-bar {
          background: #f8fafc;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
        }

        .interstitial-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #ea580c;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .interstitial-close-btn {
          background: #e2e8f0;
          color: #64748b;
          border: none;
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: not-allowed;
          transition: all 0.2s ease;
        }

        .interstitial-close-btn.active {
          background: #ef4444;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }
        .interstitial-close-btn.active:hover {
          background: #dc2626;
        }

        .interstitial-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .interstitial-media {
          position: relative;
          width: 100%;
          max-height: 240px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .interstitial-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .interstitial-discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #dc2626;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 99px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .interstitial-tag {
          font-size: 0.7rem;
          font-weight: 800;
          color: #f97316;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .interstitial-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 6px 0;
          line-height: 1.35;
        }

        .interstitial-desc {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 16px;
        }

        .interstitial-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .interstitial-new-price {
          font-size: 1.75rem;
          font-weight: 900;
          color: #dc2626;
        }

        .interstitial-old-price {
          font-size: 1.1rem;
          text-decoration: line-through;
          color: #94a3b8;
        }

        .interstitial-save {
          background: #fef2f2;
          color: #dc2626;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .interstitial-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .interstitial-cta-btn {
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #ffffff;
          text-decoration: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
          transition: transform 0.15s ease;
          display: block;
        }
        .interstitial-cta-btn:hover {
          transform: translateY(-1px);
        }

        .interstitial-skip-link {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.8rem;
          cursor: pointer;
          text-decoration: underline;
        }
        .interstitial-skip-link:hover {
          color: #64748b;
        }
      `}</style>
    </div>
  );
}
