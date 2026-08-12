'use client';
import React, { useState, useEffect } from 'react';
import { getProducts } from './utils/products';
import { useCart } from './context/CartContext';
import AdSlot from './components/AdSlot';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const products = getProducts();
  const { cart } = useCart();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [livePurchase, setLivePurchase] = useState(null);

  const categories = [
    { id: 'all', icon: '🛍️', name: 'All Items' },
    { id: 'co-ord', icon: '🌸', name: 'Co-Ord Sets' },
    { id: 'kurta', icon: '👔', name: "Men's Kurta" },
    { id: 'kids', icon: '👶', name: 'Kids Coats' },
    { id: 'sweater', icon: '🧶', name: 'Sweaters' },
    { id: 'denim', icon: '👖', name: 'Denim Pants' },
    { id: 'sunglasses', icon: '🕶️', name: 'Sunglasses' },
    { id: 'stole', icon: '🧣', name: 'Designer Stoles' },
  ];

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    const t = p.title.toLowerCase();
    if (selectedCategory === 'co-ord') return t.includes('co-ord') || t.includes('blush');
    if (selectedCategory === 'kurta') return t.includes('kurta') || t.includes('ethnic') || t.includes('safari');
    if (selectedCategory === 'kids') return t.includes('kids') || t.includes('coat') || t.includes('princess');
    if (selectedCategory === 'sweater') return t.includes('sweater') || t.includes('knit') || t.includes('chevron') || t.includes('checker');
    if (selectedCategory === 'denim') return t.includes('denim') || t.includes('pants');
    if (selectedCategory === 'sunglasses') return t.includes('sunglasses') || t.includes('glass');
    if (selectedCategory === 'stole') return t.includes('stole') || t.includes('wrap');
    return true;
  });

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Pune', 'Hyderabad', 'Jaipur', 'Lucknow', 'Surat'];
  const names = ['Priya', 'Amit', 'Neha', 'Rahul', 'Sneha', 'Vikram', 'Divya', 'Karan', 'Pooja', 'Rohan'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (products.length > 0) {
        const p = products[Math.floor(Math.random() * products.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        setLivePurchase({ name, city, item: p.title.slice(0, 38) + '…', id: p.id, price: p.price });
        setTimeout(() => setLivePurchase(null), 4500);
      }
    }, 11000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div>
      {/* Hero Banner */}
      <div className="container">
        <div className="hero-banner">
          <div className="hero-eyebrow">🔥 Limited Period Offer</div>
          <h1 className="hero-title">
            India's Biggest Sale —<br />
            Everything Under <span className="price-highlight">₹49</span>
          </h1>
          <p className="hero-sub">Premium fashion for everyone. Pay cash on delivery. No online payment needed.</p>
          <div className="hero-chips">
            <span className="hero-chip">💵 COD Only — Zero Risk</span>
            <span className="hero-chip">🚚 Free Shipping above ₹99</span>
            <span className="hero-chip">↩️ Easy 7-Day Returns</span>
            <span className="hero-chip">🇮🇳 Made in India</span>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="container">
        <AdSlot type="banner" />
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="container" style={{ paddingBottom: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, alignItems: 'start' }} className="home-grid">

          {/* Sidebar */}
          <aside className="home-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card-title">📁 Browse Categories</p>
              <div className="category-sidebar-list">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`cat-btn${selectedCategory === cat.id ? ' active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <AdSlot type="sidebar" />
            <AdSlot type="sidebar" />
          </aside>

          {/* Products */}
          <section>
            <div className="section-header">
              <h2 className="section-title">
                🔥 Hot Deals
                <span className="section-badge">{filteredProducts.length} items</span>
              </h2>
              <p className="countdown-text">Prices reset in <span>04:52</span></p>
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => {
                const disc = Math.round(100 - (product.price / product.originalPrice) * 100);
                return (
                  <div key={product.id} className="product-card">
                    <span className="sale-badge">{disc}% OFF</span>
                    <button className="wishlist-btn" aria-label="Wishlist">♡</button>

                    <Link href={`/product/${product.id}`} className="product-img-container" style={{ display: 'block' }}>
                      <img src={product.image} alt={product.title} className="product-card-img" />
                    </Link>

                    <div className="product-info">
                      <p className="product-category">{product.category.replace('_', ' ')}</p>
                      <h3 className="product-title">
                        <Link href={`/product/${product.id}`}>{product.title}</Link>
                      </h3>
                      <div className="price-row" style={{ flexWrap: 'wrap' }}>
                        <span className="current-price">₹{product.price}</span>
                        <span className="original-price">₹{product.originalPrice}</span>
                        <span className="discount-tag">Save ₹{product.originalPrice - product.price}</span>
                      </div>
                      <div className="card-actions">
                        <Link href={`/product/${product.id}`} className="btn-primary animate-pulse" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                          🛒 View & Buy
                        </Link>
                        <Link href={`/product/${product.id}`} className="btn-outline">Details</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 28 }}>
              <AdSlot type="banner" />
            </div>
          </section>
        </div>

        {/* Native Ad Grid */}
        <AdSlot type="native-grid" />
      </div>

      {/* Live Purchase Alert */}
      {livePurchase && (
        <Link href={`/product/${livePurchase.id}`}>
          <div className="live-purchase-alert">
            <span className="live-alert-dot"></span>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1c1917' }}>🛒 Just Purchased!</p>
              <p style={{ fontSize: '0.75rem', color: '#57534e', marginTop: 2 }}>
                <strong>{livePurchase.name}</strong> from <strong>{livePurchase.city}</strong> bought: {livePurchase.item} at ₹{livePurchase.price}
              </p>
            </div>
          </div>
        </Link>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .home-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
