"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createRegistration(formData: FormData) {
  const userId = formData.get("userId") as string;
  const propFirmId = formData.get("propFirmId") as string;
  const discountCode = formData.get("discountCode") as string;
  const orderProof = formData.get("orderProof") as string;

  if (!userId || !propFirmId || !discountCode) {
    throw new Error("用户、平台和折扣码必填");
  }

  await prisma.registration.create({
    data: {
      userId,
      propFirmId,
      discountCode,
      orderProof,
      status: "pending",
    },
  });

  revalidatePath("/register-code");
  revalidatePath("/admin/registrations");
}

export async function updateRegistrationStatus(id: string, status: string) {
  await prisma.registration.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/registrations");
}

export async function deleteRegistration(id: string) {
  await prisma.registration.delete({ where: { id } });
  revalidatePath("/admin/registrations");
}
