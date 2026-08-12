'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import AdSlot from '../components/AdSlot';
import Link from 'next/link';

export default function ThankYouPage() {
  const { lastOrder } = useCart();
  const [spinning, setSpinning] = useState(false);
  const [wheelSpun, setWheelSpun] = useState(false);
  const [prize, setPrize] = useState(null);
  const [order, setOrder] = useState({ orderId: 'B49-482910', customerName: 'Customer', address: 'India', total: 39 });

  useEffect(() => {
    if (lastOrder) setOrder(lastOrder);
  }, [lastOrder]);

  const spinWheel = () => {
    if (wheelSpun || spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setWheelSpun(true);
      setPrize({ text: '🎁 You won a FREE Accessory!', link: '/product/6' });
    }, 2200);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Order Placed! 🎉</h1>
          <p className="page-subtitle">Your COD order is confirmed and being processed</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 48 }}>
        <div className="thank-you-card">
          <div className="check-icon">✓</div>
          <h2 className="ty-title">Thank You, {order.customerName}!</h2>
          <p style={{ color: '#057654', fontWeight: 700, marginBottom: 8 }}>
            🇮🇳 Cash on Delivery Order Confirmed
          </p>
          <p style={{ color: '#57534e', fontSize: '0.88rem', marginBottom: 20 }}>
            Our delivery partner will call you before arriving. Keep ₹{order.total} in cash ready.
          </p>

          <div className="order-info-box">
            <div className="order-info-row"><span>Order ID</span><span style={{ color: '#f97316' }}>{order.orderId}</span></div>
            <div className="order-info-row"><span>Deliver To</span><span>{order.customerName}</span></div>
            <div className="order-info-row"><span>Address</span><span style={{ maxWidth: '60%', textAlign: 'right', lineHeight: 1.4 }}>{order.address}</span></div>
            <div className="order-info-row"><span>COD Amount</span><span style={{ color: '#dc2626', fontSize: '1.1rem' }}>₹{order.total}</span></div>
          </div>

          {/* Spin the Wheel */}
          {!prize ? (
            <div className="free-gift-box">
              <h4 className="free-gift-title">🎡 You've Earned 1 FREE Spin!</h4>
              <p className="free-gift-desc">Spin the lucky wheel to win a free product — 100% guaranteed prize!</p>

              {/* Wheel */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
                <div style={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  border: '6px solid #d97706',
                  background: 'conic-gradient(#f97316 0deg 90deg, #dc2626 90deg 180deg, #059669 180deg 270deg, #d97706 270deg 360deg)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
                  position: 'relative',
                  transition: spinning ? 'transform 2.2s cubic-bezier(0.1, 0.7, 0.2, 1)' : 'none',
                  transform: spinning ? 'rotate(1620deg)' : 'rotate(0deg)'
                }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: 14, height: 14, background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}></div>
                </div>
              </div>

              <button
                onClick={spinWheel}
                disabled={spinning}
                className="buy-btn animate-pulse"
                style={{ maxWidth: 220, margin: '0 auto', display: 'flex', background: spinning ? '#a8a29e' : '#f97316' }}
              >
                {spinning ? '🎡 Spinning…' : '🎡 SPIN NOW — Free Gift!'}
              </button>
            </div>
          ) : (
            <div className="free-gift-box" style={{ border: '2px dashed #059669', background: '#f0fdf4' }}>
              <h4 className="free-gift-title" style={{ color: '#059669', animation: 'none' }}>{prize.text}</h4>
              <p className="free-gift-desc">Claim your free item now — add it to your next order!</p>
              <Link href={prize.link} className="buy-btn animate-shake" style={{ maxWidth: 240, margin: '0 auto', display: 'flex', background: '#059669' }}>
                Claim My Free Gift →
              </Link>
            </div>
          )}

          <Link href="/" style={{ display: 'block', color: '#a8a29e', fontSize: '0.82rem', marginTop: 16 }}>
            ← Back to Shopping
          </Link>
        </div>

        <AdSlot type="banner" />
        <AdSlot type="native-grid" />
      </div>
    </div>
  );
}
