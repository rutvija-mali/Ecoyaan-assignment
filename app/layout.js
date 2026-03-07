import { Inter } from "next/font/google";
import { CheckoutProvider } from "@/context/CheckoutContext";
import CheckoutHeader from "@/components/CheckoutHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Ecoyaan — Sustainable Checkout",
  description:
    "Complete your eco-friendly purchase with Ecoyaan. Sustainable products for a greener tomorrow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CheckoutProvider>
          <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="pt-8 sm:pt-10 mb-4 sm:mb-8">
              <CheckoutHeader className="text-center" />
            </div>
            {children}
          </main>
        </CheckoutProvider>
      </body>
    </html>
  );
}
