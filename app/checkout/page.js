'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import AdSlot from '../components/AdSlot';
import GAMAd from '../components/GAMAd';
import Link from 'next/link';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir'
];

export default function CheckoutPage() {
  const { cart, cartLoaded, clearCart, setLastOrder } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: 'Delhi', pincode: '' });
  const [submitting, setSubmitting] = useState(false);

  // Guard: redirect to cart only after cartLoaded is true and cart is empty
  useEffect(() => {
    if (cartLoaded && cart.length === 0) {
      router.replace('/cart');
    }
  }, [cartLoaded, cart.length, router]);

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
    <div>
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: '0.82rem', flexWrap: 'wrap' }}>
            <Link href="/cart" style={{ color: '#f97316', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>← Back to Cart</Link>
            <span style={{ color: '#a8a29e' }}>›</span>
            <span style={{ color: '#57534e', fontWeight: 600 }}>Checkout</span>
          </div>
          <h1 className="page-title">📝 Checkout</h1>
          <p className="page-subtitle">No online payment — pay cash when your order arrives!</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <AdSlot type="banner" seed={40} />

        <div className="checkout-grid">

          {/* ── LEFT: FORM ── */}
          <div className="checkout-form-card">
            {/* COD notice */}
            <div className="cod-notice-banner">
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>💵</span>
              <div>
                <p className="cod-notice-title">CASH ON DELIVERY SELECTED</p>
                <p className="cod-notice-sub">You won't be charged online. Pay cash when our delivery partner visits your home.</p>
              </div>
            </div>

            {/* GAM 300x600 Ad Unit below Cash on Delivery box */}
            <GAMAd
              slotPath={process.env.NEXT_PUBLIC_GAM_CHECKOUT_BELOW_COD_300x600 || '/6355419/Checkout_Below_COD_300x600'}
              width={300}
              height={600}
              lazyLoad={false}
              label="CHECKOUT AD (300×600 BELOW COD BOX)"
            />

            <h3 className="form-section-heading">
              📍 Delivery Address
            </h3>

            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="form-group-item">
                <label className="form-label-text" htmlFor="name">Full Name *</label>
                <input
                  id="name" type="text"
                  placeholder="Your full name"
                  value={form.name} onChange={set('name')} required
                  className="form-input-field"
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group-item">
                  <label className="form-label-text" htmlFor="phone">Mobile Number *</label>
                  <input id="phone" type="tel" placeholder="10-digit number" maxLength={10} value={form.phone} onChange={set('phone')} required className="form-input-field" />
                </div>
                <div className="form-group-item">
                  <label className="form-label-text" htmlFor="email">Email (Optional)</label>
                  <input id="email" type="email" placeholder="For order updates" value={form.email} onChange={set('email')} className="form-input-field" />
                </div>
              </div>

              <div className="form-group-item">
                <label className="form-label-text" htmlFor="address">Full Address *</label>
                <textarea
                  id="address" rows={3}
                  placeholder="House/flat no., street, area, landmark"
                  value={form.address} onChange={set('address')}
                  className="form-input-field"
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              {/* GAM 300x250 Ad Unit below Full Address placeholder box */}
              <GAMAd
                slotPath={process.env.NEXT_PUBLIC_GAM_CHECKOUT_BELOW_ADDRESS_300x250 || '/6355419/Checkout_Below_Address_300x250'}
                width={300}
                height={250}
                lazyLoad={false}
                label="CHECKOUT AD (300×250 BELOW FULL ADDRESS)"
              />

              <div className="form-row-2col">
                <div className="form-group-item">
                  <label className="form-label-text" htmlFor="city">City *</label>
                  <input id="city" type="text" placeholder="City name" value={form.city} onChange={set('city')} required className="form-input-field" />
                </div>
                <div className="form-group-item">
                  <label className="form-label-text" htmlFor="state">State *</label>
                  <select id="state" value={form.state} onChange={set('state')} required className="form-input-field">
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group-item pincode-field">
                <label className="form-label-text" htmlFor="pincode">PIN Code *</label>
                <input
                  id="pincode" type="text"
                  placeholder="6-digit PIN"
                  maxLength={6} value={form.pincode} onChange={set('pincode')} required
                  className="form-input-field"
                />
              </div>

              {/* GAM 300x250 Ad Unit above Place COD order button */}
              <GAMAd
                slotPath={process.env.NEXT_PUBLIC_GAM_CHECKOUT_ABOVE_PLACE_ORDER_300x250 || '/6355419/Checkout_Above_PlaceOrder_300x250'}
                width={300}
                height={250}
                lazyLoad={false}
                label="CHECKOUT AD (300×250 ABOVE PLACE COD ORDER)"
              />

              <button
                type="submit"
                disabled={submitting}
                className="place-cod-btn animate-pulse"
              >
                {submitting ? '⏳ Placing your order…' : '💵 Place Cash on Delivery Order'}
              </button>
            </form>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div>
            <div className="checkout-summary-sticky">
              <h3 className="summary-title-heading">📦 Order Summary</h3>

              <div className="summary-items-scroll">
                {cart.map(item => (
                  <div key={item.id} className="summary-item-line">
                    <span className="summary-item-title">{item.quantity}× {item.title}</span>
                    <span className="summary-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary-info-line"><span>Items Total</span><span>₹{subtotal}</span></div>
              <div className="summary-info-line">
                <span>Delivery</span>
                <span className={shipping === 0 ? 'summary-green-val' : 'summary-dark-val'}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-total-line">
                <span>COD Total</span>
                <span className="summary-total-price">₹{total}</span>
              </div>

              <div className="summary-cod-badge">
                🤝 <strong>Bazaar49 Promise:</strong> No prepayment. Pay cash only when you receive your items.
              </div>
            </div>

            <div style={{ marginTop: 20 }}><AdSlot type="sidebar" seed={41} /></div>
          </div>
        </div>

        <AdSlot type="native-grid" seed={42} />
      </div>

      {/* Checkout Scoped CSS */}
      <style jsx>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 28px;
          align-items: start;
        }

        .checkout-form-card {
          background: #fff;
          border: 1.5px solid #e8e5df;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .cod-notice-banner {
          background: #ecfdf5;
          border: 1.5px solid #6ee7b7;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 24px;
        }

        .cod-notice-title {
          color: #059669;
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 2px;
        }

        .cod-notice-sub {
          font-size: 0.78rem;
          color: #57534e;
        }

        .form-section-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #1c1917;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1.5px solid #e8e5df;
        }

        .form-group-item {
          margin-bottom: 16px;
        }

        .pincode-field {
          max-width: 220px;
        }

        .form-label-text {
          display: block;
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #57534e;
          margin-bottom: 6px;
        }

        .form-input-field {
          width: 100%;
          background: #f5f4f0;
          border: 1.5px solid #e8e5df;
          color: #1c1917;
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .form-input-field:focus {
          border-color: #f97316;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }

        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .place-cod-btn {
          width: 100%;
          background: #059669;
          color: #fff;
          border: none;
          padding: 15px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 14px rgba(5,150,105,0.3);
          margin-top: 8px;
        }
        .place-cod-btn:hover { background: #047857; }
        .place-cod-btn:disabled { background: #9ca3af; cursor: not-allowed; box-shadow: none; }

        .checkout-summary-sticky {
          background: #fff;
          border: 1.5px solid #e8e5df;
          border-radius: 16px;
          padding: 24px 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          position: sticky;
          top: 90px;
        }

        .summary-title-heading {
          font-size: 1.05rem;
          font-weight: 700;
          border-bottom: 1.5px solid #e8e5df;
          padding-bottom: 14px;
          margin-bottom: 16px;
          color: #1c1917;
        }

        .summary-items-scroll {
          max-height: 200px;
          overflow-y: auto;
          margin-bottom: 14px;
          border-bottom: 1.5px solid #e8e5df;
          padding-bottom: 12px;
        }

        .summary-item-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          margin-bottom: 8px;
          color: #57534e;
          gap: 8px;
        }

        .summary-item-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 70%;
        }

        .summary-item-price {
          font-weight: 700;
          color: #1c1917;
          flex-shrink: 0;
        }

        .summary-info-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.88rem;
          color: #57534e;
        }

        .summary-green-val { font-weight: 700; color: #059669; }
        .summary-dark-val { color: #1c1917; }

        .summary-total-line {
          display: flex;
          justify-content: space-between;
          border-top: 1.5px solid #e8e5df;
          padding-top: 14px;
          margin-top: 6px;
          font-weight: 800;
          font-size: 1.1rem;
          color: #1c1917;
        }

        .summary-total-price { color: #dc2626; }

        .summary-cod-badge {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.78rem;
          color: #065f46;
          line-height: 1.5;
          margin-top: 16px;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .checkout-summary-sticky {
            position: static;
          }
          .checkout-form-card {
            padding: 20px 16px;
          }
        }

        @media (max-width: 600px) {
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .pincode-field {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
