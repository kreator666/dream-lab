import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { createRaffleEntry } from "@/lib/actions/raffle";
import { prisma } from "@/lib/prisma";
import { RaffleStatus } from "@prisma/client";
import { Calendar, Gift, Users, CheckCircle, Crown } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function RaffleDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const event = await prisma.raffleEvent.findUnique({
    where: { id },
    include: {
      entries: {
        include: { user: true, propFirm: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!event) notFound();

  const now = new Date();
  const isActive = event.status === RaffleStatus.ACTIVE && now >= event.startAt && now <= event.endAt;
  const isFinished = event.status === RaffleStatus.FINISHED || now > event.endAt;
  const winner = event.entries.find((e) => e.status === "won");

  let myEntry = null;
  let myApprovedRegistrations: { id: string; propFirm: { id: string; name: string } | null; discountCode: string }[] = [];

  if (session?.user) {
    myEntry = event.entries.find((e) => e.userId === session.user.id);
    myApprovedRegistrations = await prisma.registration.findMany({
      where: { userId: session.user.id, status: "approved" },
      include: { propFirm: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-sky/20 to-cream py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <PandaMascot variant="coin" className="mx-auto h-24 w-24" />
            <h1 className="mt-4 font-heading text-3xl text-chocolate md:text-4xl">
              {event.title}
            </h1>
            <p className="mt-2 text-lg text-chocolate/80">奖品：{event.prize}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-chocolate/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {event.startAt.toLocaleDateString("zh-CN")} ~ {event.endAt.toLocaleDateString("zh-CN")}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.entries.length} 人参与
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
          {winner && (
            <div className="mb-8 rounded-2xl border-2 border-lemon bg-lemon/20 p-5 text-center">
              <Crown className="mx-auto h-10 w-10 text-lemon-dark" />
              <h2 className="mt-2 font-heading text-xl text-chocolate">
                中奖者：{winner.user.name || winner.user.email}
              </h2>
              <p className="mt-1 text-sm text-chocolate/70">恭喜获得 {event.prize}！</p>
            </div>
          )}

          {isActive && !myEntry && (
            <div className="cartoon-card bg-white p-6">
              <h2 className="font-heading text-xl text-chocolate">参与活动</h2>
              {!session?.user ? (
                <div className="mt-4">
                  <p className="text-chocolate/80">请登录后参与抽奖。</p>
                  <Link href="/login" className="cartoon-btn mt-3 inline-block bg-sky px-5 py-2 text-white">
                    去登录
                  </Link>
                </div>
              ) : myApprovedRegistrations.length === 0 ? (
                <div className="mt-4">
                  <p className="text-chocolate/80">
                    你还没有已通过审核的折扣码登记，先去登记吧。
                  </p>
                  <Link href="/register-code" className="cartoon-btn mt-3 inline-block bg-grass px-5 py-2 text-chocolate">
                    去登记
                  </Link>
                </div>
              ) : (
                <form action={createRaffleEntry} className="mt-4 grid gap-4">
                  <input type="hidden" name="eventId" value={event.id} />
                  <input type="hidden" name="userId" value={session.user.id} />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-chocolate">选择已登记的订单</label>
                    <select
                      name="propFirmId"
                      required
                      className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
                    >
                      <option value="">请选择</option>
                      {myApprovedRegistrations.map((reg) =>
                        reg.propFirm ? (
                          <option key={reg.id} value={reg.propFirm.id}>
                            {reg.propFirm.name}（{reg.discountCode}）
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-chocolate">
                      订单截图链接（可选）
                    </label>
                    <input
                      name="orderProof"
                      type="url"
                      placeholder="https://..."
                      className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
                    />
                  </div>
                  <div>
                    <button type="submit" className="cartoon-btn bg-sky px-6 py-2.5 text-white">
                      立即参与
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {isActive && myEntry && (
            <div className="rounded-2xl border-2 border-grass bg-grass/10 p-5 text-center">
              <CheckCircle className="mx-auto h-10 w-10 text-grass-dark" />
              <p className="mt-2 text-chocolate">你已参与本次活动，祝你好运！</p>
            </div>
          )}

          {isFinished && !winner && (
            <div className="rounded-2xl border-2 border-chocolate/20 bg-white p-5 text-center">
              <p className="text-chocolate/70">本次活动已结束，结果将在后台公布。</p>
            </div>
          )}

          {!isActive && !isFinished && (
            <div className="rounded-2xl border-2 border-chocolate/20 bg-white p-5 text-center">
              <p className="text-chocolate/70">本次活动尚未开始或已结束，敬请期待下一次。</p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-heading text-xl text-chocolate">参与名单</h2>
            {event.entries.length === 0 ? (
              <p className="mt-3 text-chocolate/60">还没有人参与。</p>
            ) : (
              <div className="mt-3 space-y-2">
                {event.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="cartoon-card flex items-center justify-between bg-white p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-chocolate">
                        {entry.user.name || entry.user.email}
                      </p>
                      <p className="text-xs text-chocolate/60">{entry.propFirm?.name || "已删除平台"}</p>
                    </div>
                    {entry.status === "won" && (
                      <span className="rounded-full bg-lemon px-2 py-0.5 text-xs font-bold text-chocolate">
                        🏆 中奖
                      </span>
                    )}
                  </div>
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
