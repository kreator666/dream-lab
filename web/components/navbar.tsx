import Link from "next/link";
import { auth } from "@/auth";
import { PandaMascot } from "@/components/panda-mascot";
import { SignOutButton } from "@/components/sign-out-button";
import { Menu, User } from "lucide-react";

const navLinks = [
  { href: "/firms", label: "规则汇总" },
  { href: "/articles", label: "教程" },
  { href: "/know", label: "基础知识" },
  { href: "/road", label: "考试路径" },
  { href: "/live", label: "实盘路径" },
  { href: "/raffles", label: "抽奖" },
];

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-chocolate bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <PandaMascot className="h-10 w-10" />
          <span className="font-heading text-xl font-bold text-chocolate">
            Dream Lab
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 font-medium text-chocolate transition-colors hover:bg-sky/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-chocolate transition-colors hover:bg-sky/10"
              >
                <User className="h-4 w-4" />
                {session.user.name || session.user.email}
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border-2 border-chocolate bg-white px-4 py-1.5 font-medium text-chocolate transition-transform hover:-translate-y-0.5 md:inline-block"
            >
              登录
            </Link>
          )}
          <button
            type="button"
            className="rounded-full border-2 border-chocolate bg-white p-2 md:hidden"
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5 text-chocolate" />
          </button>
        </div>
      </div>
    </header>
  );
}
