"use client";

import React, { useState, useRef, useMemo } from "react";
import { KeywordNode } from "../models/KeywordNode";
import { AcademicPaper } from "../models/AcademicPaper";
import { ResearchTopicData } from "../repositories/ResearchTopicRepository";
import { IconBookOpen, IconArrowRight, IconTree } from "./Icons";

interface InteractiveKeywordTreeProps {
  topic: ResearchTopicData;
  selectedKeywordId?: string;
  selectedPaperId?: string;
  onSelectKeyword: (keyword: KeywordNode) => void;
  onSelectPaper?: (paper: AcademicPaper, keyword: KeywordNode) => void;
}

interface PaperPosition {
  paper: AcademicPaper;
  parentKeyword: KeywordNode;
  x: number;
  y: number;
  centerY: number;
}

interface KeywordPosition {
  node: KeywordNode;
  x: number;
  y: number;
  centerY: number;
  papers: PaperPosition[];
}

/**
 * Bản đồ từ khóa học thuật đa phân cấp tương tác (Swiss Minimalist Academic Tree)
 * Thiết kế tối giản chuẩn hội nghị quốc tế, loại bỏ hoàn toàn emoji và màu mè sặc sỡ.
 * Sử dụng bảng màu đơn sắc Slate/Black/White với độ tương phản cao.
 */
