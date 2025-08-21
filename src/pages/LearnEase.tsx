import { useState, useRef } from 'react';
import { Play, Pause, Volume2, Subtitles, BookOpen, Brain, Mic, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { toast } from '@/hooks/use-toast';

const LearnEase = () => {
  const { speak } = useVoiceCommands();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dummy mapping for notes and audio per video title
  const dummyNotes: Record<string, { notes: string; audio?: string }> = {
    "Introduction to Accessibility": {
      notes:
        "This video covered the fundamentals of accessibility, including screen readers, captions, and design best practices.",
      audio: "/dummy-audio.mp3",
    },
    "Using Screen Readers": {
      notes:
        "This video explained how screen readers work, their key shortcuts, and how to optimize apps for them.",
      audio: "/dummy-audio.mp3",
    },
    // fallback for other videos can be omitted or added
  };

  const videos = [
    {
      id: 1,
      title: "Introduction to Accessibility",
      duration: "12:34",
      description: "Learn about web accessibility standards and WCAG guidelines",
      thumbnail: "/placeholder.svg",
      captions: true,
      signLanguage: true
    },
    {
      id: 2,
      title: "Using Screen Readers",
      duration: "18:22",
      description: "Complete guide to navigating with NVDA and JAWS",
      thumbnail: "/placeholder.svg",
      captions: true,
      signLanguage: false
    },
    {
      id: 3,
      title: "Keyboard Navigation",
      duration: "9:45",
      description: "Master keyboard shortcuts for efficient web browsing",
      thumbnail: "/placeholder.svg",
      captions: true,
      signLanguage: true
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What does WCAG stand for?",
      options: [
        "Web Content Accessibility Guidelines",
        "World Computer Access Group",
        "Website Code Access Guide",
        "Web Communication Assistance Guidelines"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Which keyboard key is used to navigate to the next interactive element?",
      options: ["Enter", "Space", "Tab", "Arrow Keys"],
      correct: 2
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const playVideo = (video: any) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    speak(`Now playing: ${video.title}`);
    toast({
      title: "🎥 Video Playing",
      description: `${video.title} - ${video.duration}`,
    });
    // Populate dummy notes + audio when selecting a video
    const mapping = dummyNotes[video.title];
    if (mapping) {
      setNotes(mapping.notes);
      setSummaryText(mapping.notes);
      setAudioSrc(mapping.audio ?? null);
    } else {
      setAudioSrc(null);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  };

  const summarizeVideo = () => {
    if (!currentVideo) return;
    
    const summary = `This video covers the fundamentals of ${currentVideo.title.toLowerCase()}. Key points include practical applications, best practices, and real-world examples. Duration: ${currentVideo.duration}.`;
    
    speak(summary);
    toast({
      title: "🧠 AI Summary",
      description: "Video summary generated and read aloud",
    });
  };

  // Handler when a video ends: auto-fill smart notes and generate audio summary
  const handleVideoEnded = () => {
    const autoSummary = "This video explained the basics of accessibility, including screen readers, captions, and inclusive design principles.";
    setNotes((prev) => (prev ? prev + '\n' + autoSummary : autoSummary));
    setSummaryText(autoSummary);

    // Speak the summary using Web Speech API
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(autoSummary);
        // optional: set voice/lang
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      // ignore TTS errors
    }
    toast({ title: '📝 Notes Generated', description: 'Smart notes auto-filled after video ended' });
  };

  const playSummaryAudio = () => {
    if (!summaryText) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(summaryText);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      // ignore
    }
  };

  const startVoiceNotes = () => {
    setIsListening(true);
    toast({
      title: "🎤 Voice Notes Active",
      description: "Speak your notes, I'm listening...",
    });
    
    // Simulate voice to text
    setTimeout(() => {
      const voiceNote = "This is a voice note about accessibility features...";
      setNotes(notes + '\n' + voiceNote);
      setIsListening(false);
      toast({
        title: "✅ Voice Note Added",
        description: "Your note has been transcribed",
      });
    }, 3000);
  };

  const answerQuiz = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const question = quizQuestions[currentQuiz];
    const isCorrect = answerIndex === question.correct;
    
    toast({
      title: isCorrect ? "✅ Correct!" : "❌ Incorrect",
      description: isCorrect ? "Great job!" : `Correct answer: ${question.options[question.correct]}`,
      variant: isCorrect ? "default" : "destructive"
    });
    
    speak(isCorrect ? "Correct answer!" : `Incorrect. The right answer is ${question.options[question.correct]}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          LearnEase
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Accessible education platform with videos, notes, and interactive learning
        </p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Smart Notes</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Quizzes</span>
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Library</span>
          </TabsTrigger>
        </TabsList>

        {/* Video Player */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {currentVideo ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          className="w-full h-full"
                          poster={currentVideo.thumbnail}
                          controls
                          aria-label={`Video: ${currentVideo.title}`}
                          onEnded={handleVideoEnded}
                        >
                          <track kind="captions" src="/captions.vtt" srcLang="en" label="English" />
                        </video>
                        
                        {/* Sign Language Overlay */}
                        {currentVideo.signLanguage && (
                          <div className="absolute bottom-4 right-4 w-32 h-24 bg-black/80 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">Sign Language</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Video Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button onClick={togglePlayPause} size="sm">
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Audio
                          </Button>
                          <Button variant="outline" size="sm">
                            <Subtitles className="h-4 w-4 mr-2" />
                            Captions
                          </Button>
                        </div>
                        <Button onClick={summarizeVideo} variant="outline" size="sm">
                          <Brain className="h-4 w-4 mr-2" />
                          AI Summary
                        </Button>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                        <p className="text-muted-foreground mb-4">{currentVideo.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Duration: {currentVideo.duration}</Badge>
                          {currentVideo.captions && <Badge variant="outline">Captions</Badge>}
                          {currentVideo.signLanguage && <Badge variant="outline">Sign Language</Badge>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Select a video to start learning</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Video List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Learning Videos</h3>
              {videos.map((video) => (
                <Card 
                  key={video.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${currentVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => playVideo(video)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${video.title}, duration ${video.duration}`}
                >
                  <CardContent className="p-4">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{video.duration}</p>
                    <div className="flex space-x-1">
                      {video.captions && <Badge variant="secondary" className="text-xs">CC</Badge>}
                      {video.signLanguage && <Badge variant="secondary" className="text-xs">SL</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Smart Notes */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Smart Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={startVoiceNotes}
                  disabled={isListening}
                  className="flex items-center space-x-2"
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                  <span>{isListening ? 'Listening...' : 'Voice Note'}</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <label htmlFor="font-size" className="text-sm">Font Size:</label>
                  <select id="font-size" className="px-2 py-1 border rounded text-sm">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
              </div>
              
              <Textarea
                placeholder="Start typing your notes or use voice input..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-64 text-lg leading-relaxed"
                aria-label="Notes text area"
              />
              <div className="mt-4">
                {audioSrc ? (
                  <audio controls src={audioSrc} className="w-full rounded-md shadow-sm" />
                ) : (
                  <div className="w-full rounded-md shadow-sm border p-4 text-center text-muted-foreground">
                    Audio summary will appear here
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {notes.length} characters
                </span>
                <Button variant="outline">Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Quizzes */}
        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Interactive Quiz</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Question {currentQuiz + 1} of {quizQuestions.length}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => speak(quizQuestions[currentQuiz].question)}
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Read Question
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {quizQuestions[currentQuiz].question}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? 
                            (index === quizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                            "outline"
                          }
                          className="justify-start text-left h-auto p-4"
                          onClick={() => answerQuiz(index)}
                          aria-label={`Option ${index + 1}: ${option}`}
                        >
                          <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentQuiz(Math.max(0, currentQuiz - 1))}
                      disabled={currentQuiz === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentQuiz(Math.min(quizQuestions.length - 1, currentQuiz + 1))}
                      disabled={currentQuiz === quizQuestions.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Library */}
        <TabsContent value="library" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete guide to web accessibility principles and practices.
                </p>
                <Badge variant="secondary">12 lessons</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assistive Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn to use screen readers, magnifiers, and other tools.
                </p>
                <Badge variant="secondary">8 lessons</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Digital Inclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Understanding inclusive design and universal accessibility.
                </p>
                <Badge variant="secondary">15 lessons</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnEase;