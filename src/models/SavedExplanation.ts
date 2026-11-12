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
}

export class SavedExplanation {
  constructor(
    public readonly id: string,
    public readonly paperId: string,
    public readonly paperTitle: string,
    public readonly keywordLabel: string,
    public readonly selectedText: string,
    public readonly explanation: string,
    public readonly createdAt: string
  ) {}

  public toDTO(): SavedExplanationDTO {
    return {
      id: this.id,
      paperId: this.paperId,
      paperTitle: this.paperTitle,
      keywordLabel: this.keywordLabel,
      selectedText: this.selectedText,
      explanation: this.explanation,
      createdAt: this.createdAt,
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
      dto.createdAt
    );
  }
}
