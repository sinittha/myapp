
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC SHOP | Technology Store",
  description:
    "ร้านค้าออนไลน์จำหน่ายคอมพิวเตอร์ โน้ตบุ๊ก และอุปกรณ์ไอที",
  applicationName: "PC SHOP",
  keywords: [
    "PC SHOP",
    "Computer",
    "Notebook",
    "Gaming",
    "Technology Store",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101114",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
