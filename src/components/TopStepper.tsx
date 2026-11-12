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
  const steps: { id: ScreenId; label: string }[] = [
    { id: "S1", label: "1. Trang chủ" },
    { id: "S2", label: "2. Sơ đồ từ khóa (F1.1)" },
    { id: "S3", label: "3. Chi tiết từ khóa (F1.2, F1.3)" },
    { id: "S4", label: "4. Đọc bài báo (F2.1)" },
    { id: "S5", label: "5. Khung giải thích (F2.2)" },
    { id: "S6", label: "6. Kho lưu trữ (F2.3)" },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 shrink-0 z-10">
      <div className="flex items-center gap-1.5 text-xs overflow-x-auto py-1">
        {steps.map((step, index) => {
          const isActive = activeScreen === step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onNavigate(step.id)}
                className={`px-3 py-1.5 rounded-lg border font-medium shrink-0 transition ${
                  isActive
                    ? "bg-indigo-600 border-indigo-600 text-white font-semibold shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <span className="text-slate-300 font-semibold">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <button
        onClick={() => onNavigate("S6")}
        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 shrink-0 transition"
      >
        <span>🔖 Kho lưu trữ</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold leading-none">
          {savedCount}
        </span>
      </button>
    </header>
  );
};
