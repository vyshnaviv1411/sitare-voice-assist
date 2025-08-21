import { useState } from 'react';
import { Calendar, ShoppingCart, Phone, MapPin, Clock, Heart, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { toast } from '@/hooks/use-toast';

const SupportSphere = () => {
  const { speak } = useVoiceCommands();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const emergencyContact = () => {
    toast({
      title: "🚨 Emergency Alert",
      description: "Contacting your guardian immediately...",
      variant: "destructive",
    });
    speak("Emergency alert activated. Contacting your guardian now.");
  };

  const products = [
    {
      id: 1,
      name: "Smart Navigation Cane",
      price: 299,
      image: "/placeholder.svg",
      description: "AI-powered cane with obstacle detection and GPS",
      accessibility: ["Blind", "Low Vision"]
    },
    {
      id: 2,
      name: "Ergonomic Wheelchair",
      price: 1299,
      image: "/placeholder.svg",
      description: "Lightweight, customizable wheelchair with smart controls",
      accessibility: ["Mobility"]
    },
    {
      id: 3,
      name: "Hearing Aid System",
      price: 899,
      image: "/placeholder.svg",
      description: "Digital hearing aids with noise cancellation",
      accessibility: ["Deaf", "Hard of Hearing"]
    }
  ];

  const appointments = [
    { time: "09:00", service: "Mobility Assessment", available: true },
    { time: "11:00", service: "Vision Therapy", available: true },
    { time: "14:00", service: "Speech Therapy", available: false },
    { time: "16:00", service: "Occupational Therapy", available: true }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    toast({
      title: "✅ Added to Cart",
      description: `${product.name} added successfully`,
    });
    speak(`${product.name} added to cart`);
  };

  const bookAppointment = (appointment: any) => {
    if (!appointment.available) return;
    
    toast({
      title: "📅 Appointment Booked",
      description: `${appointment.service} scheduled for ${appointment.time}`,
    });
    speak(`Appointment booked for ${appointment.service} at ${appointment.time}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          SupportSphere
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive support hub - book services, find mobility aids, and get emergency help
        </p>
      </div>

      {/* Emergency Connect - Always Visible */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Phone className="h-8 w-8 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Emergency Connect</h3>
                <p className="text-muted-foreground">Instant help when you need it most</p>
              </div>
            </div>
            <Button 
              onClick={emergencyContact}
              variant="destructive" 
              size="lg"
              className="font-semibold"
              aria-label="Emergency contact button"
            >
              Emergency Help
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="booking" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="booking" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Booking Hub</span>
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Mobility Market</span>
          </TabsTrigger>
          <TabsTrigger value="academies" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Sign Academies</span>
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Cart ({cart.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Booking Hub */}
        <TabsContent value="booking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Schedule Appointment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Available Times Today</h3>
                  {appointments.map((apt, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${apt.available ? 'cursor-pointer hover:bg-accent' : 'opacity-50'}`}
                      onClick={() => apt.available && bookAppointment(apt)}
                      role="button"
                      tabIndex={apt.available ? 0 : -1}
                      aria-label={`${apt.service} at ${apt.time}, ${apt.available ? 'available' : 'not available'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{apt.time}</p>
                            <p className="text-sm text-muted-foreground">{apt.service}</p>
                          </div>
                        </div>
                        <Badge variant={apt.available ? "default" : "secondary"}>
                          {apt.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Service Types</h3>
                  <div className="space-y-2">
                    <p className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4" />
                      <span>Mobility Assessment</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4" />
                      <span>Vision Therapy</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4" />
                      <span>Speech Therapy</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4" />
                      <span>Occupational Therapy</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mobility Aid Market */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.accessibility.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="flex items-center space-x-2"
                      aria-label={`Add ${product.name} to cart for $${product.price}`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sign Academy Finder */}
        <TabsContent value="academies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Sign Language Academy Finder</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Nearby Academies</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Metro Sign Academy", distance: "0.8 miles", rating: 4.8 },
                      { name: "HandSpeak Institute", distance: "1.2 miles", rating: 4.9 },
                      { name: "Silent Communications", distance: "2.1 miles", rating: 4.7 }
                    ].map((academy, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-accent cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{academy.name}</h4>
                            <p className="text-sm text-muted-foreground">{academy.distance} away</p>
                          </div>
                          <Badge variant="outline">★ {academy.rating}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive map would appear here</p>
                    <Button variant="outline" className="mt-4">View Full Map</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shopping Cart */}
        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Shopping Cart</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Button variant="outline">Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="font-bold">${item.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${cart.reduce((sum, item) => sum + item.price, 0)}
                      </span>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportSphere;