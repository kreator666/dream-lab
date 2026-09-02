import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";

export type ArticleCardProps = {
  slug: string;
  title: string;
  summary?: string | null;
  category: string;
  publishedAt?: Date | null;
};

export function ArticleCard({ slug, title, summary, category, publishedAt }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group cartoon-card flex flex-col gap-3 bg-white p-5 transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-sky/10 px-2 py-0.5 text-xs font-medium text-sky-dark">
          {categoryLabel(category)}
        </span>
        {publishedAt && (
          <span className="flex items-center gap-1 text-xs text-chocolate/50">
            <Calendar className="h-3 w-3" />
            {publishedAt.toLocaleDateString("zh-CN")}
          </span>
        )}
      </div>
      <h3 className="font-heading text-lg text-chocolate group-hover:text-sky-dark">
        {title}
      </h3>
      {summary && (
        <p className="line-clamp-2 text-sm text-chocolate/70">{summary}</p>
      )}
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-sky-dark">
        <BookOpen className="h-4 w-4" />
        阅读更多
      </div>
    </Link>
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
