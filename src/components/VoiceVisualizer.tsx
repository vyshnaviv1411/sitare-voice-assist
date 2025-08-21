import { useEffect, useRef } from "react"

type Props = { amplitude?: number } // optional mic amplitude (0..1)

export default function VoiceVisualizer({ amplitude = 0.4 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    const draw = (t: number) => {
      const w = (canvas.width = canvas.clientWidth * devicePixelRatio)
      const h = (canvas.height = canvas.clientHeight * devicePixelRatio)
      ctx.clearRect(0, 0, w, h)
      const bars = 24
      const barW = w / (bars * 1.5)
      for (let i = 0; i < bars; i++) {
        const phase = (i / bars) * Math.PI * 2 + t * 0.002
        const a = (Math.sin(phase) * 0.5 + 0.5) * amplitude
        const barH = h * 0.35 * (0.2 + a)
        const x = i * barW * 1.5 + (w - bars * barW * 1.5) / 2
        ctx.fillStyle = "rgba(27,139,255,0.85)"
        ctx.fillRect(x, h / 2 - barH / 2, barW, barH)
        ctx.fillStyle = "rgba(27,139,255,0.25)"
        ctx.fillRect(x, h / 2 - barH / 2 - 6, barW, 6)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [amplitude])

  return <canvas ref={ref} className="h-24 w-full rounded-2xl bg-black/5" />
}
