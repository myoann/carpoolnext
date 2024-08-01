import { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import Header from "@/components/Header";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Carpooling",
  description: "Find the best carpooling offers",
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}

        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY || "AIzaSyBheqU19NlGAxM4YuNRkyPvS-4r8qFf8As"}&libraries=places&callback=Function.prototype`}
        />
      </body>
    </html>
  );
}
