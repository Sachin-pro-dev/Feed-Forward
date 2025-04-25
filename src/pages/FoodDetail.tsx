
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Clock, MapPin, Award, Heart, AlertTriangle, CheckCircle, Users } from "lucide-react";
import { mockFoodFlags } from "@/data/mockData";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isClaiming, setIsClaiming] = useState(false);
  
  // Find the food flag from mock data
  const foodFlag = mockFoodFlags.find(flag => flag.id === id);
  
  if (!foodFlag) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Food Not Found</CardTitle>
            <CardDescription>
              The food item you're looking for doesn't exist or has already been claimed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/map")}>
              Back to Food Map
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const handleClaimFood = () => {
    setIsClaiming(true);
    
    // Simulate API request with timeout
    setTimeout(() => {
      setIsClaiming(false);
      toast.success("Food claimed successfully!", {
        description: "Details have been sent to your account. Please pick up within the expiry time.",
        action: {
          label: "View Details",
          onClick: () => console.log("View Details clicked"),
        },
      });
      
      // Navigate back to the map after successful claim
      setTimeout(() => {
        navigate("/map");
      }, 2000);
    }, 1500);
  };
  
  // Determine badge color based on food type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Vegetarian":
        return "bg-ff-green text-white hover:bg-ff-green";
      case "Vegan":
        return "bg-emerald-600 text-white hover:bg-emerald-600";
      case "Non-Vegetarian":
        return "bg-ff-orange text-white hover:bg-ff-orange";
      default:
        return "bg-ff-yellow text-foreground hover:bg-ff-yellow";
    }
  };
  
  const timeLeft = foodFlag.expiryTime;
  const isUrgent = timeLeft.includes("hours") && parseInt(timeLeft.split(" ")[0]) <= 3;
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Image and main details */}
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/map")}
            >
              Back to Food Map
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-96 w-full">
              <img 
                src={foodFlag.imageUrl} 
                alt={foodFlag.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge className={`${getBadgeColor(foodFlag.foodType)}`}>
                  {foodFlag.foodType}
                </Badge>
                
                <Badge variant="outline" className="bg-background">
                  {foodFlag.quantity}
                </Badge>
                
                {isUrgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                  </Badge>
                )}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl">{foodFlag.title}</CardTitle>
              <CardDescription>{foodFlag.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    <strong>Location:</strong> {foodFlag.location} ({foodFlag.distance})
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    <strong>Expires in:</strong>{" "}
                    <span className={isUrgent ? "text-destructive font-medium" : ""}>
                      {foodFlag.expiryTime}
                    </span>
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    <strong>Posted by:</strong> {foodFlag.donorName} 
                    <Badge variant="outline" className="ml-2 bg-amber-50">
                      ⭐ {foodFlag.donorRating}
                    </Badge>
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-ff-orange" />
                  <span>
                    <strong>Impact:</strong> {foodFlag.impact.mealsProvided} meals • 
                    {foodFlag.impact.co2Saved}kg CO₂ saved
                  </span>
                </div>
              </div>
            </CardContent>
            
            <Separator />
            
            <CardFooter className="p-6">
              <div className="w-full">
                <Button 
                  onClick={handleClaimFood}
                  disabled={isClaiming}
                  className="btn-gradient w-full text-lg py-6"
                >
                  {isClaiming ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Claim This Food
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  By claiming, you agree to pick up this food within the specified time frame.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Additional information */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pickup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Contact donor through the app after claiming</li>
                <li>Arrive at the location within the expiry window</li>
                <li>Bring your own containers if possible</li>
                <li>Show your QR code from the confirmation email</li>
                <li>Provide feedback after pickup is complete</li>
              </ol>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Food Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This food has been verified by our donor. Please check the quality before consuming.
                Report any issues immediately through the feedback form.
              </p>
              <div className="flex items-center mt-4">
                <Button variant="outline" size="sm" className="mr-2">
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Nearby</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFoodFlags
                  .filter(f => f.id !== foodFlag.id)
                  .slice(0, 3)
                  .map(flag => (
                    <div 
                      key={flag.id} 
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => navigate(`/food/${flag.id}`)}
                    >
                      <img 
                        src={flag.imageUrl} 
                        alt={flag.title} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium line-clamp-1">{flag.title}</p>
                        <p className="text-xs text-muted-foreground">{flag.distance}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
