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
    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
      activeScreen === id
        ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const badgeClass = (id: ScreenId) =>
    `text-xs font-semibold px-2 py-0.5 rounded-md ${
      activeScreen === id
        ? "bg-white/20 text-white"
        : "bg-slate-100 text-slate-500"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex z-20">
      <div>
        {/* Brand Header đồng bộ chiều cao h-16 */}
        <div
          className="h-16 px-5 flex items-center gap-3 border-b border-slate-200 cursor-pointer"
          onClick={() => onNavigate("S1")}
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            🌙
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-slate-900 tracking-tight">
                Natsuki
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                菜月
              </span>
            </div>
            <p className="text-xs text-slate-500">Research Workspace</p>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="p-4 space-y-6">
          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Màn hình dùng chung
            </div>
            <button onClick={() => onNavigate("S1")} className={navBtnClass("S1")}>
              <div className="flex items-center gap-2.5">
                <span>🏠</span>
                <span>1. Trang chủ</span>
              </div>
            </button>
          </div>

          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Solution 1 • Tiền nghiên cứu
            </div>
            <div className="space-y-1">
              <button onClick={() => onNavigate("S2")} className={navBtnClass("S2")}>
                <div className="flex items-center gap-2.5">
                  <span>🗺️</span>
                  <span>2. Sơ đồ từ khóa</span>
                </div>
                <span className={badgeClass("S2")}>F1.1</span>
              </button>
              <button onClick={() => onNavigate("S3")} className={navBtnClass("S3")}>
                <div className="flex items-center gap-2.5">
                  <span>📘</span>
                  <span>3. Chi tiết từ khóa</span>
                </div>
                <span className={badgeClass("S3")}>F1.2•3</span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Solution 2 • Đọc khép kín
            </div>
            <div className="space-y-1">
              <button onClick={() => onNavigate("S4")} className={navBtnClass("S4")}>
                <div className="flex items-center gap-2.5">
                  <span>📖</span>
                  <span>4. Đọc bài báo</span>
                </div>
                <span className={badgeClass("S4")}>F2.1</span>
              </button>
              <button onClick={() => onNavigate("S5")} className={navBtnClass("S5")}>
                <div className="flex items-center gap-2.5">
                  <span>✨</span>
                  <span>5. Khung giải thích</span>
                </div>
                <span className={badgeClass("S5")}>F2.2</span>
              </button>
              <button onClick={() => onNavigate("S6")} className={navBtnClass("S6")}>
                <div className="flex items-center gap-2.5">
                  <span>🗂️</span>
                  <span>6. Kho lưu trữ</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    activeScreen === "S6"
                      ? "bg-white text-indigo-700"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {savedCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
            菜月
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">Nhóm 菜月 (Natsuki)</p>
            <p className="text-xs text-slate-500 truncate">Next.js • OOP Architecture</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
