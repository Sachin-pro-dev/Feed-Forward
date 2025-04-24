
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Camera, 
  Calendar, 
  Upload, 
  CheckCircle, 
  Info
} from "lucide-react";

export default function DonatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Food Flag Created!",
        description: "Your donation has been successfully posted.",
      });
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Donate Surplus Food</h1>
          <p className="text-muted-foreground">
            Create a FoodFlag to share your surplus food with those in need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in" style={{animationDelay: "0.1s"}}>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-ff-green/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-ff-green" />
              </div>
              <CardTitle className="text-lg">Reduce Waste</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Help reduce food waste by connecting with those who can use it.
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-ff-orange/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-ff-orange" />
              </div>
              <CardTitle className="text-lg">Feed Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support your local community by providing food to those in need.
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{animationDelay: "0.3s"}}>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-ff-yellow/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-ff-yellow" />
              </div>
              <CardTitle className="text-lg">Earn Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive FeedCoins for your donations that can be redeemed for perks.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="animate-fade-in" style={{animationDelay: "0.4s"}}>
          <CardHeader>
            <CardTitle>Create a FoodFlag</CardTitle>
            <CardDescription>
              Fill out the details about the food you're donating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Food Title</Label>
                  <Input id="title" placeholder="E.g., Corporate Lunch Leftovers" required />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the food, packaging, and any special instructions..."
                    className="resize-none h-20"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foodType">Food Type</Label>
                    <Select>
                      <SelectTrigger id="foodType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="nonVegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" placeholder="E.g., Serves 10-15" required />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Pickup Location
                  </Label>
                  <div className="mt-2 space-y-4">
                    <Input placeholder="Search for address..." />
                    <div className="h-[150px] bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Map location selector would appear here</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Best Before
                    </Label>
                    <Input type="datetime-local" required />
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Available Until
                    </Label>
                    <Input type="datetime-local" required />
                  </div>
                </div>
                
                <div>
                  <Label className="flex items-center gap-1">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    Upload Photos (Optional)
                  </Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop image files here, or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md flex items-start gap-3">
                  <Info className="h-5 w-5 text-ff-orange flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Food Safety Guidelines:</p>
                    <p className="text-muted-foreground">
                      Make sure the food is properly packaged, safe to consume, and within its expiry date. 
                      Provide accurate information to help recipients assess suitability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="btn-gradient w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating FoodFlag..." : "Create FoodFlag"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="ghost" type="button">
              Save as Draft
            </Button>
            <Button variant="outline" type="button">
              Preview
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
