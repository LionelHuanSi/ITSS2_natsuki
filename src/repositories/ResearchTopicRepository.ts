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
    // ĐƯỢC TRÍCH XUẤT NGUYÊN BẢN TỪ FILE PDF THỰC TẾ (12 TRANG)
    // ====================================================
    const paperPestRTDetr = new AcademicPaper(
      "paper-pest-rtdetr-2025",
      "Multi-species insect recognition method based on computer visions: Sustainable agricultural development",
      "L. Zhang, S. Sun, H. Zhao, Z. Li, D. Li (Wuxi University & Jilin University)",
      2025,
      "Ecological Informatics (Elsevier), Vol. 88, 103125",
      "Đề xuất mô hình Pest-RTDetr phát hiện sâu bệnh nông nghiệp đa loài thời gian thực loại bỏ nút thắt cổ chai NMS, kết hợp backbone DAS-ResNet50 và cơ chế hợp nhất đặc trưng đa tỉ lệ CF.",
      [
        "1. Introduction",
        "In agricultural production management, insect pests are responsible for approximately 20 % of global crop losses each year (Mateos Fernandez et al., 2022). Therefore, insect pest control plays a crucial role in agricultural production and exerts a significant influence on agricultural development, food production, and farmers' income (Nomura and Shigemura, 2019). Detecting insect pests is a highly challenging task in agricultural image processing (Suto, 2021). Traditional insect pest identification methods heavily rely on frontline plant protection workers and agricultural technicians, requiring substantial time and effort. This approach is cumbersome, inefficient, and inadequate for large-scale pest monitoring, early warning, and environmentally friendly prevention and control. With advancements in computer science, the application of intelligent technologies in agricultural ecological informatics has garnered increasing attention (Amarathunga et al., 2021). Intelligent algorithms not only improve operational efficiency, but also effectively prevent large-scale pest outbreaks, thereby increasing crop yields and providing data-driven solutions for the sustainable development of agricultural ecosystems.",
        "Image detection methods offer high efficiency, low cost, and simplicity in identifying insect pests. These methods enable timely and accurate detection, allowing agricultural practitioners to implement preventive measures and control their spread (G and Ajai, 2021). Several scholars have proposed traditional image identification methods for insect pest detection, including those based on graph theory and region testing. However, traditional detection methods are only effective for a small number of samples or limited ranges, and they demonstrate low stability in detection accuracy. Deep learning offers high precision and adaptability, overcoming the low detection accuracy of traditional methods when identifying complex and diverse samples. Li et al. developed a Faster R-CNN-based network model to detect whiteflies and thrips using sticky trap images. Albattah et al. proposed a drone-based deep learning method for large-scale multiclass pest detection, and Lima et al. proposed a pest detection method based on YOLOv8, improving mean average precision through enhancements to the multi-scale feature fusion module.",
        "However, convolutional neural network (CNN)-based algorithms lack a global understanding of features, limiting their ability to effectively handle occlusion. Moreover, insect pest species often share similar appearances with minimal inter-class differences, while displaying pronounced intra-class variations across developmental stages. Vision Transformer (ViT)-based image recognition algorithms have demonstrated strong advantages in classification tasks (Dosovitskiy et al., 2020), but high computational costs have hindered edge equipment deployment. The Detection Transformer (DETR) represents an end-to-end object detection framework built upon ViT architecture, eliminating the need for anchor adjustment and non-maximum suppression (NMS) post-processing. However, DETR models exhibit slow convergence and reduced detection accuracy for multi-scale targets. Building on this, Lv et al. proposed a real-time target detection model (RT-DETR) that optimizes the DETR encoder to realize both global feature analysis and real-time execution throughput.",
        "Therefore, in this study, based on the RT-DETR network model, we propose the Pest-RTDetr algorithm for multi-species agricultural insect pest detection. To address the challenges of species diversity, unbalanced pest distribution, and the varying scales and dense arrangements of insect pests in images, we introduce improvement strategies for the classification and localization algorithms. The main contributions of this study are summarized as follows:",
        "1. We provide a real-time multi-species insect detection method using computer vision, demonstrating its potential for agricultural sustainable development.",
        "2. We identify the key challenges in multi-species pest recognition and introduce a visual attention mechanism to enhance the model's focus on critical pest features for more accurate localization.",
        "3. We propose a feature fusion method to capture and integrate information from different scales, improving mean average precision in detecting dense, multi-scale pests.",
        "4. We introduce a new loss function to accelerate model convergence and improve classification accuracy.",
        "2. Materials and methods",
        "Pest detection faces significant challenges, including diverse pest categories, subtle inter-class distinctions, and pronounced intra-class variations across life stages. Additionally, field data collection presents substantial hurdles compared to standard plant disease diagnostics. Current data is primarily collected through fixed equipment acquisition, real-field unconstrained environment acquisition, and curated agricultural databases. Table 1 illustrates the significant advantages of the IP102 benchmark dataset, including 102 pest classes, multiple insect developmental stages (eggs, larvae, pupae, and adults), and diverse unconstrained field backgrounds with varying target scales.",
        "2.1. Datasets",
        "The IP102 benchmark dataset contains 75,222 samples of 102 common crop insect pests, with approximately 19,000 images annotated with precise bounding boxes for target detection. The images were sourced from specialized agricultural and insect science archives, captured under natural field illumination. Based on the varying impacts of different insect pests on crops, each pest is categorized under eight crop super-classes (rice, corn, wheat, beet, alfalfa, vitis, citrus, and mango).",
        "To explore the applicability of the IP102 dataset for insect pest detection, data visualization analysis was performed to extract pest target sizes across all samples. The dataset contains many pest species with an imbalanced distribution across categories, exhibiting a severe natural long-tail distribution. Additionally, the study incorporated the Dangerous Farm Insects dataset (designated as P15), comprising 1,300 high-resolution images across 15 species with dense distributions. In natural field imagery, insect pests exhibit rich colors and morphological shifts across developmental instars, complicating the classification model's ability to extract distinguishing biological features.",
        "2.2. Data preprocessing",
        "Based on the analysis of data distributions, resampling was employed to expand the dataset and balance training samples through repeated random sampling of tail data. The resampling approach balances pest quantities between head and tail categories while preventing overfitting through controlled tail data sampling. Consequently, the sampled tail data quantity approximates half of the head data.",
        "To address long-tail distribution characteristics and complex backgrounds, Mosaic and Mixup data augmentation techniques were employed. The Mosaic method randomly selects four images, applying spatial transformations (flipping, rotating, cropping, scaling, translation, brightness, and noise adjustment) before stitching them together, enriching multi-scale information. The Mixup method blends two images and their one-hot labels in geometric proportions. In this study, Mixup was applied to enhance data for insect pests with limited samples, improving model robustness, while Mosaic enhanced overall generalization.",
        "2.3. Pest-RTDetr network structure",
        "The proposed Pest-RTDetr algorithm builds upon the RT-DETR framework, comprising five key components: an input layer, backbone network, neck CCFM encoder, decoder, and output prediction head. The backbone network adopts DAS-ResNet50 to extract C3, C4, and C5 feature layers with step sizes of 8, 16, and 32 respectively. The high-level semantic features of C5 undergo AIFI processing, reducing model computation and accelerating training speed. Feature layers P5, C3, and C4 pass through the cross-scale feature fusion module (CCFM), where multi-scale features are integrated before being fed into the decoder for final bounding box regression and classification.",
        "2.3.1. The backbone network",
        "The DAS attention mechanism combines contextual information from layer features with deformable convolution capability, allowing the model to focus on salient anatomical features without additional memory overhead. Input features pass through the DAS module: DAS first employs depth-separable convolutions to improve efficiency, followed by deformable convolution to locate relevant image regions, and concludes by outputting pixel-level attention weights. In this study, DAS was integrated into ResNet-50 blocks, where gated channel attention facilitates inter-block information dissemination, boosting CNN representational capacity with minimal increase in FLOPs.",
        "2.3.2. Feature fusion module",
        "In this study, an enhanced feature fusion module (CF) is designed to integrate feature representations across different scales. A double-branch structure is employed, where upper and lower branches undergo CBS (Conv 1x1 + SiLU + BatchNorm) operations to reduce channel dimensions and ensure branch uniformity. The upper branch incorporates DAS and three stacked Bottlenecks, forming the primary gradient flow branch to capture rich gradient information, mitigate vanishing gradients, retain low-level positional details, and accentuate salient biological markers.",
        "Residual connections deepen the model to improve feature fidelity. In the baseline model, RepBlock multi-branch structures introduce heavy parameterization during training, increasing computational load and causing overfitting. In this study, lightweight Bottleneck blocks replace RepBlocks, eliminating redundant convolutions, reducing parameter complexity, and improving the model's generalization across micro-target pests.",
        "2.3.3. Optimization of the loss function",
        "The loss function comprises classification and bounding box regression losses. Due to the long-tail distribution of the IP102 dataset, models tend to overfit on abundant head classes and underfit on scarce tail classes. Focal Loss addresses this imbalance by dynamically down-weighting easy samples through balancing factor alpha_t and focusing training gradients on hard-to-classify minority samples through focusing parameter gamma.",
        "Furthermore, RT-DETR employs one-to-one bipartite matching based on IoU between predicted bounding boxes and ground truth. However, conventional Generalized IoU (GIoU) fails to reflect overlap accurately when boxes do not intersect, resulting in slow convergence. This study replaces GIoU with MPDIoU (Minimum Point Distance IoU). MPDIoU directly minimizes the distance between the top-left and bottom-right corners of predicted and target boxes, simplifying geometric comparison, accelerating convergence by 26%, and eliminating bounding box distortions caused by overlapping pests.",
        "3. Results",
        "3.1. Model evaluation and training results",
        "3.1.1. Experimental environment configuration",
        "Model training and evaluations were executed on Ubuntu 20.04.5 LTS, utilizing an Intel Xeon Silver 4214R CPU, an NVIDIA RTX 3090 GPU (24GB VRAM), CUDA 11.8, Python 3.8.10, and PyTorch 2.0.0. To guarantee experimental consistency across all comparative architectures, the initial learning rate was set to 0.01, batch size to 16, weight decay to 0.0005, and training duration to 100 epochs.",
        "3.1.2. Evaluation methods",
        "Model performance was comprehensively quantified using precision (P), recall (R), mean average precision at IoU 0.50 (mAP50), and across IoU 0.50 to 0.95 (mAP50-95). Classification accuracy (Acc) and F1 score evaluated overall predictive balance, while frames per second (FPS) quantified real-time throughput. An inference speed exceeding 30 FPS satisfies standard real-time field monitoring criteria.",
        "3.2. Ablation experiment",
        "To isolate the individual contribution of each proposed module, ablation experiments were conducted on the IP102 dataset under unified configurations (split 6:1:3 into training, validation, and test sets). Compared with baseline RT-DETR (mAP50 59.11%), incorporating the DAS-ResNet50 backbone alone increased mAP50 to 61.61% (+2.50%). Adding the CF cross-scale feature fusion module alone increased mAP50 to 62.32% (+3.21%) and boosted recall by 3.05%.",
        "Integrating both DAS and CF modules achieved an mAP50 of 65.44% (+6.33% over baseline) and a 4.76% improvement in F1 score. Incorporating the optimized loss function (Focal Loss + MPDIoU) and resampling strategy yielded the optimal overall performance: mAP50 of 68.40% (a cumulative +9.29% improvement) at 80 FPS. Heatmap visualization confirms that Pest-RTDetr concentrates feature activation sharply on insect head, antenna, and foot regions, preserving fine-grained morphological details under foliage occlusion.",
        "3.3. Comparative experiment",
        "Pest-RTDetr was benchmarked against nine established object detection models on the IP102 dataset: Faster R-CNN (54.34% mAP50 at 26 FPS), YOLOv5 (55.90% at 45 FPS), YOLOv7 (56.47% at 57 FPS), YOLOv8 (58.80% at 71 FPS), CenterNet (47.04% at 22 FPS), DETR (54.31% at 28 FPS), Deformable-DETR (57.22% at 17 FPS), DINO-DeformableDETR (59.03% at 24 FPS), and baseline RT-DETR (59.11% at 74 FPS).",
        "Pest-RTDetr demonstrated decisive superiority, achieving 68.40% mAP50 at 80 FPS with 41M parameters. Traditional CNN two-stage detectors (Faster R-CNN) suffered from NMS suppression of dense clusters, while one-stage detectors (YOLOv8) struggled with fine-grained anatomical distinctions. Previous Transformer models (DETR, Deformable-DETR) incurred prohibitive computational latencies (<28 FPS). Pest-RTDetr achieves an optimal balance between precision (+9.29% over baseline) and high throughput (80 FPS), validating its real-world deployment viability.",
        "4. Discussion",
        "This paper proposes an advanced end-to-end multi-species pest detection model, Pest-RTDetr. By enhancing the cross-scale feature fusion module and eliminating NMS post-processing bottlenecks, Pest-RTDetr effectively localizes pest targets across different scales and densities in real time, facilitating automated precision pesticide spraying and intelligent farm management. By focusing attention on insect head and foot anatomical structures, our model reliably differentiates closely resembling species.",
        "Although Pest-RTDetr achieves state-of-the-art performance, several dataset and environmental limitations warrant discussion: current agricultural datasets lack coverage of emerging invasive species, and unconstrained field conditions such as heavy rainfall, night lighting, and multi-crop intercropping present persistent challenges. Domain shift remains an obstacle when deploying models across geographically distant farming regions. Future research will explore transfer learning, domain generalization, lightweight quantization for embedded edge hardware (NVIDIA Jetson platforms), and multi-modal sensory networks fusing visual data with soil and microclimate sensors.",
        "5. Conclusion",
        "Detecting multi-species insect pests with varying scales, dense distribution, and occlusion in natural field scenarios is a fundamental prerequisite for smart and sustainable agriculture. In this study, we proposed the Pest-RTDetr framework, uniting deformable attention mechanisms with cross-scale feature fusion and geometric point-distance loss optimization. The model achieves an mAP50 of 68.40% at 80 FPS on the IP102 benchmark, striking an optimal balance between localization precision and real-time execution. This technology provides strong theoretical and empirical foundations for automated crop protection and ecological pest management."
      ],
      {
        "long-tail distribution":
          "Phân bố dữ liệu đuôi dài (Long-Tail Distribution): Hiện tượng mất cân bằng mẫu nghiêm trọng trong tập dữ liệu IP102 (102 loài sâu bệnh), trong đó một số ít loài có rất nhiều ảnh mẫu (Head data), còn phần lớn các loài sâu hại quý hiếm lại chỉ có rất ít ảnh (Tail data), khiến mô hình thông thường dễ bị thiên vị và dự đoán sai các loài thiểu số.",
        "occlusion":
          "Hiện tượng che khuất quang học (Occlusion): Trạng thái côn trùng bị cành lá, bóng râm hoặc các côn trùng khác che khuất một phần thân thể trong môi trường tự nhiên, gây mất mát thông tin hình ảnh nghiêm trọng.",
        "deformable attention":
          "Cơ chế chú ý biến dạng động (Deformable Attention - DAS): Kỹ thuật trong mạng tích chập giúp mô hình tự co giãn vùng tiếp nhận (receptive field) theo hình dáng giải phẫu tự nhiên của côn trùng (tập trung vào râu, chân, vân cánh) thay vì quét các ô vuông cố định, qua đó phân biệt chuẩn xác các loài sâu hại có ngoại hình tương đồng.",
        "salient features":
          "Đặc trưng nổi bật (Salient Features): Các vùng giải phẫu mang tín hiệu nhận diện đặc trưng nhất của côn trùng (như mắt, râu, vân cánh, khớp chân) thay vì quét đồng đều toàn bộ bức ảnh, giúp phân loại chính xác ngay cả khi thân côn trùng bị cành lá che khuất.",
        "cross-scale feature fusion":
          "Hợp nhất đặc trưng đa tỉ lệ (Cross-Scale Feature Fusion - CF): Cấu trúc hai nhánh kết hợp DAS và Bottlenecks giúp truyền tải đặc trưng ngữ nghĩa mức cao xuống tầng nông, giúp phát hiện chuẩn xác các loài sâu bệnh siêu nhỏ (micro-pests) trên nền lá cây phức tạp.",
        "small, densely distributed targets":
          "Mục tiêu siêu nhỏ & phân bố dày đặc: Một trong những bài toán hóc búa nhất của thị giác máy tính nông nghiệp, khi các loài sâu rầy có kích thước chỉ vài milimet và thường tập trung thành bầy lớn trên cùng một phiến lá.",
        "Focal Loss":
          "Hàm mất mát tiêu điểm (Focal Loss): Hàm mục tiêu tinh chỉnh trọng số của các mẫu huấn luyện, giảm trọng số của các mẫu dễ nhận diện và tập trung tối đa đạo hàm vào các mẫu khó (các loài sâu hại ít gặp ở phần đuôi dữ liệu).",
        "MPDIoU":
          "Hàm mất mát khoảng cách điểm cực trị (MPDIoU - Minimum Point Distance IoU): Chỉ số tương đồng bounding box dựa trên khoảng cách giữa các góc trên-trái và dưới-phải của hộp dự đoán và hộp nhãn thực tế. MPDIoU giúp thuật toán hội tụ nhanh hơn 26% và khắc phục hiện tượng mất dấu khi các con côn trùng bò đè lên nhau.",
        "RT-DETR":
          "Mạng biến đổi phát hiện đối tượng thời gian thực (Real-Time Detection Transformer): Kiến trúc tiên phong kết hợp ưu điểm học đặc trưng toàn cục của Transformer với tốc độ suy luận cực nhanh (80 FPS), loại bỏ hoàn toàn bước hậu xử lý NMS (Non-Maximum Suppression) phức tạp của họ mô hình YOLO.",
        "Detection Transformer":
          "Kiến trúc DETR (Detection Transformer): Khung phát hiện đối tượng đầu-cuối (end-to-end) dựa trên Transformer, biểu diễn bài toán phát hiện đối tượng dưới dạng ghép cặp tập hợp trực tiếp (set prediction).",
        "NMS":
          "Loại bỏ phi cực đại (Non-Maximum Suppression - NMS): Thuật toán lọc các khung bao trùng lặp trong xử lý ảnh truyền thống, là nút thắt cổ chai về độ trễ suy luận được Pest-RTDetr loại bỏ hoàn toàn.",
        "IP102 benchmark":
          "Tập dữ liệu chuẩn mực IP102: Bộ dữ liệu sâu bệnh mở lớn nhất thế giới gồm 75,222 ảnh trên 102 loài sâu bệnh phá hoại mùa màng, chia thành 8 nhóm cây trồng chủ lực.",
        "crop superclass":
          "Siêu lớp cây trồng (Crop Superclass): Phân loại sâu bệnh theo 8 nhóm cây nông nghiệp chủ lực (lúa nước, ngô, lúa mì, củ cải đường, cỏ linh lăng, nho, cam quýt, xoài).",
        "P15 dataset":
          "Tập dữ liệu côn trùng nông trại nguy hiểm P15: Bộ dữ liệu gồm 1,300 ảnh chất lượng cao thuộc 15 loài sâu hại mật độ cao được tích hợp để kiểm chứng khả năng phát hiện mục tiêu chen chúc.",
        "life cycle stages":
          "Các giai đoạn vòng đời côn trùng: Sự biến đổi hình thái mạnh mẽ giữa các giai đoạn trứng, ấu trùng, nhộng và trưởng thành, gây thách thức cực lớn cho mô hình phân loại thị giác.",
        "resampling":
          "Lấy mẫu lại dữ liệu (Resampling): Kỹ thuật cân bằng số lượng mẫu giữa nhóm phổ biến (Head data) và nhóm hiếm gặp (Tail data) bằng cách lấy mẫu lặp ngẫu nhiên có kiểm soát đối với phần đuôi.",
        "Mosaic data augmentation":
          "Tăng cường dữ liệu Mosaic: Phương pháp ghép ngẫu nhiên 4 bức ảnh khác nhau kèm các biến đổi hình học (xoay, cắt, co giãn, đổi độ sáng) để làm phong phú bối cảnh và quy mô mục tiêu.",
        "Mixup data augmentation":
          "Tăng cường dữ liệu Mixup: Kỹ thuật trộn tuyến tính hai bức ảnh và nhãn của chúng theo tỷ lệ pixel, giúp mô hình học biểu diễn đặc trưng mềm dẻo và chống nhiễu.",
        "DAS-ResNet50":
          "Backbone DAS-ResNet50: Mạng xương sống ResNet-50 tích hợp cơ chế chú ý biến dạng DAS, tối ưu hóa đường truyền gradient và vùng tiếp nhận không gian.",
        "AIFI processing":
          "Bộ mã hóa tương tác nội tầng AIFI: Khâu xử lý trong RT-DETR áp dụng attention chỉ trên tầng đặc trưng ngữ nghĩa cao cấp nhất (C5) để tiết kiệm tài nguyên tính toán.",
        "CCFM":
          "Mạng hợp nhất đặc trưng xuyên tầng (CCFM): Module đóng vai trò Neck của mô hình, chịu trách nhiệm kết hợp luồng đặc trưng giữa P5, C3 và C4.",
        "double-branch structure":
          "Cấu trúc hai nhánh (Double-Branch Structure): Kiến trúc của module CF gồm nhánh trên (DAS + 3 Bottlenecks) làm luồng gradient chính và nhánh dưới bổ trợ thông tin không gian.",
        "Bottleneck block":
          "Khối Bottleneck: Cấu trúc kết hợp tích chập 1x1 và 3x3 thay thế cho RepBlock nặng nề, giúp triệt tiêu hiện tượng quá khớp (overfitting) và giảm thiểu số lượng tham số.",
        "RepBlock":
          "Khối RepBlock: Cấu trúc tích chập đa nhánh phức tạp trong RT-DETR gốc, có quá nhiều tham số dẫn tới nguy cơ quá khớp trên tập dữ liệu sâu bệnh.",
        "depth-separable convolutions":
          "Tích chập tách biệt theo chiều sâu (Depth-wise Separable Convolution): Kỹ thuật phân tách tích chập không gian và tích chập kênh giúp giảm mạnh số phép tính FLOPs trong module DAS.",
        "gated channel attention":
          "Cơ chế chú ý kênh có cổng (Gated Channel Attention): Cấu trúc điều tiết luồng thông tin truyền qua giữa các khối ResNet-50, tăng độ nhạy phân biệt giữa các loài sâu hại gần giống nhau.",
        "vanishing gradient":
          "Hiện tượng triệt tiêu đạo hàm (Vanishing Gradient): Khó khăn trong việc huấn luyện mạng sâu khi đạo hàm giảm dần về 0, được khắc phục triệt để nhờ các kết nối phần dư (Residual connections).",
        "GIoU":
          "Chỉ số Generalized IoU: Hàm mất mát bounding box thế hệ trước, gặp khó khăn khi hai khung bao không giao nhau hoặc khi các đối tượng bò đè lên nhau.",
        "mAP50":
          "Độ chính xác trung bình tại ngưỡng IoU 0.5 (mAP50): Chỉ số đánh giá cốt lõi của Object Detection. Pest-RTDetr đạt mAP50 68.40%, tăng +9.29% so với mô hình cơ sở.",
        "mAP50-95":
          "Độ chính xác trung bình trên dải IoU 0.5 đến 0.95: Đánh giá độ khắt khe về vị trí ôm sát của khung bao, Pest-RTDetr đạt 43.40% vượt xa YOLOv8 (38.78%).",
        "FPS":
          "Tốc độ xử lý khung hình/giây (Frames Per Second - FPS): Đo lường năng lực suy luận thời gian thực. Pest-RTDetr đạt 80 FPS trên card đồ họa đơn, vượt chuẩn thời gian thực (30 FPS).",
        "F1 score":
          "Điểm F1 (F1-score): Trung bình điều hòa giữa Precision và Recall, phản ánh sự cân bằng hoàn hảo giữa khả năng bắt đúng và tránh bỏ sót sâu bệnh.",
        "ablation experiment":
          "Thực nghiệm bóc tách (Ablation Study): Quy trình cô lập và kiểm chứng định lượng đóng góp của từng module (DAS +2.50%, CF +3.21%, DAS+CF +6.33%, Loss +1.10%).",
        "head and foot regions":
          "Vùng đầu và chân côn trùng: Các bộ phận mang tín hiệu giải phẫu phân loại nhạy cảm nhất được mô hình chú ý tập trung trên biểu đồ nhiệt (Heatmap).",
        "Faster R-CNN":
          "Mô hình Faster R-CNN: Mạng phát hiện đối tượng 2 giai đoạn kinh điển, đạt mAP50 54.34% ở 26 FPS nhưng bị hạn chế do bước hậu xử lý NMS lọc nhầm mục tiêu dính chùm.",
        "YOLOv8":
          "Mô hình YOLOv8: Đại diện tiêu biểu của họ mạng phát hiện 1 giai đoạn, đạt mAP50 58.80% ở 71 FPS nhưng thiếu cơ chế liên kết đặc trưng toàn cục.",
        "CenterNet":
          "Mô hình CenterNet: Thuật toán phát hiện đối tượng dựa trên điểm tâm, đạt mAP50 47.04% do bị trùng lặp tọa độ khi sâu bệnh xuất hiện dày đặc.",
        "DINO-DeformableDETR":
          "Mô hình DINO-DeformableDETR: Kiến trúc Transformer tiên tiến đạt mAP50 59.03% nhưng tốc độ suy luận quá chậm (24 FPS), không đáp ứng yêu cầu thời gian thực ngoài đồng ruộng.",
        "automated pesticide spraying":
          "Phun thuốc trừ sâu tự động: Ứng dụng thực tiễn của Pest-RTDetr khi kết hợp với cánh tay robot hoặc drone nông nghiệp để định vị và phun thuốc chính xác theo tọa độ sâu bệnh.",
        "domain shift":
          "Hiện tượng dịch chuyển miền (Domain Shift): Sự sai lệch phân phối dữ liệu khi áp dụng mô hình huấn luyện ở vùng địa lý này sang vùng canh tác hoặc thời tiết khác.",
        "transfer learning":
          "Học chuyển giao (Transfer Learning): Kỹ thuật tinh chỉnh mô hình từ tập dữ liệu lớn sang các loài sâu bệnh hiếm gặp ở địa phương mà không cần đào tạo lại từ đầu.",
        "invasive species":
          "Các loài sâu hại xâm lấn (Invasive Species): Các loài dịch hại mới xuất hiện chưa có trong cơ sở dữ liệu huấn luyện, là thách thức nghiên cứu mở được nêu trong phần Discussion.",
        "multi-modal pest detection":
          "Hệ thống phát hiện sâu bệnh đa phương thức: Hướng đi tương lai kết hợp dữ liệu thị giác máy tính với cảm biến đất, độ ẩm và dự báo thời tiết vi khí hậu."
      },
      {
        "long-tail distribution": "Phân bố dữ liệu đuôi dài (mất cân bằng mẫu giữa các loài)",
        "occlusion": "Hiện tượng che khuất quang học do cành lá hoặc bóng râm",
        "deformable attention": "Cơ chế chú ý biến dạng động (DAS)",
        "salient features": "Đặc trưng giải phẫu nổi bật mang tính quyết định nhận diện",
        "cross-scale feature fusion": "Hợp nhất đặc trưng đa tỉ lệ (kết hợp tầng nông và tầng sâu)",
        "small, densely distributed targets": "Các mục tiêu sâu bệnh siêu nhỏ và phân bố dày đặc",
        "Focal Loss": "Hàm mất mát tiêu điểm (tập trung học các loài sâu bệnh hiếm gặp)",
        "MPDIoU": "Hàm mất mát khoảng cách điểm cực trị (MPDIoU)",
        "RT-DETR": "Mạng biến đổi phát hiện đối tượng thời gian thực (RT-DETR)",
        "Detection Transformer": "Khung phát hiện đối tượng Transformer đầu-cuối (DETR)",
        "NMS": "Thuật toán loại bỏ phi cực đại (Non-Maximum Suppression)",
        "IP102 benchmark": "Bộ dữ liệu chuẩn mực sâu bệnh nông nghiệp IP102",
        "crop superclass": "Siêu lớp cây trồng nông nghiệp chủ lực",
        "P15 dataset": "Tập dữ liệu côn trùng nông trại nguy hiểm P15 (15 loài)",
        "life cycle stages": "Các giai đoạn vòng đời (trứng, ấu trùng, nhộng, trưởng thành)",
        "resampling": "Kỹ thuật lấy mẫu lại dữ liệu đuôi",
        "Mosaic data augmentation": "Tăng cường dữ liệu không gian Mosaic (ghép 4 ảnh)",
        "Mixup data augmentation": "Tăng cường dữ liệu tuyến tính Mixup (trộn ảnh và nhãn)",
        "DAS-ResNet50": "Mạng xương sống DAS-ResNet50 tích hợp chú ý biến dạng",
        "AIFI processing": "Bộ mã hóa tương tác nội tầng AIFI (tối ưu hóa tầng C5)",
        "CCFM": "Mạng hợp nhất đặc trưng xuyên tầng CCFM",
        "double-branch structure": "Cấu trúc hai nhánh của module CF",
        "Bottleneck block": "Khối tích chập Bottleneck (chống quá khớp)",
        "RepBlock": "Khối RepBlock đa nhánh nặng nề trong mô hình gốc",
        "depth-separable convolutions": "Tích chập tách biệt theo chiều sâu",
        "gated channel attention": "Cơ chế chú ý kênh có cổng điều tiết",
        "vanishing gradient": "Hiện tượng triệt tiêu đạo hàm trong mạng sâu",
        "GIoU": "Chỉ số tương đồng Generalized IoU",
        "mAP50": "Độ chính xác trung bình tại ngưỡng IoU 0.5 (mAP50)",
        "mAP50-95": "Độ chính xác trung bình trên dải IoU 0.5-0.95 (mAP50-95)",
        "FPS": "Tốc độ xử lý khung hình trên giây (FPS)",
        "F1 score": "Điểm cân bằng F1 (harmonic mean)",
        "ablation experiment": "Thực nghiệm bóc tách từng thành phần mô hình",
        "head and foot regions": "Vùng đầu, râu và chân của côn trùng",
        "Faster R-CNN": "Mô hình mạng nơ-ron tích chập 2 giai đoạn Faster R-CNN",
        "YOLOv8": "Mô hình phát hiện 1 giai đoạn thời gian thực YOLOv8",
        "CenterNet": "Mô hình phát hiện đối tượng dựa trên điểm tâm CenterNet",
        "DINO-DeformableDETR": "Mô hình DINO-DeformableDETR",
        "automated pesticide spraying": "Phun thuốc bảo vệ thực vật tự động hóa",
        "domain shift": "Hiện tượng dịch chuyển miền dữ liệu",
        "transfer learning": "Kỹ thuật học chuyển giao thích ứng miền",
        "invasive species": "Các loài côn trùng sâu bệnh ngoại lai xâm lấn",
        "multi-modal pest detection": "Hệ thống phát hiện sâu bệnh đa phương thức"
      },
      "SCIE Q1 · IF: 6.8",
      54,
      [
        "Đạt độ chính xác mAP50 68.40% tại tốc độ suy luận siêu tốc 80 FPS trên tập benchmark IP102 (102 loài sâu bệnh), vượt trội toàn diện so với YOLOv8 (58.80% tại 71 FPS) và Faster R-CNN (54.34% tại 26 FPS).",
        "Backbone DAS-ResNet50 kết hợp cơ chế chú ý biến dạng động giúp tăng 2.50% mAP50, tự động bám sát các đặc trưng giải phẫu nhạy cảm (đầu, râu, chân) của côn trùng khi bị cành lá che khuất.",
        "Module hợp nhất đặc trưng hai nhánh CF với các khối Bottleneck thay thế RepBlock giúp tăng 3.21% mAP50 và cải thiện 3.05% Recall trên các loài sâu bệnh kích thước siêu nhỏ.",
        "Hàm mất mát MPDIoU kết hợp Focal Loss giúp mô hình hội tụ nhanh hơn 26% thời gian huấn luyện và giải quyết triệt để hiện tượng sai lệch bounding box khi côn trùng bò chồng lấn."
      ],
      "Cung cấp kiến trúc tham chiếu hoàn chỉnh để xây dựng hệ thống phát hiện sâu bệnh tự động theo chuẩn hội nghị/tạp chí quốc tế.",
      "NMSボトルネックを排除した実時間多種農業病害虫検出モデルPest-RTDetrを提案。DAS-ResNet50バックボーンとマルチスケール特徴量統合機構（CF）を統合。",
      [
        "IP102ベンチマーク（102害虫種）において、推論速度80 FPSでmAP50 68.40%を達成。YOLOv8（58.80%・71 FPS）およびFaster R-CNN（54.34%・26 FPS）を全面的に凌駕。",
        "変形可能アテンションDAS-ResNet50バックボーンによりmAP50が2.50%向上。葉の遮蔽下でも昆虫の頭部や脚部など微細な生体パーツへ焦点を動的追従。",
        "二重分岐CFモジュールおよびBottleneckブロックの採用により、RepBlock対比でmAP50が3.21%向上、微小密集害虫に対する再現率（Recall）が3.05%改善。",
        "MPDIoU回帰損失とFocal Lossの統合により、訓練収束時間を26%短縮し、虫体の重なり密集によるバウンディングボックスの歪みを完全に解消。"
      ],
      {
        "long-tail distribution":
          "ロングテール分布（Long-Tail Distribution）: IP102データセット（102害虫種）における深刻なサンプル不均衡現象。代表種に大量の画像が存在する一方、希少種・有害種の画像が極めて少なく、従来モデルでは少数クラスの誤判定が頻発する。",
        "occlusion":
          "遮蔽現象（Occlusion）: 野外環境において、植物の葉や枝、日陰、または他の虫体によって害虫の身体の一部が覆い隠され、画像情報が著しく欠落する現象。",
        "deformable attention":
          "変形可能アテンション（Deformable Attention - DAS）: 畳み込みネットワークにおいて、固定矩形グリッド走査の代わりに昆虫の解剖学的輪郭（触角、脚、翅脈）に合わせて受容野（receptive field）を動的に変形させる技術。類似種間の高精度識別に寄与する。",
        "salient features":
          "顕著な特徴（Salient Features）: 画像全体を一様に処理するのではなく、昆虫の解剖学的キーポイント（頭部、触角、脚の関節）にモデルの焦点を集中させ、部分的な遮蔽下でも正確に分類する技術。",
        "cross-scale feature fusion":
          "マルチスケール特徴量統合（Cross-Scale Feature Fusion - CF）: DASとBottlenecksを組み合わせ、深層の意味論的特徴を高解像度の浅層特徴へ伝達。複雑な葉の背景から微小害虫（micro-pests）を高精度に検出する。",
        "small, densely distributed targets":
          "微小密集標的（Small, Densely Distributed Targets）: 数ミリ単位の害虫が一枚の葉に高密度で群生する、農業コンピュータビジョンにおける最難関課題の一つ。",
        "Focal Loss":
          "フォーカル損失（Focal Loss）: 訓練サンプルの重みを適応的に調整し、分類しやすい多数サンプルの寄与度を下げ、分類困難な少数クラス（テールデータ）の学習に勾配を集中させる損失関数。",
        "MPDIoU":
          "極値点最小距離IoU（MPDIoU）: 予測枠と正解枠の左上・右下角の幾何学的距離に基づく新しいバウンディングボックス回帰損失。害虫同士が密集・重なり合う状況でも高速な収束（26%短縮）と追従性を実現する。",
        "RT-DETR":
          "実時間物体検出Transformer（Real-Time Detection Transformer）: Transformerの大域的特徴把握力と80 FPS超の高速推論を両立し、YOLO系で不可欠だったNMS後処理のボトルネックを完全排除した先駆的アーキテクチャ。",
        "Detection Transformer":
          "DETRアーキテクチャ: Transformerに基づく初のエンドツーエンド物体検出フレームワークであり、集合予測問題として定式化。",
        "NMS":
          "非最大値抑制（Non-Maximum Suppression - NMS）: 重複する検出枠を削減する従来の後処理手法。推論遅延のボトルネックとなるため、Pest-RTDetrでは完全に排除。",
        "IP102 benchmark":
          "IP102オープンベンチマーク: 農作物害虫102種、75,222枚の画像からなる世界最大規模の公開データセット。",
        "crop superclass":
          "作物スーパークラス: 被害を受ける主要8農作物（水稲、トウモロコシ、小麦、ビート、アルファルファ、ブドウ、柑橘、マンゴー）に基づく上位分類。",
        "P15 dataset":
          "危険農業害虫データセットP15: 高密度密集害虫15種・1,300枚の画像から構成される実証用データセット。",
        "life cycle stages":
          "昆虫の生活史発育段階: 卵、幼虫、蛹、成虫間における激しい形態変化であり、視覚分類モデルの最大難関。",
        "resampling":
          "リサンプリング技術: テールデータの計画的ランダム抽出により、ヘッドとテールのサンプル比率を均衡化。",
        "Mosaic data augmentation":
          "Mosaicデータ拡張: 4枚の画像をランダムに結合・幾何変換し、微小標的のスケール多様性を増強。",
        "Mixup data augmentation":
          "Mixupデータ拡張: 2枚の画像とラベルを線形補間し、少数クラスの学習安定性を向上。",
        "DAS-ResNet50":
          "DAS-ResNet50バックボーン: ResNet-50に変形可能アテンションDASを組み込み、受容野を生体パーツへ動的適合。",
        "AIFI processing":
          "AIFI層内相互作用モジュール: 最深層C5のみにアテンションを適用し、計算量を抑制しつつ高次の意味論的情報を抽出。",
        "CCFM":
          "CCFMスケール間特徴統合機構: Neck部においてP5, C3, C4層の特徴量を効率的に融合するモジュール。",
        "double-branch structure":
          "二重分岐構造: CFモジュールにおける上側主勾配ブランチと下側補助ブランチの並列設計。",
        "Bottleneck block":
          "Bottleneck構造: 1x1および3x3畳み込みにより過学習を防止し、計算負荷を大幅削減。",
        "RepBlock":
          "RepBlock構造: 原モデルの多分岐構造であり、過度なパラメータ化により害虫認識での過学習を誘発。",
        "depth-separable convolutions":
          "深さ分離可能畳み込み: 空間畳み込みとチャネル畳み込みを分離し、FLOPs計算量を劇的に削減。",
        "gated channel attention":
          "ゲート付きチャネルアテンション: ブロック間の特徴量伝播を適応制御し、外見酷似種間の識別性を向上。",
        "vanishing gradient":
          "勾配消失問題: 深層ネットワークで勾配が消失する現象。残差接続（Residual connection）により根本解決。",
        "GIoU":
          "Generalized IoU損失: 重なりがない場合の収束が遅く、密集虫体で歪みを生じる旧来損失関数。",
        "mAP50":
          "IoU 0.5における平均適合率（mAP50）: 物体検出の主要指標。Pest-RTDetrは68.40%を達成（+9.29%向上）。",
        "mAP50-95":
          "厳格なIoU 0.5-0.95平均適合率: バウンディングボックスの厳密な追従性を示し、43.40%を記録。",
        "FPS":
          "推論速度FPS: 1秒あたりの処理フレーム数。Pest-RTDetrは80 FPSを記録し、野外実時間要件を完全クリア。",
        "F1 score":
          "F1スコア: 適合率と再現率の調和平均。検出精度と見逃し防止のバランスを実証。",
        "ablation experiment":
          "アブレーション実験: 各提案モジュール（DAS, CF, Loss）の貢献度を個別・累積で定量的実証。",
        "head and foot regions":
          "頭部・脚部領域: ヒートマップ解析においてモデルが焦点を集中させる昆虫の重要解剖パーツ。",
        "Faster R-CNN":
          "2段階検出器Faster R-CNN: 54.34% mAP50・26 FPSを記録するもNMSによる密集害虫の誤消去が多発。",
        "YOLOv8":
          "最新1段階検出器YOLOv8: 58.80% mAP50・71 FPSを達成するも大域的特徴相関が不足。",
        "CenterNet":
          "アンカーフリー検出器CenterNet: 47.04% mAP50にとどまり、密集ターゲットで重複誤検出が発生。",
        "DINO-DeformableDETR":
          "先端Transformer検出器DINO: 59.03% mAP50を達成するも24 FPSと推論速度が大幅に低下。",
        "automated pesticide spraying":
          "自動農薬散布システム: Pest-RTDetrの検出座標に基づきピンポイントで散布を行うスマート農業応用。",
        "domain shift":
          "ドメインシフト現象: 異なる圃場環境や天候・日照変化によりデータ分布が乖離する技術的課題。",
        "transfer learning":
          "転移学習: 大規模データセットの知識を特定作物の希少害虫モデルへ効率的に適用する手法。",
        "invasive species":
          "外来侵入害虫: 学習データに含まれない未知の害虫種。将来のオープンセット研究課題。",
        "multi-modal pest detection":
          "マルチモーダル害虫検出: 画像データに加え、土壌・気象センサー情報を統合した次世代防除意思決定基盤。"
      },
      {
        "long-tail distribution": "ロングテール分布（種ごとのサンプル不均衡現象）",
        "occlusion": "葉や枝による光学的な遮蔽現象",
        "deformable attention": "変形可能アテンション機構（Deformable Attention）",
        "salient features": "識別の決め手となる顕著な特徴",
        "cross-scale feature fusion": "マルチスケール特徴量統合（浅層・深層の双方向連携）",
        "small, densely distributed targets": "微小かつ高密度に分布する害虫標的",
        "Focal Loss": "フォーカル損失（希少クラスの学習を重点化）",
        "MPDIoU": "極値点最小距離IoU（MPDIoU回帰損失）",
        "RT-DETR": "実時間物体検出Transformer（RT-DETR）",
        "Detection Transformer": "エンドツーエンド物体検出Transformer（DETR）",
        "NMS": "非最大値抑制後処理（NMS）",
        "IP102 benchmark": "IP102害虫ベンチマークデータセット",
        "crop superclass": "作物スーパークラス分類（主要8農作物）",
        "P15 dataset": "危険害虫P15データセット（15種・高密度画像群）",
        "life cycle stages": "昆虫の発育段階（卵・幼虫・蛹・成虫）",
        "resampling": "テールデータのリサンプリング手法",
        "Mosaic data augmentation": "Mosaic幾何学的データ拡張（4画像結合）",
        "Mixup data augmentation": "Mixup線形データ拡張（画像・ラベル混合）",
        "DAS-ResNet50": "DAS-ResNet50変形可能バックボーン",
        "AIFI processing": "AIFI層内相互作用モジュール",
        "CCFM": "CCFMスケール間特徴統合Neck",
        "double-branch structure": "CFモジュールの二重分岐構造",
        "Bottleneck block": "過学習を防止するBottleneckブロック",
        "RepBlock": "重パラメータなRepBlock構造",
        "depth-separable convolutions": "深さ分離可能畳み込み（FLOPs削減）",
        "gated channel attention": "ゲート付きチャネルアテンション機構",
        "vanishing gradient": "深層ネットワークの勾配消失問題",
        "GIoU": "旧来のGeneralized IoU回帰指標",
        "mAP50": "平均適合率mAP50（IoU 0.5）",
        "mAP50-95": "厳格な平均適合率mAP50-95",
        "FPS": "推論速度FPS（フレーム毎秒）",
        "F1 score": "F1スコア（精度と再現率の調和平均）",
        "ablation experiment": "アブレーション構成要素検証実験",
        "head and foot regions": "昆虫の頭部および脚部解剖領域",
        "Faster R-CNN": "2段階物体検出モデルFaster R-CNN",
        "YOLOv8": "実時間1段階検出モデルYOLOv8",
        "CenterNet": "中心点予測モデルCenterNet",
        "DINO-DeformableDETR": "高精度TransformerモデルDINO",
        "automated pesticide spraying": "自動化されたピンポイント農薬散布",
        "domain shift": "野外環境におけるドメインシフト現象",
        "transfer learning": "未知害虫への転移学習アプローチ",
        "invasive species": "未アノテーション外来侵入害虫種",
        "multi-modal pest detection": "マルチモーダル農業意思決定システム"
      },
      ""
    );

    // ====================================================
    // BÀI BÁO 2: TẬP BENCHMARK CHUẨN MỰC IP102 (CVPR 2019)
    // ====================================================
        const paperIP102 = new AcademicPaper(
      "paper-ip102-cvpr-2019",
      "IP102: A Large-Scale Benchmark Dataset for Insect Pest Recognition",
      "X. Wu, C. Zhan, Y.-K. Lai, M.-M. Cheng, J. Yang (Nankai University & Cardiff University)",
      2019,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Xây dựng bộ dữ liệu benchmark mở lớn nhất thế giới về sâu bệnh nông nghiệp với hệ thống phân cấp 2 tầng gồm 75,222 ảnh thuộc 102 loài sâu bệnh phá hoại mùa màng.",
[
        "1. Introduction",
        "Insect pests are one of the main factors affecting agricultural product yield. Accurate recognition of insect pests facilitates timely preventive measures to avoid economic losses. However, the existing datasets for the visual classification of insect pests have significant limitations: they either contain a small number of classes or very few images per class, and the images are predominantly captured in laboratory environments rather than natural field conditions. In agriculture, automated pest monitoring systems require robust models trained on diverse, large-scale, and unconstrained real-world field imagery.",
        "To bridge this gap, we establish IP102, a large-scale benchmark dataset for insect pest recognition. IP102 contains 75,222 images categorized into 102 distinct pest classes. To the best of our knowledge, IP102 is the largest open-access insect pest dataset in terms of both image count and category diversity. It provides a challenging benchmark reflecting the true complexity of agricultural ecosystems.",
        "The IP102 dataset exhibits four major characteristics: (1) natural long-tail distribution across categories; (2) hierarchical taxonomy connecting 8 crop superclasses to 102 insect subclasses; (3) unconstrained natural field backgrounds with diverse illumination and clutter; and (4) pronounced intra-class morphological variations across developmental instars (egg, larva, pupa, adult) alongside high inter-class visual similarity between related species.",
        "2. Related Work",
        "2.1. Insect Pest Recognition",
        "Early research in automated insect pest recognition primarily relied on handcrafted feature engineering, including Color Histograms (CH), Scale-Invariant Feature Transform (SIFT), and Histogram of Oriented Gradients (HOG) combined with traditional classifiers such as Support Vector Machines (SVM) and K-Nearest Neighbors (KNN). While these approaches demonstrated feasibility on small, controlled image sets, their performance drops substantially in open-field environments where illumination shifts and occlusions are prevalent.",
        "With the advent of deep convolutional neural networks (CNNs), researchers have explored deep models for pest detection. However, existing studies have been restricted by the lack of comprehensive benchmark datasets. Most public datasets contain fewer than 5,000 images and focus on narrow crop families, preventing the community from assessing generalization across widespread agricultural pests.",
        "2.2. Related Datasets",
        "Existing benchmark datasets in computer vision, such as ImageNet, CUB-200-2011, and Stanford Dogs, have driven substantial progress in general and fine-grained visual recognition. However, insect pest recognition poses unique biological challenges: insect bodies change drastically across metamorphosis stages, while different pest species often exhibit near-identical wing patterns or bodily silhouettes. Table 2 provides a detailed comparison, confirming that IP102 is an order of magnitude larger than previous agricultural datasets.",
        "3. The IP102 Dataset",
        "3.1. Data Collection and Annotation",
        "To collect images representing natural agricultural conditions, we crawled candidate images from major search engines (Google, Bing, Baidu) and specialized entomological and agricultural databases using multi-lingual insect scientific and common names. Over 120,000 raw images were initially harvested.",
        "A two-stage data curation and verification pipeline was established: first, trained annotators removed corrupted, duplicate, and irrelevant non-insect imagery; second, certified agricultural entomologists and plant protection specialists rigorously audited category assignments. Ambiguous samples and low-quality images were discarded, leaving 75,222 verified images.",
        "3.2. Dataset Split",
        "IP102 is partitioned into training, validation, and testing sets following an approximate 6:1:3 ratio, resulting in 45,095 training images, 7,508 validation images, and 22,619 testing images (Table 1). The partition ensures consistent class distribution and identical imbalance ratios across splits.",
        "3.3. Dataset Structure and Taxonomy",
        "IP102 introduces a two-level hierarchical taxonomy. The first level categorizes pests under 8 major economic and field crop superclasses: Rice, Corn, Wheat, Beet, Alfalfa, Vitis (Grape), Citrus, and Mango. The second level comprises 102 specific insect pest species, enabling models to perform both coarse crop-level diagnosis and fine-grained species identification (Figure 4).",
        "3.4. Comparison with Other Datasets",
        "Compared with existing insect datasets such as Deng et al., Xie et al., and Wang et al., IP102 exhibits unprecedented scale. Crucially, in addition to image-level classification labels, a subset of approximately 19,000 images in IP102 are meticulously annotated with bounding boxes, establishing a benchmark for agricultural object detection (Table 2).",
        "3.5. Diversity and Difficulty",
        "The dataset reflects the genuine ecological complexity of farmland: (1) severe long-tail distribution where head classes possess over 2,000 images while tail classes have fewer than 100 images; (2) metamorphic instars where larvae and adults of the same species appear completely distinct; (3) complex field backgrounds featuring soil, foliage, shadows, and water reflections; and (4) subtle inter-species distinctions requiring expert-level fine-grained discrimination.",
        "4. Experimental Evaluation",
        "4.1. Experiment Settings and Evaluation Metrics",
        "We evaluate classification baselines using standard metrics: Top-1 Accuracy, Top-5 Accuracy, macro-average F1 score, Geometric Mean (GM), and Multiclass Area Under Curve (MAUC). These metrics jointly measure recognition accuracy and class balance across imbalanced distributions.",
        "4.2. Classification Results on Handcrafted Features",
        "Table 3 presents classification performance using handcrafted features (Color Histogram, SIFT, HOG, and Bag-of-Words) with SVM and KNN classifiers. Handcrafted features achieve limited performance (highest Top-1 accuracy is 32.8% using SIFT + BoW with SVM), underscoring that shallow visual representations cannot separate visually similar pest species under field conditions.",
        "4.3. Classification Results on Deep Features",
        "We benchmark representative deep convolutional networks: AlexNet, VGGNet-16, GoogLeNet, ResNet-50, ResNet-101, ResNet-152, and DenseNet-121 (Table 4). Models initialized with ImageNet pre-training substantially outperform models trained from scratch. ResNet-152 achieves the highest Top-1 accuracy of 55.4% and Top-5 accuracy of 82.1%, while DenseNet-121 achieves 54.8% Top-1 accuracy with lower parameter footprint.",
        "4.4. Fine-Grained Classification Baselines",
        "Given the fine-grained nature of insect pests, we evaluate specialized fine-grained architectures: Bilinear CNN (B-CNN), DCL, and RACNN (Table 5). B-CNN achieves 56.1% Top-1 accuracy, demonstrating that higher-order feature interactions better capture distinguishing anatomical markers such as antenna segments and wing venation.",
        "4.5. Object Detection Baselines",
        "On the 19,000 bounding-box annotated subset, we benchmark four prominent object detectors: Faster R-CNN, R-FCN, SSD, and YOLOv3 (Table 6). Faster R-CNN achieves an average precision (AP50) of 54.7%, outperforming SSD (48.1%) and YOLOv3 (46.9%). Small pest targets and high foliage density remain the primary sources of missed detections and false alarms.",
        "4.6. Further Analysis",
        "Figure 5 illustrates subclass accuracy across the 102 categories, revealing a strong positive correlation between training sample volume and recognition performance. Figure 6 visualizes ResNet confusion matrices on Mango and Rice pests, highlighting that species sharing identical host foliage cause frequent classification confusion. Figure 7 showcases qualitative detection results, demonstrating bounding box predictions under varied occlusions.",
        "5. Conclusion",
        "In this work, we presented IP102, a large-scale hierarchical benchmark dataset comprising 75,222 images across 102 agricultural insect pests. We established comprehensive baseline evaluations across handcrafted features, deep architectures, fine-grained models, and object detectors. IP102 provides an open research foundation to advance intelligent plant protection and sustainable agricultural pest management."
],
{
        "IP102 benchmark": "Tập dữ liệu chuẩn mực IP102: Bộ dữ liệu nhận diện sâu bệnh nông nghiệp mở lớn nhất thế giới gồm 75,222 ảnh trên 102 loài sâu bệnh phá hoại mùa màng, chia thành 8 nhóm cây trồng chủ lực.",
        "crop superclasses": "Siêu lớp cây trồng (Crop Superclasses): Phân loại sâu bệnh cấp cao theo 8 nhóm cây nông nghiệp chủ lực (Lúa nước, Ngô, Lúa mì, Củ cải đường, Cỏ linh lăng, Nho, Cam quýt, Xoài).",
        "hierarchical taxonomy": "Hệ thống phân cấp 2 tầng (Hierarchical Taxonomy): Cấu trúc phả hệ gồm tầng siêu lớp cây trồng (8 crops) và tầng loài sâu bệnh hại (102 subclasses), giúp AI vừa chẩn đoán cây trồng vừa định danh chính xác sâu bệnh.",
        "life-cycle stages": "Các giai đoạn vòng đời côn trùng (Life-Cycle Stages): Sự biến đổi hình thái triệt để qua 4 giai đoạn sinh trưởng (trứng, ấu trùng, nhộng, trưởng thành), tạo ra thách thức thị giác biến thiên nội lớp cực lớn.",
        "long-tail distribution": "Phân bố dữ liệu đuôi dài (Long-Tail Distribution): Hiện tượng mất cân bằng số lượng mẫu trầm trọng trong tự nhiên, trong đó nhóm đầu (Head classes) có trên 2,000 ảnh nhưng nhóm đuôi (Tail classes) chỉ có dưới 100 ảnh.",
        "class imbalance ratio": "Tỉ số mất cân bằng lớp (Class Imbalance Ratio - IR): Chỉ số đo lường độ chênh lệch số lượng mẫu giữa lớp nhiều nhất và lớp ít nhất, đạt tới 45.7 trong tập IP102.",
        "unconstrained field backgrounds": "Bối cảnh đồng ruộng tự nhiên không ràng buộc: Môi trường chụp thực tế ngoài trời có ánh nắng tự nhiên, bóng đổ, lá úa, bùn đất và độ ẩm phức tạp, khác xa môi trường phòng thí nghiệm có phông nền trắng.",
        "hand-crafted visual features": "Đặc trưng thị giác thủ công (Handcrafted Features): Các phương pháp biểu diễn ảnh cổ điển như Color Histogram, SIFT, HOG kết hợp với bộ phân loại SVM/KNN, đạt độ chính xác hạn chế dưới 33% trên IP102.",
        "Color Histogram (CH)": "Biểu đồ tần suất màu sắc (Color Histogram): Vector thống kê phân bố màu sắc điểm ảnh, dễ bị đánh lừa khi màu của thân sâu trùng với màu xanh của lá cây hoặc màu nâu của cành cây.",
        "Scale-Invariant Feature Transform (SIFT)": "Biến đổi đặc trưng bất biến theo tỉ lệ (SIFT): Thuật toán trích xuất các điểm đặc trưng biên cạnh cục bộ bất biến với tỉ lệ và góc xoay, tuy nhiên gặp khó khăn khi thân côn trùng biến dạng mềm dẻo.",
        "Bag-of-Words (BoW)": "Mô hình túi từ thị giác (Bag-of-Words): Kỹ thuật gom cụm các đặc trưng cục bộ thành từ điển thị giác để phân loại ảnh toàn thể.",
        "deep convolutional neural networks": "Mạng nơ-ron tích chập sâu (Deep CNNs): Các kiến trúc học sâu như ResNet, DenseNet, VGG tự động học biểu diễn đặc trưng phân cấp từ thô đến mịn, đạt độ chính xác vượt trội so với phương pháp thủ công.",
        "ResNet-50 baseline": "Đường cơ sở ResNet-50: Kiến trúc mạng dư tích hợp kết nối tắt (skip connection) đạt 54.8% Top-1 Accuracy trên 102 lớp sâu bệnh của IP102.",
        "ResNet-152": "Kiến trúc ResNet-152: Mô hình tích chập 152 tầng sâu nhất trong nghiên cứu cơ sở, đạt độ chính xác Top-1 cao nhất là 55.4% và Top-5 đạt 82.1%.",
        "DenseNet-121": "Kiến trúc mạng liên kết dày đặc DenseNet-121: Kết nối trực tiếp mọi tầng với các tầng kế tiếp, đạt 54.8% Top-1 accuracy với số lượng tham số ít hơn đáng kể so với ResNet-152.",
        "Fine-Grained Visual Classification (FGVC)": "Phân loại thị giác phân giải mịn: Bài toán nhận diện các loài sinh học có ngoại hình tương đồng cao và cấu trúc giải phẫu tinh vi (như râu, đốt chân, vân cánh).",
        "Bilinear CNN (B-CNN)": "Mạng tích chập song tuyến tính Bilinear CNN: Mô hình tính tích ngoài (outer product) giữa hai luồng trích xuất đặc trưng để chụp lại các tương tác bậc cao, đạt Top-1 accuracy 56.1% trên IP102.",
        "bounding box annotations": "Gán nhãn khung bao đối tượng: Bộ chú thích tọa độ hộp bao trên 19,000 ảnh của IP102, biến tập dữ liệu thành bài kiểm tra chuẩn cho bài toán phát hiện đối tượng nông nghiệp.",
        "Faster R-CNN baseline": "Đường cơ sở Faster R-CNN: Bộ phát hiện hai giai đoạn đạt 54.7% AP50 trên tập gán khung bao IP102, vượt trội so với SSD và YOLOv3.",
        "SSD detector": "Bộ phát hiện một giai đoạn SSD: Mô hình phát hiện đối tượng dựa trên lưới neo đa tỉ lệ, đạt 48.1% AP50 trên IP102.",
        "YOLOv3 baseline": "Đường cơ sở YOLOv3: Mô hình phát hiện thời gian thực đạt 46.9% AP50, gặp khó khăn khi phát hiện các sâu bệnh kích thước siêu nhỏ trên nền lá rậm rạp.",
        "macro-average F1 score": "Chỉ số F1 trung bình vĩ mô (Macro F1): Giá trị trung bình F1 tính riêng biệt trên từng loài rồi lấy trung bình số học, phản ánh chính xác hiệu năng trên các loài ít mẫu ở phần đuôi dữ liệu.",
        "Geometric Mean (G-mean)": "Trung bình nhân độ chính xác (G-Mean): Căn bậc n tích số độ chính xác trên tất cả các lớp, là tiêu chuẩn khắt khe để kiểm tra tính công bằng của mô hình trên dữ liệu mất cân bằng.",
        "Multiclass Area Under Curve (MAUC)": "Diện tích dưới đường cong đa lớp (MAUC): Chỉ số tích phân diện tích ROC đa lớp, đo lường năng lực phân loại của mô hình bất kể việc lựa chọn ngưỡng quyết định.",
        "expert verification protocol": "Quy trình thẩm định chuyên gia nông học: Giao thức kiểm tra dữ liệu qua 2 vòng nghiêm ngặt bởi các chuyên gia bảo vệ thực vật nhằm đảm bảo độ chính xác tuyệt đối của nhãn loài.",
        "intra-class variation": "Biến thiên nội lớp (Intra-Class Variation): Sự khác biệt ngoại hình cực lớn giữa các cá thể trong cùng một loài sâu hại do thay đổi hình thái qua các lần lột xác và giới tính.",
        "inter-class similarity": "Độ tương đồng liên lớp (Inter-Class Similarity): Trạng thái các loài sâu hại thuộc các chi họ khác nhau nhưng tiến hóa có màu sắc và hình dạng ngụy trang gần như giống hệt nhau.",
        "larvae and pupae": "Ấu trùng và nhộng: Các giai đoạn phát triển trung gian của côn trùng gây hại nghiêm trọng nhất cho mùa màng nhưng khó phân loại nhất do cơ thể mềm và thiếu cánh.",
        "field illumination variation": "Biến thiên ánh sáng đồng ruộng: Sự thay đổi nhiệt độ màu và cường độ sáng từ nắng gắt, mây mù đến hoàng hôn, tạo ra phản xạ chói lóa trên cánh côn trùng.",
        "morphological instars": "Các tuổi sâu hình thái (Instars): Các giai đoạn ấu trùng phân biệt qua từng lần lột xác (tuổi 1 đến tuổi 5), làm thay đổi kích thước và đốm màu trên thân sâu.",
        "subclass recognition accuracy": "Độ chính xác nhận diện phân lớp loài: Tỉ lệ dự đoán đúng chính xác tên khoa học của loài côn trùng trong số 102 lớp của IP102."
},
{
        "IP102 benchmark": "Tập dữ liệu chuẩn mực IP102",
        "crop superclasses": "Siêu lớp cây trồng (Crop Superclasses)",
        "hierarchical taxonomy": "Hệ thống phân cấp 2 tầng (Hierarchical Taxonomy)",
        "life-cycle stages": "Các giai đoạn vòng đời côn trùng (Life-Cycle Stages)",
        "long-tail distribution": "Phân bố dữ liệu đuôi dài (Long-Tail Distribution)",
        "class imbalance ratio": "Tỉ số mất cân bằng lớp (Class Imbalance Ratio - IR)",
        "unconstrained field backgrounds": "Bối cảnh đồng ruộng tự nhiên không ràng buộc",
        "hand-crafted visual features": "Đặc trưng thị giác thủ công (Handcrafted Features)",
        "Color Histogram (CH)": "Biểu đồ tần suất màu sắc (Color Histogram)",
        "Scale-Invariant Feature Transform (SIFT)": "Biến đổi đặc trưng bất biến theo tỉ lệ (SIFT)",
        "Bag-of-Words (BoW)": "Mô hình túi từ thị giác (Bag-of-Words)",
        "deep convolutional neural networks": "Mạng nơ-ron tích chập sâu (Deep CNNs)",
        "ResNet-50 baseline": "Đường cơ sở ResNet-50",
        "ResNet-152": "Kiến trúc ResNet-152",
        "DenseNet-121": "Kiến trúc mạng liên kết dày đặc DenseNet-121",
        "Fine-Grained Visual Classification (FGVC)": "Phân loại thị giác phân giải mịn",
        "Bilinear CNN (B-CNN)": "Mạng tích chập song tuyến tính Bilinear CNN",
        "bounding box annotations": "Gán nhãn khung bao đối tượng",
        "Faster R-CNN baseline": "Đường cơ sở Faster R-CNN",
        "SSD detector": "Bộ phát hiện một giai đoạn SSD",
        "YOLOv3 baseline": "Đường cơ sở YOLOv3",
        "macro-average F1 score": "Chỉ số F1 trung bình vĩ mô (Macro F1)",
        "Geometric Mean (G-mean)": "Trung bình nhân độ chính xác (G-Mean)",
        "Multiclass Area Under Curve (MAUC)": "Diện tích dưới đường cong đa lớp (MAUC)",
        "expert verification protocol": "Quy trình thẩm định chuyên gia nông học",
        "intra-class variation": "Biến thiên nội lớp (Intra-Class Variation)",
        "inter-class similarity": "Độ tương đồng liên lớp (Inter-Class Similarity)",
        "larvae and pupae": "Ấu trùng và nhộng",
        "field illumination variation": "Biến thiên ánh sáng đồng ruộng",
        "morphological instars": "Các tuổi sâu hình thái (Instars)",
        "subclass recognition accuracy": "Độ chính xác nhận diện phân lớp loài"
},
      "Core A* · Trích dẫn: 1,180+",
      1180,
      [
        "Bộ dữ liệu chuẩn mở lớn nhất gồm 75,222 ảnh gán nhãn thủ công qua 2 vòng chuyên gia bảo vệ thực vật.",
        "Bao quát 102 phân loại sâu hại trên 8 nhóm cây trồng chủ lực (lúa, ngô, lúa mì, củ cải, cỏ linh lăng, nho, cam quýt, xoài).",
        "Xác lập kết quả đối chứng đường cơ sở (Baseline) cho hơn 15 kiến trúc mạng từ Handcrafted đến Deep Learning và Object Detection."
      ],
      "Bộ dữ liệu bắt buộc phải dùng để làm thực nghiệm và đối chiếu kết quả nghiên cứu khi bảo vệ luận văn hoặc nộp bài báo quốc tế.",
      "農作物害虫102種、75,222枚の画像からなる2階層構造の世界最大規模オープンベンチマークデータセットを構築。",
      [
        "植物保護の第一線専門家による2段階の手動アノテーションを施した75,222枚の高品質画像で構成。",
        "主要8農作物（水稲、トウモロコシ、小麦等）における102分類の害虫を体系的に網羅。",
        "人手設計特徴から最先端深層学習・物体検出モデルに至る包括的ベースラインを確立。"
      ],
{
        "IP102 benchmark": "IP102害虫ベンチマークデータセット: 農作物害虫102種・75,222枚の画像からなる世界最大規模のオープンアクセス画像認識ベンチマーク。",
        "crop superclasses": "作物スーパークラス（8大主要作物）: 水稲、トウモロコシ、小麦、テンサイ、アルファルファ、ブドウ、柑橘、マンゴーの上位分類群。",
        "hierarchical taxonomy": "2階層分類体系（Hierarchical Taxonomy）: 8大作物スーパークラスと102害虫サブクラスを連携させた階層構造。",
        "life-cycle stages": "生活史発育段階（Life-Cycle Stages）: 卵、幼虫、蛹、成虫の変態プロセスに伴う極めて激しい外見・形態変化。",
        "long-tail distribution": "ロングテール分布（Long-Tail Distribution）: 主要害虫に2,000枚以上の画像が集まる一方、希少種は100枚未満という深刻なデータ不均衡。",
        "class imbalance ratio": "クラス不均衡比（Imbalance Ratio - IR）: 最多クラスと最少クラスのサンプル比率であり、IP102では45.7に達する。",
        "unconstrained field backgrounds": "制約のない野外圃場背景: 日照変動、土壌、雑草、泥土、陰影が混在する実際の屋外農業環境。",
        "hand-crafted visual features": "人手設計の視覚特徴量（CH, SIFT, HOG等）: 浅層の記述子とSVM/KNNによる分類手法であり、IP102では最高32.8%にとどまる。",
        "Color Histogram (CH)": "カラーヒストグラム: 色彩分布に基づく特徴量。昆虫の保護色と作物の葉色が類似する場合に判別が破綻する。",
        "Scale-Invariant Feature Transform (SIFT)": "スケール不変特徴変換（SIFT）: 拡大縮小や回転に頑健な局所特徴量抽出手法。",
        "Bag-of-Words (BoW)": "Bag-of-Wordsモデル: 局所記述子をクラスタリングして視覚単語辞書を構築する表現手法。",
        "deep convolutional neural networks": "深層畳み込みニューラルネットワーク（CNN）: ResNetやDenseNetなど、階層的な視覚表現を自己学習する深層モデル群。",
        "ResNet-50 baseline": "ResNet-50ベースライン: スキップ接続により勾配消失を防ぎ、Top-1精度54.8%を記録する基準モデル。",
        "ResNet-152": "ResNet-152深層モデル: 152層の超深層構造により、検証モデル中最高のTop-1精度55.4%・Top-5精度82.1%を達成。",
        "DenseNet-121": "DenseNet-121モデル: 各層の特徴量を以降の全層へ密結合し、ResNet比で少ないパラメータ数でTop-1精度54.8%を達成。",
        "Fine-Grained Visual Classification (FGVC)": "微細視覚分類（FGVC）: 近縁種間の微細な解剖パーツ（触角節、翅脈）を識別する高度な視覚認識タスク。",
        "Bilinear CNN (B-CNN)": "バイリニアCNN（B-CNN）: 2つの特徴抽出経路の外積を計算して高次相関を捉え、Top-1精度56.1%を達成。",
        "bounding box annotations": "バウンディングボックス注釈: IP102内の約19,000画像に付与された検出枠座標データ。",
        "Faster R-CNN baseline": "Faster R-CNNベースライン: 2段階検出器としてIP102検出ベンチマークで54.7% AP50の最高性能を達成。",
        "SSD detector": "SSD単一走査検出器: マルチスケール特徴マップを利用し、IP102で48.1% AP50を記録。",
        "YOLOv3 baseline": "YOLOv3実時間検出器: 単一ネットワーク推論を行うが、葉陰の微小害虫に対して46.9% AP50にとどまる。",
        "macro-average F1 score": "マクロ平均F1スコア: 各クラスで独立に算出したF1の算術平均であり、少数クラスの認識精度を正確に反映。",
        "Geometric Mean (G-mean)": "幾何平均（G-Mean）: 全クラスの再現率の相乗平均。不均衡データにおける公平性の厳格な指標。",
        "Multiclass Area Under Curve (MAUC)": "多クラスROC曲線下面積（MAUC）: 判定閾値に依存しないモデルの全体的な判別能力を測定する指標。",
        "expert verification protocol": "植物保護専門家による2段階検証プロトコル: 生物学的分類の厳密性を担保する画像選別手順。",
        "intra-class variation": "クラス内変動（Intra-Class Variation）: 同一種内における発育齢期や雌雄差による外見の著しい相違。",
        "inter-class similarity": "クラス間類似性（Inter-Class Similarity）: 異なる科に属しながら保護色等により外見が酷似する現象。",
        "larvae and pupae": "幼虫および蛹: 葉の食害被害をもたらす中核発育段階であり、形態が柔らかく分類が最も困難。",
        "field illumination variation": "野外日照変動: 直射日光や曇天、夕暮れによる照度と色温度の激しい変化。",
        "morphological instars": "形態的脱皮齢期（Instars）: 幼虫の脱皮ごとに変化する体長や斑点模様のステージ。",
        "subclass recognition accuracy": "サブクラス同定精度: 102種の個別害虫種に対する正答判別率。"
},
{
        "IP102 benchmark": "IP102害虫ベンチマークデータセット",
        "crop superclasses": "作物スーパークラス",
        "hierarchical taxonomy": "2階層分類体系",
        "life-cycle stages": "生活史発育段階",
        "long-tail distribution": "ロングテール分布",
        "class imbalance ratio": "クラス不均衡比",
        "unconstrained field backgrounds": "制約のない野外圃場背景",
        "hand-crafted visual features": "人手設計の視覚特徴量",
        "Color Histogram (CH)": "カラーヒストグラム",
        "Scale-Invariant Feature Transform (SIFT)": "スケール不変特徴変換",
        "Bag-of-Words (BoW)": "Bag-of-Wordsモデル",
        "deep convolutional neural networks": "深層畳み込みニューラルネットワーク",
        "ResNet-50 baseline": "ResNet-50ベースライン",
        "ResNet-152": "ResNet-152深層モデル",
        "DenseNet-121": "DenseNet-121モデル",
        "Fine-Grained Visual Classification (FGVC)": "微細視覚分類",
        "Bilinear CNN (B-CNN)": "バイリニアCNN",
        "bounding box annotations": "バウンディングボックス注釈",
        "Faster R-CNN baseline": "Faster R-CNNベースライン",
        "SSD detector": "SSD単一走査検出器",
        "YOLOv3 baseline": "YOLOv3実時間検出器",
        "macro-average F1 score": "マクロ平均F1スコア",
        "Geometric Mean (G-mean)": "幾何平均",
        "Multiclass Area Under Curve (MAUC)": "多クラスROC曲線下面積",
        "expert verification protocol": "植物保護専門家による2段階検証プロトコル",
        "intra-class variation": "クラス内変動",
        "inter-class similarity": "クラス間類似性",
        "larvae and pupae": "幼虫および蛹",
        "field illumination variation": "野外日照変動",
        "morphological instars": "形態的脱皮齢期",
        "subclass recognition accuracy": "サブクラス同定精度"
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
        "1. Introduction",
        "Real-time object detection has long been dominated by YOLO detectors due to their low latency and convenient deployment. However, YOLO models heavily rely on Non-Maximum Suppression (NMS) for post-processing, which discards duplicate bounding boxes based on predefined threshold criteria. NMS introduces significant inference latency variance and hyperparameter sensitivity, creating a notorious bottleneck for end-to-end real-time computer vision deployment.",
        "In contrast, the Detection Transformer (DETR) represents an end-to-end object detection paradigm built upon Vision Transformers, eliminating the need for anchor generation and NMS post-processing by modeling object detection as a direct set prediction problem with Hungarian bipartite matching. However, existing DETR detectors exhibit high computational complexity, slow training convergence, and prohibitive inference latency, preventing them from matching the real-time speed requirements of edge devices.",
        "To resolve this fundamental dilemma, we propose the Real-Time DEtection TRansformer (RT-DETR), the first end-to-end real-time object detector that rivals and surpasses state-of-the-art YOLO detectors. RT-DETR achieves an optimal balance between execution speed and detection accuracy, operating at high frame rates without any NMS post-processing delay (Figure 1).",
        "The core contributions of this study are summarized as follows:",
        "1. We comprehensively analyze the execution latency of NMS in real-time detectors, establishing that NMS creates severe latency variance and impedes deterministic real-time inference.",
        "2. We design an Efficient Hybrid Encoder that decouples intra-scale feature interaction and cross-scale feature fusion, drastically reducing transformer attention computational overhead.",
        "3. We introduce Uncertainty-minimal Query Selection, formulating a joint classification-IoU metric that resolves the discrepancy between classification confidence and localization quality.",
        "4. We construct a family of scalable RT-DETR models (RT-DETR-L and RT-DETR-X) that comprehensively outperform YOLOv5, YOLOv6, YOLOv7, and YOLOv8 on the MS COCO benchmark.",
        "2. Related Work",
        "2.1. Real-time Object Detectors",
        "The evolution of real-time object detectors is anchored by the YOLO series. One-stage detectors predict bounding boxes and class probabilities directly from feature maps. Early models utilized anchor boxes, whereas modern iterations such as YOLOv6, YOLOv7, and YOLOv8 adopted anchor-free designs and decoupled detection heads. Despite these architectural enhancements, all YOLO detectors require NMS post-processing, where execution time fluctuates drastically depending on candidate box counts and scene complexity.",
        "2.2. End-to-end Object Detectors",
        "DETR pioneered end-to-end object detection by utilizing transformer encoder-decoder pairs with learnable object queries. Subsequent architectures accelerated convergence through multi-scale deformable attention (Deformable-DETR) and improved query initialization (DINO). However, the quadratic complexity of spatial self-attention in multi-scale transformer encoders remained computationally prohibitive for real-time throughput.",
        "3. End-to-end Speed of Detectors",
        "3.1. Analysis of NMS",
        "In real-time computer vision systems, end-to-end latency comprises preprocessing time, neural network inference time, and NMS post-processing time. Traditional benchmarks frequently report only backbone inference latency, ignoring NMS overhead. As shown in Figure 2 and Table 1, NMS execution latency is highly volatile: as the confidence threshold decreases or scene target density increases, NMS latency escalates by over 200%, destroying deterministic timing guarantees.",
        "3.2. End-to-end Speed Benchmark",
        "To ensure rigorous evaluation, we benchmark all models under identical hardware configurations using NVIDIA TensorRT FP16 on a single NVIDIA T4 GPU. We record end-to-end execution latency encompassing both neural forward pass and post-processing, providing an equitable comparison between NMS-dependent YOLO models and NMS-free RT-DETR.",
        "4. The Real-time DETR (RT-DETR)",
        "4.1. Model Overview",
        "The proposed RT-DETR architecture consists of three principal modules: a backbone network, an Efficient Hybrid Encoder, and a Transformer Decoder coupled with auxiliary prediction heads (Figure 4). High-level features C3, C4, and C5 are extracted from the backbone and passed into the hybrid encoder to generate multi-scale representations. The decoder then queries these features to produce final bounding box predictions in an end-to-end manner.",
        "4.2. Efficient Hybrid Encoder",
        "Previous DETR models deployed multi-head self-attention across all multi-scale feature tokens, inducing immense computational cost. We observe that intra-scale interaction is critical primarily for high-level semantic features, whereas cross-scale interaction is vital for spatial alignment. Accordingly, our Efficient Hybrid Encoder decouples these operations:",
        "First, Attention-based Intra-scale Feature Interaction (AIFI) applies multi-head self-attention exclusively to the highest semantic level feature map S5, reducing computational complexity from O((HW)^2) to O((H5W5)^2).",
        "Second, Cross-scale Feature-fusion Module (CCFF) fuses multi-scale features S3, S4, and S5 using lightweight RepBlock and CSP convolution blocks (Figure 5). This decoupling achieves rich semantic propagation with minimal FLOPs, accelerating encoder execution by over 300% (Figure 3, Table 3).",
        "4.3. Uncertainty-minimal Query Selection",
        "In conventional DETR models, initial object queries for the decoder are chosen based purely on classification confidence scores. However, high classification confidence does not guarantee accurate spatial localization, causing query initialization ambiguity. We formulate an Uncertainty-minimal Query Selection strategy that models query quality as the joint product of classification probability and predicted bounding box IoU score:",
        "Q = (S_cls)^alpha * (S_IoU)^(1 - alpha)",
        "As illustrated in Figure 6, this joint formulation concentrates initial queries on candidate tokens possessing both high class certainty and precise spatial boundaries, accelerating decoder convergence and eliminating localization drift.",
        "4.4. Scaled RT-DETR",
        "To satisfy diverse deployment requirements, RT-DETR provides scalable architectures. RT-DETR-L utilizes ResNet-50 (or HGNetv2-L), while RT-DETR-X incorporates ResNet-101 (or HGNetv2-X). Scaled variants adjust channel widths and layer depths across encoder and decoder blocks while preserving the core NMS-free paradigm.",
        "5. Experiments",
        "5.1. Comparison with SOTA",
        "We benchmark RT-DETR against leading real-time detectors on the MS COCO val2017 dataset (Table 2). RT-DETR-L achieves 53.0% AP at 114 FPS on an NVIDIA T4 GPU, outperforming YOLOv8-L (52.9% AP at 105 FPS) and PPYOLOE-L (51.4% AP at 110 FPS). RT-DETR-X achieves 54.8% AP at 74 FPS, surpassing YOLOv8-X (53.9% AP at 70 FPS) in both precision and execution throughput.",
        "5.2. Ablation Study on Hybrid Encoder",
        "Table 3 quantifies the architectural impact of the hybrid encoder variants (A through D). Variant D, combining AIFI on S5 with CCFF fusion blocks, achieves 49.6% AP at 13.9 ms latency, yielding the optimal trade-off between computational throughput and representation capacity.",
        "5.3. Ablation Study on Query Selection",
        "Table 4 validates the effectiveness of uncertainty-minimal query selection. Incorporating IoU-guided score weighting improves AP by 0.8% and AP75 by 1.1%, confirming that aligning query initialization with spatial overlap mitigates localization ambiguity.",
        "5.4. Ablation Study on Decoder",
        "Table 5 analyzes inference latency and accuracy across decoder layers. RT-DETR converges rapidly: layer 3 achieves 52.1% AP, and the complete 6-layer decoder reaches 53.0% AP with stable bounding box regression.",
        "6. Limitation and Discussion",
        "RT-DETR establishes a new frontier in real-time object detection by eliminating NMS post-processing bottlenecks and delivering state-of-the-art speed-accuracy trade-offs. Future research will explore low-bit model quantization for ultra-low-power microcontrollers and investigate domain adaptation for specialized unconstrained outdoor applications."
],
{
        "Non-Maximum Suppression (NMS)": "Loại bỏ phi cực đại (NMS): Thuật toán lọc các khung bao trùng lặp trong xử lý ảnh truyền thống, gây biến động độ trễ và nhạy cảm với siêu tham số ngưỡng.",
        "end-to-end object detector": "Bộ phát hiện đối tượng đầu-cuối: Kiến trúc dự đoán trực tiếp tập hợp nhãn và tọa độ không cần bước hậu xử lý lọc khung bao thủ công.",
        "inference latency variance": "Biến động độ trễ suy luận: Hiện tượng thời gian xử lý thay đổi bất thường theo số lượng vật thể trong ảnh do thuật toán NMS gây ra.",
        "hyperparameter sensitivity": "Độ nhạy siêu tham số: Sự phụ thuộc nặng nề của mô hình vào các ngưỡng tự chọn như IoU threshold và confidence threshold.",
        "Detection Transformer (DETR)": "Kiến trúc DETR: Khung phát hiện đối tượng dựa trên Transformer, biểu diễn bài toán dưới dạng khớp cặp tập hợp trực tiếp (bipartite matching).",
        "anchor-free detectors": "Bộ phát hiện không dùng neo (Anchor-Free): Kiến trúc dự đoán trực tiếp tọa độ tâm và khoảng cách viền thay vì dựa vào hộp neo cố định.",
        "efficient hybrid encoder": "Bộ mã hóa lai hiệu năng cao: Kiến trúc tách biệt tương tác nội tầng AIFI và hợp nhất xuyên tầng CCFF giúp giảm triệt để chi phí tính toán.",
        "AIFI (Attention-based Intra-scale Feature Interaction)": "Tương tác nội tầng dựa trên Attention (AIFI): Áp dụng multi-head self-attention chỉ trên tầng ngữ nghĩa cao nhất S5 để tiết kiệm GPU.",
        "CCFF (Cross-scale Feature Fusion)": "Mô-đun hợp nhất đặc trưng xuyên tầng (CCFF): Khối mạng tích chập kết hợp đặc trưng đa tỉ lệ S3, S4, S5 bằng các khối RepBlock/CSP.",
        "intra-scale interaction": "Tương tác nội tầng: Quá trình các điểm ảnh trong cùng một tầng đặc trưng trao đổi thông tin ngữ cảnh không gian.",
        "cross-scale fusion": "Hợp nhất xuyên tầng: Cơ chế truyền tải và kết hợp đặc trưng giữa các tầng có độ phân giải và cấp độ ngữ nghĩa khác nhau.",
        "uncertainty-minimal query selection": "Lựa chọn truy vấn giảm thiểu độ bất định: Chiến lược khởi tạo query cho Decoder dựa trên tích số giữa điểm phân loại và điểm chất lượng IoU.",
        "IoU-aware query selection": "Lựa chọn query định hướng IoU: Phương pháp tích hợp điểm tương đồng khung bao vào việc xếp hạng độ ưu tiên của các token đặc trưng.",
        "one-to-one bipartite matching": "Ghép cặp lưỡng phân 1-1: Thuật toán Hungarian gán duy nhất một khung dự đoán cho mỗi vật thể thực tế, triệt tiêu hoàn toàn sự trùng lặp.",
        "MS COCO benchmark": "Tập chuẩn mực MS COCO: Bộ dữ liệu kiểm thử quốc tế chuẩn mực nhất cho các mô hình phát hiện đối tượng thị giác máy tính.",
        "TensorRT FP16 latency": "Độ trễ TensorRT FP16: Thời gian thực thi mô hình sau khi tối ưu hóa phần cứng bằng engine TensorRT trên card đồ họa NVIDIA.",
        "T4 GPU speed benchmark": "Kiểm chuẩn tốc độ trên GPU T4: Môi trường đo lường tốc độ suy luận chuẩn công nghiệp cho các ứng dụng điện toán đám mây và vi biên.",
        "RepBlock": "Khối RepBlock (Re-parameterization Block): Cấu trúc tích chập đa nhánh trong huấn luyện được tái tham số hóa thành tích chập đơn khi suy luận.",
        "CSP block": "Khối mạng phân chia tầng chéo (Cross Stage Partial): Cấu trúc chia nhánh gradient để tăng tốc độ tính toán và chống suy giảm thông tin.",
        "bipartite matching loss": "Hàm mất mát ghép cặp lưỡng phân: Hàm mục tiêu tối ưu hóa chi phí gán nhãn toàn cục giữa tập dự đoán và tập nhãn thật.",
        "query embeddings": "Vector nhúng truy vấn (Queries): Các vector học được trong Transformer đại diện cho các đối tượng tiềm năng cần định vị trong ảnh.",
        "auxiliary prediction heads": "Đầu dự đoán bổ trợ: Các nhánh phân loại và định vị gắn ở từng tầng Decoder giúp ổn định luồng gradient trong quá trình huấn luyện.",
        "Deformable-DETR": "Mạng Deformable-DETR: Biến thể Transformer sử dụng cơ chế chú ý biến dạng thưa để giảm độ phức tạp tính toán O(N^2).",
        "DINO detector": "Bộ phát hiện DINO: Kiến trúc DETR tiên tiến tích hợp Contrastive Denoising Training để tăng tốc độ hội tụ mô hình.",
        "YOLOv8 comparison": "Đối sánh trực diện với YOLOv8: RT-DETR vượt qua mô hình YOLOv8 hàng đầu về cả độ chính xác (53.0% AP vs 52.9%) và tốc độ (114 FPS vs 105 FPS).",
        "Hungarian algorithm": "Thuật toán Hungarian: Thuật toán tối ưu hóa tổ hợp giải bài toán phân công công việc trong thời gian O(N^3).",
        "object queries": "Truy vấn đối tượng: Tập hợp các vị trí tiềm năng được đưa vào Transformer Decoder để truy vấn đặc trưng từ Encoder.",
        "multi-scale feature map (S3, S4, S5)": "Bản đồ đặc trưng đa tỉ lệ: Ba tầng đặc trưng có độ phân giải giảm dần (bước nhảy 8, 16, 32) chứa đựng thông tin từ chi tiết đến trừu tượng.",
        "positional encodings": "Mã hóa vị trí hình học: Vector biểu diễn tọa độ không gian 2D bổ sung vào token để mạng Transformer nhận biết khoảng cách hình học.",
        "FLOPs complexity": "Độ phức tạp tính toán FLOPs: Số lượng phép tính dấu phẩy động cần thực hiện trong một lượt truyền thuận qua mạng.",
        "real-time execution throughput": "Thông lượng thực thi thời gian thực: Khả năng xử lý hình ảnh với tốc độ khung hình cao (trên 30 FPS đến 114 FPS) phục vụ ứng dụng trực tiếp."
},
{
        "Non-Maximum Suppression (NMS)": "Loại bỏ phi cực đại (NMS)",
        "end-to-end object detector": "Bộ phát hiện đối tượng đầu-cuối",
        "inference latency variance": "Biến động độ trễ suy luận",
        "hyperparameter sensitivity": "Độ nhạy siêu tham số",
        "Detection Transformer (DETR)": "Kiến trúc DETR",
        "anchor-free detectors": "Bộ phát hiện không dùng neo (Anchor-Free)",
        "efficient hybrid encoder": "Bộ mã hóa lai hiệu năng cao",
        "AIFI (Attention-based Intra-scale Feature Interaction)": "Tương tác nội tầng dựa trên Attention (AIFI)",
        "CCFF (Cross-scale Feature Fusion)": "Mô-đun hợp nhất đặc trưng xuyên tầng (CCFF)",
        "intra-scale interaction": "Tương tác nội tầng",
        "cross-scale fusion": "Hợp nhất xuyên tầng",
        "uncertainty-minimal query selection": "Lựa chọn truy vấn giảm thiểu độ bất định",
        "IoU-aware query selection": "Lựa chọn query định hướng IoU",
        "one-to-one bipartite matching": "Ghép cặp lưỡng phân 1-1",
        "MS COCO benchmark": "Tập chuẩn mực MS COCO",
        "TensorRT FP16 latency": "Độ trễ TensorRT FP16",
        "T4 GPU speed benchmark": "Kiểm chuẩn tốc độ trên GPU T4",
        "RepBlock": "Khối RepBlock (Re-parameterization Block)",
        "CSP block": "Khối mạng phân chia tầng chéo (Cross Stage Partial)",
        "bipartite matching loss": "Hàm mất mát ghép cặp lưỡng phân",
        "query embeddings": "Vector nhúng truy vấn (Queries)",
        "auxiliary prediction heads": "Đầu dự đoán bổ trợ",
        "Deformable-DETR": "Mạng Deformable-DETR",
        "DINO detector": "Bộ phát hiện DINO",
        "YOLOv8 comparison": "Đối sánh trực diện với YOLOv8",
        "Hungarian algorithm": "Thuật toán Hungarian",
        "object queries": "Truy vấn đối tượng",
        "multi-scale feature map (S3, S4, S5)": "Bản đồ đặc trưng đa tỉ lệ",
        "positional encodings": "Mã hóa vị trí hình học",
        "FLOPs complexity": "Độ phức tạp tính toán FLOPs",
        "real-time execution throughput": "Thông lượng thực thi thời gian thực"
},
      "Core A* · Baidu Research",
      950,
      [
        "Loại bỏ hoàn toàn khâu hậu xử lý Non-Maximum Suppression (NMS), loại trừ độ trễ bất định khi suy luận.",
        "Bộ mã hóa lai (Hybrid Encoder) tách rời tương tác nội tầng AIFI và hợp nhất xuyên tầng CCFF giúp tăng tốc 300%.",
        "Chiến lược Uncertainty-minimal Query Selection kết hợp điểm phân loại và IoU giúp hội tụ cực nhanh.",
        "Đạt 53.0% AP ở tốc độ 114 FPS trên card GPU T4, trở thành chuẩn mực mới cho Object Detection thời gian thực."
      ],
      "Công trình kiến trúc bắt buộc phải trích dẫn để làm bệ phóng lý thuyết cho toàn bộ thuật toán phát hiện thời gian thực trong đề tài.",
      "NMS後処理を不要としながら、速度（114 FPS）と精度（53.0% AP）の双方でYOLO系を全面的に上回る初の実時間Transformerを実現。",
      [
        "Non-Maximum Suppression (NMS) 後処理を完全排除し、推論時の不確定な遅延分散を解消。",
        "スケール内相互作用AIFIとスケール間統合CCFFを分離した高効率ハイブリッドエンコーダを開発。",
        "不確定性最小化クエリ選択により、分類確信度と位置精度を高度に整合させ学習収束を加速。",
        "T4 GPU上で114 FPS・53.0% APを達成し、実時間物体検出の新たな国際標準を確立。"
      ],
{
        "Non-Maximum Suppression (NMS)": "非最大値抑制（NMS - Non-Maximum Suppression）: 重複検出枠を削減する従来後処理手法。推論遅延のばらつきと閾値依存性を引き起こす。",
        "end-to-end object detector": "エンドツーエンド物体検出器: 手動の後処理なしに画像から直接オブジェクト集合を予測するアーキテクチャ。",
        "inference latency variance": "推論遅延の不確定分散: 画像内の物体数やシーンの混雑度によってNMS処理時間が大きく変動する現象。",
        "hyperparameter sensitivity": "ハイパーパラメータ感受性: IoU閾値や確信度閾値のわずかな変化で検出結果が大きく左右される脆弱性。",
        "Detection Transformer (DETR)": "DETRアーキテクチャ: Transformerによる集合予測問題として物体検出を定式化したエンドツーエンドフレームワーク。",
        "anchor-free detectors": "アンカーフリー検出器: 事前定義されたアンカーボックスを使わず、中心点や境界距離を直接回帰する構造。",
        "efficient hybrid encoder": "高効率ハイブリッドエンコーダ: スケール内相互作用AIFIとスケール間統合CCFFを分離し、計算量を最適化したエンコーダ。",
        "AIFI (Attention-based Intra-scale Feature Interaction)": "アテンションに基づくスケール内特徴相互作用（AIFI）: 最深層S5のみに自己アテンションを適用し、計算複雑度を劇的に低減。",
        "CCFF (Cross-scale Feature Fusion)": "スケール間特徴統合モジュール（CCFF）: 軽量な畳み込みブロック（RepBlock/CSP）により多重解像度特徴を高速融合。",
        "intra-scale interaction": "スケール内特徴相互作用: 同一解像度の特徴マップ内における画素トークン間の文脈情報交換。",
        "cross-scale fusion": "スケール間特徴融合: 異なる解像度と意味レベルを持つ層間における双方向の特徴量統合機構。",
        "uncertainty-minimal query selection": "不確定性最小化クエリ選択: 分類確信度とIoU予測値の積に基づいて高品質なデコーダ初期クエリを選定する戦略。",
        "IoU-aware query selection": "IoU考慮型クエリ選択: 局所位置精度の高さをクエリ選抜の評価基準へ直接組み込む技術。",
        "one-to-one bipartite matching": "1対1二部グラフラベリング: ハンガリアンアルゴリズムにより予測枠と正解枠を1対1で一意に結びつける手法。",
        "MS COCO benchmark": "MS COCO国際標準ベンチマーク: 物体検出およびインスタンスセグメンテーションの最重要評価データセット。",
        "TensorRT FP16 latency": "TensorRT FP16推論遅延: NVIDIA GPU上で半精度浮動小数点（FP16）最適化エンジンを実行した際の実測レイテンシ。",
        "T4 GPU speed benchmark": "NVIDIA T4 GPUベンチマーク: クラウドおよびエッジ推論の業界標準検証環境。",
        "RepBlock": "RepBlock（構造再パラメータ化ブロック）: 訓練時の多分岐構造を推論時に単一畳み込みへ統合する高速化ブロック。",
        "CSP block": "CSPブロック（Cross Stage Partial）: 勾配経路を分割して計算冗長性を排除しつつ表現力を維持する畳み込み構造。",
        "bipartite matching loss": "二部マッチング損失: 予測枠集合と正解枠集合の最適割り当てに基づく大域的目的関数。",
        "query embeddings": "クエリ埋め込みベクトル: Transformerデコーダが画像内の潜在的物体を探索するための学習可能トークン群。",
        "auxiliary prediction heads": "補助予測ヘッド: デコーダの各中間層に配置され、勾配の安定供給と中間表現の洗練を促す分類・回帰器。",
        "Deformable-DETR": "変形可能DETR: スパースアテンションにより全画素自己アテンションの計算爆発を緩和したモデル。",
        "DINO detector": "DINO検出器: コントラスト的ノイズ除去学習等を導入して収束を高速化した先進DETR系検出器。",
        "YOLOv8 comparison": "YOLOv8との性能対比: RT-DETRは精度（53.0% AP）と速度（114 FPS）の双方でYOLOv8-Lを凌駕。",
        "Hungarian algorithm": "ハンガリアンアルゴリズム: 二部グラフの最小重み完全マッチングを多項式時間で解く最適化解法。",
        "object queries": "オブジェクトクエリ: デコーダに入力され、エンコーダ特徴から各物体の位置と属性を抽出する探索子。",
        "multi-scale feature map (S3, S4, S5)": "マルチスケール特徴マップ: ストライド8, 16, 32の3段階解像度から構成される特徴階層。",
        "positional encodings": "位置エンコーディング: トークンに対して幾何学的2次元座標情報を付与する位置表現ベクトル。",
        "FLOPs complexity": "FLOPs計算複雑度: モデルが1回の推論処理に要する浮動小数点演算回数。",
        "real-time execution throughput": "実時間スループット: 30 FPSから114 FPSに達する高速連続画像処理能力。"
},
{
        "Non-Maximum Suppression (NMS)": "非最大値抑制",
        "end-to-end object detector": "エンドツーエンド物体検出器",
        "inference latency variance": "推論遅延の不確定分散",
        "hyperparameter sensitivity": "ハイパーパラメータ感受性",
        "Detection Transformer (DETR)": "DETRアーキテクチャ",
        "anchor-free detectors": "アンカーフリー検出器",
        "efficient hybrid encoder": "高効率ハイブリッドエンコーダ",
        "AIFI (Attention-based Intra-scale Feature Interaction)": "アテンションに基づくスケール内特徴相互作用",
        "CCFF (Cross-scale Feature Fusion)": "スケール間特徴統合モジュール",
        "intra-scale interaction": "スケール内特徴相互作用",
        "cross-scale fusion": "スケール間特徴融合",
        "uncertainty-minimal query selection": "不確定性最小化クエリ選択",
        "IoU-aware query selection": "IoU考慮型クエリ選択",
        "one-to-one bipartite matching": "1対1二部グラフラベリング",
        "MS COCO benchmark": "MS COCO国際標準ベンチマーク",
        "TensorRT FP16 latency": "TensorRT FP16推論遅延",
        "T4 GPU speed benchmark": "NVIDIA T4 GPUベンチマーク",
        "RepBlock": "RepBlock",
        "CSP block": "CSPブロック",
        "bipartite matching loss": "二部マッチング損失",
        "query embeddings": "クエリ埋め込みベクトル",
        "auxiliary prediction heads": "補助予測ヘッド",
        "Deformable-DETR": "変形可能DETR",
        "DINO detector": "DINO検出器",
        "YOLOv8 comparison": "YOLOv8との性能対比",
        "Hungarian algorithm": "ハンガリアンアルゴリズム",
        "object queries": "オブジェクトクエリ",
        "multi-scale feature map (S3, S4, S5)": "マルチスケール特徴マップ",
        "positional encodings": "位置エンコーディング",
        "FLOPs complexity": "FLOPs計算複雑度",
        "real-time execution throughput": "実時間スループット"
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
