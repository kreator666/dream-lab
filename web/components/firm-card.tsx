import Link from "next/link";
import { Star } from "lucide-react";

export type FirmCardProps = {
  slug: string;
  name: string;
  logo?: string | null;
  dataPlatform?: string | null;
  pricingNote?: string | null;
  difficulty: number;
  summary: string;
  discountCode?: string | null;
};

export function FirmCard({
  slug,
  name,
  dataPlatform,
  pricingNote,
  difficulty,
  summary,
  discountCode,
}: FirmCardProps) {
  return (
    <Link
      href={`/firms/${slug}`}
      className="cartoon-card flex flex-col gap-3 bg-white p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-chocolate bg-cream font-heading text-lg font-bold text-chocolate">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-heading text-lg text-chocolate">{name}</h3>
            <p className="text-xs text-chocolate/60">{dataPlatform || "未知数据商"}</p>
          </div>
        </div>
        {discountCode && (
          <span className="rounded-full border-2 border-chocolate bg-lemon px-2 py-0.5 text-xs font-bold text-chocolate shadow-[0_2px_0_#5D4037]">
            {discountCode}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < difficulty ? "fill-peach text-peach" : "text-chocolate/20"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-chocolate/60">难度 {difficulty}/5</span>
      </div>

      <p className="line-clamp-2 text-sm text-chocolate/80">{summary}</p>

      {pricingNote && (
        <p className="text-xs text-chocolate/60">价格：{pricingNote}</p>
      )}
    </Link>
  );
}
