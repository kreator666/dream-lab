import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true },
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <article className="mx-auto max-w-3xl px-4 md:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-sm text-chocolate/70 hover:text-sky-dark hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            返回教程中心
          </Link>

          <div className="mt-6 cartoon-card bg-white p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-chocolate/60">
              <span className="rounded-full bg-sky/10 px-3 py-1 font-medium text-sky-dark">
                {categoryLabel(article.category)}
              </span>
              {article.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.publishedAt.toLocaleDateString("zh-CN")}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-heading text-2xl text-chocolate md:text-3xl">
              {article.title}
            </h1>

            {article.summary && (
              <p className="mt-3 text-lg text-chocolate/70">{article.summary}</p>
            )}

            <hr className="my-6 border-chocolate/10" />

            <div className="prose prose-chocolate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>

            {article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-chocolate/60" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-chocolate/20 px-2 py-0.5 text-xs text-chocolate/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
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
