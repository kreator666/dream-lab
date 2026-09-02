import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prop Firm 冒险岛 | 中文 Prop Firm 导航社区",
  description:
    "中文期货 Prop Firm 导航站：规则汇总、注册教程、出金指南、折扣码与社区。种田养老，稳健通关。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-chocolate">
        {children}
      </body>
    </html>
  );
}
