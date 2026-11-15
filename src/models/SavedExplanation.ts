/**
 * Domain Entity representing a Saved Contextual Explanation (F2.3)
 */
export interface SavedExplanationDTO {
  id: string;
  paperId: string;
  paperTitle: string;
  keywordLabel: string;
  selectedText: string;
  explanation: string;
  createdAt: string;
  explanationJa?: string;
  createdAtJa?: string;
  keywordLabelJa?: string;
}

export class SavedExplanation {
  constructor(
    public readonly id: string,
    public readonly paperId: string,
    public readonly paperTitle: string,
    public readonly keywordLabel: string,
    public readonly selectedText: string,
    public readonly explanation: string,
    public readonly createdAt: string,
    public readonly explanationJa: string = "",
    public readonly createdAtJa: string = "",
    public readonly keywordLabelJa: string = ""
  ) {}

  public getExplanation(lang: "vi" | "ja"): string {
    return lang === "ja" && this.explanationJa ? this.explanationJa : this.explanation;
  }

  public getCreatedAt(lang: "vi" | "ja"): string {
    if (lang === "ja") {
      if (this.createdAtJa) return this.createdAtJa;
      if (this.createdAt === "Trích dẫn nền tảng") return "基盤文献の引用";
      return this.createdAt.replace("hôm nay", "今日");
    }
    return this.createdAt;
  }

  public getKeywordLabel(lang: "vi" | "ja"): string {
    return lang === "ja" && this.keywordLabelJa ? this.keywordLabelJa : this.keywordLabel;
  }

  public toDTO(): SavedExplanationDTO {
    return {
      id: this.id,
      paperId: this.paperId,
      paperTitle: this.paperTitle,
      keywordLabel: this.keywordLabel,
      selectedText: this.selectedText,
      explanation: this.explanation,
      createdAt: this.createdAt,
      explanationJa: this.explanationJa,
      createdAtJa: this.createdAtJa,
      keywordLabelJa: this.keywordLabelJa,
    };
  }

  public static fromDTO(dto: SavedExplanationDTO): SavedExplanation {
    return new SavedExplanation(
      dto.id,
      dto.paperId,
      dto.paperTitle,
      dto.keywordLabel,
      dto.selectedText,
      dto.explanation,
      dto.createdAt,
      dto.explanationJa || "",
      dto.createdAtJa || "",
      dto.keywordLabelJa || ""
    );
  }
}
