import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Heart, Shield, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

export const AccessPoint = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ Login Successful",
      description: "Welcome back to Sitare! Redirecting to your personalized dashboard.",
    });
    // In real app: handle authentication
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "❌ Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "🎉 Account Created",
      description: "Welcome to Sitare! Let's set up your accessibility preferences.",
    });
    // In real app: handle registration
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `🔗 ${provider} Login`,
      description: `Connecting with ${provider}...`,
    });
    // In real app: handle OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elevated">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to Sitare</h1>
          <p className="text-muted-foreground text-accessibility-base">
            Your accessible platform for support, learning, and community
          </p>
        </div>

        {/* Login/Signup Tabs */}
        <Card className="card-elevated">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your personalized experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="pl-10 touch-target"
                        required
                        aria-describedby="email-help"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your secure password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="pl-10 pr-12 touch-target"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1 touch-target"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="btn-hero w-full touch-target">
                    Sign In Securely
                  </Button>
                </form>
                
                {/* Forgot Password */}
                <div className="mt-4 text-center">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join our inclusive community of support and empowerment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        className="pl-10 touch-target"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        className="pl-10 touch-target"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        className="touch-target"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                        Confirm Password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        className="touch-target"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="btn-hero w-full touch-target">
                    Create My Account
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Social Login Options */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-center text-lg">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => handleSocialLogin('Google')}
              variant="outline"
              className="w-full touch-target"
            >
              Continue with Google
            </Button>
            <Button
              onClick={() => handleSocialLogin('Microsoft')}
              variant="outline"
              className="w-full touch-target"
            >
              Continue with Microsoft
            </Button>
            <Button
              onClick={() => handleSocialLogin('Apple')}
              variant="outline"
              className="w-full touch-target"
            >
              Continue with Apple
            </Button>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card className="card-elevated bg-gradient-success">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 text-success-foreground">
              <Accessibility className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Fully Accessible Platform</h3>
                <p className="text-sm opacity-90">WCAG 2.1 compliant with voice commands, screen reader support, and adaptive interfaces</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Access */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Want to explore first?
          </p>
          <Link to="/" className="text-primary hover:text-primary/80 underline font-medium">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};