'use client';
import React from 'react';
import AdSlot from '../components/AdSlot';

export default function RefundPolicyPage() {
  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <h1 className="page-title">↩️ Return & Refund Policy</h1>
      <p className="page-subtitle">Hassle-free 7-day refund guarantee for our customers</p>

      <AdSlot type="banner" />

      <div className="static-page-layout">
        
        {/* Policy Content */}
        <div className="static-content">
          <h2>7-Day Easy Return Policy</h2>
          <p>
            At Bazaar49, customer satisfaction is our top priority. If you are not satisfied with your purchase, you can raise a return or replacement request within <strong>7 days</strong> of delivery.
          </p>
          
          <h2>Eligible Products for Return</h2>
          <p>
            To receive a full refund, items must satisfy the following conditions:
          </p>
          <ul>
            <li>The item must be unused, unwashed, and in the same condition as received.</li>
            <li>All tags, barcodes, and original brand packaging must be intact.</li>
            <li>No visible damage, spots, or tears on the fabric.</li>
          </ul>

          <h2>How Will I Get My Refund?</h2>
          <p>
            Since we only accept Cash on Delivery (COD) payments, we cannot refund the amount back to a card automatically. Instead, we refund you via:
          </p>
          <ol>
            <li><strong>Bank Transfer:</strong> Provide your Account Number and IFSC Code, and we will transfer the refund within 48 hours of item verification.</li>
            <li><strong>UPI Transfer:</strong> Share your UPI ID (e.g. UPI address) for instant payments.</li>
            <li><strong>Bazaar49 Store Credits:</strong> Get a discount voucher of the exact value to spend on your next shopping spree (valid for 1 year).</li>
          </ol>

          <h2>How to Raise a Return Request?</h2>
          <p>
            Simply email us at <strong>support@bazaar49.in</strong> with your Order ID, images of the product, and details of why you want a return. Our pickup agent will collect the item from your house in 2-3 business days.
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
