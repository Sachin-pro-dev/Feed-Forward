
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Truck, 
  BarChart3, 
  MapPin, 
  Heart, 
  AlertCircle, 
  MoveRight,
  Database,
  GanttChart
} from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container py-8 space-y-10 max-w-7xl">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About FeedForward
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting food surplus to hunger, one meal at a time
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                FeedForward is building a revolutionary platform to bridge the gap between food waste and hunger - creating an ecosystem where excess food can be efficiently redirected to those who need it most.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We envision a world where no edible food goes to waste while people go hungry. Our blockchain-powered platform creates transparency, accountability and incentives for all participants in the food rescue ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">The Problem We're Solving</h2>
          <p className="text-xl text-muted-foreground">
            The hunger paradox: abundance alongside scarcity
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-red-600 dark:text-red-400">The Global Crisis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p>
              In a world that produces more than enough food for everyone, over 9 million people die each year from hunger — more than AIDS, malaria, and tuberculosis combined.
            </p>
            <p>
              Every single day, 25,000 lives are lost, including 10,000 children, simply because they had nothing to eat.
            </p>
            <p>
              Yet at the same time, tons of edible food is thrown away — from weddings, corporate events, restaurants, supermarkets, and parties — not because it's spoiled, but because there's no system to share it.
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
            <CardTitle className="text-orange-600 dark:text-orange-400">India's Hunger Paradox</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p>
              India stands at the crossroads of a heart-breaking contradiction:
            </p>
            <p>
              While 190 million Indians go to bed hungry every night, 40% of our food is wasted annually — amounting to 68 million tons, enough to feed 100 million people.
            </p>
            <p>
              This crisis is fuelled by:
            </p>
            <ul className="ml-6 space-y-2 list-disc">
              <li>Inefficient agricultural systems</li>
              <li>Fragmented supply chains</li>
              <li>A lack of real-time tools to manage surplus</li>
              <li>And no streamlined way to connect those who have food with those who need it</li>
            </ul>
            
            <p className="mt-4">
              From small vendors and farmers to D-Mart, Walmart, hotels, buffets, and wedding organizers, food waste occurs at every level — leading to devastating consequences:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="p-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </Badge>
                <div>
                  <p className="font-medium">Food Wastage</p>
                  <p className="text-sm text-muted-foreground">40% of food is lost before it reaches people</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="p-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </Badge>
                <div>
                  <p className="font-medium">Hunger & Malnutrition</p>
                  <p className="text-sm text-muted-foreground">India ranks 94th on the Global Hunger Index, 1 in 4 children suffers from malnutrition</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="p-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </Badge>
                <div>
                  <p className="font-medium">Economic Loss</p>
                  <p className="text-sm text-muted-foreground">₹2 lakh crore (~1.5% of GDP) lost yearly due to food waste</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="p-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </Badge>
                <div>
                  <p className="font-medium">Environmental Harm</p>
                  <p className="text-sm text-muted-foreground">Food waste contributes to 6% of India's greenhouse gas emissions</p>
                </div>
              </div>
            </div>
            
            <p className="mt-4 font-medium text-lg">
              This is not a crisis of scarcity. It's a crisis of disconnection, of neglected compassion, and of systems failing the people who need them most.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">How We're Solving It</h2>
          <p className="text-xl text-muted-foreground">
            Our approach to bridging the gap between food surplus and hunger
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Food Map</CardTitle>
              <CardDescription>Real-time visualization of food surplus and needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our interactive Food Map shows available food donations in real-time, making it easy to find and claim surplus food before it goes to waste.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Donation Platform</CardTitle>
              <CardDescription>Simple process to share surplus food</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Anyone with surplus food can easily create a FoodFlag on our platform, providing details about quantity, type, and pickup information.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Volunteer Network</CardTitle>
              <CardDescription>Community-powered distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our dedicated volunteer network helps collect and deliver food from donors to recipients, ensuring efficient redistribution.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Logistics Management</CardTitle>
              <CardDescription>Efficient food transport systems</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform optimizes routes and coordinates pickups and deliveries to ensure food reaches recipients quickly and safely.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Inventory System</CardTitle>
              <CardDescription>Preventing food waste before it happens</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI inventory tool helps businesses identify soon-to-expire products and connect them with potential recipients.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Impact Tracking</CardTitle>
              <CardDescription>Measuring our collective difference</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track the social and environmental impact of food donations, from meals served to carbon emissions reduced.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Why FeedForward?</h2>
          <p className="text-xl text-muted-foreground">
            What makes our platform unique
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                    <h3 className="font-medium">Real-time Food Mapping</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Visualize available food donations and needs across locations.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                    <h3 className="font-medium">Blockchain Verification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Transparent tracking of every food donation from source to recipient.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                    <h3 className="font-medium">FeedCoin Rewards</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Incentivize donations and volunteering through our token ecosystem.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">4</Badge>
                    <h3 className="font-medium">AI Inventory Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Predictive analytics to identify and redirect soon-to-expire food.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">5</Badge>
                    <h3 className="font-medium">Community Engagement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Volunteer network and gamified participation system.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">6</Badge>
                    <h3 className="font-medium">Impact Analytics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Detailed metrics on social and environmental impact of contributions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Separator />
      
      <section className="space-y-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">Join Us in Making a Difference</h2>
        <p className="text-lg text-muted-foreground">
          Together, we can create a future where everyone has access to nutritious food and no edible food goes to waste.
        </p>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <a href="/volunteer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Become a Volunteer 
            <MoveRight className="ml-2 h-4 w-4" />
          </a>
          <a href="/donate" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2">
            Donate Food
            <Heart className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
