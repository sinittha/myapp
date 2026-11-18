
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC SHOP | Premium Technology Store",
  description:
    "ร้านค้าอุปกรณ์คอมพิวเตอร์และสินค้าไอที พร้อมราคาพิเศษสำหรับสมาชิก",
  applicationName: "PC SHOP",
  keywords: [
    "PC SHOP",
    "Gaming PC",
    "Notebook",
    "Computer",
    "Technology",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D19",
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
