import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createArticle, toggleArticlePublished, deleteArticle } from "@/lib/actions/article";
import { DeleteButton } from "@/components/delete-button";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-chocolate">文章管理</h1>
      </div>

      {/* Create form */}
      <section className="cartoon-card bg-white p-6">
        <h2 className="font-heading text-xl text-chocolate">新增文章</h2>
        <form action={createArticle} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input name="title" label="标题" required />
          <Input name="slug" label="Slug（URL 标识）" required />
          <Input name="category" label="分类" required />
          <Input name="tags" label="标签（逗号分隔）" />
          <Input name="cover" label="封面链接" type="url" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-chocolate">摘要</label>
            <textarea
              name="summary"
              rows={3}
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-chocolate">正文（支持 Markdown）</label>
            <textarea
              name="content"
              required
              rows={8}
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
            />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              className="h-5 w-5 rounded border-chocolate/30 text-sky focus:ring-sky"
            />
            <label htmlFor="isPublished" className="text-sm text-chocolate">
              立即发布
            </label>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="cartoon-btn bg-grass px-6 py-2 text-chocolate">
              <Plus className="mr-1 inline h-4 w-4" />
              新增文章
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="cartoon-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cloud text-chocolate/80">
              <tr>
                <th className="px-4 py-3">标题</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">分类</th>
                <th className="px-4 py-3">标签</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/10">
              {articles.map((article) => (
                <tr key={article.id} className="text-chocolate">
                  <td className="px-4 py-3 font-medium">{article.title}</td>
                  <td className="px-4 py-3">{article.slug}</td>
                  <td className="px-4 py-3">{article.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex max-w-[200px] flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-cloud px-2 py-0.5 text-xs">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="rounded-full bg-cloud px-2 py-0.5 text-xs">+{article.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <form action={toggleArticlePublished.bind(null, article.id, !article.isPublished)}>
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${article.isPublished ? "bg-grass/20 text-grass-dark" : "bg-peach/20 text-peach-dark"}`}
                      >
                        {article.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {article.isPublished ? "已发布" : "草稿"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="rounded-full bg-sky/10 p-2 text-sky-dark hover:bg-sky/20"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton action={deleteArticle.bind(null, article.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-chocolate">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
      />
    </div>
  );
}
