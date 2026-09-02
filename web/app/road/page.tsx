import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { PandaMascot } from "@/components/panda-mascot";

export default function RoadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="考试路径"
          description="从开户到拿到 funded 账号，一步一个脚印。"
        >
          <Link href="/firms" className="cartoon-btn bg-sky px-5 py-2 text-sm text-white">
            去选平台
          </Link>
          <Link href="/articles" className="cartoon-btn bg-grass px-5 py-2 text-sm text-chocolate">
            看教程
          </Link>
        </PageHeader>

        <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
          <div className="relative space-y-8 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-chocolate/20 md:before:left-6">
            <StepCard
              step={1}
              title="了解规则与风险"
              description="先读基础知识，搞清楚什么是 Prop Firm、常见规则术语和行业风险。别急着交钱。"
              tip="新手建议从规则简单、一次性费用的平台入手，比如 Lucid Flex 或 FundedNext Rapid。"
              action={
                <Link href="/know" className="cartoon-btn bg-sky px-4 py-2 text-sm text-white">
                  读基础知识
                </Link>
              }
            />

            <StepCard
              step={2}
              title="选择适合自己的平台"
              description="在规则汇总页对比各家数据商、月费/一次性费用、回撤规则、难度评价和折扣码。"
              tip="不要被高利润目标迷惑，先看自己能承受的回撤和交易成本。"
              action={
                <Link href="/firms" className="cartoon-btn bg-sky px-4 py-2 text-sm text-white">
                  对比平台
                </Link>
              }
            />

            <StepCard
              step={3}
              title="注册账号并购买考试"
              description="通过平台官网注册，使用本站折扣码购买考试账号。购买后保留好订单截图。"
              tip="使用折扣码有时还能参与抽奖或返佣活动，别忘了登记。"
              action={
                <Link href="/articles" className="cartoon-btn bg-grass px-4 py-2 text-sm text-chocolate">
                  看注册教程
                </Link>
              }
            />

            <StepCard
              step={4}
              title="连接数据与交易软件"
              description="根据平台要求下载 NinjaTrader、Tradovate 或 Rithmic，登录数据商账号，确认行情和下单正常。"
              tip="先在模拟环境里跑几单，确认佣金、滑点和图表都符合预期。"
              action={
                <Link href="/articles" className="cartoon-btn bg-lemon px-4 py-2 text-sm text-chocolate">
                  软件教程
                </Link>
              }
            />

            <StepCard
              step={5}
              title="完成挑战期规则"
              description="在考核期内达到利润目标，同时不触碰日回撤和总回撤线，满足最低交易日要求。"
              tip="种田心态：降低预期、控制仓位，活得久比赚得快更重要。"
            />

            <StepCard
              step={6}
              title="拿到 funded 账号"
              description="通过考核后，按平台流程申请 funded 账号。恭喜你进入实盘阶段！"
              tip=" funded 账号规则可能和考核期不同，务必仔细阅读 live 规则。"
              action={
                <Link href="/live" className="cartoon-btn bg-peach px-4 py-2 text-sm text-chocolate">
                  实盘路径
                </Link>
              }
            />
          </div>
        </section>

        <section className="bg-cloud py-12 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-8">
            <div className="animate-bounce-soft rounded-full border-4 border-chocolate bg-white p-4 shadow-[0_8px_0_#5D4037]">
              <PandaMascot variant="coin" className="h-28 w-28" />
            </div>
            <h2 className="mt-6 font-heading text-2xl text-chocolate">祝你一次通关！</h2>
            <p className="mt-2 text-chocolate/80">遇到困难先回来看教程，也可以在 Discord 社区交流。</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
