import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-chocolate bg-night py-10 text-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-lg">Dream Lab</h3>
            <p className="mt-2 text-sm opacity-80">
              中文 Prop Firm 导航社区，种田养老，稳健通关。
            </p>
          </div>
          <div>
            <h4 className="font-bold">快速链接</h4>
            <ul className="mt-2 space-y-1 text-sm opacity-80">
              <li><Link href="/firms" className="hover:underline">规则汇总</Link></li>
              <li><Link href="/articles" className="hover:underline">教程</Link></li>
              <li><Link href="/road" className="hover:underline">考试路径</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">合规</h4>
            <ul className="mt-2 space-y-1 text-sm opacity-80">
              <li><Link href="/disclaimer" className="hover:underline">免责声明</Link></li>
              <li><Link href="/privacy" className="hover:underline">隐私政策</Link></li>
              <li><Link href="/terms" className="hover:underline">服务条款</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-cream/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Dream Lab. 信息整理，仅供学习，不构成投资建议。
        </div>
      </div>
    </footer>
  );
}
