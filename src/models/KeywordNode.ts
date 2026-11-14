import { AcademicPaper } from "./AcademicPaper";

/**
 * Domain Entity representing an Academic Keyword Node on the Map (F1.1 & F1.2)
 * Cung cấp phân tích sâu vì sao AI chọn từ khóa, bối cảnh học thuật quốc tế và cú pháp truy vấn.
 */
export class KeywordNode {
  constructor(
    public readonly id: string,
    public readonly labelEn: string,
    public readonly labelVi: string,
    public readonly level: string, // Nhóm hướng nghiên cứu (e.g. "Phát hiện đa loài", "Đặc trưng giải phẫu")
    public readonly explanation: string,
    public readonly whyImportant: string,
    public readonly papers: AcademicPaper[],
    public readonly selectionReason: string = "", // Vì sao AI chọn từ khóa này từ ý tưởng ban đầu của user
    public readonly academicContext: string = "", // Bối cảnh học thuật & thách thức kỹ thuật chuyên sâu
    public readonly searchQuery: string = "" // Cú pháp truy vấn quốc tế chuẩn mực (Scopus, IEEE Xplore, Google Scholar)
  ) {}

  public hasFoundationalPapers(): boolean {
    return this.papers.length > 0;
  }

  public findPaperById(paperId: string): AcademicPaper | undefined {
    return this.papers.find((p) => p.id === paperId);
  }
}
