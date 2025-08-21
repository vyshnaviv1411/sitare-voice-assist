import { useMemo, useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import AnimatedButton from "@/components/AnimatedButton"
import VoiceVisualizer from "@/components/VoiceVisualizer"

export default function VoicePanel() {
  const [listening, setListening] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState<string[]>([])

  // Simulate streaming progress (replace this with your real stream events)
  useMemo(() => {
    if (!isStreaming) return
    setProgress(0)
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 8, 100)
        if (next === 100) {
          clearInterval(id)
          setIsStreaming(false)
        }
        return next
      })
    }, 120)
    return () => clearInterval(id)
  }, [isStreaming])

  function onStart() {
    setListening(true)
    setIsStreaming(true)
    // hook up to your mic + STT logic
  }

  function onStop() {
    setListening(false)
    // stop mic/STT; optionally finalize transcript
  }

  function onClear() {
    setLines([])
    setProgress(0)
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="font-display text-lg">Voice Assistant</h2>

        {/* mic status dot */}
        <span
          className={`inline-flex h-2.5 w-2.5 rounded-full ${listening ? "bg-brand-500 animate-pulse" : "bg-muted-foreground/30"}`}
          aria-label={listening ? "Microphone active" : "Microphone inactive"}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <VoiceVisualizer amplitude={listening ? 0.7 : 0.2} />

        {/* transcript area */}
        <div
          className="max-h-52 overflow-auto rounded-xl bg-white/60 p-3 text-sm leading-6"
          role="log"
          aria-live="polite"
        >
          {isStreaming && lines.length === 0 ? (
            <div className="animate-pulse">
              <div className="h-3 w-3/4 rounded bg-black/10 mb-2" />
              <div className="h-3 w-1/2 rounded bg-black/10" />
            </div>
          ) : lines.length === 0 ? (
            <p className="text-muted-foreground">No transcript yet — try speaking to the assistant.</p>
          ) : (
            lines.map((l, i) => <p key={i}>{l}</p>)
          )}
        </div>

        {/* streaming progress */}
        {isStreaming && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">Transcribing… {progress}%</p>
          </div>
        )}

        {/* controls with tooltips */}
        <TooltipProvider delayDuration={150}>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <AnimatedButton
                    aria-label="Start listening"
                    onClick={onStart}
                    disabled={listening}
                  >
                    🎤 Start
                  </AnimatedButton>
                </span>
              </TooltipTrigger>
              <TooltipContent>Begin listening via your microphone</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <AnimatedButton
                    aria-label="Stop listening"
                    onClick={onStop}
                    disabled={!listening}
                  >
                    ⏹ Stop
                  </AnimatedButton>
                </span>
              </TooltipTrigger>
              <TooltipContent>Stop the microphone and transcription</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <AnimatedButton aria-label="Clear transcript" onClick={onClear}>
                    🧹 Clear
                  </AnimatedButton>
                </span>
              </TooltipTrigger>
              <TooltipContent>Remove the current transcript</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
