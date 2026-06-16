// Single-source data for the work deep-dive routes.
// Each entry's copy is written for a general audience (HR, designers,
// operations, founders) first — engineers can still skim the Stack list
// for the technical signal.
//
// All narrative fields use LocalizedText so the WorkArticle reads the
// right language from useLocale(). Identifiers (slug, name, image src,
// tech stack labels, link hrefs) stay as plain strings — they don't
// translate.

import type { LocalizedText } from "@/lib/i18n";

export type WorkImage = {
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
};

export type WorkEntry = {
  slug: string;
  /** Brand name — never translated. */
  name: string;
  tagline: LocalizedText;
  caption: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  client: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText[];
  /** Tech labels — preserved in English in both locales. */
  stack: string[];
  outcomes: { value: string; label: LocalizedText }[];
  lessons: LocalizedText[];
  images?: WorkImage[];
  links?: { label: LocalizedText; href: string }[];
};

export const works: Record<string, WorkEntry> = {
  aicloud: {
    slug: "aicloud",
    name: "AICloud",
    tagline: {
      en: "The cloud control room that watches every AIBox in the field — alerts, evidence, escalations, and a live map of every site, all in one dashboard.",
      vi: "Phòng điều khiển trên cloud giám sát mọi AIBox ngoài hiện trường — cảnh báo, bằng chứng, leo thang sự cố và bản đồ trực tiếp mọi điểm, tất cả trên một dashboard.",
    },
    caption: {
      en: "Project · SaaS · Live in production",
      vi: "Dự án · SaaS · Đang chạy production",
    },
    period: {
      en: "Jul 2025 — present",
      vi: "Tháng 7/2025 — hiện tại",
    },
    role: {
      en: "Architect and lead full-stack engineer",
      vi: "Architect và Lead Full-stack Engineer",
    },
    client: {
      en: "PathTech JSC — serving Petrolimex Aviation. Live at aivision.petrolimexaviation.com.",
      vi: "Công ty CP PathTech — phục vụ Petrolimex Aviation. Đang chạy tại aivision.petrolimexaviation.com.",
    },
    problem: {
      en: "Edge AI boxes at airports and substations spot real problems all day — missing helmets, oil spills, smoke, unauthorized people — but until something reaches a human, nothing happens. Operations needed a single cloud surface to watch every site at once, see the evidence photo for every alert, route serious incidents to the right person within an SLA, and let admins manage cameras, AI models, roles, and licenses without ever SSHing into a device.",
      vi: "Các AIBox biên tại sân bay và trạm biến áp phát hiện đủ thứ cả ngày — thiếu mũ bảo hộ, tràn dầu, khói, người không phận sự — nhưng chừng nào chưa có người biết thì chẳng có gì xảy ra. Đội vận hành cần một mặt cloud duy nhất để theo dõi mọi điểm cùng lúc, xem ảnh bằng chứng cho từng cảnh báo, định tuyến sự cố nghiêm trọng tới đúng người trong thời hạn SLA, và cho admin quản lý camera, mô hình AI, vai trò, license mà không cần SSH vào thiết bị.",
    },
    approach: [
      {
        en: "Designed a microservices backend split by concern: identity (login, roles, permissions), devices (the AIBox fleet), events (every detection), incidents (grouping events into actionable cases with SLA timers), notifications, licensing, organizations, and a real-time push service that streams alerts to browsers within a second.",
        vi: "Thiết kế backend microservices tách theo mối quan tâm: định danh (đăng nhập, vai trò, quyền), thiết bị (fleet AIBox), sự kiện (mỗi phát hiện), sự cố (gộp sự kiện thành case có timer SLA), thông báo, license, tổ chức, và một service push thời gian thực đẩy cảnh báo tới trình duyệt trong dưới một giây.",
      },
      {
        en: "Built the operator surface in React with a live map, a filterable alerts feed with the AI-annotated photo and short video clip per event, and a tri-state assessment workflow (Unassessed → True / False) so the team's review actions can feed retraining later.",
        vi: "Xây surface operator bằng React với bản đồ trực tiếp, feed cảnh báo có thể lọc kèm ảnh có chú thích AI và clip video ngắn cho mỗi sự kiện, và workflow đánh giá ba trạng thái (Chưa đánh giá → Đúng / Sai) để các hành động duyệt của đội có thể quay lại huấn luyện mô hình.",
      },
      {
        en: "Designed a four-layer permission model — Branch → AIBox → Camera → AI Model — so a regional supervisor only sees their own region and a contractor only sees their own camera. Roles cannot grant rights they don't already hold.",
        vi: "Thiết kế mô hình phân quyền bốn lớp — Chi nhánh → AIBox → Camera → Mô hình AI — để giám sát viên khu vực chỉ thấy khu vực mình và nhà thầu chỉ thấy camera mình. Vai trò không thể cấp quyền mà bản thân chưa có.",
      },
      {
        en: "Shipped a companion mobile app for on-call operators, with 90-day sessions for in-the-field reliability and a join-request flow for new accounts.",
        vi: "Ra mắt app mobile đi kèm cho operator trực, phiên đăng nhập 90 ngày để ổn định khi ngoài hiện trường và luồng yêu cầu tham gia cho tài khoản mới.",
      },
      {
        en: "Wrote a single deploy script that pulls the latest code, rebuilds every service image in parallel, runs database migrations safely, deploys to a three-machine cluster, and verifies health — turns a release from a half-day of work into one command.",
        vi: "Viết một script deploy duy nhất kéo code mới nhất, rebuild song song mọi image service, chạy migration database an toàn, deploy lên cụm ba máy và kiểm tra health — biến một lần release từ nửa ngày công việc thành một lệnh.",
      },
    ],
    stack: [
      "NestJS · TypeScript · pnpm workspaces",
      "PostgreSQL · MikroORM · Redis",
      "Keycloak (OIDC auth)",
      "NATS (service-to-service) · EMQX (MQTT to the edge)",
      "WebSocket real-time push",
      "React 19 · Vite · TanStack Router/Query · oRPC contracts",
      "React Native mobile app",
      "Docker Swarm · Kong gateway",
    ],
    outcomes: [
      {
        value: "10",
        label: {
          en: "backend services in production",
          vi: "service backend trong production",
        },
      },
      {
        value: "15+",
        label: {
          en: "operator surfaces in the web dashboard",
          vi: "màn hình operator trong dashboard web",
        },
      },
      {
        value: "2",
        label: {
          en: "client surfaces (web + mobile)",
          vi: "surface client (web + mobile)",
        },
      },
      {
        value: "1-command",
        label: {
          en: "fleet deploy across 3 nodes",
          vi: "deploy fleet trên 3 node",
        },
      },
    ],
    lessons: [
      {
        en: "Multi-tenant isolation is a discipline, not a feature. Every business request carries an organization context and admins never see anything outside it — enforced at the API layer, the UI layer, and the role editor.",
        vi: "Cô lập multi-tenant là kỷ luật, không phải tính năng. Mọi business request mang theo organization context và admin không bao giờ thấy thứ ở ngoài — được enforce tại lớp API, lớp UI và trình soạn vai trò.",
      },
      {
        en: "Real-time over WebSocket is the right abstraction for a 'control room' UI. Polling for alerts is dead the moment a customer measures it in seconds.",
        vi: "Real-time qua WebSocket là abstraction đúng cho UI kiểu 'phòng điều khiển'. Polling cảnh báo chết ngay khi khách hàng bắt đầu đo bằng giây.",
      },
      {
        en: "Operators don't want one more alert — they want fewer, with better context. Grouping events into incidents with SLA timers is what made the feed actually usable in the field.",
        vi: "Operator không muốn thêm cảnh báo — họ muốn ít hơn, ngữ cảnh tốt hơn. Gộp sự kiện thành sự cố kèm timer SLA mới làm feed thực sự dùng được ngoài hiện trường.",
      },
    ],
    images: [
      {
        src: "/work/aicloud/dashboard.jpg",
        alt: {
          en: "AICloud dashboard — live map of every camera, KPI cards for today's events, recent alerts feed.",
          vi: "Dashboard AICloud — bản đồ trực tiếp mọi camera, thẻ KPI sự kiện hôm nay, feed cảnh báo gần đây.",
        },
        caption: {
          en: "Dashboard — every site at a glance.",
          vi: "Dashboard — mọi điểm trong một cái nhìn.",
        },
      },
      {
        src: "/work/aicloud/cameras.jpg",
        alt: {
          en: "Camera grid view showing the latest AI-annotated frame per camera with status indicators.",
          vi: "Lưới camera hiển thị khung hình AI mới nhất của mỗi camera kèm chỉ báo trạng thái.",
        },
        caption: {
          en: "Cameras — latest AI-annotated frame per stream.",
          vi: "Camera — khung hình AI mới nhất cho từng luồng.",
        },
      },
      {
        src: "/work/aicloud/ai-models.jpg",
        alt: {
          en: "AI models catalog — list of running detection models with camera counts and versions.",
          vi: "Catalogue mô hình AI — danh sách mô hình phát hiện đang chạy kèm số camera và phiên bản.",
        },
        caption: {
          en: "AI models — the catalog of what's running where.",
          vi: "Mô hình AI — catalogue cái nào đang chạy ở đâu.",
        },
      },
      {
        src: "/work/aicloud/aibox-management.jpg",
        alt: {
          en: "AIBox onboarding queue showing edge devices awaiting approval.",
          vi: "Hàng đợi đăng ký AIBox hiển thị các thiết bị biên đang chờ duyệt.",
        },
        caption: {
          en: "AIBox onboarding — new edge devices come in here.",
          vi: "Đăng ký AIBox — thiết bị biên mới vào đây.",
        },
      },
    ],
  },

  aibox: {
    slug: "aibox",
    name: "AIBox",
    tagline: {
      en: "The edge box that does the watching — one rugged NVIDIA Jetson per site, four cameras, real-time safety detection without ever leaving the building.",
      vi: "Chiếc edge box làm nhiệm vụ giám sát — một NVIDIA Jetson chịu được hiện trường mỗi điểm, bốn camera, phát hiện an toàn thời gian thực mà dữ liệu không bao giờ rời khỏi tòa nhà.",
    },
    caption: {
      en: "Project · Edge AI · Live in production",
      vi: "Dự án · Edge AI · Đang chạy production",
    },
    period: {
      en: "Jul 2025 — present",
      vi: "Tháng 7/2025 — hiện tại",
    },
    role: {
      en: "Architect and lead engineer",
      vi: "Architect và Lead Engineer",
    },
    client: {
      en: "PathTech JSC — shipped to Petrolimex Aviation at Noi Bai International Airport and EVN's 110 kV Mo Lao substation. 18+ cameras in production at Noi Bai alone.",
      vi: "Công ty CP PathTech — triển khai cho Petrolimex Aviation tại Sân bay Quốc tế Nội Bài và Trạm 110 kV Mỗ Lao của EVN. Riêng Nội Bài đã có 18+ camera chạy production.",
    },
    problem: {
      en: "A fuel depot or high-voltage substation has cameras everywhere, but no one watches them all day. Pushing every video stream to the cloud for AI is expensive, slow, and stops working the moment the internet hiccups. The site needed AI that runs on a single box right there — spots safety violations in real time, saves a photo and a short video clip as evidence, and only sends finished alerts to the cloud.",
      vi: "Kho xăng hay trạm biến áp cao thế đầy camera, nhưng không ai ngồi nhìn cả ngày. Đẩy mọi luồng video lên cloud để AI xử lý vừa tốn kém, vừa chậm, lại dừng ngay khi mạng chập chờn. Điểm vận hành cần AI chạy trên một chiếc box duy nhất ngay tại chỗ — phát hiện vi phạm an toàn thời gian thực, lưu ảnh và clip video ngắn làm bằng chứng, chỉ gửi cảnh báo hoàn chỉnh lên cloud.",
    },
    approach: [
      {
        en: "Built one Python service that runs continuously on the Jetson box, pulls live video from every camera on site, and runs the right AI models against each one in real time. No cloud round-trip for inference.",
        vi: "Xây dựng một service Python chạy liên tục trên Jetson, kéo video trực tiếp từ mọi camera tại điểm và chạy đúng mô hình AI lên từng camera theo thời gian thực. Không có vòng cloud cho inference.",
      },
      {
        en: "Designed a per-camera pipeline so each camera owns its own thread, its own queue, and its own settings — one camera misbehaving never drags down the others. Models can be swapped on a live camera with zero downtime.",
        vi: "Thiết kế pipeline theo từng camera để mỗi camera sở hữu thread riêng, queue riêng và cấu hình riêng — một camera trục trặc không bao giờ kéo theo các camera khác. Có thể hoán đổi mô hình trên một camera đang chạy mà không gián đoạn.",
      },
      {
        en: "Built a three-layer event-dedup system: track each detected object so a static violation only fires once; spatially bucket bounding boxes so duplicates within seconds collapse; and a hard per-(camera × violation) cooldown so a single standing scene doesn't generate hundreds of alerts.",
        vi: "Xây hệ thống chống trùng sự kiện ba lớp: theo dõi từng vật thể phát hiện để một vi phạm đứng yên chỉ kích hoạt một lần; gom bounding box theo không gian để các trùng lặp trong vài giây co lại; và cooldown cứng theo từng (camera × loại vi phạm) để một khung cảnh đứng không tạo ra hàng trăm cảnh báo.",
      },
      {
        en: "Added a static-region suppressor that auto-learns the camera's painted lines, signs, and fixed objects — and stops re-flagging them as fresh detections every time the tracker resets.",
        vi: "Bổ sung bộ chặn vùng tĩnh tự học các đường kẻ, biển báo và vật cố định trong khung hình camera — và ngừng đánh cờ chúng như phát hiện mới mỗi khi tracker reset.",
      },
      {
        en: "Always-on pre-roll: a tiny background process keeps the last few seconds of every camera in a ring buffer, so when an event fires the system already has video from before it happened — no second connection, no missed keyframes.",
        vi: "Pre-roll luôn bật: một tiến trình nền nhỏ giữ vài giây cuối cùng của mỗi camera trong ring buffer, nên khi sự kiện xảy ra hệ thống đã có video từ trước đó — không cần kết nối lần hai, không mất keyframe.",
      },
      {
        en: "Streamed annotated video back to operators over WebRTC, RTSP, or MJPEG depending on the client — and synced events to the cloud over MQTT.",
        vi: "Phát video có chú thích cho operator qua WebRTC, RTSP hoặc MJPEG tùy theo client — và đồng bộ sự kiện lên cloud qua MQTT.",
      },
    ],
    stack: [
      "Python 3.12 · FastAPI · SQLAlchemy",
      "PyTorch · Ultralytics YOLO v8/v11 · OpenCV",
      "FaceNet (face recognition)",
      "PostgreSQL + pgvector (512-dim face embeddings)",
      "MQTT (cloud sync) · WebRTC · RTSP · MJPEG",
      "NVIDIA Jetson · CUDA 12.8 · MediaMTX",
    ],
    outcomes: [
      {
        value: "18",
        label: {
          en: "distinct AI model types (helmet, oil-spill, smoke, plate, face, …)",
          vi: "loại mô hình AI khác nhau (mũ bảo hộ, tràn dầu, khói, biển số, khuôn mặt, …)",
        },
      },
      {
        value: "91",
        label: {
          en: "REST endpoints across 13 routers",
          vi: "endpoint REST trên 13 router",
        },
      },
      {
        value: "4",
        label: {
          en: "concurrent CCTV streams per box",
          vi: "luồng CCTV đồng thời trên mỗi box",
        },
      },
      {
        value: "2",
        label: {
          en: "live production deployments (airport + substation)",
          vi: "triển khai production thực tế (sân bay + trạm biến áp)",
        },
      },
    ],
    lessons: [
      {
        en: "Hardware-aware throttling beats hardware-blind retries. The pipeline reads GPU temperature and free memory and stretches its inference cadence before things go wrong, not after.",
        vi: "Throttling hiểu phần cứng thắng retry mù phần cứng. Pipeline đọc nhiệt độ GPU và bộ nhớ trống rồi giãn nhịp inference trước khi có sự cố, không phải sau.",
      },
      {
        en: "Operators want one alert per real event, not 374,000 in ten minutes. The dedup ladder (object track → spatial bucket → hard cooldown) is the difference between 'safety system' and 'noise generator'.",
        vi: "Operator muốn một cảnh báo cho mỗi sự kiện thật, không phải 374,000 cảnh báo trong mười phút. Bậc thang chống trùng (track vật thể → gom không gian → cooldown cứng) là ranh giới giữa 'hệ thống an toàn' và 'máy phát tiếng ồn'.",
      },
      {
        en: "Never use auto-reload in production for a long-lived multi-camera service. It double-loads weights, doubles VRAM, and kills capture threads mid-frame. Restart, don't reload.",
        vi: "Đừng bao giờ dùng auto-reload trong production cho một service multi-camera dài hạn. Nó tải weight hai lần, gấp đôi VRAM và giết thread capture giữa khung hình. Hãy restart, đừng reload.",
      },
    ],
    images: [
      {
        src: "/work/aibox/scene-day.jpg",
        alt: {
          en: "Daytime frame at Petrolimex Aviation, Noi Bai — refueling tanker with an airliner in the background; AIBox annotates each person with PPE status (red=violation, green=compliant, yellow=unknown), each box tagged with a stable track ID.",
          vi: "Khung hình ban ngày tại Petrolimex Aviation, Nội Bài — xe bồn tiếp nhiên liệu với máy bay phía sau; AIBox chú thích trạng thái PPE từng người (đỏ=vi phạm, xanh lá=tuân thủ, vàng=chưa rõ), mỗi box gắn track ID ổn định.",
        },
        caption: {
          en: "Daytime · Noi Bai apron — PPE assessment per person, stable track IDs across frames.",
          vi: "Ban ngày · Sân đỗ Nội Bài — đánh giá PPE cho từng người, track ID ổn định qua các khung hình.",
        },
      },
      {
        src: "/work/aibox/scene-night.jpg",
        alt: {
          en: "Night frame at the same site — refueling tanker, two compliant workers in green, one PPE-negative person in red, the ROI overlay traced around the operational zone.",
          vi: "Khung hình ban đêm tại cùng điểm — xe bồn tiếp nhiên liệu, hai công nhân tuân thủ màu xanh, một người không có PPE màu đỏ, overlay ROI vẽ quanh vùng vận hành.",
        },
        caption: {
          en: "Night · 23:16 local — same models, same site, no human watching the feed.",
          vi: "Đêm · 23:16 giờ địa phương — cùng mô hình, cùng điểm, không ai ngồi xem feed.",
        },
      },
    ],
  },

  unlimit: {
    slug: "unlimit",
    name: "Unlimit",
    tagline: {
      en: "A platform that lets agencies plug WhatsApp into their CRM — many phones, many brands, many agents, one inbox.",
      vi: "Nền tảng cho phép agency cắm WhatsApp vào CRM — nhiều số máy, nhiều thương hiệu, nhiều agent, một inbox.",
    },
    caption: {
      en: "Project · Multi-tenant SaaS · Live in production",
      vi: "Dự án · SaaS multi-tenant · Đang chạy production",
    },
    period: {
      en: "2026",
      vi: "2026",
    },
    role: {
      en: "Full-stack engineer",
      vi: "Kỹ sư Full-stack",
    },
    client: {
      en: "GoSetter — live at admin.unlimit.gosetter.ai. Agency-style platform: a parent account creates 'apps' for each brand or sub-client and attaches WhatsApp devices to each.",
      vi: "GoSetter — đang chạy tại admin.unlimit.gosetter.ai. Nền tảng kiểu agency: tài khoản gốc tạo 'app' cho mỗi thương hiệu hay khách hàng con và gắn thiết bị WhatsApp vào từng app.",
    },
    problem: {
      en: "Sales agencies want to message customers on WhatsApp the way they already message them in their CRM — but WhatsApp has phones, not seats, and a real agency runs dozens of phones across many brands. The platform needed to let an agency add a phone, scan a QR code to pair it, and from then on every inbound WhatsApp message routes to the right agent inside their existing CRM (GoHighLevel) and every CRM reply goes back out to the customer's phone.",
      vi: "Các agency bán hàng muốn nhắn cho khách qua WhatsApp đúng cách họ đã làm trong CRM — nhưng WhatsApp có số máy, không có ghế, và một agency thực tế chạy hàng chục số máy trên nhiều thương hiệu. Nền tảng cần cho phép agency thêm số máy, quét QR để ghép cặp, và từ đó mọi tin WhatsApp đến được định tuyến tới đúng agent bên trong CRM đang dùng (GoHighLevel) và mọi phản hồi từ CRM đi ngược ra số máy của khách.",
    },
    approach: [
      {
        en: "Designed a true multi-tenant architecture: every agency gets its own isolated database schema on signup. No customer of one agency can ever see another agency's data, even by accident.",
        vi: "Thiết kế kiến trúc multi-tenant thực sự: mỗi agency có schema database riêng biệt khi đăng ký. Khách hàng của agency này không bao giờ thấy dữ liệu của agency khác, kể cả tình cờ.",
      },
      {
        en: "Built the WhatsApp integration as a separate worker process so a customer's connections survive every deploy. WhatsApp sessions are backed up to object storage and restored automatically if the worker restarts.",
        vi: "Xây tích hợp WhatsApp thành một worker process riêng để kết nối của khách sống qua mỗi lần deploy. Phiên WhatsApp được sao lưu lên object storage và tự khôi phục nếu worker restart.",
      },
      {
        en: "Wrote a permissions matrix loaded from the database into memory — Super Admin, Agency Admin, Manager, Agent — with the ability to re-sync without code changes.",
        vi: "Viết ma trận phân quyền nạp từ database vào bộ nhớ — Super Admin, Agency Admin, Manager, Agent — có thể đồng bộ lại mà không cần sửa code.",
      },
      {
        en: "Plugged the platform into GoHighLevel as both a CRM (every inbound message becomes a conversation) and a billing layer (more apps or more devices = an automatic subscription bump).",
        vi: "Cắm nền tảng vào GoHighLevel vừa như CRM (mọi tin đến trở thành cuộc hội thoại) vừa như lớp tính phí (thêm app hay thêm thiết bị = tự động tăng gói).",
      },
      {
        en: "Built the front-end with TanStack Router and Query so the UI is fully typed, fast, and only fetches what's on screen.",
        vi: "Xây front-end bằng TanStack Router và Query để UI được type đầy đủ, nhanh, và chỉ fetch những gì đang hiển thị.",
      },
    ],
    stack: [
      "Node.js · TypeScript · Express · Sequelize",
      "PostgreSQL (schema-per-tenant) · Redis · Bull queues",
      "Evolution API (self-hosted WhatsApp bridge)",
      "GoHighLevel OAuth + Conversation Provider",
      "Cloudflare R2 / MinIO (media + session backup)",
      "React 19 · Vite · Tailwind v4 · TanStack Router/Query · shadcn-style UI",
    ],
    outcomes: [
      {
        value: "4",
        label: {
          en: "roles in the permissions matrix",
          vi: "vai trò trong ma trận phân quyền",
        },
      },
      {
        value: "1",
        label: {
          en: "schema per tenant (true isolation)",
          vi: "schema mỗi tenant (cô lập thực sự)",
        },
      },
      {
        value: "2-process",
        label: {
          en: "split: API + worker on shared DB / Redis",
          vi: "tách: API + worker chia sẻ DB / Redis",
        },
      },
      {
        value: "live",
        label: {
          en: "in production with paying customers",
          vi: "đang chạy production với khách hàng trả phí",
        },
      },
    ],
    lessons: [
      {
        en: "Schema-per-tenant pays for itself the first time you onboard a customer whose data must never appear in anyone else's report. Cross-tenant queries become impossible by construction, not by code review.",
        vi: "Schema-per-tenant trả công ngay lần đầu bạn nhận một khách hàng mà dữ liệu của họ không được phép xuất hiện trong báo cáo của ai khác. Truy vấn xuyên tenant trở nên bất khả thi bằng thiết kế, không phải bằng code review.",
      },
      {
        en: "WhatsApp sessions are precious — losing them on a deploy means every customer's phone has to re-pair. Backing them up to object storage so the worker can rehydrate on restart is the difference between a smooth release and a Sunday-night incident.",
        vi: "Phiên WhatsApp là vàng — mất nó khi deploy nghĩa là số máy của từng khách phải ghép cặp lại. Sao lưu lên object storage để worker khôi phục khi restart là ranh giới giữa một lần release suôn sẻ và một sự cố tối Chủ nhật.",
      },
      {
        en: "The CRM is the user. Once we modeled GoHighLevel as the primary surface — and Unlimit as the WhatsApp adapter — every confusing product decision got easier.",
        vi: "CRM chính là người dùng. Khi mô hình hóa GoHighLevel là surface chính — và Unlimit là adapter WhatsApp — mọi quyết định sản phẩm rối rắm đều dễ hơn.",
      },
    ],
    images: [
      {
        src: "/work/unlimit/apps.jpg",
        alt: {
          en: "Unlimit organization apps page — list of brands / sub-clients an agency manages.",
          vi: "Trang app của tổ chức Unlimit — danh sách thương hiệu / khách hàng con mà agency quản lý.",
        },
        caption: {
          en: "Apps — each one is a separate brand, with its own WhatsApp devices and routing.",
          vi: "App — mỗi app là một thương hiệu riêng với thiết bị WhatsApp và định tuyến riêng.",
        },
      },
      {
        src: "/work/unlimit/agencies.jpg",
        alt: {
          en: "Agencies list view (super-admin scope).",
          vi: "Danh sách agency (phạm vi super-admin).",
        },
        caption: {
          en: "Agencies — the agency-of-agencies view for platform admins.",
          vi: "Agency — góc nhìn agency-trên-agency cho admin nền tảng.",
        },
      },
      {
        src: "/work/unlimit/ghl-connections.jpg",
        alt: {
          en: "GoHighLevel CRM connections page — manage the OAuth links between Unlimit and a customer's CRM.",
          vi: "Trang kết nối CRM GoHighLevel — quản lý liên kết OAuth giữa Unlimit và CRM của khách hàng.",
        },
        caption: {
          en: "GHL connections — every agency plugs into their own GoHighLevel here.",
          vi: "Kết nối GHL — mỗi agency cắm vào GoHighLevel của riêng họ tại đây.",
        },
      },
    ],
  },

  keanu: {
    slug: "keanu",
    name: "Keanu Residences",
    tagline: {
      en: "A reservation platform for a luxury villa launch in Bali — browse, shortlist, lock a unit for a few minutes, deposit, done.",
      vi: "Nền tảng đặt chỗ cho đợt mở bán biệt thự cao cấp tại Bali — duyệt, chọn, khóa căn vài phút, đặt cọc, xong.",
    },
    caption: {
      en: "Project · Luxury real estate · Live in production",
      vi: "Dự án · Bất động sản cao cấp · Đang chạy production",
    },
    period: {
      en: "2026",
      vi: "2026",
    },
    role: {
      en: "Full-stack engineer",
      vi: "Kỹ sư Full-stack",
    },
    client: {
      en: "Keanu Residences (Sunrise Coast Living) — live at sales.keanubali.com. A branded villa development in Bali; this is the platform their sales team and buyers use during launch events.",
      vi: "Keanu Residences (Sunrise Coast Living) — đang chạy tại sales.keanubali.com. Một dự án biệt thự được định vị thương hiệu tại Bali; đây là nền tảng đội bán hàng và người mua dùng trong các đợt mở bán.",
    },
    problem: {
      en: "Luxury villa launches are competitive: dozens of buyers may want the same unit the moment a launch goes live. A first-come spreadsheet doesn't work — by the time someone refreshes, the unit is gone. Buyers need to lock a unit for a few minutes while they read terms and pay, the system needs to guarantee one buyer per unit, and the whole experience needs to feel as polished as the property itself.",
      vi: "Các đợt mở bán biệt thự cao cấp rất cạnh tranh: hàng chục người mua có thể cùng muốn một căn ngay khi đợt mở bán bắt đầu. Spreadsheet ai trước được trước không ổn — đến lúc refresh thì căn đã bay. Người mua cần khóa căn vài phút để đọc điều khoản và thanh toán, hệ thống cần đảm bảo một người mua một căn, và toàn bộ trải nghiệm phải cảm giác mượt mà như chính bất động sản đó.",
    },
    approach: [
      {
        en: "Built an atomic unit-locking system on top of Redis — when a buyer reserves a unit, that unit is held for them only, no one else can lock it, and the lock auto-releases on a timer if they don't complete payment.",
        vi: "Xây hệ thống khóa căn nguyên tử trên nền Redis — khi người mua đặt giữ một căn, căn đó được giữ riêng cho họ, không ai khác khóa được, và khóa tự nhả theo timer nếu họ không hoàn tất thanh toán.",
      },
      {
        en: "Designed a waiting queue so the moment a lock releases, the next person interested gets first dibs — no refresh races, no over-booking.",
        vi: "Thiết kế hàng đợi để ngay khi khóa nhả, người tiếp theo quan tâm được ưu tiên đầu tiên — không có đua refresh, không bị overbook.",
      },
      {
        en: "Connected the system to Stripe with a proper webhook flow: deposit captured, unit confirmed, lock converted into a real reservation, all in one transaction.",
        vi: "Nối hệ thống với Stripe bằng luồng webhook đúng chuẩn: nhận đặt cọc, xác nhận căn, chuyển khóa thành đặt chỗ thật — tất cả trong một giao dịch.",
      },
      {
        en: "Pushed live availability over WebSocket so the visual masterplan updates the second a unit changes state — buyers see other units sell in real time, which is exactly the urgency a launch is built around.",
        vi: "Đẩy tình trạng sẵn có trực tiếp qua WebSocket để masterplan trực quan cập nhật ngay khoảnh khắc một căn đổi trạng thái — người mua thấy căn khác bán hết theo thời gian thực, đúng cảm giác cấp bách mà một đợt mở bán cần.",
      },
      {
        en: "Wired buyer activity into GoHighLevel as a CRM event stream — Signed Up → Shortlisted → Reserved → Deposited become tagged contacts that trigger sales follow-up automatically.",
        vi: "Đưa hoạt động của người mua vào GoHighLevel dưới dạng luồng sự kiện CRM — Đăng ký → Đưa vào shortlist → Đặt giữ → Đặt cọc trở thành các contact gắn tag, tự kích hoạt follow-up bán hàng.",
      },
      {
        en: "Built a small admin scheduler: pick the launch date and time, and a background job flips the project to LIVE at the exact second, broadcasts to every connected client, and starts accepting reservations.",
        vi: "Xây scheduler admin nhỏ: chọn ngày giờ mở bán và một background job lật dự án sang LIVE đúng giây đó, phát cho mọi client đang kết nối, và bắt đầu nhận đặt chỗ.",
      },
    ],
    stack: [
      "NestJS 11 · TypeScript · Prisma · PostgreSQL",
      "Redis · Bull queues",
      "Socket.io WebSocket gateways",
      "Stripe (payment intents + webhooks + embedded checkout)",
      "GoHighLevel CRM (OAuth + tagged contacts)",
      "Cloudinary · Nodemailer",
      "React 19 · Vite · Tailwind v4 · react-router-dom v7",
    ],
    outcomes: [
      {
        value: "atomic",
        label: {
          en: "unit reservation lock under concurrent load",
          vi: "khóa đặt căn dưới tải đồng thời",
        },
      },
      {
        value: "real-time",
        label: {
          en: "availability across every connected device",
          vi: "tình trạng sẵn có trên mọi thiết bị đang kết nối",
        },
      },
      {
        value: "scheduled",
        label: {
          en: "launches go live at the configured second",
          vi: "đợt mở bán đi vào hoạt động đúng giây đã cấu hình",
        },
      },
      {
        value: "live",
        label: {
          en: "in production for ongoing villa sales",
          vi: "đang chạy production cho các đợt bán biệt thự",
        },
      },
    ],
    lessons: [
      {
        en: "Concurrency problems must be solved at the right layer. A database transaction can't stop two buyers from clicking the same unit at the same time — only an atomic Redis lock with a waiting queue can. We had to put the lock above the database, not in it.",
        vi: "Vấn đề concurrency phải giải tại đúng tầng. Một transaction database không thể ngăn hai người mua click cùng một căn cùng lúc — chỉ Redis lock nguyên tử kèm hàng đợi mới làm được. Khóa phải đặt trên database, không phải trong nó.",
      },
      {
        en: "Buyers can feel the urgency of a launch only when it's visibly real. Pushing availability over WebSocket so other units 'sell out' as you scroll is what turns a website into an event.",
        vi: "Người mua chỉ cảm nhận được cảm giác cấp bách khi nó hiện hữu trước mắt. Đẩy tình trạng sẵn có qua WebSocket để các căn khác 'bán hết' khi bạn cuộn trang là thứ biến một website thành một sự kiện.",
      },
      {
        en: "Sales operations live in their CRM. Sending every meaningful buyer event into GoHighLevel as a tagged contact is what lets the sales team automate follow-up without ever touching our database.",
        vi: "Bộ phận vận hành bán hàng sống trong CRM của họ. Gửi mọi sự kiện đáng kể của người mua vào GoHighLevel dưới dạng contact gắn tag mới cho phép đội bán tự động hóa follow-up mà không cần chạm vào database của chúng tôi.",
      },
    ],
    images: [
      {
        src: "/work/keanu/residences.jpg",
        alt: {
          en: "Keanu Residences buyer landing page — luxury villa gallery and brand surface.",
          vi: "Trang đích Keanu Residences cho người mua — gallery biệt thự cao cấp và mặt thương hiệu.",
        },
        caption: {
          en: "Buyer landing — the surface every prospect lands on at launch.",
          vi: "Trang đích cho người mua — surface mà mọi khách tiềm năng đặt chân tới khi mở bán.",
        },
      },
      {
        src: "/work/keanu/masterplan.jpg",
        alt: {
          en: "Interactive masterplan — see every villa on the site and their availability status.",
          vi: "Masterplan tương tác — xem mọi biệt thự trong dự án và trạng thái sẵn có.",
        },
        caption: {
          en: "Interactive masterplan — live availability updates push from server to client.",
          vi: "Masterplan tương tác — cập nhật tình trạng sẵn có đẩy từ server xuống client theo thời gian thực.",
        },
      },
      {
        src: "/work/keanu/admin-villas.jpg",
        alt: {
          en: "Admin villa management — control unit availability, pricing, and launch timing.",
          vi: "Quản trị biệt thự — điều khiển tình trạng sẵn có, giá và thời điểm mở bán.",
        },
        caption: {
          en: "Admin villas — control unit availability, pricing, and launch state.",
          vi: "Admin biệt thự — điều khiển tình trạng sẵn có, giá và trạng thái mở bán.",
        },
      },
    ],
  },

  swisslife: {
    slug: "swisslife",
    name: "Swisslife",
    tagline: {
      en: "A platform that sends personal documents to thousands of people, gets each one to verify with a one-time code, and tracks every step for compliance.",
      vi: "Nền tảng gửi tài liệu cá nhân tới hàng nghìn người, yêu cầu mỗi người xác minh bằng mã OTP và theo dõi từng bước phục vụ tuân thủ.",
    },
    caption: {
      en: "Project · Microservices · Document dispatch",
      vi: "Dự án · Microservices · Gửi tài liệu",
    },
    period: {
      en: "2025 — 2026",
      vi: "2025 — 2026",
    },
    role: {
      en: "Backend engineer",
      vi: "Kỹ sư Backend",
    },
    client: {
      en: "Insurance / financial-services domain client.",
      vi: "Khách hàng thuộc lĩnh vực bảo hiểm / tài chính.",
    },
    problem: {
      en: "Insurance work means sending personal documents — policy updates, claim packs, statements — to thousands of people at once, and proving who opened what, when. Email by itself isn't enough: the recipient needs to verify they are who they say they are before any document is shown. The system needed bulk dispatch, time-limited personal links, one-time codes via SMS or email, an unforgeable audit trail, scheduled reminders, and an export-ready report for compliance reviews.",
      vi: "Công việc bảo hiểm là gửi tài liệu cá nhân — cập nhật hợp đồng, hồ sơ bồi thường, sao kê — tới hàng nghìn người cùng lúc, và chứng minh được ai mở cái gì, khi nào. Riêng email là không đủ: người nhận phải xác minh đúng là họ trước khi xem bất kỳ tài liệu nào. Hệ thống cần gửi hàng loạt, link cá nhân giới hạn thời gian, mã OTP qua SMS hoặc email, nhật ký kiểm toán không thể giả mạo, nhắc lịch tự động, và báo cáo sẵn sàng xuất ra cho việc rà soát tuân thủ.",
    },
    approach: [
      {
        en: "Split the platform into one service per concern: login, settings, the campaigns themselves (envoi), recipients, documents, email, reminders, one-time codes, reports, audit. Each service owns its own database — no shared tables, no hidden coupling.",
        vi: "Chia nền tảng thành một service cho mỗi mối quan tâm: đăng nhập, cấu hình, các chiến dịch (envoi), người nhận, tài liệu, email, nhắc lịch, mã OTP, báo cáo, kiểm toán. Mỗi service sở hữu database riêng — không chia sẻ bảng, không coupling ngầm.",
      },
      {
        en: "Wired every service to a message bus so anything that happens — an email opened, a code verified, a document downloaded — fires an event that the audit service catches and writes into an unalterable time-series log.",
        vi: "Đấu mọi service vào message bus để bất cứ điều gì xảy ra — email được mở, OTP được xác minh, tài liệu được tải — bắn ra một event mà service audit bắt và ghi vào nhật ký time-series không thể chỉnh sửa.",
      },
      {
        en: "Consolidated two separate one-time-code systems into a single authority service; every other service now asks for codes over gRPC instead of duplicating the logic.",
        vi: "Gộp hai hệ thống OTP riêng biệt thành một service authority duy nhất; mọi service khác giờ xin mã qua gRPC thay vì lặp lại logic.",
      },
      {
        en: "Designed the reporting service to pull from each service's database read-only, generate a four-sheet Excel workbook (summary, recipients, events, analytics) with charts inline, and cache the result for an hour so big workbooks don't get regenerated for every click.",
        vi: "Thiết kế service báo cáo đọc-chỉ từ database của từng service, tạo workbook Excel bốn sheet (tổng quan, người nhận, sự kiện, phân tích) kèm biểu đồ inline, và cache kết quả trong một giờ để workbook lớn không bị tạo lại với mỗi cú click.",
      },
      {
        en: "Configured Kong gateway in declarative mode — every route, every rate limit, every plugin is checked into git, no runtime config drift.",
        vi: "Cấu hình Kong gateway ở chế độ declarative — mọi route, mọi rate limit, mọi plugin đều check vào git, không có drift cấu hình runtime.",
      },
      {
        en: "Stood up Prometheus, Grafana, and Jaeger in the dev compose so observability is wired before the first feature ships, not after the first outage.",
        vi: "Dựng Prometheus, Grafana và Jaeger trong compose dev để observability được đấu nối trước khi tính năng đầu tiên ra mắt, không phải sau sự cố đầu tiên.",
      },
    ],
    stack: [
      "Go 1.24 (9 services) · NestJS/TypeScript (email service)",
      "PostgreSQL · MongoDB (documents + audit) · Redis (sessions, OTP cache, report cache)",
      "NATS JetStream (8 streams)",
      "Kong gateway (DB-less, declarative)",
      "MinIO (document storage)",
      "Twilio (SMS OTP) · SMTP (email)",
      "Prometheus · Grafana · Jaeger",
    ],
    outcomes: [
      {
        value: "10",
        label: {
          en: "services from one monolith",
          vi: "service tách ra từ một monolith",
        },
      },
      {
        value: "8",
        label: {
          en: "JetStream streams in the event bus",
          vi: "stream JetStream trong event bus",
        },
      },
      {
        value: "1",
        label: {
          en: "command to start the full local stack",
          vi: "lệnh để khởi động toàn bộ stack local",
        },
      },
      {
        value: "0",
        label: {
          en: "shared databases between services",
          vi: "database chia sẻ giữa các service",
        },
      },
    ],
    lessons: [
      {
        en: "Stand up the observability stack before the first service ships. Adding tracing after an outage is twice the work and you've already missed the bug.",
        vi: "Dựng stack observability trước khi service đầu tiên ra mắt. Thêm tracing sau sự cố là tốn gấp đôi công sức và bạn đã bỏ lỡ lỗi rồi.",
      },
      {
        en: "One-time codes should live in exactly one service. Every other service that needs them calls over gRPC. Duplicate OTP systems are a refactor waiting to happen.",
        vi: "Mã OTP nên sống ở đúng một service. Mọi service khác cần thì gọi qua gRPC. Các hệ thống OTP trùng lặp là một refactor đang chờ tới phiên.",
      },
      {
        en: "Kong's declarative config is the right abstraction for cross-cutting concerns — auth, rate limit, body validation, OpenAPI rewrites all in version-controlled YAML, never in a clicked-through admin panel.",
        vi: "Cấu hình declarative của Kong là abstraction đúng cho các mối quan tâm xuyên tầng — auth, rate limit, validation body, rewrite OpenAPI đều trong YAML có version control, không bao giờ trong admin panel click-tay.",
      },
    ],
  },

  mnemo: {
    slug: "mnemo",
    name: "mnemo",
    tagline: {
      en: "A local-first memory layer for Claude Code — turns scattered notes into searchable, cited context the AI gets fed automatically.",
      vi: "Lớp bộ nhớ local-first cho Claude Code — biến các ghi chú rải rác thành ngữ cảnh có thể tìm kiếm và trích dẫn, được tự động đưa cho AI.",
    },
    caption: {
      en: "Project · Open source · Maintainer",
      vi: "Dự án · Mã nguồn mở · Maintainer",
    },
    period: {
      en: "Apr 2026 — present",
      vi: "Tháng 4/2026 — hiện tại",
    },
    role: {
      en: "Creator and maintainer",
      vi: "Tác giả và maintainer",
    },
    client: {
      en: "Open source — github.com/mmct-jsc/mnemo. Used by me daily across every project on this site.",
      vi: "Mã nguồn mở — github.com/mmct-jsc/mnemo. Bản thân tôi dùng hằng ngày trên mọi dự án trong trang này.",
    },
    problem: {
      en: "Anyone using an AI coding assistant has lessons, decisions, and notes scattered across folders and projects. The assistant doesn't remember any of it across sessions, so you keep teaching it the same things. mnemo collects those notes into a small graph that lives on your laptop, finds the most relevant pieces every time you ask the AI a question, and feeds them into the conversation as cited context — never more than a few hundred tokens at a time.",
      vi: "Ai dùng trợ lý AI viết code cũng có bài học, quyết định và ghi chú rải khắp các thư mục và dự án. Trợ lý không nhớ gì giữa các phiên, nên bạn cứ phải dạy lại những thứ cũ. mnemo gom các ghi chú đó thành một đồ thị nhỏ sống trên laptop của bạn, tìm ra những mảnh phù hợp nhất mỗi lần bạn hỏi AI và đưa vào cuộc trò chuyện dưới dạng ngữ cảnh có trích dẫn — không bao giờ quá vài trăm token mỗi lần.",
    },
    approach: [
      {
        en: "Built a small Python daemon that runs locally on your computer and indexes every memory file under your `~/.claude/` folder.",
        vi: "Xây một daemon Python nhỏ chạy local trên máy bạn và index mọi file bộ nhớ trong thư mục `~/.claude/`.",
      },
      {
        en: "Designed a six-term scoring formula that combines vector similarity, typed-edge graph traversal, recency, memory type, project scope, and exact word matches — beats pure vector search on a curated benchmark.",
        vi: "Thiết kế công thức chấm điểm sáu thành phần kết hợp tương đồng vector, duyệt đồ thị cạnh có kiểu, độ mới, loại bộ nhớ, phạm vi dự án và khớp từ chính xác — vượt vector search thuần trên một benchmark được tuyển chọn.",
      },
      {
        en: "Shipped it as a Claude Code plugin: install once, every prompt you type to the AI gets the most relevant memory automatically injected, capped at 800 tokens so it never blows your context budget.",
        vi: "Phát hành dưới dạng plugin Claude Code: cài một lần, mỗi prompt bạn gõ cho AI đều tự được chèn bộ nhớ phù hợp nhất, giới hạn 800 token để không bao giờ làm tràn ngân sách ngữ cảnh.",
      },
      {
        en: "Added a small local web UI (graph view, search, edit) so you can see what memory the AI is being given.",
        vi: "Bổ sung giao diện web local nhỏ (xem đồ thị, tìm kiếm, sửa) để bạn thấy AI đang được đưa bộ nhớ gì.",
      },
      {
        en: "Cross-platform installer (Linux, macOS, Windows) and a clean release pipeline through GitHub Actions.",
        vi: "Bộ cài đa nền tảng (Linux, macOS, Windows) và pipeline phát hành gọn gàng qua GitHub Actions.",
      },
    ],
    stack: [
      "Python 3.11+ · FastAPI · uvicorn",
      "SQLite + sqlite-vec (vector store)",
      "sentence-transformers MiniLM (22 MB embedder)",
      "Claude Code plugin (skills + hooks + slash commands)",
      "Alpine.js + hand-rolled CSS (no Tailwind in the UI)",
      "GitHub Actions CI/CD",
    ],
    outcomes: [
      {
        value: "100%",
        label: {
          en: "top-1 accuracy on the curated benchmark",
          vi: "độ chính xác top-1 trên benchmark tuyển chọn",
        },
      },
      {
        value: "1.000",
        label: {
          en: "mean reciprocal rank (MRR)",
          vi: "mean reciprocal rank (MRR)",
        },
      },
      {
        value: "17 ms",
        label: {
          en: "median query latency",
          vi: "độ trễ truy vấn trung vị",
        },
      },
      {
        value: "live",
        label: {
          en: "see chapter 05 for the version badge",
          vi: "xem chương 05 cho badge phiên bản",
        },
      },
    ],
    lessons: [
      {
        en: "87 % of the query time is the embedder's forward pass. Everything else is rounding error — so optimization energy goes there or nowhere.",
        vi: "87 % thời gian truy vấn là forward pass của embedder. Phần còn lại chỉ là sai số làm tròn — nên năng lượng tối ưu phải đổ vào đó, không thì thôi.",
      },
      {
        en: "Hash-gated ingestion is the unlock. Re-embedding only what actually changed turns a 'reindex' button from a coffee-break into 50 ms.",
        vi: "Ingestion có hash gate là chìa khóa. Chỉ embed lại những gì thực sự thay đổi biến nút 'reindex' từ một tách cà phê thành 50 ms.",
      },
      {
        en: "Branch-protected main on a solo project sounds excessive until the first half-baked branch saves itself from shipping.",
        vi: "Bảo vệ branch main trên một dự án solo nghe có vẻ quá mức cho tới khi branch nửa vời đầu tiên tự cứu mình khỏi việc được phát hành.",
      },
    ],
    links: [
      {
        label: {
          en: "GitHub",
          vi: "GitHub",
        },
        href: "https://github.com/mmct-jsc/mnemo",
      },
      {
        label: {
          en: "Live demo",
          vi: "Demo trực tiếp",
        },
        href: "https://mmct-jsc.github.io/mnemo/",
      },
    ],
  },
};

export const workSlugs = Object.keys(works);
