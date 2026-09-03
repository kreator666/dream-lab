"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { RaffleStatus } from "@prisma/client";

export async function createRaffleEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const prize = formData.get("prize") as string;
  const startAtRaw = formData.get("startAt") as string;
  const endAtRaw = formData.get("endAt") as string;

  if (!title || !prize || !startAtRaw || !endAtRaw) {
    throw new Error("标题、奖品和起止时间必填");
  }

  await prisma.raffleEvent.create({
    data: {
      title,
      prize,
      startAt: new Date(startAtRaw),
      endAt: new Date(endAtRaw),
      status: RaffleStatus.DRAFT,
    },
  });

  revalidatePath("/raffles");
  revalidatePath("/admin/raffles");
}

export async function updateRaffleEvent(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const prize = formData.get("prize") as string;
  const startAtRaw = formData.get("startAt") as string;
  const endAtRaw = formData.get("endAt") as string;

  if (!title || !prize || !startAtRaw || !endAtRaw) {
    throw new Error("标题、奖品和起止时间必填");
  }

  await prisma.raffleEvent.update({
    where: { id },
    data: {
      title,
      prize,
      startAt: new Date(startAtRaw),
      endAt: new Date(endAtRaw),
    },
  });

  revalidatePath("/raffles");
  revalidatePath("/raffles/[id]", "page");
  revalidatePath("/admin/raffles");
}

export async function setRaffleStatus(id: string, status: RaffleStatus) {
  await prisma.raffleEvent.update({ where: { id }, data: { status } });
  revalidatePath("/raffles");
  revalidatePath("/admin/raffles");
}

export async function deleteRaffleEvent(id: string) {
  await prisma.raffleEvent.delete({ where: { id } });
  revalidatePath("/raffles");
  revalidatePath("/admin/raffles");
}

export async function createRaffleEntry(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const userId = formData.get("userId") as string;
  const propFirmId = formData.get("propFirmId") as string;
  const orderProof = formData.get("orderProof") as string;

  if (!eventId || !userId || !propFirmId) {
    throw new Error("活动、用户和平台必填");
  }

  const event = await prisma.raffleEvent.findUnique({ where: { id: eventId } });
  if (!event || event.status !== RaffleStatus.ACTIVE) {
    throw new Error("活动不存在或未开始/已结束");
  }

  const now = new Date();
  if (now < event.startAt || now > event.endAt) {
    throw new Error("当前不在活动参与时间内");
  }

  const existing = await prisma.raffleEntry.findFirst({
    where: { eventId, userId },
  });
  if (existing) {
    throw new Error("您已参与过该活动");
  }

  await prisma.raffleEntry.create({
    data: {
      eventId,
      userId,
      propFirmId,
      orderProof,
      status: "pending",
    },
  });

  revalidatePath("/raffles");
  revalidatePath(`/raffles/${eventId}`);
}

export async function markRaffleWinner(entryId: string) {
  const entry = await prisma.raffleEntry.findUnique({ where: { id: entryId } });
  if (!entry) throw new Error("参与记录不存在");

  await prisma.$transaction([
    prisma.raffleEntry.updateMany({
      where: { eventId: entry.eventId, status: "won" },
      data: { status: "pending" },
    }),
    prisma.raffleEntry.update({
      where: { id: entryId },
      data: { status: "won" },
    }),
  ]);

  revalidatePath("/admin/raffles");
  revalidatePath(`/admin/raffles/${entry.eventId}`);
  revalidatePath(`/raffles/${entry.eventId}`);
}
