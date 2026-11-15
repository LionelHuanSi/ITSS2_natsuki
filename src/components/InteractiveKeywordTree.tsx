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
  language?: "vi" | "ja";
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
 * Bản đồ từ khóa học thuật đa phân cấp tương tác (Hierarchical Branching Knowledge Tree)
 * Cấu trúc 3 tầng: Gốc đề tài -> Trụ cột từ khóa học thuật -> Các node bài báo nhánh lá thực thụ.
 * Hiển thị đầy đủ các chỉ số uy tín học thuật: Core A*, SCIE Q1, Impact Factor (IF).
 */
export const InteractiveKeywordTree: React.FC<InteractiveKeywordTreeProps> = ({
  topic,
  selectedKeywordId,
  selectedPaperId,
  language = "vi",
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

  // Màu sắc phân cấp cho từng từ khóa học thuật
  const getKeywordStyle = (index: number) => {
    const palette = [
      {
        borderAccent: "border-l-sky-500",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
        curveColor: "#0284c7",
      },
      {
        borderAccent: "border-l-indigo-500",
        badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
        curveColor: "#6366f1",
      },
      {
        borderAccent: "border-l-purple-500",
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
        curveColor: "#9333ea",
      },
      {
        borderAccent: "border-l-emerald-500",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        curveColor: "#059669",
      },
    ];
    return palette[index % palette.length];
  };

  // Huy hiệu chỉ số học thuật uy tín (Core A*, SCIE Q1, IF)
  const getRankingBadgeStyle = (ranking: string) => {
    if (ranking.includes("Core A*") || ranking.includes("A*")) {
      return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
    }
    if (ranking.includes("IF: 24") || ranking.includes("IF: 12")) {
      return "bg-indigo-50 text-indigo-700 border-indigo-200 font-bold";
    }
    if (ranking.includes("Q1")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
    }
    return "bg-amber-50 text-amber-800 border-amber-200";
  };

  // ========================================================
  // TỌA ĐỘ ĐA PHÂN CẤP (GEOMETRY COMPUTATION)
  // ========================================================
  // Node Gốc: (50, 360), Rộng 270, Tâm trục xuất phát: (320, 407)
  const rootPoint = {
    x: 50,
    y: 360,
    width: 270,
    height: 95,
    outX: 320,
    outY: 407,
  };

  // Cột 2: Từ khóa (X = 440, Rộng 330, Cao 90)
  const keywordStartX = 440;
  const keywordWidth = 330;
  const keywordHeight = 90;

  // Cột 3: Node bài báo thực thụ (X = 880, Rộng 410, Cao 72)
  const paperStartX = 880;
  const paperWidth = 410;
  const paperHeight = 72;

  // Tọa độ Y thủ công chuẩn xác phân bổ 9 bài báo không bao giờ chồng lấn
  const treeLayout: KeywordPosition[] = useMemo(() => {
    // 4 Từ khóa với Y tương ứng
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

  // Kiểm tra liên kết kích hoạt (active path)
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
    <div className="relative w-full h-[710px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm select-none">
      {/* THANH ĐIỀU KHIỂN ZOOM & PAN (Floating Glassmorphism) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200/90 px-2 py-1 rounded-xl shadow-sm text-xs">
        <button
          onClick={() => handleZoom(0.12)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-700 font-bold transition text-sm"
          title={language === "ja" ? "拡大" : "Phóng to"}
        >
          +
        </button>
        <span className="text-xs text-slate-600 w-12 text-center font-medium font-mono">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => handleZoom(-0.12)}
          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-700 font-bold transition text-sm"
          title={language === "ja" ? "縮小" : "Thu nhỏ"}
        >
          −
        </button>
        <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
        <button
          onClick={handleResetView}
          className="px-2.5 py-1 hover:bg-slate-100 rounded-lg text-xs text-slate-700 font-medium transition"
          title={language === "ja" ? "初期位置に戻す" : "Đưa về mặc định"}
        >
          {language === "ja" ? "中央配置" : "Căn giữa"}
        </button>
      </div>

      {/* CHÚ THÍCH TRỰC QUAN (LEGEND BAR Ở GÓC DƯỚI) */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 bg-white/90 backdrop-blur-md border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs text-slate-600 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block"></span>
          <span>{language === "ja" ? "研究テーマ" : "Đề tài gốc"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block"></span>
          <span>{language === "ja" ? "学術専門キーワード" : "Từ khóa học thuật chuyên ngành"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block"></span>
          <span>{language === "ja" ? "基盤論文ノード (Core A* / Q1)" : "Node bài báo nền tảng (Core A* / Q1)"}</span>
        </div>
        <span className="text-slate-400">|</span>
        <span className="text-slate-500 italic">
          {language === "ja" ? "論文カードをクリックして読解スペースを開く" : "Click vào thẻ bài báo để mở trực tiếp không gian đọc"}
        </span>
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
          {/* LỚP SVG: VẼ CÁC ĐƯỜNG CONG BEZIER MƯỢT MÀ TỪ GỐC -> TỪ KHÓA -> BÀI BÁO */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* 1. Các nhánh từ Node Gốc -> Node Từ khóa */}
            {treeLayout.map((item, kwIdx) => {
              const active = isKwActive(item.node.id);
              const style = getKeywordStyle(kwIdx);

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
                      stroke={style.curveColor}
                      strokeWidth="6"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                  )}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={active ? style.curveColor : "#cbd5e1"}
                    strokeWidth={active ? "2.5" : "1.75"}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={endX}
                    cy={endY}
                    r={active ? "4.5" : "3"}
                    fill={active ? style.curveColor : "#94a3b8"}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* 2. Các nhánh từ Node Từ khóa -> Các Node Bài báo nền tảng */}
            {treeLayout.map((item, kwIdx) => {
              const style = getKeywordStyle(kwIdx);
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
                        stroke={style.curveColor}
                        strokeWidth="5"
                        strokeOpacity="0.25"
                        strokeLinecap="round"
                      />
                    )}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={paperActive ? style.curveColor : "#e2e8f0"}
                      strokeWidth={paperActive ? "2.5" : "1.5"}
                      strokeDasharray={paperActive ? "none" : "3,3"}
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />
                    <circle
                      cx={endX}
                      cy={endY}
                      r={paperActive ? "4" : "2.5"}
                      fill={paperActive ? style.curveColor : "#cbd5e1"}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              });
            })}

            {/* Điểm neo xuất phát tại Node Gốc */}
            <circle
              cx={rootPoint.outX}
              cy={rootPoint.outY}
              r="6"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          </svg>

          {/* ======================================================== */}
          {/* CỘT 1 (TRÁI): NODE GỐC ĐỀ TÀI (ĐÃ LOẠI BỎ CHỖ THỪA) */}
          {/* ======================================================== */}
          <div
            style={{
              position: "absolute",
              left: rootPoint.x,
              top: rootPoint.y,
              width: rootPoint.width,
            }}
            className="tree-card z-10 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 transition hover:border-slate-700"
          >
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium mb-1.5">
              <IconTree size={14} />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {language === "ja" && topic.subDomainJa ? topic.subDomainJa : topic.subDomain}
              </span>
            </div>
            <h2 className="text-sm font-semibold leading-snug text-white">
              {language === "ja" && topic.titleJa ? topic.titleJa : topic.title}
            </h2>
          </div>

          {/* ======================================================== */}
          {/* CỘT 2 (GIỮA): CÁC TỪ KHÓA HỌC THUẬT ĐỀ XUẤT CHUẨN XÁC */}
          {/* ======================================================== */}
          {treeLayout.map((item, kwIdx) => {
            const kw = item.node;
            const isHovered = hoveredKeywordId === kw.id;
            const isSelected = selectedKeywordId === kw.id;
            const active = isKwActive(kw.id);
            const style = getKeywordStyle(kwIdx);

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
                    ? "border-slate-900 shadow-md ring-2 ring-slate-900/10"
                    : active
                    ? "border-slate-800 shadow-md translate-x-0.5"
                    : "border-slate-200 hover:border-slate-400 shadow-xs"
                } ${style.borderAccent} border-l-4 rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-200 group flex flex-col justify-between`}
              >
                {/* Header: Direction Tag & Paper Count */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${style.badgeBg}`}
                  >
                    {kw.getLevel(language)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1 group-hover:text-slate-900 transition">
                    <IconBookOpen size={12} className="text-slate-400" />
                    <span>
                      {language === "ja" ? `${kw.papers.length} 本の国際論文` : `${kw.papers.length} bài báo quốc tế`}
                    </span>
                    <IconArrowRight size={11} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Tiêu đề tiếng Anh & Tiếng Việt */}
                <div>
                  <h3 className="text-[13px] font-semibold text-slate-900 group-hover:text-black truncate leading-tight">
                    {kw.labelEn}
                  </h3>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {kw.getLabel(language)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ======================================================== */}
          {/* CỘT 3 (PHẢI): CÁC NODE BÀI BÁO VỚI CHỈ SỐ UY TÍN (CORE A*, Q1, IF) */}
          {/* ======================================================== */}
          {treeLayout.map((item, kwIdx) => {
            const style = getKeywordStyle(kwIdx);

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
                  title={language === "ja" ? `論文を開く: ${paper.title}` : `Click để mở bài báo: ${paper.title}`}
                  className={`tree-card z-10 bg-white/95 backdrop-blur-xs border ${
                    isSelected
                      ? "border-slate-900 shadow-md ring-2 ring-slate-900/15"
                      : active
                      ? "border-slate-800 shadow-md translate-x-1"
                      : "border-slate-200/90 hover:border-slate-400 shadow-xs"
                  } ${style.borderAccent} border-l-[3px] rounded-xl px-3.5 py-2 cursor-pointer transition-all duration-200 group flex flex-col justify-between`}
                >
                  {/* Top row: Prestige Ranking Badge & Action Hint */}
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded border truncate ${getRankingBadgeStyle(
                          paper.ranking
                        )}`}
                      >
                        {paper.getRanking(language)}
                      </span>
                      <span className="font-mono text-slate-500 truncate text-[10px]">
                        {paper.year}
                      </span>
                    </div>

                    <span className="text-slate-500 font-medium group-hover:text-slate-900 transition flex items-center gap-1 font-mono shrink-0">
                      <span>{language === "ja" ? "読む" : "Đọc ngay"}</span>
                      <IconArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  {/* Title & Venue / Author */}
                  <div className="mt-0.5">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-black line-clamp-1 leading-snug">
                      {paper.title}
                    </h4>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center justify-between">
                      <span className="truncate max-w-[280px]">
                        {paper.venue.split(",")[0]} · {paper.authors.split("(")[0]}
                      </span>
                      {paper.citations > 0 && (
                        <span className="font-mono text-slate-400 shrink-0 ml-1">
                          {language === "ja" ? "被引用数:" : "Trích dẫn:"} {paper.citations}
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
