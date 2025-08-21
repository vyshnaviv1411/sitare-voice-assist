import React, { useEffect } from 'react';
import { MotionButton } from './ui/animated';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { Mic, MicOff, Info } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const { isListening, isSupported, startListening, stopListening, commands } = useVoiceCommands();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Toggle listening with Ctrl+Shift+V
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        if (isListening) stopListening(); else startListening();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isListening, startListening, stopListening]);

  return (
    <div aria-hidden="false" className="fixed right-4 bottom-6 z-50">
      <div className="flex flex-col items-end gap-2">
        <div className="bg-background/80 backdrop-blur rounded-xl p-2 shadow-lg border border-border/40">
          <div className="flex items-center gap-3">
            <MotionButton
              onClick={() => (isListening ? stopListening() : startListening()) as any}
              pulse={!isListening}
              className={`rounded-full p-3 ${isListening ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}
              aria-pressed={isListening}
              aria-label={isListening ? 'Stop voice assistant' : 'Start voice assistant'}
            >
              {isListening ? <Mic className="w-5 h-5" aria-hidden /> : <MicOff className="w-5 h-5" aria-hidden />}
            </MotionButton>
            <div className="text-right">
              <div className="text-sm font-semibold">Voice Assistant</div>
              <div className="text-xs text-muted-foreground">{isSupported ? (isListening ? 'Listening...' : 'Click to speak or press Ctrl+Shift+V') : 'Voice not supported'}</div>
            </div>
          </div>
        </div>

        <div className="bg-background/90 rounded-md p-2 text-right text-xs text-muted-foreground shadow-sm border border-border/30 max-w-xs">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5" />
            <div>
              <div className="font-semibold">Try commands</div>
              <div className="mt-1">{commands.slice(0, 5).map(c => c.command).join(' • ')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
