import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClickbaitModal from "./components/ClickbaitModal";
import GAMScript from "./components/GAMScript";
import GAMAd from "./components/GAMAd";

export const metadata = {
  title: "Bazaar49 - India's Biggest ₹49 Fashion Sale!",
  description: "Get beautiful co-ord sets, stylish jackets, cozy kids wear, and accessories at just ₹9 - ₹49! Cash on Delivery only. Huge clearance sale online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <CartProvider>
          <GAMScript />
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
