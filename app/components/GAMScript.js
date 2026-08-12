'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GAMScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Load GPT script asynchronously if not already loaded
    if (!document.getElementById('gam-gpt-script')) {
      const script = document.createElement('script');
      script.id = 'gam-gpt-script';
      script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      script.async = true;
      document.head.appendChild(script);
    }

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      const pubads = window.googletag.pubads();

      // Configure GAM settings for high viewability and layout preservation:
      // collapseEmptyDivs(true) preserves ad space when loading, closes div if slot remains unfilled
      pubads.collapseEmptyDivs(true);

      // Enable Lazy Load for high viewability on long pages
      pubads.enableLazyLoad({
        fetchMarginPercent: 200,   // Fetch when within 2 viewports
        renderMarginPercent: 100,  // Render when within 1 viewport
        mobileScaling: 2.0,        // Double margins on mobile
      });

      // Out-of-Page Out-of-Page / Anchor & Interstitial Ad units
      const anchorPath = process.env.NEXT_PUBLIC_GAM_BOTTOM_ANCHOR_1x1 || '/6355419/Bottom_Anchor_1x1';
      const interstitialPath = process.env.NEXT_PUBLIC_GAM_INTERSTITIAL || '/6355419/Interstitial';

      if (window.googletag.enums && window.googletag.enums.OutOfPageFormat) {
        // Define Bottom Anchor Ad (1x1 out of page)
        try {
          window.googletag.defineOutOfPageSlot(anchorPath, window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
        } catch (e) {
          // Slot already defined or non-fatal
        }

        // Define Interstitial Ad
        try {
          window.googletag.defineOutOfPageSlot(interstitialPath, window.googletag.enums.OutOfPageFormat.INTERSTITIAL);
        } catch (e) {
          // Slot already defined or non-fatal
        }
      }

      pubads.enableSingleRequest();
      window.googletag.enableServices();
    });
  }, []);

  // Sitewide page refresh trigger on route change
  useEffect(() => {
    if (window.googletag && window.googletag.cmd) {
      window.googletag.cmd.push(() => {
        if (window.googletag.pubads) {
          window.googletag.pubads().refresh();
        }
      });
    }
  }, [pathname]);

  return null;
}
