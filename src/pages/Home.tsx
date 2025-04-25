import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FoodFlagGrid } from "@/components/FoodFlagGrid";
import { mockFoodFlags, impactStats } from "@/data/mockData";
import { MapPin, Users, Award, ArrowRight, TrendingUp, Heart, ShieldCheck, Bell } from "lucide-react";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("nearby");
  
  const nearbyFlags = mockFoodFlags.slice(0, 3);
  const trendingFlags = [...mockFoodFlags].reverse().slice(0, 3);
  
  const impactMetrics = [
    {
      icon: Heart,
      label: "Meals Donated",
      value: formatNumber(impactStats.mealsDonated),
      description: "Nutritious meals provided to those in need through our platform"
    },
    {
      icon: TrendingUp,
      label: "CO₂ Prevented",
      value: formatNumber(impactStats.co2Prevented) + "kg",
      description: "Reduction in carbon emissions by preventing food waste"
    },
    {
      icon: Users,
      label: "Active Donors",
      value: formatNumber(impactStats.activeDonors),
      description: "Dedicated food donors making a difference in their communities"
    }
  ];

  const feasibilityCards = [
    {
      title: "Easy Integration",
      description: "Simple onboarding process for both donors and recipients",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      title: "Real-time Updates",
      description: "Instant notifications and live tracking of food donations",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      title: "Community Impact",
      description: "Measurable reduction in food waste and hunger",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ff-green/10 to-ff-orange/10 -z-10" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Rescuing Food,<br />
              <span className="gradient-text">Feeding Communities</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in" style={{animationDelay: "0.2s"}}>
              Connect surplus food with those in need while earning rewards for your positive impact on the community and environment.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild className="btn-gradient" size="lg">
                <Link to="/donate">Donate Food</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map">Find Food</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="w-full h-[400px] md:h-[500px] relative">
              <div className="absolute top-0 right-0 w-[90%] h-[90%] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Food donation app"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">FoodFlag System</h3>
                    <p className="text-sm opacity-90">Connect donors with recipients in real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-white rounded-2xl overflow-hidden shadow-lg border p-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ff-green/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-ff-green" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rewards & Impact</h4>
                    <p className="text-sm text-muted-foreground">Earn FeedCoins for your contributions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section with Hover Cards */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Community Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric, index) => (
              <HoverCard key={metric.label}>
                <HoverCardTrigger asChild>
                  <div className="flex flex-col items-center text-center animate-fade-in cursor-pointer" 
                       style={{animationDelay: `${0.2 * (index + 1)}s`}}>
                    <div className="h-16 w-16 rounded-full bg-ff-green/20 flex items-center justify-center mb-4">
                      <metric.icon className="h-8 w-8 text-ff-green" />
                    </div>
                    <span className="text-3xl md:text-4xl font-bold">{metric.value}</span>
                    <span className="text-muted-foreground">{metric.label}</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div>
                      <h4 className="text-sm font-semibold">{metric.label}</h4>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Food Flags Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Available Food</h2>
              <p className="text-muted-foreground">Browse surplus food that needs rescuing near you</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nearby" className="mt-0">
                <FoodFlagGrid foodFlags={nearbyFlags} />
              </TabsContent>
              
              <TabsContent value="trending" className="mt-0">
                <FoodFlagGrid foodFlags={trendingFlags} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="group">
              <Link to="/map">
                View All Available Food
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform connects food donors with recipients through an easy-to-use system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="h-12 w-12 rounded-full bg-ff-green/20 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-ff-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create a FoodFlag</h3>
              <p className="text-muted-foreground">
                Donors post details about surplus food including type, quantity, and pickup location.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: "0.3s"}}>
              <div className="h-12 w-12 rounded-full bg-ff-orange/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-ff-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Connect with Recipients</h3>
              <p className="text-muted-foreground">
                Recipients are notified of nearby available food and can claim it for pickup.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="h-12 w-12 rounded-full bg-ff-yellow/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-ff-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Earn Rewards</h3>
              <p className="text-muted-foreground">
                Both donors and recipients earn FeedCoins that can be redeemed for various rewards.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="btn-gradient">
              <Link to="/about">Learn More About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Platform Features</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Project FeedForward combines innovative technology with social impact
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.2s"}}>
              <ShieldCheck className="h-8 w-8 text-ff-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                Immutable records of all donations for complete transparency and trust.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.3s"}}>
              <MapPin className="h-8 w-8 text-ff-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">GPS Navigation</h3>
              <p className="text-muted-foreground">
                Real-time directions to pickup locations for efficient food rescue.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Award className="h-8 w-8 text-ff-yellow mb-4" />
              <h3 className="text-xl font-semibold mb-2">FeedCoin Rewards</h3>
              <p className="text-muted-foreground">
                Earn tokens for your contributions and redeem them for various perks.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.5s"}}>
              <Bell className="h-8 w-8 text-ff-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Alerts</h3>
              <p className="text-muted-foreground">
                Get notified instantly when food is available in your area.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.6s"}}>
              <Users className="h-8 w-8 text-ff-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Governance</h3>
              <p className="text-muted-foreground">
                Participate in platform decisions through our DAO structure.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.7s"}}>
              <TrendingUp className="h-8 w-8 text-ff-yellow mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impact Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your environmental and social impact with detailed metrics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feasibility Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Project Feasibility</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform is designed for seamless integration and maximum impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feasibilityCards.map((card, index) => (
              <HoverCard key={card.title}>
                <HoverCardTrigger asChild>
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">{card.title}</h3>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-semibold">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-ff-green to-ff-orange text-white">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="max-w-2xl text-lg mb-8">
            Join our growing community of food rescuers today and start making a positive impact on your community and the environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-ff-green hover:bg-white/90">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
