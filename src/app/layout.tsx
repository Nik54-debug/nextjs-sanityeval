import type { Metadata } from "next";
//import { SanityLive } from "@/sanity/live";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanity With Next App",
  description: "This is my first Sanity CMS & NEXTJS project",
};

import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/*<SanityLive />*/}
      </body>
    </html>
  );
}
