"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("邮箱或密码错误");
      setPending(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("两次输入的密码不一致");
      setPending(false);
      return;
    }

    try {
      await registerUser(formData);
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("注册成功但自动登录失败，请手动登录");
        setMode("login");
        setPending(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败");
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream p-4">
      {/* Cloud decorations */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] animate-float opacity-60">
        <Cloud />
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[25%] animate-float opacity-60 [animation-delay:1s]">
        <Cloud />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 animate-bounce-soft items-center justify-center rounded-full bg-grass shadow-[0_4px_0_#5D4037]">
            <span className="text-4xl">🐼</span>
          </div>
          <h1 className="font-heading text-3xl text-chocolate">Dream Lab 登录</h1>
          <p className="mt-1 text-sm text-chocolate/70">登录后可进入后台管理内容</p>
        </div>

        <div className="cartoon-card bg-white p-6">
          {/* Tabs */}
          <div className="mb-6 flex rounded-2xl bg-cloud p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white text-chocolate shadow-sm" : "text-chocolate/60 hover:text-chocolate"
              }`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${
                mode === "register" ? "bg-white text-chocolate shadow-sm" : "text-chocolate/60 hover:text-chocolate"
              }`}
            >
              注册
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border-2 border-peach-dark bg-peach/20 px-4 py-2 text-sm text-peach-dark">
              {error}
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input name="email" label="邮箱" type="email" required />
              <Input name="password" label="密码" type="password" required />
              <button
                type="submit"
                disabled={pending}
                className="cartoon-btn flex w-full items-center justify-center gap-2 bg-sky py-2.5 text-white disabled:opacity-70"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                登录
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input name="name" label="昵称" />
              <Input name="email" label="邮箱" type="email" required />
              <Input name="password" label="密码" type="password" required minLength={6} />
              <Input name="confirm" label="确认密码" type="password" required minLength={6} />
              <button
                type="submit"
                disabled={pending}
                className="cartoon-btn flex w-full items-center justify-center gap-2 bg-grass py-2.5 text-chocolate disabled:opacity-70"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                注册
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-chocolate/50">
          默认管理员：admin@example.com / admin123
        </p>
      </div>
    </main>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
  minLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-chocolate">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        className="w-full rounded-2xl border-2 border-chocolate/30 bg-white px-4 py-2 text-chocolate outline-none focus:border-sky"
      />
    </div>
  );
}

function Cloud() {
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M62 40H12C5.373 40 0 34.627 0 28C0 21.925 4.345 16.89 10.103 16.089C10.566 10.68 15.163 6.5 20.8 6.5C22.835 6.5 24.74 7.078 26.364 8.09C29.258 3.288 34.52 0 40.5 0C49.613 0 57 7.387 57 16.5C57 16.78 56.988 17.057 56.965 17.331C63.352 18.301 68.5 23.823 68.5 30.5C68.5 35.789 64.79 40.174 59.82 41.555C60.513 40.78 61 39.736 61 38.5C61 35.686 58.986 33.366 56.306 32.717C56.76 31.638 57 30.454 57 29.214C57 23.098 52.034 18.214 45.882 18.214C40.797 18.214 36.555 21.706 35.126 26.362C33.696 25.549 32.029 25.071 30.25 25.071C24.589 25.071 20 29.66 20 35.321C20 35.715 20.023 36.103 20.068 36.483C20.023 36.49 19.978 36.5 19.933 36.5H12C9.791 36.5 8 34.709 8 32.5C8 30.291 9.791 28.5 12 28.5H14.5C14.5 23.253 18.753 19 24 19C25.75 19 27.39 19.461 28.8 20.268C30.847 14.612 36.313 10.5 42.75 10.5C51.06 10.5 57.75 17.402 57.75 25.893C57.75 26.387 57.724 26.874 57.674 27.352C60.388 28.404 62.5 31.021 62.5 34.143C62.5 36.336 61.178 38.255 59.234 39.221C60.09 39.642 61.065 40 62 40Z"
        fill="#FFFFFF"
        stroke="#5D4037"
        strokeWidth="2"
      />
    </svg>
  );
}
