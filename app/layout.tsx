import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "500",
});
const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff",
  variable: "--font-satoshi",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "500",
});

const inter = Inter({
  display: "swap",
  variable: "--inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  applicationName: "eternal-wallet",
  title: "Eternal Wallet",
  description:
    "Upgrade your everyday carry with the Eternal Wallet. Made from genuine, built to last, and designed for modern minimalism",
  icons: "/brand/eternlll.ico",
  keywords: "eternal wallet, eternal, etrnl wallet, etrnl",
  metadataBase: new URL("https://eternal-wallet.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side bot detection
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} antialiased`}
      >
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          theme="colored"
        />

        {children}
      </body>
    </html>
  );
}
