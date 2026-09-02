import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { InfoCard } from "@/components/info-card";
import { PandaMascot } from "@/components/panda-mascot";
import {
  Landmark,
  Target,
  TrendingDown,
  BarChart3,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

export default function KnowPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="基础知识"
          description="搞懂 Prop Firm 的核心概念，再开始考试也不迟。"
        >
          <Link
            href="/road"
            className="cartoon-btn bg-sky px-5 py-2 text-sm text-white"
          >
            查看考试路径
          </Link>
          <Link
            href="/firms"
            className="cartoon-btn border-2 border-chocolate bg-white px-5 py-2 text-sm text-chocolate"
          >
            对比平台规则
          </Link>
        </PageHeader>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<Landmark className="h-6 w-6" />}
              title="什么是 Prop Firm"
              color="bg-sky"
            >
              <p>
                Prop Firm（Proprietary Trading Firm）提供给你一笔"虚拟资金"账户。你通过考试证明交易能力后，用平台的钱交易，盈利可按
                80%–90% 分成提现。最大亏损通常只是你支付的考试费。
              </p>
            </InfoCard>

            <InfoCard
              icon={<Target className="h-6 w-6" />}
              title="两阶段考试"
              color="bg-grass"
            >
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>挑战期（Challenge）</strong>：在限定时间内达到利润目标，同时不触碰回撤线。
                </li>
                <li>
                  <strong> funded 期</strong>：通过后拿到真实资金账户，遵守平台 live 规则即可出金。
                </li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<TrendingDown className="h-6 w-6" />}
              title="常见规则术语"
              color="bg-peach"
            >
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>日回撤（Daily Drawdown）</strong>：单日最大亏损限额。
                </li>
                <li>
                  <strong>总回撤（Max Drawdown）</strong>：整个考核周期内最大亏损限额。
                </li>
                <li>
                  <strong>最低交易日</strong>：考核期内至少交易几天。
                </li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="数据商与软件"
              color="bg-lemon"
            >
              <p>
                常见数据商包括 Rithmic、Tradovate、TradeLocker、ProjectX 等。交易软件常用 NinjaTrader、Tradovate、Rithmic、TradeSea
                等。选择平台时要确认自己熟悉的软件是否被支持。
              </p>
            </InfoCard>

            <InfoCard
              icon={<CreditCard className="h-6 w-6" />}
              title="费用结构"
              color="bg-sky"
            >
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>一次性费用</strong>：只需付一次考试费，通过后无月费。
                </li>
                <li>
                  <strong>月费制</strong>：每月订阅，适合长期持有 funded 账号。
                </li>
                <li>注意重置费、扩展账号费用和提现手续费。</li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="风险提示"
              color="bg-peach"
            >
              <p>
                Prop Firm 行业存在平台倒闭、拒付 payout、规则变更等风险。本站内容仅供学习，不构成投资建议。下单前请到平台官网核对最新规则。
              </p>
            </InfoCard>
          </div>
        </section>

        <section className="bg-cloud py-12 md:py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-8">
            <div className="animate-bounce-soft rounded-full border-4 border-chocolate bg-white p-4 shadow-[0_8px_0_#5D4037]">
              <PandaMascot className="h-32 w-32" />
            </div>
            <h2 className="mt-6 font-heading text-2xl text-chocolate">准备好开始了吗？</h2>
            <p className="mt-2 text-chocolate/80">先了解考试路径，再挑选适合自己的平台。</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/road" className="cartoon-btn bg-sky px-5 py-2 text-sm text-white">
                考试路径
              </Link>
              <Link href="/firms" className="cartoon-btn bg-grass px-5 py-2 text-sm text-chocolate">
                规则汇总
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
