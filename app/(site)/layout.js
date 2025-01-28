import "../globals.css";

import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import Footer from "@/app/(site)/components/footer";
import Navbar from "@/app/(site)/components/global/Navbar/navbar";
import Header from "@/app/(site)/components/header";

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
  description:
    "A personal space, where I write about personal development, business growth, software development learnings or self-improvement",
};

const LiveVisualEditing = dynamic(
  () => import("@/sanity/loader/live-visual-editing")
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📕</text></svg>"
        />
      </head>
      <body
        className={`h-screen w-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {/* Dynamic NavBar from Sanity.io */}
          <Suspense
            fallback={<div className="h-16 animate-pulse bg-gray-100" />}
          >
            <Navbar />
          </Suspense>
          <main className="flex-grow">
            <div className="md:max-w-960px container mx-auto">{children}</div>
          </main>
          <Footer />
          {(await draftMode()).isEnabled && <LiveVisualEditing />}
        </Providers>
      </body>
    </html>
  );
}
