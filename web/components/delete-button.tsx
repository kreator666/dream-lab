"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("确定删除？")) e.preventDefault();
        }}
        className="rounded-full bg-peach/10 p-2 text-peach hover:bg-peach/20"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
