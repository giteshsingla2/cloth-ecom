'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import AdSlot from '../components/AdSlot';
import Link from 'next/link';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir'
];

export default function CheckoutPage() {
  const { cart, clearCart, setLastOrder } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: 'Delhi', pincode: '' });
  const [submitting, setSubmitting] = useState(false);

  // Guard: redirect to cart if accessed directly with empty cart
  useEffect(() => {
    if (cart.length === 0) {
      router.replace('/cart');
    }
  }, [cart.length]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalItems === 0) return;
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert('Please fill all required fields.'); return;
    }
    if (!/^\d{10}$/.test(form.phone)) { alert('Enter a valid 10-digit mobile number.'); return; }
    if (!/^\d{6}$/.test(form.pincode)) { alert('Enter a valid 6-digit PIN code.'); return; }

    setSubmitting(true);
    setTimeout(() => {
      const orderId = `B49-${Math.floor(100000 + Math.random() * 900000)}`;
      setLastOrder({ orderId, customerName: form.name, customerPhone: form.phone, address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`, items: [...cart], subtotal, shipping, total });
      clearCart();
      setSubmitting(false);
      router.push('/thank-you');
    }, 1500);
  };

  if (totalItems === 0) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 16px' }}>
      <p style={{ color: '#a8a29e', fontSize: '0.9rem' }}>Redirecting to cart…</p>
    </div>
  );

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: '0.82rem', flexWrap: 'wrap' }}>
            <Link href="/cart" style={{ color: '#f97316', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>← Back to Cart</Link>
            <span style={{ color: '#a8a29e' }}>›</span>
            <span style={{ color: '#57534e', fontWeight: 600 }}>Checkout</span>
          </div>
          <h1 className="page-title">📝 Checkout</h1>
          <p className="page-subtitle">No online payment — pay cash when your order arrives!</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60, maxWidth: '100%' }}>
        <AdSlot type="banner" />

        {/* Single column on mobile, two columns on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
          gap: 24,
          width: '100%',
        }} className="checkout-cols">

          {/* ── FORM ── */}
          <div style={{
            background: '#fff',
            border: '1.5px solid #e8e5df',
            borderRadius: 14,
            padding: '20px 18px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            minWidth: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {/* COD notice */}
            <div style={{
              background: '#ecfdf5',
              border: '1.5px solid #6ee7b7',
              borderRadius: 8,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              marginBottom: 20,
            }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>💵</span>
              <div>
                <p style={{ color: '#059669', fontWeight: 700, fontSize: '0.85rem', marginBottom: 2 }}>CASH ON DELIVERY SELECTED</p>
                <p style={{ fontSize: '0.77rem', color: '#78716c' }}>You won't be charged online. Pay cash when our delivery partner arrives.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1c1917', marginBottom: 16, paddingBottom: 10, borderBottom: '1.5px solid #e8e5df', display: 'flex', alignItems: 'center', gap: 6 }}>
              📍 Delivery Address
            </h3>

            <form onSubmit={handleSubmit} autoComplete="on" style={{ width: '100%' }}>

              {/* Full Name */}
              <div style={{ marginBottom: 14, width: '100%' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#57534e', marginBottom: 5 }} htmlFor="name">Full Name *</label>
                <input
                  id="name" type="text"
                  placeholder="Your full name"
                  value={form.name} onChange={set('name')} required
                  style={inputStyle}
                />
              </div>

              {/* Phone + Email row — stacks on mobile via media query */}
              <div className="co-row-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle} htmlFor="phone">Mobile Number *</label>
                  <input id="phone" type="tel" placeholder="10-digit number" maxLength={10} value={form.phone} onChange={set('phone')} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="email">Email (Optional)</label>
                  <input id="email" type="email" placeholder="For updates" value={form.email} onChange={set('email')} style={inputStyle} />
                </div>
              </div>

              {/* Address */}
              <div style={{ marginBottom: 14, width: '100%' }}>
                <label style={labelStyle} htmlFor="address">Full Address *</label>
                <textarea
                  id="address" rows={3}
                  placeholder="House/flat no., street, area, landmark"
                  value={form.address} onChange={set('address')}
                  style={{ ...inputStyle, resize: 'none', height: 'auto' }}
                  required
                />
              </div>

              {/* City + State row */}
              <div className="co-row-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle} htmlFor="city">City *</label>
                  <input id="city" type="text" placeholder="City" value={form.city} onChange={set('city')} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="state">State *</label>
                  <select id="state" value={form.state} onChange={set('state')} required style={inputStyle}>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* PIN Code — half width on desktop, full on mobile */}
              <div style={{ marginBottom: 20, width: '100%' }}>
                <label style={labelStyle} htmlFor="pincode">PIN Code *</label>
                <input
                  id="pincode" type="text"
                  placeholder="6-digit PIN"
                  maxLength={6} value={form.pincode} onChange={set('pincode')} required
                  style={{ ...inputStyle, maxWidth: 180 }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: submitting ? '#9ca3af' : '#059669',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 16px',
                  fontSize: '0.97rem',
                  fontWeight: 700,
                  borderRadius: 8,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: submitting ? 'none' : '0 4px 14px rgba(5,150,105,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s',
                  boxSizing: 'border-box',
                }}
              >
                {submitting ? '⏳ Placing your order…' : '💵 Place Cash on Delivery Order'}
              </button>
            </form>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div style={{ minWidth: 0 }}>
            <div style={{
              background: '#fff',
              border: '1.5px solid #e8e5df',
              borderRadius: 14,
              padding: '20px 18px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
              position: 'sticky',
              top: 80,
              minWidth: 0,
              boxSizing: 'border-box',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '1.5px solid #e8e5df', paddingBottom: 12, marginBottom: 14, color: '#1c1917' }}>📦 Order Summary</h3>

              <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 14, borderBottom: '1.5px solid #e8e5df', paddingBottom: 12 }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 8, color: '#57534e', gap: 8 }}>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{item.quantity}× {item.title}</span>
                    <span style={{ fontWeight: 700, color: '#1c1917', flexShrink: 0 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={summaryRow}><span>Items Total</span><span>₹{subtotal}</span></div>
              <div style={summaryRow}>
                <span>Delivery</span>
                <span style={{ color: shipping === 0 ? '#059669' : '#1c1917', fontWeight: shipping === 0 ? 700 : 400 }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div style={{ ...summaryRow, borderTop: '1.5px solid #e8e5df', paddingTop: 12, marginTop: 4, fontWeight: 800, fontSize: '1rem', color: '#1c1917' }}>
                <span>COD Total</span>
                <span style={{ color: '#dc2626' }}>₹{total}</span>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 12px', fontSize: '0.74rem', color: '#065f46', lineHeight: 1.5, marginTop: 14 }}>
                🤝 <strong>Bazaar49 Promise:</strong> No prepayment. Pay cash only when you're happy with what you receive.
              </div>
            </div>

            <div style={{ marginTop: 20 }}><AdSlot type="sidebar" /></div>
          </div>
        </div>

        <AdSlot type="native-grid" />
      </div>

      {/* Inline scoped responsive styles */}
      <style>{`
        .co-row-group {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 600px) {
          .checkout-cols {
            grid-template-columns: 1fr !important;
          }
          .co-row-group {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// Shared inline styles (avoids classname issues on mobile)
const inputStyle = {
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  background: '#f5f4f0',
  border: '1.5px solid #e8e5df',
  color: '#1c1917',
  padding: '10px 12px',
  borderRadius: 8,
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Poppins, sans-serif',
  WebkitAppearance: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.74rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#57534e',
  marginBottom: 5,
};

const summaryRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 10,
  fontSize: '0.86rem',
  color: '#57534e',
};
