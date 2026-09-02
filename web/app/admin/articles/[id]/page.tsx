import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateArticle } from "@/lib/actions/article";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminArticleEditPage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1 text-sm text-chocolate/70 hover:text-sky-dark hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      <h1 className="font-heading text-3xl text-chocolate">编辑文章</h1>

      <section className="cartoon-card bg-white p-6">
        <form action={updateArticle.bind(null, article.id)} className="grid gap-4">
          <Input name="title" label="标题" defaultValue={article.title} required />
          <Input name="slug" label="Slug" defaultValue={article.slug} required />
          <Input name="category" label="分类" defaultValue={article.category} required />
          <Input name="tags" label="标签（逗号分隔）" defaultValue={article.tags.join(", ")} />
          <Input name="cover" label="封面链接" type="url" defaultValue={article.cover ?? ""} />
          <div>
            <label className="mb-1 block text-sm font-medium text-chocolate">摘要</label>
            <textarea
              name="summary"
              rows={3}
              defaultValue={article.summary ?? ""}
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-chocolate">正文（支持 Markdown）</label>
            <textarea
              name="content"
              required
              rows={10}
              defaultValue={article.content}
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              defaultChecked={article.isPublished}
              className="h-5 w-5 rounded border-chocolate/30 text-sky focus:ring-sky"
            />
            <label htmlFor="isPublished" className="text-sm text-chocolate">
              已发布
            </label>
          </div>
          <div>
            <button type="submit" className="cartoon-btn bg-grass px-6 py-2 text-chocolate">
              保存修改
            </button>
          </div>
        </form>
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
