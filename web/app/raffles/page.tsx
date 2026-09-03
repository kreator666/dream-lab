import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { prisma } from "@/lib/prisma";
import { RaffleStatus } from "@prisma/client";
import { Calendar, Gift, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RafflesPage() {
  const events = await prisma.raffleEvent.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { entries: true } } },
  });

  const activeEvents = events.filter((e) => e.status === RaffleStatus.ACTIVE);
  const finishedEvents = events.filter(
    (e) => e.status === RaffleStatus.FINISHED || e.status === RaffleStatus.DRAFT
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-lemon/30 to-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
            <PandaMascot variant="wave" className="mx-auto h-24 w-24" />
            <h1 className="mt-4 font-heading text-3xl text-chocolate md:text-4xl">
              抽奖活动
            </h1>
            <p className="mt-2 text-chocolate/70">
              使用本站折扣码下单并登记，即可参与抽奖
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
          {activeEvents.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-chocolate/30 bg-white py-12">
              <PandaMascot variant="confused" className="h-24 w-24" />
              <p className="mt-4 text-chocolate/70">暂无进行中的抽奖活动，过段时间再来看看～</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeEvents.map((event) => (
                <RaffleCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {finishedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-heading text-2xl text-chocolate">历史 / 未开始活动</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {finishedEvents.map((event) => (
                  <RaffleCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function RaffleCard({
  event,
}: {
  event: {
    id: string;
    title: string;
    prize: string;
    startAt: Date;
    endAt: Date;
    status: RaffleStatus;
    _count: { entries: number };
  };
}) {
  const isActive = event.status === RaffleStatus.ACTIVE;
  const statusText =
    event.status === RaffleStatus.ACTIVE
      ? "进行中"
      : event.status === RaffleStatus.FINISHED
        ? "已结束"
        : "筹备中";

  return (
    <Link
      href={`/raffles/${event.id}`}
      className="cartoon-card group flex h-full flex-col gap-3 bg-white p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky text-white shadow-[0_3px_0_#5D4037]">
          <Gift className="h-6 w-6" />
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-grass/20 text-grass-dark"
              : event.status === RaffleStatus.FINISHED
                ? "bg-chocolate/10 text-chocolate/70"
                : "bg-lemon/20 text-chocolate"
          }`}
        >
          {statusText}
        </span>
      </div>
      <h3 className="font-heading text-xl text-chocolate group-hover:text-sky-dark">
        {event.title}
      </h3>
      <p className="text-sm text-chocolate/80">奖品：{event.prize}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-xs text-chocolate/60">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {event.startAt.toLocaleDateString("zh-CN")} ~ {event.endAt.toLocaleDateString("zh-CN")}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {event._count.entries} 人参与
        </span>
      </div>
    </Link>
  );
}
