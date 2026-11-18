import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC SHOP | Premium Computer Store",
  description: "ร้านจำหน่ายคอมพิวเตอร์และอุปกรณ์ไอที",
};

export const viewport: Viewport = {
  themeColor: "#080a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}