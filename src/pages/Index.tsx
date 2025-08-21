import { Link } from 'react-router-dom';
import { 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Accessibility,
  Shield,
  Mic,
  Volume2,
  Eye,
  Ear,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';

const featuredServices = [
  {
    icon: Heart,
    title: 'SupportSphere',
    description: 'Comprehensive support services including mobility aid marketplace, emergency assistance, and professional care booking.',
    link: '/support',
    color: 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-200',
    badge: 'Essential Services'
  },
  {
    icon: GraduationCap,
    title: 'LearnEase',
    description: 'Accessible education platform with AI-powered summaries, voice-to-text notes, and adaptive learning materials.',
    link: '/learning',
    color: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-200',
    badge: 'Educational Hub'
  },
  {
    icon: Briefcase,
    title: 'JobBridge',
    description: 'Employment opportunities specifically designed for individuals with disabilities, with accessible interview prep and resume tools.',
    link: '/jobs',
    color: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-200',
    badge: 'Career Growth'
  },
  {
    icon: Users,
    title: 'ConnectZone',
    description: 'Inclusive community platform with accessible chat, forums, and peer support groups for meaningful connections.',
    link: '/community',
    color: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-200',
    badge: 'Community'
  }
];

const accessibilityFeatures = [
  { icon: Mic, title: 'Voice Commands', description: 'Navigate and control everything with voice' },
  { icon: Volume2, title: 'Text-to-Speech', description: 'All content read aloud with natural voices' },
  { icon: Eye, title: 'Screen Reader Ready', description: 'Full compatibility with assistive technology' },
  { icon: Accessibility, title: 'WCAG Compliant', description: 'Meets highest accessibility standards' },
  { icon: MessageCircle, title: 'Sign Language Support', description: 'Visual communication assistance' },
  { icon: Ear, title: 'Audio Descriptions', description: 'Rich audio context for all visual elements' }
];

const stats = [
  { number: '50,000+', label: 'Active Users' },
  { number: '24/7', label: 'Support Available' },
  { number: '15+', label: 'Languages Supported' },
  { number: '99.9%', label: 'Uptime Reliability' }
];

export default function Index() {
  const { speak } = useVoiceCommands();

  const handleGetStarted = () => {
    speak("Welcome to Sitare! Let's create your accessible account.");
  };

  const handleLearnMore = () => {
    speak("Learning more about Sitare's accessibility features.");
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-warm py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-gentle-bounce"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in space-y-8">
            
            {/* Main Heading */}
            <div className="space-y-4">
              <Badge variant="secondary" className="text-accessibility-base px-4 py-2">
                <Accessibility className="w-4 h-4 mr-2" />
                WCAG 2.1 AA Compliant Platform
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Empowering Lives Through
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Accessible Technology
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-accessibility-lg">
                Sitare connects individuals with disabilities to comprehensive support services, 
                educational resources, employment opportunities, and an inclusive community - 
                all through our fully accessible platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" onClick={handleGetStarted}>
                <Button className="btn-hero text-lg px-8 py-4 touch-target">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="text-lg px-8 py-4 touch-target"
                onClick={handleLearnMore}
              >
                <Volume2 className="mr-2 w-5 h-5" />
                Learn More (Audio)
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-muted-foreground text-accessibility-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Accessibility Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-accessibility-lg">
              Everything you need to thrive, designed with accessibility at the forefront
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredServices.map((service, index) => (
              <Card 
                key={index} 
                className={`card-interactive ${service.color} animate-fade-in hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <service.icon className="w-12 h-12 text-primary" />
                    <Badge variant="secondary">{service.badge}</Badge>
                  </div>
                  <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-accessibility-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                  <Link to={service.link}>
                    <Button 
                      variant="outline" 
                      className="w-full touch-target hover:bg-primary hover:text-primary-foreground"
                    >
                      Explore {service.title}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Everyone, Accessible by Design
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-accessibility-lg">
              Our platform incorporates cutting-edge accessibility features to ensure an inclusive experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="card-elevated text-center p-6 hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-accessibility-base">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency & Support */}
      <section className="py-20 px-4 bg-gradient-success">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <Shield className="w-16 h-16 text-success-foreground mx-auto animate-gentle-bounce" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-success-foreground">
              Your Safety is Our Priority
            </h2>
            
            <p className="text-xl text-success-foreground/90 text-accessibility-lg">
              24/7 emergency support, guardian notifications, and professional healthcare 
              connections ensure you're never alone in challenging situations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-success hover:bg-white/90 font-semibold px-8 py-4 touch-target"
              >
                <Phone className="mr-2 w-5 h-5" />
                Emergency Help
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-success-foreground hover:bg-white/10 px-8 py-4 touch-target"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Stories, Real Impact
            </h2>
            <p className="text-xl text-muted-foreground text-accessibility-lg">
              Hear from our community members about their experience with Sitare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                role: "Teacher with Visual Impairment",
                content: "Sitare's voice commands and screen reader compatibility have revolutionized how I access educational resources.",
                rating: 5
              },
              {
                name: "David Chen",
                role: "Software Developer",
                content: "The job platform helped me find inclusive employers who value accessibility. I landed my dream job through Sitare!",
                rating: 5
              },
              {
                name: "Sarah Williams",
                role: "Mobility Aid User",
                content: "The emergency features give me confidence to live independently. The community support is incredible.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="card-elevated p-6 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-accessibility-base italic">
                    "{testimonial.content}"
                  </p>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Join Our Inclusive Community?
            </h2>
            
            <p className="text-xl text-primary-foreground/90 text-accessibility-lg">
              Start your journey with Sitare today. Create your account and personalize 
              your accessibility settings in minutes.
            </p>
            
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 touch-target text-lg"
              >
                <CheckCircle className="mr-2 w-5 h-5" />
                Create Your Account
              </Button>
            </Link>
            
            <p className="text-primary-foreground/80 text-accessibility-base">
              100% free to join • No credit card required • WCAG 2.1 AA compliant
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}