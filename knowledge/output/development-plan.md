# Prop Firm 中文导航社区站 — 开发方案与开发计划

> 基于 `knowledge/input/prd.md`（propfirmvip.com 调研）与 `knowledge/input/plus.md`（商业模式分析）制定。  
> UI 方向：弹弹堂式 Q 版卡通风格，吉祥物为**熊猫岛主**。

---

## 1. 项目定位

打造一个面向中文期货 Prop Firm（自营交易公司）玩家的**导航 + 资讯 + 社区站**，绰号「冒险岛」。

- **核心入口角色**：不是 Prop Firm 本身，不直接卖考试账号，只做信息聚合 + 联盟返佣。
- **内容护城河**：规则汇总、注册/出金/软件教程、考试路径/实盘路径指南。
- **社区护城河**：用户注册、Discord 绑定、折扣码登记抽奖、AI 助手答疑。
- **商业模式**：联盟返佣（折扣码）+ 邮件订阅 + 社区粘性。
- **合规姿态**：境外主体、免责声明、无国内 ICP 备案（主动声明境外信息站属性）。

---

## 2. 技术选型

| 层级 | 方案 | 说明 |
|------|------|------|
| 前端框架 | **Next.js 15 (App Router) + React 19 + TypeScript** | SEO 友好、SSR/SSG 灵活、后续可扩展 API 与后台。 |
| 样式系统 | **Tailwind CSS 4 + shadcn/ui + 自定义 Q 版主题** | 快速搭建组件库，配合插画实现弹弹堂风格。 |
| 后端服务 | **Next.js API Routes + REST** | 一体化部署，减少服务拆分，适合 MVP 到成长期。 |
| 数据库 | **PostgreSQL 15+（自建）** | 部署在现有阿里云服务器，用 Docker 运行。 |
| 数据库 ORM | **Prisma** | 类型安全、迁移方便、生态成熟。 |
| 认证 | **Auth.js (NextAuth) v5** | 邮箱 + Google + Discord 登录，成本最低。 |
| 文件/图床 | **阿里云服务器本地目录 / OSS** | 吉祥物、插画、头像等静态资源；后期可迁 R2。 |
| 搜索 | **PostgreSQL 全文搜索**（MVP）→ 后期 **Meilisearch** | MVP 用 `to_tsvector`，不阻塞上线。 |
| 部署 | **阿里云服务器 + Docker + Nginx** | 现有服务器直接承载。 |
| 域名/CDN | 需购买境外域名 + Cloudflare DNS/CDN | 当前无域名，建议 NameCheap/Cloudflare 注册。 |
| AI 助手 | **OpenAI / Claude / DeepSeek API + RAG** | 基于教程文档做检索增强问答，阶段 5 再做。 |
| 监控 | **Sentry** + 阿里云基础监控 | 错误与性能监控。 |

### 2.1 后端服务说明

由于选择 Next.js + React 方案，后端直接复用 Next.js 的 API Routes：

- `/app/api/*`：RESTful 端点，处理认证、用户、内容、抽奖、Discord webhook 等。
- 数据库通过 Prisma Client 在 API Route / Server Action 中操作。
- 数据库服务以 Docker 容器形式跑在阿里云服务器上，与 Next.js 应用同一台机器，降低初期成本。
- 如需后期拆分为独立服务，可将 API Routes 抽成 Nest.js/Express 服务，迁移成本低。

### 2.2 阿里云服务器部署特别提示

- **ICP 备案风险**：该站面向境外 Prop Firm、涉及境外期货与加密付款，处于监管灰色区，且境外注册商域名无法备案。若阿里云服务器位于**中国大陆节点**，无 ICP 备案通常无法对外提供 80/443 服务，存在被关停风险。
- **建议方案**：
  1. 优先使用**阿里云香港 / 新加坡 / 海外节点**（如有）部署；
  2. 或购买境外 VPS（如 Vultr、Linode、Hetzner）用于该站，成本约 $5–10/月；
  3. 域名注册商选 **NameCheap / Cloudflare Registrar**，DNS 托管 Cloudflare，可隐藏真实 IP。
