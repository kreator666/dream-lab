"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-chocolate/20 bg-white px-3 py-1.5 text-sm text-chocolate transition-colors hover:bg-peach/10"
    >
      <LogOut className="h-4 w-4" />
      退出
    </button>
  );
}
