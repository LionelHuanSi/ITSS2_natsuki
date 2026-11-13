import { AcademicPaper } from "../models/AcademicPaper";
import { KeywordNode } from "../models/KeywordNode";
import { SavedExplanation, SavedExplanationDTO } from "../models/SavedExplanation";
import { ResearchTopicData, ResearchTopicRepository } from "../repositories/ResearchTopicRepository";

/**
 * Service điều phối toàn bộ 6 bước chức năng MVP theo đúng User Flow
 */
export class ResearchWorkflowService {
  private static readonly STORAGE_KEY = "natsuki_mvp_saved_explanations";
  private readonly repository: ResearchTopicRepository;

  constructor() {
    this.repository = ResearchTopicRepository.getInstance();
  }

  // F1.1: Phân tích chủ đề & Sinh sơ đồ từ khóa học thuật
  public analyzeTopic(input: string, fallbackKey = "low-light-face"): {
    isValid: boolean;
    errorMessage?: string;
    topicData?: ResearchTopicData;
  } {
    const clean = input.trim();
    if (clean.length < 3) {
      return {
        isValid: false,
        errorMessage: "Vui lòng nhập mô tả chủ đề nghiên cứu (tối thiểu 3 ký tự) để hệ thống phân giải từ khóa.",
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

  public getAllTopics(): ResearchTopicData[] {
    return this.repository.getAllTopics();
  }

  // Bôi đen và giải thích/dịch thuật theo ngữ cảnh bài báo
  public explainHighlightedText(
    paper: AcademicPaper,
    rawSelection: string,
    customPrompt?: string
  ): {
    isValid: boolean;
    errorMessage?: string;
    selectedText?: string;
    explanation?: string;
    translation?: string;
  } {
    const clean = rawSelection.trim();
    if (clean.length < 3) {
      return {
        isValid: false,
        errorMessage: "Vui lòng bôi đen ít nhất 1 cụm từ trong bài báo để xem giải thích hoặc dịch thuật.",
      };
    }

    return {
      isValid: true,
      selectedText: clean,
      explanation: paper.resolveContextualExplanation(clean, customPrompt),
      translation: paper.resolveContextualTranslation(clean),
    };
  }

  // F2.3: Quản lý lưu trữ phần giải thích ngữ cảnh
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
      new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " hôm nay"
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
        "paper-face-1",
        "Face Recognition in Low-Light Environments via Deep Domain Adaptation",
        "Low-Light Face Recognition (LLFR)",
        "unsupervised domain adaptation",
        "Thích ứng miền không giám sát (Unsupervised Domain Adaptation): Kỹ thuật học máy giúp mô hình được huấn luyện trên ảnh đủ sáng ban ngày tự thích ứng tốt trên ảnh thiếu sáng ban đêm mà không cần gán nhãn thủ công.",
        "Mẫu tham khảo"
      ),
    ];
  }
}
