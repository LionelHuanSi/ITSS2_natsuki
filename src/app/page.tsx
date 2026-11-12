"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar, ScreenId } from "@/components/Sidebar";
import { TopStepper } from "@/components/TopStepper";
import { ResearchWorkflowService } from "@/services/ResearchWorkflowService";
import { KeywordNode } from "@/models/KeywordNode";
import { AcademicPaper } from "@/models/AcademicPaper";
import { SavedExplanation } from "@/models/SavedExplanation";

export default function NatsukiScholarApp() {
  // Khởi tạo OOP Service
  const workflowService = useMemo(() => new ResearchWorkflowService(), []);

  // State quản lý luồng 6 màn hình (S1 -> S6)
  const [activeScreen, setActiveScreen] = useState<ScreenId>("S1");
  const [topicInput, setTopicInput] = useState<string>(
    "Ứng dụng AI nhận diện bệnh trên lá cây (Computer Vision in Plant Pathology)"
  );
  const [topicKey, setTopicKey] = useState<string>("ai-vision");
  const [s1Error, setS1Error] = useState<string | null>(null);

  const currentTopicData = useMemo(
    () => workflowService.getTopicByKey(topicKey),
    [workflowService, topicKey]
  );

  const [selectedKeyword, setSelectedKeyword] = useState<KeywordNode>(
    () => workflowService.getTopicByKey("ai-vision").keywords[0]
  );
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper>(
    () => workflowService.getTopicByKey("ai-vision").keywords[0].papers[0]
  );

  // State cho Màn hình 5 (Giải thích ngữ cảnh bôi đen - F2.2)
  const [s5Quote, setS5Quote] = useState<string>("");
  const [s5Explanation, setS5Explanation] = useState<string>("");
  const [s5Error, setS5Error] = useState<string | null>(null);

  // State cho Màn hình 6 (Kho lưu trữ - F2.3)
  const [savedList, setSavedList] = useState<SavedExplanation[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setSavedList(workflowService.loadSavedExplanations());
  }, [workflowService]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  // Điều hướng giữa 6 màn hình
  const handleNavigate = (screen: ScreenId) => {
    if (screen === "S5" && !s5Quote) {
      const defaultTerm = Object.keys(selectedPaper.dictionary)[0] || "domain shift";
      const result = workflowService.explainHighlightedText(selectedPaper, defaultTerm);
      if (result.isValid && result.selectedText && result.explanation) {
        setS5Quote(result.selectedText);
        setS5Explanation(result.explanation);
        setS5Error(null);
      }
    }
    setActiveScreen(screen);
  };

  // S1 -> S2: Phân tích chủ đề
  const handleAnalyzeTopic = () => {
    const res = workflowService.analyzeTopic(topicInput, topicKey);
    if (!res.isValid || !res.topicData) {
      setS1Error(res.errorMessage || "Lỗi nhập chủ đề");
      return;
    }
    setS1Error(null);
    setTopicKey(res.topicData.key);
    setSelectedKeyword(res.topicData.keywords[0]);
    setActiveScreen("S2");
  };

  const handleSelectPreset = (preset: "ai-vision" | "llm-rag" | "empty-test") => {
    setS1Error(null);
    if (preset === "ai-vision") {
      setTopicKey("ai-vision");
      setTopicInput("Ứng dụng AI nhận diện bệnh trên lá cây (Computer Vision)");
    } else if (preset === "llm-rag") {
      setTopicKey("llm-rag");
      setTopicInput("Giảm ảo giác cho mô hình ngôn ngữ lớn bằng RAG");
    } else {
      setTopicKey("ai-vision");
      setTopicInput("Nhận diện thối rễ qua ảnh siêu phổ Zero-shot (Chủ đề quá hẹp)");
    }
  };

  // S2 -> S3: Chọn 1 Node từ khóa
  const handleSelectKeywordNode = (node: KeywordNode) => {
    setSelectedKeyword(node);
    setActiveScreen("S3");
  };

  // S3 -> S4: Chọn đọc 1 bài báo nền tảng
  const handleOpenPaper = (paper: AcademicPaper) => {
    setSelectedPaper(paper);
    setS5Quote("");
    setS5Explanation("");
    setS5Error(null);
    setActiveScreen("S4");
  };

  // S4 -> S5: Bôi đen văn bản hoặc bấm vào cụm từ gợi ý
  const handleTextSelection = () => {
    const raw = window.getSelection()?.toString() || "";
    if (!raw.trim()) return;
    triggerExplanation(raw);
  };

  const triggerExplanation = (rawText: string) => {
    const res = workflowService.explainHighlightedText(selectedPaper, rawText);
    if (!res.isValid) {
      setS5Error(res.errorMessage || "Đoạn văn bản chọn quá ngắn");
      setS5Quote("");
      return;
    }
    setS5Error(null);
    setS5Quote(res.selectedText!);
    setS5Explanation(res.explanation!);
    setActiveScreen("S5");
  };

  // S5 -> S6: Lưu giải thích vào Kho lưu trữ
  const handleSaveExplanation = () => {
    if (!s5Quote) return;
    const updated = workflowService.saveExplanation(
      selectedPaper,
      selectedKeyword,
      s5Quote,
      s5Explanation,
      savedList
    );
    setSavedList(updated);
    showToast("✅ Đã lưu giải thích ngữ cảnh vào Kho lưu trữ (Màn hình 6)!");
    setActiveScreen("S6");
  };

  const handleDeleteSaved = (id: string) => {
    const updated = workflowService.deleteExplanation(id, savedList);
    setSavedList(updated);
  };

  return (
    <>
      <Sidebar
        activeScreen={activeScreen}
        savedCount={savedList.length}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopStepper
          activeScreen={activeScreen}
          savedCount={savedList.length}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* =====================================================
                MÀN HÌNH S1: TRANG CHỦ & NHẬP CHỦ ĐỀ
               ===================================================== */}
            {activeScreen === "S1" && (
              <section className="space-y-8">
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 shadow-xl overflow-hidden border border-indigo-500/20">
                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold mb-4">
                      <span>🌙 Natsuki Research AI (チーム：菜月)</span> • <span>Next.js & OOP Architecture</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
                      Bạn đang tìm hiểu chủ đề nghiên cứu nào hôm nay?
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      Nhập mô tả ý tưởng còn mơ hồ bằng tiếng Việt. Hệ thống sẽ phân rã thành{" "}
                      <strong>bản đồ từ khóa học thuật</strong> và đề xuất{" "}
                      <strong>bài báo nền tảng</strong> chuẩn xác.
                    </p>

                    <div className="bg-white rounded-2xl p-2 shadow-2xl border border-white/20">
                      <textarea
                        rows={2}
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="Nhập ý tưởng nghiên cứu... (VD: Ứng dụng AI nhận diện bệnh trên lá cây)"
                        className="w-full px-4 py-2.5 text-slate-800 text-sm sm:text-base focus:outline-none resize-none rounded-xl"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-2 pb-1 border-t border-slate-100">
                        <span className="text-xs text-slate-400">
                          🌐 Chuẩn hóa thuật ngữ học thuật tiếng Anh (IEEE / ACM / Springer)
                        </span>
                        <button
                          onClick={handleAnalyzeTopic}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                        >
                          <span>Phân tích & Tạo Sơ đồ Từ khóa (Sang S2)</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {s1Error && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-rose-200 bg-rose-500/20 border border-rose-400/40 rounded-xl px-4 py-2.5">
                        <span>⚠️</span>
                        <span>{s1Error}</span>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium mr-1">Chủ đề mẫu:</span>
                      <button
                        onClick={() => handleSelectPreset("ai-vision")}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3 py-1.5 rounded-full transition"
                      >
                        🌿 AI nhận diện bệnh lá cây (Computer Vision)
                      </button>
                      <button
                        onClick={() => handleSelectPreset("llm-rag")}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3 py-1.5 rounded-full transition"
                      >
                        🤖 Giảm ảo giác LLM bằng RAG
                      </button>
                      <button
                        onClick={() => setTopicInput("")}
                        className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 px-3 py-1.5 rounded-full transition"
                      >
                        🧪 Xóa trống (Test báo lỗi nhập thiếu)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
                        Solution 1 • Tiền nghiên cứu chủ động
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        F1.1 Sơ đồ từ khóa • F1.2 Giải thích • F1.3 Bài báo nền tảng
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Trang bị bức tranh tổng quan toàn ngành giúp sinh viên chọn đúng tài liệu cần đọc ngay từ đầu.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S2")}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Mở Sơ đồ Từ khóa (S2)</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                        Solution 2 • Đọc & Xử lý khép kín
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        F2.1 Bôi đen • F2.2 Giải thích ngữ cảnh • F2.3 Lưu trữ
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Tích hợp trực tiếp khâu đọc hiểu và lưu trữ tri thức ngay tại điểm đọc nhằm duy trì trạng thái tập trung sâu.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Mở Trình đọc Bài báo (S4)</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                MÀN HÌNH S2: SƠ ĐỒ TỪ KHÓA HỌC THUẬT (F1.1)
               ===================================================== */}
            {activeScreen === "S2" && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Màn hình 2 • Solution 1 • [Chức năng F1.1: Sơ đồ các từ khóa học thuật]
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Bản đồ Từ khóa Học thuật:{" "}
                      <span className="text-indigo-600">{topicInput || currentTopicData.title}</span>
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate("S1")}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    ← Quay lại Trang chủ (S1)
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-orange-50 border-2 border-orange-400 text-orange-950 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm text-center max-w-xl">
                    🎯 Chủ đề gốc: {topicInput || currentTopicData.title}
                  </div>
                  <div className="h-6 w-0.5 bg-indigo-300"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
                    {currentTopicData.keywords.map((kw, idx) => (
                      <div
                        key={kw.id}
                        onClick={() => handleSelectKeywordNode(kw)}
                        className="keyword-node cursor-pointer bg-slate-50/70 hover:bg-indigo-50/50 border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                              Node {idx + 1} • {kw.level}
                            </span>
                            <span className="text-xs text-indigo-700 font-semibold">
                              {kw.papers.length} bài báo nền tảng
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-slate-900 mb-1">{kw.labelEn}</h4>
                          <p className="text-xs font-semibold text-indigo-700 mb-2">{kw.labelVi}</p>
                          <p className="text-xs text-slate-600">{kw.explanation}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-indigo-600">
                          <span>Chọn từ khóa này (Sang Màn hình 3)</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                MÀN HÌNH S3: CHI TIẾT TỪ KHÓA & ĐỀ XUẤT BÀI BÁO (F1.2 & F1.3)
               ===================================================== */}
            {activeScreen === "S3" && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Màn hình 3 • Solution 1 • [Chức năng F1.2 & F1.3]
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      {selectedKeyword.labelEn}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate("S2")}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    ← Đổi từ khóa (Về Sơ đồ S2)
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
                      📘 Chức năng F1.2: Giải thích từ khóa chuyên ngành
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-3">
                      {selectedKeyword.labelVi}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-5">
                      {selectedKeyword.explanation}
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-indigo-100 text-xs text-slate-600">
                      <p className="font-bold text-slate-900 mb-1">💡 Tại sao từ khóa này quan trọng?</p>
                      <p>{selectedKeyword.whyImportant}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
                      📄 Chức năng F1.3: Đề xuất bài báo học thuật nền tảng
                    </div>

                    {!selectedKeyword.hasFoundationalPapers() ? (
                      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
                        <div className="text-3xl mb-2">📭</div>
                        <h4 className="font-bold text-rose-800 text-base mb-1">
                          Không tìm thấy bài báo nền tảng phù hợp!
                        </h4>
                        <p className="text-xs text-rose-600 mb-4">
                          Từ khóa <strong>&ldquo;{selectedKeyword.labelEn}&rdquo;</strong> có phạm vi quá hẹp. Vui lòng quay lại Sơ đồ (Màn hình 2) để chọn nhánh từ khóa khác.
                        </p>
                        <button
                          onClick={() => handleNavigate("S2")}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                        >
                          ← Quay lại Sơ đồ chọn từ khóa khác (S2)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedKeyword.papers.map((paper) => (
                          <div
                            key={paper.id}
                            className="border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 bg-white shadow-sm transition"
                          >
                            <span className="inline-block text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded mb-2">
                              {paper.venue} • {paper.year}
                            </span>
                            <h4 className="font-bold text-base text-slate-900 mb-1">
                              {paper.title}
                            </h4>
                            <p className="text-xs text-slate-500 mb-3">Tác giả: {paper.authors}</p>
                            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                              <strong>Mức độ liên quan:</strong> {paper.relevance}
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleOpenPaper(paper)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                              >
                                📖 Chọn đọc bài báo này (Sang Màn hình 4) →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                MÀN HÌNH S4 & S5: ĐỌC BÀI BÁO & GIẢI THÍCH NGỮ CẢNH (F2.1 & F2.2)
               ===================================================== */}
            {(activeScreen === "S4" || activeScreen === "S5") && (
              <section className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
                      Màn hình 4 & 5 • Solution 2 • [Chức năng F2.1 & F2.2]
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {selectedPaper.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {selectedPaper.authors} • {selectedPaper.venue} ({selectedPaper.year})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate("S3")}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                    >
                      ← Đổi bài báo (Về S3)
                    </button>
                    <button
                      onClick={() => handleNavigate("S6")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                    >
                      🗂️ Kho lưu trữ (S6) →
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-xs text-amber-950 flex items-center justify-between">
                  <div>
                    🖍️ <strong>Hướng dẫn (F2.1):</strong> Dùng chuột <strong>bôi đen (highlight)</strong> bất kỳ đoạn văn nào bên dưới (hoặc bấm nhanh vào các nút thuật ngữ gợi ý) để mở <strong>Màn hình 5: Khung giải thích ngữ cảnh (F2.2)</strong>.
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-700">
                        📄 Màn hình 4 (F2.1): Nội dung Bài báo Gốc
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.keys(selectedPaper.dictionary).map((term) => (
                          <button
                            key={term}
                            onClick={() => triggerExplanation(term)}
                            className="highlight-hint text-xs"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-[#fcfbf9]">
                      <article
                        onMouseUp={handleTextSelection}
                        className="font-serif-paper text-slate-900 leading-8 text-[17px] select-text space-y-5"
                      >
                        {selectedPaper.paragraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </article>
                    </div>
                  </div>

                  <div className="lg:col-span-5 sticky top-6">
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                      {!s5Quote && !s5Error && (
                        <div className="text-center py-10 px-4">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xl mx-auto mb-3">
                            ✨
                          </div>
                          <h3 className="font-bold text-slate-800 text-sm mb-1">
                            Màn hình 5: Khung Giải thích Ngữ cảnh (F2.2)
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Hãy bôi đen một đoạn văn bản ở bài báo bên trái (hoặc bấm vào các thuật ngữ tô vàng) để xem giải thích chuyên sâu ngay tại điểm đọc.
                          </p>
                        </div>
                      )}

                      {s5Error && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-700">
                          <p className="font-bold mb-1">⚠️ Đoạn văn bản chọn quá ngắn!</p>
                          <p>{s5Error}</p>
                        </div>
                      )}

                      {s5Quote && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                              🟢 Màn hình 5 (F2.2) • Giải thích Ngữ cảnh
                            </span>
                            <button
                              onClick={() => {
                                setS5Quote("");
                                setActiveScreen("S4");
                              }}
                              className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                            >
                              ✕ Đóng (Về S4)
                            </button>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-slate-400 uppercase">
                              Đoạn văn bản đã bôi đen:
                            </span>
                            <blockquote className="mt-1.5 p-3.5 bg-amber-50/80 border-l-4 border-amber-400 text-slate-900 text-xs italic rounded-r-xl font-serif-paper">
                              &ldquo;{s5Quote}&rdquo;
                            </blockquote>
                          </div>

                          <div>
                            <span className="text-xs font-bold text-emerald-700 uppercase">
                              Giải thích theo ngữ cảnh chuyên ngành:
                            </span>
                            <div className="mt-1.5 p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 leading-relaxed">
                              {s5Explanation}
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <button
                              onClick={handleSaveExplanation}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition"
                            >
                              💾 Lưu vào Kho lưu trữ (Sang S6) →
                            </button>
                            <button
                              onClick={() => {
                                setS5Quote("");
                                setActiveScreen("S4");
                              }}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                MÀN HÌNH S6: KHO LƯU TRỮ NGỮ CẢNH ĐÃ GIẢI THÍCH (F2.3)
               ===================================================== */}
            {activeScreen === "S6" && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Màn hình 6 • Solution 2 • [Chức năng F2.3: Lưu trữ giải thích của ngữ cảnh đã bôi đen]
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Kho Lưu trữ Tri thức & Ngữ cảnh Đã bôi đen
                    </h2>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                    >
                      ← Đọc tiếp bài báo (Về S4)
                    </button>
                    <button
                      onClick={() => handleNavigate("S1")}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                    >
                      🏠 Về Trang chủ (S1)
                    </button>
                  </div>
                </div>

                {savedList.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="font-bold text-slate-700 mb-1">Kho lưu trữ đang trống</p>
                    <p className="text-xs text-slate-500 mb-4">
                      Hãy quay lại Màn hình 4, bôi đen văn bản và nhấn Lưu giải thích ở Màn hình 5.
                    </p>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      ← Quay lại đọc bài báo (S4)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedList.map((item) => (
                      <div
                        key={item.id}
                        className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-5 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                              📄 {item.paperTitle}
                            </span>
                            <span className="text-xs text-slate-400">• {item.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleNavigate("S4")}
                              className="text-xs font-bold text-emerald-700 hover:underline"
                            >
                              Đọc tiếp bài này →
                            </button>
                            <button
                              onClick={() => handleDeleteSaved(item.id)}
                              className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                        <blockquote className="p-3 bg-amber-50 border-l-4 border-amber-400 text-xs italic text-slate-800 rounded-r-xl mb-3 font-serif-paper">
                          &ldquo;{item.selectedText}&rdquo;
                        </blockquote>
                        <div className="text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                          <strong className="text-emerald-800">Giải thích ngữ cảnh:</strong>{" "}
                          {item.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </main>
      </div>

      {toastMsg && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl z-50">
          {toastMsg}
        </div>
      )}
    </>
  );
}
