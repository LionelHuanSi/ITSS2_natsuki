import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";
import { SavedExplanation, SavedExplanationDTO } from "../models/SavedExplanation";
import { ResearchTopicData, ResearchTopicRepository } from "../repositories/ResearchTopicRepository";

/**
 * OOP Service encapsulating all 6 MVP features across Solution 1 and Solution 2
 */
export class ResearchWorkflowService {
  private static readonly STORAGE_KEY = "natsuki_mvp_saved_explanations";
  private readonly repository: ResearchTopicRepository;

  constructor() {
    this.repository = ResearchTopicRepository.getInstance();
  }

  // F1.1: Phân tích chủ đề & Sinh sơ đồ từ khóa học thuật
  public analyzeTopic(input: string, fallbackKey = "ai-vision"): {
    isValid: boolean;
    errorMessage?: string;
    topicData?: ResearchTopicData;
  } {
    const clean = input.trim();
    if (clean.length < 3) {
      return {
        isValid: false,
        errorMessage: "Vui lòng nhập mô tả chủ đề nghiên cứu (tối thiểu 3 ký tự) trước khi phân tích!",
      };
    }

    const resolvedKey = this.repository.resolveTopicKeyFromInput(clean) || fallbackKey;
    return {
      isValid: true,
      topicData: this.repository.getTopicByKey(resolvedKey),
    };
  }

  public getTopicByKey(key: string): ResearchTopicData {
    return this.repository.getTopicByKey(key);
  }

  // F2.1 & F2.2: Kiểm tra đoạn bôi đen và giải thích theo ngữ cảnh bài báo
  public explainHighlightedText(
    paper: AcademicPaper,
    rawSelection: string
  ): {
    isValid: boolean;
    errorMessage?: string;
    selectedText?: string;
    explanation?: string;
  } {
    const clean = rawSelection.trim();
    if (clean.length < 4) {
      return {
        isValid: false,
        errorMessage: "Vui lòng bôi đen ít nhất 1 cụm từ (tối thiểu 4 ký tự) để hệ thống đối chiếu ngữ cảnh bài báo chính xác.",
      };
    }

    return {
      isValid: true,
      selectedText: clean,
      explanation: paper.resolveContextualExplanation(clean),
    };
  }

  // F2.3: Quản lý lưu trữ phần giải thích của ngữ cảnh đã bôi đen
  public loadSavedExplanations(): SavedExplanation[] {
    if (typeof window === "undefined") return this.getDefaultSample();
    try {
      const raw = window.localStorage.getItem(ResearchWorkflowService.STORAGE_KEY);
      if (!raw) return this.getDefaultSample();
      const parsed: SavedExplanationDTO[] = JSON.parse(raw);
      return parsed.map((dto) => SavedExplanation.fromDTO(dto));
    } catch {
      return this.getDefaultSample();
    }
  }

  public saveExplanation(
    paper: AcademicPaper,
    keyword: KeywordNode,
    selectedText: string,
    explanation: string,
    currentList: SavedExplanation[]
  ): SavedExplanation[] {
    const newItem = new SavedExplanation(
      `saved-${Date.now()}`,
      paper.id,
      paper.title,
      keyword.labelEn,
      selectedText,
      explanation,
      new Date().toLocaleString("vi-VN")
    );
    const updated = [newItem, ...currentList];
    this.persistList(updated);
    return updated;
  }

  public deleteExplanation(id: string, currentList: SavedExplanation[]): SavedExplanation[] {
    const updated = currentList.filter((item) => item.id !== id);
    this.persistList(updated);
    return updated;
  }

  private persistList(list: SavedExplanation[]): void {
    if (typeof window === "undefined") return;
    const dtos = list.map((item) => item.toDTO());
    window.localStorage.setItem(ResearchWorkflowService.STORAGE_KEY, JSON.stringify(dtos));
  }

  private getDefaultSample(): SavedExplanation[] {
    return [
      new SavedExplanation(
        "sample-1",
        "paper-1",
        "Using Deep Learning for Image-Based Plant Disease Detection",
        "Convolutional Neural Networks (CNN)",
        "domain shift and complex background noise",
        "Sự dịch chuyển miền dữ liệu (Domain Shift): Hiện tượng mô hình học trên ảnh chụp phòng thí nghiệm nhưng dự đoán sai khi đưa ra đồng ruộng thực tế có phông nền phức tạp.",
        "Mẫu có sẵn"
      ),
    ];
  }
}