export const InteractiveKeywordTree: React.FC<InteractiveKeywordTreeProps> = ({
  topic,
  selectedKeywordId,
  selectedPaperId,
  onSelectKeyword,
  onSelectPaper,
}) => {
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [hoveredKeywordId, setHoveredKeywordId] = useState<string | null>(null);
  const [hoveredPaperId, setHoveredPaperId] = useState<string | null>(null);

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
    setScale((prev) => Math.min(Math.max(0.55, prev + delta), 1.5));
  };

  const handleResetView = () => {
    setScale(0.85);
    setPan({ x: 0, y: 0 });
  };

  // Huy hiệu chỉ số học thuật chuẩn đơn sắc
  const getRankingBadgeStyle = (ranking: string) => {
    if (ranking.includes("Core A*") || ranking.includes("A*")) {
      return "bg-slate-900 text-white border-slate-900 font-semibold";
    }
    return "bg-slate-100 text-slate-800 border-slate-200 font-medium";
  };

  // ========================================================
  // TỌA ĐỘ ĐA PHÂN CẤP (GEOMETRY COMPUTATION)
  // ========================================================
  const rootPoint = {
    x: 50,
    y: 360,
    width: 270,
    height: 95,
    outX: 320,
    outY: 407,
  };

  const keywordStartX = 440;
  const keywordWidth = 330;
  const keywordHeight = 90;

  const paperStartX = 880;
  const paperWidth = 410;
  const paperHeight = 72;

  const treeLayout: KeywordPosition[] = useMemo(() => {
    const kwConfigs = [
      {
        kwY: 50,
        paperYs: [15, 95, 175], // 3 bài báo
      },
      {
        kwY: 285,
        paperYs: [270, 350], // 2 bài báo
      },
      {
        kwY: 485,
        paperYs: [470, 550], // 2 bài báo
      },
      {
        kwY: 685,
        paperYs: [670, 750], // 2 bài báo
      },
    ];

    return topic.keywords.map((kw, kwIdx) => {
      const cfg = kwConfigs[kwIdx] ?? { kwY: 50 + kwIdx * 200, paperYs: [] };
      const kwCenterY = cfg.kwY + keywordHeight / 2;

      const paperPositions: PaperPosition[] = kw.papers.map((paper, pIdx) => {
        const pY = cfg.paperYs[pIdx] ?? kwCenterY - paperHeight / 2 + pIdx * 80;
        return {
          paper,
          parentKeyword: kw,
          x: paperStartX,
          y: pY,
          centerY: pY + paperHeight / 2,
        };
      });

      return {
        node: kw,
        x: keywordStartX,
        y: cfg.kwY,
        centerY: kwCenterY,
        papers: paperPositions,
      };
    });
  }, [topic.keywords]);

  const isKwActive = (kwId: string) => {
    if (hoveredKeywordId === kwId || selectedKeywordId === kwId) return true;
    if (hoveredPaperId) {
      for (const item of treeLayout) {
        if (item.node.id === kwId && item.papers.some((p) => p.paper.id === hoveredPaperId)) {
          return true;
        }
      }
    }
    return false;
  };

  const isPaperActive = (paperId: string) => {
    return (
      hoveredPaperId === paperId ||
      selectedPaperId === paperId ||
      (hoveredKeywordId !== null &&
        treeLayout
          .find((item) => item.node.id === hoveredKeywordId)
          ?.papers.some((p) => p.paper.id === paperId))
    );
  };

  return (
    <div className="relative w-full h-[710px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs select-none">
      {/* THANH ĐIỀU KHIỂN ZOOM & PAN TỐI GIẢN */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-lg shadow-xs text-xs">
        <button
          onClick={() => handleZoom(0.12)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-700 font-mono transition text-sm"
          title="Phóng to"
        >
          +
        </button>
        <span className="text-xs text-slate-600 w-12 text-center font-mono">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => handleZoom(-0.12)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-700 font-mono transition text-sm"
          title="Thu nhỏ"
        >
          −
        </button>
        <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
        <button
          onClick={handleResetView}
          className="px-2.5 py-1 hover:bg-slate-100 rounded text-xs text-slate-700 font-mono transition"
          title="Đưa về mặc định"
        >
          Căn giữa
        </button>
      </div>

      {/* CHÚ THÍCH TRỰC QUAN ĐƠN SẮC */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs text-slate-600 shadow-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block"></span>
          <span>Đề tài gốc</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block"></span>
          <span>Từ khóa học thuật</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block"></span>
          <span>Bài báo nền tảng</span>
        </div>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500 font-sans">Click vào thẻ bài báo để mở không gian đọc</span>
      </div>

      {/* CANVAS KHÔNG GIAN BẢN ĐỒ CÂY TƯƠNG TÁC */}
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
          className="w-[1360px] h-[840px] relative pointer-events-auto"
        >
          {/* LỚP SVG: VẼ CÁC ĐƯỜNG CONG BEZIER ĐƠN SẮC CHUẨN XÁC */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* 1. Nhánh từ Gốc -> Từ khóa */}
            {treeLayout.map((item) => {
              const active = isKwActive(item.node.id);

              const startX = rootPoint.outX;
              const startY = rootPoint.outY;
              const endX = item.x;
              const endY = item.centerY;

              const deltaX = (endX - startX) * 0.5;
              const pathData = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${
                endX - deltaX
              } ${endY}, ${endX} ${endY}`;

              return (
                <g key={`root-to-kw-${item.node.id}`}>
                  {active && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="5"
                      strokeOpacity="0.15"
                      strokeLinecap="round"
                    />
                  )}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={active ? "#0f172a" : "#cbd5e1"}
                    strokeWidth={active ? "2.5" : "1.5"}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={endX}
                    cy={endY}
                    r={active ? "4" : "3"}
                    fill={active ? "#0f172a" : "#94a3b8"}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* 2. Nhánh từ Từ khóa -> Bài báo */}
            {treeLayout.map((item) => {
              const kwOutX = item.x + keywordWidth;
              const kwOutY = item.centerY;

              return item.papers.map((paperPos) => {
                const paperActive = isPaperActive(paperPos.paper.id);
                const endX = paperPos.x;
                const endY = paperPos.centerY;

                const deltaX = (endX - kwOutX) * 0.5;
                const pathData = `M ${kwOutX} ${kwOutY} C ${kwOutX + deltaX} ${kwOutY}, ${
                  endX - deltaX
                } ${endY}, ${endX} ${endY}`;

                return (
                  <g key={`kw-to-paper-${paperPos.paper.id}`}>
                    {paperActive && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="4"
                        strokeOpacity="0.12"
                        strokeLinecap="round"
                      />
                    )}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={paperActive ? "#0f172a" : "#e2e8f0"}
                      strokeWidth={paperActive ? "2" : "1.25"}
                      strokeDasharray={paperActive ? "none" : "3,3"}
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />
                    <circle
                      cx={endX}
                      cy={endY}
                      r={paperActive ? "3.5" : "2.5"}
                      fill={paperActive ? "#0f172a" : "#cbd5e1"}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              });
            })}

            {/* Điểm neo tại Gốc */}
            <circle
              cx={rootPoint.outX}
              cy={rootPoint.outY}
              r="5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          {/* ======================================================== */}
          {/* CỘT 1 (TRÁI): THẺ GỐC ĐỀ TÀI (MINIMALIST SLATE) */}
          {/* ======================================================== */}
          <div
            style={{
              position: "absolute",
              left: rootPoint.x,
              top: rootPoint.y,
              width: rootPoint.width,
            }}
            className="tree-card z-10 bg-slate-900 text-white rounded-xl p-4 shadow-sm border border-slate-800 transition hover:border-slate-700"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
              <IconTree size={13} className="text-slate-400" />
              <span className="font-mono text-[10px] uppercase tracking-wider">{topic.subDomain}</span>
            </div>
            <h2 className="text-sm font-semibold leading-snug text-white">
              {topic.title}
            </h2>
          </div>

          {/* ======================================================== */}
          {/* CỘT 2 (GIỮA): THẺ TỪ KHÓA HỌC THUẬT */}
          {/* ======================================================== */}
          {treeLayout.map((item) => {
            const kw = item.node;
            const isHovered = hoveredKeywordId === kw.id;
            const isSelected = selectedKeywordId === kw.id;
            const active = isKwActive(kw.id);

            return (
              <div
                key={kw.id}
                style={{
                  position: "absolute",
                  left: item.x,
                  top: item.y,
                  width: keywordWidth,
                  height: keywordHeight,
                }}
                onMouseEnter={() => setHoveredKeywordId(kw.id)}
                onMouseLeave={() => setHoveredKeywordId(null)}
                onClick={() => onSelectKeyword(kw)}
                className={`tree-card z-10 bg-white border ${
                  isSelected
                    ? "border-slate-900 shadow-sm ring-1 ring-slate-900"
                    : active
                    ? "border-slate-700 shadow-xs translate-x-0.5"
                    : "border-slate-200 hover:border-slate-400 shadow-xs"
                } border-l-4 border-l-slate-800 rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-150 group flex flex-col justify-between`}
              >
                {/* Header: Tag định hướng & Số lượng bài báo */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {kw.level}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1 group-hover:text-slate-900 transition">
                    <IconBookOpen size={12} className="text-slate-400" />
                    <span>{kw.papers.length} bài báo</span>
                    <IconArrowRight size={11} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Tiêu đề tiếng Anh & Tiếng Việt */}
                <div>
                  <h3 className="text-[13px] font-semibold text-slate-900 group-hover:text-black truncate leading-tight">
                    {kw.labelEn}
                  </h3>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {kw.labelVi}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ======================================================== */}
          {/* CỘT 3 (PHẢI): THẺ BÀI BÁO NỀN TẢNG (SWISS MINIMALIST) */}
          {/* ======================================================== */}
          {treeLayout.map((item) => {
            return item.papers.map((paperPos) => {
              const paper = paperPos.paper;
              const isHovered = hoveredPaperId === paper.id;
              const isSelected = selectedPaperId === paper.id;
              const active = isPaperActive(paper.id);

              return (
                <div
                  key={`paper-card-${paper.id}`}
                  style={{
                    position: "absolute",
                    left: paperPos.x,
                    top: paperPos.y,
                    width: paperWidth,
                    height: paperHeight,
                  }}
                  onMouseEnter={() => setHoveredPaperId(paper.id)}
                  onMouseLeave={() => setHoveredPaperId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectPaper) {
                      onSelectPaper(paper, item.node);
                    } else {
                      onSelectKeyword(item.node);
                    }
                  }}
                  title={`Mở bài báo: ${paper.title}`}
                  className={`tree-card z-10 bg-white border ${
                    isSelected
                      ? "border-slate-900 shadow-sm ring-1 ring-slate-900"
                      : active
                      ? "border-slate-700 shadow-xs translate-x-1"
                      : "border-slate-200 hover:border-slate-400 shadow-xs"
                  } border-l-[3px] border-l-slate-600 rounded-xl px-3.5 py-2 cursor-pointer transition-all duration-150 group flex flex-col justify-between`}
                >
                  {/* Top row: Ranking & Year */}
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded border truncate ${getRankingBadgeStyle(
                          paper.ranking
                        )}`}
                      >
                        {paper.ranking}
                      </span>
                      <span className="font-mono text-slate-500 truncate text-[10px]">
                        {paper.year}
                      </span>
                    </div>

                    <span className="text-slate-500 font-mono group-hover:text-slate-900 transition flex items-center gap-1 shrink-0">
                      <span>Đọc bài</span>
                      <IconArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  {/* Title & Author */}
                  <div className="mt-0.5">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-black line-clamp-1 leading-snug">
                      {paper.title}
                    </h4>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center justify-between font-mono">
                      <span className="truncate max-w-[280px]">
                        {paper.venue.split(",")[0]} · {paper.authors.split("(")[0]}
                      </span>
                      {paper.citations > 0 && (
                        <span className="text-slate-400 shrink-0 ml-1">
                          Trích dẫn: {paper.citations}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};
