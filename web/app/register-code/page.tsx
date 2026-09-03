import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { createRegistration } from "@/lib/actions/registration";
import { prisma } from "@/lib/prisma";
import { Cloud, Gift } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RegisterCodePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const firms = await prisma.propFirm.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const userRegistrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: { propFirm: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-sky/20 to-cream py-12 md:py-16">
          <Cloud className="absolute left-[8%] top-[20%] h-14 w-14 animate-float text-white opacity-70" />
          <Cloud className="absolute right-[12%] top-[15%] h-18 w-18 animate-float-delayed text-white opacity-60" />
          <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
            <div className="mx-auto inline-flex animate-bounce-soft rounded-full border-4 border-chocolate bg-white p-3 shadow-[0_6px_0_#5D4037]">
              <Gift className="h-16 w-16 text-sky-dark" />
            </div>
            <h1 className="mt-4 font-heading text-3xl text-chocolate md:text-4xl">
              折扣码登记
            </h1>
            <p className="mt-2 text-chocolate/70">
              使用本站折扣码下单后登记，即可参与抽奖活动
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          <div className="cartoon-card bg-white p-6">
            <h2 className="font-heading text-xl text-chocolate">登记新订单</h2>
            <form action={createRegistration} className="mt-4 grid gap-4">
              <input type="hidden" name="userId" value={session.user.id} />
              <div>
                <label className="mb-1 block text-sm font-medium text-chocolate">平台</label>
                <select
                  name="propFirmId"
                  required
                  className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
                >
                  <option value="">请选择平台</option>
                  {firms.map((firm) => (
                    <option key={firm.id} value={firm.id}>
                      {firm.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-chocolate">折扣码</label>
                <input
                  name="discountCode"
                  required
                  placeholder="例如 LUCKY"
                  className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
                />
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
                  提交登记
                </button>
              </div>
            </form>
          </div>

          {userRegistrations.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl text-chocolate">我的登记记录</h2>
              <div className="mt-4 space-y-3">
                {userRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="cartoon-card flex flex-wrap items-center justify-between gap-3 bg-white p-4"
                  >
                    <div>
                      <p className="font-medium text-chocolate">{reg.propFirm?.name || "已删除平台"}</p>
                      <p className="text-sm text-chocolate/70">折扣码：{reg.discountCode}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        reg.status === "approved"
                          ? "bg-grass/20 text-grass-dark"
                          : reg.status === "rejected"
                            ? "bg-peach/20 text-peach-dark"
                            : "bg-lemon/20 text-chocolate"
                      }`}
                    >
                      {statusLabel(reg.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="bg-cloud py-10">
          <div className="mx-auto flex max-w-xl flex-col items-center px-4 text-center">
            <PandaMascot className="h-24 w-24" />
            <h2 className="mt-4 font-heading text-xl text-chocolate">登记后别忘了抽奖</h2>
            <p className="mt-2 text-sm text-chocolate/70">
              管理员审核通过后，你的登记即可作为参与抽奖的资格。
            </p>
            <Link href="/raffles" className="cartoon-btn mt-4 bg-grass px-5 py-2 text-chocolate">
              查看抽奖活动
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    pending: "待审核",
    approved: "已通过",
    rejected: "未通过",
  };
  return map[status] || status;
}
