import { ReactNode } from "react";

export function StepCard({
  step,
  title,
  description,
  tip,
  action,
}: {
  step: number;
  title: string;
  description: string;
  tip?: string;
  action?: ReactNode;
}) {
  return (
    <div className="relative pl-12 md:pl-16">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-chocolate bg-grass font-heading text-lg text-white shadow-[0_2px_0_#5D4037] md:h-12 md:w-12 md:text-xl">
        {step}
      </div>
      <div className="cartoon-card bg-white p-5 md:p-6">
        <h3 className="font-heading text-xl text-chocolate">{title}</h3>
        <p className="mt-2 text-chocolate/80">{description}</p>
        {tip && (
          <p className="mt-3 rounded-xl border-2 border-lemon bg-lemon/10 px-3 py-2 text-sm text-chocolate/80">
            <strong>💡 小贴士：</strong>
            {tip}
          </p>
        )}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
