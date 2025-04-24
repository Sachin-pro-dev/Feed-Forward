
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ShoppingBag } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Redeem your FeedCoins for rewards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-ff-green/20 flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-ff-green" />
            </div>
            <CardTitle>Starter Reward</CardTitle>
            <CardDescription>100 FeedCoins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Redeem this reward to get a special badge on your profile.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Redeem</Button>
          </CardFooter>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-ff-orange/20 flex items-center justify-center mb-2">
              <ShoppingBag className="h-6 w-6 text-ff-orange" />
            </div>
            <CardTitle>Premium Reward</CardTitle>
            <CardDescription>250 FeedCoins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Redeem this reward to get access to premium features.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Redeem</Button>
          </CardFooter>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-ff-yellow/20 flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-ff-yellow" />
            </div>
            <CardTitle>Elite Reward</CardTitle>
            <CardDescription>500 FeedCoins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Redeem this reward to get exclusive benefits and discounts.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Redeem</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>More rewards coming soon. Keep donating to earn more FeedCoins!</p>
      </div>
    </div>
  );
}
