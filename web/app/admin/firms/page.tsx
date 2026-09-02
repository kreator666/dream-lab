import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createFirm, toggleFirmActive, deleteFirm } from "@/lib/actions/firm";
import { DeleteButton } from "@/components/delete-button";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFirmsPage() {
  const firms = await prisma.propFirm.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-chocolate">平台管理</h1>
      </div>

      {/* Create form */}
      <section className="cartoon-card bg-white p-6">
        <h2 className="font-heading text-xl text-chocolate">新增平台</h2>
        <form action={createFirm} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input name="name" label="平台名称" required />
          <Input name="slug" label="Slug（URL 标识）" required />
          <Input name="website" label="官网链接" type="url" required />
          <Input name="dataPlatform" label="数据商" />
          <Input name="pricingNote" label="价格说明" />
          <Input name="difficulty" label="难度 1-5" type="number" min={1} max={5} defaultValue="3" required />
          <Input name="discountCode" label="折扣码" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-chocolate">简介</label>
            <textarea name="summary" required rows={3} className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-chocolate">规则要点（每行一条）</label>
            <textarea name="rules" rows={4} className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="cartoon-btn bg-sky px-6 py-2 text-white">
              <Plus className="mr-1 inline h-4 w-4" />
              新增平台
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="cartoon-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cloud text-chocolate/80">
              <tr>
                <th className="px-4 py-3">名称</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">数据商</th>
                <th className="px-4 py-3">难度</th>
                <th className="px-4 py-3">折扣码</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/10">
              {firms.map((firm) => (
                <tr key={firm.id} className="text-chocolate">
                  <td className="px-4 py-3 font-medium">{firm.name}</td>
                  <td className="px-4 py-3">{firm.slug}</td>
                  <td className="px-4 py-3">{firm.dataPlatform || "-"}</td>
                  <td className="px-4 py-3">{firm.difficulty}</td>
                  <td className="px-4 py-3">{firm.discountCode || "-"}</td>
                  <td className="px-4 py-3">
                    <form action={toggleFirmActive.bind(null, firm.id, !firm.isActive)}>
                      <button type="submit" className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${firm.isActive ? "bg-grass/20 text-grass-dark" : "bg-peach/20 text-peach-dark"}`}>
                        {firm.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {firm.isActive ? "显示" : "隐藏"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/firms/${firm.id}`} className="rounded-full bg-sky/10 p-2 text-sky-dark hover:bg-sky/20">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton action={deleteFirm.bind(null, firm.id)} />
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

function Input({
  name,
  label,
  type = "text",
  defaultValue,
  required,
  min,
  max,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-chocolate">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        min={min}
        max={max}
        className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
      />
    </div>
  );
}
