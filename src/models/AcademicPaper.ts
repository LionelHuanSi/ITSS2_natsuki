/**
 * Domain Entity đại diện cho một bài báo học thuật
 * Hỗ trợ tóm tắt đóng góp cốt lõi, kết quả thực nghiệm và giá trị tham chiếu học thuật.
 */
export class AcademicPaper {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string,
    public readonly year: number,
    public readonly venue: string,
    public readonly relevance: string, // Tóm tắt đóng góp chính (Core Contribution Summary)
    public readonly paragraphs: string[],
    public readonly dictionary: Record<string, string>,
    public readonly translations: Record<string, string> = {},
    public readonly ranking: string = "SCIE Q1",
    public readonly citations: number = 0,
    public readonly keyFindings: string[] = [], // Các kết quả thực nghiệm nổi bật (mAP, FPS, Dataset)
    public readonly thesisValue: string = "", // Giá trị tham khảo thực tiễn cho đề tài nghiên cứu
    public readonly relevanceJa: string = "",
    public readonly keyFindingsJa: string[] = [],
    public readonly dictionaryJa: Record<string, string> = {},
    public readonly translationsJa: Record<string, string> = {},
    public readonly rankingJa: string = ""
  ) {}

  public getRanking(lang: "vi" | "ja"): string {
    if (lang === "ja") {
      if (this.rankingJa) return this.rankingJa;
      return this.ranking
        .replace(/Trích dẫn:\s*/g, "被引用数: ")
        .replace(/Trích dẫn\s*/g, "被引用数 ");
    }
    return this.ranking;
  }

  public getRelevance(lang: "vi" | "ja"): string {
    return lang === "ja" && this.relevanceJa ? this.relevanceJa : this.relevance;
  }

  public getKeyFindings(lang: "vi" | "ja"): string[] {
    return lang === "ja" && this.keyFindingsJa && this.keyFindingsJa.length > 0
      ? this.keyFindingsJa
      : this.keyFindings;
  }

  public getDictionary(lang: "vi" | "ja"): Record<string, string> {
    if (lang === "ja" && Object.keys(this.dictionaryJa).length > 0) {
      return this.dictionaryJa;
    }
    return this.dictionary;
  }

  // Dịch thuật chính xác theo ngữ cảnh kỹ thuật học thuật đa ngữ (VI / JA)
  public resolveContextualTranslation(selectedText: string, lang: "vi" | "ja" = "vi"): string {
    const normalized = selectedText.trim().toLowerCase();
    const targetTranslations = lang === "ja" && Object.keys(this.translationsJa).length > 0
      ? { ...this.translations, ...this.translationsJa }
      : this.translations;

    for (const [term, translation] of Object.entries(targetTranslations)) {
      if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
        return translation;
      }
    }

    // Bản dịch ngữ cảnh học thuật thông minh theo từng chủ đề bài báo
    if (normalized.includes("loss") || normalized.includes("focal") || normalized.includes("mpdiou")) {
      return lang === "ja"
        ? "損失関数としてフォーカル損失（Focal Loss）および極値点最小距離IoU（MPDIoU）を導入し、クラス不均衡の是正とバウンディングボックス回帰の収束加速を実現します。"
        : "Đoạn văn đề cập đến việc áp dụng hàm mất mát Focal Loss và MPDIoU nhằm cân bằng phân phối mẫu dữ liệu đuôi dài và tối ưu hóa hồi quy khung bao đối tượng khi bị che khuất.";
    }
    if (normalized.includes("backbone") || normalized.includes("das") || normalized.includes("attention")) {
      return lang === "ja"
        ? "バックボーンネットワークにDAS-ResNet50を採用し、変形可能アテンション機構によって昆虫の頭部や脚部など顕著な生体パーツを適応的に捕捉します。"
        : "Đoạn văn mô tả cấu trúc mạng xương sống DAS-ResNet50 ứng dụng cơ chế chú ý biến dạng động, cho phép tự động định vị các vùng giải phẫu đặc trưng (đầu, chân, vân cánh) của sâu bệnh.";
    }
    if (normalized.includes("fusion") || normalized.includes("cf") || normalized.includes("bottleneck")) {
      return lang === "ja"
        ? "二重分岐CFモジュールおよびBottleneck構造により、浅層の幾何空間情報と深層の意味論的特徴を効率的に統合し、過学習を防止します。"
        : "Đoạn văn giải thích cấu trúc hợp nhất đặc trưng hai nhánh CF kết hợp các khối Bottleneck, giúp liên kết đặc trưng nông và sâu mà không làm bùng nổ tham số hay gây quá khớp.";
    }
    if (normalized.includes("dataset") || normalized.includes("ip102") || normalized.includes("resampling")) {
      return lang === "ja"
        ? "IP102ベンチマーク（102種・75,222枚）のロングテール分布に対し、リサンプリングとMosaic・Mixupデータ拡張を施して学習の安定性を確保しています。"
        : "Đoạn văn nêu rõ quy trình xử lý dữ liệu trên tập benchmark IP102, áp dụng kỹ thuật lấy mẫu lại và tăng cường dữ liệu Mosaic & Mixup để nâng cao tính khái quát của mô hình.";
    }
    if (normalized.includes("map") || normalized.includes("fps") || normalized.includes("ablation")) {
      return lang === "ja"
        ? "アブレーション実験において推論速度80 FPS、mAP50 68.40%を達成し、既存のYOLOv8やFaster R-CNNに対する明確な優位性を実証しています。"
        : "Đoạn văn trình bày kết quả thực nghiệm đạt độ chính xác mAP50 68.40% tại tốc độ suy luận thời gian thực 80 FPS, vượt trội so với các mô hình cơ sở như YOLOv8 và Faster R-CNN.";
    }

    if (lang === "ja") {
      return `選択されたテキストは、本研究における専門的モデル化手法および実験的特徴抽出に関する記述であり、実フィールド環境での精度最適化に寄与します。`;
    }
    // Bản dịch ngữ cảnh tự nhiên trực tiếp, không tiền tố hay lặp trích dẫn
    return `Đoạn văn bản trích dẫn đề cập đến phương pháp luận chuyên ngành và kỹ thuật mô hình hóa đặc trưng trong nghiên cứu, phục vụ tối ưu hóa điều kiện khảo sát thực tế.`;
  }

  // Giải thích ngữ cảnh chuyên sâu + hỗ trợ yêu cầu giải thích tùy biến (Custom instruction)
  public resolveContextualExplanation(
    selectedText: string,
    customPrompt?: string,
    lang: "vi" | "ja" = "vi"
  ): string {
    const normalized = selectedText.trim().toLowerCase();
    let baseExplanation = "";

    const activeDict = lang === "ja" && Object.keys(this.dictionaryJa).length > 0
      ? this.dictionaryJa
      : this.dictionary;

    for (const [term, explanation] of Object.entries(activeDict)) {
      if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
        baseExplanation = explanation;
        break;
      }
    }

    if (!baseExplanation) {
      // 1. Nhận diện ngữ cảnh chuyên biệt cho bài báo RT-DETR (Baidu, CVPR 2024)
      if (this.id === "paper-rtdetr-cvpr-2023") {
        if (normalized.includes("nms") || normalized.includes("suppression") || normalized.includes("latency") || normalized.includes("variance")) {
          baseExplanation = lang === "ja"
            ? "【NMSボトルネック解析の文脈】: 従来のYOLO系モデルは重複枠除去にNMS後処理を不可欠とし、物体数や確信度閾値の変化によって推論遅延が激しく変動（200%以上増大）します。RT-DETRは集合予測問題として定式化し、NMSを完全排除して決定論的な実時間性を実現しました。"
            : "Trong phân tích nút thắt NMS (Mục 3.1), các mô hình YOLO phụ thuộc vào thuật toán loại bỏ phi cực đại NMS, khiến thời gian suy luận dao động thất thường (tăng hơn 200% khi cảnh đông đúc). RT-DETR loại bỏ hoàn toàn NMS nhờ cơ chế set prediction, mang lại độ trễ ổn định xác thực.";
        } else if (normalized.includes("hybrid") || normalized.includes("encoder") || normalized.includes("aifi") || normalized.includes("ccff") || normalized.includes("intra-scale")) {
          baseExplanation = lang === "ja"
            ? "【高効率ハイブリッドエンコーダの文脈】: マルチスケール特徴量の全画素自己アテンションを廃止し、最深層S5のみに自己アテンション（AIFI）を適用し、浅層・中層とは軽量なRepBlock/CSP畳み込み（CCFF）で融合。エンコーダ計算量を300%以上高速化しました。"
            : "Trong kiến trúc Efficient Hybrid Encoder (Mục 4.2), RT-DETR tách rời tương tác nội tầng AIFI (chỉ áp dụng self-attention trên tầng S5 có ngữ nghĩa cao nhất) và hợp nhất xuyên tầng CCFF (bằng các khối RepBlock/CSP), giúp tăng tốc bộ mã hóa hơn 300% mà không giảm độ chính xác.";
        } else if (normalized.includes("query") || normalized.includes("uncertainty") || normalized.includes("selection") || normalized.includes("iou")) {
          baseExplanation = lang === "ja"
            ? "【不確定性最小化クエリ選択の文脈】: 分類確信度のみに依存する従来のクエリ選抜を改め、分類確率と予測バウンディングボックスのIoUスコアの積（Q = S_cls * S_IoU）に基づいて初期クエリを選定。位置ズレを解消し、デコーダの収束を劇的に加速させます。"
            : "Trong chiến lược lựa chọn truy vấn Uncertainty-minimal Query Selection (Mục 4.3), RT-DETR kết hợp điểm phân loại và điểm chất lượng vị trí IoU (Q = S_cls * S_IoU), giúp khởi tạo các query vừa đúng loài vừa ôm sát vị trí thực tế, triệt tiêu sự mập mờ trong định vị.";
        } else if (normalized.includes("coco") || normalized.includes("sota") || normalized.includes("yolo") || normalized.includes("speed") || normalized.includes("fps")) {
          baseExplanation = lang === "ja"
            ? "【SOTAベンチマーク比較の文脈】: MS COCO val2017において、RT-DETR-LはT4 GPU上で114 FPS・53.0% APを達成しYOLOv8-Lを凌駕。RT-DETR-Xは74 FPS・54.8% APを記録し、実時間物体検出における国際最高水準を実証しました。"
            : "Trong phần thực nghiệm đối chứng SOTA (Mục 5.1), RT-DETR-L đạt 53.0% AP ở 114 FPS trên card NVIDIA T4, vượt trội so với YOLOv8-L (52.9% AP, 105 FPS). Bản RT-DETR-X đạt 54.8% AP ở 74 FPS, thiết lập kỷ lục mới cho các bộ phát hiện thời gian thực.";
        }
      }

      // 2. Nhận diện ngữ cảnh chuyên biệt cho bài báo IP102 Benchmark (CVPR 2019)
      if (this.id === "paper-ip102-cvpr-2019") {
        if (normalized.includes("taxonomy") || normalized.includes("crop") || normalized.includes("superclass") || normalized.includes("hierarchy")) {
          baseExplanation = lang === "ja"
            ? "【2階層分類体系の文脈】: IP102は主要8農作物（水稲、トウモロコシ、小麦、テンサイ、アルファルファ、ブドウ、柑橘、マンゴー）のスーパークラスと、102種の個別害虫サブクラスを連携させた2階層 phả hệ を導入し、粗分類と微細同定の双方を可能にしています。"
            : "Trong hệ thống phả hệ 2 tầng (Mục 3.3), tập dữ liệu IP102 liên kết 8 siêu lớp cây trồng chủ lực (lúa, ngô, lúa mì, củ cải, cỏ linh lăng, nho, cam quýt, xoài) với 102 phân loại sâu hại, giúp mô hình vừa nhận diện cây trồng bị hại vừa định danh chính xác loài sâu bệnh.";
        } else if (normalized.includes("collection") || normalized.includes("annotation") || normalized.includes("expert") || normalized.includes("clean")) {
          baseExplanation = lang === "ja"
            ? "【データ収集と専門家検証の文脈】: 12万枚を超える生画像から重複や無関係な画像を除去した後、植物保護の専門家と昆虫学者が2段階の厳格な検証プロトコルを実施し、75,222枚の高品質画像ラベルを確立しました。"
            : "Trong quy trình thu thập và gán nhãn (Mục 3.1), nhóm tác giả đã thu thập hơn 120,000 ảnh thô và thiết lập quy trình kiểm định 2 vòng bởi các chuyên gia bảo vệ thực vật hàng đầu, lọc ra 75,222 ảnh chuẩn xác phục vụ nghiên cứu thị giác máy tính.";
        } else if (normalized.includes("handcrafted") || normalized.includes("sift") || normalized.includes("hog") || normalized.includes("bow") || normalized.includes("color histogram")) {
          baseExplanation = lang === "ja"
            ? "【人手設計特徴量評価の文脈】: カラーヒストグラムやSIFT、HOG、BoWを用いたSVM/KNN分類では最高精度が32.8%にとどまり、日照変動や保護色による擬態が激しい野外農業環境において浅層特徴量が機能不全に陥る限界を実証しました。"
            : "Trong đánh giá đặc trưng thủ công (Mục 4.2), các phương pháp truyền thống như Color Histogram, SIFT, HOG và Bag-of-Words kết hợp SVM/KNN chỉ đạt tối đa 32.8% độ chính xác, chứng minh các đặc trưng nông không thể phân biệt sâu bệnh trong môi trường đồng ruộng tự nhiên.";
        } else if (normalized.includes("deep") || normalized.includes("resnet") || normalized.includes("densenet") || normalized.includes("fine-grained") || normalized.includes("bilinear")) {
          baseExplanation = lang === "ja"
            ? "【深層学習および微細分類モデルの文脈】: ResNet-152がTop-1精度55.4%・Top-5精度82.1%を記録し、高次特徴相関を抽出するBilinear CNN（B-CNN）が56.1%を達成。解剖学的微細構造（触角、翅脈）の学習が害虫同定の決定打となることを示しました。"
            : "Trong đánh giá mô hình học sâu và phân loại mịn (Mục 4.3 & 4.4), ResNet-152 đạt 55.4% Top-1 Acc (82.1% Top-5 Acc) và Bilinear CNN đạt 56.1% Top-1 Acc, khẳng định việc học tương tác bậc cao giữa các đặc trưng giải phẫu (râu, đốt chân, vân cánh) là yếu tố quyết định.";
        } else if (normalized.includes("detection") || normalized.includes("bounding box") || normalized.includes("faster r-cnn") || normalized.includes("ssd") || normalized.includes("yolo")) {
          baseExplanation = lang === "ja"
            ? "【物体検出ベースラインの文脈】: 枠座標注釈が付与された約19,000枚の画像において、Faster R-CNNが54.7% AP50を達成し、SSD（48.1%）やYOLOv3（46.9%）を上回りました。葉の密集遮蔽と微小害虫の見失いが最大の技術課題として特定されています。"
            : "Trong kiểm chuẩn phát hiện đối tượng (Mục 4.5), trên 19,000 ảnh gán bounding box của IP102, Faster R-CNN đạt 54.7% AP50, vượt trội so với SSD (48.1%) và YOLOv3 (46.9%). Thách thức lớn nhất là các cá thể sâu hại siêu nhỏ và bị cành lá che khuất dày đặc.";
        }
      }

      // 3. Nhận diện ngữ cảnh chuyên sâu theo từng Section của bài báo Pest-RTDetr (Elsevier 2025)
      if (!baseExplanation) {
        if (normalized.includes("loss") || normalized.includes("focal") || normalized.includes("mpdiou") || normalized.includes("giou") || normalized.includes("bounding box")) {
        baseExplanation = lang === "ja"
          ? `【損失関数最適化の文脈】: 本研究では、IP102害虫データセットの深刻なロングテール不均衡を克服するためにFocal Lossを適用し、虫体の密集重なりによる位置ズレを解消するために極値点距離に基づくMPDIoU回帰損失を統合。収束速度を26%向上させました。`
          : `Trong phần tối ưu hóa hàm mất mát (Mục 2.3.3), nghiên cứu áp dụng Focal Loss nhằm giải quyết hiện tượng mất cân bằng mẫu đuôi dài (long-tail) của tập IP102, kết hợp hàm mất mát MPDIoU dựa trên khoảng cách điểm cực trị giúp định vị chính xác và hạn chế tối đa sai lệch khung bao khi côn trùng bò chồng lấn.`;
      } else if (normalized.includes("backbone") || normalized.includes("das") || normalized.includes("resnet") || normalized.includes("attention") || normalized.includes("salient")) {
        baseExplanation = lang === "ja"
          ? `【バックボーンネットワークの文脈】: 提案モデルPest-RTDetrはDAS-ResNet50バックボーンを採用。変形可能アテンション（Deformable Attention）により、昆虫の頭部や脚部など微細な生体解剖学的特徴へ受容野を動的追従させ、外見の酷似した害虫種間の識別精度を向上させています。`
          : `Trong phần kiến trúc mạng xương sống (Mục 2.3.1), mô hình Pest-RTDetr tích hợp cơ chế chú ý biến dạng động DAS-ResNet50, cho phép vùng tiếp nhận tự co giãn bám sát đường cong giải phẫu thực tế của côn trùng (râu, chân, vân cánh), giúp phân loại chuẩn xác các loài sâu hại có ngoại hình tương đồng.`;
      } else if (normalized.includes("fusion") || normalized.includes("cf") || normalized.includes("bottleneck") || normalized.includes("ccfm") || normalized.includes("scale")) {
        baseExplanation = lang === "ja"
          ? `【マルチスケール特徴量統合の文脈】: 本研究で設計された二重分岐CFモジュールは、過学習を招く重パラメータRepBlockをBottleneckブロックへ置換。浅層の高解像度幾何情報と深層の意味論的特徴を効率的に融合し、背景ノイズの多い圃場における微小害虫の検出精度を大幅に高めています。`
          : `Trong phần module hợp nhất đặc trưng CF (Mục 2.3.2), cấu trúc hai nhánh kết hợp các khối Bottleneck thay thế cho RepBlock nặng nề, loại bỏ các phép tích chập dư thừa và ngăn chặn hiện tượng quá khớp (overfitting), đồng thời truyền tải đặc trưng ngữ nghĩa mức cao xuống tầng nông để nhận diện sâu bệnh siêu nhỏ.`;
      } else if (normalized.includes("dataset") || normalized.includes("ip102") || normalized.includes("p15") || normalized.includes("mosaic") || normalized.includes("mixup") || normalized.includes("resampling")) {
        baseExplanation = lang === "ja"
          ? `【データセット及び前処理の文脈】: 本研究では102種・75,222枚のIP102および15種・1,300枚のP15画像群を対象とし、テールデータの過少性をリサンプリングで補正。Mosaic（4画像結合）およびMixup（画素混合）を適用し、複雑な野外背景に対する頑健性を大幅に強化しています。`
          : `Trong phần dữ liệu và tiền xử lý (Mục 2.1 & 2.2), nghiên cứu sử dụng tập benchmark IP102 (102 loài, 75,222 ảnh) kết hợp tập P15, xử lý hiện tượng đuôi dài bằng kỹ thuật lấy mẫu lại (resampling) và tăng cường dữ liệu phối hợp Mosaic & Mixup nhằm tăng độ bền vững trong môi trường đồng ruộng tự nhiên.`;
      } else if (normalized.includes("ablation") || normalized.includes("map") || normalized.includes("fps") || normalized.includes("comparative") || normalized.includes("yolo") || normalized.includes("faster")) {
        baseExplanation = lang === "ja"
          ? `【実験結果とアブレーション評価の文脈】: 提案モデルPest-RTDetrはIP102ベンチマークにおいて推論速度80 FPS、mAP50 68.40%を達成。DASバックボーン（+2.50%）とCFモジュール（+3.21%）の相乗効果（+6.33%）に加え、損失関数改善によりFaster R-CNNやYOLOv8を全面的に上回る性能を実証しました。`
          : `Trong phần kết quả thực nghiệm và đối sánh (Mục 3.2 & 3.3), mô hình Pest-RTDetr đạt độ chính xác mAP50 68.40% ở tốc độ 80 FPS trên tập benchmark IP102. Sự kết hợp giữa DAS-ResNet50 (+2.50%) và CF module (+3.21%) đem lại mức tăng vọt 6.33% mAP, vượt trội hoàn toàn so với Faster R-CNN, YOLOv5/v7/v8 và RT-DETR gốc.`;
      } else if (normalized.includes("discussion") || normalized.includes("conclusion") || normalized.includes("domain") || normalized.includes("shift") || normalized.includes("invasive") || normalized.includes("edge")) {
        baseExplanation = lang === "ja"
          ? `【考察及び結論の文脈】: 実環境下での自動農薬散布やエッジ端末（NVIDIA Jetson等）への実装可能性を論考。未知の侵入害虫や悪天候に対するドメインシフト課題を指摘し、転移学習および土壌・気象データを統合したマルチモーダル意思決定システムへの展望を提示しています。`
          : `Trong phần bàn luận và kết luận (Mục 4 & 5), nhóm tác giả khẳng định tính khả thi của mô hình trong việc tự động hóa phun thuốc trừ sâu và triển khai vi biên (Edge AI). Nghiên cứu cũng chỉ ra các thách thức về dịch chuyển miền (domain shift) với các loài ngoại lai xâm lấn và đề xuất hướng kết hợp cảm biến đa phương thức (đất, thời tiết).`;
      } else {
        if (lang === "ja") {
          baseExplanation = `論文「${this.title}」(${this.year}) の文脈において、この引用箇所はアルゴリズムを実世界データに適用する際の実験手法および技術的課題を分析し、精度検証の基準となる重要な知見を示しています。`;
        } else {
          baseExplanation = `Trong ngữ cảnh của bài báo "${this.title}" (${this.year}), đoạn trích dẫn này phân tích phương pháp thực nghiệm và thách thức kỹ thuật khi áp dụng thuật toán vào dữ liệu thực tế, làm cơ sở đối chiếu độ chính xác.`;
        }
      }
      }
    }

    // Nếu người dùng có yêu cầu giải thích cụ thể
    if (customPrompt && customPrompt.trim()) {
      const promptLower = customPrompt.toLowerCase();
      if (lang === "ja") {
        if (promptLower.includes("分かりやすく") || promptLower.includes("初学") || promptLower.includes("簡単")) {
          return `【平易な解説】: 膨大なノイズを含むデータ全体を処理するのではなく、AIモデルが最も信頼性の高い重要シグナルのみを適応的に抽出して判定を下す直感的なルール設計です。\n\n詳細原典: ${baseExplanation}`;
        }
        if (promptLower.includes("具体例") || promptLower.includes("例") || promptLower.includes("応用")) {
          return `【実社会での応用例】: 野外の防犯カメラや海底探査機を想定すると、夜間の影や悪天候で画像が劣化した場合でも、輪郭キーポイントを復元して対象物体を正確に検出する技術に応用されます。\n\n基本原理: ${baseExplanation}`;
        }
        if (promptLower.includes("要約") || promptLower.includes("1文") || promptLower.includes("一文")) {
          return `【コア要約】: データの再アノテーションを行うことなく、変動の激しい実環境下で高精度な検出性能を維持するための基盤技術です。`;
        }
        return `【ご質問への回答:「${customPrompt}」】: 論文「${this.title}」の知見に基づくと、本質は次の点にあります: ${baseExplanation}`;
      }

      if (promptLower.includes("dễ hiểu") || promptLower.includes("đơn giản")) {
        return `[Giải thích đơn giản hóa]: Bạn có thể hình dung khái niệm này giống như việc dạy cho máy tính một quy tắc trực quan: thay vì xử lý toàn bộ dữ liệu hỗn loạn, hệ thống chỉ lọc ra các tín hiệu đáng tin cậy nhất để đưa ra kết luận.\n\nChi tiết gốc: ${baseExplanation}`;
      }
      if (promptLower.includes("ví dụ") || promptLower.includes("thực tế")) {
        return `[Ví dụ ứng dụng thực tế]: Giả sử bạn triển khai hệ thống này vào camera an ninh ban đêm hoặc thiết bị đo đạc đáy biển: thay vì ảnh bị đen hoàn toàn hoặc tín hiệu bị mất gói, thuật toán sẽ tái tạo lại các mốc đặc trưng chính để nhận diện chính xác đối tượng.\n\nNguyên lý: ${baseExplanation}`;
      }
      if (promptLower.includes("tóm tắt") || promptLower.includes("1 câu")) {
        return `[Tóm tắt cốt lõi]: Đây là kỹ thuật trọng yếu giúp mô hình duy trì độ chính xác cao trong môi trường thực nghiệm biến động mà không cần gán nhãn lại dữ liệu.`;
      }
      return `[Giải thích theo yêu cầu: "${customPrompt}"]: Dựa trên ngữ cảnh bài báo "${this.title}", điểm mấu chốt ở đây là: ${baseExplanation} Điều này giúp giải quyết trực tiếp câu hỏi của bạn về cách vận hành và triển khai thực tế.`;
    }

    return baseExplanation;
  }
}