- **MVP 临时方案**：若只有大陆节点服务器，可先在内网/端口非 80/443 下跑通，但正式上线强烈建议迁移到境外节点。

---

## 3. 功能模块设计

### 3.1 前台（C 端）

| 模块 | 功能 |
|------|------|
| 首页 | Hero 区（熊猫岛主 + 口号）、优惠码轮播、规则速查入口、热门教程、最新公告、社区入口。 |
| Prop Firm 规则汇总 | 约 20 家平台卡片：Lucid、TPT、FundedNext、Topstep、Purdia、Apex、Bulenox、Tradeify、Earn2Trade 等。字段：价格、数据平台、规则要点、难度、折扣码、官网链接。 |
| 教程中心 | 注册教程、Tradovate / NinjaTrader / Rithmic / TradeSea 教程、出金教程（Wise / Rise / W8 税表）、PA/ICT 学习资料。 |
| 路径指南 | /know 基础知识、/road 考试路径、/live 实盘路径，用步骤条/地图形式呈现。 |
| 用户系统 | 注册 / 登录 / 密码重置 / 个人中心 / 我的折扣码登记记录。 |
| 抽奖登记 | 使用折扣码购买后可登记，后台定期抽奖（账号/小礼品）。 |
| AI 助手 | 站内悬浮助手，基于文档 RAG 回答 Prop Firm 相关问题。 |
| 社区入口 | Discord 邀请、邮件订阅、公告栏。 |

### 3.2 后台（Admin）

| 模块 | 功能 |
|------|------|
| 内容管理 | 平台规则 CRUD、教程文章 CRUD、路径页配置、公告管理。 |
| 折扣码管理 | 平台折扣码、返佣比例、启用/停用。 |
| 抽奖管理 | 抽奖活动配置、参与记录、中奖记录导出。 |
| 用户管理 | 用户列表、角色（普通/管理员/版主）、禁用/解封。 |
| AI 知识库 | 上传文档、分段管理、查看问答日志。 |
| 系统配置 | SEO 元信息、导航菜单、首页 Banner、免责声明。 |

---

## 4. UI/UX 设计方案：弹弹堂 Q 版卡通风格 + 熊猫岛主

### 4.1 视觉关键词

- **圆润、胖嘟嘟**：大圆角按钮、卡片、头像；拒绝锐利直角。
- **高饱和糖果色**：天蓝 `#4ECDC4`、柠檬黄 `#FFE66D`、蜜桃粉 `#FF6B6B`、草绿 `#95E1D3`、奶油白 `#FFFDF7`。
- **手绘描边 + 微阴影**：元素带 2–4px 深色描边，底部投影偏柔和。
- **吉祥物贯穿**：一只穿探险装备、戴草帽背小包的**熊猫岛主**，出现在空状态、加载、提示、Hero。
- **游戏化图标**：金币、宝箱、地图、田垄、炮弹（致敬弹弹堂）、小旗子、勋章。
- **字体**：标题用圆润卡通字体（如 ZCOOL KuaiLe / 站酷快乐体），正文用 Noto Sans SC / PingFang SC。

### 4.2 熊猫岛主设定

- **形象**：圆滚滚的幼年大熊猫，黑白主体，点缀糖果色探险装备（草帽、地图卷、小背包）。
- **性格**：憨萌但靠谱，像一位带你种田通关的老玩家。
- **表情/动作**：挥手打招呼、挠头困惑、捧着金币笑、摔倒 404、趴着加载中。
- **应用场景**：
  - 首页 Hero：熊猫站在浮岛上招手；
  - 规则汇总卡片角落：熊猫小头像做分类标识；
  - 抽奖页：熊猫转动扭蛋机；
  - 404/空状态：熊猫摔倒或迷路。

### 4.3 页面风格示意

- **首页 Hero**：蓝天白云草地背景，熊猫岛主站在小岛上，标题「Prop Firm 冒险岛」用弹弹堂炮弹/泡泡字体，CTA 按钮像糖果色大胶囊。
- **规则汇总**：卡片像一块块彩色浮岛，平台 Logo 放在圆形徽章内，难度用「星星/炮弹」数量表示。
- **路径指南**：横向大地图，每个知识点是一颗小岛或关卡，已完成变彩色、未完成灰色，带进度条。
- **抽奖页**：宝箱扭蛋机视觉，登记一次相当于投一枚金币。
- **404 / 空状态**：熊猫摔倒或挠头的插画。

