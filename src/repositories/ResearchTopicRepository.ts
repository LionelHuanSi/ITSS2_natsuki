import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";

export interface ResearchTopicData {
  key: string;
  title: string;
  subDomain: string;
  keywords: KeywordNode[];
}

/**
 * Repository quản lý Dữ liệu Học thuật duy nhất cho MVP Natsuki Scholar:
 * Kịch bản vàng: "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính"
 * 
 * Các từ khóa được đề xuất trực tiếp từ bài toán nhận diện sâu bệnh (thay vì phân loại chung chung),
 * liên kết trực tiếp tới các công trình quốc tế uy tín (Core A*, SCIE Q1, Impact Factor cao).
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
      "Đề xuất mô hình Pest-RTDetr phát hiện sâu bệnh nông nghiệp đa loài thời gian thực (80 FPS, 68.4% mAP) giải quyết triệt để bài toán mật độ dày, che khuất và phân bố dữ liệu đuôi dài trên tập dữ liệu IP102 (102 loài).",
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
        "cross-scale feature fusion":
          "Hợp nhất đặc trưng đa tỉ lệ (Cross-Scale Feature Fusion - CF): Cấu trúc hai nhánh kết hợp DAS và Bottlenecks giúp truyền tải đặc trưng ngữ nghĩa mức cao xuống tầng nông, giúp phát hiện chuẩn xác các loài sâu bệnh siêu nhỏ (micro-pests) trên nền lá cây phức tạp.",
        "Focal Loss":
          "Hàm mất mát tiêu điểm (Focal Loss): Hàm mục tiêu tinh chỉnh trọng số của các mẫu huấn luyện, giảm trọng số của các mẫu dễ nhận diện và tập trung tối đa đạo hàm vào các mẫu khó (các loài sâu hại ít gặp ở phần đuôi dữ liệu).",
        "MPDIoU":
          "Hàm mất mát khoảng cách điểm cực trị (MPDIoU - Minimum Point Distance IoU): Chỉ số tương đồng bounding box dựa trên khoảng cách giữa các góc trên-trái và dưới-phải của hộp dự đoán và hộp nhãn thực tế. MPDIoU giúp thuật toán hội tụ nhanh hơn và khắc phục hiện tượng mất dấu khi các con côn trùng bò đè lên nhau.",
        "RT-DETR":
          "Mạng biến đổi phát hiện đối tượng thời gian thực (Real-Time Detection Transformer): Kiến trúc tiên phong kết hợp ưu điểm học đặc trưng toàn cục của Transformer với tốc độ suy luận cực nhanh (80 FPS), loại bỏ hoàn toàn bước hậu xử lý NMS (Non-Maximum Suppression) phức tạp của họ mô hình YOLO."
      },
      {
        "long-tail distribution": "Phân bố dữ liệu đuôi dài",
        "occlusion": "Hiện tượng che khuất quang học",
        "deformable attention": "Cơ chế chú ý biến dạng động",
        "cross-scale feature fusion": "Hợp nhất đặc trưng đa tỉ lệ",
        "Focal Loss": "Hàm mất mát tiêu điểm",
        "MPDIoU": "Hàm mất mát khoảng cách điểm cực trị (MPDIoU)",
        "RT-DETR": "Mạng biến đổi phát hiện đối tượng thời gian thực"
      },
      "SCIE Q1 · IF: 6.8",
      54
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
      "Tập dữ liệu chuẩn mực lớn nhất thế giới về sâu bệnh nông nghiệp với 75,222 ảnh trên 102 loài côn trùng phá hoại mùa màng, phản ánh đầy đủ thách thức đồng ruộng tự nhiên.",
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
      1180
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
      "Tổng quan có ảnh hưởng lớn nhất hệ sinh thái nông nghiệp thông minh, hệ thống hóa toàn diện các kỹ thuật nhận diện sâu bệnh và giải pháp khắc phục dữ liệu ít mẫu.",
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
      420
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
      "Đề xuất cơ chế deformable attention cho phép các điểm lấy mẫu tự co giãn theo đường viền giải phẫu của sinh vật, là nền tảng của DAS-ResNet50 trong Pest-RTDetr.",
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
      680
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
      "Phương pháp phân loại mịn tập trung nhận diện các đặc trưng vi mô (vân râu, đốt bụng, viền cánh) giúp phân biệt các loài sâu hại cùng chi họ sinh học.",
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
      92
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
      "Công trình đỉnh cao về thị giác máy tính thiết kế mạng kết hợp thông tin độ phân giải cao tầng nông với ngữ nghĩa tầng sâu, giải quyết vấn đề mất dấu các côn trùng siêu nhỏ.",
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
      890
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
      "Định nghĩa hàm mất mát bounding box dựa trên khoảng cách điểm cực trị, khắc phục hiện tượng mất dấu khi các con côn trùng bò đè lên nhau hoặc che khuất dày đặc.",
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
      145
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
      "Công trình nền tảng chứng minh mô hình Transformer có thể vượt qua dòng họ YOLO cả về độ chính xác và tốc độ suy luận thời gian thực mà không cần Non-Maximum Suppression (NMS).",
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
      950
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
      "Thiết kế hệ thống bẫy đèn thông minh gắn chip vi biên nhúng NVIDIA Jetson, thực thi nhận diện và đếm số lượng sâu hại tự động với nguồn năng lượng mặt trời.",
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
      78
    );

    // ====================================================
    // TỔ CHỨC CÂY TỪ KHÓA HỌC THUẬT CHUẨN XÁC THEO ĐỀ TÀI SÂU BỆNH
    // ====================================================
    this.topics.set("pest-vision", {
      key: "pest-vision",
      title: "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính",
      subDomain: "Smart Agriculture & Computer Vision",
      keywords: [
        new KeywordNode(
          "kw-ipd",
          "Multi-Species Insect Pest Detection (IPD)",
          "Nhận diện sâu bệnh nông nghiệp đa loài chuẩn quốc tế",
          "Đề tài chuẩn Scopus / ISI",
          "Hướng nghiên cứu cơ sở nhằm tự động phát hiện và định danh chính xác 102 loài sâu bệnh phá hoại mùa màng trong điều kiện đồng ruộng tự nhiên.",
          "Thay vì tìm kiếm các từ khóa chung chung như 'insect recognition', giới nghiên cứu quốc tế sử dụng thuật ngữ 'Multi-Species Insect Pest Detection' trên tập benchmark IP102.",
          [paperPestRTDetr, paperIP102, paperSurveyPest]
        ),
        new KeywordNode(
          "kw-finegrained",
          "Fine-Grained Pest Feature Extraction",
          "Trích xuất đặc trưng giải phẫu sâu bệnh (râu, chân, vân cánh)",
          "Phân loại hình thái vi sai",
          "Kỹ thuật trích xuất đặc trưng giải phẫu sinh học giúp phân biệt chính xác các loài sâu hại có ngoại hình tương đồng (minimal inter-class difference) và biến đổi qua các giai đoạn ấu trùng/trưởng thành.",
          "Giúp mô hình tăng 6.33% mAP50 trên các nhóm côn trùng khó phân biệt bằng mắt thường hoặc cành lá che khuất.",
          [paperDeformableAttention, paperFineGrainedPest]
        ),
        new KeywordNode(
          "kw-occlusion",
          "Occluded & Dense Small-Pest Localization",
          "Định vị sâu bệnh siêu nhỏ & bị cành lá che khuất ngoài đồng ruộng",
          "Xử lý che khuất & Mật độ dày",
          "Cấu trúc kết hợp hợp nhất đặc trưng đa tỉ lệ tầng nông - sâu và hàm mất mát khoảng cách điểm cực trị MPDIoU, giải quyết triệt để vấn đề mất dấu các côn trùng kích thước siêu nhỏ (micro-pests) và bò chồng lấn lên nhau.",
          "Đặc biệt hiệu quả với các ổ ấu trùng, rệp vừng hoặc nhện đỏ bám dày đặc trên mặt dưới của phiến lá.",
          [paperCrossScaleFusion, paperMPDIoU]
        ),
        new KeywordNode(
          "kw-realtime-edge",
          "Real-Time Field Pest Detection (Edge AI)",
          "Phát hiện sâu bệnh thời gian thực trên thiết bị vi biên đồng ruộng",
          "Tối ưu thực địa & Edge AI",
          "Ứng dụng kiến trúc Real-Time Transformer loại bỏ hoàn toàn bước hậu xử lý NMS, cho phép triển khai thuật toán trên bẫy đèn thông minh, flycam nông nghiệp chạy pin mặt trời với tốc độ trên 80 FPS.",
          "Mở đường cho việc thương mại hóa giải pháp cảnh báo sớm dịch hại ngoài cánh đồng tự động 24/7.",
          [paperRTDetr, paperEdgePest]
        ),
      ],
    });
  }
}
