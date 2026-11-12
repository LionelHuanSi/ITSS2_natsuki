import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="vi">
      <body className="text-slate-800 h-screen flex overflow-hidden selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
