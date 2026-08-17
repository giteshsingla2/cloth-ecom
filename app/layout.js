import "./globals.css";
import Script from "next/script";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClickbaitModal from "./components/ClickbaitModal";
import GAMScript from "./components/GAMScript";
import GAMAd from "./components/GAMAd";
import ScrollToTop from "./components/ScrollToTop";

export const metadata = {
  title: "Bazaar49 - India's Biggest ₹49 Fashion Sale!",
  description: "Get beautiful co-ord sets, stylish jackets, cozy kids wear, and accessories at just ₹9 - ₹49! Cash on Delivery only. Huge clearance sale online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2091939331711944');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2091939331711944&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <CartProvider>
          <GAMScript />
          <ScrollToTop />
          <Header />

          {/* Sitewide 300x600 Ad Size just below header */}
          <div className="container" style={{ marginTop: 12, marginBottom: 12 }}>
            <GAMAd
              slotPath={process.env.NEXT_PUBLIC_GAM_SUBHEADER_300x600 || '/6355419/Header_300x600'}
              width={300}
              height={600}
              lazyLoad={false}
              label="SITEWIDE SUBHEADER AD (300×600)"
            />
          </div>

          <main style={{ flexGrow: 1 }}>
            {children}
          </main>

          <ClickbaitModal />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
