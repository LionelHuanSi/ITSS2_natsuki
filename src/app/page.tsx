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
  IconCheck,
  IconTrash,
  IconUpload,
  IconTranslate,
  IconSend,
} from "@/components/Icons";
import { ResearchWorkflowService } from "@/services/ResearchWorkflowService";
import { KeywordNode } from "@/models/KeywordNode";
import { AcademicPaper } from "@/models/AcademicPaper";
import { SavedExplanation } from "@/models/SavedExplanation";
import { InteractiveKeywordTree } from "@/components/InteractiveKeywordTree";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

export type ScreenId = "S1" | "S2" | "S3" | "S4" | "S6";

function NatsukiScholarContent() {
  const { language, setLanguage, t } = useLanguage();
  const workflowService = useMemo(() => new ResearchWorkflowService(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Điều hướng màn hình
  const [activeScreen, setActiveScreen] = useState<ScreenId>("S1");

  // State: Chủ đề và phân tích
  const [topicInput, setTopicInput] = useState<string>("");
  const [topicKey, setTopicKey] = useState<string>("pest-vision");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [s1Tab, setS1Tab] = useState<"idea" | "file">("idea");
  const [hasAnalyzedIdea, setHasAnalyzedIdea] = useState<boolean>(false);

  const currentTopic = useMemo(
    () => workflowService.getTopicByKey(topicKey),
    [workflowService, topicKey]
  );

  // State: Từ khóa & Bài báo đang chọn
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordNode>(
    () => workflowService.getTopicByKey("pest-vision").keywords[0]
  );
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper>(
    () => workflowService.getTopicByKey("pest-vision").keywords[0].papers[0]
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

  // Cập nhật lại diễn giải và dịch thuật khi ngôn ngữ thay đổi
  useEffect(() => {
    if (highlightedText && selectedPaper) {
      const res = workflowService.explainHighlightedText(
        selectedPaper,
        highlightedText,
        customPrompt,
        language
      );
      if (res.isValid) {
        setExplanationText(res.explanation || "");
        setTranslationText(res.translation || highlightedText);
      }
    }
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Xử lý Phân giải chủ đề (S1 -> S2)
  const handleAnalyze = () => {
    const defaultIdea =
      language === "ja"
        ? "コンピュータビジョンによる多種農業病害虫の識別"
        : "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính";
    const raw = topicInput.trim() || defaultIdea;
    const res = workflowService.analyzeTopic(raw, "pest-vision");
    if (!res.isValid || !res.topicData) {
      setSearchError(res.errorMessage || t.toasts.minTopicInputError);
      return;
    }
    setSearchError(null);
    setTopicInput(raw);
    setTopicKey(res.topicData.key);
    setSelectedKeyword(res.topicData.keywords[0]);
    setHasAnalyzedIdea(true);
    setActiveScreen("S2");
    showToast(
      language === "ja"
        ? "研究アイデアを体系的学術キーワードツリーに分解しました"
        : "Đã phân giải ý tưởng thành sơ đồ từ khóa học thuật"
    );
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
      language === "ja" ? "ユーザーアップロード論文" : "Tài liệu người dùng tải lên",
      new Date().getFullYear(),
      `${language === "ja" ? "添付ファイル" : "Tệp đính kèm"}: ${file.name}`,
      language === "ja"
        ? "読解および文脈分析のために直接アップロードされた文書です。"
        : "Tài liệu do bạn trực tiếp tải lên để đọc và phân tích ngữ cảnh tại chỗ.",
      [
        "This is the imported document content for your study. In academic research, deep domain modeling and specialized terms often introduce confusion when read through generic translation tools.",
        "The model actively bridges the representation discrepancy by mapping domain-specific jargon into verified technical contexts.",
        "Through contextual reading, researchers can examine methodological rigor, experimental setups, and performance metrics without losing their train of thought.",
      ],
      {
        "representation discrepancy":
          "Độ sai lệch biểu diễn dữ liệu (Representation Discrepancy): Sự khác biệt về mặt phân phối đặc trưng giữa dữ liệu lý thuyết và dữ liệu thực nghiệm thực tế.",
        "methodological rigor":
          "Tính chặt chẽ về phương pháp luận (Methodological Rigor): Tiêu chuẩn khoa học đảm bảo quy trình thử nghiệm và đối chứng không bị sai lệch hoặc có độ lệch thiên vị.",
      },
      {
        "representation discrepancy": "Độ sai lệch biểu diễn đặc trưng",
        "methodological rigor": "Tính chặt chẽ về phương pháp luận",
      },
      language === "ja" ? "アップロード論文" : "Tài liệu tải lên",
      0,
      [],
      "",
      language === "ja"
        ? "ユーザーにより直接アップロードされた研究ドキュメントです。"
        : "Tài liệu do bạn trực tiếp tải lên để đọc và phân tích ngữ cảnh tại chỗ.",
      [],
      {
        "representation discrepancy":
          "表現不一致（Representation Discrepancy）: 理論的データ分布と実世界観測データとの間における特徴量の分布乖離現象。",
        "methodological rigor":
          "方法論の厳密性（Methodological Rigor）: 実験手順および対照群の妥当性がバイアスなく担保されていることを示す科学的基準。",
      },
      {
        "representation discrepancy": "特徴量表現の乖離・不一致",
        "methodological rigor": "方法論の厳密性",
      }
    );

    setSelectedPaper(customPaper);
    setHighlightedText("");
    setExplanationText("");
    setTranslationText("");
    setExplanationNotice(null);
    setActiveScreen("S4");
    showToast(t.toasts.uploadedSuccess.replace("{fileName}", file.name));

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

  // Bắt sự kiện bôi đen trong bài báo (chỉ kích hoạt khi có đoạn text thực sự, không xóa khi click chuột nhẹ)
  const handleTextSelection = () => {
    const raw = window.getSelection()?.toString() || "";
    if (!raw.trim() || raw.trim().length < 2) return;
    triggerExplanation(raw);
  };

  const triggerExplanation = (text: string, customInstruction?: string) => {
    const res = workflowService.explainHighlightedText(
      selectedPaper,
      text,
      customInstruction,
      language
    );
    if (!res.isValid || !res.selectedText || !res.explanation) {
      setExplanationNotice(res.errorMessage || t.toasts.selectTextError);
      return;
    }
    setExplanationNotice(null);
    setHighlightedText(res.selectedText);
    setExplanationText(res.explanation);
    setTranslationText(res.translation || res.selectedText);
  };

  // Xử lý gửi yêu cầu giải thích tùy biến (Custom Prompt)
  const handleSendCustomPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim() || !highlightedText) return;

    setIsProcessingPrompt(true);
    setTimeout(() => {
      triggerExplanation(highlightedText, customPrompt);
      setIsProcessingPrompt(false);
      showToast(t.toasts.updatedExplanation);
    }, 200);
  };

  // Quick Action Prompts
  const handleQuickPrompt = (promptType: "deeper" | "example" | "summary") => {
    if (!highlightedText) return;
    let promptStr = "";
    if (promptType === "deeper") {
      promptStr =
        language === "ja"
          ? "原理をより詳細に解説"
          : "giải thích chi tiết rõ ràng hơn về nguyên lý";
    }
    if (promptType === "example") {
      promptStr =
        language === "ja"
          ? "具体的な応用例を提示"
          : "cho ví dụ thực tế minh họa cụ thể";
    }
    if (promptType === "summary") {
      promptStr = language === "ja" ? "1文で要約" : "tóm tắt ngắn gọn 1 câu";
    }

    setCustomPrompt(promptStr);
    triggerExplanation(highlightedText, promptStr);
    showToast(t.toasts.appliedPrompt.replace("{prompt}", promptStr));
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
    showToast(t.toasts.savedExplanationSuccess);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = workflowService.deleteExplanation(id, savedExplanations);
    setSavedExplanations(updated);
    showToast(t.toasts.deletedExplanationSuccess);
  };

  // Giữ đánh dấu bôi đen trực quan bền vững trên bài báo cho đến khi bôi đen đoạn khác
  const renderHighlightedParagraph = (paragraph: string, target: string): React.ReactNode => {
    if (!target || !target.trim() || target.trim().length < 2) {
      return paragraph;
    }
    const cleanTarget = target.trim();
    const lowerPara = paragraph.toLowerCase();
    const lowerTarget = cleanTarget.toLowerCase();
    const index = lowerPara.indexOf(lowerTarget);
    if (index === -1) {
      return paragraph;
    }
    const before = paragraph.slice(0, index);
    const matched = paragraph.slice(index, index + cleanTarget.length);
    const after = paragraph.slice(index + cleanTarget.length);

    return (
      <>
        {before}
        <mark className="bg-amber-200/90 text-slate-900 px-1 py-0.5 rounded font-medium border-b-2 border-amber-400 select-text transition-all duration-150">
          {matched}
        </mark>
        {renderHighlightedParagraph(after, target)}
      </>
    );
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
            title={t.nav.returnHome}
          >
            <NatsukiScholarLogo />
          </button>

          {/* Stepper dạng text học thuật không đánh số */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <button
              onClick={() => setActiveScreen("S1")}
              className={`px-3 py-1 rounded-md transition ${
                activeScreen === "S1"
                  ? "bg-slate-900 text-white font-semibold shadow-sm"
                  : "hover:text-slate-900 text-slate-700"
              }`}
            >
              {t.nav.step1}
            </button>
            <span>/</span>
            <button
              onClick={() => {
                if (!hasAnalyzedIdea) {
                  showToast(t.nav.requireIdeaToast);
                  return;
                }
                setActiveScreen("S2");
              }}
              title={hasAnalyzedIdea ? t.nav.step2 : t.nav.requireIdeaToast}
              className={`px-3 py-1 rounded-md transition ${
                activeScreen === "S2"
                  ? "bg-slate-900 text-white font-semibold shadow-sm"
                  : hasAnalyzedIdea
                  ? "hover:text-slate-900 text-slate-700 font-medium"
                  : "opacity-40 cursor-not-allowed text-slate-400"
              }`}
            >
              {t.nav.step2}
            </button>
            <span>/</span>
            <button
              onClick={() => {
                if (!hasAnalyzedIdea) {
                  showToast(t.nav.requireIdeaToast);
                  return;
                }
                setActiveScreen("S3");
              }}
              title={hasAnalyzedIdea ? t.nav.step3 : t.nav.requireIdeaToast}
              className={`px-3 py-1 rounded-md transition ${
                activeScreen === "S3"
                  ? "bg-slate-900 text-white font-semibold shadow-sm"
                  : hasAnalyzedIdea
                  ? "hover:text-slate-900 text-slate-700 font-medium"
                  : "opacity-40 cursor-not-allowed text-slate-400"
              }`}
            >
              {t.nav.step3}
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveScreen("S4");
              }}
              className={`px-3 py-1 rounded-md transition ${
                activeScreen === "S4"
                  ? "bg-slate-900 text-white font-semibold shadow-sm"
                  : "hover:text-slate-900 text-slate-700"
              }`}
            >
              {t.nav.step4}
            </button>
          </nav>
        </div>

        {/* Action Header: Language Switcher & Knowledge Base */}
        <div className="flex items-center gap-3">
          {/* Nút chuyển đổi ngôn ngữ Việt / Nhật */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`px-2.5 py-1 rounded-md transition text-xs font-mono font-medium ${
                language === "vi"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ja")}
              className={`px-2.5 py-1 rounded-md transition text-xs font-mono font-medium ${
                language === "ja"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="日本語に切り替え"
            >
              JA
            </button>
          </div>

          <button
            onClick={() => setActiveScreen("S6")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-lg transition ${
              activeScreen === "S6"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
            }`}
          >
            <IconArchive size={14} />
            <span>{t.nav.knowledgeBase}</span>
            <span className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[11px] font-semibold">
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
          <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
            {/* Tiêu đề chính */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-2">
                {t.s1.title}
              </h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                {t.s1.subtitle}
              </p>
            </div>

            {/* Segmented Control - Chuyển đổi 2 chế độ */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 mb-7">
              <button
                onClick={() => setS1Tab("idea")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition ${
                  s1Tab === "idea"
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <IconSearch size={14} />
                <span>{t.s1.tabIdea}</span>
              </button>
              <button
                onClick={() => setS1Tab("file")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition ${
                  s1Tab === "file"
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <IconUpload size={14} />
                <span>{t.s1.tabFile}</span>
              </button>
            </div>

            {/* TAB 1: KHỞI TẠO TỪ Ý TƯỞNG */}
            {s1Tab === "idea" && (
              <div className="w-full space-y-4">
                <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 transition">
                  <textarea
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder={t.s1.inputPlaceholder}
                    rows={3}
                    className="w-full text-slate-900 placeholder:text-slate-400 text-sm leading-relaxed resize-none focus:outline-none bg-transparent"
                  />
                  <div className="flex items-center justify-end pt-3 border-t border-slate-100 mt-2">
                    <button
                      onClick={handleAnalyze}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm transition"
                    >
                      <span>{t.s1.analyzeBtn}</span>
                      <IconArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {searchError && (
                  <div className="w-full text-xs text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-lg">
                    {searchError}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ĐỌC TÀI LIỆU CÓ SẴN (DROPZONE) */}
            {s1Tab === "file" && (
              <div className="w-full">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const fakeEvent = {
                        target: { files: [file] },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;
                      handleFileUpload(fakeEvent);
                    }
                  }}
                  className="w-full py-14 px-6 border-2 border-dashed border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50/80 rounded-2xl cursor-pointer transition flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-700 mb-3.5 transition">
                    <IconUpload size={22} />
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">
                    {t.s1.dropzoneTitle}
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.s1.dropzoneDesc}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* MÀN HÌNH 2: BẢN ĐỒ TỪ KHÓA DẠNG CÂY TƯƠNG TÁC (BEZIER TREE) */}
        {/* ==================================================== */}
        {activeScreen === "S2" && (
          <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80">
              <button
                onClick={() => setActiveScreen("S1")}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition font-medium"
              >
                <IconArrowLeft size={14} />
                <span>{t.s2.backBtn}</span>
              </button>
            </div>

            {/* SƠ ĐỒ CÂY TƯƠNG TÁC (HORIZONTAL BEZIER TREE CANVAS) */}
            <InteractiveKeywordTree
              topic={currentTopic}
              selectedKeywordId={selectedKeyword.id}
              selectedPaperId={selectedPaper.id}
              language={language}
              onSelectKeyword={handleSelectKeyword}
              onSelectPaper={(paper, kw) => {
                setSelectedKeyword(kw);
                handleStartReading(paper);
                showToast(
                  language === "ja"
                    ? `論文を開いています: "${paper.title.slice(0, 36)}..."`
                    : `Đang mở bài báo: "${paper.title.slice(0, 40)}..."`
                );
              }}
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
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition font-medium"
              >
                <IconArrowLeft size={14} />
                <span>{t.s3.backBtn}</span>
              </button>
            </div>

            {/* Chi tiết từ khóa & Phân tích chuyên sâu (Swiss Minimalist) */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl mb-8 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium">
                  {selectedKeyword.level}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedKeyword.getLabel(language)}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                {selectedKeyword.labelEn}
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                {/* 1. Cơ sở chọn lọc thuật ngữ */}
                <div className="border-t border-slate-100 pt-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    {t.s3.selectionReasonTitle}
                  </span>
                  <p className="text-slate-800 text-sm leading-relaxed text-justify">
                    {selectedKeyword.getSelectionReason(language) ||
                      selectedKeyword.getExplanation(language)}
                  </p>
                </div>

                {/* 2. Bối cảnh nghiên cứu & Thách thức kỹ thuật */}
                <div className="border-t border-slate-100 pt-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    {t.s3.academicContextTitle}
                  </span>
                  <p className="text-slate-800 text-sm leading-relaxed text-justify">
                    {selectedKeyword.getAcademicContext(language) ||
                      selectedKeyword.getExplanation(language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách bài báo nền tảng */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-slate-700 font-semibold flex items-center gap-1.5">
                  <IconDocument size={15} className="text-slate-500" />
                  <span>{t.s3.foundationalPapersTitle}</span>
                </span>
              </div>

              <div className="space-y-4">
                {selectedKeyword.papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-400 shadow-xs transition group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2.5 flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span
                            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                              paper.ranking.includes("A*")
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-100 text-slate-800 border-slate-200"
                            }`}
                          >
                            {paper.ranking}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {paper.venue} • {paper.year}
                          </span>
                          {paper.citations > 0 && (
                            <span className="text-[11px] font-mono text-slate-400">
                              • {paper.citations} {t.s3.citationsLabel}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-semibold text-slate-900 leading-snug">
                          {paper.title}
                        </h3>

                        <div className="text-xs text-slate-500">
                          <span className="font-medium text-slate-600">
                            {t.s3.authorsLabel}
                          </span>{" "}
                          {paper.authors}
                        </div>

                        {/* Đóng góp chính */}
                        <div className="pt-2 border-t border-slate-100">
                          <span className="font-semibold text-slate-900 text-xs block mb-0.5">
                            {t.s3.keyContributions}
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed text-justify">
                            {paper.getRelevance(language)}
                          </p>
                        </div>

                        {/* Kết quả thực nghiệm */}
                        {paper.getKeyFindings(language) &&
                          paper.getKeyFindings(language).length > 0 && (
                            <div className="pt-1">
                              <span className="font-semibold text-slate-900 text-xs block mb-1">
                                {t.s3.experimentalResults}
                              </span>
                              <ul className="space-y-1 list-disc list-inside text-xs text-slate-600">
                                {paper.getKeyFindings(language).map((finding, fIdx) => (
                                  <li key={fIdx} className="leading-relaxed">
                                    {finding}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>

                      <div className="shrink-0 flex md:flex-col justify-end">
                        <button
                          onClick={() => handleStartReading(paper)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition shadow-xs"
                        >
                          <IconBookOpen size={13} />
                          <span>{t.s3.readPaperBtn}</span>
                          <IconArrowRight size={12} />
                        </button>
                      </div>
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
                {selectedPaper.id.startsWith("upload-") || !hasAnalyzedIdea ? (
                  <button
                    onClick={() => setActiveScreen("S1")}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-mono transition"
                    title={t.s4.backToInit}
                  >
                    <IconArrowLeft size={13} />
                    <span>{t.s4.backToInit}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveScreen("S3")}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-mono transition"
                    title={t.s4.backToPapers}
                  >
                    <IconArrowLeft size={13} />
                    <span>{t.s4.backToPapers}</span>
                  </button>
                )}
                <span className="text-slate-300">|</span>
                <span className="text-slate-700 truncate max-w-md font-medium">
                  {selectedPaper.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-md transition text-xs"
                >
                  <IconUpload size={13} />
                  <span>
                    {selectedPaper.id.startsWith("upload-")
                      ? t.s4.uploadAnotherFile
                      : t.s4.uploadPaper}
                  </span>
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
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                          selectedPaper.id.startsWith("upload-")
                            ? "bg-slate-100 text-slate-700 border-slate-200"
                            : selectedPaper.ranking.includes("A*")
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-100 text-slate-800 border-slate-200"
                        }`}
                      >
                        {selectedPaper.id.startsWith("upload-")
                          ? t.s4.userUploadBadge
                          : selectedPaper.ranking}
                      </span>
                      <span className="text-xs font-mono uppercase text-slate-500">
                        {selectedPaper.venue} ({selectedPaper.year})
                      </span>
                      {selectedPaper.citations > 0 && (
                        <span className="text-xs font-mono text-slate-400">
                          • {selectedPaper.citations} {t.s4.citationsLabel}
                        </span>
                      )}
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                      {selectedPaper.title}
                    </h1>
                    <p className="text-xs text-slate-600 mt-2">
                      <span className="font-semibold text-slate-700">
                        {t.s4.authorsLabel}
                      </span>{" "}
                      {selectedPaper.authors}
                    </p>
                  </div>

                  {/* Thanh gợi ý từ khóa */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between font-medium">
                      <span>{t.s4.highlightHint}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(selectedPaper.getDictionary(language)).map((term) => (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          key={term}
                          onClick={() => triggerExplanation(term)}
                          className="academic-highlight text-xs font-medium text-slate-900"
                          title={language === "ja" ? "クリックして翻訳・解説を表示" : "Bấm để dịch và giải thích ngữ cảnh"}
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
                        {renderHighlightedParagraph(p, highlightedText)}
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
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setSidebarMode("explain")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition ${
                        sidebarMode === "explain"
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <IconHighlight size={14} />
                      <span>{t.s4.tabExplain}</span>
                    </button>

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setSidebarMode("translate")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition ${
                        sidebarMode === "translate"
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <IconTranslate size={14} />
                      <span>{t.s4.tabTranslate}</span>
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
                        {t.s4.emptySelectionTitle}
                      </span>
                      <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                        {t.s4.emptySelectionDesc}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Đoạn văn gốc */}
                      <div className="bg-white border border-slate-200 p-3 rounded">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                          {t.s4.originalQuoteTitle}
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
                              {t.s4.explainTitle}
                            </span>
                            <p className="text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                              {explanationText}
                            </p>
                          </div>

                          {/* Quick Action Prompt Pills */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                              {t.s4.quickPromptTitle}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleQuickPrompt("deeper")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                {t.s4.quickPromptDeeper}
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleQuickPrompt("example")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                {t.s4.quickPromptExample}
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleQuickPrompt("summary")}
                                className="px-2.5 py-1 text-[11px] bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded transition"
                              >
                                {t.s4.quickPromptSummary}
                              </button>
                            </div>
                          </div>

                          {/* Ô nhập yêu cầu giải thích tùy biến */}
                          <form onSubmit={handleSendCustomPrompt} className="pt-2">
                            <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold mb-1">
                              {t.s4.customPromptLabel}
                            </span>
                            <div className="flex items-center gap-1.5 bg-white border border-slate-300 focus-within:border-slate-800 p-1.5 rounded">
                              <input
                                type="text"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={t.s4.customPromptPlaceholder}
                                className="flex-1 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-1.5 bg-transparent"
                              />
                              <button
                                type="submit"
                                disabled={isProcessingPrompt || !customPrompt.trim()}
                                className="p-1.5 bg-slate-900 text-white rounded hover:bg-slate-800 disabled:opacity-40 transition shrink-0"
                                title={t.s4.sendPromptBtn}
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
                            <div className="mb-2">
                              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                                {t.s4.translateTitle}
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-800 font-medium whitespace-pre-line">
                              {translationText}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer nút hành động: Lưu giải thích */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex items-center justify-between">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    disabled={!highlightedText}
                    onClick={handleSaveExplanation}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-medium rounded transition"
                  >
                    <IconArchive size={14} />
                    <span>{t.s4.saveToKnowledgeBtn}</span>
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
                <span>{t.s6.backBtn}</span>
              </button>
              <span className="text-xs font-mono text-slate-500 uppercase">
                {t.s6.headerBadge}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {t.s6.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.s6.description}
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700">
                {savedExplanations.length} {t.s6.savedCount}
              </span>
            </div>

            {savedExplanations.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-500">
                <IconArchive size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium text-slate-700">{t.s6.emptyTitle}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.s6.emptyDesc}
                </p>
                <button
                  onClick={() => setActiveScreen("S4")}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition"
                >
                  {t.s6.backBtn}
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
                          {language === "ja" ? "論文" : "Bài báo"}: {item.paperTitle}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDeleteSaved(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title={t.s6.deleteBtn}
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
                        <span>{language === "ja" ? "この論文の読解を続ける" : "Đọc tiếp bài này"}</span>
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

export default function NatsukiScholarApp() {
  return (
    <LanguageProvider>
      <NatsukiScholarContent />
    </LanguageProvider>
  );
}
