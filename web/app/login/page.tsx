import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="cartoon-card w-full max-w-md bg-white p-8">
          <div className="flex justify-center">
            <PandaMascot className="h-24 w-24" />
          </div>
          <h1 className="mt-4 text-center font-heading text-2xl text-chocolate">欢迎回到冒险岛</h1>
          <p className="text-center text-sm text-chocolate/60">登录功能将在用户系统阶段实现</p>
          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="邮箱"
              disabled
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-cloud px-4 py-3 text-chocolate outline-none"
            />
            <input
              type="password"
              placeholder="密码"
              disabled
              className="w-full rounded-2xl border-2 border-chocolate/30 bg-cloud px-4 py-3 text-chocolate outline-none"
            />
            <Button disabled className="w-full cartoon-btn bg-sky py-3 text-lg opacity-60">
              登录
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
