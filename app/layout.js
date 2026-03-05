import { Inter } from "next/font/google";
import { CheckoutProvider } from "@/context/CheckoutContext";
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
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