### 4.4 设计资产清单

| 资产 | 用途 | 优先级 | 实现方式 |
|------|------|--------|----------|
| 熊猫岛主主形象 + 5–8 个表情动作 | Hero、加载、提示、空状态 | P0 | AI 生成 + 后期精修 |
| 首页背景图 / 浮岛场景 | 首屏视觉 | P0 | AI 生成背景 + SVG 浮岛 |
| 规则卡片装饰元素 | 小图标、难度星、标签 | P1 | AI/手绘图标 + 占位 SVG |
| 路径地图插画 | /road、/know、/live | P1 | AI 生成地图元素 |
| 图标库（糖果色线性/填充） | 导航、按钮、提示 | P0 | `lucide-react` + 自定义描边 |
| 优惠券/宝箱/勋章元素 | 抽奖、联盟返佣 | P1 | AI 生成 + SVG 占位 |

### 4.5 响应式策略

- 桌面：左右两栏 + 大地图。
- 平板：单栏卡片，路径图垂直化。
- 手机：底部 Tab 导航，卡片全宽，熊猫吉祥物简化为小头像。

---

## 5. 数据库核心表设计（PostgreSQL + Prisma）

### 5.1 用户与认证

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatar        String?
  discordId     String?   @unique
  role          UserRole  @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  registrations Registration[]
  raffleEntries RaffleEntry[]
}

