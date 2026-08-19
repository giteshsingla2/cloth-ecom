'use client';
import React, { useEffect, useRef, useState } from 'react';

let globalSlotCounter = 0;

export default function GAMAd({
  slotPath,
  width = 300,
  height = 250,
  lazyLoad = true,
  className = '',
  id: customId,
  label = 'SPONSORED AD (GAM)'
}) {
  const adRef = useRef(null);
  const slotRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [slotId, setSlotId] = useState(customId || '');
  const [isVisible, setIsVisible] = useState(!lazyLoad);

  // Set stable unique slotId on client mount
  useEffect(() => {
    setMounted(true);
    if (!customId) {
      globalSlotCounter += 1;
      setSlotId(`gam-ad-slot-${globalSlotCounter}`);
    }
  }, [customId]);

  // IntersectionObserver for custom lazy loading (high viewability)
  useEffect(() => {
    if (!lazyLoad) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' } // Load when within 200px of viewport
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad]);

  // Define and display GAM slot when mounted, visible, and DOM element is ready
  useEffect(() => {
    if (!mounted || !isVisible || !slotPath || !slotId) return;

    window.googletag = window.googletag || { cmd: [] };

    const timer = setTimeout(() => {
      window.googletag.cmd.push(() => {
        const domEl = document.getElementById(slotId);
        if (!domEl) return; // Safely skip if element not in DOM

        try {
          if (!slotRef.current) {
            const slot = window.googletag.defineSlot(
              slotPath,
              [width, height],
              slotId
            );
            if (slot) {
              slot.addService(window.googletag.pubads());
              slotRef.current = slot;
            }
          }
          window.googletag.display(slotId);
        } catch (e) {
          console.error('GAM Ad error:', e);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (slotRef.current && window.googletag && window.googletag.cmd) {
        window.googletag.cmd.push(() => {
          try {
            window.googletag.destroySlots([slotRef.current]);
            slotRef.current = null;
          } catch (e) {}
        });
      }
    };
  }, [mounted, isVisible, slotPath, slotId, width, height]);

  // Dimension styles — preserve space for high viewability
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '16px auto',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };

  const adBoxStyle = {
    width: `${width}px`,
    maxWidth: '100%',
    height: `${height}px`,
    background: '#ffffff',
    border: '1px solid #e7e5e4',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  return (
    <div ref={adRef} className={`gam-ad-wrapper ${className}`} style={containerStyle}>
      <div id={slotId || undefined} style={adBoxStyle}>
        {/* Fallback preview while GAM script loads or if unfilled */}
        <div style={{ textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.8px', marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>
          {width}×{height} Ad Unit
        </div>
        <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 2 }}>
          {slotPath ? slotPath.split('/').pop() : 'GAM Ad'}
        </div>
      </div>
    </div>
  );
}
