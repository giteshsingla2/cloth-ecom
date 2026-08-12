'use client';
import React from 'react';
import AdSlot from '../components/AdSlot';

export default function ShippingPolicyPage() {
  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <h1 className="page-title">🚚 Shipping & Delivery Policy</h1>
      <p className="page-subtitle">Standard Shipping rules for all Indian orders</p>

      <AdSlot type="banner" />

      <div className="static-page-layout">
        
        {/* Policy Content */}
        <div className="static-content">
          <h2>Shipping Rates & Delivery Times</h2>
          <p>
            At Bazaar49, we try to dispatch orders as quickly as possible. All orders are packed with care and shipped from our centralized warehouse in New Delhi.
          </p>
          <ul>
            <li><strong>Orders above ₹99:</strong> FREE Shipping (Express Logistics).</li>
            <li><strong>Orders below ₹99:</strong> Flat ₹40 Shipping & handling fee.</li>
          </ul>

          <h2>Delivery Timelines</h2>
          <p>
            Once confirmed, we ship your items within 24 hours. The approximate transit times are:
          </p>
          <ul>
            <li><strong>Metro Cities (Delhi NCR, Mumbai, Bangalore, Pune, Kolkata):</strong> 3-5 Business Days.</li>
            <li><strong>Rest of India (Tier 2 & Tier 3 Cities):</strong> 5-7 Business Days.</li>
            <li><strong>Rural Areas & North-East States:</strong> 7-10 Business Days.</li>
          </ul>

          <h2>Cash on Delivery (COD) Collection</h2>
          <p>
            Please note that since we only accept Cash on Delivery (COD), our logistics partner will collect the exact invoice amount at your doorstep. 
          </p>
          <p>
            - Open-delivery is not permitted (you cannot open the box before handing over the cash to the courier agent). If there are any issues with size or quality, please contact us for returns.
          </p>

          <h2>Tracking Your Shipment</h2>
          <p>
            You will receive an SMS containing a tracking link once your parcel is dispatched. You can track your order status in real time.
          </p>
        </div>

        {/* Sidebar Ads */}
        <aside className="sidebar-section">
          <AdSlot type="sidebar" />
        </aside>

      </div>

      <AdSlot type="native-grid" />
    </div>
  );
}
