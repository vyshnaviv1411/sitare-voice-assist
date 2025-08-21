import { PropsWithChildren } from "react"

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_100%_-10%,_rgba(27,139,255,.18),_transparent_60%),radial-gradient(1000px_500px_at_-10%_0%,_rgba(27,139,255,.12),_transparent_60%)]">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="font-display text-xl md:text-2xl">Sitare Voice Assist</h1>
          <div className="text-sm opacity-70">beta</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  )
}
