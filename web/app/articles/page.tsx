import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { ArticleCard } from "@/components/article-card";
import { FilterBar } from "@/components/filter-bar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const { q, category } = await searchParams;

  const where: any = { isPublished: true };
  if (q?.trim()) {
    where.OR = [
      { title: { contains: q.trim(), mode: "insensitive" } },
      { summary: { contains: q.trim(), mode: "insensitive" } },
      { content: { contains: q.trim(), mode: "insensitive" } },
    ];
  }
  if (category) where.category = category;

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({ where, orderBy: { publishedAt: "desc" } }),
    prisma.article.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  const categoryOptions = categories.map((c) => c.category);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-lemon/30 to-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
            <PandaMascot variant="wave" className="mx-auto h-24 w-24" />
            <h1 className="mt-4 font-heading text-3xl text-chocolate md:text-4xl">
              教程中心
            </h1>
            <p className="mt-2 text-chocolate/70">
              注册、出金、软件设置、交易策略，手把手陪你通关
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FilterBar searchValue={q} placeholder="搜索教程标题 / 摘要 / 正文">
              <div>
                <label className="mb-1 block text-sm font-medium text-chocolate">分类</label>
                <select
                  name="category"
                  defaultValue={category || ""}
                  className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
                >
                  <option value="">全部</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {categoryLabel(c)}
                    </option>
                  ))}
                </select>
              </div>
            </FilterBar>

            <div className="mt-6">
              {articles.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-chocolate/30 bg-white py-12">
                  <PandaMascot variant="confused" className="h-24 w-24" />
                  <p className="mt-4 text-chocolate/70">没有找到匹配的教程，换个条件试试？</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      slug={article.slug}
                      title={article.title}
                      summary={article.summary}
                      category={article.category}
                      publishedAt={article.publishedAt}
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

function categoryLabel(category: string) {
  const map: Record<string, string> = {
    register: "注册",
    payout: "出金",
    platform: "软件",
    strategy: "策略",
  };
  return map[category] || category;
}
