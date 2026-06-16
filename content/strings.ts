/**
 * Every user-facing string on the site, in EN and VI.
 *
 * Organization mirrors the chapter/component tree — find a string the
 * same way you'd find the component that uses it. Lift a literal here
 * before using it in JSX; never inline a translated string in a component
 * (review and changes get much harder).
 *
 * VI voice notes:
 *   - Professional / clear, not chatty. The audience is recruiters,
 *     hiring managers, and engineering leads — same as the EN voice.
 *   - Tech loanwords (full-stack, backend, stack, deploy, pipeline) are
 *     kept in English when there's no idiomatic VI equivalent. That's
 *     standard register in VN tech culture; "ngăn xếp" reads as
 *     translation-ese.
 *   - Proper nouns (PathTech, Petrolimex, Noi Bai, mnemo, etc.) are
 *     never translated.
 *   - For RevealText cold-open the line breaks (`\n`) and italic markers
 *     (`*word*`) are preserved across locales so the cascade animation
 *     reads the same in both languages.
 */

import type { LocalizedText } from "@/lib/i18n";

export const strings = {
  // ---------- Chapter 00 — Cold open ----------
  cold: {
    eyebrow: {
      en: "Quoc Tran Trung — portfolio",
      vi: "Quoc Tran Trung — portfolio",
    } satisfies LocalizedText,
    headline: {
      en: "I ship\n*production* systems\nend to end.",
      vi: "Tôi triển khai\nhệ thống *production*\ntừ đầu đến cuối.",
    } satisfies LocalizedText,
    subtitle: {
      en: "Full-Stack Engineer · Technical Lead. AI cameras at airports, cloud platforms that scale, and tools that help small teams ship big things. Based in Hanoi.",
      vi: "Kỹ sư Full-Stack · Technical Lead. Camera AI cho sân bay, nền tảng cloud mở rộng theo nhu cầu, và các công cụ giúp đội nhỏ làm được việc lớn. Tại Hà Nội.",
    } satisfies LocalizedText,
    cta: {
      en: "Begin the story",
      vi: "Bắt đầu câu chuyện",
    } satisfies LocalizedText,
    status: {
      en: "Open to lead roles",
      vi: "Sẵn sàng nhận vai trò Lead",
    } satisfies LocalizedText,
  },

  // ---------- Chapter 01 — Origin ----------
  origin: {
    eyebrow: {
      en: "Chapter 01 · Origin",
      vi: "Chương 01 · Khởi đầu",
    } satisfies LocalizedText,
    headline: {
      en: "The first three years happened on a single laptop in Hanoi.",
      vi: "Ba năm đầu tiên diễn ra trên duy nhất một chiếc laptop tại Hà Nội.",
    } satisfies LocalizedText,
    scrollHint: {
      en: "Scroll to advance →",
      vi: "Cuộn để tiếp tục →",
    } satisfies LocalizedText,
    milestones: [
      {
        year: "2021",
        title: {
          en: "Hanoi University",
          vi: "Đại học Hà Nội",
        } satisfies LocalizedText,
        detail: {
          en: "B.Sc. IT, Software Engineering — English programme. The PHP-on-WAMP era.",
          vi: "Cử nhân CNTT, chuyên ngành Công nghệ Phần mềm — chương trình tiếng Anh. Thời kỳ PHP trên WAMP.",
        } satisfies LocalizedText,
      },
      {
        year: "2022",
        title: {
          en: "Devpro J2EE certification",
          vi: "Chứng chỉ Devpro J2EE",
        } satisfies LocalizedText,
        detail: {
          en: "Java Web Full-Stack, eight months of writing servlets after class.",
          vi: "Java Web Full-Stack, tám tháng viết servlet sau giờ học.",
        } satisfies LocalizedText,
      },
      {
        year: "2023",
        title: {
          en: "HANU IT Youth Union — Logistics Lead",
          vi: "Đoàn TN khoa CNTT HANU — Trưởng ban Hậu cần",
        } satisfies LocalizedText,
        detail: {
          en: "Ran logistics for the IT Department Freshmen Welcome and the Warm Spring volunteer campaign.",
          vi: "Phụ trách hậu cần chương trình Chào tân sinh viên CNTT và chiến dịch tình nguyện Xuân Ấm.",
        } satisfies LocalizedText,
      },
      {
        year: "2024",
        title: {
          en: "British University Vietnam",
          vi: "Đại học Anh Quốc Việt Nam",
        } satisfies LocalizedText,
        detail: {
          en: "PHP / Laravel internship in the ICT department. Built a barcode-detection pipeline that retired a manual data-entry workflow.",
          vi: "Thực tập PHP / Laravel tại phòng CNTT. Xây dựng pipeline nhận diện mã vạch giúp loại bỏ một quy trình nhập liệu thủ công.",
        } satisfies LocalizedText,
      },
      {
        year: "2024",
        title: {
          en: "HANU Youth Union — Secretary",
          vi: "Đoàn TN HANU — Bí thư",
        } satisfies LocalizedText,
        detail: {
          en: "Led the executive team across campus-wide events. First time owning a roadmap end-to-end.",
          vi: "Dẫn dắt ban thường vụ qua các sự kiện toàn trường. Lần đầu tự sở hữu một roadmap từ đầu tới cuối.",
        } satisfies LocalizedText,
      },
    ],
  },

  // ---------- Chapter 02 — Crossover ----------
  crossover: {
    eyebrow: {
      en: "Chapter 02 · Crossover · Mar — Jul 2025",
      vi: "Chương 02 · Bước ngoặt · Tháng 3 — Tháng 7 năm 2025",
    } satisfies LocalizedText,
    headline: {
      en: "Bitsness gave me my first AI automation gig.",
      vi: "Bitsness mang đến công việc đầu tiên về tự động hóa AI.",
    } satisfies LocalizedText,
    subtitle: {
      en: "The platform ran a YouTube channel's next video through five automated stages — research, ideation, scripting, storyboard, finishing — before a human editor ever opened it. My job was the backend pipeline that orchestrated it, the security around access, and the deploy pipeline that took it from laptop to staging.",
      vi: "Nền tảng đưa video kế tiếp của một kênh YouTube qua năm giai đoạn tự động — nghiên cứu, lên ý tưởng, viết kịch bản, storyboard, hoàn thiện — trước khi biên tập viên mở file. Việc của tôi là backend pipeline điều phối toàn bộ, lớp bảo mật phân quyền, và pipeline deploy đưa nó từ laptop lên staging.",
    } satisfies LocalizedText,
    closer: {
      en: "I led the backend split — modular NestJS services, repository pattern, role-based guards — and built the GitLab pipelines that took it from laptop to staging.",
      vi: "Tôi dẫn việc tách backend — service NestJS module hóa, repository pattern, guard theo vai trò — và xây pipeline GitLab đưa nó từ laptop lên staging.",
    } satisfies LocalizedText,
    stages: [
      {
        id: "01",
        label: { en: "Video", vi: "Video" } satisfies LocalizedText,
        note: {
          en: "Source ingestion",
          vi: "Thu thập nguồn",
        } satisfies LocalizedText,
      },
      {
        id: "02",
        label: {
          en: "Analysis",
          vi: "Phân tích",
        } satisfies LocalizedText,
        note: {
          en: "OpenAI + YouTube APIs",
          vi: "API OpenAI + YouTube",
        } satisfies LocalizedText,
      },
      {
        id: "03",
        label: {
          en: "Ideation",
          vi: "Lên ý tưởng",
        } satisfies LocalizedText,
        note: {
          en: "Topic + angle generation",
          vi: "Sinh chủ đề + góc nhìn",
        } satisfies LocalizedText,
      },
      {
        id: "04",
        label: {
          en: "Script",
          vi: "Kịch bản",
        } satisfies LocalizedText,
        note: {
          en: "Long-form narrative",
          vi: "Nội dung dài",
        } satisfies LocalizedText,
      },
      {
        id: "05",
        label: {
          en: "Storyboard",
          vi: "Storyboard",
        } satisfies LocalizedText,
        note: {
          en: "Shot list + thumbnails",
          vi: "Danh sách cảnh + thumbnail",
        } satisfies LocalizedText,
      },
    ],
  },

  // ---------- Chapter 03 — Lead arc ----------
  leadArc: {
    eyebrow: {
      en: "Chapter 03 · Lead arc · PathTech, Jul 2025 → present",
      vi: "Chương 03 · Vai trò Lead · PathTech, Tháng 7/2025 → hiện tại",
    } satisfies LocalizedText,
    headline: {
      en: "Six months in, I was leading the AI + cloud workstreams.",
      vi: "Sau sáu tháng, tôi đã dẫn dắt các luồng công việc AI + cloud.",
    } satisfies LocalizedText,
    subtitle: {
      en: "Promoted to Technical Lead in December. Each tile below is a real product running in production today — tap any of them for the full story, the live screenshots, and the lessons learned.",
      vi: "Được thăng chức Technical Lead vào tháng 12. Mỗi ô bên dưới là một sản phẩm thực đang chạy production — chạm vào để xem toàn bộ câu chuyện, ảnh chụp thực tế và các bài học rút ra.",
    } satisfies LocalizedText,
    moreTile: {
      en: "and many more…",
      vi: "và nhiều hơn nữa…",
    } satisfies LocalizedText,
    tiles: {
      aicloud: {
        en: "The cloud dashboard that manages every AIBox in the field. Web app plus companion mobile app, role-based access, automated server deploys, alerts and event timeline across the fleet.",
        vi: "Dashboard cloud quản lý mọi AIBox ngoài hiện trường. Web app cùng app mobile, phân quyền theo vai trò, tự động deploy server, cảnh báo và timeline sự kiện trên toàn fleet.",
      } satisfies LocalizedText,
      aibox: {
        en: "The edge box itself — one rugged NVIDIA Jetson per site, four CCTV cameras, real-time safety detections (helmet, oil-spill, smoke, plate, face) streamed back to the cloud in under a second.",
        vi: "Chính chiếc edge box — một NVIDIA Jetson chịu được hiện trường, bốn camera CCTV, các phát hiện an toàn thời gian thực (mũ bảo hộ, tràn dầu, khói, biển số, khuôn mặt) gửi về cloud trong dưới một giây.",
      } satisfies LocalizedText,
      unlimit: {
        en: "WhatsApp at agency scale. Many phones, many brands, many agents — one inbox plugged straight into the customer's CRM. Multi-tenant under the hood; one click for the operator.",
        vi: "WhatsApp ở quy mô agency. Nhiều số máy, nhiều thương hiệu, nhiều agent — một inbox cắm thẳng vào CRM của khách hàng. Multi-tenant bên trong; một cú click cho operator.",
      } satisfies LocalizedText,
      swisslife: {
        en: "Bulk document dispatch for an insurance workflow. Ten services hand off via an event bus to send personal letters, verify identity with a one-time code, and keep an audit trail that compliance can actually open in Excel.",
        vi: "Gửi tài liệu hàng loạt cho quy trình bảo hiểm. Mười service trao đổi qua event bus để gửi thư cá nhân, xác minh danh tính bằng mã OTP, và lưu nhật ký kiểm toán mà bộ phận compliance có thể mở thẳng bằng Excel.",
      } satisfies LocalizedText,
      keanu: {
        en: "Reservation platform for a luxury villa launch in Bali. Buyers browse, shortlist, lock a unit, and pay a deposit — atomic Redis locking guarantees one buyer per villa even when twenty refresh at once.",
        vi: "Nền tảng đặt chỗ cho đợt mở bán biệt thự cao cấp tại Bali. Người mua duyệt, chọn, khóa căn, đặt cọc — Redis lock nguyên tử đảm bảo một biệt thự một người mua kể cả khi hai mươi người refresh cùng lúc.",
      } satisfies LocalizedText,
      "ham-cap": {
        en: "The sensor-data cousin of AIBox. Same idea — one edge box per site — but built around environmental sensors instead of cameras. One-script Ubuntu install so a field technician can stand up a new site.",
        vi: "Người anh em dữ liệu cảm biến của AIBox. Cùng ý tưởng — một edge box mỗi điểm — nhưng dùng cảm biến môi trường thay vì camera. Một script Ubuntu để kỹ thuật viên hiện trường dựng một điểm mới.",
      } satisfies LocalizedText,
    },
  },

  // ---------- Chapter 04 — AIBox closeup ----------
  aiboxCloseup: {
    eyebrow: {
      en: "Chapter 04 · AIBox closeup · two production deployments",
      vi: "Chương 04 · Cận cảnh AIBox · hai triển khai thực tế",
    } satisfies LocalizedText,
    headline: {
      en: "Edge AI live at Noi Bai airport and a 110 kV substation.",
      vi: "Edge AI vận hành tại sân bay Nội Bài và trạm biến áp 110 kV.",
    } satisfies LocalizedText,
    subtitleA: {
      en: "Live at ",
      vi: "Đang chạy tại ",
    } satisfies LocalizedText,
    subtitleSiteA: {
      en: "Petrolimex Aviation at Noi Bai International Airport",
      vi: "Petrolimex Aviation tại Sân bay Quốc tế Nội Bài",
    } satisfies LocalizedText,
    subtitleB: {
      en: " and at ",
      vi: " và tại ",
    } satisfies LocalizedText,
    subtitleSiteB: {
      en: "EVN's 110 kV Mo Lao substation",
      vi: "Trạm biến áp 110 kV Mỗ Lao của EVN",
    } satisfies LocalizedText,
    subtitleC: {
      en: ". One rugged box per site watches four cameras at once, spots safety violations the instant they happen, and pushes alerts to the cloud in under a second. No video ever leaves the site for AI — the inference runs right there on the device.",
      vi: ". Mỗi điểm một chiếc box bền bỉ giám sát bốn camera cùng lúc, phát hiện vi phạm an toàn ngay khi xảy ra và đẩy cảnh báo về cloud trong dưới một giây. Không video nào rời khỏi site cho mục đích AI — inference chạy trực tiếp trên thiết bị.",
    } satisfies LocalizedText,
    stats: [
      {
        to: 10,
        prefix: "",
        suffix: "+",
        label: {
          en: "YOLO models in prod",
          vi: "Mô hình YOLO chạy thực tế",
        } satisfies LocalizedText,
      },
      {
        to: 50,
        prefix: "",
        suffix: "+",
        label: {
          en: "REST endpoints",
          vi: "Endpoint REST",
        } satisfies LocalizedText,
      },
      {
        to: 4,
        prefix: "",
        suffix: "",
        label: {
          en: "concurrent CCTV feeds",
          vi: "Luồng CCTV đồng thời",
        } satisfies LocalizedText,
      },
    ],
    modelsHeader: {
      en: "Models in the field",
      vi: "Mô hình ngoài hiện trường",
    } satisfies LocalizedText,
    models: [
      {
        en: "helmet detection",
        vi: "nhận diện mũ bảo hộ",
      } satisfies LocalizedText,
      {
        en: "oil-spill",
        vi: "tràn dầu",
      } satisfies LocalizedText,
      {
        en: "smoke + fire",
        vi: "khói + lửa",
      } satisfies LocalizedText,
      {
        en: "license-plate recognition",
        vi: "nhận diện biển số",
      } satisfies LocalizedText,
      {
        en: "face recognition",
        vi: "nhận diện khuôn mặt",
      } satisfies LocalizedText,
      {
        en: "people control",
        vi: "kiểm soát người",
      } satisfies LocalizedText,
      {
        en: "petrolimex uniform",
        vi: "đồng phục Petrolimex",
      } satisfies LocalizedText,
    ],
    streamingA: {
      en: "Streaming: ",
      vi: "Truyền hình: ",
    } satisfies LocalizedText,
    streamingPrimary: {
      en: " primary, ",
      vi: " chính, ",
    } satisfies LocalizedText,
    streamingIngest: {
      en: " for camera ingest, ",
      vi: " để thu camera, ",
    } satisfies LocalizedText,
    streamingFallback: {
      en: " fallback. WebSocket broadcasts every detection event for the cloud's live timeline.",
      vi: " dự phòng. WebSocket phát mọi sự kiện phát hiện cho timeline trực tiếp trên cloud.",
    } satisfies LocalizedText,
    frameAlt: {
      en: "Live frame from AIBox at Petrolimex Aviation, Noi Bai: a refueling truck and ground crew with YOLO bounding boxes drawn around helmets, vests, and a flagged PPE-negative person.",
      vi: "Khung hình thực tế từ AIBox tại Petrolimex Aviation, Nội Bài: xe tiếp nhiên liệu và đội phục vụ mặt đất với bounding box YOLO quanh mũ bảo hộ, áo phản quang và một người bị đánh dấu thiếu PPE.",
    } satisfies LocalizedText,
  },

  // ---------- Chapter 05 — mnemo ----------
  mnemo: {
    eyebrow: {
      en: "Chapter 05 · mnemo",
      vi: "Chương 05 · mnemo",
    } satisfies LocalizedText,
    versionSuffix: {
      en: " published",
      vi: " đã phát hành",
    } satisfies LocalizedText,
    versionLiveTitle: {
      en: "Live from GitHub releases",
      vi: "Trực tiếp từ GitHub releases",
    } satisfies LocalizedText,
    versionFallbackTitle: {
      en: "Build-time version (GitHub API unreachable)",
      vi: "Phiên bản tại lúc build (GitHub API không khả dụng)",
    } satisfies LocalizedText,
    headlineLead: {
      en: "A memory layer",
      vi: "Một lớp bộ nhớ",
    } satisfies LocalizedText,
    headlineTail: {
      en: " that makes Claude Code remember what you've already taught it.",
      vi: " giúp Claude Code nhớ những gì bạn đã dạy nó.",
    } satisfies LocalizedText,
    description: {
      en: "All the lessons you teach an AI coding assistant — your team's patterns, your design decisions, the gotchas you keep re-learning — collected into a small searchable graph on your own laptop. mnemo picks the most relevant pieces every time you ask the AI a question, and feeds them in automatically, with citations, capped at a small budget so it never floods the conversation. Open source, runs offline, shipping new releases continuously (the version above is live from GitHub).",
      vi: "Mọi bài học bạn dạy trợ lý AI viết code — pattern của đội bạn, các quyết định thiết kế, những lỗi bạn cứ học đi học lại — được gom thành một đồ thị nhỏ có thể tìm kiếm trên chính laptop của bạn. mnemo chọn ra những mảnh phù hợp nhất mỗi lần bạn hỏi AI và tự đưa vào câu hỏi kèm trích dẫn, giới hạn ở một ngân sách nhỏ để không bao giờ làm tràn ngữ cảnh. Mã nguồn mở, chạy offline, ra phiên bản mới liên tục (số phiên bản phía trên là lấy trực tiếp từ GitHub).",
    } satisfies LocalizedText,
    queryLabel: {
      en: "Try a mnemo query",
      vi: "Thử một truy vấn mnemo",
    } satisfies LocalizedText,
    queryPlaceholder: {
      en: "Try a query against a six-node mock corpus…",
      vi: "Thử truy vấn trên kho mock 6 nút…",
    } satisfies LocalizedText,
    queryLiveBadge: {
      en: "live",
      vi: "live",
    } satisfies LocalizedText,
    suggestions: [
      {
        en: "how does the scoring work",
        vi: "thuật toán chấm điểm hoạt động ra sao",
      } satisfies LocalizedText,
      {
        en: "alpine gotchas",
        vi: "lỗi alpine",
      } satisfies LocalizedText,
      {
        en: "edge AI detection on jetson",
        vi: "phát hiện AI biên trên jetson",
      } satisfies LocalizedText,
      {
        en: "release workflow",
        vi: "quy trình phát hành",
      } satisfies LocalizedText,
    ],
    scoringHeader: {
      en: "Scoring breakdown",
      vi: "Phân rã chấm điểm",
    } satisfies LocalizedText,
    avgOfTop: {
      en: "avg of top",
      vi: "trung bình top",
    } satisfies LocalizedText,
    scoreTerms: {
      vector: {
        en: "Vector similarity",
        vi: "Tương đồng vector",
      } satisfies LocalizedText,
      graph: {
        en: "Typed-edge graph",
        vi: "Đồ thị cạnh có kiểu",
      } satisfies LocalizedText,
      recency: {
        en: "Recency (90d half-life)",
        vi: "Độ mới (chu kỳ 90 ngày)",
      } satisfies LocalizedText,
      type: {
        en: "Memory type bias",
        vi: "Trọng số theo loại bộ nhớ",
      } satisfies LocalizedText,
      project: {
        en: "Project scope",
        vi: "Phạm vi dự án",
      } satisfies LocalizedText,
      lexical: {
        en: "Lexical overlap",
        vi: "Trùng lặp từ vựng",
      } satisfies LocalizedText,
    },
    statLabels: {
      accuracy: {
        en: "top-1 accuracy",
        vi: "độ chính xác top-1",
      } satisfies LocalizedText,
      mrr: {
        en: "MRR",
        vi: "MRR",
      } satisfies LocalizedText,
      median: {
        en: "median query",
        vi: "truy vấn trung vị",
      } satisfies LocalizedText,
      tokens: {
        en: "tokens injected per prompt",
        vi: "token mỗi prompt",
      } satisfies LocalizedText,
    },
    topHitsHeader: {
      en: "Top hits",
      vi: "Kết quả phù hợp nhất",
    } satisfies LocalizedText,
    emptyHits: {
      en: "No nodes scored above threshold. Try a more specific term.",
      vi: "Không có nút nào vượt ngưỡng. Hãy thử từ khóa cụ thể hơn.",
    } satisfies LocalizedText,
    demoLabel: {
      en: "Live demo · the real UI",
      vi: "Demo trực tiếp · giao diện thật",
    } satisfies LocalizedText,
    demoFullscreen: {
      en: "Open full-screen",
      vi: "Mở toàn màn hình",
    } satisfies LocalizedText,
    demoIframeTitle: {
      en: "mnemo live Nebula demo — interactive knowledge graph UI",
      vi: "Demo mnemo Nebula trực tiếp — giao diện đồ thị tri thức tương tác",
    } satisfies LocalizedText,
    footerA: {
      en: "The query box above is a six-node mock that mirrors the scoring; the embed is the real shipped demo. Source: ",
      vi: "Khung truy vấn phía trên là mock 6 nút mô phỏng cách chấm điểm; phần nhúng là demo thật đang được phát hành. Mã nguồn: ",
    } satisfies LocalizedText,
    footerLive: {
      en: " · running ",
      vi: " · đang chạy ",
    } satisfies LocalizedText,
    footerLiveTail: {
      en: " as of your visit.",
      vi: " tại lần truy cập của bạn.",
    } satisfies LocalizedText,
  },

  // ---------- Chapter 06 — Constellation ----------
  skills: {
    eyebrow: {
      en: "Chapter 06 · Constellation",
      vi: "Chương 06 · Chòm sao kỹ năng",
    } satisfies LocalizedText,
    headline: {
      en: "Tools I reach for, grouped by where they live in the stack.",
      vi: "Công cụ tôi thường dùng, phân nhóm theo vị trí trong stack.",
    } satisfies LocalizedText,
    subtitleMobile: {
      en: "Eight clusters, one stack. Languages feed Backends, Backends sit on Data, Data sits on Infra; AI/ML borrows from each.",
      vi: "Tám cụm, một stack. Ngôn ngữ nuôi Backend, Backend đặt trên Dữ liệu, Dữ liệu đặt trên Hạ tầng; AI/ML mượn từ tất cả.",
    } satisfies LocalizedText,
    subtitleDesktop: {
      en: "Hover a cluster to see the edges that link it to the rest of the stack — these are the typical seams the projects on this site cross.",
      vi: "Di chuột vào một cụm để thấy các đường nối tới phần còn lại — đó là những đường giao mà các dự án trên trang này thường đi qua.",
    } satisfies LocalizedText,
    groupLabels: {
      Languages: {
        en: "Languages",
        vi: "Ngôn ngữ",
      } satisfies LocalizedText,
      Backend: {
        en: "Backend",
        vi: "Backend",
      } satisfies LocalizedText,
      Frontend: {
        en: "Frontend",
        vi: "Frontend",
      } satisfies LocalizedText,
      "AI / ML": {
        en: "AI / ML",
        vi: "AI / ML",
      } satisfies LocalizedText,
      Data: {
        en: "Data",
        vi: "Dữ liệu",
      } satisfies LocalizedText,
      Infra: {
        en: "Infra",
        vi: "Hạ tầng",
      } satisfies LocalizedText,
      "Edge / IoT": {
        en: "Edge / IoT",
        vi: "Biên / IoT",
      } satisfies LocalizedText,
      Architecture: {
        en: "Architecture",
        vi: "Kiến trúc",
      } satisfies LocalizedText,
    },
    clusterAriaLabel: {
      en: "skills cluster",
      vi: "nhóm kỹ năng",
    } satisfies LocalizedText,
    footerDesktop: {
      en: "Each thin curve marks a seam between clusters that show up together in the projects above — Languages ↔ Backend, AI/ML ↔ Edge, Backend ↔ Data, and so on. ",
      vi: "Mỗi đường cong mảnh đánh dấu một đường giao giữa các cụm thường xuất hiện cùng nhau trong các dự án phía trên — Ngôn ngữ ↔ Backend, AI/ML ↔ Biên, Backend ↔ Dữ liệu, và tương tự. ",
    } satisfies LocalizedText,
    footer: {
      en: "These are the typical seams the projects on this site cross. Reduced-motion users see the same layout without the draw-in.",
      vi: "Đó là những đường giao điển hình mà các dự án trên trang này đi qua. Người dùng prefers-reduced-motion sẽ thấy cùng layout, không có hiệu ứng vẽ vào.",
    } satisfies LocalizedText,
  },

  // ---------- Chapter 07 — Coda ----------
  coda: {
    eyebrow: {
      en: "Chapter 07 · Coda",
      vi: "Chương 07 · Hồi kết",
    } satisfies LocalizedText,
    headline: {
      en: "Let's talk.",
      vi: "Cùng trò chuyện.",
    } satisfies LocalizedText,
    subtitleA: {
      en: "Open to ",
      vi: "Sẵn sàng nhận vai trò ",
    } satisfies LocalizedText,
    subtitleRoleA: {
      en: "Full-Stack Engineer",
      vi: "Kỹ sư Full-Stack",
    } satisfies LocalizedText,
    subtitleB: {
      en: " and ",
      vi: " và ",
    } satisfies LocalizedText,
    subtitleRoleB: {
      en: "Technical Lead",
      vi: "Technical Lead",
    } satisfies LocalizedText,
    subtitleTail: {
      en: " roles. Hanoi-based, GMT+7, response within one working day.",
      vi: ". Tại Hà Nội, GMT+7, phản hồi trong một ngày làm việc.",
    } satisfies LocalizedText,
    emailLabel: {
      en: "Email — tap to copy",
      vi: "Email — nhấn để sao chép",
    } satisfies LocalizedText,
    emailCopyAria: {
      en: "Copy email address {email} to clipboard",
      vi: "Sao chép địa chỉ email {email} vào clipboard",
    } satisfies LocalizedText,
    emailCopiedToast: {
      en: "Email copied",
      vi: "Đã sao chép email",
    } satisfies LocalizedText,
    coffeeLabel: {
      en: "Buy me a coffee",
      vi: "Mời tôi cà phê",
    } satisfies LocalizedText,
    footer: {
      en: "Built with Next.js · Tailwind v4 · GSAP · Lenis · Framer Motion. Source on GitHub. © {year} Quoc Tran Trung.",
      vi: "Xây dựng bằng Next.js · Tailwind v4 · GSAP · Lenis · Framer Motion. Mã nguồn trên GitHub. © {year} Quoc Tran Trung.",
    } satisfies LocalizedText,
  },

  // ---------- SideDots nav ----------
  sideDots: {
    aria: {
      en: "Chapter navigation",
      vi: "Điều hướng chương",
    } satisfies LocalizedText,
    jumpTo: {
      en: "Jump to",
      vi: "Đến",
    } satisfies LocalizedText,
    chapters: {
      "chapter-0": {
        en: "Cold open",
        vi: "Mở đầu",
      } satisfies LocalizedText,
      "chapter-1": {
        en: "Origin",
        vi: "Khởi đầu",
      } satisfies LocalizedText,
      "chapter-2": {
        en: "Crossover",
        vi: "Bước ngoặt",
      } satisfies LocalizedText,
      "chapter-3": {
        en: "Lead arc",
        vi: "Vai trò Lead",
      } satisfies LocalizedText,
      "chapter-4": {
        en: "AIBox",
        vi: "AIBox",
      } satisfies LocalizedText,
      "chapter-5": {
        en: "mnemo",
        vi: "mnemo",
      } satisfies LocalizedText,
      "chapter-6": {
        en: "Constellation",
        vi: "Chòm sao",
      } satisfies LocalizedText,
      "chapter-7": {
        en: "Coda",
        vi: "Hồi kết",
      } satisfies LocalizedText,
    },
  },

  // ---------- /work [slug] detail page ----------
  workArticle: {
    backToHome: {
      en: "Back to portfolio",
      vi: "Quay về portfolio",
    } satisfies LocalizedText,
    backToWork: {
      en: "Back to all work",
      vi: "Quay lại danh sách dự án",
    } satisfies LocalizedText,
    sectionProblem: {
      en: "Problem",
      vi: "Vấn đề",
    } satisfies LocalizedText,
    sectionApproach: {
      en: "Approach",
      vi: "Cách tiếp cận",
    } satisfies LocalizedText,
    sectionGallery: {
      en: "From the live product",
      vi: "Từ sản phẩm thực tế",
    } satisfies LocalizedText,
    sectionStack: {
      en: "Stack",
      vi: "Stack",
    } satisfies LocalizedText,
    sectionLessons: {
      en: "Lessons",
      vi: "Bài học",
    } satisfies LocalizedText,
    metaPeriod: {
      en: "Period",
      vi: "Thời gian",
    } satisfies LocalizedText,
    metaRole: {
      en: "Role",
      vi: "Vai trò",
    } satisfies LocalizedText,
    metaClient: {
      en: "Client",
      vi: "Khách hàng",
    } satisfies LocalizedText,
    deepDiveAria: {
      en: "Read the {name} deep dive",
      vi: "Đọc chi tiết về {name}",
    } satisfies LocalizedText,
  },

  // ---------- /work [slug] 404 ----------
  notFound: {
    eyebrow: {
      en: "404 · Work",
      vi: "404 · Dự án",
    } satisfies LocalizedText,
    headline: {
      en: "That deep-dive isn't shipped yet.",
      vi: "Trang chi tiết này chưa được đăng.",
    } satisfies LocalizedText,
    body: {
      en: "Only a few projects from the bento have full write-ups so far. Head back to the lead-arc chapter to see the rest as tiles.",
      vi: "Hiện chỉ một vài dự án có bài viết chi tiết. Quay lại chương Vai trò Lead để xem phần còn lại dưới dạng tile.",
    } satisfies LocalizedText,
    cta: {
      en: "Back to portfolio",
      vi: "Quay về portfolio",
    } satisfies LocalizedText,
  },
} as const;

/** Substitute `{key}` placeholders in a translation. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}
