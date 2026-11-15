import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";

export interface ResearchTopicData {
  key: string;
  title: string;
  titleJa?: string;
  subDomain: string;
  subDomainJa?: string;
  keywords: KeywordNode[];
}

/**
 * Repository quản lý Dữ liệu Học thuật duy nhất cho MVP Natsuki Scholar:
 * Kịch bản vàng: "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính"
 * 
 * Dữ liệu chuyên sâu chuẩn quốc tế:
 * - Giải trình lý do AI đề xuất từng từ khóa từ ý tưởng ban đầu của người dùng
 * - Bối cảnh học thuật và thách thức kỹ thuật quốc tế
 * - Tóm tắt đóng góp chính & Kết quả thực nghiệm cụ thể (mAP, FPS, tập dữ liệu)
 * - Đầy đủ các chỉ số uy tín: Core A*, SCIE Q1, Impact Factor (IF)
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

  public getTopicByKey(key?: string): ResearchTopicData {
    return this.topics.get("pest-vision")!;
  }

  public getAllTopics(): ResearchTopicData[] {
    return Array.from(this.topics.values());
  }

  public resolveTopicKeyFromInput(userInput: string): string {
    return "pest-vision";
  }

  private seedMockData(): void {
    // ====================================================
    // BÀI BÁO 1: BÀI BÁO TRỌNG TÂM CỦA NGƯỜI DÙNG (ELSEVIER 2025)
    // ====================================================
    const paperPestRTDetr = new AcademicPaper(
      "paper-pest-rtdetr-2025",
      "Multi-species insect recognition method based on computer visions: Sustainable agricultural development",
      "L. Zhang, S. Sun, H. Zhao, Z. Li, D. Li (Wuxi University & Jilin University)",
      2025,
      "Ecological Informatics (Elsevier), Vol. 88, 103125",
      "Đề xuất mô hình Pest-RTDetr phát hiện sâu bệnh nông nghiệp đa loài thời gian thực loại bỏ nút thắt cổ chai NMS, kết hợp backbone DAS-ResNet50 và cơ chế hợp nhất đặc trưng đa tỉ lệ CF.",
      [
        "In agricultural production management, insect pests are responsible for approximately 20% of global crop losses each year. Therefore, insect pest control plays a crucial role in agricultural production and food security. Traditional insect pest identification methods heavily rely on frontline plant protection workers and agricultural technicians, requiring substantial time and effort. Deep learning offers high precision and adaptability, overcoming the low detection accuracy of traditional methods when identifying complex and diverse samples in natural field environments.",
        "However, convolutional neural network (CNN)-based algorithms lack a global understanding of features, limiting their ability to effectively handle occlusion. Moreover, insect pest species often share similar appearances with minimal inter-class differences, while displaying pronounced intra-class variations across different life cycle stages (eggs, larvae, pupae, and adults). These morphological shifts complicate the classification model's ability to extract distinguishing characteristics.",
        "Therefore, based on the RT-DETR network model, we propose the Pest-RTDetr algorithm for multi-species agricultural insect pest detection. The backbone network integrates DAS-ResNet50 with a deformable attention mechanism to capture salient features such as head and foot regions of insects. Furthermore, an enhanced cross-scale feature fusion module (CF) integrates shallow high-resolution features with deep semantic features to accurately localize small, densely distributed targets.",
        "The IP102 benchmark dataset contains 75,222 samples across 102 pest categories exhibiting a severe long-tail distribution. To address class imbalance and bounding box distortion caused by overlapping pests, we employ Focal Loss to balance positive and negative samples, and introduce MPDIoU (Minimum Point Distance IoU) as the regression loss. Experimental results demonstrate that Pest-RTDetr achieves an mAP50 of 68.40% at 80 FPS, outperforming Faster R-CNN and YOLOv8."
      ],
      {
        "long-tail distribution":
          "Phân bố dữ liệu đuôi dài (Long-Tail Distribution): Hiện tượng mất cân bằng mẫu nghiêm trọng trong tập dữ liệu IP102 (102 loài sâu bệnh), trong đó một số ít loài có rất nhiều ảnh mẫu (Head data), còn phần lớn các loài sâu hại quý hiếm lại chỉ có rất ít ảnh (Tail data), khiến mô hình học máy thông thường dễ bị thiên vị và dự đoán sai các loài thiểu số.",
        "occlusion":
          "Hiện tượng che khuất quang học (Occlusion): Trạng thái côn trùng bị cành lá, bóng râm hoặc các côn trùng khác che khuất một phần thân thể trong môi trường tự nhiên, gây mất mát thông tin hình ảnh nghiêm trọng.",
        "deformable attention":
          "Cơ chế chú ý biến dạng động (Deformable Attention - DAS): Kỹ thuật trong mạng tích chập giúp mô hình tự co giãn vùng tiếp nhận (receptive field) theo hình dáng giải phẫu tự nhiên của côn trùng (tập trung vào râu, chân, vân cánh) thay vì quét các ô vuông cố định, qua đó phân biệt chuẩn xác các loài sâu hại có ngoại hình tương đồng.",
        "salient features":
          "Đặc trưng nổi bật (Salient Features): Các vùng giải phẫu mang tín hiệu nhận diện đặc trưng nhất của côn trùng (như mắt, râu, vân cánh, khớp chân) thay vì quét đồng đều toàn bộ bức ảnh, giúp phân loại chính xác ngay cả khi thân côn trùng bị cành lá che khuất.",
        "capture salient features":
          "Trích xuất đặc trưng nổi bật (Salient Features Extraction): Nắm bắt các vùng giải phẫu mang tính quyết định của côn trùng (đầu, chân, vân cánh) để phân biệt các loài sâu hại có ngoại hình tương đồng.",
        "cross-scale feature fusion":
          "Hợp nhất đặc trưng đa tỉ lệ (Cross-Scale Feature Fusion - CF): Cấu trúc hai nhánh kết hợp DAS và Bottlenecks giúp truyền tải đặc trưng ngữ nghĩa mức cao xuống tầng nông, giúp phát hiện chuẩn xác các loài sâu bệnh siêu nhỏ (micro-pests) trên nền lá cây phức tạp.",
        "small, densely distributed targets":
          "Mục tiêu siêu nhỏ & phân bố dày đặc: Một trong những bài toán hóc búa nhất của thị giác máy tính nông nghiệp, khi các loài sâu rầy có kích thước chỉ vài milimet và thường tập trung thành bầy lớn trên cùng một phiến lá.",
        "Focal Loss":
          "Hàm mất mát tiêu điểm (Focal Loss): Hàm mục tiêu tinh chỉnh trọng số của các mẫu huấn luyện, giảm trọng số của các mẫu dễ nhận diện và tập trung tối đa đạo hàm vào các mẫu khó (các loài sâu hại ít gặp ở phần đuôi dữ liệu).",
        "MPDIoU":
          "Hàm mất mát khoảng cách điểm cực trị (MPDIoU - Minimum Point Distance IoU): Chỉ số tương đồng bounding box dựa trên khoảng cách giữa các góc trên-trái và dưới-phải của hộp dự đoán và hộp nhãn thực tế. MPDIoU giúp thuật toán hội tụ nhanh hơn và khắc phục hiện tượng mất dấu khi các con côn trùng bò đè lên nhau.",
        "RT-DETR":
          "Mạng biến đổi phát hiện đối tượng thời gian thực (Real-Time Detection Transformer): Kiến trúc tiên phong kết hợp ưu điểm học đặc trưng toàn cục của Transformer với tốc độ suy luận cực nhanh (80 FPS), loại bỏ hoàn toàn bước hậu xử lý NMS (Non-Maximum Suppression) phức tạp của họ mô hình YOLO."
      },
      {
        "salient features": "Đặc trưng nổi bật mang tính quyết định nhận diện",
        "capture salient features": "Nắm bắt các đặc trưng nổi bật như phần đầu và chân của côn trùng",
        "anism to capture salient features": "Cơ chế chú ý biến dạng động nhằm nắm bắt các đặc trưng nổi bật (như phần đầu và chân của côn trùng)",
        "head and foot regions": "Vùng đầu và chân của côn trùng",
        "long-tail distribution": "Phân bố dữ liệu đuôi dài (mất cân bằng mẫu giữa các loài)",
        "occlusion": "Hiện tượng che khuất quang học do cành lá hoặc bóng râm",
        "deformable attention": "Cơ chế chú ý biến dạng động",
        "cross-scale feature fusion": "Hợp nhất đặc trưng đa tỉ lệ (kết hợp tầng nông và tầng sâu)",
        "small, densely distributed targets": "Các mục tiêu sâu bệnh siêu nhỏ và phân bố dày đặc",
        "Focal Loss": "Hàm mất mát tiêu điểm (tập trung học các loài sâu bệnh hiếm gặp)",
        "MPDIoU": "Hàm mất mát khoảng cách điểm cực trị (MPDIoU)",
        "RT-DETR": "Mạng biến đổi phát hiện đối tượng thời gian thực (RT-DETR)",
        "mAP50 of 68.40% at 80 FPS": "Đạt độ chính xác mAP50 68,40% ở tốc độ suy luận 80 khung hình/giây (FPS)"
      },
      "SCIE Q1 · IF: 6.8",
      54,
      [
        "Đạt độ chính xác mAP50 68.40% tại tốc độ suy luận 80 FPS trên tập benchmark IP102 (102 loài).",
        "Backbone DAS-ResNet50 giúp tăng 6.33% mAP50 trên các trường hợp sâu bệnh bị cành lá che khuất.",
        "Hàm mất mát MPDIoU giúp mô hình hội tụ nhanh hơn 15% và hạn chế sai lệch khung bao khi côn trùng bò chồng lấn."
      ],
      "Cung cấp kiến trúc tham chiếu hoàn chỉnh để xây dựng hệ thống phát hiện sâu bệnh tự động theo chuẩn hội nghị/tạp chí quốc tế.",
      "NMSボトルネックを排除した実時間多種農業病害虫検出モデルPest-RTDetrを提案。DAS-ResNet50バックボーンとマルチスケール特徴量統合機構（CF）を統合。",
      [
        "ベンチマークデータセットIP102（102種）において、推論速度80 FPSでmAP50 68.40%を達成。",
        "DAS-ResNet50バックボーンにより、葉による遮蔽条件下でのmAP50が6.33%向上。",
        "MPDIoU損失関数により、収束速度が15%向上し、虫体の重なりによる境界ボックスの歪みを低減。"
      ],
      {
        "long-tail distribution":
          "ロングテール分布（Long-Tail Distribution）: IP102データセット（102害虫種）における深刻なサンプル不均衡現象。少数の代表種に大量の画像が存在する一方、希少種・有害種の画像が極めて少なく、従来モデルでは少数クラスの誤判定が頻発する。",
        "occlusion":
          "遮蔽現象（Occlusion）: 野外環境において、植物の葉や枝、日陰、または他の虫体によって害虫の身体の一部が覆い隠され、画像情報が著しく欠落する現象。",
        "deformable attention":
          "変形可能アテンション（Deformable Attention - DAS）: 畳み込みネットワークにおいて、固定矩形グリッド走査の代わりに昆虫の解剖学的輪郭（触角、脚、翅脈）に合わせて受容野（receptive field）を動的に変形させる技術。類似種間の高精度識別に寄与する。",
        "salient features":
          "顕著な特徴（Salient Features）: 画像全体を一様に処理するのではなく、昆虫の解剖学的キーポイント（頭部、触角、脚の関節）にモデルの焦点を集中させ、部分的な遮蔽下でも正確に分類する技術。",
        "capture salient features":
          "顕著な特徴抽出（Salient Features Extraction）: 昆虫の頭部や脚部など、種の識別に決定的な解剖学的特徴領域を重点的に抽出する処理。",
        "cross-scale feature fusion":
          "マルチスケール特徴量統合（Cross-Scale Feature Fusion - CF）: DASとBottlenecksを組み合わせ、深層の意味論的特徴を高解像度の浅層特徴へ伝達。複雑な葉の背景から微小害虫（micro-pests）を高精度に検出する。",
        "small, densely distributed targets":
          "微小密集標的（Small, Densely Distributed Targets）: 数ミリ単位の害虫が一枚の葉に高密度で群生する、農業コンピュータビジョンにおける最難関課題の一つ。",
        "Focal Loss":
          "フォーカル損失（Focal Loss）: 訓練サンプルの重みを適応的に調整し、分類しやすい多数サンプルの寄与度を下げ、分類困難な少数クラス（テールデータ）の学習に勾配を集中させる損失関数。",
        "MPDIoU":
          "極値点最小距離IoU（MPDIoU）: 予測枠と正解枠の左上・右下角の幾何学的距離に基づく新しいバウンディングボックス回帰損失。害虫同士が密集・重なり合う状況でも高速な収束と追従性を実現する。",
        "RT-DETR":
          "実時間物体検出Transformer（Real-Time Detection Transformer）: Transformerの大域的特徴把握力と80 FPS超の高速推論を両立し、YOLO系で不可欠だったNMS後処理のボトルネックを完全排除した先駆的アーキテクチャ。"
      },
      {
        "salient features": "識別の決め手となる顕著な特徴",
        "capture salient features": "昆虫の頭部や脚部など顕著な特徴を捉える",
        "anism to capture salient features": "昆虫の頭部や脚部など顕著な特徴を捉えるための変形可能アテンション機構",
        "head and foot regions": "昆虫の頭部および脚部領域",
        "long-tail distribution": "ロングテール分布（種ごとのサンプル不均衡現象）",
        "occlusion": "葉や枝による光学的な遮蔽現象",
        "deformable attention": "変形可能アテンション機構（Deformable Attention）",
        "cross-scale feature fusion": "マルチスケール特徴量統合（浅層・深層の双方向連携）",
        "small, densely distributed targets": "微小かつ高密度に分布する害虫標的",
        "Focal Loss": "フォーカル損失（希少クラスの学習を重点化）",
        "MPDIoU": "極値点最小距離IoU（MPDIoU回帰損失）",
        "RT-DETR": "実時間物体検出Transformer（RT-DETR）",
        "mAP50 of 68.40% at 80 FPS": "推論速度80 FPSでmAP50 68.40%を達成"
      }
    );

    // ====================================================
    // BÀI BÁO 2: TẬP BENCHMARK CHUẨN MỰC IP102 (CVPR 2019)
    // ====================================================
    const paperIP102 = new AcademicPaper(
      "paper-ip102-cvpr-2019",
      "IP102: A Large-Scale Benchmark Dataset for Insect Pest Recognition",
      "X. Wu, C. Zhan, Y.-K. Lai, M.-M. Cheng, J. Yang (Nankai University)",
      2019,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Xây dựng bộ dữ liệu benchmark mở lớn nhất thế giới về sâu bệnh nông nghiệp với hệ thống phân cấp 2 tầng gồm 75,222 ảnh thuộc 102 loài sâu bệnh phá hoại mùa màng.",
      [
        "Accurate identification of agricultural insect pests is critical for food sustainability, yet progress in computer vision has been hindered by the lack of large-scale open benchmark datasets.",
        "We introduce IP102, a large-scale insect pest dataset containing 75,222 high-resolution images categorized into 102 distinct pest classes across major agricultural crops.",
        "The dataset exhibits significant challenges including severe class imbalance with a natural long-tail distribution, varied life-cycle stages (larvae to adults), and complex unconstrained field backgrounds."
      ],
      {
        "class imbalance":
          "Mất cân bằng phân phối lớp (Class Imbalance): Hiện tượng số lượng ảnh của loài phổ biến áp đảo số lượng ảnh của loài hiếm gặp, khiến AI dự đoán sai lệch nếu không có hàm loss đặc biệt.",
        "unconstrained field backgrounds":
          "Nền đồng ruộng không kiểm soát (Unconstrained Backgrounds): Bối cảnh thực tế ngoài trời có ánh nắng gắt, bùn đất, lá úa và côn trùng lẫn vào màu cây cỏ, gây nhiễu thị giác cực độ."
      },
      {
        "class imbalance": "Mất cân bằng phân phối lớp",
        "unconstrained field backgrounds": "Bối cảnh đồng ruộng tự nhiên không ràng buộc"
      },
      "Core A* · Trích dẫn: 1,180+",
      1180,
      [
        "Bộ dữ liệu gồm 75,222 ảnh gán nhãn thủ công bởi các chuyên gia bảo vệ thực vật hàng đầu.",
        "Bao quát 102 phân loại sâu hại trên 8 nhóm cây trồng chủ lực (lúa nước, ngô, đậu tương, cây ăn quả...).",
        "Xác lập kết quả đối chứng đường cơ sở (Baseline) cho hơn 10 kiến trúc mạng SOTA."
      ],
      "Bộ dữ liệu bắt buộc phải dùng để làm thực nghiệm và đối chiếu kết quả nghiên cứu khi bảo vệ luận văn hoặc nộp bài báo quốc tế.",
      "農作物害虫102種、75,222枚の画像からなる2階層構造の世界最大規模オープンベンチマークデータセットを構築。",
      [
        "植物保護の第一線専門家による手動アノテーションを施した75,222枚の高品質画像で構成。",
        "主要8農作物（水稲、トウモロコシ、大豆、果樹等）における102分類の害虫を網羅。",
        "10種以上の最新SOTAモデルに対する標準ベースライン検証結果を確立。"
      ],
      {
        "class imbalance":
          "クラス不均衡（Class Imbalance）: 代表害虫種のサンプル数が希少種を圧倒する現象。専用の損失関数を用いない場合、モデルの推論が多数派クラスへ偏る原因となる。",
        "unconstrained field backgrounds":
          "制約のない自然な野外背景（Unconstrained Field Backgrounds）: 直射日光、泥土、枯葉、昆虫の保護色が複雑に混在し、極めて激しい視覚ノイズを生み出す実際の屋外圃場環境。"
      },
      {
        "class imbalance": "クラス不均衡分布",
        "unconstrained field backgrounds": "制約のない自然な野外圃場背景"
      },
      "Core A* · 被引用数: 1,180+"
    );

    // ====================================================
    // BÀI BÁO 3: TỔNG QUAN HỌC SÂU TRONG PHÁT HIỆN SÂU HẠI (COMPAG 2023)
    // ====================================================
    const paperSurveyPest = new AcademicPaper(
      "paper-survey-pest-2023",
      "Deep Learning for Plant Disease and Pest Detection: A Comprehensive Survey",
      "J. Liu, X. Wang (Zhejiang University)",
      2023,
      "Computers and Electronics in Agriculture (Elsevier), Vol. 205, 107643",
      "Hệ thống hóa toàn diện lộ trình phát triển của thị giác máy tính trong nông nghiệp thông minh từ mạng CNN truyền thống đến Vision Transformer.",
      [
        "Computer vision-based pest detection has evolved from hand-crafted feature engineering into end-to-end deep convolutional and attention networks. However, natural field conditions present substantial challenges such as illumination variation, complex background clutter, and overlapping insect targets.",
        "This survey systematically categorizes over 200 state-of-the-art vision algorithms across crop families. We analyze the trade-offs between two-stage detectors, anchor-free architectures, and vision transformers in field deployments.",
        "Furthermore, we highlight remaining open questions including few-shot learning for rare invasive species, lightweight model quantization for edge deployment, and multi-spectral sensor fusion for early infestation discovery."
      ],
      {
        "hand-crafted feature engineering":
          "Kỹ thuật trích xuất đặc trưng thủ công: Các thuật toán truyền thống như SIFT, HOG, LBP dựa trên quy tắc toán học cố định, độ chính xác kém khi góc chụp và ánh sáng thay đổi.",
        "few-shot learning":
          "Học ít mẫu (Few-Shot Learning): Kỹ thuật cho phép mô hình AI học nhận diện một loài sâu hại mới chỉ từ 3 đến 5 bức ảnh mẫu ban đầu."
      },
      {
        "hand-crafted feature engineering": "Trích xuất đặc trưng thủ công",
        "few-shot learning": "Kỹ thuật học ít mẫu"
      },
      "SCIE Q1 · IF: 8.3",
      420,
      [
        "Phân loại và đối sánh hiệu năng hơn 200 mô hình nhận diện sâu hại trong giai đoạn 2015-2023.",
        "Chỉ ra 3 nút thắt kỹ thuật lớn nhất: ánh sáng tự nhiên biến đổi, thiếu hụt dữ liệu gán nhãn, và độ trễ vi biên.",
        "Đề xuất khung hướng dẫn chọn lựa mô hình tối ưu theo từng mục đích triển khai (đám mây vs thiết bị nhúng)."
      ],
      "Nguồn tài liệu tổng quan hoàn hảo để viết chương 2 (Tổng quan tình hình nghiên cứu / Literature Review) trong báo cáo khoa học.",
      "従来のCNNからVision Transformerに至るスマート農業におけるコンピュータビジョンの発展プロセスを体系的に総括。",
      [
        "2015〜2023年における200以上の害虫検出モデルの性能を分類・比較。",
        "自然光の変化、アノテーションデータ不足、エッジ遅延の3大技術的ボトルネックを明示。",
        "展開目的（クラウド vs 組み込みエッジ）に応じた最適モデル選定ガイドラインを提示。"
      ],
      {
        "hand-crafted feature engineering":
          "手動特徴量エンジニアリング（SIFT, HOG, LBP等）: 固定された数学的ルールに基づく旧来手法であり、撮影角度や日照変化に対するロバスト性が低い。",
        "few-shot learning":
          "フューショット学習（Few-Shot Learning）: わずか3〜5枚の初期サンプル画像から新種の害虫を高精度に識別可能にする学習技術。"
      },
      {
        "hand-crafted feature engineering": "人手による特徴量設計",
        "few-shot learning": "少数サンプル学習技術"
      },
      "SCIE Q1 · IF: 8.3"
    );

    // ====================================================
    // BÀI BÁO 4: CƠ CHẾ CHÚ Ý BIẾN DẠNG TSINGHUA (CVPR 2022)
    // ====================================================
    const paperDeformableAttention = new AcademicPaper(
      "paper-deformable-attention-2022",
      "Deformable Attention in Vision Transformers for Salient Anatomical Structures",
      "Z. Xia, X. Pan, S. Song, L. E. Li, G. Huang (Tsinghua University)",
      2022,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR - Oral)",
      "Đột phá về cơ chế chú ý thưa linh hoạt: các điểm lấy mẫu tự do co giãn bám sát theo đường cong giải phẫu sinh học thay vì ma trận ô vuông cố định.",
      [
        "Standard multi-head self-attention computes dense affinity matrices across all spatial locations, resulting in prohibitive computational cost and susceptibility to background clutter.",
        "We propose Deformable Attention, a data-dependent sparse attention mechanism where the reference offsets are dynamically learned conditioned on feature tokens. This enables the model to focus on salient geometric and anatomical structures.",
        "Extensive experiments show that Deformable Attention delivers superior performance on fine-grained biological classification and partially occluded object recognition benchmarks."
      ],
      {
        "sparse attention":
          "Cơ chế chú ý thưa (Sparse Attention): Kỹ thuật chọn lọc chỉ một số vị trí lấy mẫu quan trọng thay vì tính toàn bộ ma trận tương quan không gian, giảm thiểu tiêu tốn GPU.",
        "reference offsets":
          "Tọa độ độ lệch tham chiếu (Reference Offsets): Các vector dịch chuyển điểm lấy mẫu được học tự động để bám theo biên dạng thực của chân, cánh hoặc vân của sâu bọ."
      },
      {
        "sparse attention": "Cơ chế chú ý thưa chọn lọc",
        "reference offsets": "Độ lệch tọa độ tham chiếu động"
      },
      "Core A* · Oral Presentation",
      680,
      [
        "Giảm 65% độ phức tạp tính toán so với self-attention toàn cục trong Vision Transformer thông thường.",
        "Tập trung chính xác vào các chi tiết nhận diện giải phẫu then chốt (râu, viền cánh, vân đốt).",
        "Được chọn báo cáo miệng (Oral Presentation - top 3% bài báo xuất sắc nhất CVPR 2022)."
      ],
      "Cơ sở lý thuyết trực tiếp giải thích vì sao mạng AI phân biệt được các loài côn trùng có ngoại hình gần như giống hệt nhau.",
      "変形可能スパースアテンションのブレークスルー: 固定正方形グリッドに代わり、サンプリング点が昆虫の生体解剖学的輪郭に動的に適合。",
      [
        "Vision Transformerの全域自己アテンション比で計算量を65%大幅削減。",
        "昆虫の触角、翅の縁、節模様など重要解剖学的パーツへ焦点を高精度に集中。",
        "CVPR 2022にて採択率上位3%以内の口頭発表（Oral Presentation）に選出。"
      ],
      {
        "sparse attention":
          "スパースアテンション（Sparse Attention）: 全画素間の相関を計算する代わりに重要な位置のみを適応的にサンプリングし、GPU計算量を削減する技術。",
        "reference offsets":
          "参照オフセット（Reference Offsets）: 昆虫の脚や触角、翅の実際の輪郭に沿ってサンプリング位置を適応移動させる動的ベクトル。"
      },
      {
        "sparse attention": "選択的スパースアテンション機構",
        "reference offsets": "動的参照座標オフセット"
      },
      "Core A* · Oral Presentation"
    );

    // ====================================================
    // BÀI BÁO 5: NHẬN DIỆN SÂU HẠI PHÂN LOẠI MỊN (IEEE TII 2024)
    // ====================================================
    const paperFineGrainedPest = new AcademicPaper(
      "paper-finegrained-pest-2024",
      "Fine-Grained Agricultural Pest Recognition via Multi-Scale Attentive CNN",
      "H. Wang, Y. Chen, S. Liu (Chinese Academy of Agricultural Sciences)",
      2024,
      "IEEE Transactions on Industrial Informatics, Vol. 20, No. 3",
      "Thiết kế thuật toán khai phá vùng ảnh phân biệt vi mô tự động phát hiện các đốm nhận dạng sinh học trên thân sâu bệnh mà không cần gán nhãn từng bộ phận.",
      [
        "Distinguishing closely related insect pest species in agriculture represents a classic fine-grained visual classification challenge, characterized by subtle inter-species disparities and significant intra-species variations across developmental instars.",
        "We design a multi-scale attentive convolutional framework equipped with local discriminative patch mining. The architecture automatically discovers key anatomical regions without requiring manual bounding box annotations for parts.",
        "Validated on real-world field collections, our method achieves an accuracy of 91.2% across 64 visually resembling beetle and moth species, substantially reducing misidentification in crop protection."
      ],
      {
        "fine-grained visual classification":
          "Phân loại thị giác phân giải mịn: Bài toán phân biệt các đối tượng thuộc cùng một nhóm cha có độ tương đồng cực lớn (như các phân loài bọ hung hoặc ngài sâu đục thân).",
        "discriminative patch mining":
          "Khai phá vùng đặc trưng phân biệt: Thuật toán tự động định vị các đốm ảnh nhỏ mang thông tin nhận dạng độc nhất trên thân thể côn trùng."
      },
      {
        "fine-grained visual classification": "Phân loại thị giác phân giải mịn",
        "discriminative patch mining": "Khai phá vùng ảnh phân biệt độc nhất"
      },
      "SCIE Q1 · IF: 12.3",
      92,
      [
        "Đạt độ chính xác 91.20% trên 64 loài sâu bọ có ngoại hình cực kỳ giống nhau.",
        "Tự động học định vị vùng nhận diện cục bộ mà không cần tốn chi phí vẽ bounding box cho từng chiếc chân/râu.",
        "Kiểm chứng thực tế trên các trang trại lúa mì và bông vải tại Trung Quốc."
      ],
      "Ý tưởng quan trọng để nâng cao độ chính xác khi phân loại các loài sâu bệnh nằm trong cùng một họ sinh học.",
      "各パーツの手動ラベル付けなしに、昆虫体上の微小な識別部位を自動検出する判別パッチマイニング手法を設計。",
      [
        "外見が極めて酷似する64種の害虫において91.20%の高精度を達成。",
        "脚部や触角に個別のバウンディングボックスを描くコストなしに、局所特徴を自動学習。",
        "中国の小麦および綿花圃場の大規模実地データで有効性を検証。"
      ],
      {
        "fine-grained visual classification":
          "微細視覚分類（Fine-Grained Visual Classification - FGVC）: 同一生物科に属し極めて酷似した対象（メイガ類やコガネムシ類等）を高精度に識別するタスク。",
        "discriminative patch mining":
          "判別パッチマイニング（Discriminative Patch Mining）: 昆虫の身体上で種を特定する唯一の生体シグナルを保持する局所領域を自動探索するアルゴリズム。"
      },
      {
        "fine-grained visual classification": "高解像度・微細視覚分類",
        "discriminative patch mining": "判別パッチマイニング技術"
      },
      "SCIE Q1 · IF: 12.3"
    );

    // ====================================================
    // BÀI BÁO 6: HỢP NHẤT ĐẶC TRƯNG ĐA TỈ LỆ TPAMI (IEEE TPAMI 2022)
    // ====================================================
    const paperCrossScaleFusion = new AcademicPaper(
      "paper-cross-scale-fusion-2022",
      "Cross-Scale High-Resolution Feature Fusion for Dense Small-Object Localization",
      "K. Sun, Y. Zhao, B. Jiang, T. Cheng, W. Liu (Huazhong Univ & MSRA)",
      2022,
      "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)",
      "Kiến trúc kết hợp luồng đặc trưng độ phân giải cao tầng nông song song với ngữ nghĩa tầng sâu, giải quyết triệt để vấn đề mất dấu đối tượng siêu nhỏ (micro-targets).",
      [
        "Detecting small objects in dense arrangements requires preserving fine spatial details while incorporating strong context semantics from deeper layers.",
        "We present a bilateral cross-scale feature fusion architecture that connects multi-resolution streams in parallel. Semantic guidance flows down to shallow layers while fine textures propagate up.",
        "The proposed architecture demonstrates remarkable improvements on micro-target localization benchmarks, maintaining crisp boundary fidelity and suppressing leaf texture artifacts."
      ],
      {
        "micro-target localization":
          "Định vị mục tiêu siêu nhỏ (Micro-Target Localization): Khả năng khoanh vùng chính xác các cá thể sâu non mới nở hoặc rệp vừng chỉ chiếm vài pixel trên bức ảnh độ phân giải cao.",
        "spatial details":
          "Chi tiết không gian nông (Spatial Details): Các thông tin biên cạnh, gân lá và đốm màu ở các tầng tích chập ban đầu, dễ bị mất đi nếu chỉ dùng mạng CNN thông thường."
      },
      {
        "micro-target localization": "Định vị mục tiêu kích thước siêu nhỏ",
        "spatial details": "Chi tiết không gian tầng nông"
      },
      "Core A* · SCIE Q1 · IF: 24.5",
      890,
      [
        "Bảo toàn chi tiết biên cạnh điểm ảnh tầng nông trong suốt quá trình truyền tin qua các lớp mạng sâu.",
        "Tăng 8.4% AP trên các tập dữ liệu vật thể nhỏ mật độ dày so với mô hình FPN thông thường.",
        "Được xuất bản trên IEEE TPAMI - tạp chí số 1 thế giới về Trí tuệ nhân tạo và Thị giác máy tính (IF: 24.5)."
      ],
      "Giải pháp kỹ thuật nền tảng để giải quyết tình huống rệp vừng, nhện đỏ hoặc trứng sâu kích thước siêu nhỏ trên mặt lá cây.",
      "浅層の高解像度特徴と深層の意味論的情報を並列に双方向統合し、微小標的（micro-targets）の見失いを根本的に克服。",
      [
        "深層ネットワークの伝播過程においても、浅層のピクセル輪郭詳細を完全に保持。",
        "高密度微小物体データセットにおいて、従来のFPNと比較してAPが8.4%向上。",
        "AI・コンピュータビジョン分野の最高峰ジャーナル IEEE TPAMI（IF: 24.5）に採択。"
      ],
      {
        "micro-target localization":
          "微小標的局所位置特定（Micro-Target Localization）: 高解像度画像上でわずか数ピクセルしか占めない孵化直後の幼虫やアブラムシを正確に検出する能力。",
        "spatial details":
          "浅層空間詳細（Spatial Details）: 初期の畳み込み層に存在する輪郭、翅脈、微小斑点などの幾何学的情報。"
      },
      {
        "micro-target localization": "微小標的の局所位置特定",
        "spatial details": "浅層の空間幾何学詳細"
      },
      "Core A* · SCIE Q1 · IF: 24.5"
    );

    // ====================================================
    // BÀI BÁO 7: HÀM MẤT MÁT KHOẢNG CÁCH CỰC TRỊ MPDIOU (NEUROCOMPUTING 2023)
    // ====================================================
    const paperMPDIoU = new AcademicPaper(
      "paper-mpdiou-2023",
      "MPDIoU: A Complete Intersection over Union Metric for Boundary Box Regression",
      "M. Sima, C. Lv, Y. Jiang, Y. Liang (Macau University of Science and Technology)",
      2023,
      "Neurocomputing (Elsevier), Vol. 562, 126892",
      "Định nghĩa hàm mục tiêu bounding box dựa trên khoảng cách điểm cực trị, khắc phục hiện tượng mất dấu khi các con côn trùng bò đè lên nhau hoặc che khuất dày đặc.",
      [
        "Existing bounding box regression loss functions such as GIoU, DIoU, and CIoU encounter severe performance degradation when target bounding boxes exhibit identical aspect ratios or high overlap degrees.",
        "We introduce MPDIoU, which directly minimizes the point distances between the top-left and bottom-right corners of predicted and ground-truth bounding boxes, simplifying calculation and accelerating convergence.",
        "Experimental evaluations across dense and unconstrained scenarios demonstrate substantial convergence gains and accurate localization even when multiple targets overlap closely."
      ],
      {
        "bounding box regression":
          "Hồi quy khung bao đối tượng (Bounding Box Regression): Quá trình mạng nơ-ron tinh chỉnh tọa độ 4 góc của hộp dự đoán sao cho ôm sát tuyệt đối thân hình côn trùng thực tế.",
        "convergence":
          "Tốc độ hội tụ của mô hình (Convergence): Khả năng các trọng số của hàm loss giảm về giá trị tối ưu nhanh chóng và ổn định trong quá trình huấn luyện mô hình học sâu."
      },
      {
        "bounding box regression": "Hồi quy tọa độ khung bao",
        "convergence": "Tốc độ hội tụ học sâu"
      },
      "SCIE Q1 · IF: 6.0",
      145,
      [
        "Đơn giản hóa công thức toán học tính toán IoU, triệt tiêu sự phụ thuộc vào tỉ lệ khung hình (aspect ratio).",
        "Tăng tốc độ hội tụ mô hình học sâu nhanh hơn 20% so với CIoU trên các kịch bản chồng lấn dày đặc.",
        "Được tích hợp trực tiếp vào thuật toán Pest-RTDetr để định vị sâu hại chen chúc ngoài đồng ruộng."
      ],
      "Lựa chọn hàm mất mát tối ưu nhất để thay thế cho CIoU/GIoU khi mô hình gặp bài toán đối tượng dính chùm hoặc che khuất lẫn nhau.",
      "極値点の距離に基づくバウンディングボックス目的関数を定義し、害虫同士の密集や重なり合いによる検出失敗を克服。",
      [
        "IoU計算の幾何学的定式化を簡素化し、アスペクト比への依存による歪みを解消。",
        "高密度重なりシナリオにおいて、従来のCIoU比で学習収束速度が20%以上高速化。",
        "圃場での密集害虫検出アルゴリズムPest-RTDetrに直接統合されて実証。"
      ],
      {
        "bounding box regression":
          "バウンディングボックス回帰（Bounding Box Regression）: 予測枠の4隅の座標を微調整し、実際の虫体輪郭へ厳密にフィットさせる最適化処理。",
        "convergence":
          "モデル収束速度（Convergence）: 深層学習の訓練過程において、損失関数の重みが安定して最適値へと収束するスピード。"
      },
      {
        "bounding box regression": "バウンディングボックス回帰最適化",
        "convergence": "学習収束速度"
      },
      "SCIE Q1 · IF: 6.0"
    );

    // ====================================================
    // BÀI BÁO 8: MÔ HÌNH TRANSFORMER THỜI GIAN THỰC RT-DETR (BAIDU, CVPR 2024)
    // ====================================================
    const paperRTDetr = new AcademicPaper(
      "paper-rtdetr-cvpr-2023",
      "DETRs Beat YOLOs on Real-time Object Detection",
      "W. Lv, Y. Zhao, S. Xu, J. Wang, C. Gu, C. Cui et al. (Baidu Inc.)",
      2024,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Đột phá công nghệ đầu tiên chứng minh Transformer có thể vượt qua toàn diện họ YOLO về cả tốc độ (114 FPS) và độ chính xác (53.0% AP) mà không cần bước lọc NMS.",
      [
        "Real-time object detection has long been dominated by YOLO detectors due to their low latency. However, YOLO models heavily rely on Non-Maximum Suppression (NMS) for post-processing, which introduces significant inference latency variance and hyperparameter sensitivity.",
        "In this paper, we propose the Real-Time DEtection TRansformer (RT-DETR), the first end-to-end real-time object detector based on Vision Transformers. We design an efficient hybrid encoder that decouples intra-scale interaction and cross-scale fusion, achieving superior trade-offs between speed and accuracy.",
        "On the MS COCO benchmark, RT-DETR-L achieves 53.0% AP at 114 FPS on T4 GPU, outperforming state-of-the-art YOLO detectors across multiple scale metrics without any post-processing bottlenecks."
      ],
      {
        "Non-Maximum Suppression":
          "Loại bỏ phi cực đại (NMS - Non-Maximum Suppression): Thuật toán lọc các khung bao trùng lặp trong xử lý ảnh truyền thống. NMS gây tắc nghẽn tốc độ suy luận thời gian thực vì tính toán tuần tự và nhạy cảm với ngưỡng tự chọn.",
        "hybrid encoder":
          "Bộ mã hóa lai (Hybrid Encoder): Cấu trúc phân tách tương tác nội tầng và hợp nhất xuyên tầng, giảm độ phức tạp tính toán O(N^2) của Transformer thông thường về mức tuyến tính thời gian thực."
      },
      {
        "Non-Maximum Suppression": "Thuật toán loại bỏ phi cực đại (NMS)",
        "hybrid encoder": "Bộ mã hóa lai hiệu năng cao"
      },
      "Core A* · Baidu Research",
      950,
      [
        "Loại bỏ hoàn toàn khâu hậu xử lý Non-Maximum Suppression (NMS), loại trừ độ trễ bất định khi suy luận.",
        "Bộ mã hóa lai (Hybrid Encoder) tối ưu hóa độ phức tạp tính toán Transformer về mức thời gian thực.",
        "Đạt 53.0% AP ở tốc độ 114 FPS trên card GPU T4, trở thành chuẩn mực mới cho Object Detection thời gian thực."
      ],
      "Công trình kiến trúc bắt buộc phải trích dẫn để làm bệ phóng lý thuyết cho toàn bộ thuật toán phát hiện thời gian thực trong đề tài.",
      "NMS後処理を不要としながら、速度（114 FPS）と精度（53.0% AP）の双方でYOLO系を全面的に上回る初の実時間Transformerを実現。",
      [
        "Non-Maximum Suppression (NMS) 後処理を完全排除し、推論時の不確定な遅延分散を解消。",
        "ハイブリッドエンコーダにより、Transformer特有の計算量を実時間推論可能な線形水準へと最適化。",
        "T4 GPU上で114 FPS・53.0% APを達成し、実時間物体検出の新たな国際標準を確立。"
      ],
      {
        "Non-Maximum Suppression":
          "非最大値抑制（NMS - Non-Maximum Suppression）: 重複する検出枠を削減する従来の後処理手法。順次計算のため実時間推論の深刻な遅延ボトルネックとなっていた。",
        "hybrid encoder":
          "ハイブリッドエンコーダ（Hybrid Encoder）: スケール内特徴相互作用とスケール間統合を分離し、Transformerの計算量を大幅削減するアーキテクチャ。"
      },
      {
        "Non-Maximum Suppression": "非最大値抑制後処理（NMS）",
        "hybrid encoder": "高効率ハイブリッドエンコーダ"
      },
      "Core A* · Baidu Research"
    );

    // ====================================================
    // BÀI BÁO 9: TRIỂN KHAI VI BIÊN NÔNG NGHIỆP EDGE AI (COMPAG 2024)
    // ====================================================
    const paperEdgePest = new AcademicPaper(
      "paper-edge-pest-2024",
      "Edge-Device Autonomous Pest Monitoring System for Precision Agriculture",
      "S. Sun, L. Zhang, H. Zhao (Wuxi University)",
      2024,
      "Computers and Electronics in Agriculture (Elsevier), Vol. 218, 108712",
      "Hiện thực hóa mô hình thị giác máy tính vào thực tế đồng ruộng: đóng gói AI chạy trên bẫy đèn thông minh gắn chip nhúng NVIDIA Jetson sử dụng pin năng lượng mặt trời.",
      [
        "Deploying deep vision models onto field-deployed edge devices demands rigorous balance between parameter complexity, energy consumption, and high real-time throughput under harsh weather environments.",
        "We develop a solar-powered edge monitoring terminal integrating a customized TensorRT engine for the Pest-RTDetr algorithm. The system performs real-time continuous inference at 45 FPS on NVIDIA Jetson Orin Nano with under 10W power draw.",
        "Field trials across two growing seasons demonstrate a counting accuracy of 94.6% against physical manual trapping, validating the practical feasibility of automated remote crop protection networks."
      ],
      {
        "edge devices":
          "Thiết bị vi biên (Edge Devices): Các máy tính nhúng nhỏ gọn đặt trực tiếp ngoài vườn, ruộng có khả năng chạy AI cục bộ mà không cần truyền ảnh về máy chủ đám mây.",
        "TensorRT engine":
          "Công cụ tăng tốc phần cứng TensorRT: Bộ tối ưu hóa đồ thị tính toán của NVIDIA giúp mô hình deep learning tăng tốc độ suy luận từ 2 đến 5 lần trên chip đồ họa nhúng."
      },
      {
        "edge devices": "Thiết bị vi biên nhúng thực địa",
        "TensorRT engine": "Công cụ tăng tốc phần cứng TensorRT"
      },
      "SCIE Q1 · IF: 8.3",
      78,
      [
        "Tối ưu hóa mô hình qua TensorRT đạt tốc độ 45 FPS ổn định trên chip NVIDIA Jetson Orin Nano.",
        "Mức tiêu thụ điện năng cực thấp dưới 10W, cho phép vận hành liên tục 24/7 bằng nguồn pin năng lượng mặt trời.",
        "Độ chính xác kiểm chứng thực địa đạt 94.6% so với phương pháp đặt bẫy keo thủ công của kỹ sư bảo vệ thực vật."
      ],
      "Hình mẫu thực nghiệm lý tưởng cho việc triển khai ứng dụng thực tế (Productization / Deployment) của đề tài tốt nghiệp.",
      "圃場への実機実装: NVIDIA Jetsonとソーラー給電スマート害虫トラップを組み合わせ、エッジ端末での完全自律推論を実現。",
      [
        "TensorRTによる最適化により、NVIDIA Jetson Orin Nano上で45 FPSの安定推論を達成。",
        "消費電力を10W未満に抑制し、太陽光パネルによる24時間365日の連続自律稼働を実現。",
        "2作期にわたる実地試験において、手動捕獲トラップ対比で94.6%の高精度計数を実証。"
      ],
      {
        "edge devices":
          "エッジデバイス（Edge Devices）: クラウドへ画像を送信することなく、圃場現地でAI推論を直接実行可能な小型組み込みコンピュータ。",
        "TensorRT engine":
          "TensorRTハードウェア最適化エンジン: NVIDIA製GPUにおいて深層学習モデルの推論を2〜5倍高速化するコンパイラツールキット。"
      },
      {
        "edge devices": "野外組み込みエッジデバイス",
        "TensorRT engine": "TensorRT推論加速エンジン"
      },
      "SCIE Q1 · IF: 8.3"
    );

    // ====================================================
    // TỔ CHỨC CÂY TỪ KHÓA HỌC THUẬT VỚI DỮ LIỆU CHUYÊN SÂU
    // ====================================================
    this.topics.set("pest-vision", {
      key: "pest-vision",
      title: "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính",
      titleJa: "コンピュータビジョンによる多種農業病害虫の識別",
      subDomain: "Smart Agriculture & Computer Vision",
      subDomainJa: "スマート農業 ＆ コンピュータビジョン",
      keywords: [
        new KeywordNode(
          "kw-ipd",
          "Multi-Species Insect Pest Detection (IPD)",
          "Nhận diện & phát hiện sâu hại nông nghiệp đa loài",
          "Phát hiện đa loài",
          "Hướng nghiên cứu cơ sở nhằm tự động phát hiện và định danh chính xác 102 loài sâu bệnh phá hoại mùa màng trong điều kiện đồng ruộng tự nhiên.",
          "Thay vì tìm kiếm các từ khóa chung chung như 'insect recognition' (thường trả về tài liệu cũ hoặc phi học thuật), các cơ sở dữ liệu quốc tế như Scopus, IEEE, Elsevier chuẩn hóa bài toán này dưới cụm từ 'Multi-Species Insect Pest Detection'.",
          [paperPestRTDetr, paperIP102, paperSurveyPest],
          "Hệ thống AI nhận diện ý tưởng của bạn hướng tới việc bảo vệ cây trồng trước nhiều loại sâu bệnh tự nhiên. Trong khoa học máy tính ứng dụng nông nghiệp, bài toán này bắt buộc phải giải quyết trên tập dữ liệu đa loài (multi-species) thay vì chỉ một loài đơn lẻ. AI đề xuất từ khóa chuẩn mực 'Multi-Species Insect Pest Detection' để trực tiếp kết nối đề tài của bạn tới các công trình benchmark quốc tế uy tín (như IP102) và các mô hình phát hiện đối tượng SOTA.",
          "Trong thực tế đồng ruộng, sâu hại gây thiệt hại hơn 20% sản lượng nông sản toàn cầu hàng năm. Thách thức cốt lõi của IPD là hiện tượng biến thiên hình thái lớn giữa các giai đoạn vòng đời (trứng, ấu trùng, nhộng, trưởng thành) cùng sự tương đồng thị giác cao giữa các loài sâu hại khác nhau. Nghiên cứu trong hướng này đòi hỏi mô hình phải vừa đạt độ chính xác cao trên dữ liệu đuôi dài (long-tail), vừa loại trừ được các nhiễu quang học từ cành lá phức tạp.",
          '("Multi-Species Insect Pest Detection" OR "Agricultural Pest Detection") AND ("IP102" OR "deep learning") AND ("RT-DETR" OR "YOLO")',
          "多種農業病害虫の実時間高精度検出（IPD）",
          "野外の自然な農地環境下で、102種に及ぶ農作物病害虫を自動検出・高精度同定するための基礎的研究分野。",
          "ユーザーの「コンピュータビジョンによる多種農業病害虫の識別」という初期アイデアに基づき、AIは国際標準学術用語「Multi-Species Insect Pest Detection」を選定しました。単一種の検出にとどまらず、多種害虫を対象とすることでIP102等の国際標準ベンチマークや最新SOTAモデルへ直結します。",
          "野外環境下での病害虫識別は、微小サイズ、天候による照度変化、葉による遮蔽、そして種間類似性と成長段階ごとの形態変化が重なる高難度タスクです。トップカンファレンス（CVPR、TPAMI）では、NMS不要のRT-DETR構造やマルチスケール特徴抽出が主要トレンドとなっています。",
          "多種害虫検出"
        ),
        new KeywordNode(
          "kw-finegrained",
          "Fine-Grained Pest Feature Extraction",
          "Trích xuất đặc trưng giải phẫu sâu bệnh (râu, chân, vân cánh)",
          "Đặc trưng giải phẫu",
          "Kỹ thuật trích xuất đặc trưng giải phẫu sinh học giúp phân biệt chính xác các loài sâu hại có ngoại hình tương đồng (minimal inter-class difference) và biến đổi qua các giai đoạn ấu trùng/trưởng thành.",
          "Đây là chìa khóa then chốt giúp phân loại thành công các phân loài sâu bọ cùng chi họ (như các loài ngài, bọ hung, sâu đục thân) mà mắt thường của nông dân khó lòng phân biệt chính xác.",
          [paperDeformableAttention, paperFineGrainedPest],
          "Ý tưởng nhận diện sâu bệnh đòi hỏi khả năng quan sát chi tiết từng bộ phận sinh học đặc trưng. AI ánh xạ yêu cầu này thành từ khóa kỹ thuật chuyên sâu 'Fine-Grained Pest Feature Extraction'. Thuật ngữ này giúp bạn tiếp cận các thuật toán thị giác phân giải mịn (Fine-Grained Visual Classification - FGVC) và các cơ chế chú ý biến dạng động (Deformable Attention) - hướng đi nghiên cứu đang được đánh giá cao nhất tại các hội nghị đỉnh cao như CVPR, ICCV.",
          "Khác với việc nhận diện ô tô hay người đi bộ, côn trùng có kích thước nhỏ và cấu trúc giải phẫu cực kỳ tinh vi. Sự khác biệt giữa loài gây hại nghiêm trọng và loài côn trùng có ích đôi khi chỉ nằm ở số lượng đốt râu hoặc hoa văn trên cánh. Thách thức lớn nhất là làm thế nào để mạng nơ-ron tự động khoanh vùng được các chi tiết giải phẫu này mà không cần tốn hàng ngàn giờ công gán nhãn thủ công cho từng bộ phận cơ thể côn trùng.",
          '("Fine-Grained" OR "Deformable Attention") AND ("Pest Recognition" OR "Insect Classification") AND ("Anatomical Structures" OR "Feature Extraction")',
          "害虫の微細解剖学的特徴抽出（触角・脚部・翅脈）",
          "外見が酷似する害虫種間（種間差異の極小性）や、幼虫・成虫間の形態変化を正確に識別するための生体解剖学的特徴抽出技術。",
          "害虫識別の高精度化には、微細な生体パーツの観察が不可欠です。AIはこの要件を先端学術キーワード「Fine-Grained Pest Feature Extraction」にマッピングし、CVPR等で評価の高いDeformable Attention（変形可能アテンション）手法へと接続します。",
          "一般的な物体認識と異なり、害虫は極めて微小で複雑な構造を持ちます。益虫と害虫の差異が触角の節数や翅の斑点のみに現れることも珍しくありません。膨大な手動アノテーションなしに局所解剖特徴を自動学習させることが技術的要所となります。",
          "形態特徴抽出"
        ),
        new KeywordNode(
          "kw-occlusion",
          "Occluded & Dense Small-Pest Localization",
          "Định vị sâu bệnh siêu nhỏ & bị cành lá che khuất ngoài đồng ruộng",
          "Xử lý che khuất & Mật độ dày",
          "Cấu trúc kết hợp hợp nhất đặc trưng đa tỉ lệ tầng nông - sâu và hàm mất mát khoảng cách điểm cực trị MPDIoU, giải quyết triệt để vấn đề mất dấu các côn trùng kích thước siêu nhỏ (micro-pests) và bò chồng lấn lên nhau.",
          "Đây là bước đột phá kỹ thuật giải quyết bài toán thực địa ngoài trời - nơi côn trùng thường ẩn nấp dưới mặt lá hoặc xuất hiện dày đặc theo ổ dịch.",
          [paperCrossScaleFusion, paperMPDIoU],
          "Môi trường nông nghiệp tự nhiên luôn chứa đầy vật cản (lá cây, cành khô, bóng râm, bùn đất) và sâu bệnh thường sống bầy đàn. AI đề xuất từ khóa 'Occluded & Dense Small-Pest Localization' nhằm trang bị cho đề tài của bạn các giải pháp xử lý che khuất (occlusion handling) và phát hiện đối tượng nhỏ mật độ cao (dense small object detection) - một trong những tiêu chí chấm điểm khắt khe nhất của các giáo sư về tính khả thi thực nghiệm.",
          "Các mạng nơ-ron tích chập (CNN) thông thường bị suy giảm độ chính xác nghiêm trọng khi đối tượng bị che khuất hơn 30% thân thể hoặc khi các khung bao dự đoán chồng lấn lên nhau (gây triệt tiêu nhầm qua thuật toán NMS). Hướng nghiên cứu này tập trung vào các giải pháp tiên tiến như hợp nhất đặc trưng hai chiều (Cross-Scale Feature Fusion) trên IEEE TPAMI và hàm mất mát khoảng cách cực trị MPDIoU.",
          '("Occlusion Handling" OR "Dense Object Detection") AND ("Small Target" OR "Micro-Pests") AND ("Cross-Scale Fusion" OR "MPDIoU")',
          "葉の遮蔽および高密度微小害虫の局所位置特定",
          "浅層・深層のマルチスケール特徴量統合と極値点最小距離損失（MPDIoU）を組み合わせ、重なり合う微小害虫の見失いを根本的に解決する技術体系。",
          "自然農地では害虫が葉陰に隠れ、群生して密集します。AIは遮蔽処理（Occlusion Handling）と微小密集物体検出（Dense Small Object Detection）の学術知見を提案し、研究の実用性を高めます。",
          "対象が30%以上遮蔽された場合やバウンディングボックスが重なり合った場合、従来のCNNとNMSでは検出精度が急落します。Cross-Scale Feature FusionやMPDIoU回帰損失により、高密度重なり環境下での堅牢な局所化を実現します。",
          "遮蔽・密集対策"
        ),
        new KeywordNode(
          "kw-realtime-edge",
          "Real-Time Field Pest Detection (Edge AI)",
          "Phát hiện sâu bệnh thời gian thực trên thiết bị vi biên đồng ruộng",
          "Thiết bị vi biên (Edge AI)",
          "Ứng dụng kiến trúc Real-Time Transformer loại bỏ hoàn toàn bước hậu xử lý NMS, cho phép triển khai thuật toán trên bẫy đèn thông minh, flycam nông nghiệp chạy pin mặt trời với tốc độ trên 80 FPS.",
          "Thuật ngữ học thuật chỉ định hướng nghiên cứu có khả năng chuyển giao công nghệ và ứng dụng thực tiễn cao nhất trong kỷ nguyên Nông nghiệp thông minh 4.0.",
          [paperRTDetr, paperEdgePest],
          "Một đề tài tốt nghiệp kỹ thuật máy tính / thị giác máy tính sẽ đạt điểm tối đa nếu không chỉ dừng lại ở mô hình lý thuyết trên máy tính bàn mà còn chứng minh được khả năng chạy thời gian thực trên thiết bị vi biên (Edge Devices). AI đề xuất từ khóa này để liên kết nghiên cứu của bạn với các kiến trúc thời gian thực tiên tiến nhất (như RT-DETR Baidu) và kỹ thuật nhúng phần cứng thực địa.",
          "Rào cản lớn nhất của việc đưa AI ra đồng ruộng là tài nguyên tính toán hạn chế của chip nhúng (như NVIDIA Jetson, Raspberry Pi) và nguồn điện pin mặt trời giới hạn (thường dưới 15W). Hướng nghiên cứu này giải quyết bài toán cân bằng hoàn hảo giữa độ phức tạp mô hình (FLOPs, tham số), độ trễ suy luận (Inference Latency < 20ms) và mức tiêu thụ điện năng ngoài trời.",
          '("Real-Time Object Detection" OR "RT-DETR") AND ("Edge AI" OR "Embedded System" OR "Jetson") AND ("Pest Monitoring" OR "Precision Agriculture")',
          "実時間エッジAIによる野外病害虫検出",
          "NMS後処理を完全排除した実時間Transformerアーキテクチャを活用し、ソーラー給電のスマート害虫トラップや農業用ドローンへ80 FPS以上でモデルを実装する応用研究。",
          "理論モデルにとどまらず、省電力エッジデバイスでの実時間推論可能性を実証することで、実用化・社会実装（Productization）に直結するキーワードです。",
          "組み込みチップ（NVIDIA Jetson等）の限られた計算資源とバッテリー駆動（15W未満）の中で、モデル複雑度、推論遅延（<20ms）、野外消費電力の最適なトレードオフを確立します。",
          "エッジAI実装"
        ),
      ],
    });
  }
}
