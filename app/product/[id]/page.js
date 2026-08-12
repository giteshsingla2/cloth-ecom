'use client';
import React, { use, useState, useEffect } from 'react';
import { getProductById, getProducts } from '../../utils/products';
import { useCart } from '../../context/CartContext';
import AdSlot from '../../components/AdSlot';
import GAMAd from '../../components/GAMAd';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [stockLeft, setStockLeft] = useState(3);
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    setStockLeft(Math.floor(Math.random() * 4) + 2);
    setViewers(Math.floor(Math.random() * 10) + 6);
  }, []);

  useEffect(() => {
    if (product) setSelectedImage(product.image);
  }, [product]);

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 16px' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: 12 }}>Product Not Found</h2>
      <p style={{ color: '#57534e', marginBottom: 20 }}>This item may have sold out. Check our other deals!</p>
      <Link href="/" className="buy-btn" style={{ maxWidth: 200, margin: '0 auto', display: 'flex' }}>← Back to Shop</Link>
    </div>
  );

  const allProducts = getProducts();
  const related = allProducts.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 4);
  const disc = Math.round(100 - (product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({ ...product, title: `${product.title} (Size: ${selectedSize})` }, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, title: `${product.title} (Size: ${selectedSize})` }, quantity, false);
    window.location.href = '/checkout';
  };

  return (
    <div>
      <div className="container" style={{ paddingBottom: 48 }}>
        {/* Breadcrumb */}
        <div style={{ padding: '16px 0 0', fontSize: '0.82rem', color: '#a8a29e', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: '#f97316', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#57534e' }}>{product.category.replace('_', ' ')}</span>
          <span>›</span>
          <span style={{ color: '#1c1917', fontWeight: 500 }}>{product.title.slice(0, 40)}…</span>
        </div>

        {/* Top Ad */}
        <AdSlot type="banner" seed={20} />

        {/* Product Layout */}
        <div className="product-detail-layout">
          {/* Gallery */}
          <div className="gallery-container">
            <div className="main-image-wrapper">
              <img src={selectedImage} alt={product.title} />
            </div>
            <div className="thumbnails-row">
              {product.images.map((img, i) => (
                <button key={i} className={`thumbnail-btn${selectedImage === img ? ' active' : ''}`} onClick={() => setSelectedImage(img)}>
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="detail-category">{product.category.replace('_', ' ')}</p>
            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-badges">
              <span className="detail-badge badge-sale">🔥 {disc}% Discount</span>
              <span className="detail-badge badge-cod">✅ Cash on Delivery</span>
            </div>

            {/* Price Box */}
            <div className="price-box">
              <div className="price-display">
                <span className="price-large">₹{product.price}</span>
                <span className="price-original">₹{product.originalPrice}</span>
                <span className="price-save">You save ₹{product.originalPrice - product.price}!</span>
              </div>
              <p className="price-note">Inclusive of all taxes · Free shipping above ₹99</p>
            </div>

            {/* Stock Alert */}
            <div className="stock-alert">
              <span className="blink-dot"></span>
              🔥 Only {stockLeft} left in stock! {viewers} people viewing this right now.
            </div>

            {/* Size */}
            <div className="option-section">
              <p className="option-title">Select Size (Indian Fit)</p>
              <div className="size-selector">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <button key={s} className={`size-btn${selectedSize === s ? ' active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="option-section">
              <p className="option-title">Quantity</p>
              <div className="quantity-control">
                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <input className="qty-input" value={quantity} readOnly />
                <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Actions & GAM 300x250 Ad just above Add to Cart button */}
            <div className="detail-actions">
              <GAMAd
                slotPath={process.env.NEXT_PUBLIC_GAM_PRODUCT_ABOVE_ADD_TO_CART_300x250 || '/6355419/Product_Above_ATC_300x250'}
                width={300}
                height={250}
                lazyLoad={false}
                label="PRODUCT AD (300×250 ABOVE ADD TO CART)"
              />

              <button className="btn-add-cart animate-shake" onClick={handleAddToCart}>
                🛒 Add to Cart (Get Free Bonus Items!)
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                ⚡ Buy Now — Pay Cash on Delivery
              </button>
            </div>

            {/* Feature Grid */}
            <div className="feature-grid">
              <span className="feature-item">🚚 Free Home Delivery</span>
              <span className="feature-item">💵 Cash on Delivery</span>
              <span className="feature-item">↩️ 7-Day Easy Return</span>
              <span className="feature-item">🇮🇳 Made in India</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="static-content" style={{ marginBottom: 32 }}>
          <h2 style={{ marginTop: 0 }}>📝 Product Description</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
        </div>

        <AdSlot type="banner" seed={21} />

        {/* Related Products */}
        <div style={{ marginTop: 36, borderTop: '2px solid #e8e5df', paddingTop: 28 }}>
          <div className="section-header">
            <h2 className="section-title">You May Also Like</h2>
          </div>
          <div className="products-grid">
            {related.map(item => {
              const d = Math.round(100 - (item.price / item.originalPrice) * 100);
              return (
                <div key={item.id} className="product-card">
                  <span className="sale-badge">{d}% OFF</span>
                  <Link href={`/product/${item.id}`} className="product-img-container" style={{ display: 'block' }}>
                    <img src={item.image} alt={item.title} className="product-card-img" />
                  </Link>
                  <div className="product-info">
                    <p className="product-category">{item.category.replace('_', ' ')}</p>
                    <h4 className="product-title"><Link href={`/product/${item.id}`}>{item.title}</Link></h4>
                    <div className="price-row">
                      <span className="current-price" style={{ fontSize: '1.1rem' }}>₹{item.price}</span>
                      <span className="original-price">₹{item.originalPrice}</span>
                      <Link href={`/product/${item.id}`} className="discount-tag">View →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AdSlot type="native-grid" seed={22} />
      </div>
    </div>
  );
}
