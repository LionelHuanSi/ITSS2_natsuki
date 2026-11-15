# -*- coding: utf-8 -*-
import sys, os
from build_repo_data import get_ip102_data, get_rtdetr_data
import json

ip_p, ip_dvi, ip_tvi, ip_dja, ip_tja = get_ip102_data()
rt_p, rt_dvi, rt_tvi, rt_dja, rt_tja = get_rtdetr_data()

with open('src/repositories/ResearchTopicRepository.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Generate replacement for paperIP102
ip_paragraphs_ts = json.dumps(ip_p, ensure_ascii=False, indent=8)
ip_dvi_ts = json.dumps(ip_dvi, ensure_ascii=False, indent=8)
ip_tvi_ts = json.dumps(ip_tvi, ensure_ascii=False, indent=8)
ip_dja_ts = json.dumps(ip_dja, ensure_ascii=False, indent=8)
ip_tja_ts = json.dumps(ip_tja, ensure_ascii=False, indent=8)

new_ip102_ts = f'''    const paperIP102 = new AcademicPaper(
      "paper-ip102-cvpr-2019",
      "IP102: A Large-Scale Benchmark Dataset for Insect Pest Recognition",
      "X. Wu, C. Zhan, Y.-K. Lai, M.-M. Cheng, J. Yang (Nankai University & Cardiff University)",
      2019,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Xây dựng bộ dữ liệu benchmark mở lớn nhất thế giới về sâu bệnh nông nghiệp với hệ thống phân cấp 2 tầng gồm 75,222 ảnh thuộc 102 loài sâu bệnh phá hoại mùa màng.",
{ip_paragraphs_ts},
{ip_dvi_ts},
{ip_tvi_ts},
      "Core A* · Trích dẫn: 1,180+",
      1180,
      [
        "Bộ dữ liệu chuẩn mở lớn nhất gồm 75,222 ảnh gán nhãn thủ công qua 2 vòng chuyên gia bảo vệ thực vật.",
        "Bao quát 102 phân loại sâu hại trên 8 nhóm cây trồng chủ lực (lúa, ngô, lúa mì, củ cải, cỏ linh lăng, nho, cam quýt, xoài).",
        "Xác lập kết quả đối chứng đường cơ sở (Baseline) cho hơn 15 kiến trúc mạng từ Handcrafted đến Deep Learning và Object Detection."
      ],
      "Bộ dữ liệu bắt buộc phải dùng để làm thực nghiệm và đối chiếu kết quả nghiên cứu khi bảo vệ luận văn hoặc nộp bài báo quốc tế.",
      "農作物害虫102種、75,222枚の画像からなる2階層構造の世界最大規模オープンベンチマークデータセットを構築。",
      [
        "植物保護の第一線専門家による2段階の手動アノテーションを施した75,222枚の高品質画像で構成。",
        "主要8農作物（水稲、トウモロコシ、小麦等）における102分類の害虫を体系的に網羅。",
        "人手設計特徴から最先端深層学習・物体検出モデルに至る包括的ベースラインを確立。"
      ],
{ip_dja_ts},
{ip_tja_ts},
      "Core A* · 被引用数: 1,180+"
    );'''

# Find old paperIP102 block
ip_marker_start = 'const paperIP102 = new AcademicPaper('
ip_idx = text.find(ip_marker_start)
next_marker = 'const paperSurveyPest = new AcademicPaper('
next_idx = text.find(next_marker)
ip_end_idx = text.rfind(');', ip_idx, next_idx) + 2

text = text[:ip_idx] + new_ip102_ts + text[ip_end_idx:]
print('Replaced paperIP102 successfully!')

# Generate replacement for paperRTDetr
rt_paragraphs_ts = json.dumps(rt_p, ensure_ascii=False, indent=8)
rt_dvi_ts = json.dumps(rt_dvi, ensure_ascii=False, indent=8)
rt_tvi_ts = json.dumps(rt_tvi, ensure_ascii=False, indent=8)
rt_dja_ts = json.dumps(rt_dja, ensure_ascii=False, indent=8)
rt_tja_ts = json.dumps(rt_tja, ensure_ascii=False, indent=8)

new_rtdetr_ts = f'''    const paperRTDetr = new AcademicPaper(
      "paper-rtdetr-cvpr-2023",
      "DETRs Beat YOLOs on Real-time Object Detection",
      "W. Lv, Y. Zhao, S. Xu, J. Wang, C. Gu, C. Cui et al. (Baidu Inc.)",
      2024,
      "IEEE / CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "Đột phá công nghệ đầu tiên chứng minh Transformer có thể vượt qua toàn diện họ YOLO về cả tốc độ (114 FPS) và độ chính xác (53.0% AP) mà không cần bước lọc NMS.",
{rt_paragraphs_ts},
{rt_dvi_ts},
{rt_tvi_ts},
      "Core A* · Baidu Research",
      950,
      [
        "Loại bỏ hoàn toàn khâu hậu xử lý Non-Maximum Suppression (NMS), loại trừ độ trễ bất định khi suy luận.",
        "Bộ mã hóa lai (Hybrid Encoder) tách rời tương tác nội tầng AIFI và hợp nhất xuyên tầng CCFF giúp tăng tốc 300%.",
        "Chiến lược Uncertainty-minimal Query Selection kết hợp điểm phân loại và IoU giúp hội tụ cực nhanh.",
        "Đạt 53.0% AP ở tốc độ 114 FPS trên card GPU T4, trở thành chuẩn mực mới cho Object Detection thời gian thực."
      ],
      "Công trình kiến trúc bắt buộc phải trích dẫn để làm bệ phóng lý thuyết cho toàn bộ thuật toán phát hiện thời gian thực trong đề tài.",
      "NMS後処理を不要としながら、速度（114 FPS）と精度（53.0% AP）の双方でYOLO系を全面的に上回る初の実時間Transformerを実現。",
      [
        "Non-Maximum Suppression (NMS) 後処理を完全排除し、推論時の不確定な遅延分散を解消。",
        "スケール内相互作用AIFIとスケール間統合CCFFを分離した高効率ハイブリッドエンコーダを開発。",
        "不確定性最小化クエリ選択により、分類確信度と位置精度を高度に整合させ学習収束を加速。",
        "T4 GPU上で114 FPS・53.0% APを達成し、実時間物体検出の新たな国際標準を確立。"
      ],
{rt_dja_ts},
{rt_tja_ts},
      "Core A* · Baidu Research"
    );'''

# Find old paperRTDetr block
rt_marker_start = 'const paperRTDetr = new AcademicPaper('
rt_idx = text.find(rt_marker_start)
next_marker2 = 'const paperEdgePest = new AcademicPaper('
next_idx2 = text.find(next_marker2)
rt_end_idx = text.rfind(');', rt_idx, next_idx2) + 2

text = text[:rt_idx] + new_rtdetr_ts + text[rt_end_idx:]
print('Replaced paperRTDetr successfully!')

with open('src/repositories/ResearchTopicRepository.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated src/repositories/ResearchTopicRepository.ts successfully!')
