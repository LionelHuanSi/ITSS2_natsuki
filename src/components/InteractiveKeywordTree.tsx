"use client";

import React, { useRef, useState, useMemo } from "react";
import { KeywordNode } from "@/models/KeywordNode";
import { ResearchTopicData } from "@/repositories/ResearchTopicRepository";
import { IconArrowRight, IconBookOpen } from "@/components/Icons";

interface InteractiveKeywordTreeProps {
  topic: ResearchTopicData;
  selectedKeywordId?: string;
  onSelectKeyword: (node: KeywordNode) => void;
}

export const InteractiveKeywordTree: React.FC<InteractiveKeywordTreeProps> = ({
  topic,
  selectedKeywordId,
  onSelectKeyword,
}) => {
  // Tương tác Zoom & Pan
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Node đang hover để làm sáng đường cong Bezier tương ứng
  const [hoveredKeywordId, setHoveredKeywordId] = useState<string | null>(null);

  // Thu gọn / Mở rộng các nhánh (Collapse / Expand)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Chỉ kích hoạt pan khi bấm vào vùng nền canvas trống
    if ((e.target as HTMLElement).closest(".tree-card")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(0.65, prev + delta), 1.5));
  };

  const handleResetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Định nghĩa màu sắc phân cấp thị giác theo loại từ khóa
  const getLevelStyle = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes("core") || l.includes("cốt lõi")) {
      return {
        borderAccent: "border-l-sky-500",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
        curveColor: "#0284c7",
      };
    }
    if (l.includes("method") || l.includes("phương pháp")) {
      return {
        borderAccent: "border-l-violet-500",
        badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
        curveColor: "#7c3aed",
      };
    }
    return {
      borderAccent: "border-l-amber-500",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      curveColor: "#d97706",
    };
  };

  // Tính toán tọa độ và đường cong Bezier mượt mà (Left-to-Right Horizontal Tree)
  // Root card: Width 270px, Height ~140px, Center Y ~230px
  const rootPoint = { x: 300, y: 230 };
  const leafStartX = 560;
  const leafSpacingY = 160;
  const totalLeaves = topic.keywords.length;

  const leafPositions = useMemo(() => {
    const startY = rootPoint.y - ((totalLeaves - 1) * leafSpacingY) / 2;
    return topic.keywords.map((kw, i) => {
      const y = startY + i * leafSpacingY;
      return {
        node: kw,
        x: leafStartX,
        y: y,
      };
    });
  }, [topic.keywords, totalLeaves, rootPoint.y]);

  return (
    <div className="relative w-full h-[640px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm select-none">
      {/* THANH ĐIỀU KHIỂN ZOOM & PAN (Floating Controls) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-sm text-xs font-mono">
        <button
          onClick={() => handleZoom(0.15)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-700 font-bold transition"
          title="Phóng to (+)"
        >
          +
        </button>
        <span className="text-[11px] text-slate-500 w-10 text-center font-semibold">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => handleZoom(-0.15)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-700 font-bold transition"
          title="Thu nhỏ (-)"
        >
          -
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button
          onClick={handleResetView}
          className="px-2 py-1 hover:bg-slate-100 rounded text-[11px] text-slate-600 transition"
          title="Đưa về mặc định"
        >
          Căn giữa
        </button>
      </div>

      {/* CHỈ BÁO HƯỚNG DẪN */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md border border-slate-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Kéo chuột để di chuyển canvas • Click vào thẻ để xem bài báo</span>
      </div>

      {/* CANVAS KHÔNG GIAN BẢN ĐỒ TƯƠNG TÁC */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]`}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
          className="w-[1100px] h-[640px] relative pointer-events-auto"
        >
          {/* LỚP SVG: VẼ CÁC ĐƯỜNG CONG BEZIER MƯỢT MÀ */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              {/* Hiệu ứng bóng sáng cho đường được chọn */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {!isCollapsed &&
              leafPositions.map((pos) => {
                const isHovered = hoveredKeywordId === pos.node.id;
                const isSelected = selectedKeywordId === pos.node.id;
                const style = getLevelStyle(pos.node.level);

                // Điểm bắt đầu (Gốc bên phải), Điểm kết thúc (Nhánh bên trái)
                const startX = rootPoint.x;
                const startY = rootPoint.y;
                const endX = pos.x;
                const endY = pos.y + 65; // Căn giữa độ cao thẻ nhánh

                // Điểm điều khiển Cubic-Bezier mượt mà
                const deltaX = (endX - startX) * 0.55;
                const pathData = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${
                  endX - deltaX
                } ${endY}, ${endX} ${endY}`;

                return (
                  <g key={`path-${pos.node.id}`}>
                    {/* Đường bóng mờ / Highlight khi di chuột */}
                    {(isHovered || isSelected) && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={style.curveColor}
                        strokeWidth="5"
                        strokeOpacity="0.25"
                        strokeLinecap="round"
                      />
                    )}
                    {/* Đường cong chính */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={
                        isHovered || isSelected
                          ? style.curveColor
                          : "#cbd5e1"
                      }
                      strokeWidth={isHovered || isSelected ? "2.5" : "1.75"}
                      strokeDasharray={pos.node.level.toLowerCase().includes("edge") ? "4 4" : "none"}
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />

                    {/* Điểm neo tại đầu vào thẻ nhánh */}
                    <circle
                      cx={endX}
                      cy={endY}
                      r={isHovered || isSelected ? "4.5" : "3"}
                      fill={isHovered || isSelected ? style.curveColor : "#94a3b8"}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

            {/* Điểm neo xuất phát tại thẻ gốc */}
            <circle
              cx={rootPoint.x}
              cy={rootPoint.y}
              r="5.5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          {/* ======================================================== */}
          {/* CỘT 1 (BÊN TRÁI): NODE GỐC - CHỦ ĐỀ NGHIÊN CỨU */}
          {/* ======================================================== */}
          <div
            style={{
              position: "absolute",
              left: rootPoint.x - 270,
              top: rootPoint.y - 70,
              width: 270,
            }}
            className="tree-card z-10 bg-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-800 transition hover:border-slate-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold px-2 py-0.5 bg-slate-800 rounded">
                Gốc đề tài
              </span>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition"
                title={isCollapsed ? "Mở rộng các nhánh" : "Thu gọn các nhánh"}
              >
                {isCollapsed ? "Mở nhánh +" : "Thu gọn −"}
              </button>
            </div>
            <h2 className="text-sm font-bold leading-snug tracking-tight text-white mb-2">
              {topic.title}
            </h2>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{topic.keywords.length} nhánh từ khóa</span>
              <span className="text-emerald-400 font-medium">• Đã phân giải</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BADGE TRUNG GIAN NỔI TRÊN ĐƯỜNG NHÁNH (LĨNH VỰC) */}
          {/* ======================================================== */}
          <div
            style={{
              position: "absolute",
              left: rootPoint.x + 40,
              top: rootPoint.y - 18,
            }}
            className="z-10 pointer-events-none"
          >
            <span className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-[11px] font-mono font-medium rounded-full shadow-sm whitespace-nowrap">
              Lĩnh vực: {topic.subDomain}
            </span>
          </div>

          {/* ======================================================== */}
          {/* CỘT 2 (BÊN PHẢI): CÁC THẺ TỪ KHÓA HỌC THUẬT (LEAF CARDS) */}
          {/* ======================================================== */}
          {!isCollapsed &&
            leafPositions.map((pos) => {
              const kw = pos.node;
              const isHovered = hoveredKeywordId === kw.id;
              const isSelected = selectedKeywordId === kw.id;
              const style = getLevelStyle(kw.level);

              return (
                <div
                  key={kw.id}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: 380,
                  }}
                  onMouseEnter={() => setHoveredKeywordId(kw.id)}
                  onMouseLeave={() => setHoveredKeywordId(null)}
                  onClick={() => onSelectKeyword(kw)}
                  className={`tree-card z-10 bg-white border ${
                    isSelected
                      ? "border-slate-900 shadow-md ring-2 ring-slate-900/10"
                      : isHovered
                      ? "border-slate-800 shadow-md translate-x-1"
                      : "border-slate-200 hover:border-slate-400 shadow-sm"
                  } ${style.borderAccent} border-l-4 rounded-xl p-4 cursor-pointer transition-all duration-200 group flex flex-col justify-between`}
                >
                  <div>
                    {/* Category Pill & Paper count */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${style.badgeBg}`}
                      >
                        {kw.level}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <IconBookOpen size={12} className="text-slate-400" />
                        <span>{kw.papers.length} bài báo nền tảng</span>
                      </span>
                    </div>

                    {/* Tiêu đề tiếng Anh & Tiếng Việt */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-black leading-snug mb-1">
                      {kw.labelEn}
                    </h3>
                    <div className="text-xs font-medium text-slate-500 mb-2">
                      {kw.labelVi}
                    </div>

                    {/* Mô tả súc tích */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {kw.explanation}
                    </p>
                  </div>

                  {/* Footer hành động */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-900">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Bấm để chọn bài báo
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Chi tiết</span>
                      <IconArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
