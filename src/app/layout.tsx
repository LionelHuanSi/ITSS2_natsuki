import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natsuki Scholar — Academic Research Flow Workspace",
  description: "Không gian làm việc nghiên cứu học thuật tập trung (Khám phá từ khóa & Đọc hiểu tại chỗ không mất context)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="font-sans bg-[#fafafa] text-slate-900 h-screen flex overflow-hidden antialiased selection:bg-amber-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
