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
  const navBtnClass = (isActive: boolean) =>
    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex z-20">
      <div>
        {/* Brand Logo */}
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
                Natsuki Scholar
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                菜月
              </span>
            </div>
            <p className="text-xs text-slate-500">Academic AI Workspace</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-6">
          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tổng quan
            </div>
            <button
              onClick={() => onNavigate("S1")}
              className={navBtnClass(activeScreen === "S1")}
            >
              <div className="flex items-center gap-2.5">
                <span>🏠</span>
                <span>Trang chủ</span>
              </div>
            </button>
          </div>

          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Định hướng đề tài
            </div>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate("S2")}
                className={navBtnClass(activeScreen === "S2")}
              >
                <div className="flex items-center gap-2.5">
                  <span>🗺️</span>
                  <span>Bản đồ từ khóa</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate("S3")}
                className={navBtnClass(activeScreen === "S3")}
              >
                <div className="flex items-center gap-2.5">
                  <span>📘</span>
                  <span>Tài liệu nền tảng</span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Không gian đọc
            </div>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate("S4")}
                className={navBtnClass(activeScreen === "S4" || activeScreen === "S5")}
              >
                <div className="flex items-center gap-2.5">
                  <span>📖</span>
                  <span>Đọc bài báo</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate("S6")}
                className={navBtnClass(activeScreen === "S6")}
              >
                <div className="flex items-center gap-2.5">
                  <span>🔖</span>
                  <span>Ghi chú đã lưu</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    activeScreen === "S6"
                      ? "bg-white text-indigo-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {savedCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
            菜月
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">Nhóm 菜月 (Natsuki)</p>
            <p className="text-xs text-emerald-600 font-medium truncate">● Trực tuyến</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
