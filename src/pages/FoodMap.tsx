
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { FoodFlagGrid } from "@/components/FoodFlagGrid";
import { mockFoodFlags } from "@/data/mockData";
import { MapPin, Search, Filter, List, Grid3X3 } from "lucide-react";

export default function FoodMap() {
  const [view, setView] = useState<"map" | "list">("map");
  const [distance, setDistance] = useState([5]);
  const [searchQuery, setSearchQuery] = useState("");
  const [foodType, setFoodType] = useState<string>("all");
  
  const filteredFlags = mockFoodFlags.filter((flag) => {
    if (searchQuery && !flag.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (foodType !== "all" && flag.foodType.toLowerCase() !== foodType.toLowerCase()) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Food Map</h1>
          <p className="text-muted-foreground">Browse and claim available food donations near you</p>
        </div>
        
        <div className="flex gap-2">
          <Tabs 
            value={view} 
            onValueChange={(v) => setView(v as "map" | "list")}
            className="w-[200px]"
          >
            <TabsList className="w-full">
              <TabsTrigger value="map" className="flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-1">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-muted p-4 rounded-lg mb-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Select value={foodType} onValueChange={setFoodType}>
              <SelectTrigger>
                <SelectValue placeholder="Food Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Distance: {distance[0]} km</label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>
          
          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={view} onValueChange={(v) => setView(v as "map" | "list")}>
        <TabsContent value="map" className="mt-0 animate-fade-in">
          <div className="relative rounded-lg overflow-hidden border h-[500px] mb-6">
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-muted-foreground">This would be an interactive map showing food flags</p>
              </div>
            </div>
            
            {/* This would be replaced with an actual map component */}
            <div className="absolute bottom-4 left-4 right-4 bg-background p-4 rounded-lg shadow-lg border">
              <h3 className="font-medium mb-2">6 FoodFlags Found Nearby</h3>
              <div className="flex overflow-x-auto gap-4 pb-2">
                {mockFoodFlags.slice(0, 3).map((flag) => (
                  <div key={flag.id} className="min-w-[200px] p-3 bg-muted rounded-md">
                    <div className="font-medium truncate">{flag.title}</div>
                    <div className="text-sm text-muted-foreground">{flag.distance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mb-4">Available Near You</h3>
          <FoodFlagGrid foodFlags={filteredFlags.slice(0, 3)} />
        </TabsContent>
        
        <TabsContent value="list" className="mt-0 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">All Available Food ({filteredFlags.length})</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
          </div>
          
          <FoodFlagGrid foodFlags={filteredFlags} variant="compact" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
