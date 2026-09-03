import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createRaffleEvent, setRaffleStatus, deleteRaffleEvent } from "@/lib/actions/raffle";
import { DeleteButton } from "@/components/delete-button";
import { Plus, Pencil, Play, CheckCircle, XCircle } from "lucide-react";
import { RaffleStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminRafflesPage() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/");
  }

  const events = await prisma.raffleEvent.findMany({
    include: { _count: { select: { entries: true } } },
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-chocolate">抽奖活动管理</h1>
      </div>

      <section className="cartoon-card bg-white p-6">
        <h2 className="font-heading text-xl text-chocolate">新增抽奖</h2>
        <form action={createRaffleEvent} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input name="title" label="活动标题" required />
          <Input name="prize" label="奖品" required />
          <Input name="startAt" label="开始时间" type="datetime-local" defaultValue={tomorrow} required />
          <Input name="endAt" label="结束时间" type="datetime-local" defaultValue={nextWeek} required />
          <div className="sm:col-span-2">
            <button type="submit" className="cartoon-btn bg-sky px-6 py-2 text-white">
              <Plus className="mr-1 inline h-4 w-4" />
              新增抽奖
            </button>
          </div>
        </form>
      </section>

      <section className="cartoon-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cloud text-chocolate/80">
              <tr>
                <th className="px-4 py-3">标题</th>
                <th className="px-4 py-3">奖品</th>
                <th className="px-4 py-3">时间</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">参与</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/10">
              {events.map((event) => (
                <tr key={event.id} className="text-chocolate">
                  <td className="px-4 py-3 font-medium">{event.title}</td>
                  <td className="px-4 py-3">{event.prize}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      {event.startAt.toLocaleString("zh-CN")}
                    </div>
                    <div className="text-xs text-chocolate/60">
                      {event.endAt.toLocaleString("zh-CN")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-4 py-3">{event._count.entries} 人</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/raffles/${event.id}`}
                        className="rounded-full bg-sky/10 p-2 text-sky-dark hover:bg-sky/20"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {event.status === RaffleStatus.DRAFT && (
                        <form action={setRaffleStatus.bind(null, event.id, RaffleStatus.ACTIVE)}>
                          <button
                            type="submit"
                            className="rounded-full bg-grass/10 p-2 text-grass-dark hover:bg-grass/20"
                            title="开始"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                      {event.status === RaffleStatus.ACTIVE && (
                        <form action={setRaffleStatus.bind(null, event.id, RaffleStatus.FINISHED)}>
                          <button
                            type="submit"
                            className="rounded-full bg-lemon/10 p-2 text-chocolate hover:bg-lemon/20"
                            title="结束"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                      {event.status !== RaffleStatus.ACTIVE && (
                        <form action={setRaffleStatus.bind(null, event.id, RaffleStatus.DRAFT)}>
                          <button
                            type="submit"
                            className="rounded-full bg-chocolate/10 p-2 text-chocolate hover:bg-chocolate/20"
                            title="重置为草稿"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                      <DeleteButton action={deleteRaffleEvent.bind(null, event.id)} />
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

function StatusBadge({ status }: { status: RaffleStatus }) {
  const config: Record<string, { text: string; className: string }> = {
    DRAFT: { text: "草稿", className: "bg-chocolate/10 text-chocolate/70" },
    ACTIVE: { text: "进行中", className: "bg-grass/20 text-grass-dark" },
    FINISHED: { text: "已结束", className: "bg-peach/20 text-peach-dark" },
  };
  const c = config[status] || config.DRAFT;
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${c.className}`}>{c.text}</span>
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
