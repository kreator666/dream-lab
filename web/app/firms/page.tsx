import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { FirmCard } from "@/components/firm-card";
import { prisma } from "@/lib/prisma";
import { Cloud } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FirmsPage() {
  const firms = await prisma.propFirm.findMany({
    where: { isActive: true },
    orderBy: { difficulty: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-sky/20 to-cream py-12 md:py-16">
          <Cloud className="absolute left-[8%] top-[20%] h-14 w-14 animate-float text-white opacity-70" />
          <Cloud className="absolute right-[12%] top-[15%] h-18 w-18 animate-float-delayed text-white opacity-60" />
          <Cloud className="absolute right-[30%] top-[55%] h-10 w-10 animate-float-slow text-white opacity-50" />

          <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
            <div className="mx-auto inline-block animate-bounce-soft rounded-full border-4 border-chocolate bg-white p-3 shadow-[0_6px_0_#5D4037]">
              <PandaMascot variant="coin" className="h-20 w-20" />
            </div>
            <h1 className="mt-4 font-heading text-3xl text-chocolate md:text-4xl">
              Prop Firm 规则汇总
            </h1>
            <p className="mt-2 text-chocolate/70">
              主流平台规则对比，购买前请再次核对官网最新条款
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            {firms.length === 0 ? (
              <div className="flex flex-col items-center py-12">
                <PandaMascot variant="confused" className="h-24 w-24" />
                <p className="mt-4 text-chocolate/70">暂时没有平台数据，请先运行数据库种子。</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {firms.map((firm, index) => (
                  <FirmCard
                    key={firm.id}
                    index={index}
                    slug={firm.slug}
                    name={firm.name}
                    logo={firm.logo}
                    dataPlatform={firm.dataPlatform}
                    pricingNote={firm.pricingNote}
                    difficulty={firm.difficulty}
                    summary={firm.summary}
                    discountCode={firm.discountCode}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
