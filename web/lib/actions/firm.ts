"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createFirm(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const website = formData.get("website") as string;
  const dataPlatform = formData.get("dataPlatform") as string;
  const pricingNote = formData.get("pricingNote") as string;
  const difficulty = parseInt(formData.get("difficulty") as string, 10);
  const summary = formData.get("summary") as string;
  const discountCode = formData.get("discountCode") as string;
  const rulesRaw = formData.get("rules") as string;
  const rules = rulesRaw ? { items: rulesRaw.split("\n").map((s) => s.trim()).filter(Boolean) } : undefined;

  await prisma.propFirm.create({
    data: {
      name,
      slug,
      website,
      dataPlatform,
      pricingNote,
      difficulty,
      summary,
      discountCode,
      rules,
    },
  });

  revalidatePath("/firms");
  revalidatePath("/admin/firms");
}

export async function updateFirm(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const website = formData.get("website") as string;
  const dataPlatform = formData.get("dataPlatform") as string;
  const pricingNote = formData.get("pricingNote") as string;
  const difficulty = parseInt(formData.get("difficulty") as string, 10);
  const summary = formData.get("summary") as string;
  const discountCode = formData.get("discountCode") as string;
  const rulesRaw = formData.get("rules") as string;
  const rules = rulesRaw ? { items: rulesRaw.split("\n").map((s) => s.trim()).filter(Boolean) } : undefined;

  await prisma.propFirm.update({
    where: { id },
    data: {
      name,
      slug,
      website,
      dataPlatform,
      pricingNote,
      difficulty,
      summary,
      discountCode,
      rules,
    },
  });

  revalidatePath("/firms");
  revalidatePath("/firms/[slug]", "page");
  revalidatePath("/admin/firms");
}

export async function toggleFirmActive(id: string, isActive: boolean) {
  await prisma.propFirm.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/firms");
  revalidatePath("/admin/firms");
}

export async function deleteFirm(id: string) {
  await prisma.propFirm.delete({ where: { id } });
  revalidatePath("/firms");
  revalidatePath("/admin/firms");
}
