import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { prisma } from "@/lib/prisma";
import { ExternalLink, Star } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function FirmDetailPage({ params }: Props) {
  const { slug } = await params;
  const firm = await prisma.propFirm.findUnique({
    where: { slug },
  });

  if (!firm) {
    notFound();
  }

  const rules = (firm.rules as { items?: string[] } | null)?.items ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Link
            href="/firms"
            className="text-sm text-chocolate/70 hover:text-sky-dark hover:underline"
          >
            ← 返回规则汇总
          </Link>

          <div className="mt-6 cartoon-card bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-chocolate bg-cream font-heading text-2xl font-bold text-chocolate">
                  {firm.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-heading text-2xl text-chocolate md:text-3xl">
                    {firm.name}
                  </h1>
                  <p className="text-sm text-chocolate/60">
                    数据商：{firm.dataPlatform || "未知"} · 难度
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`ml-1 inline h-3 w-3 ${
                          i < firm.difficulty ? "fill-peach text-peach" : "text-chocolate/20"
                        }`}
                      />
                    ))}
                  </p>
                </div>
              </div>

              {firm.discountCode && (
                <div className="flex items-center gap-2">
                  <span className="rounded-full border-2 border-chocolate bg-lemon px-3 py-1 font-mono font-bold text-chocolate shadow-[0_2px_0_#5D4037]">
                    {firm.discountCode}
                  </span>
                  <CopyButton text={firm.discountCode} />
                </div>
              )}
            </div>

            <hr className="my-6 border-chocolate/10" />

            <div className="space-y-6">
              <section>
                <h2 className="font-heading text-xl text-chocolate">平台简介</h2>
                <p className="mt-2 text-chocolate/80">{firm.summary}</p>
              </section>

              {firm.pricingNote && (
                <section>
                  <h2 className="font-heading text-xl text-chocolate">价格与套餐</h2>
                  <p className="mt-2 text-chocolate/80">{firm.pricingNote}</p>
                </section>
              )}

              {rules.length > 0 && (
                <section>
                  <h2 className="font-heading text-xl text-chocolate">考试规则要点</h2>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-chocolate/80">
                    {rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="rounded-2xl border-2 border-peach/50 bg-peach/10 p-4 text-sm text-chocolate/80">
                <strong>风险提示：</strong>以上信息整理自公开资料，购买前请务必到官网核对最新规则。本平台仅提供信息聚合与折扣码推广。
              </div>

              <a
                href={firm.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-bold text-white shadow-[0_4px_0_#2A6B65] transition-transform hover:-translate-y-0.5"
              >
                访问官网
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
