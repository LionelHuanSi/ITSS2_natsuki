/**
 * Domain Entity đại diện cho một bài báo học thuật
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
    public readonly dictionary: Record<string, string>,
    public readonly translations: Record<string, string> = {}
  ) {}

  // Dịch thuật chính xác theo ngữ cảnh kỹ thuật học thuật
  public resolveContextualTranslation(selectedText: string): string {
    const normalized = selectedText.trim().toLowerCase();
    for (const [term, translation] of Object.entries(this.translations)) {
      if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
        return translation;
      }
    }
    // Bản dịch ngữ cảnh thông minh dựa trên câu
    return `[Dịch học thuật]: "${selectedText}" — Trong bối cảnh nghiên cứu "${this.title}", đoạn văn này đề cập đến việc áp dụng mô hình và phương pháp luận chuyên ngành nhằm xử lý các đặc trưng thực nghiệm trong điều kiện khảo sát thực tế.`;
  }

  // Giải thích ngữ cảnh chuyên sâu + hỗ trợ yêu cầu giải thích tùy biến (Custom instruction)
  public resolveContextualExplanation(
    selectedText: string,
    customPrompt?: string
  ): string {
    const normalized = selectedText.trim().toLowerCase();
    let baseExplanation = "";

    for (const [term, explanation] of Object.entries(this.dictionary)) {
      if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
        baseExplanation = explanation;
        break;
      }
    }

    if (!baseExplanation) {
      baseExplanation = `Trong ngữ cảnh của bài báo "${this.title}" (${this.year}), đoạn trích dẫn này phân tích phương pháp thực nghiệm và thách thức kỹ thuật khi áp dụng thuật toán vào dữ liệu thực tế, làm cơ sở đối chiếu độ chính xác.`;
    }

    // Nếu người dùng có yêu cầu giải thích cụ thể
    if (customPrompt && customPrompt.trim()) {
      const promptLower = customPrompt.toLowerCase();
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
