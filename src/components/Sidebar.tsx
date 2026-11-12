import React from "react";

export type ScreenId = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

interface SidebarProps {
  activeScreen: ScreenId;
  savedCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  savedCount,
  onNavigate,
}) => {
  const navBtnClass = (id: ScreenId) =>
    `w-full flex items-center justify-between px-3 py-2.5 rounded-r-xl text-sm transition ${
      activeScreen === id
        ? "bg-indigo-50/90 text-indigo-700 border-l-4 border-indigo-600 font-bold"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 hidden md:flex z-20">
      <div>
        <div
          className="h-16 px-6 flex items-center gap-3 border-b border-slate-100 cursor-pointer"
          onClick={() => onNavigate("S1")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <span className="text-lg">🌙</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Natsuki
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                菜月
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Next.js OOP MVP</p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Khởi đầu nghiên cứu
            </div>
            <button onClick={() => onNavigate("S1")} className={navBtnClass("S1")}>
              <div className="flex items-center gap-3">
                <span>🏠</span>
                <span>1. Trang chủ</span>
              </div>
            </button>
          </div>

          <div>
            <div className="px-3 flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Solution 1 • Khám phá
              </span>
            </div>
            <div className="space-y-1">
              <button onClick={() => onNavigate("S2")} className={navBtnClass("S2")}>
                <div className="flex items-center gap-3">
                  <span>🗺️</span>
                  <span>2. Sơ đồ từ khóa</span>
                </div>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  F1.1
                </span>
              </button>
              <button onClick={() => onNavigate("S3")} className={navBtnClass("S3")}>
                <div className="flex items-center gap-3">
                  <span>📘</span>
                  <span>3. Chi tiết từ khóa</span>
                </div>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  F1.2•1.3
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Solution 2 • Đọc sâu
              </span>
            </div>
            <div className="space-y-1">
              <button onClick={() => onNavigate("S4")} className={navBtnClass("S4")}>
                <div className="flex items-center gap-3">
                  <span>📖</span>
                  <span>4. Đọc bài báo</span>
                </div>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  F2.1
                </span>
              </button>
              <button onClick={() => onNavigate("S5")} className={navBtnClass("S5")}>
                <div className="flex items-center gap-3">
                  <span>✨</span>
                  <span>5. Khung giải thích</span>
                </div>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  F2.2
                </span>
              </button>
              <button onClick={() => onNavigate("S6")} className={navBtnClass("S6")}>
                <div className="flex items-center gap-3">
                  <span>🗂️</span>
                  <span>6. Kho lưu trữ</span>
                </div>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {savedCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
            菜月
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">Team 菜月 (Natsuki)</p>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>OOP Architecture</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
