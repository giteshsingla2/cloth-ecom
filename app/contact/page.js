'use client';
import React, { useState } from 'react';
import AdSlot from '../components/AdSlot';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <h1 className="page-title">📞 Contact Support</h1>
      <p className="page-subtitle">We are here to help you with your COD orders</p>

      <AdSlot type="banner" />

      <div className="static-page-layout">
        
        {/* Contact Form & Support Details */}
        <div className="static-content">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#10b981' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>✓ Message Sent Successfully!</h3>
              <p style={{ marginTop: '10px', color: '#9ca3af' }}>Thank you for reaching out. Our customer service team will reply to you within 24 hours.</p>
              <button className="buy-btn" onClick={() => setSubmitted(false)} style={{ maxWidth: '200px', margin: '20px auto 0 auto' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <h2>Send Us a Message</h2>
              <p style={{ marginBottom: '20px', color: '#9ca3af', fontSize: '0.9rem' }}>
                Have questions about your order delivery status? Fill out the form below.
              </p>
              
              <div className="form-group">
                <label htmlFor="contactName">Your Name</label>
                <input 
                  type="text" 
                  id="contactName" 
                  className="form-control" 
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Email Address</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  className="form-control" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">How can we help you? *</label>
                <textarea 
                  id="contactMessage" 
                  className="form-control" 
                  rows="5"
                  placeholder="Enter details of your inquiry or Order ID..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <button type="submit" className="buy-btn" style={{ padding: '12px', fontSize: '1rem', background: 'linear-gradient(135deg, var(--gold), var(--primary))', border: 'none' }}>
                📩 SUBMIT SUPPORT REQUEST
              </button>
            </form>
          )}

          <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h3>🏢 Registered Office Address</h3>
            <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginTop: '6px' }}>
              Bazaar49 Clearance Store Ltd.<br />
              D-12, Okhla Industrial Area, Phase-III,<br />
              New Delhi - 110020, India
            </p>
            <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginTop: '10px' }}>
              📧 <strong>Support Email:</strong> support@bazaar49.in<br />
              📞 <strong>Helpdesk Hotline:</strong> +91 11-4949-0099 (10 AM - 6 PM, Mon-Sat)
            </p>
          </div>
        </div>

        {/* Sidebar Ads */}
        <aside className="sidebar-section">
          <AdSlot type="sidebar" />
          <AdSlot type="sidebar" />
        </aside>

      </div>

      <AdSlot type="native-grid" />
    </div>
  );
}
