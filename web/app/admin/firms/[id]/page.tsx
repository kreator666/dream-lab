import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateFirm } from "@/lib/actions/firm";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminFirmEditPage({ params }: Props) {
  const { id } = await params;
  const firm = await prisma.propFirm.findUnique({ where: { id } });
  if (!firm) notFound();

  const rules = (firm.rules as { items?: string[] } | null)?.items?.join("\n") ?? "";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/firms" className="inline-flex items-center gap-1 text-sm text-chocolate/70 hover:text-sky-dark hover:underline">
        <ArrowLeft className="h-4 w-4" />
        返回平台列表
      </Link>

      <h1 className="font-heading text-3xl text-chocolate">编辑平台</h1>

      <section className="cartoon-card bg-white p-6">
        <form action={updateFirm.bind(null, firm.id)} className="grid gap-4">
          <Input name="name" label="平台名称" defaultValue={firm.name} required />
          <Input name="slug" label="Slug" defaultValue={firm.slug} required />
          <Input name="website" label="官网链接" type="url" defaultValue={firm.website} required />
          <Input name="dataPlatform" label="数据商" defaultValue={firm.dataPlatform ?? ""} />
          <Input name="pricingNote" label="价格说明" defaultValue={firm.pricingNote ?? ""} />
          <Input name="difficulty" label="难度 1-5" type="number" min={1} max={5} defaultValue={firm.difficulty} required />
          <Input name="discountCode" label="折扣码" defaultValue={firm.discountCode ?? ""} />
          <div>
            <label className="mb-1 block text-sm font-medium text-chocolate">简介</label>
            <textarea name="summary" required rows={3} defaultValue={firm.summary} className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-chocolate">规则要点（每行一条）</label>
            <textarea name="rules" rows={4} defaultValue={rules} className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky" />
          </div>
          <div>
            <button type="submit" className="cartoon-btn bg-sky px-6 py-2 text-white">
              保存修改
            </button>
          </div>
        </form>
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
