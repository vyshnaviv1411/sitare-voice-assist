import { useState } from 'react';
import { Search, Briefcase, FileText, Video, Filter, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { toast } from '@/hooks/use-toast';

const JobBridge = () => {
  const { speak } = useVoiceCommands();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    skills: ''
  });

  const jobs = [
    {
      id: 1,
      title: "Accessibility Consultant",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$65,000 - $85,000",
      type: "Full-time",
      posted: "2 days ago",
      description: "Help organizations improve digital accessibility and WCAG compliance.",
      requirements: ["WCAG knowledge", "Screen reader testing", "Accessibility auditing"],
      accessibility: ["Visual impairments welcome", "Flexible work arrangements", "Screen reader optimized tools"]
    },
    {
      id: 2,
      title: "UX Designer (Inclusive Design)",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$70,000 - $90,000",
      type: "Full-time",
      posted: "5 days ago",
      description: "Create inclusive user experiences for diverse abilities and needs.",
      requirements: ["Design experience", "Accessibility knowledge", "User empathy"],
      accessibility: ["Hearing impairments welcome", "Sign language interpreter available", "Visual design tools"]
    },
    {
      id: 3,
      title: "Customer Support Specialist",
      company: "HelpDesk Solutions",
      location: "Chicago, IL",
      salary: "$45,000 - $55,000",
      type: "Full-time",
      posted: "1 week ago",
      description: "Provide exceptional customer support via multiple communication channels.",
      requirements: ["Communication skills", "Problem solving", "Multi-channel support"],
      accessibility: ["Physical disabilities welcome", "Ergonomic workstation", "Flexible scheduling"]
    }
  ];

  const interviewQuestions = [
    "Tell me about yourself and your experience with accessibility.",
    "How would you handle a challenging customer service situation?",
    "What assistive technologies are you familiar with?",
    "Describe a time you overcame a workplace challenge."
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const searchJobs = () => {
    toast({
      title: "🔍 Searching Jobs",
      description: `Found ${jobs.length} matching positions`,
    });
    speak(`Found ${jobs.length} job matches for ${searchQuery}`);
  };

  const applyToJob = (job: any) => {
    toast({
      title: "✅ Application Submitted",
      description: `Your application for ${job.title} has been submitted`,
    });
    speak(`Application submitted for ${job.title} at ${job.company}`);
  };

  const updateResumeField = (field: string, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = () => {
    toast({
      title: "📄 Resume Generated",
      description: "Your accessible resume has been created successfully",
    });
    speak("Resume generated successfully with accessibility features");
  };

  const startInterview = () => {
    setIsRecording(true);
    toast({
      title: "🎤 Interview Started",
      description: "Practice interview session beginning...",
    });
    speak(`Interview question: ${interviewQuestions[currentQuestion]}`);
  };

  const stopInterview = () => {
    setIsRecording(false);
    toast({
      title: "⏹️ Interview Ended",
      description: "Great practice session! Review your responses.",
    });
    speak("Interview practice session completed");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          JobBridge
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Accessible employment platform - find inclusive jobs, build resumes, and practice interviews
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Job Search</span>
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Resume Builder</span>
          </TabsTrigger>
          <TabsTrigger value="interview" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Interview Prep</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>My Applications</span>
          </TabsTrigger>
        </TabsList>

        {/* Job Search */}
        <TabsContent value="search" className="space-y-6">
          {/* Search Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search for accessible jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg"
                    aria-label="Job search input"
                  />
                </div>
                <Button onClick={searchJobs} size="lg">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Positions</h2>
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${selectedJob?.id === job.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedJob(job)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Job listing: ${job.title} at ${job.company}`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.posted}
                        </span>
                      </div>

                      <p className="text-sm">{job.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {job.accessibility.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Job Details */}
            <div>
              {selectedJob ? (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>{selectedJob.title}</CardTitle>
                    <p className="text-muted-foreground">{selectedJob.company}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Posted {selectedJob.posted}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {selectedJob.requirements.map((req: string, index: number) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Accessibility Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedJob.accessibility.map((feature: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => applyToJob(selectedJob)} 
                      className="w-full"
                      size="lg"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Select a job to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Resume Builder */}
        <TabsContent value="resume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Accessible Resume Builder</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={resumeData.name}
                      onChange={(e) => updateResumeField('name', e.target.value)}
                      placeholder="Enter your full name"
                      aria-label="Full name input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => updateResumeField('email', e.target.value)}
                      placeholder="your.email@example.com"
                      aria-label="Email input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={resumeData.phone}
                      onChange={(e) => updateResumeField('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      aria-label="Phone number input"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Summary</label>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => updateResumeField('summary', e.target.value)}
                      placeholder="Brief summary of your professional background and goals..."
                      className="min-h-24"
                      aria-label="Professional summary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Work Experience</label>
                    <Textarea
                      value={resumeData.experience}
                      onChange={(e) => updateResumeField('experience', e.target.value)}
                      placeholder="List your work experience, including job titles, companies, and achievements..."
                      className="min-h-32"
                      aria-label="Work experience"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills</label>
                    <Textarea
                      value={resumeData.skills}
                      onChange={(e) => updateResumeField('skills', e.target.value)}
                      placeholder="List your relevant skills, separated by commas..."
                      className="min-h-20"
                      aria-label="Skills"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={generateResume} size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Resume
                </Button>
                <Button variant="outline" size="lg">
                  Preview Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interview Prep */}
        <TabsContent value="interview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Interview Practice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-muted rounded-lg p-8">
                  <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Practice Interview Session</h3>
                  <p className="text-muted-foreground mb-4">
                    {isRecording ? 'Recording your response...' : 'Ready to start your practice interview?'}
                  </p>
                  
                  {!isRecording ? (
                    <Button onClick={startInterview} size="lg">
                      Start Practice Interview
                    </Button>
                  ) : (
                    <Button onClick={stopInterview} variant="destructive" size="lg">
                      Stop Recording
                    </Button>
                  )}
                </div>

                {interviewQuestions.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            Question {currentQuestion + 1} of {interviewQuestions.length}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => speak(interviewQuestions[currentQuestion])}
                          >
                            Read Question
                          </Button>
                        </div>
                        
                        <div className="text-center">
                          <h4 className="text-lg font-medium mb-4">
                            {interviewQuestions[currentQuestion]}
                          </h4>
                          
                          <div className="flex justify-center space-x-4">
                            <Button 
                              variant="outline"
                              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                              disabled={currentQuestion === 0}
                            >
                              Previous
                            </Button>
                            <Button 
                              onClick={() => setCurrentQuestion(Math.min(interviewQuestions.length - 1, currentQuestion + 1))}
                              disabled={currentQuestion === interviewQuestions.length - 1}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Applications */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>My Applications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No applications yet</p>
                <p className="text-sm text-muted-foreground">
                  Your job applications will appear here once you start applying
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobBridge;