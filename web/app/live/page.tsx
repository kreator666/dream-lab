import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { InfoCard } from "@/components/info-card";
import { StepCard } from "@/components/step-card";
import { PandaMascot } from "@/components/panda-mascot";
import { Shield, Sprout, Wallet, AlertTriangle } from "lucide-react";

export default function LivePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="实盘路径"
          description="拿到 funded 账号只是开始，稳健出金才是终点。"
        >
          <Link href="/articles" className="cartoon-btn bg-sky px-5 py-2 text-sm text-white">
            看出金教程
          </Link>
          <Link href="/know" className="cartoon-btn border-2 border-chocolate bg-white px-5 py-2 text-sm text-chocolate">
            回基础知识
          </Link>
        </PageHeader>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard icon={<Shield className="h-6 w-6" />} title="第一件事：读清 live 规则" color="bg-sky">
              <p>
                funded 账号的回撤、利润目标、可交易时间、新闻限制等规则可能与考核期不同。违规可能导致账号失效，先把规则吃透。
              </p>
            </InfoCard>

            <InfoCard icon={<Sprout className="h-6 w-6" />} title="种田理念：活得久" color="bg-grass">
              <p>
                不要把 funded 账号当赌本。分散到多个账号、多个平台，控制单笔风险，降低预期。爆号是常事，让整体账户组合活下去。
              </p>
            </InfoCard>

            <InfoCard icon={<Wallet className="h-6 w-6" />} title="出金流程" color="bg-lemon">
              <p>
                常见出金方式包括 Wise、Rise、加密货币等。部分平台要求填写 W-8BEN 税表。提前准备好收款工具，避免到了 payout 日手忙脚乱。
              </p>
            </InfoCard>

            <InfoCard icon={<AlertTriangle className="h-6 w-6" />} title="拒付 payout 风险" color="bg-peach">
              <p>
                Prop Firm 行业存在拒付、拖延甚至倒闭风险。分散平台、及时出金、不把所有利润留在账号里，是保护自己的基本操作。
              </p>
            </InfoCard>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
          <h2 className="mb-8 text-center font-heading text-2xl text-chocolate md:text-3xl">
            出金准备清单
          </h2>
          <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-chocolate/20 md:before:left-6">
            <StepCard
              step={1}
              title="确认平台出金政策"
              description="最低出金额度、手续费、处理周期、可收款方式。不同平台差异很大。"
            />
            <StepCard
              step={2}
              title="准备收款账户"
              description="Wise / Rise 注册并完成 KYC；或准备加密钱包地址。确保姓名与平台账户一致。"
              action={
                <Link href="/articles/wise-registration" className="cartoon-btn bg-sky px-4 py-2 text-sm text-white">
                  Wise 注册教程
                </Link>
              }
            />
            <StepCard
              step={3}
              title="填写税表（如需要）"
              description="非美国居民通常填写 W-8BEN，避免被预扣 30% 税款。平台会有指引。"
            />
            <StepCard
              step={4}
              title="发起出金并留记录"
              description="保存出金申请截图、确认邮件和到账记录。遇到争议时有据可查。"
            />
          </div>
        </section>

        <section className="bg-cloud py-12 md:py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-8">
            <div className="animate-bounce-soft rounded-full border-4 border-chocolate bg-white p-4 shadow-[0_8px_0_#5D4037]">
              <PandaMascot className="h-32 w-32" />
            </div>
            <h2 className="mt-6 font-heading text-2xl text-chocolate">种田养老，稳健出金</h2>
            <p className="mt-2 text-chocolate/80">记住：不把所有鸡蛋放一个篮子，及时落袋为安。</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/articles" className="cartoon-btn bg-sky px-5 py-2 text-sm text-white">
                教程中心
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
