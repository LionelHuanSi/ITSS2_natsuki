import React from "react";
import { ScreenId } from "./Sidebar";

interface TopStepperProps {
  activeScreen: ScreenId;
  savedCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const TopStepper: React.FC<TopStepperProps> = ({
  activeScreen,
  savedCount,
  onNavigate,
}) => {
  const navItems: { id: ScreenId; label: string }[] = [
    { id: "S1", label: "Tìm kiếm chủ đề" },
    { id: "S2", label: "Bản đồ từ khóa" },
    { id: "S3", label: "Bài báo nền tảng" },
    { id: "S4", label: "Trình đọc tài liệu" },
    { id: "S6", label: "Kho lưu trữ" },
  ];

  const currentTab: ScreenId = activeScreen === "S5" ? "S4" : activeScreen;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 shrink-0 z-10">
      <div className="flex items-center gap-1.5 text-xs overflow-x-auto py-1">
        {navItems.map((item, index) => {
          const isActive = currentTab === item.id;
          return (
            <React.Fragment key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-lg border font-medium shrink-0 transition ${
                  isActive
                    ? "bg-indigo-600 border-indigo-600 text-white font-semibold shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
              {index < navItems.length - 1 && (
                <span className="text-slate-300 font-semibold">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <button
        onClick={() => onNavigate("S6")}
        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 shrink-0 transition"
      >
        <span>🔖 Đã lưu</span>
        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold leading-none">
          {savedCount}
        </span>
      </button>
    </header>
  );
};
