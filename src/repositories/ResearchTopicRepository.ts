import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";

export interface ResearchTopicData {
  key: string;
  title: string;
  keywords: KeywordNode[];
}

/**
 * OOP Repository managing Mock Research Topics, Keyword Maps, and Foundational Papers
 */
export class ResearchTopicRepository {
  private static instance: ResearchTopicRepository;
  private readonly topics: Map<string, ResearchTopicData> = new Map();

  private constructor() {
    this.seedMockData();
  }

  public static getInstance(): ResearchTopicRepository {
    if (!ResearchTopicRepository.instance) {
      ResearchTopicRepository.instance = new ResearchTopicRepository();
    }
    return ResearchTopicRepository.instance;
  }

  public getTopicByKey(key: string): ResearchTopicData {
    return this.topics.get(key) || this.topics.get("ai-vision")!;
  }

  public resolveTopicKeyFromInput(userInput: string): string {
    const lower = userInput.toLowerCase();
    if (lower.includes("rag") || lower.includes("ngôn ngữ") || lower.includes("llm")) {
      return "llm-rag";
    }
    return "ai-vision";
  }

  private seedMockData(): void {
    const paperPlantVillage = new AcademicPaper(
      "paper-1",
      "Using Deep Learning for Image-Based Plant Disease Detection",
      "S. P. Mohanty, D. P. Hughes, M. Salathé",
      2016,
      "Frontiers in Plant Science (3,500+ Citations)",
      "Bài báo nền tảng kinh điển sử dụng tập dữ liệu PlantVillage với mô hình AlexNet và GoogLeNet.",
      [
        "Crop diseases are a major threat to food security, but their rapid identification remains difficult in many parts of the world due to the lack of the necessary infrastructure.",
        "In this study, we train a deep convolutional neural network to identify 14 crop species and 26 diseases using a public dataset of 54,306 images of diseased and healthy plant leaves collected under controlled conditions.",
        "However, when tested on a set of images taken under conditions different from the images used for training, the model's accuracy drops significantly due to domain shift and complex background noise.",
        "To address overfitting and improve generalization in real-field environments, transfer learning from pre-trained ImageNet weights is combined with extensive data augmentation."
      ],
      {
        "deep convolutional neural network":
          "Mạng nơ-ron tích chập sâu (Deep CNN): Mô hình học sâu gồm nhiều lớp tích chập xếp chồng, tự động học các đặc trưng từ cạnh, màu sắc của vết bệnh đến cấu trúc phức tạp trên mặt lá mà không cần trích xuất thủ công.",
        "domain shift":
          "Sự dịch chuyển miền dữ liệu (Domain Shift): Hiện tượng mô hình học trên ảnh chụp phòng thí nghiệm (phông nền trơn, đủ sáng) nhưng lại dự đoán sai khi đưa ra đồng ruộng thực tế (có nắng gắt, bụi bẩn, nhiều lá chồng chéo).",
        "transfer learning":
          "Học chuyển giao (Transfer Learning): Kỹ thuật tận dụng bộ trọng số đã học sẵn trên tập dữ liệu lớn (như ImageNet) để áp dụng cho bài toán bệnh lá cây, giúp tiết kiệm thời gian huấn luyện và tăng độ chính xác khi ít dữ liệu."
      }
    );

    const paperAttention = new AcademicPaper(
      "paper-2",
      "Attention-Embedded Residual Network for Tomato Leaf Disease Recognition",
      "K. Zhang, Q. Wu, A. Liu",
      2021,
      "Computers and Electronics in Agriculture",
      "Giới thiệu cơ chế Attention giúp mô hình tập trung vào đúng đốm bệnh nhỏ và bỏ qua phông nền đất/cỏ.",
      [
        "Traditional CNN architectures often struggle to distinguish subtle lesion features when leaf images contain cluttered field backgrounds.",
        "We propose an attention-embedded residual network (ResNet-CBAM) that integrates channel and spatial attention modules to selectively emphasize diseased regions while suppressing irrelevant background textures."
      ],
      {
        "subtle lesion features":
          "Đặc trưng vết bệnh mờ nhạt (Subtle lesion features): Những đốm bệnh ở giai đoạn đầu có kích thước rất nhỏ và màu sắc gần giống nhau giữa các loại nấm/vi khuẩn.",
        "channel and spatial attention modules":
          "Mô-đun chú ý kênh và không gian (Channel & Spatial Attention): Cơ chế giúp mạng AI tự động đánh trọng số cao hơn cho vùng điểm ảnh chứa vết bệnh ('Where to focus') và kênh màu sắc đặc trưng ('What to focus')."
      }
    );

    this.topics.set("ai-vision", {
      key: "ai-vision",
      title: "Ứng dụng AI nhận diện bệnh trên lá cây (Computer Vision in Plant Pathology)",
      keywords: [
        new KeywordNode(
          "kw-cnn",
          "Convolutional Neural Networks (CNN)",
          "Mạng nơ-ron tích chập",
          "Từ khóa cốt lõi (Core)",
          "Kiến trúc mạng học sâu chuyên dụng để trích xuất đặc trưng hình ảnh (màu sắc, vết đốm, hình dạng lá) qua các lớp tích chập, giúp phân loại chính xác các loại bệnh trên lá cây.",
          "Là nền tảng của 90% nghiên cứu nhận diện bệnh cây trồng hiện nay trước khi chuyển sang các biến thể nâng cao.",
          [paperPlantVillage, paperAttention]
        ),
        new KeywordNode(
          "kw-transfer",
          "Transfer Learning & Fine-tuning",
          "Học chuyển giao & Tinh chỉnh mô hình",
          "Phương pháp huấn luyện (Method)",
          "Kỹ thuật tái sử dụng mô hình AI đã được huấn luyện trên hàng triệu ảnh tổng quát (ImageNet) và tinh chỉnh lại các lớp cuối cho bài toán phân loại bệnh lá cây.",
          "Giúp sinh viên đạt độ chính xác >95% ngay cả khi chỉ có vài nghìn ảnh mẫu và cấu hình máy tính cá nhân hạn chế.",
          [paperPlantVillage]
        ),
        new KeywordNode(
          "kw-vit",
          "Vision Transformer (ViT) for Agriculture",
          "Mô hình Transformer thị giác trong Nông nghiệp",
          "Xu hướng mới (State-of-the-art)",
          "Chia bức ảnh lá cây thành các mảnh nhỏ (patches) và dùng cơ chế Self-Attention để nắm bắt mối liên hệ toàn cục trên cả chiếc lá.",
          "Hướng nghiên cứu mới nổi từ 2022–nay, khắc phục điểm yếu tầm nhìn cục bộ của mạng CNN truyền thống.",
          [paperAttention]
        ),
        new KeywordNode(
          "kw-hyperspectral",
          "Zero-shot Hyperspectral Root Rot Detection",
          "Nhận diện thối rễ qua ảnh siêu phổ Zero-shot",
          "Từ khóa quá hẹp (Niche / Edge Case)",
          "Hướng nghiên cứu cực hẹp kết hợp cảm biến quang phổ hồng ngoại xa và học không mẫu (Zero-shot) dưới lòng đất.",
          "Dùng để kiểm thử trường hợp hệ thống KHÔNG tìm thấy bài báo nền tảng phù hợp (Xử lý ngoại lệ ở Màn hình 3).",
          []
        ),
      ],
    });

    const paperRag = new AcademicPaper(
      "paper-rag-1",
      "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      "Patrick Lewis, Ethan Perez et al. (Meta AI)",
      2020,
      "NeurIPS 2020",
      "Bài báo gốc khai sinh thuật ngữ RAG trong ngành NLP hiện đại.",
      [
        "Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks.",
        "However, their ability to access and precisely manipulate knowledge is still limited, leading to factual hallucinations and lack of provenance for their decisions.",
        "We introduce Retrieval-Augmented Generation (RAG) models which combine parametric memory (a pre-trained seq2seq model) with non-parametric memory (a dense vector index of Wikipedia)."
      ],
      {
        "factual hallucinations":
          "Ảo giác thông tin (Factual Hallucinations): Hiện tượng mô hình AI tự sinh ra các câu trả lời nghe rất trôi chảy, hợp lý nhưng lại sai sự thật hoặc không có trong tài liệu gốc.",
        "parametric memory":
          "Bộ nhớ tham số (Parametric Memory): Tri thức được mã hóa ngầm bên trong hàng tỷ trọng số (weights) của mô hình ngôn ngữ trong quá trình huấn luyện trước.",
        "non-parametric memory":
          "Bộ nhớ phi tham số (Non-parametric Memory): Kho tài liệu văn bản bên ngoài được đánh chỉ mục bằng Vector (Vector Database), có thể cập nhật và tra cứu trực tiếp mà không cần huấn luyện lại mô hình."
      }
    );

    this.topics.set("llm-rag", {
      key: "llm-rag",
      title: "Giảm ảo giác cho Mô hình Ngôn ngữ Lớn (Mitigating Hallucination in LLMs with RAG)",
      keywords: [
        new KeywordNode(
          "kw-rag",
          "Retrieval-Augmented Generation (RAG)",
          "Sinh văn bản tăng cường truy xuất",
          "Từ khóa cốt lõi (Core)",
          "Kỹ thuật kết hợp mô hình ngôn ngữ lớn (LLM) với một hệ thống truy xuất cơ sở dữ liệu tri thức bên ngoài trước khi sinh câu trả lời.",
          "Giúp LLM trả lời dựa trên bằng chứng xác thực, giảm thiểu tối đa hiện tượng bịa đặt thông tin (Hallucination).",
          [paperRag]
        ),
      ],
    });
  }
}
