"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  NatsukiScholarLogo,
  IconSearch,
  IconTree,
  IconDocument,
  IconHighlight,
  IconArchive,
  IconBookOpen,
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
  IconCheck,
  IconTrash,
  IconUpload,
  IconTranslate,
  IconSend,
  IconRefresh,
} from "@/components/Icons";
import { ResearchWorkflowService } from "@/services/ResearchWorkflowService";
import { KeywordNode } from "@/models/KeywordNode";
import { AcademicPaper } from "@/models/AcademicPaper";
import { SavedExplanation } from "@/models/SavedExplanation";
import { InteractiveKeywordTree } from "@/components/InteractiveKeywordTree";

export type ScreenId = "S1" | "S2" | "S3" | "S4" | "S6";

export default function NatsukiScholarApp() {
  const workflowService = useMemo(() => new ResearchWorkflowService(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Điều hướng màn hình
  const [activeScreen, setActiveScreen] = useState<ScreenId>("S1");

  // State: Chủ đề và phân tích
  const [topicInput, setTopicInput] = useState<string>(
    "Nhận diện khuôn mặt trong điều kiện thiếu sáng"
  );
  const [topicKey, setTopicKey] = useState<string>("low-light-face");
  const [searchError, setSearchError] = useState<string | null>(null);

  const currentTopic = useMemo(
    () => workflowService.getTopicByKey(topicKey),
    [workflowService, topicKey]
  );

  // State: Từ khóa & Bài báo đang chọn
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordNode>(
    () => workflowService.getTopicByKey("low-light-face").keywords[0]
  );
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper>(
    () => workflowService.getTopicByKey("low-light-face").keywords[0].papers[0]
  );

  // State: Bôi đen, Dịch thuật & Giải thích ngữ cảnh
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [explanationText, setExplanationText] = useState<string>("");
  const [translationText, setTranslationText] = useState<string>("");
  const [explanationNotice, setExplanationNotice] = useState<string | null>(null);
  const [sidebarMode, setSidebarMode] = useState<"explain" | "translate">("explain");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isProcessingPrompt, setIsProcessingPrompt] = useState<boolean>(false);

  // State: Kho lưu trữ
  const [savedExplanations, setSavedExplanations] = useState<SavedExplanation[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSavedExplanations(workflowService.loadSavedExplanations());
  }, [workflowService]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Xử lý Phân tích chủ đề (S1 -> S2)
  const handleAnalyze = () => {
    const res = workflowService.analyzeTopic(topicInput, topicKey);
    if (!res.isValid || !res.topicData) {
      setSearchError(res.errorMessage || "Vui lòng nhập mô tả chủ đề nghiên cứu.");
      return;
    }
    setSearchError(null);
    setTopicKey(res.topicData.key);
    setSelectedKeyword(res.topicData.keywords[0]);
    setActiveScreen("S2");
  };

  // Chọn mẫu chủ đề có sẵn
  const handleSelectPreset = (key: string, title: string) => {
    setTopicKey(key);
    setTopicInput(title);
    setSearchError(null);
  };

  // Tải lên bài báo tài liệu cá nhân (.pdf, .txt, .docx)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const paperTitle = file.name.replace(/\.[^/.]+$/, "");
    const customPaper = new AcademicPaper(
      `upload-${Date.now()}`,
      paperTitle,
      "Tài liệu người dùng tải lên",
      new Date().getFullYear(),
      `Tệp đính kèm: ${file.name}`,
      "Tài liệu do bạn trực tiếp tải lên để đọc và phân tích ngữ cảnh tại chỗ.",
      [
        "This is the imported document content for your study. In academic research, deep domain modeling and specialized terms often introduce confusion when read through generic translation tools.",
        "The model actively bridges the representation discrepancy by mapping domain-specific jargon into verified technical contexts.",
        "Through contextual reading, researchers can examine methodological rigor, experimental setups, and performance metrics without losing their train of thought."
      ],
      {
        "representation discrepancy":
          "Độ sai lệch biểu diễn dữ liệu (Representation Discrepancy): Sự khác biệt về mặt phân phối đặc trưng giữa dữ liệu lý thuyết và dữ liệu thực nghiệm thực tế.",
        "methodological rigor":
          "Tính chặt chẽ về phương pháp luận (Methodological Rigor): Tiêu chuẩn khoa học đảm bảo quy trình thử nghiệm và đối chứng không bị sai lệch hoặc có độ lệch thiên vị."
      },
      {
        "representation discrepancy": "Độ sai lệch biểu diễn đặc trưng",
        "methodological rigor": "Tính chặt chẽ về phương pháp luận"
      }
    );

    setSelectedPaper(customPaper);
    setHighlightedText("");
    setExplanationText("");
    setTranslationText("");
    setExplanationNotice(null);
    setActiveScreen("S4");
    showToast(`Đã tải lên tệp "${file.name}". Bắt đầu đọc bài báo!`);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Chọn một Node từ khóa trên sơ đồ cây (S2 -> S3)
  const handleSelectKeyword = (node: KeywordNode) => {
    setSelectedKeyword(node);
    if (node.papers.length > 0) {
      setSelectedPaper(node.papers[0]);
    }
    setActiveScreen("S3");
  };

  // Chọn bài báo để đọc (S3 -> S4)
  const handleStartReading = (paper: AcademicPaper) => {
    setSelectedPaper(paper);
    setHighlightedText("");
    setExplanationText("");
    setTranslationText("");
    setExplanationNotice(null);
    setActiveScreen("S4");
  };

  // Bắt sự kiện bôi đen trong bài báo
  const handleTextSelection = () => {
    const raw = window.getSelection()?.toString() || "";
    if (!raw.trim()) return;
    triggerExplanation(raw);
  };

  const triggerExplanation = (text: string, customInstruction?: string) => {
    const res = workflowService.explainHighlightedText(selectedPaper, text, customInstruction);
    if (!res.isValid || !res.selectedText || !res.explanation) {
      setExplanationNotice(res.errorMessage || "Vui lòng bôi đen đoạn văn dài hơn.");
      return;
    }
    setExplanationNotice(null);
    setHighlightedText(res.selectedText);
    setExplanationText(res.explanation);
    setTranslationText(res.translation || `[Bản dịch]: ${res.selectedText}`);
  };

  // Xử lý gửi yêu cầu giải thích tùy biến (Custom Prompt)
  const handleSendCustomPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim() || !highlightedText) return;

    setIsProcessingPrompt(true);
    setTimeout(() => {
      triggerExplanation(highlightedText, customPrompt);
      setIsProcessingPrompt(false);
      showToast("Đã cập nhật giải thích theo yêu cầu của bạn.");
    }, 200);
  };

  // Quick Action Prompts
  const handleQuickPrompt = (promptType: "deeper" | "example" | "summary") => {
    if (!highlightedText) return;
    let promptStr = "";
    if (promptType === "deeper") promptStr = "giải thích chi tiết rõ ràng hơn về nguyên lý";
    if (promptType === "example") promptStr = "cho ví dụ thực tế minh họa cụ thể";
    if (promptType === "summary") promptStr = "tóm tắt ngắn gọn 1 câu";

    setCustomPrompt(promptStr);
    triggerExplanation(highlightedText, promptStr);
    showToast(`Đã áp dụng: ${promptStr}`);
  };

  // Lưu trích dẫn vào Kho lưu trữ
  const handleSaveExplanation = () => {
    if (!highlightedText) return;
    const contentToSave = sidebarMode === "explain" ? explanationText : translationText;
    const updated = workflowService.saveExplanation(
      selectedPaper,
      selectedKeyword,
      highlightedText,
      contentToSave,
      savedExplanations
    );
    setSavedExplanations(updated);
    showToast("Đã lưu trích dẫn vào Kho tri thức cá nhân");
  };

  const handleDeleteSaved = (id: string) => {
    const updated = workflowService.deleteExplanation(id, savedExplanations);
    setSavedExplanations(updated);
    showToast("Đã xóa mục trích dẫn đã lưu");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#fafafa] text-slate-900 overflow-hidden font-sans select-text">
      {/* Input ẩn để tải tệp bài báo */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.docx,.doc"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ======================================================== */}
      {/* HEADER TỐI GIẢN CHUẨN ACADEMIC */}
      {/* ======================================================== */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveScreen("S1")}
            className="hover:opacity-80 transition flex items-center"
            title="Quay về Trang chủ"
          >
            <NatsukiScholarLogo />
          </button>

          {/* Stepper dạng text học thuật */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <button
              onClick={() => setActiveScreen("S1")}
              className={`px-2 py-1 rounded transition ${
                activeScreen === "S1"
                  ? "bg-slate-900 text-white font-semibold"
                  : "hover:text-slate-900"
              }`}
            >
              01 Đề tài
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveScreen("S2")}
              className={`px-2 py-1 rounded transition ${
                activeScreen === "S2"
                  ? "bg-slate-900 text-white font-semibold"
                  : "hover:text-slate-900"
              }`}
            >
              02 Bản đồ từ khóa
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveScreen("S3")}
              className={`px-2 py-1 rounded transition ${
                activeScreen === "S3"
                  ? "bg-slate-900 text-white font-semibold"
                  : "hover:text-slate-900"
              }`}
            >
              03 Bài báo nền tảng
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveScreen("S4")}
              className={`px-2 py-1 rounded transition ${
                activeScreen === "S4"
                  ? "bg-slate-900 text-white font-semibold"
                  : "hover:text-slate-900"
              }`}
            >
              04 Đọc & Giải thích
            </button>
          </nav>
        </div>

        {/* Action Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 bg-white hover:border-slate-400 text-slate-700 rounded transition"
            title="Tải lên bài báo (.pdf, .txt)"
          >
            <IconUpload size={14} />
            <span>Tải lên bài báo</span>
          </button>

          <button
            onClick={() => setActiveScreen("S6")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded transition ${
              activeScreen === "S6"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
            }`}
          >
            <IconArchive size={14} />
            <span>Kho trích dẫn</span>
            <span className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.2 rounded text-[11px]">
              {savedExplanations.length}
            </span>
          </button>
        </div>
      </header>

      {/* TOAST THÔNG BÁO */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded shadow-lg border border-slate-700 flex items-center gap-2 animate-fade-in">
          <IconCheck size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-auto">
        {/* ==================================================== */}
        {/* MÀN HÌNH 1: KHỞI TẠO ĐỀ TÀI / TẢI TÀI LIỆU */}
        {/* ==================================================== */}
        {activeScreen === "S1" && (
          <div className="max-w-3xl mx-auto px-6 py-14 flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-slate-900 mb-2">
              Khởi tạo Khung Nghiên cứu Đề tài
            </h1>
            <p className="text-sm text-slate-600 text-center max-w-xl mb-8 leading-relaxed">
              Nhập ý tưởng sơ khai để xây dựng sơ đồ từ khóa học thuật tiếng Anh, hoặc tải trực tiếp
              bài báo của bạn lên để đọc và đối chiếu ngữ cảnh tại chỗ.
            </p>

            {/* Ô nhập chủ đề */}
            <div className="w-full bg-white border border-slate-300 rounded p-4 mb-3 shadow-sm focus-within:border-slate-800 transition">
              <label className="block text-xs uppercase font-mono text-slate-500 mb-2 font-medium">
                Mô tả ý tưởng hoặc từ khóa tiếng Việt
              </label>
              <textarea
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Ví dụ: Nhận diện khuôn mặt trong bóng tối, mạng cảm biến dưới biển, phân tích cảm xúc tiếng Việt..."
                rows={3}
                className="w-full text-slate-900 placeholder:text-slate-400 text-base resize-none focus:outline-none bg-transparent"
              />
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                <span className="text-xs text-slate-400 font-mono">
                  Đầu vào tự nhiên (không cần chuẩn thuật ngữ)
                </span>
                <button
                  onClick={handleAnalyze}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded transition"
                >
                  <IconSearch size={15} />
                  <span>Phân tích sơ đồ từ khóa</span>
                  <IconArrowRight size={14} />
                </button>
              </div>
            </div>

            {searchError && (
              <div className="w-full text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded mb-4">
                {searchError}
              </div>
            )}

            {/* Khung tải tệp lên */}
            <div className="w-full mb-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border border-dashed border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 rounded cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                    <IconUpload size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Hoặc tải lên bài báo / tài liệu có sẵn (.pdf, .txt, .docx)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Mở trực tiếp trong không gian đọc và giải thích ngữ cảnh tức thì
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-700 underline font-medium">
                  Chọn tệp từ máy tính →
                </span>
              </div>
            </div>

            {/* Chủ đề mẫu để test nhanh */}
            <div className="w-full">
              <span className="block text-xs font-mono uppercase text-slate-500 mb-2.5 font-medium">
                Chủ đề nghiên cứu mẫu:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {[
                  {
                    key: "low-light-face",
                    title: "Nhận diện khuôn mặt trong điều kiện thiếu sáng",
                    sub: "Thị giác máy tính (CV)",
                  },
                  {
                    key: "underwater-sensor",
                    title: "Mạng cảm biến không dây dưới nước",
                    sub: "Mạng máy tính (IoT/Networking)",
                  },
                  {
                    key: "vietnamese-nlp",
                    title: "Phân tích cảm xúc văn bản tiếng Việt",
                    sub: "Xử lý ngôn ngữ tự nhiên (NLP)",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleSelectPreset(item.key, item.title)}
                    className={`text-left p-3 border rounded transition ${
                      topicKey === item.key
                        ? "border-slate-900 bg-slate-100 text-slate-900 font-medium"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="text-[11px] font-mono text-slate-500 uppercase">
                      {item.sub}
                    </div>
                    <div className="text-xs font-medium text-slate-900 mt-1 line-clamp-2">
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MÀN HÌNH 2: BẢN ĐỒ TỪ KHÓA DẠNG CÂY TƯƠNG TÁC (BEZIER TREE) */}
        {/* ==================================================== */}
        {activeScreen === "S2" && (
          <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <button
                onClick={() => setActiveScreen("S1")}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition font-mono"
              >
                <IconArrowLeft size={14} />
                <span>Quay lại nhập đề tài</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 uppercase">
                  BẢN ĐỒ TỪ KHÓA HỌC THUẬT (SƠ ĐỒ CÂY TƯƠNG TÁC)
                </span>
              </div>
            </div>

            {/* SƠ ĐỒ CÂY TƯƠNG TÁC (HORIZONTAL BEZIER TREE CANVAS) */}
            <InteractiveKeywordTree
              topic={currentTopic}
              selectedKeywordId={selectedKeyword.id}
              onSelectKeyword={handleSelectKeyword}
            />
          </div>
        )}

        {/* ==================================================== */}
        {/* MÀN HÌNH 3: CHI TIẾT TỪ KHÓA & BÀI BÁO ĐỀ XUẤT */}
        {/* ==================================================== */}
        {activeScreen === "S3" && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <button
                onClick={() => setActiveScreen("S2")}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition font-mono"
              >
                <IconArrowLeft size={14} />
                <span>Quay lại sơ đồ cây từ khóa</span>
              </button>
              <span className="text-xs font-mono text-slate-500 uppercase">
                CHI TIẾT TỪ KHÓA & TÀI LIỆU NỀN TẢNG
              </span>
            </div>

            {/* Chi tiết từ khóa */}
            <div className="bg-white border border-slate-200 p-6 rounded mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded">
                  {selectedKeyword.level}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedKeyword.labelVi}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                {selectedKeyword.labelEn}
              </h2>
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <div className="p-3.5 bg-slate-50 border-l-2 border-slate-900">
                  <span className="font-semibold block text-slate-900 mb-0.5">
                    Định nghĩa chuyên ngành:
                  </span>
                  {selectedKeyword.explanation}
                </div>
                <div className="p-3.5 bg-slate-50 border-l-2 border-slate-400">
                  <span className="font-semibold block text-slate-900 mb-0.5">
                    Tại sao nên dùng thuật ngữ này khi tìm kiếm tài liệu quốc tế?
                  </span>
                  {selectedKeyword.whyImportant}
                </div>
              </div>
            </div>

            {/* Danh sách bài báo nền tảng */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-slate-600 font-semibold flex items-center gap-2">
                  <IconDocument size={16} />
                  <span>BÀI BÁO HỌC THUẬT NỀN TẢNG ĐƯỢC ĐỀ XUẤT</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedKeyword.papers.length} bài báo uy tín
                </span>
              </div>

              <div className="space-y-4">
                {selectedKeyword.papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-5 bg-white border border-slate-200 rounded hover:border-slate-400 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-mono text-slate-500">
                          {paper.venue} • {paper.year}
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 leading-snug">
                          {paper.title}
                        </h3>
                        <div className="text-xs text-slate-600">
                          <span className="font-medium text-slate-700">Tác giả:</span>{" "}
                          {paper.authors}
                        </div>
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 mt-2">
                          <span className="font-semibold text-slate-800">Lý do nền tảng:</span>{" "}
                          {paper.relevance}
                        </p>
                      </div>

                      <button
                        onClick={() => handleStartReading(paper)}
                        className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded transition"
                      >
                        <IconBookOpen size={14} />
                        <span>Đọc bài báo này</span>
                        <IconArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MÀN HÌNH 4: KHÔNG GIAN ĐỌC SPLIT-VIEW (DỊCH & GIẢI THÍCH) */}
        {/* ==================================================== */}
        {activeScreen === "S4" && (
          <div className="h-full flex flex-col">
            {/* Thanh điều hướng bài đọc */}
            <div className="h-11 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveScreen("S3")}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-mono transition"
                >
                  <IconArrowLeft size={13} />
                  <span>Đổi bài báo khác</span>
                </button>
                <span className="text-slate-300">|</span>
                <span className="text-slate-700 truncate max-w-md font-medium">
                  {selectedPaper.title}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-slate-700 hover:underline flex items-center gap-1"
                >
                  <IconUpload size={12} />
                  <span>Tải lên tệp khác</span>
                </button>
              </div>
            </div>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* BÊN TRÁI: NỘI DUNG BÀI BÁO (60%) */}
              <section
                onMouseUp={handleTextSelection}
                className="flex-1 overflow-y-auto px-8 py-10 bg-white border-r border-slate-200"
              >
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="border-b border-slate-200 pb-5">
                    <span className="text-xs font-mono uppercase text-slate-500 block mb-1">
                      {selectedPaper.venue} ({selectedPaper.year})
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                      {selectedPaper.title}
                    </h1>
                    <p className="text-xs text-slate-600 mt-2">
                      <span className="font-semibold text-slate-700">Tác giả:</span>{" "}
                      {selectedPaper.authors}
                    </p>
                  </div>

                  {/* Thanh gợi ý từ khóa */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between font-medium">
                      <span>Bôi đen câu bất kỳ để xem Dịch / Giải thích, hoặc bấm từ khóa mẫu:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(selectedPaper.dictionary).map((term) => (
                        <button
                          key={term}
                          onClick={() => triggerExplanation(term)}
                          className="academic-highlight text-xs font-medium text-slate-900"
                          title="Bấm để dịch và giải thích ngữ cảnh"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Đoạn văn bản bài báo */}
                  <article className="paper-body space-y-5 text-slate-800 text-justify">
                    {selectedPaper.paragraphs.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </article>
                </div>
              </section>

              {/* BÊN PHẢI: KHUNG DỊCH THUẬT & GIẢI THÍCH NGỮ CẢNH (40%) */}
              <aside className="w-96 md:w-[460px] bg-[#fafafa] flex flex-col justify-between shrink-0 overflow-hidden border-l border-slate-200">
                {/* Header chuyển Tab: Dịch thuật vs Giải thích */}
                <div className="p-4 bg-white border-b border-slate-200 shrink-0">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded border border-slate-200">
                    <button
                      onClick={() => setSidebarMode("explain")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition ${
                        sidebarMode === "explain"
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <IconHighlight size={14} />
                      <span>Giải thích ngữ cảnh</span>
                    </button>

                    <button
                      onClick={() => setSidebarMode("translate")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition ${
                        sidebarMode === "translate"
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <IconTranslate size={14} />
                      <span>Dịch thuật học thuật</span>
                    </button>
                  </div>
                </div>

                {/* Nội dung diễn giải */}
                <div className="p-5 flex-1 overflow-y-auto space-y-4">
                  {explanationNotice && (
                    <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded">
                      {explanationNotice}
                    </div>
                  )}

                  {!highlightedText ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-300 rounded text-slate-500">
                      <IconHighlight size={24} className="mb-2 text-slate-400" />
                      <span className="text-xs font-medium text-slate-700 mb-1">
                        Chưa có đoạn văn bản được chọn
                      </span>
                      <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                        Dùng chuột bôi đen một câu khó trong bài đọc bên trái để xem bản dịch chuẩn hoặc giải thích chi tiết.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Đoạn văn gốc */}
                      <div className="bg-white border border-slate-200 p-3 rounded">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                          Đoạn trích dẫn gốc trong bài:
                        </span>
                        <p className="text-xs font-mono text-slate-900 bg-slate-50 p-2 rounded border border-slate-100">
                          "{highlightedText}"
                        </p>
                      </div>

                      {/* TAB 1: GIẢI THÍCH NGỮ CẢNH */}
                      {sidebarMode === "explain" && (
                        <div className="space-y-3">
                          <div className="bg-white border border-slate-900 p-4 rounded shadow-sm">
                            <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block mb-1.5">
                              Ý nghĩa theo ngữ cảnh nghiên cứu:
                            </span>
                            <p className="text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                              {explanationText}
                            </p>
                          </div>

                          {/* Quick Action Prompt Pills */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                              Bạn muốn giải thích rõ hơn? Bấm chọn nhanh:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                onClick={() => handleQuickPrompt("deeper")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                Giải thích chi tiết hơn
                              </button>
                              <button
                                onClick={() => handleQuickPrompt("example")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                Cho ví dụ thực tế
                              </button>
                              <button
                                onClick={() => handleQuickPrompt("summary")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                Tóm tắt 1 câu
                              </button>
                            </div>
                          </div>

                          {/* Ô nhập yêu cầu giải thích tùy biến */}
                          <form onSubmit={handleSendCustomPrompt} className="pt-2">
                            <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold mb-1">
                              Hoặc nhập yêu cầu giải thích theo ý bạn:
                            </span>
                            <div className="flex items-center gap-1.5 bg-white border border-slate-300 focus-within:border-slate-800 p-1.5 rounded">
                              <input
                                type="text"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder="Ví dụ: giải thích dễ hiểu cho người mới, so sánh với CNN..."
                                className="flex-1 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1.5 bg-transparent"
                              />
                              <button
                                type="submit"
                                disabled={isProcessingPrompt || !customPrompt.trim()}
                                className="p-1.5 bg-slate-900 text-white rounded hover:bg-slate-800 disabled:opacity-40 transition shrink-0"
                                title="Gửi yêu cầu giải thích"
                              >
                                <IconSend size={13} />
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* TAB 2: DỊCH THUẬT HỌC THUẬT */}
                      {sidebarMode === "translate" && (
                        <div className="space-y-3">
                          <div className="bg-white border border-slate-900 p-4 rounded shadow-sm">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                                Bản dịch chuẩn ngữ cảnh CNTT:
                              </span>
                              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                                Sát nghĩa chuyên môn
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-800 font-medium">
                              {translationText}
                            </p>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded border border-slate-200">
                            Lưu ý: Bản dịch đã được đối chiếu để giữ đúng thuật ngữ kỹ thuật, tránh dịch sai lệch như các công cụ dịch máy thông thường.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer nút hành động: Lưu giải thích */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Thao tác khép kín 1-click
                  </span>
                  <button
                    disabled={!highlightedText}
                    onClick={handleSaveExplanation}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-medium rounded transition"
                  >
                    <IconArchive size={14} />
                    <span>Lưu vào Kho tri thức</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MÀN HÌNH 6: KHO LƯU TRỮ TRÍCH DẪN */}
        {/* ==================================================== */}
        {activeScreen === "S6" && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <button
                onClick={() => setActiveScreen("S4")}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition font-mono"
              >
                <IconArrowLeft size={14} />
                <span>Quay lại bài đọc tiếp</span>
              </button>
              <span className="text-xs font-mono text-slate-500 uppercase">
                KHO LƯU TRỮ TRÍCH DẪN & GHI CHÚ
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Kho Trích dẫn & Diễn giải Ngữ cảnh
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lưu trữ có hệ thống giúp bạn không phải tra cứu lại từ đầu khi viết đồ án hoặc tổng quan tài liệu.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700">
                {savedExplanations.length} trích dẫn đã lưu
              </span>
            </div>

            {savedExplanations.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-500">
                <IconArchive size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium text-slate-700">Kho lưu trữ đang trống</p>
                <p className="text-xs text-slate-500 mt-1">
                  Khi đọc bài báo ở bước 4, hãy bôi đen các câu khó và nhấn "Lưu vào Kho tri thức".
                </p>
                <button
                  onClick={() => setActiveScreen("S4")}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition"
                >
                  Mở bài đọc ngay
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedExplanations.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white border border-slate-200 rounded space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.keywordLabel} • {item.createdAt}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-900">
                          Bài báo: {item.paperTitle}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDeleteSaved(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title="Xóa trích dẫn này"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>

                    <div className="p-2.5 bg-slate-50 border-l-2 border-slate-900 rounded-r text-xs font-mono text-slate-800">
                      "{item.selectedText}"
                    </div>

                    <p className="text-xs leading-relaxed text-slate-700 bg-white border border-slate-100 p-3 rounded whitespace-pre-line">
                      {item.explanation}
                    </p>

                    <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setActiveScreen("S4")}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-900 hover:underline font-medium"
                      >
                        <span>Đọc tiếp bài này</span>
                        <IconArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
