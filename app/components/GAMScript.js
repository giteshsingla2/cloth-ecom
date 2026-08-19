'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Module-level flag: out-of-page slots must only be defined once per page load.
// React Strict Mode double-invokes effects, so a ref alone isn't sufficient.
let outOfPageSlotsInitialized = false;

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

      // Consolidated page-level config using the modern setConfig API:
      //   collapseDiv   → 'ON_NO_FILL'  (collapse slot only when no ad is returned)
      //   lazyLoad      → replaces deprecated pubads.enableLazyLoad()
      //   singleRequest → replaces deprecated pubads.enableSingleRequest()
      window.googletag.setConfig({
        collapseDiv: 'ON_NO_FILL',
        lazyLoad: {
          fetchMarginPercent: 200,   // Fetch when within 2 viewports
          renderMarginPercent: 100,  // Render when within 1 viewport
          mobileScaling: 2.0,        // Double margins on mobile
        },
        singleRequest: true,
      });

      // Out-of-Page / Anchor & Interstitial Ad units.
      // Guard with a module-level flag so these are only defined once —
      // React Strict Mode double-invokes effects which otherwise causes
      // "Format already created on the page" GPT errors.
      if (!outOfPageSlotsInitialized && window.googletag.enums && window.googletag.enums.OutOfPageFormat) {
        outOfPageSlotsInitialized = true;

        const anchorPath = process.env.NEXT_PUBLIC_GAM_BOTTOM_ANCHOR_1x1 || '/6355419/Bottom_Anchor_1x1';
        const interstitialPath = process.env.NEXT_PUBLIC_GAM_INTERSTITIAL || '/6355419/Interstitial';

        // Define Bottom Anchor Ad (1x1 out of page)
        const anchorSlot = window.googletag.defineOutOfPageSlot(
          anchorPath,
          window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
        );
        if (anchorSlot) {
          anchorSlot.addService(window.googletag.pubads());
        }

        // Define Interstitial Ad
        const interstitialSlot = window.googletag.defineOutOfPageSlot(
          interstitialPath,
          window.googletag.enums.OutOfPageFormat.INTERSTITIAL
        );
        if (interstitialSlot) {
          interstitialSlot.addService(window.googletag.pubads());
          window.googletag.display(interstitialSlot);
        }
      }

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
