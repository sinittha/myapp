
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Shop | ครบเครื่องเรื่องคอมพิวเตอร์",
  description:
    "ร้านค้าออนไลน์จำหน่ายโน้ตบุ๊ก คอมพิวเตอร์ จอคอม คีย์บอร์ด หูฟัง และอุปกรณ์ไอที",
  keywords: [
    "PC Shop",
    "คอมพิวเตอร์",
    "โน้ตบุ๊ก",
    "อุปกรณ์ไอที",
    "ร้านค้าออนไลน์",
  ],
  applicationName: "PC Shop",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PC Shop",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffc400",
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
