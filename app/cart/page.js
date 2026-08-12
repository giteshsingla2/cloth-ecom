'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../utils/products';
import AdSlot from '../components/AdSlot';
import GAMAd from '../components/GAMAd';
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
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">🛒 Your Cart</h1>
          <p className="page-subtitle">{totalItems > 0 ? `${totalItems} item(s) · Pay only when delivered` : 'Your cart is empty'}</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <AdSlot type="banner" seed={30} />

        {totalItems === 0 ? (
          <div style={{ textAlign: 'center', background: '#fff', border: '1.5px solid #e8e5df', borderRadius: 16, padding: '50px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>🛍️</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: 8, color: '#1c1917' }}>Nothing here yet!</h2>
            <p style={{ color: '#57534e', marginBottom: 22, fontSize: '0.88rem' }}>Grab amazing fashion at just ₹9–₹49 during our mega clearance sale.</p>
            <Link href="/" className="buy-btn" style={{ maxWidth: 220, margin: '0 auto', display: 'flex' }}>🛍️ Start Shopping</Link>
            <div style={{ marginTop: 36 }}><AdSlot type="native-grid" seed={31} /></div>
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

            {/* Main Cart Grid */}
            <div className="cart-grid">

              {/* ── LEFT: Product List & GAM Ads ── */}
              <div>

                {/* GAM 300x600 Ad Unit just above product list */}
                <GAMAd
                  slotPath={process.env.NEXT_PUBLIC_GAM_CART_ABOVE_PRODUCT_LIST_300x600 || '/6355419/Cart_Above_List_300x600'}
                  width={300}
                  height={600}
                  lazyLoad={false}
                  label="CART AD (300×600 ABOVE PRODUCT LIST)"
                />

                {/* Product List with GAM 300x250 Ad Unit after every 4 products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {cart.map((item, idx) => {
                    const showCartInfeedAd = (idx + 1) % 4 === 0;

                    return (
                      <React.Fragment key={item.id}>
                        <div className="cart-item-card">
                          <img
                            src={item.image} alt={item.title}
                            className="cart-item-img-thumb"
                          />
                          <div className="cart-item-details">
                            <h3 className="cart-item-name">{item.title}</h3>
                            <div className="cart-item-pricing">
                              <span className="cart-price-now">₹{item.price}</span>
                              {item.originalPrice && (
                                <span className="cart-price-was">₹{item.originalPrice}</span>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cart-del-btn"
                            >
                              🗑 Remove
                            </button>
                          </div>

                          {/* Qty control */}
                          <div className="cart-qty-ctrl">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="cart-qty-btn">−</button>
                            <span className="cart-qty-val">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="cart-qty-btn">+</button>
                          </div>
                        </div>

                        {/* GAM 300x250 Ad Unit after every 4 products in cart */}
                        {showCartInfeedAd && (
                          <GAMAd
                            slotPath={process.env.NEXT_PUBLIC_GAM_CART_INFEED_300x250 || '/6355419/Cart_Infeed_300x250'}
                            width={300}
                            height={250}
                            lazyLoad={true}
                            label={`CART INFEED AD #${Math.ceil((idx + 1) / 4)} (300×250)`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Upsells */}
                {upsells.length > 0 && (
                  <div className="cart-upsell-box">
                    <h3 className="cart-upsell-heading">
                      🎁 People Also Loved These
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {upsells.map(p => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          className="cart-upsell-row"
                        >
                          <img src={p.image} alt={p.title} className="cart-upsell-img" />
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <p className="cart-upsell-title">{p.title}</p>
                            <span className="cart-upsell-price">₹{p.price}</span>
                            <span className="cart-upsell-old-price">₹{p.originalPrice}</span>
                          </div>
                          <span className="cart-upsell-badge">View →</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <AdSlot type="banner" seed={32} />
              </div>

              {/* ── RIGHT: Order Summary Card & GAM Ad ── */}
              <div>
                <div className="cart-summary-sticky">
                  <h3 className="summary-title-heading">
                    Price Details ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h3>

                  {[
                    { label: 'Items Total', value: `₹${subtotal}` },
                    { label: 'Delivery', value: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                    { label: 'COD Charge', value: '₹0', green: true },
                  ].map(row => (
                    <div key={row.label} className="summary-info-line">
                      <span>{row.label}</span>
                      <span className={row.green ? 'summary-green-val' : 'summary-dark-val'}>{row.value}</span>
                    </div>
                  ))}

                  <div className="summary-total-line">
                    <span>Total Payable</span>
                    <span className="summary-total-price">₹{total}</span>
                  </div>

                  {/* GAM 300x250 Ad Unit just below Total Payable */}
                  <div style={{ marginTop: 14, marginBottom: 10 }}>
                    <GAMAd
                      slotPath={process.env.NEXT_PUBLIC_GAM_CART_BELOW_TOTAL_300x250 || '/6355419/Cart_Below_Total_300x250'}
                      width={300}
                      height={250}
                      lazyLoad={false}
                      label="CART AD (300×250 BELOW TOTAL PAYABLE)"
                    />
                  </div>

                  <div className="summary-cod-badge">
                    🇮🇳 Cash on Delivery — Pay at doorstep
                  </div>

                  <Link href="/checkout" className="checkout-btn animate-shake">
                    ✅ Secure COD Checkout →
                  </Link>

                  <Link href="/" className="continue-shopping-link">
                    ← Continue Shopping
                  </Link>
                </div>

                <div style={{ marginTop: 20 }}><AdSlot type="sidebar" seed={33} /></div>
              </div>
            </div>

            <AdSlot type="native-grid" seed={34} />
          </>
        )}
      </div>

      {/* Cart Responsive CSS */}
      <style jsx>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
        }

        .cart-item-card {
          background: #fff;
          border: 1.5px solid #e8e5df;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: border-color 0.2s;
        }
        .cart-item-card:hover {
          border-color: #fed7aa;
        }

        .cart-item-img-thumb {
          width: 80px;
          height: 90px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          background: #f5f4f0;
        }

        .cart-item-details {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1c1917;
          line-height: 1.35;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cart-item-pricing {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }

        .cart-price-now {
          font-size: 1.15rem;
          font-weight: 800;
          color: #dc2626;
        }

        .cart-price-was {
          text-decoration: line-through;
          font-size: 0.82rem;
          color: #a8a29e;
        }

        .cart-del-btn {
          background: none;
          border: none;
          color: #dc2626;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0;
          transition: opacity 0.2s;
        }
        .cart-del-btn:hover { opacity: 0.8; }

        .cart-qty-ctrl {
          display: flex;
          align-items: center;
          border: 1.5px solid #e8e5df;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          flex-shrink: 0;
        }

        .cart-qty-btn {
          background: #f5f4f0;
          border: none;
          width: 36px;
          height: 36px;
          font-size: 1.1rem;
          cursor: pointer;
          color: #1c1917;
          transition: background 0.15s;
        }
        .cart-qty-btn:hover { background: #e5e7eb; }

        .cart-qty-val {
          width: 40px;
          text-align: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: #1c1917;
        }

        .cart-upsell-box {
          background: #fffbeb;
          border: 1.5px dashed #fbbf24;
          border-radius: 14px;
          padding: 20px;
          margin-top: 24px;
        }

        .cart-upsell-heading {
          font-size: 0.95rem;
          font-weight: 800;
          color: #92400e;
          margin-bottom: 14px;
        }

        .cart-upsell-row {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e8e5df;
          border-radius: 10px;
          padding: 12px 14px;
          gap: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cart-upsell-row:hover {
          border-color: #f97316;
          transform: translateY(-1px);
        }

        .cart-upsell-img {
          width: 52px;
          height: 52px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .cart-upsell-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1c1917;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-upsell-price {
          font-size: 1rem;
          font-weight: 800;
          color: #dc2626;
        }

        .cart-upsell-old-price {
          font-size: 0.78rem;
          color: #a8a29e;
          text-decoration: line-through;
          margin-left: 6px;
        }

        .cart-upsell-badge {
          flex-shrink: 0;
          font-size: 0.78rem;
          padding: 6px 14px;
          border: 1.5px solid #e8e5df;
          border-radius: 8px;
          color: #57534e;
          font-weight: 600;
          background: #fafaf8;
        }

        .cart-summary-sticky {
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

        .summary-info-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.9rem;
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
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.78rem;
          color: #065f46;
          font-weight: 600;
          margin-top: 16px;
          text-align: center;
        }

        .continue-shopping-link {
          display: block;
          text-align: center;
          font-size: 0.85rem;
          color: #f97316;
          margin-top: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        .continue-shopping-link:hover { text-decoration: underline; }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cart-summary-sticky {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cart-item-card {
            padding: 12px 14px;
            gap: 12px;
            flex-wrap: wrap;
          }
          .cart-item-img-thumb {
            width: 64px;
            height: 74px;
          }
          .cart-qty-ctrl {
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
}
