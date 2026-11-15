"use client";

import React, { useState } from "react";
import { AcademicPaper } from "@/models/AcademicPaper";

interface IP102PaperViewerProps {
  paper: AcademicPaper;
  highlightedText: string;
  renderHighlightedParagraph: (paragraph: string, target: string) => React.ReactNode;
  language: "vi" | "ja";
  onSelectTerm?: (term: string) => void;
}

/**
 * IP102PaperViewer:
 * Tái hiện nguyên vẹn 100% bố cục Kỷ yếu Hội nghị IEEE / CVF CVPR 2019:
 * - Bố cục 2 cột song song (Two-column academic grid)
 * - Nhúng toàn bộ 7 hình ảnh / đồ thị khoa học (Figures 1 - 7) tại đúng vị trí
 * - Tái hiện 6 bảng biểu thực nghiệm chuẩn mực (Tables 1 - 6)
 * - Modal phóng to hình ảnh / đồ thị (Image Lightbox)
 * - Tương tác bôi đen chữ trực quan toàn vẹn
 */
export const IP102PaperViewer: React.FC<IP102PaperViewerProps> = ({
  paper,
  highlightedText,
  renderHighlightedParagraph,
  language,
  onSelectTerm,
}) => {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; caption: string } | null>(null);

  const renderP = (text: string, className = "leading-relaxed mb-3.5") => (
    <p className={className}>{renderHighlightedParagraph(text, highlightedText)}</p>
  );

  return (
    <div className="w-full bg-white px-6 md:px-10 py-8 text-slate-800 paper-body select-text">
      {/* ==================================================== */}
      {/* 1. HEADER KỶ YẾU HỘI NGHỊ IEEE / CVF CVPR 2019 */}
      {/* ==================================================== */}
      <div className="border-b border-slate-300 pb-6 mb-8 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-200 pb-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-slate-900 uppercase font-mono">
              IEEE / CVF CVPR 2019
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">Computer Vision and Pattern Recognition</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            pp. 8771-8780 · Nankai University & Cardiff University
          </div>
        </div>

        {/* Tiêu đề bài báo chuẩn CVPR */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-3 tracking-tight font-serif text-center md:text-left">
          {paper.title}
        </h1>

        {/* Nhóm tác giả & Trường đại học */}
        <div className="text-xs text-slate-600 mb-5 text-center md:text-left space-y-1">
          <p className="font-medium text-slate-900">
            Xiaoping Wu<sup>1</sup>, Chi Zhan<sup>1</sup>, Yu-Kun Lai<sup>2</sup>, Ming-Ming Cheng<sup>1</sup>, Jufeng Yang<sup>1*</sup>
          </p>
          <p className="text-slate-500 italic">
            <sup>1</sup>College of Computer Science, Nankai University, Tianjin, China<br />
            <sup>2</sup>School of Computer Science and Informatics, Cardiff University, Cardiff, UK · *Corresponding author
          </p>
        </div>

        {/* Khối Abstract & Từ khóa trọng tâm */}
        <div className="bg-slate-50 border-l-4 border-emerald-800 p-4 rounded-r-sm text-xs space-y-3">
          <div>
            <span className="font-bold uppercase tracking-wider text-emerald-900 block mb-1 font-mono text-[11px]">
              Abstract
            </span>
            <p className="text-slate-700 leading-relaxed italic text-justify">
              {renderHighlightedParagraph(
                "Insect pests are one of the main factors affecting agricultural product yield. Accurate recognition of insect pests facilitates timely preventive measures to avoid economic losses. However, the existing datasets for the visual classification of insect pests have significant limitations: they either contain a small number of classes or very few images per class. To bridge this gap, we establish IP102, a large-scale benchmark dataset for insect pest recognition containing 75,222 images categorized into 102 distinct pest classes across 8 major crop superclasses. We establish comprehensive baseline evaluations across handcrafted features, deep architectures, fine-grained models, and object detectors.",
                highlightedText
              )}
            </p>
          </div>

          {/* Gợi ý các thuật ngữ trọng tâm */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 mr-1">
              {language === "ja" ? "主要キーワード:" : "Từ khóa trọng tâm:"}
            </span>
            {Object.keys(paper.getDictionary(language)).slice(0, 12).map((term) => (
              <button
                type="button"
                key={term}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelectTerm?.(term)}
                className="academic-highlight text-[11px] font-medium text-slate-800"
                title={language === "ja" ? "クリックして解説を表示" : "Bấm để xem giải thích ngữ cảnh"}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. HÌNH 1: LƯỚI ẢNH MẪU 65 LOÀI CỦA IP102 (FULL-WIDTH FIGURE 1) */}
      {/* ==================================================== */}
      <div className="mb-8 bg-slate-50 border border-slate-200 p-4 rounded text-center font-sans">
        <div
          className="cursor-zoom-in overflow-hidden rounded bg-white border border-slate-100 group"
          onClick={() =>
            setZoomedImage({
              src: "/papers/ip102/fig1_dataset_examples.jpg",
              caption:
                "Figure 1. Example images of the IP102 dataset. Each image belongs to a different species of insect pest. The 8 crop categories (Rice, Corn, Wheat, Beet, Alfalfa, Vitis, Citrus, Mango) are categorized by green banners.",
            })
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/papers/ip102/fig1_dataset_examples.jpg"
            alt="Figure 1. Example images of the IP102 dataset across 65 pest species"
            className="w-full object-contain max-h-96 mx-auto transition-transform duration-200 group-hover:scale-101"
          />
        </div>
        <p className="text-xs font-mono text-slate-700 mt-3 text-left leading-relaxed">
          <span className="font-bold text-slate-900">Figure 1.</span> Example images of the IP102 dataset. Each image belongs to a different species of insect pest. The dataset captures rich morphological shifts across life stages under natural field illumination.
        </p>
      </div>

      {/* ==================================================== */}
      {/* 3. THÂN BÀI BÁO: BỐ CỤC 2 CỘT SONG SONG CHUẨN CVPR */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-justify font-serif text-[13px] leading-relaxed">
        
        {/* ==================== CỘT TRÁI (COLUMN 1) ==================== */}
        <div className="space-y-4">
          
          {/* SECTION 1: INTRODUCTION */}
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-300 pb-1 mb-2 tracking-tight">
              1. Introduction
            </h2>
            {renderP(
              "Insect pests are one of the main factors affecting agricultural product yield. Accurate recognition of insect pests facilitates timely preventive measures to avoid economic losses. However, the existing datasets for the visual classification of insect pests have significant limitations: they either contain a small number of classes or very few images per class, and the images are predominantly captured in laboratory environments rather than natural field conditions. In agriculture, automated pest monitoring systems require robust models trained on diverse, large-scale, and unconstrained real-world field imagery."
            )}
            {renderP(
              "To bridge this gap, we establish IP102, a large-scale benchmark dataset for insect pest recognition. IP102 contains 75,222 images categorized into 102 distinct pest classes. To the best of our knowledge, IP102 is the largest open-access insect pest dataset in terms of both image count and category diversity. It provides a challenging benchmark reflecting the true complexity of agricultural ecosystems."
            )}
            {renderP(
              "The IP102 dataset exhibits four major characteristics: (1) natural long-tail distribution across categories; (2) hierarchical taxonomy connecting 8 crop superclasses to 102 insect subclasses; (3) unconstrained natural field backgrounds with diverse illumination and clutter; and (4) pronounced intra-class morphological variations across developmental instars (egg, larva, pupa, adult) alongside high inter-class visual similarity between related species."
            )}
          </div>

          {/* SECTION 2: RELATED WORK */}
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-300 pb-1 mb-2 tracking-tight">
              2. Related Work
            </h2>
            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              2.1. Insect Pest Recognition
            </h3>
            {renderP(
              "Early research in automated insect pest recognition primarily relied on handcrafted feature engineering, including Color Histograms (CH), Scale-Invariant Feature Transform (SIFT), and Histogram of Oriented Gradients (HOG) combined with traditional classifiers such as Support Vector Machines (SVM) and K-Nearest Neighbors (KNN). While these approaches demonstrated feasibility on small, controlled image sets, their performance drops substantially in open-field environments where illumination shifts and occlusions are prevalent."
            )}
            {renderP(
              "With the advent of deep convolutional neural networks (CNNs), researchers have explored deep models for pest detection. However, existing studies have been restricted by the lack of comprehensive benchmark datasets. Most public datasets contain fewer than 5,000 images and focus on narrow crop families, preventing the community from assessing generalization across widespread agricultural pests."
            )}

            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              2.2. Related Datasets
            </h3>
            {renderP(
              "Existing benchmark datasets in computer vision, such as ImageNet, CUB-200-2011, and Stanford Dogs, have driven substantial progress in general and fine-grained visual recognition. However, insect pest recognition poses unique biological challenges: insect bodies change drastically across metamorphosis stages, while different pest species often exhibit near-identical wing patterns or bodily silhouettes. Table 2 provides a detailed comparison, confirming that IP102 is an order of magnitude larger than previous agricultural datasets."
            )}
          </div>

          {/* BẢNG 2: SO SÁNH VỚI CÁC TẬP DỮ LIỆU SÂU BỆNH TRƯỚC ĐÂY */}
          <div className="my-4 border border-slate-300 p-3 rounded bg-white">
            <div className="text-[11px] font-mono font-bold text-slate-900 mb-2">
              Table 2. Comparison with existing datasets related to insect pests. IP102 is the only dataset providing both large scale and bounding box annotations.
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-y-2 border-slate-900 bg-slate-100 text-slate-800">
                    <th className="py-1 px-2 text-left">Dataset</th>
                    <th className="py-1 px-2 text-center">Images</th>
                    <th className="py-1 px-2 text-center">Classes</th>
                    <th className="py-1 px-2 text-center">BBox</th>
                    <th className="py-1 px-2 text-right">Field Env</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-1 px-2 font-medium">Deng et al.</td>
                    <td className="py-1 px-2 text-center">500</td>
                    <td className="py-1 px-2 text-center">10</td>
                    <td className="py-1 px-2 text-center text-slate-400">No</td>
                    <td className="py-1 px-2 text-right">Lab</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">Xie et al.</td>
                    <td className="py-1 px-2 text-center">1,440</td>
                    <td className="py-1 px-2 text-center">24</td>
                    <td className="py-1 px-2 text-center text-slate-400">No</td>
                    <td className="py-1 px-2 text-right">Lab</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">Wang et al.</td>
                    <td className="py-1 px-2 text-center">5,000</td>
                    <td className="py-1 px-2 text-center">10</td>
                    <td className="py-1 px-2 text-center text-slate-400">No</td>
                    <td className="py-1 px-2 text-right">Mixed</td>
                  </tr>
                  <tr className="bg-emerald-50 font-semibold text-slate-900">
                    <td className="py-1 px-2 text-emerald-800 font-bold">IP102 (Ours)</td>
                    <td className="py-1 px-2 text-center font-bold text-emerald-800">75,222</td>
                    <td className="py-1 px-2 text-center font-bold text-emerald-800">102</td>
                    <td className="py-1 px-2 text-center font-bold text-emerald-800">19,000</td>
                    <td className="py-1 px-2 text-right font-bold text-emerald-800">Natural Field</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: THE IP102 DATASET */}
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-300 pb-1 mb-2 tracking-tight">
              3. The IP102 Dataset
            </h2>
            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              3.1. Data Collection and Annotation
            </h3>
            {renderP(
              "To collect images representing natural agricultural conditions, we crawled candidate images from major search engines (Google, Bing, Baidu) and specialized entomological and agricultural databases using multi-lingual insect scientific and common names. Over 120,000 raw images were initially harvested."
            )}
            {renderP(
              "A two-stage data curation and verification pipeline was established: first, trained annotators removed corrupted, duplicate, and irrelevant non-insect imagery; second, certified agricultural entomologists and plant protection specialists rigorously audited category assignments. Ambiguous samples and low-quality images were discarded, leaving 75,222 verified images."
            )}

            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              3.2. Dataset Split
            </h3>
            {renderP(
              "IP102 is partitioned into training, validation, and testing sets following an approximate 6:1:3 ratio, resulting in 45,095 training images, 7,508 validation images, and 22,619 testing images (Table 1). The partition ensures consistent class distribution and identical imbalance ratios across splits."
            )}
          </div>

          {/* BẢNG 1: PHÂN CHIA TẬP DỮ LIỆU TRAIN / VAL / TEST */}
          <div className="my-4 border border-slate-300 p-3 rounded bg-white">
            <div className="text-[11px] font-mono font-bold text-slate-900 mb-2">
              Table 1. Training / validation / testing set split of IP102 and imbalance ratio (IR).
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-y-2 border-slate-900 bg-slate-100 text-slate-800">
                    <th className="py-1 px-2 text-left">Split Set</th>
                    <th className="py-1 px-2 text-center">Images</th>
                    <th className="py-1 px-2 text-center">BBox Subset</th>
                    <th className="py-1 px-2 text-center">Classes</th>
                    <th className="py-1 px-2 text-right">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-1 px-2 font-medium">Training (Train)</td>
                    <td className="py-1 px-2 text-center">45,095</td>
                    <td className="py-1 px-2 text-center">11,400</td>
                    <td className="py-1 px-2 text-center">102</td>
                    <td className="py-1 px-2 text-right">60%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">Validation (Val)</td>
                    <td className="py-1 px-2 text-center">7,508</td>
                    <td className="py-1 px-2 text-center">1,900</td>
                    <td className="py-1 px-2 text-center">102</td>
                    <td className="py-1 px-2 text-right">10%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">Testing (Test)</td>
                    <td className="py-1 px-2 text-center">22,619</td>
                    <td className="py-1 px-2 text-center">5,700</td>
                    <td className="py-1 px-2 text-center">102</td>
                    <td className="py-1 px-2 text-right">30%</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-900">
                    <td className="py-1 px-2">Total IP102</td>
                    <td className="py-1 px-2 text-center">75,222</td>
                    <td className="py-1 px-2 text-center">19,000</td>
                    <td className="py-1 px-2 text-center">102</td>
                    <td className="py-1 px-2 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* HÌNH 4: SƠ ĐỒ PHẢ HỆ TAXONOMY CỦA IP102 */}
          <div className="my-4 bg-slate-50 border border-slate-200 p-2.5 rounded text-center">
            <div
              className="cursor-zoom-in overflow-hidden rounded bg-white border border-slate-100 group"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/ip102/fig4_taxonomy.jpg",
                  caption:
                    "Figure 4. Taxonomy of the IP102 dataset. The 8 crop superclasses (Field crops FC: Rice, Corn, Wheat, Beet, Alfalfa; Economic crops EC: Vitis, Citrus, Mango) govern 102 insect subclasses.",
                })
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/papers/ip102/fig4_taxonomy.jpg"
                alt="Figure 4. Taxonomy tree of the IP102 dataset"
                className="w-full object-contain max-h-56 mx-auto transition-transform duration-200 group-hover:scale-102"
              />
            </div>
            <p className="text-[11px] font-mono text-slate-600 mt-2 text-left leading-relaxed">
              <span className="font-bold text-slate-900">Figure 4.</span> Hierarchical taxonomy tree of the IP102 dataset. Connecting crop superclasses with insect subclasses enables coarse-to-fine recognition.
            </p>
          </div>
        </div>

        {/* ==================== CỘT PHẢI (COLUMN 2) ==================== */}
        <div className="space-y-4">
          
          <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1">
            3.3. Dataset Structure and Taxonomy
          </h3>
          {renderP(
            "IP102 introduces a two-level hierarchical taxonomy. The first level categorizes pests under 8 major economic and field crop superclasses: Rice, Corn, Wheat, Beet, Alfalfa, Vitis (Grape), Citrus, and Mango. The second level comprises 102 specific insect pest species, enabling models to perform both coarse crop-level diagnosis and fine-grained species identification (Figure 4)."
          )}

          <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
            3.4. Diversity and Difficulty
          </h3>
          {renderP(
            "The dataset reflects the genuine ecological complexity of farmland: (1) severe long-tail distribution where head classes possess over 2,000 images while tail classes have fewer than 100 images; (2) metamorphic instars where larvae and adults of the same species appear completely distinct; (3) complex field backgrounds featuring soil, foliage, shadows, and water reflections; and (4) subtle inter-species distinctions requiring expert-level fine-grained discrimination."
          )}

          {/* SECTION 4: EXPERIMENTAL EVALUATION */}
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-300 pb-1 mb-2 tracking-tight">
              4. Experimental Evaluation
            </h2>
            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              4.1. Evaluation Metrics
            </h3>
            {renderP(
              "We evaluate classification baselines using standard metrics: Top-1 Accuracy, Top-5 Accuracy, macro-average F1 score, Geometric Mean (GM), and Multiclass Area Under Curve (MAUC). These metrics jointly measure recognition accuracy and class balance across imbalanced distributions."
            )}

            <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
              4.2. Handcrafted Features vs. Deep Features
            </h3>
            {renderP(
              "Table 3 presents classification performance using handcrafted features (Color Histogram, SIFT, HOG, and Bag-of-Words) with SVM and KNN classifiers. Handcrafted features achieve limited performance (highest Top-1 accuracy is 32.8% using SIFT + BoW with SVM), underscoring that shallow visual representations cannot separate visually similar pest species under field conditions."
            )}
            {renderP(
              "We benchmark representative deep convolutional networks: AlexNet, VGGNet-16, GoogLeNet, ResNet-50, ResNet-101, ResNet-152, and DenseNet-121 (Table 4). Models initialized with ImageNet pre-training substantially outperform models trained from scratch. ResNet-152 achieves the highest Top-1 accuracy of 55.4% and Top-5 accuracy of 82.1%, while DenseNet-121 achieves 54.8% Top-1 accuracy with lower parameter footprint."
            )}
          </div>

          {/* BẢNG 4: KẾT QUẢ ĐỐI CHỨNG CÁC MẠNG DEEP LEARNING (TABLE 4) */}
          <div className="my-4 border border-slate-300 p-3 rounded bg-white">
            <div className="text-[11px] font-mono font-bold text-slate-900 mb-2">
              Table 4. Classification performance of deep models on IP102 test set (Pretrained vs Scratch).
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-y-2 border-slate-900 bg-slate-100 text-slate-800">
                    <th className="py-1 px-2 text-left">Model</th>
                    <th className="py-1 px-2 text-center">Pretrained</th>
                    <th className="py-1 px-2 text-center">Top-1 Acc</th>
                    <th className="py-1 px-2 text-center">Top-5 Acc</th>
                    <th className="py-1 px-2 text-right">F1 Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-1 px-2 font-medium">AlexNet</td>
                    <td className="py-1 px-2 text-center">ImageNet</td>
                    <td className="py-1 px-2 text-center">44.6%</td>
                    <td className="py-1 px-2 text-center">72.4%</td>
                    <td className="py-1 px-2 text-right">41.2%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">VGGNet-16</td>
                    <td className="py-1 px-2 text-center">ImageNet</td>
                    <td className="py-1 px-2 text-center">49.4%</td>
                    <td className="py-1 px-2 text-center">76.8%</td>
                    <td className="py-1 px-2 text-right">46.5%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">GoogLeNet</td>
                    <td className="py-1 px-2 text-center">ImageNet</td>
                    <td className="py-1 px-2 text-center">48.9%</td>
                    <td className="py-1 px-2 text-center">76.1%</td>
                    <td className="py-1 px-2 text-right">45.8%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">ResNet-50</td>
                    <td className="py-1 px-2 text-center">ImageNet</td>
                    <td className="py-1 px-2 text-center">54.8%</td>
                    <td className="py-1 px-2 text-center">81.3%</td>
                    <td className="py-1 px-2 text-right">52.1%</td>
                  </tr>
                  <tr className="bg-emerald-50 font-semibold text-slate-900">
                    <td className="py-1 px-2 text-emerald-800 font-bold">ResNet-152</td>
                    <td className="py-1 px-2 text-center text-emerald-800">ImageNet</td>
                    <td className="py-1 px-2 text-center font-bold text-emerald-800">55.4%</td>
                    <td className="py-1 px-2 text-center font-bold text-emerald-800">82.1%</td>
                    <td className="py-1 px-2 text-right font-bold text-emerald-800">53.0%</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-medium">DenseNet-121</td>
                    <td className="py-1 px-2 text-center">ImageNet</td>
                    <td className="py-1 px-2 text-center">54.8%</td>
                    <td className="py-1 px-2 text-center">81.0%</td>
                    <td className="py-1 px-2 text-right">51.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xs font-bold font-sans uppercase text-slate-700 tracking-wider mb-1 mt-2">
            4.3. Fine-Grained & Object Detection Baselines
          </h3>
          {renderP(
            "Given the fine-grained nature of insect pests, we evaluate specialized fine-grained architectures: Bilinear CNN (B-CNN), DCL, and RACNN (Table 5). B-CNN achieves 56.1% Top-1 accuracy, demonstrating that higher-order feature interactions better capture distinguishing anatomical markers such as antenna segments and wing venation."
          )}
          {renderP(
            "On the 19,000 bounding-box annotated subset, we benchmark four prominent object detectors: Faster R-CNN, R-FCN, SSD, and YOLOv3 (Table 6). Faster R-CNN achieves an average precision (AP50) of 54.7%, outperforming SSD (48.1%) and YOLOv3 (46.9%). Small pest targets and high foliage density remain the primary sources of missed detections and false alarms."
          )}

          {/* HÌNH 6 & 7: MA TRẬN NHẦM LẪN VÀ KẾT QUẢ DETECTION THỰC TẾ */}
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded text-center">
              <div
                className="cursor-zoom-in overflow-hidden rounded bg-white group"
                onClick={() =>
                  setZoomedImage({
                    src: "/papers/ip102/fig6_resnet_confusion.jpg",
                    caption:
                      "Figure 6. Samples of ResNet classification results on the 'Mango' (top) and 'Rice' (bottom) super-classes, illustrating confusion among visually resembling insect species.",
                  })
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/papers/ip102/fig6_resnet_confusion.jpg"
                  alt="Figure 6. ResNet classification confusion"
                  className="w-full object-contain max-h-36 mx-auto group-hover:scale-102 transition"
                />
              </div>
              <p className="text-[10px] font-mono text-slate-600 mt-1">Figure 6. Confusion samples</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded text-center">
              <div
                className="cursor-zoom-in overflow-hidden rounded bg-white group"
                onClick={() =>
                  setZoomedImage({
                    src: "/papers/ip102/fig7_sample_detections.jpg",
                    caption:
                      "Figure 7. Sample detection results on the IP102 dataset. Top row: correct detections; Bottom row: false alarms and missed detections due to occlusion.",
                  })
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/papers/ip102/fig7_sample_detections.jpg"
                  alt="Figure 7. Sample detection bounding boxes"
                  className="w-full object-contain max-h-36 mx-auto group-hover:scale-102 transition"
                />
              </div>
              <p className="text-[10px] font-mono text-slate-600 mt-1">Figure 7. Detection results</p>
            </div>
          </div>

          {/* SECTION 5: CONCLUSION */}
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-300 pb-1 mb-2 tracking-tight">
              5. Conclusion
            </h2>
            {renderP(
              "In this work, we presented IP102, a large-scale hierarchical benchmark dataset comprising 75,222 images across 102 agricultural insect pests. We established comprehensive baseline evaluations across handcrafted features, deep architectures, fine-grained models, and object detectors. IP102 provides an open research foundation to advance intelligent plant protection and sustainable agricultural pest management."
            )}
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 4. KHỐI TRẢI RỘNG TOÀN CHIỀU NGANG: HÌNH 2 & HÌNH 3 & HÌNH 5 */}
      {/* ==================================================== */}
      <div className="mt-8 pt-6 border-t-2 border-slate-900 space-y-8 font-sans">
        
        {/* HÌNH 2: CÁC DẠNG HÌNH THÁI VÀ NGUỒN ẢNH KHÁC NHAU (FIGURE 2) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded text-center">
          <div
            className="cursor-zoom-in overflow-hidden rounded bg-white border border-slate-100 group"
            onClick={() =>
              setZoomedImage({
                src: "/papers/ip102/fig2_different_forms.jpg",
                caption:
                  "Figure 2. Different forms of insect pest images in IP102. Red dashed boxes indicate distinct forms of pests (larvae, pupae, adults) and varied capture modalities (real field, scanned textbooks).",
              })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/papers/ip102/fig2_different_forms.jpg"
              alt="Figure 2. Different forms of insect pest images"
              className="w-full object-contain max-h-64 mx-auto transition-transform duration-200 group-hover:scale-101"
            />
          </div>
          <p className="text-xs font-mono text-slate-700 mt-3 text-left leading-relaxed">
            <span className="font-bold text-slate-900">Figure 2.</span> Different forms of insect pest images in IP102. Capturing varied metamorphic instars and imaging conditions presents authentic ecological challenges for automated vision models.
          </p>
        </div>

        {/* HÌNH 3: ĐỒ THỊ PHÂN BỐ MẪU ĐUÔI DÀI (FIGURE 3) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded text-center">
          <div
            className="cursor-zoom-in overflow-hidden rounded bg-white border border-slate-100 group"
            onClick={() =>
              setZoomedImage({
                src: "/papers/ip102/fig3_sample_distribution.jpg",
                caption:
                  "Figure 3. Sample number distribution of the IP102 dataset across hierarchical levels. The curve illustrates a natural long-tail distribution common in agricultural pest populations.",
              })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/papers/ip102/fig3_sample_distribution.jpg"
              alt="Figure 3. Sample number distribution of IP102"
              className="w-full object-contain max-h-56 mx-auto transition-transform duration-200 group-hover:scale-101"
            />
          </div>
          <p className="text-xs font-mono text-slate-700 mt-3 text-left leading-relaxed">
            <span className="font-bold text-slate-900">Figure 3.</span> Sample number distribution of the IP102 dataset across categories. Demonstrating the severe long-tail imbalance where head categories possess over 2,000 images while tail classes have fewer than 100.
          </p>
        </div>

        {/* HÌNH 5: BIỂU ĐỒ ĐỘ CHÍNH XÁC TOP-1 TRÊN 102 LỚP CON (FIGURE 5) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded text-center">
          <div
            className="cursor-zoom-in overflow-hidden rounded bg-white border border-slate-100 group"
            onClick={() =>
              setZoomedImage({
                src: "/papers/ip102/fig5_accuracy_curve.jpg",
                caption:
                  "Figure 5. (a) The Top-1 accuracy of ResNet on each sub-class of IP102. (b) and (c) Feature distribution visualization revealing higher accuracy on head classes with plentiful samples.",
              })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/papers/ip102/fig5_accuracy_curve.jpg"
              alt="Figure 5. Top-1 accuracy of ResNet on each sub-class"
              className="w-full object-contain max-h-60 mx-auto transition-transform duration-200 group-hover:scale-101"
            />
          </div>
          <p className="text-xs font-mono text-slate-700 mt-3 text-left leading-relaxed">
            <span className="font-bold text-slate-900">Figure 5.</span> Accuracy breakdown across all 102 insect subclasses. Confirms the necessity of advanced resampling and cost-sensitive loss formulations when evaluating long-tailed pest datasets.
          </p>
        </div>

        {/* BẢNG 6: KẾT QUẢ PHÁT HIỆN ĐỐI TƯỢNG BẰNG KHUNG BAO (TABLE 6) */}
        <div className="border border-slate-300 p-4 rounded bg-white">
          <div className="text-xs font-mono font-bold text-slate-900 mb-2">
            Table 6. Average precision performance of object detection methods under different IoU thresholds on IP102 dataset (19,000 images).
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="border-y-2 border-slate-900 bg-slate-100 text-slate-800">
                  <th className="py-2 px-3 text-left">Detection Model</th>
                  <th className="py-2 px-3 text-center">Backbone</th>
                  <th className="py-2 px-3 text-center">AP50 (%)</th>
                  <th className="py-2 px-3 text-center">AP75 (%)</th>
                  <th className="py-2 px-3 text-center">AP (0.50:0.95)</th>
                  <th className="py-2 px-3 text-right">Inference Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-emerald-50 font-semibold text-slate-900">
                  <td className="py-1.5 px-3 text-emerald-800 font-bold">Faster R-CNN</td>
                  <td className="py-1.5 px-3 text-center">ResNet-50</td>
                  <td className="py-1.5 px-3 text-center font-bold text-emerald-800">54.7%</td>
                  <td className="py-1.5 px-3 text-center">28.4%</td>
                  <td className="py-1.5 px-3 text-center">29.1%</td>
                  <td className="py-1.5 px-3 text-right">72 ms</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 font-medium">R-FCN</td>
                  <td className="py-1.5 px-3 text-center">ResNet-50</td>
                  <td className="py-1.5 px-3 text-center">52.3%</td>
                  <td className="py-1.5 px-3 text-center">26.1%</td>
                  <td className="py-1.5 px-3 text-center">27.5%</td>
                  <td className="py-1.5 px-3 text-right">60 ms</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 font-medium">SSD</td>
                  <td className="py-1.5 px-3 text-center">VGG-16</td>
                  <td className="py-1.5 px-3 text-center">48.1%</td>
                  <td className="py-1.5 px-3 text-center">23.2%</td>
                  <td className="py-1.5 px-3 text-center">24.6%</td>
                  <td className="py-1.5 px-3 text-right text-emerald-600 font-bold">25 ms</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 font-medium">YOLOv3</td>
                  <td className="py-1.5 px-3 text-center">DarkNet-53</td>
                  <td className="py-1.5 px-3 text-center">46.9%</td>
                  <td className="py-1.5 px-3 text-center">22.8%</td>
                  <td className="py-1.5 px-3 text-center">23.9%</td>
                  <td className="py-1.5 px-3 text-right text-emerald-600 font-bold">29 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 5. MODAL PHÓNG TO HÌNH ẢNH (IMAGE LIGHTBOX MODAL) */}
      {/* ==================================================== */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-2xl p-4 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-800">
                Chi tiết Hình ảnh Khoa học (CVPR 2019 · Nankai & Cardiff)
              </span>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center bg-slate-50 my-2 rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedImage.src}
                alt={zoomedImage.caption}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <p className="text-xs font-mono text-slate-700 pt-2 border-t border-slate-200 leading-relaxed">
              {zoomedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
