import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";

export interface ResearchTopicData {
  key: string;
  title: string;
  subDomain: string;
  keywords: KeywordNode[];
}

/**
 * Repository quản lý Dummy Data cho MVP Natsuki Scholar
 * Cung cấp 3 chủ đề học thuật CNTT chuẩn mực để demo trọn vẹn luồng
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
    return this.topics.get(key) || this.topics.get("low-light-face")!;
  }

  public getAllTopics(): ResearchTopicData[] {
    return Array.from(this.topics.values());
  }

  public resolveTopicKeyFromInput(userInput: string): string {
    const lower = userInput.toLowerCase();
    if (
      lower.includes("dưới nước") ||
      lower.includes("cảm biến") ||
      lower.includes("underwater") ||
      lower.includes("acoustic")
    ) {
      return "underwater-sensor";
    }
    if (
      lower.includes("cảm xúc") ||
      lower.includes("tình cảm") ||
      lower.includes("tiếng việt") ||
      lower.includes("nlp") ||
      lower.includes("sentiment") ||
      lower.includes("ngôn ngữ")
    ) {
      return "vietnamese-nlp";
    }
    return "low-light-face";
  }

  private seedMockData(): void {
    // ----------------------------------------------------
    // CHỦ ĐỀ 1: NHẬN DIỆN KHUÔN MẶT THIẾU SÁNG
    // ----------------------------------------------------
    const paperFace1 = new AcademicPaper(
      "paper-face-1",
      "Face Recognition in Low-Light Environments via Deep Domain Adaptation",
      "Z. Zhang, X. Liu, H. Chen (Tsinghua & CMU)",
      2022,
      "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)",
      "Bài báo nền tảng giải quyết trực tiếp rào cản suy giảm độ chính xác khi nhận diện khuôn mặt ban đêm hoặc trong điều kiện ánh sáng cực yếu.",
      [
        "Facial recognition algorithms have achieved outstanding verification accuracy under well-illuminated conditions. However, performance degrades drastically in low-light environments due to severe signal attenuation and non-uniform noise distribution.",
        "Traditional image enhancement methods often amplify high-frequency sensor noise, corrupting critical facial landmarks required for deep feature alignment.",
        "In this work, we formulate low-light face recognition as an unsupervised domain adaptation problem. We introduce an illumination-invariant feature extractor that maps low-light probe images and normal-light gallery images into a shared latent manifold.",
        "Extensive experiments demonstrate that our approach maintains a 96.4% verification rate at 10^-5 false acceptance rate, outperforming standard CNN backbones without requiring paired synthetic training datasets."
      ],
      {
        "signal attenuation":
          "Sự suy giảm tín hiệu quang học (Signal Attenuation): Hiện tượng cảm biến camera nhận quá ít photon trong điều kiện thiếu sáng, dẫn đến dải tương phản (dynamic range) bị nén và mất toàn bộ chi tiết sắc nét trên khuôn mặt.",
        "unsupervised domain adaptation":
          "Thích ứng miền không giám sát (Unsupervised Domain Adaptation): Kỹ thuật học máy giúp mô hình được huấn luyện trên miền dữ liệu đủ sáng (Source Domain) có thể tự thích ứng và dự đoán chính xác trên miền ảnh thiếu sáng (Target Domain) mà không cần nhãn gán thủ công.",
        "illumination-invariant feature extractor":
          "Bộ trích xuất đặc trưng bất biến ánh sáng (Illumination-Invariant Extractor): Kiến trúc mạng nơ-ron được thiết kế để chỉ trích xuất các đặc trưng hình học cố định (khoảng cách mắt, sống mũi) và triệt tiêu biến thiên do cường độ chiếu sáng gây ra.",
        "false acceptance rate":
          "Tỷ lệ chấp nhận sai (FAR - False Acceptance Rate): Xác suất hệ thống nhận nhầm người lạ thành người hợp lệ trong cơ sở dữ liệu. Trong các bài báo bảo mật sinh trắc học, mức 10^-5 là tiêu chuẩn khắt khe."
      },
      {
        "signal attenuation": "Sự suy giảm tín hiệu quang học",
        "unsupervised domain adaptation": "Thích ứng miền không giám sát",
        "illumination-invariant feature extractor": "Bộ trích xuất đặc trưng bất biến với ánh sáng",
        "false acceptance rate": "Tỷ lệ chấp nhận sai (FAR)"
      }
    );

    const paperFace2 = new AcademicPaper(
      "paper-face-2",
      "NIR-to-Visible Face Synthesis and Verification Using Coupled Attention GANs",
      "Y. Wang, R. He, T. Tan (Chinese Academy of Sciences)",
      2021,
      "IEEE International Conference on Computer Vision (ICCV)",
      "Đề xuất phương pháp chuyển đổi ảnh hồng ngoại gần (NIR - ban đêm) sang ảnh ánh sáng nhìn thấy (VIS) để tái sử dụng cơ sở dữ liệu ảnh thẻ thông thường.",
      [
        "Active near-infrared (NIR) imaging is widely adopted for surveillance in total darkness, yet matching NIR queries against standard visible (VIS) gallery databases remains an open challenge due to significant modality discrepancy.",
        "We introduce a coupled attention Generative Adversarial Network that disentangles identity representations from spectral illumination artifacts.",
        "By preserving structural facial geometry across spectral domains, our framework reduces cross-modal identification error by 38% on standard benchmark datasets."
      ],
      {
        "modality discrepancy":
          "Độ sai lệch phương thức quang phổ (Modality Discrepancy): Sự khác biệt cơ bản về phản xạ bề mặt da giữa tia hồng ngoại gần (NIR) và ánh sáng nhìn thấy (VIS), khiến các mạng CNN thông thường không nhận diện được cùng một người.",
        "disentangles identity representations":
          "Tách bạch biểu diễn danh tính (Disentanglement): Kỹ thuật phân tách véc-tơ đặc trưng khuôn mặt thành 2 phần độc lập: phần đại diện cho cấu trúc sinh trắc học cá nhân và phần biểu diễn hiệu ứng quang phổ môi trường."
      }
    );

    this.topics.set("low-light-face", {
      key: "low-light-face",
      title: "Nhận diện khuôn mặt trong điều kiện thiếu sáng",
      subDomain: "Thị giác máy tính & Xử lý ảnh (Computer Vision)",
      keywords: [
        new KeywordNode(
          "kw-llfr",
          "Low-Light Face Recognition (LLFR)",
          "Nhận diện khuôn mặt trong điều kiện thiếu sáng",
          "Từ khóa cốt lõi (Core)",
          "Thuật ngữ học thuật chuẩn mực quốc tế dùng để chỉ bài toán nhận diện sinh trắc học khi ảnh đầu vào bị nhiễu hạt nghiêm trọng và thiếu sáng trầm trọng.",
          "Thay vì tìm 'night face detection' hay 'dark image', giới nghiên cứu IEEE/ACM sử dụng 'Low-Light Face Recognition' để định vị toàn bộ các công trình giải quyết suy hao tín hiệu ban đêm.",
          [paperFace1, paperFace2]
        ),
        new KeywordNode(
          "kw-uda",
          "Unsupervised Domain Adaptation",
          "Thích ứng miền không giám sát",
          "Phương pháp luận (Methodology)",
          "Phương pháp huấn luyện cầu nối giữa tập dữ liệu ảnh đủ sáng ban ngày và ảnh thiếu sáng ban đêm mà không cần gán nhãn lại từ đầu.",
          "Đây là giải pháp hiện đại được ưa chuộng nhất trong các đồ án tốt nghiệp khi sinh viên không có điều kiện tự thu thập hàng chục nghìn bức ảnh khuôn mặt trong bóng tối.",
          [paperFace1]
        ),
        new KeywordNode(
          "kw-nir-vis",
          "Heterogeneous NIR-to-VIS Face Matching",
          "Đối chiếu khuôn mặt đa phổ Hồng ngoại - Ánh sáng thường",
          "Kỹ thuật phần cứng & Đa phổ (Hardware & Multimodal)",
          "Bài toán kết hợp cảm biến camera hồng ngoại để ghi nhận khuôn mặt trong bóng tối hoàn toàn rồi đối chiếu ngược với ảnh chụp CCCD/CMND thông thường.",
          "Được áp dụng thực tế trong các hệ thống an ninh và camera giám sát thông minh.",
          [paperFace2]
        ),
      ],
    });

    // ----------------------------------------------------
    // CHỦ ĐỀ 2: MẠNG CẢM BIẾN DƯỚI NƯỚC (UASN)
    // ----------------------------------------------------
    const paperUasn1 = new AcademicPaper(
      "paper-uasn-1",
      "Underwater Acoustic Sensor Networks: Research Challenges and Routing Protocols",
      "I. F. Akyildiz, D. Pompili, T. Melodia",
      2005,
      "IEEE Communications Magazine (7,200+ Citations)",
      "Bài báo kinh điển được trích dẫn nhiều nhất thế giới, đặt nền móng toàn diện cho các nghiên cứu về mạng cảm biến âm học dưới nước.",
      [
        "Underwater Acoustic Sensor Networks (UW-ASNs) consist of variable numbers of sensors and vehicles deployed to perform collaborative monitoring tasks over given oceanographic areas.",
        "Traditional radio frequency (RF) electromagnetic waves propagate through conductive sea water only at extremely low frequencies with severe attenuation. Therefore, acoustic communications are predominantly employed as the physical transmission medium.",
        "However, underwater acoustic channels feature extremely long propagation delays, severely limited bandwidth, high bit error rates, and dynamic time-varying multipath fading.",
        "These physical constraints render terrestrial ad-hoc routing protocols ineffective, demanding cross-layer network protocol architectures tailored to deep ocean environments."
      ],
      {
        "acoustic communications":
          "Truyền thông sóng âm dưới nước (Acoustic Communications): Thay vì dùng sóng vô tuyến (RF/Wifi) bị nước biển hấp thụ rất mạnh, hệ thống bắt buộc phải dùng sóng âm thanh với tốc độ truyền chậm hơn sóng vô tuyến khoảng 200.000 lần (khoảng 1500 m/s).",
        "propagation delays":
          "Độ trễ truyền lan tín hiệu (Propagation Delays): Khoảng thời gian rất lớn để một gói tin âm thanh truyền từ cảm biến dưới đáy biển lên phao nổi trên mặt nước, khiến các giao thức TCP/IP truyền thống trên cạn bị timeout và mất gói.",
        "multipath fading":
          "Fading đa đường (Multipath Fading): Hiện tượng sóng âm dội lại từ mặt nước và đáy biển nhiều lần, tạo ra sự giao thoa làm méo mó tín hiệu nhận được ở nút đích."
      }
    );

    this.topics.set("underwater-sensor", {
      key: "underwater-sensor",
      title: "Mạng cảm biến không dây dưới nước",
      subDomain: "Mạng máy tính & Truyền thông (Networking & IoT)",
      keywords: [
        new KeywordNode(
          "kw-uasn",
          "Underwater Acoustic Sensor Networks (UASN)",
          "Mạng cảm biến sóng âm dưới nước",
          "Từ khóa cốt lõi (Core)",
          "Thuật ngữ học thuật chính xác thay vì tìm 'underwater wireless sensor'. Từ khóa này phân biệt rạch ròi giữa truyền thông sóng âm (acoustic) và sóng vô tuyến trên cạn.",
          "Tìm đúng từ khóa này sẽ loại bỏ hoàn toàn các bài báo lạc đề về mạng cảm biến trên cạn (terrestrial WSN), tránh lãng phí thời gian tra cứu.",
          [paperUasn1]
        ),
        new KeywordNode(
          "kw-dbr",
          "Depth-Based Routing (DBR)",
          "Định tuyến dựa trên độ sâu",
          "Giao thức định tuyến (Routing Protocol)",
          "Giao thức mạng kinh điển cho phép các nút cảm biến chỉ cần đo áp suất nước (độ sâu) để quyết định chuyển tiếp gói tin lên phao nổi mà không cần định vị GPS.",
          "Là giao thức cơ sở (baseline) bắt buộc phải so sánh trong mọi đồ án về định tuyến mạng dưới biển.",
          [paperUasn1]
        ),
      ],
    });

    // ----------------------------------------------------
    // CHỦ ĐỀ 3: PHÂN TÍCH CẢM XÚC TIẾNG VIỆT
    // ----------------------------------------------------
    const paperNlp1 = new AcademicPaper(
      "paper-nlp-1",
      "PhoBERT: Pre-trained Language Models for Vietnamese",
      "D. Q. Nguyen, A. T. Nguyen (VinAI Research)",
      2020,
      "Findings of EMNLP 2020",
      "Mô hình ngôn ngữ tiền huấn luyện chuẩn mực hàng đầu cho tiếng Việt, là xương sống của hầu hết các nghiên cứu NLP tiếng Việt hiện đại.",
      [
        "Pre-trained language models like BERT and RoBERTa have drastically advanced the state-of-the-art across various natural language processing benchmarks.",
        "However, applying multilingual models to Vietnamese often yields suboptimal representations due to unique linguistic characteristics, particularly word segmentation ambiguity and tonality.",
        "We introduce PhoBERT, a state-of-the-art monolingual pre-trained model based on RoBERTa architecture trained on a 20GB corpus of deduplicated Vietnamese texts.",
        "PhoBERT significantly outperforms multilingual XLM-R across multiple downstream evaluation tasks including Part-of-Speech tagging, Dependency Parsing, and Named Entity Recognition."
      ],
      {
        "word segmentation ambiguity":
          "Sự mơ hồ trong tách từ tiếng Việt (Word Segmentation Ambiguity): Tiếng Việt có các từ ghép nhiều âm tiết (ví dụ: 'học sinh', 'bàn học'). Nếu tách sai âm tiết sẽ làm thay đổi hoàn toàn ngữ nghĩa của câu khi đưa vào mô hình học sâu.",
        "monolingual pre-trained model":
          "Mô hình tiền huấn luyện đơn ngữ (Monolingual Pre-trained Model): Mô hình AI được học chuyên sâu trên dữ liệu ngôn ngữ mẹ đẻ (tiếng Việt), giúp nắm bắt sắc thái văn hóa và ngữ cảnh địa phương tốt hơn các mô hình đa ngôn ngữ tổng quát."
      }
    );

    this.topics.set("vietnamese-nlp", {
      key: "vietnamese-nlp",
      title: "Phân tích cảm xúc văn bản tiếng Việt",
      subDomain: "Xử lý ngôn ngữ tự nhiên (Natural Language Processing)",
      keywords: [
        new KeywordNode(
          "kw-absa",
          "Aspect-Based Sentiment Analysis (ABSA)",
          "Phân tích cảm xúc dựa trên khía cạnh",
          "Từ khóa cốt lõi (Core)",
          "Bài toán phân tích cảm xúc chuyên sâu: không chỉ đánh giá cả bài viết là tích cực/tiêu cực, mà bóc tách cảm xúc cho từng khía cạnh (ví dụ: 'đồ ăn ngon nhưng phục vụ chậm').",
          "Là từ khóa học thuật chuẩn mực trong các hội nghị EMNLP/ACL cho đề tài khai phá ý kiến người dùng trên mạng xã hội.",
          [paperNlp1]
        ),
        new KeywordNode(
          "kw-phobert",
          "Vietnamese Pre-trained Language Models",
          "Mô hình ngôn ngữ tiền huấn luyện tiếng Việt",
          "Kiến trúc nền tảng (Foundation Architecture)",
          "Sử dụng PhoBERT hoặc ViDeBERTa làm mô hình trích xuất đặc trưng ngữ nghĩa theo ngữ cảnh tiếng Việt.",
          "Điểm xuất phát bắt buộc cho bất kỳ đồ án xử lý ngôn ngữ tiếng Việt nào trong giai đoạn 2021–nay.",
          [paperNlp1]
        ),
      ],
    });
  }
}
