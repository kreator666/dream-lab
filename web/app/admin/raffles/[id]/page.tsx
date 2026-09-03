import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateRaffleEvent, markRaffleWinner } from "@/lib/actions/raffle";
import { ArrowLeft, Crown } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminRaffleEditPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/");
  }

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

  const startAt = event.startAt.toISOString().slice(0, 16);
  const endAt = event.endAt.toISOString().slice(0, 16);
  const winner = event.entries.find((e) => e.status === "won");

  return (
    <div className="space-y-6">
      <Link
        href="/admin/raffles"
        className="inline-flex items-center gap-1 text-sm text-chocolate/70 hover:text-sky-dark hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        返回抽奖列表
      </Link>

      <h1 className="font-heading text-3xl text-chocolate">编辑抽奖</h1>

      <section className="cartoon-card bg-white p-6">
        <form action={updateRaffleEvent.bind(null, event.id)} className="grid gap-4 sm:grid-cols-2">
          <Input name="title" label="活动标题" defaultValue={event.title} required />
          <Input name="prize" label="奖品" defaultValue={event.prize} required />
          <Input name="startAt" label="开始时间" type="datetime-local" defaultValue={startAt} required />
          <Input name="endAt" label="结束时间" type="datetime-local" defaultValue={endAt} required />
          <div className="sm:col-span-2">
            <button type="submit" className="cartoon-btn bg-sky px-6 py-2 text-white">
              保存修改
            </button>
          </div>
        </form>
      </section>

      <section className="cartoon-card overflow-hidden bg-white">
        <div className="border-b border-chocolate/10 px-4 py-3">
          <h2 className="font-heading text-xl text-chocolate">参与名单（{event.entries.length} 人）</h2>
        </div>
        {event.entries.length === 0 ? (
          <div className="p-6 text-center text-chocolate/70">还没有人参与。</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cloud text-chocolate/80">
                <tr>
                  <th className="px-4 py-3">用户</th>
                  <th className="px-4 py-3">平台</th>
                  <th className="px-4 py-3">截图</th>
                  <th className="px-4 py-3">参与时间</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-chocolate/10">
                {event.entries.map((entry) => (
                  <tr key={entry.id} className={`text-chocolate ${entry.status === "won" ? "bg-lemon/10" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{entry.user.name || "未命名"}</p>
                      <p className="text-xs text-chocolate/60">{entry.user.email}</p>
                      {entry.status === "won" && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-lemon px-2 py-0.5 text-xs text-chocolate">
                          <Crown className="h-3 w-3" />
                          中奖
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{entry.propFirm?.name || "已删除平台"}</td>
                    <td className="px-4 py-3">
                      {entry.orderProof ? (
                        <a
                          href={entry.orderProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-dark hover:underline"
                        >
                          查看
                        </a>
                      ) : (
                        <span className="text-chocolate/40">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-chocolate/70">
                      {entry.createdAt.toLocaleString("zh-CN")}
                    </td>
                    <td className="px-4 py-3">
                      <form action={markRaffleWinner.bind(null, entry.id)}>
                        <button
                          type="submit"
                          className="rounded-full bg-lemon/10 px-3 py-1 text-xs text-chocolate hover:bg-lemon/20"
                        >
                          标记中奖
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
