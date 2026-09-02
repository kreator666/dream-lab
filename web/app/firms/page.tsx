import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";

export default function FirmsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <PandaMascot variant="confused" className="h-40 w-40" />
        <h1 className="mt-6 font-heading text-3xl text-chocolate">规则汇总</h1>
        <p className="mt-2 text-chocolate/70">正在整理各大 Prop Firm 规则，敬请期待。</p>
      </main>
      <Footer />
    </div>
  );
}
