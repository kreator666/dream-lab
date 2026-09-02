import Link from "next/link";
import { PandaMascot } from "@/components/panda-mascot";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { buttonVariants } from "@/components/ui/button";
import { Map, BookOpen, Landmark, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky/30 to-cream py-16 md:py-24">
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_10%_20%,#FFE66D_0%,transparent_20%)] opacity-50" />
          <div className="absolute inset-x-0 top-16 h-32 bg-[radial-gradient(circle_at_80%_30%,#FF6B6B_0%,transparent_20%)] opacity-40" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:flex-row md:justify-between md:px-8 md:text-left">
            <div className="max-w-xl">
              <h1 className="font-heading text-4xl leading-tight text-chocolate md:text-6xl">
                中文 Prop Firm
                <br />
                <span className="text-sky-dark">冒险岛</span>
              </h1>
              <p className="mt-6 text-lg text-chocolate/80">
                规则汇总 · 折扣码 · 出金教程 · 社区互助
                <br />
                种田养老，稳健通关。
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Link
                  href="/firms"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "cartoon-btn bg-sky px-8 text-lg text-white hover:bg-sky-dark"
                  )}
                >
                  开始探险
                </Link>
                <Link
                  href="/road"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "cartoon-btn border-2 border-chocolate bg-white px-8 text-lg text-chocolate hover:bg-cream"
                  )}
                >
                  查看路径
                </Link>
              </div>
            </div>

            <div className="mt-10 flex justify-center md:mt-0">
              <div className="rounded-full border-4 border-chocolate bg-white p-4 shadow-[0_8px_0_#5D4037]">
                <PandaMascot className="h-48 w-48 md:h-64 md:w-64" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick entries */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="mb-8 text-center font-heading text-2xl text-chocolate md:text-3xl">
              快速入口
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickCard href="/firms" icon={<Landmark className="h-8 w-8" />} title="规则汇总" desc="20+ 平台规则对比" color="bg-sky" />
              <QuickCard href="/road" icon={<Map className="h-8 w-8" />} title="考试路径" desc="从开户到通关" color="bg-grass" />
              <QuickCard href="/articles" icon={<BookOpen className="h-8 w-8" />} title="教程中心" desc="注册 / 出金 / 软件" color="bg-lemon" />
              <QuickCard href="/live" icon={<Compass className="h-8 w-8" />} title="实盘路径" desc="拿到账号之后" color="bg-peach" />
            </div>
          </div>
        </section>

        {/* Disclaimer teaser */}
        <section className="bg-cloud py-10">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <p className="rounded-2xl border-2 border-chocolate bg-white p-6 text-sm text-chocolate/80 shadow-[0_4px_0_#5D4037]">
              <strong className="text-chocolate">免责声明：</strong>
              本站内容仅供学习交流，不构成任何投资建议。Prop Firm 考试与交易存在风险，请自行核实平台最新规则。
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function QuickCard({
  href,
  icon,
  title,
  desc,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group cartoon-card flex flex-col items-center gap-3 bg-white p-6 text-center transition-transform hover:-translate-y-1"
    >
      <div className={`rounded-2xl ${color} p-3 text-white shadow-[0_3px_0_#5D4037]`}>
        {icon}
      </div>
      <h3 className="font-heading text-xl text-chocolate group-hover:text-sky-dark">{title}</h3>
      <p className="text-sm text-chocolate/70">{desc}</p>
    </Link>
  );
}
