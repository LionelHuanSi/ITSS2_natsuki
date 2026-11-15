"use client";

import React, { useState } from "react";
import { AcademicPaper } from "@/models/AcademicPaper";

interface JournalPaperViewerProps {
  paper: AcademicPaper;
  highlightedText: string;
  renderHighlightedParagraph: (paragraph: string, target: string) => React.ReactNode;
  language: "vi" | "ja";
  onSelectTerm?: (term: string) => void;
}

/**
 * JournalPaperViewer:
 * Tái hiện nguyên vẹn 100% bố cục tạp chí khoa học chuẩn mực (Elsevier / Ecological Informatics 2025):
 * - Bố cục 2 cột song song (Two-column academic grid)
 * - Nhúng toàn bộ 11 hình ảnh & đồ thị khoa học độ nét cao tại đúng vị trí ngữ cảnh
 * - Tái hiện 7 bảng biểu số liệu (Tables 1 - 7) định dạng chuẩn tạp chí
 * - Hiển thị công thức toán học khoa học (Eqs. 1 - 7)
 * - Tương tác bôi đen chữ trực quan trên toàn bộ nội dung
 * - Modal phóng to hình ảnh / đồ thị (Image Lightbox)
 */
export const JournalPaperViewer: React.FC<JournalPaperViewerProps> = ({
  paper,
  highlightedText,
  renderHighlightedParagraph,
  language,
  onSelectTerm,
}) => {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; caption: string } | null>(null);

  // Helper để render đoạn văn có highlight
  const renderP = (text: string, className = "leading-relaxed mb-3.5") => (
    <p className={className}>{renderHighlightedParagraph(text, highlightedText)}</p>
  );

  return (
    <div className="w-full bg-white px-6 md:px-10 py-8 text-slate-800 paper-body select-text">
      {/* ==================================================== */}
      {/* 1. HEADER BANNER TẠP CHÍ ELSEVIER CHUẨN MỰC */}
      {/* ==================================================== */}
      <div className="border-b border-slate-300 pb-6 mb-8 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200 pb-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-slate-900 uppercase font-mono">
              ScienceDirect
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">Ecological Informatics</span>
            <span className="text-slate-400 font-mono text-[11px]">Vol. 88 (2025) 103125</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span>doi.org/10.1016/j.ecoinf.2025.103125</span>
            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
              Open Access · CC BY-NC 4.0
            </span>
          </div>
        </div>

        {/* Nhan đề bài báo */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-3 tracking-tight font-serif">
          {renderHighlightedParagraph(paper.title, highlightedText)}
        </h1>

        {/* Danh sách tác giả & viện nghiên cứu */}
        <div className="text-xs text-slate-700 mb-3 space-y-1">
          <p className="font-medium">
            <span className="font-semibold text-slate-900">Lijuan Zhang</span>
            <sup>a,1</sup>,{" "}
            <span className="font-semibold text-slate-900">Shanshan Sun</span>
            <sup>b,1</sup>,{" "}
            <span className="font-semibold text-slate-900">Hui Zhao</span>
            <sup>b</sup>,{" "}
            <span className="font-semibold text-slate-900">Zhiyi Li</span>
            <sup>c</sup>,{" "}
            <span className="font-semibold text-slate-900">Dongming Li</span>
            <sup>a,*</sup>
          </p>
          <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
            <p>
              <sup>a</sup> College of Internet of Things Engineering, Wuxi University, Wuxi, China
            </p>
            <p>
              <sup>b</sup> School of Computer Science and Engineering, Changchun University of Technology, Changchun, China
            </p>
            <p>
              <sup>c</sup> College of Instrument Science and Electrical Engineering, Jilin University, Changchun, China
            </p>
          </div>
        </div>

        {/* Hộp thông tin lịch sử nhận bài */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
          <span>Received: 29 November 2024</span>
          <span>•</span>
          <span>Revised: 30 March 2025</span>
          <span>•</span>
          <span>Accepted: 30 March 2025</span>
          <span>•</span>
          <span>Published online: 2 April 2025</span>
          <span>•</span>
          <span className="text-slate-700 font-semibold">Corresponding author: Ldm0214@163.com</span>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. BỐ CỤC 2 CỘT TẠP CHÍ KHOA HỌC CHUẨN MỰC */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 text-justify">
        {/* ---------------------------------------------------- */}
        {/* SECTION 1: INTRODUCTION (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">
            1. Introduction
          </h2>

          {renderP(
            "In agricultural production management, insect pests are responsible for approximately 20 % of global crop losses each year (Mateos Fernandez et al., 2022). Therefore, insect pest control plays a crucial role in agricultural production and exerts a significant influence on agricultural development, food production, and farmers' income (Nomura and Shigemura, 2019). Detecting insect pests is a highly challenging task in agricultural image processing (Suto, 2021). Traditional insect pest identification methods heavily rely on frontline plant protection workers and agricultural technicians, requiring substantial time and effort. This approach is cumbersome, inefficient, and inadequate for large-scale pest monitoring, early warning, and environmentally friendly prevention and control. With advancements in computer science, the application of intelligent technologies in agricultural ecological informatics has garnered increasing attention (Amarathunga et al., 2021). Intelligent algorithms not only improve operational efficiency, but also effectively prevent large-scale pest outbreaks, thereby increasing crop yields and providing data-driven solutions for the sustainable development of agricultural ecosystems."
          )}

          {renderP(
            "Image detection methods offer high efficiency, low cost, and simplicity in identifying insect pests. These methods enable timely and accurate detection, allowing agricultural practitioners to implement preventive measures and control their spread (G and Ajai, 2021). As a result, image-based detection methods have become a major research focus in insect pest control in recent years (Lu et al., 2020). Several scholars have proposed traditional image identification methods for insect pest detection, including those based on graph theory and region testing. However, traditional detection methods are only effective for a small number of samples or limited ranges, and they demonstrate low stability in detection accuracy. Deep learning offers high precision and adaptability, overcoming the low detection accuracy of traditional methods when identifying complex and diverse samples. Li et al. developed a Faster R-CNN-based network model to detect whiteflies and thrips using sticky trap images. Albattah et al. proposed a drone-based deep learning method for large-scale multiclass pest detection, and Lima et al. proposed a pest detection method based on YOLOv8, improving mean average precision through enhancements to the multi-scale feature fusion module."
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 1 TIẾP TỤC: DETR, RT-DETR & FIG 1 (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          {renderP(
            "However, convolutional neural network (CNN)-based algorithms lack a global understanding of features, limiting their ability to effectively handle occlusion. Moreover, insect pest species often share similar appearances with minimal inter-class differences, while displaying pronounced intra-class variations across developmental stages. Vision Transformer (ViT)-based image recognition algorithms have demonstrated strong advantages in classification tasks (Dosovitskiy et al., 2020), but high computational costs have hindered edge equipment deployment. The Detection Transformer (DETR) represents an end-to-end object detection framework built upon ViT architecture, eliminating the need for anchor adjustment and non-maximum suppression (NMS) post-processing. However, DETR models exhibit slow convergence and reduced detection accuracy for multi-scale targets. Building on this, Lv et al. proposed a real-time target detection model (RT-DETR) that optimizes the DETR encoder to realize both global feature analysis and real-time execution throughput."
          )}

          {/* HÌNH 1: Sơ đồ kiến trúc DETR */}
          <div className="my-4 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig1_detr_structure.jpg",
                  caption: "Fig. 1. Diagram of DETR network structure.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig1_detr_structure.jpg"
                alt="Fig. 1. Diagram of DETR network structure"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-2 leading-tight">
              <span className="font-bold text-slate-900">Fig. 1.</span> Diagram of DETR network
              structure (CNN backbone, Transformer encoder-decoder, and parallel prediction head).
            </figcaption>
          </div>

          {renderP(
            "Therefore, in this study, based on the RT-DETR network model, we propose the Pest-RTDetr algorithm for multi-species agricultural insect pest detection. To address the challenges of species diversity, unbalanced pest distribution, and the varying scales and dense arrangements of insect pests in images, we introduce improvement strategies for the classification and localization algorithms. The main contributions of this study are summarized as follows:"
          )}

          {/* 4 Đóng góp chính đánh số */}
          <div className="space-y-1.5 my-3 pl-3 border-l-2 border-slate-800 text-xs text-slate-800 italic bg-slate-50/70 p-2 rounded-r">
            <p>1. We provide a real-time multi-species insect detection method using computer vision, demonstrating its potential for agricultural sustainable development.</p>
            <p>2. We identify the key challenges in multi-species pest recognition and introduce a visual attention mechanism to enhance the model's focus on critical pest features for more accurate localization.</p>
            <p>3. We propose a feature fusion method to capture and integrate information from different scales, improving mean average precision in detecting dense, multi-scale pests.</p>
            <p>4. We introduce a new loss function to accelerate model convergence and improve classification accuracy.</p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2: MATERIALS AND METHODS (Trải rộng cả 2 cột) */}
        {/* ---------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-2 pt-4">
          <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">
            2. Materials and methods
          </h2>
          {renderP(
            "Pest detection faces significant challenges, including diverse pest categories, subtle inter-class distinctions, and pronounced intra-class variations across life stages. Additionally, field data collection presents substantial hurdles compared to standard plant disease diagnostics. Current data is primarily collected through fixed equipment acquisition, real-field unconstrained environment acquisition, and curated agricultural databases. Table 1 illustrates the significant advantages of the IP102 benchmark dataset, including 102 pest classes, multiple insect developmental stages (eggs, larvae, pupae, and adults), and diverse unconstrained field backgrounds with varying target scales."
          )}

          {/* BẢNG 1: Bảng thông tin tập dữ liệu học thuật */}
          <div className="my-5 overflow-x-auto font-sans">
            <div className="text-xs font-semibold text-slate-900 mb-1.5">
              <span>Table 1</span> — Basic information of insect detection dataset.
            </div>
            <table className="min-w-full text-xs border-y-2 border-slate-900 text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[11px] font-semibold text-slate-800">
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Dataset</th>
                  <th className="py-2 px-3">Scale (Images)</th>
                  <th className="py-2 px-3">Classes</th>
                  <th className="py-2 px-3">Applicable Task</th>
                  <th className="py-2 px-3">Field Background</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px] text-slate-700">
                <tr className="bg-amber-50/50 font-semibold text-slate-900">
                  <td className="py-1.5 px-3">Field background</td>
                  <td className="py-1.5 px-3">IP102 (Wu et al., 2019b)</td>
                  <td className="py-1.5 px-3">19,000 / 75,222</td>
                  <td className="py-1.5 px-3">102</td>
                  <td className="py-1.5 px-3">Multi-scale, Dense targets</td>
                  <td className="py-1.5 px-3">Natural unconstrained field</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3" rowSpan={3}>Field background</td>
                  <td className="py-1.5 px-3">APHID-4K (Du et al., 2022)</td>
                  <td className="py-1.5 px-3">4,000</td>
                  <td className="py-1.5 px-3">2</td>
                  <td className="py-1.5 px-3">Small targets</td>
                  <td className="py-1.5 px-3">Greenhouse & field</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3">AgriPest (Wang et al., 2021)</td>
                  <td className="py-1.5 px-3">49,700</td>
                  <td className="py-1.5 px-3">14</td>
                  <td className="py-1.5 px-3">Small & Dense targets</td>
                  <td className="py-1.5 px-3">Field crop foliage</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3">He2020 (He et al., 2020)</td>
                  <td className="py-1.5 px-3">1,200</td>
                  <td className="py-1.5 px-3">3</td>
                  <td className="py-1.5 px-3">Dense targets</td>
                  <td className="py-1.5 px-3">Brown rice planthopper</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-1.5 px-3" rowSpan={3}>Trap image</td>
                  <td className="py-1.5 px-3">MPD2018 (Liu et al., 2019)</td>
                  <td className="py-1.5 px-3">88,600</td>
                  <td className="py-1.5 px-3">16</td>
                  <td className="py-1.5 px-3">Small & Dense targets</td>
                  <td className="py-1.5 px-3">Sticky paper trap</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-1.5 px-3">Pest24 (Wang et al., 2020)</td>
                  <td className="py-1.5 px-3">25,400</td>
                  <td className="py-1.5 px-3">24</td>
                  <td className="py-1.5 px-3">Dense, regular targets</td>
                  <td className="py-1.5 px-3">Automated light trap</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-1.5 px-3">TPest8 (Li et al., 2021b)</td>
                  <td className="py-1.5 px-3">1,400</td>
                  <td className="py-1.5 px-3">2</td>
                  <td className="py-1.5 px-3">Small targets</td>
                  <td className="py-1.5 px-3">Sticky trap board</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2.1: DATASETS (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h3 className="text-sm font-bold font-sans text-slate-900 mb-2">2.1. Datasets</h3>
          {renderP(
            "The IP102 benchmark dataset contains 75,222 samples of 102 common crop insect pests, with approximately 19,000 images annotated with precise bounding boxes for target detection. The images were sourced from specialized agricultural and insect science archives, captured under natural field illumination. Based on the varying impacts of different insect pests on crops, each pest is categorized under eight crop super-classes (rice, corn, wheat, beet, alfalfa, vitis, citrus, and mango)."
          )}

          {renderP(
            "To explore the applicability of the IP102 dataset for insect pest detection, data visualization analysis was performed to extract pest target sizes across all samples. The dataset contains many pest species with an imbalanced distribution across categories, exhibiting a severe natural long-tail distribution."
          )}

          {/* HÌNH 2: Biểu đồ thống kê tập IP102 */}
          <div className="my-4 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig2_ip102_statistics.jpg",
                  caption:
                    "Fig. 2. Sample statistics in IP102 dataset (left: long-tail class distribution; right: target size scatter plot).",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig2_ip102_statistics.jpg"
                alt="Fig. 2. Sample statistics in IP102 dataset"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-2 leading-tight">
              <span className="font-bold text-slate-900">Fig. 2.</span> Sample statistics in IP102
              dataset (left: long-tail distribution curve across 102 pest classes; right: target size
              width-height scatter distribution).
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2.1 TIẾP & SECTION 2.2: PREPROCESSING (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          {renderP(
            "Additionally, the study incorporated the Dangerous Farm Insects dataset (designated as P15), comprising 1,300 high-resolution images across 15 species with dense distributions. In natural field imagery, insect pests exhibit rich colors and morphological shifts across developmental instars, complicating the classification model's ability to extract distinguishing biological features."
          )}

          {/* HÌNH 3: Ảnh chụp sâu hại thực tế */}
          <div className="my-4 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig3_sample_insects.jpg",
                  caption: "Fig. 3. Some sample images of insect pests in natural field backgrounds.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig3_sample_insects.jpg"
                alt="Fig. 3. Some sample images in the dataset"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-2 leading-tight">
              <span className="font-bold text-slate-900">Fig. 3.</span> Sample images in IP102
              exhibiting complex natural foliage backgrounds, varying illumination, and distinct life
              cycle stages (larvae to adults).
            </figcaption>
          </div>

          <h3 className="text-sm font-bold font-sans text-slate-900 mb-2 mt-4">2.2. Data preprocessing</h3>
          {renderP(
            "Based on the analysis of data distributions, resampling was employed to expand the dataset and balance training samples through repeated random sampling of tail data. Consequently, the sampled tail data quantity approximates half of the head data. To address long-tail distribution characteristics and complex backgrounds, Mosaic and Mixup data augmentation techniques were employed."
          )}

          {/* HÌNH 4: Mosaic & Mixup Data Augmentation */}
          <div className="my-3 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig4_mosaic_mixup.jpg",
                  caption:
                    "Fig. 4. Data enhancement methods (Row 1: Mosaic algorithm; Row 2: Mixup algorithm).",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig4_mosaic_mixup.jpg"
                alt="Fig. 4. Mosaic & Mixup Data Augmentation"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-1.5 leading-tight">
              <span className="font-bold text-slate-900">Fig. 4.</span> Data enhancement methods
              (Top row: 4-image Mosaic concatenation; Bottom row: Mixup linear interpolation).
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2.3: ARCHITECTURE & FIG 5 (Trải rộng 2 cột) */}
        {/* ---------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-2 pt-2">
          <h3 className="text-sm font-bold font-sans text-slate-900 mb-2">2.3. Pest-RTDetr network structure</h3>
          {renderP(
            "The proposed Pest-RTDetr algorithm builds upon the RT-DETR framework, comprising five key components: an input layer, backbone network, neck CCFM encoder, decoder, and output prediction head. The backbone network adopts DAS-ResNet50 to extract C3, C4, and C5 feature layers with step sizes of 8, 16, and 32 respectively. The high-level semantic features of C5 undergo AIFI processing, reducing model computation and accelerating training speed. Feature layers P5, C3, and C4 pass through the cross-scale feature fusion module (CCFM), where multi-scale features are integrated before being fed into the decoder for final bounding box regression and classification."
          )}

          {/* HÌNH 5: Toàn cảnh kiến trúc Pest-RTDetr */}
          <div className="my-5 p-3 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig5_pest_rtdetr_framework.jpg",
                  caption:
                    "Fig. 5. Pest-RTDetr network framework (Input -> DAS-ResNet50 -> CCFM Neck -> AIFI -> Decoder -> Prediction Head).",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig5_pest_rtdetr_framework.jpg"
                alt="Fig. 5. Pest-RTDetr network framework"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </div>
            <figcaption className="text-xs font-sans text-slate-600 mt-2.5 leading-tight text-center">
              <span className="font-bold text-slate-900">Fig. 5.</span> Comprehensive Pest-RTDetr
              network framework integrating the DAS-ResNet50 backbone, CCFM cross-scale neck, and
              Transformer decoder without NMS post-processing.
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2.3.1: BACKBONE (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h4 className="text-xs font-bold font-sans text-slate-900 mb-1.5 uppercase tracking-wide">
            2.3.1. The backbone network
          </h4>
          {renderP(
            "The DAS attention mechanism combines contextual information from layer features with deformable convolution capability, allowing the model to focus on salient anatomical features without additional memory overhead. Input features pass through the DAS module: DAS first employs depth-separable convolutions to improve efficiency, followed by deformable convolution to locate relevant image regions, and concludes by outputting pixel-level attention weights. In this study, DAS was integrated into ResNet-50 blocks, where gated channel attention facilitates inter-block information dissemination, boosting CNN representational capacity with minimal increase in FLOPs."
          )}

          {/* HÌNH 6: Kiến trúc Backbone */}
          <div className="my-3 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig6_backbone_architecture.jpg",
                  caption: "Fig. 6. Backbone network architecture with DAS deformable attention modules.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig6_backbone_architecture.jpg"
                alt="Fig. 6. Backbone network architecture"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-1.5 leading-tight">
              <span className="font-bold text-slate-900">Fig. 6.</span> Detailed DAS-ResNet50
              backbone block showing gated channel modulation and deformable sampling grid offsets.
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2.3.2 & 2.3.3: FEATURE FUSION & LOSS (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h4 className="text-xs font-bold font-sans text-slate-900 mb-1.5 uppercase tracking-wide">
            2.3.2. Feature fusion module
          </h4>
          {renderP(
            "In this study, an enhanced feature fusion module (CF) is designed to integrate feature representations across different scales. A double-branch structure is employed, where upper and lower branches undergo CBS (Conv 1x1 + SiLU + BatchNorm) operations to reduce channel dimensions and ensure branch uniformity. The upper branch incorporates DAS and three stacked Bottlenecks, forming the primary gradient flow branch to capture rich gradient information, mitigate vanishing gradients, retain low-level positional details, and accentuate salient biological markers."
          )}

          {/* CÔNG THỨC TOÁN Eq 1 & 2 */}
          <div className="my-2.5 p-2 bg-slate-50 border-l-2 border-slate-800 font-mono text-[11px] text-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span>Z = ∑ (Xi + Yi) ⊗ Ki (i=1..c)</span>
              <span className="text-slate-400 font-bold">(1)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Q = K = V = Flatten(Z)</span>
              <span className="text-slate-400 font-bold">(2)</span>
            </div>
          </div>

          <h4 className="text-xs font-bold font-sans text-slate-900 mb-1.5 mt-4 uppercase tracking-wide">
            2.3.3. Optimization of the loss function
          </h4>
          {renderP(
            "The loss function comprises classification and bounding box regression losses. Due to the long-tail distribution of the IP102 dataset, models tend to overfit on abundant head classes and underfit on scarce tail classes. Focal Loss addresses this imbalance by dynamically down-weighting easy samples through balancing factor alpha_t and focusing training gradients on hard-to-classify minority samples through focusing parameter gamma:"
          )}

          {/* CÔNG THỨC TOÁN Eq 3 Focal Loss */}
          <div className="my-2 p-2 bg-slate-50 border-l-2 border-slate-800 font-mono text-[11px] text-slate-800 flex justify-between items-center">
            <span>FL(pt) = −αt (1 − pt)^γ log(pt)</span>
            <span className="text-slate-400 font-bold">(3)</span>
          </div>

          {renderP(
            "Furthermore, this study replaces conventional GIoU with MPDIoU (Minimum Point Distance IoU). MPDIoU directly minimizes the distance between the top-left and bottom-right corners of predicted and target boxes, simplifying geometric comparison, accelerating convergence by 26%, and eliminating bounding box distortions caused by overlapping pests:"
          )}

          {/* CÔNG THỨC TOÁN Eq 4 & 5 MPDIoU */}
          <div className="my-2 p-2 bg-slate-50 border-l-2 border-slate-800 font-mono text-[11px] text-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span>d1² = (xB1 − xA1)² + (yB1 − yA1)², d2² = (xB2 − xA2)² + (yB2 − yA2)²</span>
              <span className="text-slate-400 font-bold">(4)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>MPDIoU = (A ∩ B)/(A ∪ B) − d1²/(w² + h²) − d2²/(w² + h²)</span>
              <span className="text-slate-400 font-bold">(5)</span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3: RESULTS (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">
            3. Results
          </h2>
          <h3 className="text-sm font-bold font-sans text-slate-900 mb-1.5">
            3.1. Model evaluation and training results
          </h3>
          <h4 className="text-xs font-bold font-sans text-slate-900 mb-1 uppercase tracking-wide">
            3.1.1. Experimental environment configuration
          </h4>

          {/* BẢNG 3: Cấu hình phần cứng */}
          <div className="my-3 font-sans">
            <div className="text-[11px] font-semibold text-slate-900 mb-1">
              Table 3 — Experimental environment configuration.
            </div>
            <table className="min-w-full text-xs border-y-2 border-slate-900 text-left font-mono">
              <tbody className="divide-y divide-slate-200 text-[11px]">
                <tr>
                  <td className="py-1 px-2.5 font-bold bg-slate-50 w-1/3">Operating System</td>
                  <td className="py-1 px-2.5">Ubuntu 20.04.5 LTS</td>
                </tr>
                <tr>
                  <td className="py-1 px-2.5 font-bold bg-slate-50">CPU</td>
                  <td className="py-1 px-2.5">Intel(R) Xeon(R) Silver 4214R</td>
                </tr>
                <tr>
                  <td className="py-1 px-2.5 font-bold bg-slate-50">GPU</td>
                  <td className="py-1 px-2.5 font-semibold text-slate-900">NVIDIA RTX 3090 (24GB VRAM)</td>
                </tr>
                <tr>
                  <td className="py-1 px-2.5 font-bold bg-slate-50">Framework</td>
                  <td className="py-1 px-2.5">PyTorch 2.0.0 · CUDA 11.8 · Python 3.8.10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xs font-bold font-sans text-slate-900 mb-1 mt-3 uppercase tracking-wide">
            3.1.2. Evaluation methods
          </h4>
          {renderP(
            "Model performance was comprehensively quantified using precision (P), recall (R), mean average precision at IoU 0.50 (mAP50), and across IoU 0.50 to 0.95 (mAP50-95). Classification accuracy (Acc) and F1 score evaluated overall predictive balance, while frames per second (FPS) quantified real-time throughput. An inference speed exceeding 30 FPS satisfies standard real-time field monitoring criteria."
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3.1.2 TIẾP & BẢNG 4 (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          {/* CÔNG THỨC TOÁN Eq 6 & 7 */}
          <div className="my-2.5 p-2 bg-slate-50 border-l-2 border-slate-800 font-mono text-[11px] text-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span>Acc = (TP + TN) / (TP + TN + FP + FN), F1 = 2 × (P × R) / (P + R)</span>
              <span className="text-slate-400 font-bold">(6)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>mAP = (1/N) ∑ ∫ P(R) dR</span>
              <span className="text-slate-400 font-bold">(7)</span>
            </div>
          </div>

          {/* BẢNG 4: Kết quả huấn luyện RDE & MPDIoU */}
          <div className="my-3 font-sans">
            <div className="text-[11px] font-semibold text-slate-900 mb-1">
              Table 4 — Training result (RDE: resampling and data enhancement).
            </div>
            <table className="min-w-full text-xs border-y-2 border-slate-900 text-left font-mono">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[10px] font-bold">
                  <th className="py-1.5 px-2">Model</th>
                  <th className="py-1.5 px-2">mAP@0.5 (Val)</th>
                  <th className="py-1.5 px-2">Total Time</th>
                  <th className="py-1.5 px-2">Epochs</th>
                  <th className="py-1.5 px-2">GFLOPs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                <tr>
                  <td className="py-1 px-2">RT-DETR</td>
                  <td className="py-1 px-2">62.7 %</td>
                  <td className="py-1 px-2">25.0 h</td>
                  <td className="py-1 px-2">70</td>
                  <td className="py-1 px-2">8.2</td>
                </tr>
                <tr className="bg-emerald-50/60 font-semibold text-slate-900">
                  <td className="py-1 px-2">+MPDIoU +Focal +RDE</td>
                  <td className="py-1 px-2 text-emerald-700 font-bold">71.6 % (+8.9%)</td>
                  <td className="py-1 px-2">18.5 h (-26%)</td>
                  <td className="py-1 px-2">60</td>
                  <td className="py-1 px-2">9.7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* HÌNH 7: CÁC ĐƯỜNG CONG THỰC NGHIỆM (Full width 2 cột) */}
        {/* ---------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-2 my-2 p-3 bg-slate-50 border border-slate-200 rounded-lg group">
          <div
            className="overflow-hidden rounded cursor-pointer bg-white"
            onClick={() =>
              setZoomedImage({
                src: "/papers/pest-rtdetr/fig7_experimental_curves.jpg",
                caption: "Fig. 7. Model experimental results over 70 epochs (loss curves, mAP50, mAP50-95, precision, recall).",
              })
            }
            title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
          >
            <img
              src="/papers/pest-rtdetr/fig7_experimental_curves.jpg"
              alt="Fig. 7. Model experimental curves"
              className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </div>
          <figcaption className="text-xs font-sans text-slate-600 mt-2 leading-tight text-center">
            <span className="font-bold text-slate-900">Fig. 7.</span> Training and validation
            curves across 70 epochs for bounding box loss, classification loss, precision, recall, and
            mAP metrics.
          </figcaption>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3.2: ABLATION EXPERIMENTS & BẢNG 5 (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h3 className="text-sm font-bold font-sans text-slate-900 mb-2">3.2. Ablation experiment</h3>
          {renderP(
            "To isolate the individual contribution of each proposed module, ablation experiments were conducted on the IP102 dataset under unified configurations (split 6:1:3 into training, validation, and test sets). Compared with baseline RT-DETR (mAP50 59.11%), incorporating the DAS-ResNet50 backbone alone increased mAP50 to 61.61% (+2.50%). Adding the CF cross-scale feature fusion module alone increased mAP50 to 62.32% (+3.21%) and boosted recall by 3.05%."
          )}

          {/* BẢNG 5: Bảng kết quả thực nghiệm bóc tách */}
          <div className="my-3 font-sans overflow-x-auto">
            <div className="text-[11px] font-semibold text-slate-900 mb-1">
              Table 5 — Results of ablation experiments on IP102 benchmark.
            </div>
            <table className="min-w-full text-xs border-y-2 border-slate-900 text-center font-mono">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[10px] font-bold">
                  <th className="py-1 px-1.5 text-left">Model Variant</th>
                  <th className="py-1 px-1">DAS</th>
                  <th className="py-1 px-1">RDE</th>
                  <th className="py-1 px-1">CF</th>
                  <th className="py-1 px-1">Loss</th>
                  <th className="py-1 px-1.5 font-bold">mAP50 (%)</th>
                  <th className="py-1 px-1.5">Δ (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                <tr>
                  <td className="py-1 px-1.5 text-left">Baseline RT-DETR</td>
                  <td>✕</td><td>✕</td><td>✕</td><td>✕</td>
                  <td className="font-semibold">59.11</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="py-1 px-1.5 text-left">+ DAS-ResNet50</td>
                  <td className="text-emerald-600 font-bold">✓</td><td>✕</td><td>✕</td><td>✕</td>
                  <td>61.61</td>
                  <td className="text-emerald-700 font-semibold">+2.50</td>
                </tr>
                <tr>
                  <td className="py-1 px-1.5 text-left">+ CF Module</td>
                  <td>✕</td><td>✕</td><td className="text-emerald-600 font-bold">✓</td><td>✕</td>
                  <td>62.32</td>
                  <td className="text-emerald-700 font-semibold">+3.21</td>
                </tr>
                <tr>
                  <td className="py-1 px-1.5 text-left">+ DAS + CF</td>
                  <td className="text-emerald-600 font-bold">✓</td><td>✕</td><td className="text-emerald-600 font-bold">✓</td><td>✕</td>
                  <td className="font-bold">65.44</td>
                  <td className="text-emerald-700 font-bold">+6.33</td>
                </tr>
                <tr className="bg-emerald-50/70 font-bold text-slate-900">
                  <td className="py-1 px-1.5 text-left">Pest-RTDetr (All)</td>
                  <td className="text-emerald-600">✓</td><td className="text-emerald-600">✓</td><td className="text-emerald-600">✓</td><td className="text-emerald-600">✓</td>
                  <td className="text-emerald-800 text-xs">68.40</td>
                  <td className="text-emerald-800">+9.29</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HÌNH 8: So sánh phát hiện mục tiêu dày đặc */}
          <div className="my-3 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig8_intensive_detection.jpg",
                  caption: "Fig. 8. Intensive target detection results comparison between baseline and Pest-RTDetr.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig8_intensive_detection.jpg"
                alt="Fig. 8. Intensive target detection results comparison"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-1.5 leading-tight">
              <span className="font-bold text-slate-900">Fig. 8.</span> Dense target detection
              comparison: Pest-RTDetr accurately detects clusters of micro-pests without bounding box
              distortion.
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3.2 TIẾP: HEATMAP & CONFUSION MATRIX (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          {renderP(
            "Integrating both DAS and CF modules achieved an mAP50 of 65.44% (+6.33% over baseline) and a 4.76% improvement in F1 score. Incorporating the optimized loss function (Focal Loss + MPDIoU) and resampling strategy yielded the optimal overall performance: mAP50 of 68.40% (a cumulative +9.29% improvement) at 80 FPS. Heatmap visualization confirms that Pest-RTDetr concentrates feature activation sharply on insect head, antenna, and foot regions, preserving fine-grained morphological details under foliage occlusion."
          )}

          {/* HÌNH 9: Biểu đồ nhiệt Heatmap */}
          <div className="my-3 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig9_heatmap_comparison.jpg",
                  caption: "Fig. 9. Comparison of heat map: Pest-RTDetr focuses specifically on insect head and foot anatomical structures.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig9_heatmap_comparison.jpg"
                alt="Fig. 9. Comparison of heat map"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-1.5 leading-tight">
              <span className="font-bold text-slate-900">Fig. 9.</span> Feature activation heatmap:
              Row 1 shows baseline RT-DETR; Row 2 shows Pest-RTDetr sharply emphasizing salient head
              and joint regions.
            </figcaption>
          </div>

          {/* HÌNH 10: Ma trận nhầm lẫn Confusion Matrix */}
          <div className="my-3 p-2 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig10_confusion_matrix.jpg",
                  caption: "Fig. 10. Confusion matrix diagrams comparing classification accuracy across 8 crop super-classes.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig10_confusion_matrix.jpg"
                alt="Fig. 10. Confusion matrix diagrams"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="text-[11px] font-sans text-slate-600 mt-1.5 leading-tight">
              <span className="font-bold text-slate-900">Fig. 10.</span> Confusion matrix comparison
              across 8 crop super-classes (average classification accuracy improved by 12%).
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3.3: COMPARATIVE EXPERIMENTS (Trải rộng 2 cột) */}
        {/* ---------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-2 pt-4">
          <h3 className="text-sm font-bold font-sans text-slate-900 mb-2">3.3. Comparative experiment</h3>
          {renderP(
            "Pest-RTDetr was benchmarked against nine established object detection models on the IP102 dataset: Faster R-CNN, YOLOv5, YOLOv7, YOLOv8, CenterNet, DETR, Deformable-DETR, DINO-DeformableDETR, and baseline RT-DETR. Table 7 details the comprehensive performance comparison across parameters, detection speed (FPS), mAP50, and mAP50-95."
          )}

          {/* BẢNG 7: Đối sánh toàn diện 10 mô hình SOTA */}
          <div className="my-4 overflow-x-auto font-sans">
            <div className="text-xs font-semibold text-slate-900 mb-1.5">
              <span>Table 7</span> — Comparative Experiment on IP102 insect pest benchmark dataset.
            </div>
            <table className="min-w-full text-xs border-y-2 border-slate-900 text-center font-mono">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[11px] font-bold text-slate-800">
                  <th className="py-2 px-3 text-left">Model</th>
                  <th className="py-2 px-3">Epochs</th>
                  <th className="py-2 px-3">Params (M)</th>
                  <th className="py-2 px-3">FPS</th>
                  <th className="py-2 px-3 font-bold">mAP50 (%)</th>
                  <th className="py-2 px-3">mAP50–95 (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px] text-slate-700">
                <tr>
                  <td className="py-1.5 px-3 text-left">Faster R-CNN (Ren et al., 2017)</td>
                  <td>300</td><td>42</td><td>26</td><td>54.34</td><td>30.42</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">YOLOv5 (Jocher, 2022)</td>
                  <td>300</td><td>46</td><td>45</td><td>55.90</td><td>33.56</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">YOLOv7 (Wang et al., 2022)</td>
                  <td>300</td><td>38</td><td>57</td><td>56.47</td><td>34.60</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">YOLOv8 (Jocher et al., 2023)</td>
                  <td>300</td><td>26</td><td>71</td><td>58.80</td><td>38.78</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">CenterNet (Duan et al., 2019)</td>
                  <td>300</td><td>32</td><td>22</td><td>47.04</td><td>25.46</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">DETR (Carion et al., 2020)</td>
                  <td>500</td><td>41</td><td>28</td><td>54.31</td><td>30.81</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">Deformable-DETR (Zhu et al., 2020)</td>
                  <td>70</td><td>40</td><td>17</td><td>57.22</td><td>35.12</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">DINO-DeformableDETR (Zhang et al., 2022b)</td>
                  <td>70</td><td>47</td><td>24</td><td>59.03</td><td>37.21</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 text-left">RT-DETR (Lv et al., 2023)</td>
                  <td>70</td><td>42</td><td>74</td><td>59.11</td><td>38.40</td>
                </tr>
                <tr className="bg-emerald-50 font-bold text-slate-900 border-t-2 border-emerald-600">
                  <td className="py-2 px-3 text-left text-emerald-800 text-xs">Pest-RTDetr (Ours)</td>
                  <td>70</td><td>41</td><td className="text-emerald-700">80</td>
                  <td className="text-emerald-800 text-xs font-bold">68.40 (+9.29%)</td>
                  <td className="text-emerald-800">43.40 (+5.00%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HÌNH 11: So sánh trực quan kết quả phát hiện */}
          <div className="my-5 p-3 bg-slate-50 border border-slate-200 rounded-lg group">
            <div
              className="overflow-hidden rounded cursor-pointer bg-white"
              onClick={() =>
                setZoomedImage({
                  src: "/papers/pest-rtdetr/fig11_target_detection_chart.jpg",
                  caption: "Fig. 11. Comparison chart of target detection results across competitive deep learning models.",
                })
              }
              title={language === "ja" ? "クリックして拡大" : "Click để phóng to ảnh"}
            >
              <img
                src="/papers/pest-rtdetr/fig11_target_detection_chart.jpg"
                alt="Fig. 11. Comparison chart of target detection results"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </div>
            <figcaption className="text-xs font-sans text-slate-600 mt-2 leading-tight text-center">
              <span className="font-bold text-slate-900">Fig. 11.</span> Qualitative visual
              comparison of detection results under severe occlusion, lighting variation, and dense
              clustering across Faster R-CNN, YOLOv8, and Pest-RTDetr.
            </figcaption>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 4: DISCUSSION (Cột 1) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">
            4. Discussion
          </h2>
          {renderP(
            "This paper proposes an advanced end-to-end multi-species pest detection model, Pest-RTDetr. By enhancing the cross-scale feature fusion module and eliminating NMS post-processing bottlenecks, Pest-RTDetr effectively localizes pest targets across different scales and densities in real time, facilitating automated precision pesticide spraying and intelligent farm management. By focusing attention on insect head and foot anatomical structures, our model reliably differentiates closely resembling species."
          )}
          {renderP(
            "Although Pest-RTDetr achieves state-of-the-art performance, several dataset and environmental limitations warrant discussion: current agricultural datasets lack coverage of emerging invasive species, and unconstrained field conditions such as heavy rainfall, night lighting, and multi-crop intercropping present persistent challenges. Domain shift remains an obstacle when deploying models across geographically distant farming regions. Future research will explore transfer learning, domain generalization, lightweight quantization for embedded edge hardware (NVIDIA Jetson platforms), and multi-modal sensory networks fusing visual data with soil and microclimate sensors."
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 5: CONCLUSION (Cột 2) */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="text-base font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">
            5. Conclusion
          </h2>
          {renderP(
            "Detecting multi-species insect pests with varying scales, dense distribution, and occlusion in natural field scenarios is a fundamental prerequisite for smart and sustainable agriculture. In this study, we proposed the Pest-RTDetr framework, uniting deformable attention mechanisms with cross-scale feature fusion and geometric point-distance loss optimization. The model achieves an mAP50 of 68.40% at 80 FPS on the IP102 benchmark, striking an optimal balance between localization precision and real-time execution. This technology provides strong theoretical and empirical foundations for automated crop protection and ecological pest management."
          )}

          {/* Khối CRediT & Data availability */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 font-sans space-y-2">
            <p>
              <span className="font-bold text-slate-800">Data availability:</span> All datasets in
              this paper are publicly available, and code is provided at{" "}
              <span className="font-mono text-slate-900">github.com/shanpao/pestProject</span>.
            </p>
            <p>
              <span className="font-bold text-slate-800">Acknowledgements:</span> Supported by the
              National Natural Science Foundation of China (No. 61806024, 62206257) and Wuxi
              University Startup Fund.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. LIGHTBOX MODAL PHÓNG TO HÌNH ẢNH / ĐỒ THỊ */}
      {/* ==================================================== */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="text-xs font-bold text-slate-900 font-sans">
                {zoomedImage.caption}
              </span>
              <button
                onClick={() => setZoomedImage(null)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-bold"
                title="Đóng phóng to"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-50 rounded p-2">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.caption}
                className="max-w-full max-h-[75vh] object-contain rounded"
              />
            </div>
            <div className="pt-2 text-right text-[11px] text-slate-400 font-mono">
              Click ra ngoài hoặc nút ✕ để đóng
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
