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
  const steps: { id: ScreenId; label: string; group: "shared" | "sol1" | "sol2" }[] = [
    { id: "S1", label: "1. Trang chủ", group: "shared" },
    { id: "S2", label: "2. Sơ đồ từ khóa (F1.1)", group: "sol1" },
    { id: "S3", label: "3. Chi tiết & Bài báo (F1.2, F1.3)", group: "sol1" },
    { id: "S4", label: "4. Đọc bài báo (F2.1)", group: "sol2" },
    { id: "S5", label: "5. Khung giải thích (F2.2)", group: "sol2" },
    { id: "S6", label: "6. Kho lưu trữ (F2.3)", group: "sol2" },
  ];

  const getPillStyle = (step: (typeof steps)[0]) => {
    if (activeScreen !== step.id) {
      return "border-slate-200 text-slate-600 bg-white hover:bg-slate-50";
    }
    if (step.group === "shared") return "bg-orange-50 border-orange-500 text-orange-700 font-bold";
    if (step.group === "sol1") return "bg-indigo-50 border-indigo-600 text-indigo-700 font-bold";
    return "bg-emerald-50 border-emerald-600 text-emerald-700 font-bold";
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 shrink-0 z-10">
      <div className="flex items-center gap-1.5 text-xs overflow-x-auto py-1">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onNavigate(step.id)}
              className={`px-2.5 py-1.5 rounded-lg border shrink-0 transition ${getPillStyle(step)}`}
            >
              {step.label}
            </button>
            {index < steps.length - 1 && <span className="text-slate-300 font-bold">→</span>}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onNavigate("S6")}
        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition"
      >
        <span>🔖 Đã lưu</span>
        <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs leading-none">
          {savedCount}
        </span>
      </button>
    </header>
  );
};
