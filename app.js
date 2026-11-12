// ============================================================================
// MOCK DATA CHO 6 CHỨC NĂNG CỦA NHÓM イチゴ (ICHIGO)
// ============================================================================
const MOCK_TOPICS = {
  "ai-vision": {
    title: "Ứng dụng AI nhận diện bệnh trên lá cây (Computer Vision in Plant Pathology)",
    keywords: [
      {
        id: "kw-cnn",
        labelEn: "Convolutional Neural Networks (CNN)",
        labelVi: "Mạng nơ-ron tích chập",
        level: "Từ khóa cốt lõi (Core)",
        explanation:
          "Kiến trúc mạng học sâu chuyên dụng để trích xuất đặc trưng hình ảnh (màu sắc, vết đốm, hình dạng lá) qua các lớp tích chập, giúp phân loại chính xác các loại bệnh trên lá cây.",
        whyImportant:
          "Là nền tảng của 90% nghiên cứu nhận diện bệnh cây trồng hiện nay trước khi chuyển sang các biến thể nâng cao.",
        papers: [
          {
            id: "paper-1",
            title: "Using Deep Learning for Image-Based Plant Disease Detection",
            authors: "S. P. Mohanty, D. P. Hughes, M. Salathé",
            year: 2016,
            venue: "Frontiers in Plant Science (3,500+ Citations)",
            relevance: "Bài báo nền tảng kinh điển sử dụng tập dữ liệu PlantVillage với mô hình AlexNet và GoogLeNet.",
            paragraphs: [
              "Crop diseases are a major threat to food security, but their rapid identification remains difficult in many parts of the world due to the lack of the necessary infrastructure.",
              "In this study, we train a deep convolutional neural network to identify 14 crop species and 26 diseases using a public dataset of 54,306 images of diseased and healthy plant leaves collected under controlled conditions.",
              "However, when tested on a set of images taken under conditions different from the images used for training, the model's accuracy drops significantly due to domain shift and complex background noise.",
              "To address overfitting and improve generalization in real-field environments, transfer learning from pre-trained ImageNet weights is combined with extensive data augmentation."
            ],
            dictionary: {
              "deep convolutional neural network":
                "Mạng nơ-ron tích chập sâu (Deep CNN): Mô hình học sâu gồm nhiều lớp tích chập xếp chồng, tự động học các đặc trưng từ cạnh, màu sắc của vết bệnh đến cấu trúc phức tạp trên mặt lá mà không cần trích xuất thủ công.",
              "domain shift":
                "Sự dịch chuyển miền dữ liệu (Domain Shift): Hiện tượng mô hình học trên ảnh chụp phòng thí nghiệm (phông nền trơn, đủ sáng) nhưng lại dự đoán sai khi đưa ra đồng ruộng thực tế (có nắng gắt, bụi bẩn, nhiều lá chồng chéo).",
              "transfer learning":
                "Học chuyển giao (Transfer Learning): Kỹ thuật tận dụng bộ trọng số đã học sẵn trên tập dữ liệu lớn (như ImageNet) để áp dụng cho bài toán bệnh lá cây, giúp tiết kiệm thời gian huấn luyện và tăng độ chính xác khi ít dữ liệu."
            }
          },
          {
            id: "paper-2",
            title: "Attention-Embedded Residual Network for Tomato Leaf Disease Recognition",
            authors: "K. Zhang, Q. Wu, A. Liu",
            year: 2021,
            venue: "Computers and Electronics in Agriculture",
            relevance: "Giới thiệu cơ chế Attention giúp mô hình tập trung vào đúng đốm bệnh nhỏ và bỏ qua phông nền đất/cỏ.",
            paragraphs: [
              "Traditional CNN architectures often struggle to distinguish subtle lesion features when leaf images contain cluttered field backgrounds.",
              "We propose an attention-embedded residual network (ResNet-CBAM) that integrates channel and spatial attention modules to selectively emphasize diseased regions while suppressing irrelevant background textures."
            ],
            dictionary: {
              "subtle lesion features":
                "Đặc trưng vết bệnh mờ nhạt (Subtle lesion features): Những đốm bệnh ở giai đoạn đầu có kích thước rất nhỏ và màu sắc gần giống nhau giữa các loại nấm/vi khuẩn.",
              "channel and spatial attention modules":
                "Mô-đun chú ý kênh và không gian (Channel & Spatial Attention): Cơ chế giúp mạng AI tự động đánh trọng số cao hơn cho vùng điểm ảnh chứa vết bệnh ('Where to focus') và kênh màu sắc đặc trưng ('What to focus')."
            }
          }
        ]
      },
      {
        id: "kw-transfer",
        labelEn: "Transfer Learning & Fine-tuning",
        labelVi: "Học chuyển giao & Tinh chỉnh mô hình",
        level: "Phương pháp huấn luyện (Method)",
        explanation:
          "Kỹ thuật tái sử dụng mô hình AI đã được huấn luyện trên hàng triệu ảnh tổng quát (ImageNet) và tinh chỉnh lại các lớp cuối cho bài toán phân loại bệnh lá cây.",
        whyImportant:
          "Giúp sinh viên đạt độ chính xác >95% ngay cả khi chỉ có vài nghìn ảnh mẫu và cấu hình máy tính cá nhân hạn chế.",
        papers: [
          {
            id: "paper-1",
            title: "Using Deep Learning for Image-Based Plant Disease Detection",
            authors: "S. P. Mohanty, D. P. Hughes, M. Salathé",
            year: 2016,
            venue: "Frontiers in Plant Science",
            relevance: "So sánh trực tiếp hiệu quả giữa huấn luyện từ đầu (Training from scratch) và Học chuyển giao (Transfer Learning).",
            paragraphs: [
              "In this study, we train a deep convolutional neural network to identify 14 crop species and 26 diseases using a public dataset of 54,306 images of diseased and healthy plant leaves collected under controlled conditions.",
              "However, when tested on a set of images taken under conditions different from the images used for training, the model's accuracy drops significantly due to domain shift and complex background noise.",
              "To address overfitting and improve generalization in real-field environments, transfer learning from pre-trained ImageNet weights is combined with extensive data augmentation."
            ],
            dictionary: {
              "transfer learning":
                "Học chuyển giao (Transfer Learning): Kỹ thuật tận dụng bộ trọng số đã học sẵn trên tập dữ liệu lớn (như ImageNet) để áp dụng cho bài toán bệnh lá cây.",
              "domain shift":
                "Sự dịch chuyển miền dữ liệu (Domain Shift): Sự khác biệt phân phối giữa ảnh phòng thí nghiệm và ảnh ngoài đồng ruộng thực tế."
            }
          }
        ]
      },
      {
        id: "kw-vit",
        labelEn: "Vision Transformer (ViT) for Agriculture",
        labelVi: "Mô hình Transformer thị giác trong Nông nghiệp",
        level: "Xu hướng mới (State-of-the-art)",
        explanation:
          "Chia bức ảnh lá cây thành các mảnh nhỏ (patches) và dùng cơ chế Self-Attention để nắm bắt mối liên hệ toàn cục trên cả chiếc lá.",
        whyImportant:
          "Hướng nghiên cứu mới nổi từ 2022–nay, khắc phục điểm yếu tầm nhìn cục bộ của mạng CNN truyền thống.",
        papers: [
          {
            id: "paper-2",
            title: "Attention-Embedded Residual Network for Tomato Leaf Disease Recognition",
            authors: "K. Zhang, Q. Wu, A. Liu",
            year: 2021,
            venue: "Computers and Electronics in Agriculture",
            relevance: "Bước chuyển giao quan trọng từ tích chập thuần túy sang cơ chế Attention trong nhận diện bệnh lá.",
            paragraphs: [
              "Traditional CNN architectures often struggle to distinguish subtle lesion features when leaf images contain cluttered field backgrounds.",
              "We propose an attention-embedded residual network (ResNet-CBAM) that integrates channel and spatial attention modules to selectively emphasize diseased regions while suppressing irrelevant background textures."
            ],
            dictionary: {
              "subtle lesion features":
                "Đặc trưng vết bệnh mờ nhạt: Những đốm bệnh nhỏ ở giai đoạn sớm dễ bị nhầm lẫn.",
              "channel and spatial attention modules":
                "Mô-đun chú ý kênh và không gian: Cơ chế giúp mô hình tập trung vào đúng vùng lá bị bệnh và bỏ qua phông nền."
            }
          }
        ]
      },
      {
        id: "kw-hyperspectral",
        labelEn: "Zero-shot Hyperspectral Root Rot Detection",
        labelVi: "Nhận diện thối rễ qua ảnh siêu phổ Zero-shot",
        level: "Từ khóa quá hẹp (Niche / Edge Case)",
        explanation:
          "Hướng nghiên cứu cực hẹp kết hợp cảm biến quang phổ hồng ngoại xa và học không mẫu (Zero-shot) dưới lòng đất.",
        whyImportant:
          "Dùng để kiểm thử trường hợp hệ thống KHÔNG tìm thấy bài báo nền tảng phù hợp (Xử lý ngoại lệ ở Màn hình 3).",
        papers: [] // Cố tình để rỗng để test luồng Không có kết quả ở Màn hình 3
      }
    ]
  },

  "llm-rag": {
    title: "Giảm ảo giác cho Mô hình Ngôn ngữ Lớn (Mitigating Hallucination in LLMs with RAG)",
    keywords: [
      {
        id: "kw-rag",
        labelEn: "Retrieval-Augmented Generation (RAG)",
        labelVi: "Sinh văn bản tăng cường truy xuất",
        level: "Từ khóa cốt lõi (Core)",
        explanation:
          "Kỹ thuật kết hợp mô hình ngôn ngữ lớn (LLM) với một hệ thống truy xuất cơ sở dữ liệu tri thức bên ngoài trước khi sinh câu trả lời.",
        whyImportant:
          "Giúp LLM trả lời dựa trên bằng chứng xác thực, giảm thiểu tối đa hiện tượng bịa đặt thông tin (Hallucination).",
        papers: [
          {
            id: "paper-rag-1",
            title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
            authors: "Patrick Lewis, Ethan Perez et al. (Meta AI)",
            year: 2020,
            venue: "NeurIPS 2020",
            relevance: "Bài báo gốc khai sinh thuật ngữ RAG trong ngành NLP hiện đại.",
            paragraphs: [
              "Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks.",
              "However, their ability to access and precisely manipulate knowledge is still limited, leading to factual hallucinations and lack of provenance for their decisions.",
              "We introduce Retrieval-Augmented Generation (RAG) models which combine parametric memory (a pre-trained seq2seq model) with non-parametric memory (a dense vector index of Wikipedia)."
            ],
            dictionary: {
              "factual hallucinations":
                "Ảo giác thông tin (Factual Hallucinations): Hiện tượng mô hình AI tự sinh ra các câu trả lời nghe rất trôi chảy, hợp lý nhưng lại sai sự thật hoặc không có trong tài liệu gốc.",
              "parametric memory":
                "Bộ nhớ tham số (Parametric Memory): Tri thức được mã hóa ngầm bên trong hàng tỷ trọng số (weights) của mô hình ngôn ngữ trong quá trình huấn luyện trước.",
              "non-parametric memory":
                "Bộ nhớ phi tham số (Non-parametric Memory): Kho tài liệu văn bản bên ngoài được đánh chỉ mục bằng Vector (Vector Database), có thể cập nhật và tra cứu trực tiếp mà không cần huấn luyện lại mô hình."
            }
          }
        ]
      }
    ]
  }
};

