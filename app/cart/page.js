'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../utils/products';
import AdSlot from '../components/AdSlot';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const shippingFree = subtotal >= 99;
  const shipping = shippingFree || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;

  const allProducts = getProducts();
  const cartIds = cart.map(i => i.id);
  const upsells = allProducts.filter(p => !cartIds.includes(p.id)).slice(0, 3);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">🛒 Your Cart</h1>
          <p className="page-subtitle">{totalItems > 0 ? `${totalItems} item(s) · Pay only when delivered` : 'Your cart is empty'}</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60, maxWidth: '100%' }}>
        <AdSlot type="banner" />

        {totalItems === 0 ? (
          <div style={{ textAlign: 'center', background: '#fff', border: '1.5px solid #e8e5df', borderRadius: 16, padding: '50px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>🛍️</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: 8, color: '#1c1917' }}>Nothing here yet!</h2>
            <p style={{ color: '#57534e', marginBottom: 22, fontSize: '0.88rem' }}>Grab amazing fashion at just ₹9–₹49 during our mega clearance sale.</p>
            <Link href="/" className="buy-btn" style={{ maxWidth: 220, margin: '0 auto', display: 'flex' }}>🛍️ Start Shopping</Link>
            <div style={{ marginTop: 36 }}><AdSlot type="native-grid" /></div>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="progress-banner">
              {shippingFree ? (
                <>🎉 You've unlocked <strong>FREE Express Shipping!</strong></>
              ) : (
                <>Add <strong style={{ color: '#dc2626' }}>₹{99 - subtotal}</strong> more for <strong style={{ color: '#059669' }}>FREE Shipping!</strong>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min((subtotal / 99) * 100, 100)}%` }}></div></div>
                </>
              )}
            </div>

            {/* Main layout: stacks vertically on mobile */}
            <div className="cart-cols" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24, width: '100%' }}>

              {/* ── LEFT: Cart Items + Upsells ── */}
              <div style={{ minWidth: 0 }}>

                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      background: '#fff',
                      border: '1.5px solid #e8e5df',
                      borderRadius: 14,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      width: '100%',
                      boxSizing: 'border-box',
                      minWidth: 0,
                      flexWrap: 'wrap',
                    }}>
                      <img
                        src={item.image} alt={item.title}
                        style={{ width: 72, height: 82, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      />
                      <div style={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.87rem', fontWeight: 600, color: '#1c1917', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#dc2626' }}>₹{item.price}</span>
                          {item.originalPrice && (
                            <span style={{ textDecoration: 'line-through', fontSize: '0.78rem', color: '#a8a29e' }}>₹{item.originalPrice}</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}
                        >
                          🗑 Remove
                        </button>
                      </div>
                      {/* Qty control — pushed to its own row on very narrow screens */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1.5px solid #e8e5df',
                        borderRadius: 8,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: '#fff',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ background: '#f5f4f0', border: 'none', width: 34, height: 34, fontSize: '1.1rem', cursor: 'pointer', color: '#1c1917', flexShrink: 0 }}
                        >−</button>
                        <span style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: '0.88rem', color: '#1c1917', flexShrink: 0 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ background: '#f5f4f0', border: 'none', width: 34, height: 34, fontSize: '1.1rem', cursor: 'pointer', color: '#1c1917', flexShrink: 0 }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsells */}
                {upsells.length > 0 && (
                  <div style={{ background: '#fffbeb', border: '1.5px dashed #fbbf24', borderRadius: 14, padding: 18, marginTop: 20, boxSizing: 'border-box', width: '100%' }}>
                    <h3 style={{ fontSize: '0.93rem', fontWeight: 800, color: '#92400e', marginBottom: 14 }}>
                      🎁 People Also Loved These
                    </h3>
                    {upsells.map(p => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#fff',
                          border: '1.5px solid #e8e5df',
                          borderRadius: 10,
                          padding: '10px 12px',
                          gap: 10,
                          marginBottom: 10,
                          textDecoration: 'none',
                          width: '100%',
                          boxSizing: 'border-box',
                          minWidth: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <img src={p.image} alt={p.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                        <div style={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title.slice(0, 50)}</p>
                          <span style={{ fontSize: '0.97rem', fontWeight: 800, color: '#dc2626' }}>₹{p.price}</span>
                          <span style={{ fontSize: '0.75rem', color: '#a8a29e', textDecoration: 'line-through', marginLeft: 5 }}>₹{p.originalPrice}</span>
                        </div>
                        <span style={{ flexShrink: 0, fontSize: '0.76rem', padding: '5px 10px', border: '1.5px solid #e8e5df', borderRadius: 7, color: '#57534e', fontWeight: 600, whiteSpace: 'nowrap' }}>View →</span>
                      </Link>
                    ))}
                  </div>
                )}

                <AdSlot type="banner" />
              </div>

              {/* ── RIGHT: Order Summary ── */}
              <div style={{ minWidth: 0 }}>
                <div style={{
                  background: '#fff',
                  border: '1.5px solid #e8e5df',
                  borderRadius: 14,
                  padding: '18px 16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                  position: 'sticky',
                  top: 80,
                  boxSizing: 'border-box',
                  width: '100%',
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '1.5px solid #e8e5df', paddingBottom: 11, marginBottom: 14, color: '#1c1917' }}>
                    Price Details ({totalItems} items)
                  </h3>

                  {[
                    { label: 'Items Total', value: `₹${subtotal}` },
                    { label: 'Delivery', value: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                    { label: 'COD Charge', value: '₹0', green: true },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, fontSize: '0.86rem', color: '#57534e' }}>
                      <span>{row.label}</span>
                      <span style={{ fontWeight: row.green ? 700 : 400, color: row.green ? '#059669' : '#1c1917' }}>{row.value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #e8e5df', paddingTop: 11, marginTop: 4, fontWeight: 800, fontSize: '1rem' }}>
                    <span style={{ color: '#1c1917' }}>Total Payable</span>
                    <span style={{ color: '#dc2626' }}>₹{total}</span>
                  </div>

                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '9px 11px', fontSize: '0.75rem', color: '#065f46', fontWeight: 600, marginTop: 13, textAlign: 'center', lineHeight: 1.5 }}>
                    🇮🇳 Cash on Delivery — Pay at doorstep
                  </div>

                  <Link href="/checkout" style={{
                    display: 'block',
                    width: '100%',
                    background: '#059669',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '13px 12px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    marginTop: 14,
                    boxShadow: '0 4px 14px rgba(5,150,105,0.28)',
                    transition: 'background 0.2s',
                    boxSizing: 'border-box',
                    textDecoration: 'none',
                  }}>
                    ✅ Secure COD Checkout →
                  </Link>

                  <Link href="/" style={{ display: 'block', textAlign: 'center', fontSize: '0.82rem', color: '#f97316', marginTop: 12, fontWeight: 600, textDecoration: 'none' }}>
                    ← Continue Shopping
                  </Link>
                </div>

                <div style={{ marginTop: 20 }}><AdSlot type="sidebar" /></div>
              </div>
            </div>

            <AdSlot type="native-grid" />
          </>
        )}
      </div>

      {/* Scoped responsive: stack columns on mobile */}
      <style>{`
        .cart-cols {
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        }
        @media (max-width: 640px) {
          .cart-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
