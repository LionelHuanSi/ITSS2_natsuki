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
 * Kịch bản vàng: "Nhận diện sâu bệnh nông nghiệp đa loài thời gian thực bằng thị giác máy tính"
 * Dựa trên công trình nghiên cứu chính thức:
 * "Multi-species insect recognition method based on computer visions: Sustainable agricultural development"
 * Xuất bản trên tạp chí Ecological Informatics (Elsevier, 2025).
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
    // ----------------------------------------------------
    // BÀI BÁO 1 (BÀI BÁO NỀN TẢNG CỐT LÕI TỪ NGƯỜI DÙNG)
    // ----------------------------------------------------
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
      }
    );

    // ----------------------------------------------------
    // BÀI BÁO 2: THAM CHIẾU KIẾN TRÚC NỀN TẢNG (RT-DETR)
    // ----------------------------------------------------
    const paperRTDetr = new AcademicPaper(
      "paper-rtdetr-cvpr-2023",
      "DETRs Beat YOLOs on Real-time Object Detection",
      "W. Lv, S. Xu, Y. Zhao, G. Wang, J. Wei, C. Cui et al. (Baidu Inc.)",
      2023,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Công trình nền tảng chứng minh mô hình Transformer có thể vượt qua dòng họ YOLO cả về độ chính xác và tốc độ suy luận thời gian thực mà không cần Non-Maximum Suppression (NMS).",
      [
        "Real-time object detection has long been dominated by YOLO detectors due to their low latency. However, YOLO models heavily rely on Non-Maximum Suppression (NMS) for post-processing, which introduces significant inference latency variance and hyperparameter sensitivity.",
        "In this paper, we propose the Real-Time DEtection TRansformer (RT-DETR), the first end-to-end real-time object detector based on Vision Transformers. We design an efficient hybrid encoder that decouples intra-scale interaction and cross-scale fusion, achieving superior trade-offs between speed and accuracy.",
        "On the MS COCO benchmark, RT-DETR-L achieves 53.0% AP at 114 FPS on T4 GPU, outperforming state-of-the-art YOLO detectors across multiple scale metrics."
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
      }
    );

    // ----------------------------------------------------
    // BÀI BÁO 3: THAM CHIẾU TẬP DỮ LIỆU CHUẨN MỰC (IP102)
    // ----------------------------------------------------
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
      }
    );

    // ----------------------------------------------------
    // TỔ CHỨC CÂY TỪ KHÓA HỌC THUẬT (MÀN 2)
    // ----------------------------------------------------
    this.topics.set("pest-vision", {
      key: "pest-vision",
      title: "Nhận diện sâu bệnh nông nghiệp đa loài bằng thị giác máy tính",
      subDomain: "Smart Agriculture & Computer Vision",
      keywords: [
        new KeywordNode(
          "kw-ipd",
          "Multi-Species Insect Pest Detection (IPD)",
          "Nhận diện & phát hiện sâu hại nông nghiệp đa loài",
          "Core Problem",
          "Bài toán cốt lõi trong nông nghiệp thông minh nhằm định vị và phân loại tự động 102 loài sâu bệnh phá hoại mùa màng trong điều kiện đồng ruộng tự nhiên.",
          "Thay vì tìm kiếm các từ khóa chung chung như 'insect recognition', giới nghiên cứu quốc tế sử dụng cụm 'Multi-Species Insect Pest Detection' trên tập benchmark IP102.",
          [paperPestRTDetr, paperIP102]
        ),
        new KeywordNode(
          "kw-rtdetr",
          "Real-Time Detection Transformer (RT-DETR)",
          "Bộ biến đổi phát hiện đối tượng thời gian thực",
          "Architecture",
          "Kiến trúc Transformer phát hiện đối tượng thời gian thực (80+ FPS) loại bỏ hoàn toàn bước hậu xử lý NMS, giúp phân tích tương quan đặc trưng toàn cục vượt trội so với YOLO.",
          "Đây là bước chuyển đổi công nghệ then chốt từ các mạng CNN truyền thống sang Transformer trong thị giác máy tính nông nghiệp.",
          [paperPestRTDetr, paperRTDetr]
        ),
        new KeywordNode(
          "kw-das-cf",
          "Deformable Attention & Cross-Scale Fusion (DAS-CF)",
          "Cơ chế chú ý biến dạng & Hợp nhất đặc trưng đa tỉ lệ",
          "Methodology",
          "Phương pháp trích xuất đặc trưng giải phẫu côn trùng (râu, chân) và hợp nhất đặc trưng giữa các tầng nông - sâu để nhận diện chính xác các loài sâu hại kích thước nhỏ (micro-pests) và bị che khuất.",
          "Giúp mô hình tăng 6.33% mAP50 trên các vùng ảnh bị che khuất hoặc có ánh sáng phản chiếu phức tạp.",
          [paperPestRTDetr]
        ),
        new KeywordNode(
          "kw-loss-opt",
          "Long-Tail Imbalance & MPDIoU Loss",
          "Cân bằng phân bố đuôi dài & Hàm mất mát khoảng cách cực trị",
          "Optimization",
          "Chiến lược tối ưu hóa hàm mất mát kết hợp Focal Loss để cân bằng dữ liệu đuôi dài và MPDIoU để định vị chính xác các cá thể sâu hại nằm dày đặc hoặc chồng lấn lên nhau.",
          "Giải quyết điểm nghẽn lớn nhất trong việc ứng dụng AI vào thực tế đồng ruộng khi mật độ sâu bệnh phát triển bùng phát.",
          [paperPestRTDetr, paperIP102]
        ),
      ],
    });
  }
}