// ============================================================================
// QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)
// ============================================================================
let currentScreen = "S1";
let currentTopicKey = "ai-vision";
let currentKeyword = null;
let currentPaper = null;
let currentSelection = { text: "", explanation: "" };
let savedExplanations = [];

const STORAGE_KEY = "ichigo_mvp_saved_explanations";

// Khởi chạy khi tải trang
window.addEventListener("DOMContentLoaded", () => {
  loadSavedFromStorage();
  // Khởi tạo sẵn dữ liệu mặc định để nếu user bấm thẳng trên thanh Stepper vẫn có dữ liệu xem
  currentKeyword = MOCK_TOPICS["ai-vision"].keywords[0];
  currentPaper = currentKeyword.papers[0];
  document.getElementById("topic-input").value = MOCK_TOPICS["ai-vision"].title;
  updateStepperUI("S1");
});

// ============================================================================
// ĐIỀU HƯỚNG CHUYỂN MÀN HÌNH (S1 <-> S2 <-> S3 <-> S4 <-> S5 <-> S6)
// ============================================================================
function goToScreen(screenId) {
  // Ẩn tất cả section
  document.querySelectorAll(".screen-section").forEach((el) => el.classList.add("hidden"));

  // S5 là Panel nằm trên cùng giao diện đọc của S4
  if (screenId === "S5") {
    document.getElementById("screen-S4").classList.remove("hidden");
    renderScreenS4();
    if (!currentSelection.text) {
      // Tự động demo chọn 1 thuật ngữ mẫu nếu bấm trực tiếp nút 5 trên thanh điều hướng
      const sampleTerm = Object.keys(currentPaper.dictionary)[0];
      triggerExplanationForText(sampleTerm);
    }
  } else {
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.remove("hidden");
  }

  currentScreen = screenId;
  updateStepperUI(screenId);

  // Render dữ liệu tương ứng cho từng màn hình
  if (screenId === "S2") renderScreenS2();
  if (screenId === "S3") renderScreenS3();
  if (screenId === "S4") renderScreenS4();
  if (screenId === "S6") renderScreenS6();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateStepperUI(activeId) {
  const steps = ["S1", "S2", "S3", "S4", "S5", "S6"];
  steps.forEach((id) => {
    const btn = document.getElementById(`step-${id}`);
    if (btn) {
      btn.className = "step-pill px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 shrink-0";
      if (id === activeId) {
        if (id === "S1") btn.classList.add("active-shared");
        else if (id === "S2" || id === "S3") btn.classList.add("active-sol1");
        else btn.classList.add("active-sol2");
      }
    }

    const sideBtn = document.getElementById(`side-${id}`);
    if (sideBtn) {
      sideBtn.classList.remove("active-nav");
      if (id === activeId) sideBtn.classList.add("active-nav");
    }
  });
}

// ============================================================================
// XỬ LÝ MÀN HÌNH 1 (TRANG CHỦ & NHẬP CHỦ ĐỀ)
// ============================================================================
function selectPresetTopic(presetKey) {
  const input = document.getElementById("topic-input");
  const errEl = document.getElementById("s1-error");
  errEl.classList.add("hidden");

  if (presetKey === "ai-vision") {
    currentTopicKey = "ai-vision";
    input.value = "Ứng dụng AI nhận diện bệnh trên lá cây (Computer Vision)";
  } else if (presetKey === "llm-rag") {
    currentTopicKey = "llm-rag";
    input.value = "Giảm ảo giác cho mô hình ngôn ngữ lớn bằng RAG";
  } else if (presetKey === "empty-test") {
    currentTopicKey = "ai-vision";
    input.value = "Nhận diện thối rễ qua ảnh siêu phổ Zero-shot (Chủ đề quá hẹp)";
  }
}

function handleAnalyzeTopic() {
  const inputVal = document.getElementById("topic-input").value.trim();
  const errEl = document.getElementById("s1-error");

  // Xử lý tình huống ngoại lệ: Nhập thiếu thông tin
  if (inputVal.length < 3) {
    errEl.classList.remove("hidden");
    return;
  }
  errEl.classList.add("hidden");

  // Tự động chọn bộ Mock phù hợp với từ khóa nhập
  if (inputVal.toLowerCase().includes("rag") || inputVal.toLowerCase().includes("ngôn ngữ")) {
    currentTopicKey = "llm-rag";
  } else {
    currentTopicKey = "ai-vision";
  }

  goToScreen("S2");
}

// ============================================================================
// XỬ LÝ MÀN HÌNH 2 (F1.1: SƠ ĐỒ TỪ KHÓA HỌC THUẬT)
// ============================================================================
function renderScreenS2() {
  const topicData = MOCK_TOPICS[currentTopicKey];
  const userText = document.getElementById("topic-input").value.trim() || topicData.title;
  document.getElementById("s2-topic-title").textContent = userText;

  const container = document.getElementById("keyword-map-container");
  const nodesHtml = topicData.keywords
    .map(
      (kw, idx) => `
      <div
        onclick="selectKeywordNode('${kw.id}')"
        class="keyword-node cursor-pointer bg-blue-50/70 hover:bg-blue-100/80 border-2 border-blue-300 rounded-2xl p-5 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
              Node ${idx + 1} • ${kw.level}
            </span>
            <span class="text-xs text-blue-700 font-semibold">${kw.papers.length} bài báo</span>
          </div>
          <h4 class="font-bold text-base text-slate-900 mb-1">${kw.labelEn}</h4>
          <p class="text-xs font-medium text-blue-800 mb-2">${kw.labelVi}</p>
          <p class="text-xs text-slate-600 line-clamp-2">${kw.explanation}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs font-semibold text-blue-700">
          <span>Xem giải thích & Bài báo nền tảng</span>
          <span>→</span>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="flex flex-col items-center">
      <!-- Nút gốc (Root Topic) -->
      <div class="bg-orange-100 border-2 border-orange-400 text-orange-950 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm text-center max-w-xl">
        🎯 Chủ đề gốc: ${userText}
      </div>
      <div class="h-6 w-0.5 bg-blue-300"></div>
      <div class="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-4">
        Phân rã thành các nhánh Từ khóa Học thuật chuyên ngành (Nhấp vào 1 ô để sang Màn hình 3)
      </div>
      <!-- Lưới các Node từ khóa -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        ${nodesHtml}
      </div>
    </div>
  `;
}

function selectKeywordNode(keywordId) {
  const topicData = MOCK_TOPICS[currentTopicKey];
  const found = topicData.keywords.find((k) => k.id === keywordId);
  if (found) {
    currentKeyword = found;
    goToScreen("S3");
  }
}

// ============================================================================
// XỬ LÝ MÀN HÌNH 3 (F1.2: GIẢI THÍCH TỪ KHÓA & F1.3: ĐỀ XUẤT BÀI BÁO)
// ============================================================================
function renderScreenS3() {
  if (!currentKeyword) {
    currentKeyword = MOCK_TOPICS[currentTopicKey].keywords[0];
  }

  document.getElementById("s3-keyword-title").textContent = currentKeyword.labelEn;
  document.getElementById("s3-keyword-vi").textContent = currentKeyword.labelVi;
  document.getElementById("s3-keyword-desc").textContent = currentKeyword.explanation;
  document.getElementById("s3-keyword-why").textContent = currentKeyword.whyImportant;

  const papersContainer = document.getElementById("s3-papers-list");

  // Xử lý tình huống ngoại lệ: Từ khóa quá hẹp không có bài báo nền tảng
  if (!currentKeyword.papers || currentKeyword.papers.length === 0) {
    papersContainer.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div class="text-3xl mb-2">📭</div>
        <h4 class="font-bold text-red-800 text-base mb-1">
          Không tìm thấy bài báo nền tảng phù hợp cho từ khóa này!
        </h4>
        <p class="text-xs text-red-600 mb-4">
          Từ khóa <strong>"${currentKeyword.labelEn}"</strong> có phạm vi quá hẹp. Vui lòng quay lại Sơ đồ từ khóa (Màn hình 2) để chọn một nhánh từ khóa khác rộng hơn.
        </p>
        <button
          onclick="goToScreen('S2')"
          class="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
        >
          ← Quay lại Sơ đồ chọn từ khóa khác
        </button>
      </div>
    `;
    return;
  }

  papersContainer.innerHTML = currentKeyword.papers
    .map(
      (paper) => `
      <div class="border border-slate-200 hover:border-blue-300 rounded-xl p-5 bg-white shadow-sm transition">
        <div class="flex items-start justify-between gap-3">
          <div>
            <span class="inline-block text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded mb-1.5">
              ${paper.venue} • ${paper.year}
            </span>
            <h4 class="font-bold text-base text-slate-900 mb-1">${paper.title}</h4>
            <p class="text-xs text-slate-500 mb-2">Tác giả: ${paper.authors}</p>
          </div>
        </div>
        <p class="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
          <strong>Mức độ liên quan:</strong> ${paper.relevance}
        </p>
        <div class="flex justify-end">
          <button
            onclick="openPaperInReader('${paper.id}')"
            class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <span>📖 Chọn đọc bài báo này (Sang Màn hình 4 - Solution 2)</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

function openPaperInReader(paperId) {
  const found = currentKeyword.papers.find((p) => p.id === paperId);
  if (found) {
    currentPaper = found;
    closeS5Panel();
    goToScreen("S4");
  }
}

// ============================================================================
// XỬ LÝ MÀN HÌNH 4 & 5 (F2.1: ĐỌC & BÔI ĐEN | F2.2: GIẢI THÍCH NGỮ CẢNH)
// ============================================================================
function renderScreenS4() {
  if (!currentPaper) {
    currentPaper = MOCK_TOPICS["ai-vision"].keywords[0].papers[0];
  }

  document.getElementById("s4-paper-title").textContent = currentPaper.title;
  document.getElementById("s4-paper-meta").textContent = `${currentPaper.authors} • ${currentPaper.venue} (${currentPaper.year})`;

  // Tô vàng các cụm từ có sẵn trong từ điển ngữ cảnh để người dùng dễ thấy hoặc click nhanh
  const contentEl = document.getElementById("s4-paper-content");
  const dictKeys = Object.keys(currentPaper.dictionary || {});

  const paragraphsHtml = currentPaper.paragraphs
    .map((para) => {
      let highlightedPara = para;
      dictKeys.forEach((term) => {
        const regex = new RegExp(`(${term})`, "gi");
        highlightedPara = highlightedPara.replace(
          regex,
          `<span class="highlight-hint" onclick="triggerExplanationForText('$1')" title="Bôi đen hoặc click để xem giải thích ngữ cảnh">$1</span>`
        );
      });
      return `<p class="mb-4">${highlightedPara}</p>`;
    })
    .join("");

  contentEl.innerHTML = paragraphsHtml;
}

function handleTextSelection() {
  const selected = window.getSelection().toString().trim();
  if (!selected) return;

  // Xử lý tình huống ngoại lệ: Bôi đen quá ngắn (dưới 4 ký tự)
  if (selected.length < 4) {
    document.getElementById("s5-empty-state").classList.add("hidden");
    document.getElementById("s5-active-state").classList.add("hidden");
    document.getElementById("s5-error-state").classList.remove("hidden");
    return;
  }

  triggerExplanationForText(selected);
}

function triggerExplanationForText(text) {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();
  const dict = currentPaper.dictionary || {};

  // Tìm xem đoạn bôi đen có khớp với thuật ngữ chuyên ngành trong bài báo không
  let explanation = null;
  for (const [term, desc] of Object.entries(dict)) {
    if (lowerText.includes(term.toLowerCase()) || term.toLowerCase().includes(lowerText)) {
      explanation = desc;
      break;
    }
  }

  // Nếu người dùng bôi đen 1 câu bất kỳ ngoài các từ khóa tô vàng, sinh giải thích ngữ cảnh tự động theo bài báo
  if (!explanation) {
    explanation = `Trong ngữ cảnh của bài báo "${currentPaper.title}", đoạn văn này phân tích phương pháp thực nghiệm và thách thức kỹ thuật khi áp dụng mô hình học sâu vào dữ liệu thực tế, làm cơ sở để đối chiếu độ chính xác của mô hình.`;
  }

  currentSelection = {
    text: cleanText,
    explanation: explanation
  };

  // Bật giao diện Màn hình 5 (Khung giải thích ngữ cảnh)
  document.getElementById("s5-empty-state").classList.add("hidden");
  document.getElementById("s5-error-state").classList.add("hidden");
  document.getElementById("s5-active-state").classList.remove("hidden");

  const panel = document.getElementById("s5-panel");
  panel.classList.remove("border-dashed", "border-slate-300", "bg-slate-50/50");
  panel.classList.add("border-solid", "border-emerald-400", "bg-emerald-50/40", "shadow-md");

  document.getElementById("s5-selected-text").textContent = `"${cleanText}"`;
  document.getElementById("s5-explanation-text").textContent = explanation;

  updateStepperUI("S5");
}

function closeS5Panel() {
  currentSelection = { text: "", explanation: "" };
  document.getElementById("s5-active-state").classList.add("hidden");
  document.getElementById("s5-error-state").classList.add("hidden");
  document.getElementById("s5-empty-state").classList.remove("hidden");

  const panel = document.getElementById("s5-panel");
  panel.classList.add("border-dashed", "border-slate-300", "bg-slate-50/50");
  panel.classList.remove("border-solid", "border-emerald-400", "bg-emerald-50/40", "shadow-md");

  updateStepperUI("S4");
}

// ============================================================================
// XỬ LÝ MÀN HÌNH 6 (F2.3: LƯU TRỮ PHẦN GIẢI THÍCH NGỮ CẢNH ĐÃ BÔI ĐEN)
// ============================================================================
function saveCurrentExplanation() {
  if (!currentSelection.text) return;

  const newItem = {
    id: "saved-" + Date.now(),
    paperTitle: currentPaper ? currentPaper.title : "Bài báo nghiên cứu",
    keywordLabel: currentKeyword ? currentKeyword.labelEn : "General",
    selectedText: currentSelection.text,
    explanation: currentSelection.explanation,
    createdAt: new Date().toLocaleString("vi-VN")
  };

  savedExplanations.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedExplanations));
  updateSavedBadge();
  showToast("✅ Đã lưu giải thích ngữ cảnh vào Kho lưu trữ (Màn hình 6)!");
  goToScreen("S6");
}

function loadSavedFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      savedExplanations = JSON.parse(raw);
    } else {
      // Khởi tạo 1 dữ liệu mẫu trong kho lưu trữ để dễ hình dung
      savedExplanations = [
        {
          id: "sample-1",
          paperTitle: "Using Deep Learning for Image-Based Plant Disease Detection",
          keywordLabel: "Convolutional Neural Networks (CNN)",
          selectedText: "domain shift and complex background noise",
          explanation:
            "Sự dịch chuyển miền dữ liệu (Domain Shift): Hiện tượng mô hình học trên ảnh chụp phòng thí nghiệm nhưng dự đoán sai khi đưa ra đồng ruộng thực tế có phông nền phức tạp.",
          createdAt: "Mẫu có sẵn"
        }
      ];
    }
  } catch (e) {
    savedExplanations = [];
  }
  updateSavedBadge();
}

