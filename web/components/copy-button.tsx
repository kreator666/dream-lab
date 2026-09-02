"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <Button
      size="sm"
      className="cartoon-btn bg-sky text-white"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="mr-1 h-3 w-3" />
      ) : (
        <Copy className="mr-1 h-3 w-3" />
      )}
      {copied ? "已复制" : "复制"}
    </Button>
  );
}
