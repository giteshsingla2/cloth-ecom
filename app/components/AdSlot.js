'use client';
import React from 'react';
import Link from 'next/link';
import { getProducts } from '../utils/products';

export default function AdSlot({ type = 'banner', className = '' }) {
  const products = getProducts();

  // Get a random product to link the ad to, driving internal traffic
  const getRandomProductLink = () => {
    if (!products.length) return '/';
    const randProd = products[Math.floor(Math.random() * products.length)];
    return `/product/${randProd.id}`;
  };

  const adHeadlines = [
    "🔥 SHOCKING SALE: Why this outfit is listed for only ₹19 today!",
    "⚠️ WARNING: Stock running out for this designer set. View deal now!",
    "❌ She thought it was ₹1499, but it was actually ₹39! Click to check.",
    "💡 Best Kept Secret: The ₹9 ethnic wear that everyone is talking about!",
    "👑 Feel like royalty: Grab this kids fur coat at 95% off before midnight!",
    "🚨 Delhi Fashion Alert: Everything must go under ₹49. See latest arrivals!",
    "📦 Cash on Delivery only! Pay ₹0 online, pay ₹29 at your doorstep!"
  ];

  const getRandomHeadline = () => {
    return adHeadlines[Math.floor(Math.random() * adHeadlines.length)];
  };

  if (type === 'banner') {
    return (
      <div className={`fake-ad-banner ${className}`}>
        <Link href={getRandomProductLink()} className="ad-banner-link">
          <span className="ad-badge">SPONSORED AD</span>
          <div className="ad-banner-content">
            <span className="ad-flash-dot"></span>
            <p className="ad-text">{getRandomHeadline()}</p>
            <button className="ad-btn">CLAIM DEAL &gt;&gt;</button>
          </div>
        </Link>
      </div>
    );
  }

  if (type === 'sidebar') {
    const product = products[Math.floor(Math.random() * products.length)];
    return (
      <div className={`fake-ad-sidebar ${className}`}>
        <div className="ad-header">
          <span className="ad-badge">ADVERTISEMENT</span>
        </div>
        <Link href={`/product/${product.id}`} className="ad-sidebar-link">
          <div className="ad-image-container">
            <img src={product.image} alt="Sponsored Ad" className="ad-sidebar-img" />
            <div className="ad-overlay-badge">95% OFF</div>
          </div>
          <div className="ad-sidebar-body">
            <h4 className="ad-sidebar-title">Bazaar49 Mega Sale</h4>
            <p className="ad-sidebar-text">{product.title.slice(0, 50)}...</p>
            <div className="ad-sidebar-price">
              <span className="old-price">₹{product.originalPrice}</span>
              <span className="new-price">₹{product.price}</span>
            </div>
            <button className="ad-sidebar-btn animate-pulse">BUY NOW (COD)</button>
          </div>
        </Link>
      </div>
    );
  }

  if (type === 'native-grid') {
    // Select 3 random products to make a mini native ad feed
    const items = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
    const nativeHeadlines = [
      "This item is breaking the internet in India right now!",
      "The secret clothing item they don't want you to know is ₹29.",
      "Check out this viral fashion trend of 2026 under ₹49!",
      "Why parents are obsessed with this child coat.",
      "Get the premium designer look for just ₹19.",
      "Is this the cheapest fashion deal in India? Read reviews."
    ];

    return (
      <div className={`fake-ad-native-grid ${className}`}>
        <h3 className="native-ad-grid-title">📰 RECOMMENDED FOR YOU FROM THE WEB</h3>
        <div className="native-ad-grid">
          {items.map((item, idx) => (
            <Link key={item.id} href={`/product/${item.id}`} className="native-ad-card">
              <div className="native-ad-img-wrapper">
                <img src={item.image} alt="Sponsored" />
                <span className="native-ad-tag">Sponsored</span>
              </div>
              <div className="native-ad-info">
                <h4 className="native-ad-headline">{nativeHeadlines[(item.id + idx) % nativeHeadlines.length]}</h4>
                <p className="native-ad-source">FashionTrendsIndia</p>
                <div className="native-ad-action">
                  <span>Price: ₹{item.price}</span>
                  <span className="native-ad-btn">Read More</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
