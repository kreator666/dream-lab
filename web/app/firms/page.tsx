import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { FirmCard } from "@/components/firm-card";
import { FilterBar } from "@/components/filter-bar";
import { prisma } from "@/lib/prisma";
import { Cloud } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; platform?: string; difficulty?: string }>;
};

export default async function FirmsPage({ searchParams }: Props) {
  const { q, platform, difficulty } = await searchParams;

  const where: any = { isActive: true };
  if (q?.trim()) {
    where.OR = [
      { name: { contains: q.trim(), mode: "insensitive" } },
      { summary: { contains: q.trim(), mode: "insensitive" } },
      { dataPlatform: { contains: q.trim(), mode: "insensitive" } },
    ];
  }
  if (platform) where.dataPlatform = platform;
  if (difficulty) {
    const level = parseInt(difficulty, 10);
    if (!isNaN(level)) where.difficulty = level;
  }

  const [firms, platforms] = await Promise.all([
    prisma.propFirm.findMany({ where, orderBy: { difficulty: "asc" } }),
    prisma.propFirm.findMany({
      where: { isActive: true },
      select: { dataPlatform: true },
      distinct: ["dataPlatform"],
      orderBy: { dataPlatform: "asc" },
    }),
  ]);

  const platformOptions = platforms.map((p) => p.dataPlatform).filter(Boolean);

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
            <FilterBar searchValue={q} placeholder="搜索平台名称 / 数据商 / 简介">
              <Select name="platform" label="数据商" value={platform} options={platformOptions.map((p) => ({ value: p!, label: p! }))} />
              <Select
                name="difficulty"
                label="难度"
                value={difficulty}
                options={[
                  { value: "1", label: "⭐ 1 简单" },
                  { value: "2", label: "⭐⭐ 2" },
                  { value: "3", label: "⭐⭐⭐ 3" },
                  { value: "4", label: "⭐⭐⭐⭐ 4" },
                  { value: "5", label: "⭐⭐⭐⭐⭐ 5 困难" },
                ]}
              />
            </FilterBar>

            <div className="mt-6">
              {firms.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-chocolate/30 bg-white py-12">
                  <PandaMascot variant="confused" className="h-24 w-24" />
                  <p className="mt-4 text-chocolate/70">没有找到匹配的平台，换个条件试试？</p>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-chocolate">{label}</label>
      <select
        name={name}
        defaultValue={value || ""}
        className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
      >
        <option value="">全部</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
