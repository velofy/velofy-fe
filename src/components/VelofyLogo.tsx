import React from "react";

export const VelofyLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="32" height="32" rx="8" stroke="url(#g)" strokeWidth="2" fill="none" />
    <path d="M9 24L16 12L19.5 18L27 12" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
