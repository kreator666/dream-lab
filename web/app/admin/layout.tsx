import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import { Building2, FileText, LayoutDashboard, LogOut, User } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-b-2 border-chocolate bg-night p-4 text-cream md:w-64 md:border-b-0 md:border-r-2">
        <Link href="/" className="flex items-center gap-2 px-2">
          <span className="font-heading text-xl">Dream Lab 后台</span>
        </Link>
        <nav className="mt-6 space-y-2">
          <AdminLink href="/admin" icon={<LayoutDashboard className="h-4 w-4" />}>
            控制台
          </AdminLink>
          <AdminLink href="/admin/firms" icon={<Building2 className="h-4 w-4" />}>
            平台管理
          </AdminLink>
          <AdminLink href="/admin/articles" icon={<FileText className="h-4 w-4" />}>
            文章管理
          </AdminLink>
          <AdminLink href="/" icon={<LogOut className="h-4 w-4" />}>
            返回前台
          </AdminLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-cream p-6 md:p-10">
        <header className="mb-6 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-chocolate shadow-sm">
              <User className="h-4 w-4" />
              <span>{session?.user?.name || session?.user?.email}</span>
              <span className="rounded-full bg-sky/10 px-2 py-0.5 text-xs text-sky-dark">
                {session?.user?.role}
              </span>
            </div>
            <SignOutButton />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function AdminLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
    >
      {icon}
      {children}
    </Link>
  );
}
