import { ReactNode } from "react";
import { Cloud } from "lucide-react";

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky/30 to-cream py-16 md:py-24">
      <Cloud className="absolute left-[8%] top-[20%] h-14 w-14 animate-float text-white opacity-70" />
      <Cloud className="absolute right-[12%] top-[15%] h-16 w-16 animate-float-delayed text-white opacity-60" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <h1 className="font-heading text-3xl text-chocolate md:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-chocolate/80">{description}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
