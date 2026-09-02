import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "熊猫岛主",
      role: UserRole.ADMIN,
    },
  });

  const firms = [
    {
      name: "Lucid",
      slug: "lucid",
      website: "https://lucidtrading.io",
      dataPlatform: "Rithmic",
      pricingNote: "一次性费用，规则简单",
      difficulty: 2,
      summary: "适合新手的 Prop Firm，规则简单，退款政策友好。",
      rules: { items: ["无最低交易日", "无新闻限制", "一次性费用"] },
      discountCode: "LUCKY",
      commissionRate: 0.12,
    },
    {
      name: "Take Profit Trader (TPT)",
      slug: "take-profit-trader",
      website: "https://takeprofittrader.com",
      dataPlatform: "Rithmic",
      pricingNote: "一次性费用",
      difficulty: 3,
      summary: "业内知名平台，规则透明， payout 稳定。",
      rules: { items: ["无新闻交易限制", "无最低交易日", "80% payout"] },
      discountCode: "LUCKY",
      commissionRate: 0.1,
    },
    {
      name: "FundedNext",
      slug: "fundednext",
      website: "https://fundednext.com",
      dataPlatform: "TradeLocker",
      pricingNote: "一次性 / 分期",
      difficulty: 3,
      summary: "成长速度快，支持分阶段账号。",
      rules: { items: ["5% 日回撤", "10% 总回撤", "无新闻限制"] },
      discountCode: "QQ",
      commissionRate: 0.15,
    },
  ];

  for (const firm of firms) {
    await prisma.propFirm.upsert({
      where: { slug: firm.slug },
      update: firm,
      create: firm,
    });
  }

  const articles = [
    {
      title: "如何注册 Wise 并完成身份验证",
      slug: "wise-registration",
      summary: "Wise 是 Prop Firm 出金的常用工具，本文介绍注册和 KYC 流程。",
      content: "# Wise 注册指南\n\n1. 访问 wise.com\n2. 使用邮箱注册\n3. 上传身份证明完成 KYC\n4. 添加收款方式",
      category: "payout",
      tags: ["Wise", "出金"],
      isPublished: true,
    },
    {
      title: "NinjaTrader 基础设置",
      slug: "ninjatrader-setup",
      summary: "连接 Rithmic 数据，配置图表和下单。",
      content: "# NinjaTrader 设置\n\n1. 下载安装\n2. 登录 Rithmic\n3. 配置工作区",
      category: "platform",
      tags: ["NinjaTrader", "软件"],
      isPublished: true,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  console.log(`Seeded admin: ${admin.email}`);
  console.log(`Seeded ${firms.length} firms and ${articles.length} articles.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
