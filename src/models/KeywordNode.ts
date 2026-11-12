import { AcademicPaper } from "./AcademicPaper";

/**
 * Domain Entity representing an Academic Keyword Node on the Map (F1.1 & F1.2)
 */
export class KeywordNode {
  constructor(
    public readonly id: string,
    public readonly labelEn: string,
    public readonly labelVi: string,
    public readonly level: string,
    public readonly explanation: string,
    public readonly whyImportant: string,
    public readonly papers: AcademicPaper[]
  ) {}

  public hasFoundationalPapers(): boolean {
    return this.papers.length > 0;
  }

  public findPaperById(paperId: string): AcademicPaper | undefined {
    return this.papers.find((p) => p.id === paperId);
  }
}
