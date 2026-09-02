import { ReactNode } from "react";

export function InfoCard({
  icon,
  title,
  children,
  color = "bg-sky",
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="cartoon-card flex h-full flex-col gap-3 bg-white p-6 transition-transform hover:-translate-y-1">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} text-white shadow-[0_3px_0_#5D4037]`}
      >
        {icon}
      </div>
      <h3 className="font-heading text-xl text-chocolate">{title}</h3>
      <div className="flex-1 text-sm leading-relaxed text-chocolate/80">{children}</div>
    </div>
  );
}
