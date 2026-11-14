"use client";

import React, { useState, useRef, useMemo } from "react";
import { KeywordNode } from "../models/KeywordNode";
import { ResearchTopicData } from "../repositories/ResearchTopicRepository";
import { IconBookOpen, IconArrowRight, IconTree } from "./Icons";

interface InteractiveKeywordTreeProps {
  topic: ResearchTopicData;
  selectedKeywordId?: string;
  onSelectKeyword: (keyword: KeywordNode) => void;
}

/**
 * Bản đồ từ khóa học thuật dạng cây ngang tương tác (Horizontal Bezier Concept Tree)
 * Thiết kế tối giản, loại bỏ hoàn toàn các vi nhãn rườm rà.
 */
export const InteractiveKeywordTree: React.FC<InteractiveKeywordTreeProps> = ({
  topic,
  selectedKeywordId,
  onSelectKeyword,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredKeywordId, setHoveredKeywordId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
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

  // Màu sắc phân cấp cho từng nhóm phân nhánh
  const getLevelStyle = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes("core")) {
      return {
        borderAccent: "border-l-sky-500",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
        curveColor: "#0284c7",
      };
    }
    if (l.includes("arch")) {
      return {
        borderAccent: "border-l-indigo-500",
        badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
        curveColor: "#6366f1",
      };
    }
    if (l.includes("method")) {
      return {
        borderAccent: "border-l-purple-500",
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
        curveColor: "#9333ea",
      };
    }
    return {
      borderAccent: "border-l-emerald-500",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      curveColor: "#059669",
    };
  };

  // Cấu hình tọa độ cây ngang (Left-to-Right Tree)
  const rootPoint = { x: 310, y: 320 };
  const leafStartX = 550;
  const leafSpacingY = 125;
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
    <div className="relative w-full h-[640px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm select-none">
      {/* THANH ĐIỀU KHIỂN ZOOM & PAN (Floating Glassmorphism) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md border border-slate-200/80 px-2 py-1 rounded-xl shadow-sm text-xs">
        <button
          onClick={() => handleZoom(0.15)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-700 font-bold transition text-sm"
          title="Phóng to"
        >
          +
        </button>
        <span className="text-xs text-slate-600 w-12 text-center font-medium font-mono">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => handleZoom(-0.15)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-700 font-bold transition text-sm"
          title="Thu nhỏ"
        >
          −
        </button>
        <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
        <button
          onClick={handleResetView}
          className="px-2.5 py-1 hover:bg-slate-100 rounded-lg text-xs text-slate-700 font-medium transition"
          title="Đưa về mặc định"
        >
          Căn giữa
        </button>
      </div>

      {/* CANVAS KHÔNG GIAN BẢN ĐỒ */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"
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
            {leafPositions.map((pos) => {
              const isHovered = hoveredKeywordId === pos.node.id;
              const isSelected = selectedKeywordId === pos.node.id;
              const style = getLevelStyle(pos.node.level);

              const startX = rootPoint.x;
              const startY = rootPoint.y;
              const endX = pos.x;
              const endY = pos.y + 44; // Căn giữa độ cao thẻ lá (88px / 2)

              const deltaX = (endX - startX) * 0.55;
              const pathData = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${
                endX - deltaX
              } ${endY}, ${endX} ${endY}`;

              return (
                <g key={`path-${pos.node.id}`}>
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
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHovered || isSelected ? style.curveColor : "#cbd5e1"}
                    strokeWidth={isHovered || isSelected ? "2.5" : "1.75"}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
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

            {/* Điểm neo tại Node gốc */}
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
          {/* CỘT 1 (TRÁI): NODE GỐC ĐỀ TÀI (ROOT NODE) */}
          {/* ======================================================== */}
          <div
            style={{
              position: "absolute",
              left: rootPoint.x - 280,
              top: rootPoint.y - 60,
              width: 280,
            }}
            className="tree-card z-10 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 transition hover:border-slate-700"
          >
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium mb-1.5">
              <IconTree size={13} />
              <span>{topic.subDomain}</span>
            </div>
            <h2 className="text-sm font-semibold leading-snug text-white mb-2">
              {topic.title}
            </h2>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{topic.keywords.length} nhánh học thuật</span>
              <span className="text-emerald-400 font-medium">Sơ đồ đã tối ưu</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CỘT 2 (PHẢI): CÁC THẺ TỪ KHÓA LÁ (LEAF NODES) */}
          {/* ======================================================== */}
          {leafPositions.map((pos) => {
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
                  width: 430,
                  height: 88,
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
                } ${style.borderAccent} border-l-4 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 group flex flex-col justify-between`}
              >
                {/* Header: Level Badge & Paper Count */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${style.badgeBg}`}
                  >
                    {kw.level}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 group-hover:text-slate-900 transition">
                    <IconBookOpen size={13} className="text-slate-400" />
                    <span>{kw.papers.length} bài báo</span>
                    <IconArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Tiêu đề tiếng Anh & Tiếng Việt */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-black truncate leading-tight">
                    {kw.labelEn}
                  </h3>
                  <div className="text-xs text-slate-500 truncate mt-0.5">
                    {kw.labelVi}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