function updateSavedBadge() {
  const badge = document.getElementById("saved-count-badge");
  if (badge) badge.textContent = savedExplanations.length;
  const topBadge = document.getElementById("top-saved-count");
  if (topBadge) topBadge.textContent = savedExplanations.length;
}

function renderScreenS6() {
  const listEl = document.getElementById("s6-saved-list");
  if (savedExplanations.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div class="text-3xl mb-2">🗂️</div>
        <h4 class="font-bold text-slate-700 mb-1">Kho lưu trữ đang trống</h4>
        <p class="text-xs text-slate-500 mb-4">
          Hãy quay lại Màn hình 4, bôi đen văn bản và nhấn "Lưu giải thích" ở Màn hình 5.
        </p>
        <button
          onclick="goToScreen('S4')"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
        >
          ← Quay lại đọc bài báo (S4)
        </button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = savedExplanations
    .map(
      (item) => `
      <div class="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              📄 ${item.paperTitle}
            </span>
            <span class="text-xs text-slate-400">• ${item.createdAt}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              onclick="goToScreen('S4')"
              class="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Đọc tiếp bài này →
            </button>
            <button
              onclick="deleteSavedItem('${item.id}')"
              class="text-xs text-red-500 hover:text-red-700 ml-2"
            >
              Xóa
            </button>
          </div>
        </div>
        <blockquote class="p-3 bg-amber-50 border-l-4 border-amber-400 text-xs italic text-slate-800 rounded-r-lg mb-3">
          "${item.selectedText}"
        </blockquote>
        <div class="text-sm text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200 leading-relaxed">
          <strong class="text-emerald-800">Giải thích ngữ cảnh:</strong> ${item.explanation}
        </div>
      </div>
    `
    )
    .join("");
}

function deleteSavedItem(id) {
  savedExplanations = savedExplanations.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedExplanations));
  updateSavedBadge();
  renderScreenS6();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}
