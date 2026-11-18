
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC SHOP | Professional Technology Store",
  description:
    "ร้านค้าออนไลน์จำหน่ายคอมพิวเตอร์ โน้ตบุ๊ก และอุปกรณ์ไอที พร้อมราคาพิเศษสำหรับสมาชิก",
  applicationName: "PC SHOP",
  keywords: [
    "PC SHOP",
    "คอมพิวเตอร์",
    "โน้ตบุ๊ก",
    "อุปกรณ์ไอที",
    "ร้านค้าออนไลน์",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PC SHOP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#202327",
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
