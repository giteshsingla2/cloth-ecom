import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClickbaitModal from "./components/ClickbaitModal";

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
          <Header />
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
