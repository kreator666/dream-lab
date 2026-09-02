import { ReactNode } from "react";
import { Search } from "lucide-react";

export function FilterBar({
  action,
  searchName = "q",
  searchValue,
  placeholder = "搜索...",
  children,
}: {
  action?: string;
  searchName?: string;
  searchValue?: string;
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <form
      method="GET"
      action={action}
      className="cartoon-card flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-chocolate">关键词</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate/40" />
          <input
            type="text"
            name={searchName}
            defaultValue={searchValue}
            placeholder={placeholder}
            className="w-full rounded-2xl border-2 border-chocolate/30 bg-white py-2 pl-9 pr-4 text-chocolate outline-none focus:border-sky"
          />
        </div>
      </div>
      {children}
      <div className="flex gap-2">
        <button type="submit" className="cartoon-btn bg-sky px-5 py-2 text-sm text-white">
          筛选
        </button>
        <a
          href={action || "."}
          className="cartoon-btn border-2 border-chocolate bg-white px-4 py-2 text-sm text-chocolate"
        >
          重置
        </a>
      </div>
    </form>
  );
}
