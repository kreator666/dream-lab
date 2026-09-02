"use client";

import { cn } from "@/lib/utils";

type PandaMascotProps = {
  className?: string;
  variant?: "wave" | "confused" | "coin";
};

export function PandaMascot({ className, variant = "wave" }: PandaMascotProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("inline-block", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="熊猫岛主"
    >
      <circle cx="100" cy="100" r="95" fill="#FFFDF7" stroke="#5D4037" strokeWidth="3" />
      <circle cx="55" cy="55" r="22" fill="#5D4037" />
      <circle cx="145" cy="55" r="22" fill="#5D4037" />
      <ellipse cx="100" cy="145" rx="45" ry="38" fill="#FFFFFF" stroke="#5D4037" strokeWidth="3" />
      <ellipse cx="62" cy="135" rx="14" ry="22" fill="#5D4037" transform="rotate(20 62 135)" />
      <ellipse cx="138" cy="135" rx="14" ry="22" fill="#5D4037" transform="rotate(-20 138 135)" />
      <ellipse cx="80" cy="175" rx="12" ry="16" fill="#5D4037" />
      <ellipse cx="120" cy="175" rx="12" ry="16" fill="#5D4037" />
      <circle cx="100" cy="95" r="50" fill="#FFFFFF" stroke="#5D4037" strokeWidth="3" />
      <ellipse cx="82" cy="90" rx="12" ry="15" fill="#5D4037" transform="rotate(10 82 90)" />
      <ellipse cx="118" cy="90" rx="12" ry="15" fill="#5D4037" transform="rotate(-10 118 90)" />
      <circle cx="84" cy="90" r="4" fill="#FFFFFF" />
      <circle cx="84" cy="90" r="2" fill="#5D4037" />
      <circle cx="116" cy="90" r="4" fill="#FFFFFF" />
      <circle cx="116" cy="90" r="2" fill="#5D4037" />
      <ellipse cx="100" cy="105" rx="6" ry="4" fill="#5D4037" />
      <path d="M94 112 Q100 116 106 112" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
      <circle cx="72" cy="105" r="5" fill="#FF6B6B" opacity="0.4" />
      <circle cx="128" cy="105" r="5" fill="#FF6B6B" opacity="0.4" />
      <ellipse cx="100" cy="52" rx="55" ry="10" fill="#FFE66D" stroke="#5D4037" strokeWidth="2" />
      <path d="M70 52 Q100 20 130 52" fill="#FFE66D" stroke="#5D4037" strokeWidth="2" />
      <path d="M75 48 Q100 38 125 48" fill="none" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <rect x="135" y="115" width="22" height="26" rx="6" fill="#4ECDC4" stroke="#5D4037" strokeWidth="2" />
      <path d="M140 115 L140 108 Q147 105 154 108 L154 115" fill="none" stroke="#5D4037" strokeWidth="2" />
      {variant === "wave" && (
        <>
          <rect x="48" y="125" width="16" height="22" rx="3" fill="#F7F9FC" stroke="#5D4037" strokeWidth="2" transform="rotate(-20 56 136)" />
          <line x1="52" y1="130" x2="60" y2="138" stroke="#4ECDC4" strokeWidth="2" />
        </>
      )}
      {variant === "confused" && (
        <text x="140" y="60" fontSize="24" fill="#5D4037" fontFamily="sans-serif" fontWeight="bold">?</text>
      )}
      {variant === "coin" && (
        <circle cx="150" cy="140" r="10" fill="#FFE66D" stroke="#5D4037" strokeWidth="2" />
      )}
    </svg>
  );
}
