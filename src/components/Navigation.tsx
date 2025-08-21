import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Users, 
  Mic, 
  MicOff, 
  Volume2,
  Menu,
  X,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { toast } from '@/hooks/use-toast';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/', ariaLabel: 'Navigate to homepage' },
  { icon: Heart, label: 'Support', path: '/support', ariaLabel: 'Access support services' },
  { icon: GraduationCap, label: 'Learn', path: '/learning', ariaLabel: 'Access learning resources' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs', ariaLabel: 'Browse job opportunities' },
  { icon: Users, label: 'Community', path: '/community', ariaLabel: 'Join community discussions' },
];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isListening, isSupported, startListening, stopListening, speak } = useVoiceCommands();

  const isActivePath = (path: string) => location.pathname === path;

  const handleEmergency = () => {
    speak("Emergency alert activated. Help is being contacted.");
    toast({
      title: "🚨 Emergency Alert Activated",
      description: "Emergency services have been contacted. Stay calm, help is on the way.",
      variant: "destructive",
    });
    // In real app: trigger actual emergency protocol
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <nav 
      className="bg-gradient-warm border-b border-border/50 shadow-soft sticky top-0 z-50" 
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
              <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sitare</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Accessibility Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`touch-target flex items-center space-x-2 px-4 py-2 rounded-lg text-accessibility-base font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground hover:bg-muted/50'
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActivePath(item.path) ? 'page' : undefined}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Emergency Button */}
            <Button
              onClick={handleEmergency}
              variant="outline"
              size="sm"
              className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 touch-target"
              aria-label="Emergency help - Contact emergency services immediately"
            >
              <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
              <span className="hidden sm:inline">Emergency</span>
            </Button>

            {/* Voice Commands Toggle */}
            {isSupported && (
              <Button
                onClick={handleVoiceToggle}
                variant={isListening ? "default" : "outline"}
                size="sm"
                className="touch-target"
                aria-label={isListening ? 'Stop voice commands' : 'Start voice commands'}
                aria-pressed={isListening}
              >
                {isListening ? (
                  <Mic className="w-4 h-4 mr-1 animate-pulse" aria-hidden="true" />
                ) : (
                  <MicOff className="w-4 h-4 mr-1" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {isListening ? 'Listening...' : 'Voice'}
                </span>
              </Button>
            )}

            {/* Read Page Button */}
            <Button
              onClick={() => {
                const pageContent = document.querySelector('main')?.textContent || 'No content to read';
                speak(pageContent);
              }}
              variant="outline"
              size="sm"
              className="touch-target"
              aria-label="Read current page content aloud"
            >
              <Volume2 className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Read Page</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              size="sm"
              className="md:hidden touch-target"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 border-t border-border/50 animate-fade-in"
            role="menu"
          >
            <div className="grid grid-cols-1 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`touch-target flex items-center space-x-3 px-4 py-3 rounded-lg text-accessibility-base font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                  role="menuitem"
                  aria-label={item.ariaLabel}
                  aria-current={isActivePath(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voice Commands Status */}
      {isListening && (
        <div className="bg-primary/10 border-t border-primary/20 px-4 py-2">
          <p className="text-sm text-primary text-center font-medium">
            🎤 Voice commands active - Say "go home", "open jobs", "emergency help", etc.
          </p>
        </div>
      )}
    </nav>
  );
};