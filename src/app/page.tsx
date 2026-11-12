"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sidebar, ScreenId } from "@/components/Sidebar";
import { TopStepper } from "@/components/TopStepper";
import { ResearchWorkflowService } from "@/services/ResearchWorkflowService";
import { KeywordNode } from "@/models/KeywordNode";
import { AcademicPaper } from "@/models/AcademicPaper";
import { SavedExplanation } from "@/models/SavedExplanation";

export default function NatsukiScholarApp() {
  const workflowService = useMemo(() => new ResearchWorkflowService(), []);

  const [activeScreen, setActiveScreen] = useState<ScreenId>("S1");
  const [topicInput, setTopicInput] = useState<string>(
    "Ứng dụng AI nhận diện bệnh trên lá cây"
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

  const [s5Quote, setS5Quote] = useState<string>("");
  const [s5Explanation, setS5Explanation] = useState<string>("");
  const [s5Error, setS5Error] = useState<string | null>(null);

  const [savedList, setSavedList] = useState<SavedExplanation[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setSavedList(workflowService.loadSavedExplanations());
  }, [workflowService]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
  };

  const handleAnalyzeTopic = () => {
    const res = workflowService.analyzeTopic(topicInput, topicKey);
    if (!res.isValid || !res.topicData) {
      setS1Error(res.errorMessage || "Vui lòng nhập chủ đề nghiên cứu");
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
      setTopicInput("Ứng dụng AI nhận diện bệnh trên lá cây");
    } else if (preset === "llm-rag") {
      setTopicKey("llm-rag");
      setTopicInput("Giảm ảo giác cho mô hình ngôn ngữ lớn bằng RAG");
    } else {
      setTopicKey("ai-vision");
      setTopicInput("Nhận diện thối rễ qua ảnh siêu phổ Zero-shot");
    }
  };

  const handleSelectKeywordNode = (node: KeywordNode) => {
    setSelectedKeyword(node);
    setActiveScreen("S3");
  };

  const handleOpenPaper = (paper: AcademicPaper) => {
    setSelectedPaper(paper);
    setS5Quote("");
    setS5Explanation("");
    setS5Error(null);
    setActiveScreen("S4");
  };

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
    showToast("✅ Đã lưu giải thích vào Kho lưu trữ!");
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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        <TopStepper
          activeScreen={activeScreen}
          savedCount={savedList.length}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* TRANG CHỦ */}
            {activeScreen === "S1" && (
              <section className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <div className="border-b border-slate-100 pb-5 mb-6">
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Trợ lý Nghiên cứu Học thuật AI
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900">
                      Khám phá từ khóa chuyên ngành & Tài liệu nền tảng
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      Mô tả chủ đề hoặc câu hỏi nghiên cứu của bạn bằng tiếng Việt để nhận bản đồ các thuật ngữ tiếng Anh chính xác và gợi ý bài báo uy tín.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Chủ đề nghiên cứu bạn đang quan tâm:
                      </label>
                      <textarea
                        rows={3}
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="Nhập ý tưởng hoặc chủ đề nghiên cứu..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                      />

                      {s1Error && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                          <span>⚠️</span>
                          <span>{s1Error}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                        Chủ đề gợi ý:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleSelectPreset("ai-vision")}
                          className="text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🌿 Ứng dụng AI nhận diện bệnh trên lá cây
                        </button>
                        <button
                          onClick={() => handleSelectPreset("llm-rag")}
                          className="text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🤖 Giảm ảo giác cho mô hình ngôn ngữ lớn bằng RAG
                        </button>
                        <button
                          onClick={() => handleSelectPreset("empty-test")}
                          className="text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🔬 Nhận diện thối rễ qua ảnh siêu phổ Zero-shot
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                      <button
                        onClick={handleAnalyzeTopic}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition flex items-center gap-2"
                      >
                        <span>Phân tích chủ đề</span>
                        <span>→</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleNavigate("S4")}
                          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                        >
                          📖 Tiếp tục đọc bài báo
                        </button>
                        <button
                          onClick={() => handleNavigate("S6")}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                        >
                          🔖 Xem ghi chú đã lưu ({savedList.length})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
                        Định hướng nghiên cứu
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        Hệ thống hóa từ khóa chuyên ngành
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Cung cấp bức tranh tổng quan các thuật ngữ học thuật cốt lõi kèm theo định nghĩa và danh sách bài báo nền tảng đáng tin cậy.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S2")}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Mở bản đồ từ khóa</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                        Đọc sâu & Ghi chú
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        Giải thích thuật ngữ ngay tại điểm đọc
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Bôi đen bất kỳ đoạn văn bản tiếng Anh nào trong bài báo để xem giải thích theo đúng ngữ cảnh chuyên môn mà không cần chuyển đổi công cụ.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Mở trình đọc tài liệu</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* BẢN ĐỒ TỪ KHÓA */}
            {activeScreen === "S2" && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Bản đồ Khái niệm & Thuật ngữ
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Các hướng nghiên cứu & Từ khóa liên quan
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Chọn một từ khóa chuyên ngành bên dưới để xem giải thích chi tiết và các bài báo nền tảng.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate("S1")}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    ← Đổi chủ đề
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-950 px-5 py-3 rounded-xl font-semibold text-sm text-center max-w-2xl">
                    🎯 Chủ đề: {topicInput || currentTopicData.title}
                  </div>
                  <div className="h-6 w-0.5 bg-indigo-200"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {currentTopicData.keywords.map((kw) => (
                      <div
                        key={kw.id}
                        onClick={() => handleSelectKeywordNode(kw)}
                        className="keyword-node cursor-pointer bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-600 text-white">
                              {kw.level}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {kw.papers.length} bài báo
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-slate-900 mb-1">{kw.labelEn}</h3>
                          <p className="text-xs font-semibold text-indigo-600 mb-2">{kw.labelVi}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{kw.explanation}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                          <span>Khám phá từ khóa & tài liệu</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CHI TIẾT TỪ KHÓA & BÀI BÁO NỀN TẢNG */}
            {activeScreen === "S3" && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Chi tiết Thuật ngữ & Tài liệu Nền tảng
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedKeyword.labelEn}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{selectedKeyword.labelVi}</p>
                  </div>
                  <button
                    onClick={() => handleNavigate("S2")}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    ← Quay lại bản đồ từ khóa
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                      📘 Định nghĩa chuyên ngành
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {selectedKeyword.labelVi}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {selectedKeyword.explanation}
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      <p className="font-bold text-slate-900 mb-1">💡 Ý nghĩa trong nghiên cứu:</p>
                      <p>{selectedKeyword.whyImportant}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
                      📄 Bài báo học thuật nền tảng được đề xuất
                    </div>

                    {!selectedKeyword.hasFoundationalPapers() ? (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
                        <div className="text-2xl mb-2">📭</div>
                        <h4 className="font-bold text-rose-800 text-base mb-1">
                          Chưa có bài báo nền tảng phù hợp
                        </h4>
                        <p className="text-sm text-rose-600 mb-4">
                          Từ khóa <strong>&ldquo;{selectedKeyword.labelEn}&rdquo;</strong> có phạm vi quá hẹp. Bạn hãy quay lại bản đồ để chọn một nhánh từ khóa khác phổ biến hơn.
                        </p>
                        <button
                          onClick={() => handleNavigate("S2")}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                        >
                          ← Chọn từ khóa khác
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedKeyword.papers.map((paper) => (
                          <div
                            key={paper.id}
                            className="border border-slate-200 hover:border-indigo-300 rounded-xl p-5 bg-white shadow-sm transition"
                          >
                            <span className="inline-block text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md mb-2">
                              {paper.venue} • {paper.year}
                            </span>
                            <h4 className="font-bold text-base text-slate-900 mb-1">
                              {paper.title}
                            </h4>
                            <p className="text-xs text-slate-500 mb-3">Tác giả: {paper.authors}</p>
                            <p className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
                              <strong className="text-slate-800">Tóm tắt giá trị:</strong> {paper.relevance}
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleOpenPaper(paper)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
                              >
                                📖 Đọc bài báo này →
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

            {/* TRÌNH ĐỌC BÀI BÁO & GIẢI THÍCH NGỮ CẢNH */}
            {(activeScreen === "S4" || activeScreen === "S5") && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Không gian Đọc & Phân tích Tài liệu
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedPaper.title}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedPaper.authors} • {selectedPaper.venue} ({selectedPaper.year})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate("S3")}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                    >
                      ← Danh sách bài báo
                    </button>
                    <button
                      onClick={() => handleNavigate("S6")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      🔖 Ghi chú đã lưu ({savedList.length})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Cột trái: Nội dung bài báo */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-white border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-700">
                        📄 Nội dung bài báo
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-slate-400">Thuật ngữ nổi bật:</span>
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
                    <div className="p-6">
                      <article
                        onMouseUp={handleTextSelection}
                        className="text-slate-800 leading-7 text-base select-text space-y-4"
                      >
                        {selectedPaper.paragraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </article>
                    </div>
                  </div>

                  {/* Cột phải: Khung giải thích ngữ cảnh */}
                  <div className="lg:col-span-5 sticky top-6">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      {!s5Quote && !s5Error && (
                        <div className="text-center py-10 px-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-lg mx-auto mb-3">
                            ✨
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm mb-1">
                            Trợ lý Giải thích Ngữ cảnh
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Hãy bôi đen bất kỳ đoạn văn bản tiếng Anh nào bên trái (hoặc nhấp vào các thuật ngữ nổi bật) để xem giải thích chuyên sâu theo đúng ngữ cảnh bài báo.
                          </p>
                        </div>
                      )}

                      {s5Error && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-700">
                          <p className="font-bold mb-1">⚠️ Đoạn văn bản chọn quá ngắn</p>
                          <p>{s5Error}</p>
                        </div>
                      )}

                      {s5Quote && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                              ✨ Giải thích theo ngữ cảnh
                            </span>
                            <button
                              onClick={() => {
                                setS5Quote("");
                                setActiveScreen("S4");
                              }}
                              className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                            >
                              ✕ Đóng
                            </button>
                          </div>

                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase">
                              Đoạn trích dẫn:
                            </span>
                            <blockquote className="mt-1.5 p-3.5 bg-amber-50 border-l-4 border-amber-400 text-slate-800 text-sm italic rounded-r-xl">
                              &ldquo;{s5Quote}&rdquo;
                            </blockquote>
                          </div>

                          <div>
                            <span className="text-xs font-semibold text-emerald-700 uppercase">
                              Giải thích chuyên môn:
                            </span>
                            <div className="mt-1.5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 leading-relaxed">
                              {s5Explanation}
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <button
                              onClick={handleSaveExplanation}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-sm transition"
                            >
                              🔖 Lưu vào kho ghi chú
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

            {/* KHO LƯU TRỮ GHI CHÚ */}
            {activeScreen === "S6" && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Kho Lưu trữ Cá nhân
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Ghi chú & Giải thích Ngữ cảnh Đã lưu
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Tổng hợp các đoạn trích dẫn và giải thích chuyên ngành bạn đã đánh dấu trong quá trình đọc tài liệu.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      ← Tiếp tục đọc bài báo
                    </button>
                    <button
                      onClick={() => handleNavigate("S1")}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                    >
                      🏠 Trang chủ
                    </button>
                  </div>
                </div>

                {savedList.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="font-bold text-slate-700 mb-1">Chưa có ghi chú nào được lưu</p>
                    <p className="text-sm text-slate-500 mb-4">
                      Hãy bôi đen các thuật ngữ hoặc đoạn văn khó hiểu khi đọc bài báo để lưu lại giải thích tại đây.
                    </p>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      Mở trình đọc tài liệu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedList.map((item) => (
                      <div
                        key={item.id}
                        className="border border-slate-200 bg-slate-50 rounded-xl p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                              📄 {item.paperTitle}
                            </span>
                            <span className="text-xs text-slate-400">• {item.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleNavigate("S4")}
                              className="text-xs font-semibold text-indigo-600 hover:underline"
                            >
                              Mở lại bài báo →
                            </button>
                            <button
                              onClick={() => handleDeleteSaved(item.id)}
                              className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                        <blockquote className="p-3.5 bg-amber-50 border-l-4 border-amber-400 text-sm italic text-slate-800 rounded-r-xl mb-3">
                          &ldquo;{item.selectedText}&rdquo;
                        </blockquote>
                        <div className="text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed">
                          <strong className="text-slate-900">Giải thích ngữ cảnh:</strong>{" "}
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
