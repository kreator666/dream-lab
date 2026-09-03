# 冒险岛站点开发路线图

> 当前阶段：MVP 与联盟运营已完成，生产环境已部署到阿里云服务器（自签名 HTTPS）。
> 更新日期： 2026-09-03

## 已完成

- [x] Next.js 16 + Tailwind 4 + shadcn/ui + Prisma + PostgreSQL 基础架构
- [x] 熊猫岛主 Q 版卡通 UI 骨架与配色系统
- [x] 首页（动效优化完成）
- [x] 规则汇总页 /firms + 详情页 /firms/[slug]
- [x] 教程中心 /articles + 详情页 /articles/[slug]
- [x] 后台管理 /admin（平台 + 文章 CRUD）
- [x] 数据接入 PostgreSQL（本地 5433 端口）

## 待办事项

### 阶段 2：用户系统与权限（当前进行中）

- [ ] 接入 NextAuth.js / Auth.js v5
- [ ] 邮箱 + 密码注册 / 登录（Credentials Provider）
- [ ] Discord OAuth 登录
- [ ] 密码 bcrypt 加密存储
- [ ] Prisma 会话与账号模型（NextAuth Adapter）
- [ ] 登录 / 注册页面 UI（熊猫卡通风格）
- [ ] Middleware 保护后台路由（未登录跳转 /login）
- [ ] 管理员角色校验（ADMIN / MODERATOR 可进后台）
- [ ] 用户资料页 /profile
- [ ] 登录态下的导航入口（头像 / 退出）

### 阶段 3：核心内容页

- [ ] /know 基础知识指南
- [ ] /road 考试路径（已有占位页，补全内容）
- [ ] /live 实盘路径
- [ ] 平台对比 / 筛选 / 搜索
- [ ] 教程分类、标签、搜索

### 阶段 4：联盟推广与运营

- [x] 折扣码登记系统（用户通过本站折扣码下单后登记）
- [x] 抽奖活动系统（RaffleEvent + RaffleEntry）
- [ ] 邮件订阅（可先用第三方表单嵌入）
- [ ] Discord 社区入口与邀请
- [ ] AI 助手（RAG 检索规则 + 教程）

### 阶段 5：内容与合规

- [ ] 真实 Prop Firm 规则数据填充
- [ ] 教程内容填充（Wise / Rise 注册、W8 税表、Tradovate / NinjaTrader 等）
- [ ] 免责声明 / 隐私政策 / 服务条款
- [ ] SEO：sitemap、meta、结构化数据
- [ ] 替换占位图为真实 Q 版卡通插画

### 阶段 6：部署与运维

- [ ] 购买域名（NameCheap / Cloudflare）
- [x] 阿里云服务器生产环境配置
- [x] systemd / Nginx 部署
- [x] PostgreSQL 生产环境 Docker 运行
- [x] SSL / HTTPS 配置（当前为自签名证书）
- [x] 生产环境 .env 与 secrets 管理
- [ ] 监控与日志
- [ ] 域名购买后替换为 Let's Encrypt 证书

### 阶段 7：体验优化

- [ ] 移动端响应式菜单
- [ ] 表单校验与错误提示
- [ ] Loading / Empty / Error 状态统一
- [ ] 分页（文章 / 平台列表）
- [ ] 动画性能优化

## 下一步建议

当前优先完成 **阶段 2：用户系统与权限**，让用户可以注册登录，并保护后台管理不被公开访问。之后再进入内容页与联盟推广功能。
