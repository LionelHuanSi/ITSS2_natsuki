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
    setTimeout(() => setToastMsg(null), 2600);
  };

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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        <TopStepper
          activeScreen={activeScreen}
          savedCount={savedList.length}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* =====================================================
                MÀN HÌNH S1: TRANG CHỦ & NHẬP CHỦ ĐỀ
               ===================================================== */}
            {activeScreen === "S1" && (
              <section className="space-y-6">
                {/* Khung chính đồng nhất chuẩn Card trắng viền mảnh */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                    <div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                        Màn hình 1 (Dùng chung) • ホーム・テーマ入力画面
                      </span>
                      <h1 className="text-2xl font-bold text-slate-900">
                        Khởi đầu nghiên cứu từ ý tưởng hoặc chủ đề còn mơ hồ
                      </h1>
                      <p className="text-sm text-slate-500 mt-1">
                        Nhập mô tả chủ đề bằng tiếng Việt để hệ thống phân tích thành sơ đồ từ khóa học thuật tiếng Anh và gợi ý bài báo nền tảng.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Mô tả chủ đề / Câu hỏi nghiên cứu của bạn:
                      </label>
                      <textarea
                        rows={3}
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="Ví dụ: Ứng dụng AI nhận diện bệnh trên lá cây..."
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
                        Chọn nhanh chủ đề mẫu (Mock Data):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleSelectPreset("ai-vision")}
                          className="text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🌿 AI nhận diện bệnh lá cây (Computer Vision)
                        </button>
                        <button
                          onClick={() => handleSelectPreset("llm-rag")}
                          className="text-xs font-medium bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🤖 Giảm ảo giác LLM bằng RAG
                        </button>
                        <button
                          onClick={() => setTopicInput("")}
                          className="text-xs font-medium bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 border border-slate-200 hover:border-amber-300 px-3.5 py-2 rounded-lg transition"
                        >
                          🧪 Xóa trống (Test báo lỗi nhập thiếu)
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                      <button
                        onClick={handleAnalyzeTopic}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition flex items-center gap-2"
                      >
                        <span>Phân tích & Tạo Sơ đồ Từ khóa (Sang S2)</span>
                        <span>→</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleNavigate("S4")}
                          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                        >
                          📖 Mở thẳng Trình đọc (S4)
                        </button>
                        <button
                          onClick={() => handleNavigate("S6")}
                          className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition"
                        >
                          🗂️ Kho lưu trữ (S6) →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 Thẻ tổng quan 2 Solution đồng bộ kích thước & font */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
                        Solution 1 • Tiền nghiên cứu chủ động
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        Sơ đồ từ khóa (F1.1) • Giải thích (F1.2) • Bài báo nền tảng (F1.3)
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Chuyển đổi tìm kiếm thụ động thành tiền nghiên cứu chủ động, xóa bỏ cảm giác lãng phí thời gian do thiếu từ khóa chính xác.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S2")}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Xem Sơ đồ Từ khóa (Màn hình 2)</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                        Solution 2 • Đọc & Xử lý khép kín
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        Bôi đen (F2.1) • Giải thích ngữ cảnh (F2.2) • Lưu trữ (F2.3)
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Tích hợp trực tiếp khâu tiếp nhận thông tin và xử lý tri thức ngay tại điểm đọc nhằm duy trì trạng thái tập trung sâu.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Mở Trình đọc Bài báo (Màn hình 4)</span>
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
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Màn hình 2 • Solution 1 • [Chức năng F1.1: Sơ đồ các từ khóa học thuật]
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Bản đồ Từ khóa Học thuật
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Nhấp chọn một nút từ khóa (Node) bên dưới để xem giải thích chuyên môn và danh sách bài báo nền tảng.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate("S1")}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  >
                    ← Quay lại Trang chủ (S1)
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-950 px-5 py-3 rounded-xl font-semibold text-sm text-center max-w-2xl">
                    🎯 Chủ đề gốc: {topicInput || currentTopicData.title}
                  </div>
                  <div className="h-6 w-0.5 bg-indigo-200"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {currentTopicData.keywords.map((kw, idx) => (
                      <div
                        key={kw.id}
                        onClick={() => handleSelectKeywordNode(kw)}
                        className="keyword-node cursor-pointer bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-600 text-white">
                              Node {idx + 1} • {kw.level}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {kw.papers.length} bài báo nền tảng
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-slate-900 mb-1">{kw.labelEn}</h3>
                          <p className="text-xs font-semibold text-indigo-600 mb-2">{kw.labelVi}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{kw.explanation}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                          <span>Xem giải thích & Bài báo nền tảng (Sang S3)</span>
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
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                      Màn hình 3 • Solution 1 • [Chức năng F1.2: Giải thích từ khóa & F1.3: Đề xuất bài báo]
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
                    ← Đổi từ khóa (Về Sơ đồ S2)
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                      📘 Chức năng F1.2 • Giải thích từ khóa
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {selectedKeyword.labelVi}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {selectedKeyword.explanation}
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      <p className="font-bold text-slate-900 mb-1">💡 Vai trò trong nghiên cứu:</p>
                      <p>{selectedKeyword.whyImportant}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
                      📄 Chức năng F1.3 • Bài báo học thuật nền tảng được đề xuất
                    </div>

                    {!selectedKeyword.hasFoundationalPapers() ? (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
                        <div className="text-2xl mb-2">📭</div>
                        <h4 className="font-bold text-rose-800 text-base mb-1">
                          Không tìm thấy bài báo nền tảng phù hợp!
                        </h4>
                        <p className="text-sm text-rose-600 mb-4">
                          Từ khóa <strong>&ldquo;{selectedKeyword.labelEn}&rdquo;</strong> có phạm vi quá hẹp. Vui lòng quay lại Sơ đồ (Màn hình 2) để chọn nhánh từ khóa khác.
                        </p>
                        <button
                          onClick={() => handleNavigate("S2")}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                        >
                          ← Quay lại Sơ đồ chọn từ khóa khác (S2)
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
                              <strong className="text-slate-800">Mức độ liên quan:</strong> {paper.relevance}
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleOpenPaper(paper)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
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
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Màn hình 4 & 5 • Solution 2 • [Chức năng F2.1: Đọc & Bôi đen | F2.2: Giải thích ngữ cảnh]
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
                      ← Đổi bài báo (Về S3)
                    </button>
                    <button
                      onClick={() => handleNavigate("S6")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      🗂️ Kho lưu trữ (S6) →
                    </button>
                  </div>
                </div>

                {/* Hướng dẫn bôi đen đồng bộ font */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    🖍️ <strong>Hướng dẫn (F2.1):</strong> Dùng chuột <strong>bôi đen (highlight)</strong> bất kỳ đoạn văn nào bên dưới (hoặc bấm vào các thuật ngữ gợi ý màu vàng) để xem giải thích ở <strong>Màn hình 5 (F2.2)</strong>.
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Cột trái: Nội dung bài báo đồng bộ cùng 1 font-sans sạch sẽ */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-white border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-700">
                        📄 Màn hình 4 (F2.1) • Nội dung Bài báo
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

                  {/* Cột phải: Màn hình 5 - Khung giải thích ngữ cảnh */}
                  <div className="lg:col-span-5 sticky top-6">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      {!s5Quote && !s5Error && (
                        <div className="text-center py-10 px-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-lg mx-auto mb-3">
                            ✨
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm mb-1">
                            Màn hình 5: Khung Giải thích Ngữ cảnh (F2.2)
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Hãy bôi đen một đoạn văn bản ở bài báo bên trái (hoặc bấm vào các thuật ngữ màu vàng) để xem giải thích chuyên sâu ngay tại điểm đọc.
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
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                              🟢 Màn hình 5 (F2.2) • Giải thích Ngữ cảnh
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
                              Đoạn văn bản đã bôi đen:
                            </span>
                            <blockquote className="mt-1.5 p-3.5 bg-amber-50 border-l-4 border-amber-400 text-slate-800 text-sm italic rounded-r-xl">
                              &ldquo;{s5Quote}&rdquo;
                            </blockquote>
                          </div>

                          <div>
                            <span className="text-xs font-semibold text-emerald-700 uppercase">
                              Giải thích theo ngữ cảnh chuyên ngành:
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
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      Màn hình 6 • Solution 2 • [Chức năng F2.3: Lưu trữ giải thích của ngữ cảnh đã bôi đen]
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Kho Lưu trữ Tri thức & Ngữ cảnh Đã bôi đen
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Danh sách các đoạn văn bản bôi đen và lời giải thích ngữ cảnh đã được lưu lại trong quá trình nghiên cứu.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
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
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="font-bold text-slate-700 mb-1">Kho lưu trữ đang trống</p>
                    <p className="text-sm text-slate-500 mb-4">
                      Hãy quay lại Màn hình 4, bôi đen văn bản và nhấn Lưu giải thích ở Màn hình 5.
                    </p>
                    <button
                      onClick={() => handleNavigate("S4")}
                      className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      ← Quay lại đọc bài báo (S4)
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
                              Đọc tiếp bài này →
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