enum UserRole { USER MODERATOR ADMIN }
```

### 5.2 Prop Firm 平台与规则

```prisma
model PropFirm {
  id           String   @id @default(cuid())
  name         String   // 如 Lucid
  slug         String   @unique
  logo         String?
  website      String
  dataPlatform String?  // Rithmic / TDV / ProjectX
  pricingNote  String?  // 价格说明
  difficulty   Int      // 1–5 星
  summary      String   @db.Text
  rules        Json?    // 规则要点数组
  discountCode String?  // 当前折扣码
  commissionRate Decimal? // 返佣比例
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### 5.3 教程与内容

```prisma
model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  summary     String?
  content     String   @db.Text // Markdown / HTML
  category    String   // register / payout / platform / strategy
  tags        String[]
  cover       String?
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 5.4 抽奖与登记

```prisma
model RaffleEvent {
  id       String        @id @default(cuid())
  title    String
  prize    String
  startAt  DateTime
  endAt    DateTime
  status   RaffleStatus  @default(DRAFT)
  entries  RaffleEntry[]
}

model RaffleEntry {
  id          String   @id @default(cuid())
  eventId     String
  userId      String
  propFirmId  String?
  orderProof  String?  // 订单截图/编号
  status      String   @default("pending")
  createdAt   DateTime @default(now())
}
```

### 5.5 AI 知识库（RAG，阶段 5 再做）

```prisma
model KnowledgeChunk {
  id        String   @id @default(cuid())
  articleId String?
  content   String   @db.Text
  embedding Float[]  // 向量，pgvector 扩展
  metadata  Json?
}
```

> 说明：MVP 阶段先用 PostgreSQL 全文搜索替代向量检索，等 AI 助手上线后再加 `pgvector` 扩展。

---

## 6. 开发阶段与排期（完整计划约 8–10 周，MVP 先跑通阶段 1–3）

### 阶段 1：基础骨架（第 1–2 周）

- 初始化 Next.js 15 + TypeScript + Tailwind + shadcn/ui 项目。
- 配置 ESLint / Prettier / Husky。
- 在阿里云服务器上 Docker 跑 PostgreSQL，初始化 Prisma schema。
- 接入 Auth.js（邮箱 + Google + Discord）。
- 完成基础布局：顶部导航、底部页脚、移动端菜单。
- 输出：可跑通的空壳站点 + 用户登录/注册。

### 阶段 2：UI 主题与首页（第 2–3 周）

- 设计并完成 Q 版视觉系统：颜色变量、圆角、描边阴影、字体。
- 完成熊猫岛主占位素材及 Hero 区。
- 实现首页：Banner、优惠码入口、规则速查卡片、公告、邮件订阅。
- 输出：首页可访问，风格定型。

### 阶段 3：核心内容模块（第 3–5 周）— **MVP 上线目标**

- 实现 Prop Firm 规则汇总页（列表、筛选、搜索、详情弹窗/独立页）。
- 实现教程中心（分类、文章列表、Markdown 渲染）。
- 实现路径指南（基础知识 / 考试路径 / 实盘路径）。
- 接入后台管理这些内容的 CRUD。
- 输出：MVP 可上线，管理员可更新内容，用户可浏览规则/教程。

### 阶段 4：用户与社区功能（第 5–7 周）

- 个人中心（我的登记、资料修改）。
- 折扣码使用登记 + 后台审核。
- 抽奖活动创建/参与/中奖公布。
- Discord 邀请与 Webhook 通知（新抽奖/新文章）。
- 输出：社区闭环跑通。

### 阶段 5：AI 助手与搜索（第 7–8 周）

- AI 助手悬浮组件。
- 对接 LLM API（OpenAI/Claude/DeepSeek）。
- 文档切片与向量/全文检索（pgvector 或 Meilisearch）。
- 输出：用户可问答。

### 阶段 6：优化与上线（第 8–10 周）

- SEO：sitemap、robots、meta、结构化数据、Open Graph。
- 性能优化：图片压缩、字体策略、缓存策略。
- 合规页面：免责声明、隐私政策、服务条款、风险提示。
- 购买域名、配置 Cloudflare DNS/CDN、部署到阿里云服务器。
- 输出：正式上线。

---

## 7. 部署与运维

- **代码托管**：GitHub 私有仓库。
- **CI/CD**：GitHub Actions 跑类型检查、Lint、单元测试；手动或自动部署到阿里云服务器。
- **应用部署**：Next.js 应用 Docker 化，Nginx 反向代理 + SSL（Let's Encrypt）。
- **数据库**：PostgreSQL Docker 容器，每日 `pg_dump` 自动备份到服务器目录 + 定期下载。
- **域名**：建议 NameCheap / Cloudflare Registrar 购买境外域名，Cloudflare DNS 解析。
- **CDN**：Cloudflare 免费计划，静态资源缓存。
- **监控**：Sentry 错误上报 + 阿里云基础监控（CPU/内存/磁盘）。
- **备份**：数据库自动备份 +  GitHub 仓库代码备份。

---

## 8. 合规与风险提示

参考 `plus.md` 重点：

1. **免责声明**：全站明确标注「信息整理，仅供学习，不构成投资建议」。
2. **利益冲突透明**：在推荐榜/折扣码旁写明返佣关系。
3. **不碰资金**：不代收代付、不人民币交易、不做收益承诺。
4. **内容时效性**：建立规则核对 SOP，至少每月检查一次各平台规则。
5. **平台风险分散**：不把鸡蛋放一个平台，及时下架问题平台。
6. **数据隐私**：隐私政策明确数据用途，用户可导出/删除账号。
7. **服务器合规**：境外 Prop Firm 内容 + 无 ICP 备案，建议用境外节点；若只能用阿里云大陆节点，需知悉被关停风险。

---

## 9. 已确认事项

1. ✅ 后端数据库：**PostgreSQL**（部署在阿里云服务器）。
2. ✅ 吉祥物：**熊猫岛主**。
3. ✅ 执行策略：**先做 MVP（阶段 1–3）上线，再迭代社区/AI 功能**；完整计划保留。
4. ✅ 设计资产：**先用 AI 生成 + 占位图**，后期再精修/外包。
5. ✅ 基础设施：**现有阿里云服务器一台，暂无域名**，需购买境外域名。

---

## 10. 下一步行动

1. 购买境外域名（NameCheap/Cloudflare）并确认服务器节点位置。
2. 输出 UI 低保真原型 / 熊猫岛主概念图。
3. 初始化 Next.js 代码仓库并开始阶段 1 开发。
