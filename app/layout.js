import "./globals.css";

import localFont from "next/font/local";

import Providers from "./components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Andy Farmer - Growth Quotient",
  description: "A personal space, where I write about personal development, business growth, software development learnings or self-improvement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
				<Providers>

        {children}
				</Providers>
      </body>
    </html>
  );
}
