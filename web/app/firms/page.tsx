import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { FirmCard } from "@/components/firm-card";
import { prisma } from "@/lib/prisma";

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
        <section className="bg-gradient-to-b from-sky/20 to-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
            <PandaMascot variant="coin" className="mx-auto h-24 w-24" />
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
                {firms.map((firm) => (
                  <FirmCard
                    key={firm.id}
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
