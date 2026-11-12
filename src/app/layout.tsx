import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natsuki (菜月) Scholar — Nền tảng Nghiên cứu Học thuật AI",
  description: "Hệ thống Tiền nghiên cứu & Đọc hiểu Học thuật Khép kín (6 Chức năng MVP)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="font-sans bg-slate-50 text-slate-800 h-screen flex overflow-hidden antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
