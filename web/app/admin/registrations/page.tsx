import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateRegistrationStatus, deleteRegistration } from "@/lib/actions/registration";
import { DeleteButton } from "@/components/delete-button";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/");
  }

  const registrations = await prisma.registration.findMany({
    include: { user: true, propFirm: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-chocolate">折扣码登记</h1>
      </div>

      <section className="cartoon-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cloud text-chocolate/80">
              <tr>
                <th className="px-4 py-3">用户</th>
                <th className="px-4 py-3">平台</th>
                <th className="px-4 py-3">折扣码</th>
                <th className="px-4 py-3">截图</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">登记时间</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/10">
              {registrations.map((reg) => (
                <tr key={reg.id} className="text-chocolate">
                  <td className="px-4 py-3">
                    <p className="font-medium">{reg.user.name || "未命名"}</p>
                    <p className="text-xs text-chocolate/60">{reg.user.email}</p>
                  </td>
                  <td className="px-4 py-3">{reg.propFirm?.name || "已删除平台"}</td>
                  <td className="px-4 py-3 font-mono">{reg.discountCode}</td>
                  <td className="px-4 py-3">
                    {reg.orderProof ? (
                      <a
                        href={reg.orderProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-dark hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        查看
                      </a>
                    ) : (
                      <span className="text-chocolate/40">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={reg.status} />
                  </td>
                  <td className="px-4 py-3 text-chocolate/70">
                    {reg.createdAt.toLocaleDateString("zh-CN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <form action={updateRegistrationStatus.bind(null, reg.id, "approved")}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-full bg-grass/10 px-2 py-1 text-xs text-grass-dark hover:bg-grass/20"
                        >
                          <CheckCircle className="h-3 w-3" />
                          通过
                        </button>
                      </form>
                      <form action={updateRegistrationStatus.bind(null, reg.id, "rejected")}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-full bg-peach/10 px-2 py-1 text-xs text-peach hover:bg-peach/20"
                        >
                          <XCircle className="h-3 w-3" />
                          拒绝
                        </button>
                      </form>
                      <DeleteButton action={deleteRegistration.bind(null, reg.id)} />
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

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { text: string; className: string; icon: React.ReactNode }> = {
    pending: {
      text: "待审核",
      className: "bg-lemon/20 text-chocolate",
      icon: <Clock className="h-3 w-3" />,
    },
    approved: {
      text: "已通过",
      className: "bg-grass/20 text-grass-dark",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    rejected: {
      text: "已拒绝",
      className: "bg-peach/20 text-peach-dark",
      icon: <XCircle className="h-3 w-3" />,
    },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${c.className}`}>
      {c.icon}
      {c.text}
    </span>
  );
}
