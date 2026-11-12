/**
 * Domain Entity representing a Foundational Academic Paper (F1.3 & F2.1)
 */
export class AcademicPaper {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string,
    public readonly year: number,
    public readonly venue: string,
    public readonly relevance: string,
    public readonly paragraphs: string[],
    public readonly dictionary: Record<string, string>
  ) {}

  // Tìm lời giải thích ngữ cảnh cho đoạn văn bản được bôi đen (F2.2)
  public resolveContextualExplanation(selectedText: string): string {
    const normalized = selectedText.trim().toLowerCase();
    for (const [term, explanation] of Object.entries(this.dictionary)) {
      if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
        return explanation;
      }
    }
    return `Trong ngữ cảnh của bài báo "${this.title}" (${this.year}), đoạn trích dẫn này phân tích phương pháp thực nghiệm và thách thức kỹ thuật khi áp dụng mô hình học sâu vào dữ liệu thực tế, làm cơ sở đối chiếu độ chính xác.`;
  }
}
