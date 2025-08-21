import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  const commands: VoiceCommand[] = [
    { command: 'go home', action: () => navigate('/'), description: 'Navigate to home page' },
    { command: 'open jobs', action: () => navigate('/jobs'), description: 'Open job search' },
    { command: 'open learning', action: () => navigate('/learning'), description: 'Open education center' },
    { command: 'open support', action: () => navigate('/support'), description: 'Open support services' },
    { command: 'open community', action: () => navigate('/community'), description: 'Open community hub' },
    { command: 'login', action: () => navigate('/login'), description: 'Go to login page' },
    { command: 'book appointment', action: () => navigate('/support'), description: 'Book appointment' },
    { command: 'search jobs', action: () => navigate('/jobs'), description: 'Search for jobs' },
    { command: 'start learning', action: () => navigate('/learning'), description: 'Start learning' },
    { command: 'join chat', action: () => navigate('/community'), description: 'Join community chat' },
    { command: 'emergency help', action: () => triggerEmergency(), description: 'Emergency assistance' },
    { command: 'read page', action: () => readCurrentPage(), description: 'Read current page content' },
    { command: 'stop reading', action: () => stopReading(), description: 'Stop text-to-speech' },
  ];

  const triggerEmergency = () => {
    toast({
      title: "🚨 Emergency Alert",
      description: "Emergency services contacted. Help is on the way.",
      variant: "destructive",
    });
    // In real app: contact emergency services
  };

  const readCurrentPage = () => {
    const pageContent = document.body.innerText;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(pageContent);
      utterance.rate = 0.8;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
      toast({
        title: "🔊 Reading Page",
        description: "Page content is being read aloud.",
      });
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      toast({
        title: "⏹️ Stopped Reading",
        description: "Text-to-speech has been stopped.",
      });
    }
  };

  const processCommand = (transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    for (const cmd of commands) {
      if (normalizedTranscript.includes(cmd.command)) {
        cmd.action();
        toast({
          title: "✅ Voice Command Executed",
          description: cmd.description,
        });
        return;
      }
    }
    
    toast({
      title: "❓ Command Not Recognized",
      description: `"${transcript}" - Try saying: ${commands.slice(0, 3).map(c => c.command).join(', ')}`,
    });
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        if (event.results[event.results.length - 1].isFinal) {
          processCommand(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [navigate]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "🎤 Voice Commands Active",
          description: "Listening for voice commands...",
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "🔇 Voice Commands Off",
        description: "Voice recognition stopped.",
      });
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    speak,
    commands: commands.map(cmd => ({ command: cmd.command, description: cmd.description }))
  };
};