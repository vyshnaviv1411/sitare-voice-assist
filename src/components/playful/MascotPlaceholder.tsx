import React from 'react'

export default function MascotPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-28 h-28 rounded-2xl bg-white/60 flex items-center justify-center shadow-soft ${className}`}>
      {/* Simple mascot SVG placeholder */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="56" height="40" rx="10" fill="#fff" opacity="0.9" />
        <circle cx="24" cy="30" r="6" fill="#6EE7B7" />
        <circle cx="40" cy="30" r="6" fill="#60A5FA" />
        <path d="M20 44c4-6 20-6 24 0" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
