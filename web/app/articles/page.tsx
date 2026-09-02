import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { ArticleCard } from "@/components/article-card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

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
            {articles.length === 0 ? (
              <div className="flex flex-col items-center py-12">
                <PandaMascot variant="confused" className="h-24 w-24" />
                <p className="mt-4 text-chocolate/70">暂时没有教程，请先登录后台发布。</p>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
