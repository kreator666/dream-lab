import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PandaMascot } from "@/components/panda-mascot";

export default function LivePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <PandaMascot variant="coin" className="h-40 w-40" />
        <h1 className="mt-6 font-heading text-3xl text-chocolate">实盘路径</h1>
        <p className="mt-2 text-chocolate/70">通过考试后如何稳健出金。</p>
      </main>
      <Footer />
    </div>
  );
}
