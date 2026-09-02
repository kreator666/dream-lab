import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Building2, FileText, Users } from "lucide-react";

export default async function AdminDashboard() {
  const [firmCount, articleCount, userCount] = await Promise.all([
    prisma.propFirm.count(),
    prisma.article.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-chocolate">控制台</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard href="/admin/firms" icon={<Building2 className="h-6 w-6" />} label="平台数量" value={firmCount} color="bg-sky" />
        <StatCard href="/admin/articles" icon={<FileText className="h-6 w-6" />} label="文章数量" value={articleCount} color="bg-grass" />
        <StatCard href="#" icon={<Users className="h-6 w-6" />} label="用户数量" value={userCount} color="bg-peach" />
      </div>

      <div className="cartoon-card bg-white p-6">
        <h2 className="font-heading text-xl text-chocolate">快速入口</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/firms" className="cartoon-btn bg-sky px-4 py-2 text-sm text-white">
            管理平台
          </Link>
          <Link href="/admin/articles" className="cartoon-btn bg-grass px-4 py-2 text-sm text-chocolate">
            管理文章
          </Link>
          <Link href="/" className="cartoon-btn border-2 border-chocolate bg-white px-4 py-2 text-sm text-chocolate">
            查看前台
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  href,
  icon,
  label,
  value,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="cartoon-card flex items-center gap-4 bg-white p-5 transition-transform hover:-translate-y-1"
    >
      <div className={`rounded-2xl ${color} p-3 text-white shadow-[0_3px_0_#5D4037]`}>{icon}</div>
      <div>
        <p className="text-sm text-chocolate/60">{label}</p>
        <p className="font-heading text-2xl text-chocolate">{value}</p>
      </div>
    </Link>
  );
}
