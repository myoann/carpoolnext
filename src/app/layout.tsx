import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Carpooling",
  description: "Find the best carpooling offers",
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}
