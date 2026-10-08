import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog App",
  description: "A personal blog built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
