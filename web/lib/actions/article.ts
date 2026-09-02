"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw.split(",").map((s) => s.trim()).filter(Boolean);
  const isPublished = formData.get("isPublished") === "on";

  await prisma.article.create({
    data: {
      title,
      slug,
      summary,
      content,
      category,
      tags,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw.split(",").map((s) => s.trim()).filter(Boolean);
  const isPublished = formData.get("isPublished") === "on";

  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      summary,
      content,
      category,
      tags,
      isPublished,
      publishedAt: isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/admin/articles");
}

export async function toggleArticlePublished(id: string, isPublished: boolean) {
  const existing = await prisma.article.findUnique({ where: { id } });
  await prisma.article.update({
    where: { id },
    data: {
      isPublished,
      publishedAt: isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}
