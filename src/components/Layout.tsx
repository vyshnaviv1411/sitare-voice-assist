import { Navigation } from './Navigation';
import { MotionDiv } from './ui/animated';
import VoiceAssistant from './VoiceAssistant';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  // Toggle rendering of the global voice assistant via env (disabled by default)
  const showVoiceAssistant = import.meta.env.VITE_SHOW_VOICE_ASSISTANT === 'true';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen"
        role="main"
        tabIndex={-1}
      >
        <AnimatePresence mode="wait">
          <MotionDiv key={location.pathname} className="min-h-screen">
            {children}
          </MotionDiv>
        </AnimatePresence>
      </main>

  {/* Global voice assistant (hidden by default) */}
  {showVoiceAssistant && <VoiceAssistant />}

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50 py-8" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Sitare</h3>
              <p className="text-muted-foreground text-accessibility-base">
                Empowering individuals with disabilities through accessible technology and community support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility</h3>
              <ul className="space-y-2 text-muted-foreground text-accessibility-base">
                <li>• WCAG 2.1 AA Compliant</li>
                <li>• Screen reader optimized</li>
                <li>• Voice command enabled</li>
                <li>• Keyboard navigation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground text-accessibility-base">
                <li>• 24/7 Emergency help</li>
                <li>• Multilingual support</li>
                <li>• Technical assistance</li>
                <li>• Community forums</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-muted-foreground text-accessibility-base">
              © 2024 Sitare. Designed with accessibility and inclusion at heart.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};