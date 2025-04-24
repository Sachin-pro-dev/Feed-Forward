
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Gift, Tag, Search, Filter, ShoppingCart, Truck, ThumbsUp, ShoppingBag, Package, Store, Sparkles, Coffee, Utensils } from "lucide-react";

// Define reward item type
interface RewardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sponsor: string;
  sponsorLogo?: string;
  stock: "in stock" | "low stock" | "out of stock";
  shippingInfo: string;
  popular?: boolean;
}

// Mock reward categories
const categories = [
  { id: "all", name: "All Rewards", icon: Gift },
  { id: "eco", name: "Eco Products", icon: ShoppingBag },
  { id: "food", name: "Food & Drinks", icon: Coffee },
  { id: "vouchers", name: "Vouchers", icon: Tag },
  { id: "experiences", name: "Experiences", icon: Sparkles },
  { id: "donation", name: "Donation Options", icon: ThumbsUp },
];

// Mock reward items
const rewardItems: RewardItem[] = [
  {
    id: "reward-001",
    title: "Eco-Friendly Water Bottle",
    description: "Made from recycled materials, this 750ml bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "eco",
    price: 200,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Green Earth Co.",
    stock: "in stock",
    shippingInfo: "Ships within 3-5 business days",
    popular: true
  },
  {
    id: "reward-002",
    title: "$15 Coffee Shop Voucher",
    description: "Enjoy a drink and snack at any participating local coffee shop in your area.",
    category: "vouchers",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Urban Brew",
    stock: "in stock",
    shippingInfo: "Digital voucher delivered by email",
    popular: true
  },
  {
    id: "reward-003",
    title: "Reusable Produce Bags (Set of 5)",
    description: "Washable mesh bags for fruits and vegetables, reducing single-use plastic at grocery stores.",
    category: "eco",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Green Earth Co.",
    stock: "low stock",
    shippingInfo: "Ships within 3-5 business days"
  },
  {
    id: "reward-004",
    title: "Food Bank Donation",
    description: "Your FeedCoins will provide 10 meals to those in need through our partner food banks.",
    category: "donation",
    price: 100,
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "FoodShare Foundation",
    stock: "in stock",
    shippingInfo: "Processed immediately"
  },
  {
    id: "reward-005",
    title: "Cooking Workshop Ticket",
    description: "Join a 2-hour workshop on sustainable cooking with local celebrity chef Maya Green.",
    category: "experiences",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aec78?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Culinary Institute",
    stock: "low stock",
    shippingInfo: "Digital ticket delivered by email"
  },
  {
    id: "reward-006",
    title: "Sustainable Snack Box",
    description: "Collection of snacks from companies committed to sustainable practices.",
    category: "food",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1523294587484-bae6cc870010?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "EcoSnack Co.",
    stock: "in stock",
    shippingInfo: "Ships within 5-7 business days",
    popular: true
  },
  {
    id: "reward-007",
    title: "10% Off Grocery Store Coupon",
    description: "Valid at participating local grocery stores for one purchase.",
    category: "vouchers",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Fresh Mart",
    stock: "in stock",
    shippingInfo: "Digital coupon delivered by email"
  },
  {
    id: "reward-008",
    title: "Tree Planting Initiative",
    description: "Your FeedCoins will plant 5 trees in deforested areas around the world.",
    category: "donation",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sponsor: "Global Reforest",
    stock: "in stock",
    shippingInfo: "Certificate emailed within 24 hours"
  }
];

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast: uiToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [feedCoinBalance, setFeedCoinBalance] = useState(0);
  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showRedemptionSheet, setShowRedemptionSheet] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      uiToast({
        title: "Authentication required",
        description: "Please login to access the marketplace",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, uiToast]);

  // Fetch wallet data
  useEffect(() => {
    if (isAuthenticated) {
      // Mock API call to fetch wallet data
      setTimeout(() => {
        setFeedCoinBalance(350);
        setIsLoading(false);
      }, 1200);
    }
  }, [isAuthenticated]);

  // Filter rewards based on category and search
  const filteredRewards = rewardItems.filter(item => {
    // Category filter
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort rewards
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
    if (sortBy === "priceAsc") {
      return a.price - b.price;
    }
    if (sortBy === "priceDesc") {
      return b.price - a.price;
    }
    return 0;
  });

  const handleRedeemClick = (item: RewardItem) => {
    setSelectedItem(item);
    setShowRedemptionSheet(true);
  };

  const handleConfirmRedeem = () => {
    if (!selectedItem) return;
    
    setIsRedeeming(true);
    
    // Check if user has enough FeedCoins
    if (feedCoinBalance < selectedItem.price) {
      toast.error("Not enough FeedCoins", {
        description: "You don't have enough FeedCoins to redeem this reward."
      });
      setIsRedeeming(false);
      return;
    }
    
    // Mock redemption process
    setTimeout(() => {
      setIsRedeeming(false);
      setShowRedemptionSheet(false);
      
      // Update balance
      setFeedCoinBalance(prev => prev - selectedItem.price);
      
      toast.success("Reward redeemed successfully!", {
        description: "Check your email for details and tracking information."
      });
      
      // Navigate to a success page or stay on marketplace
      // navigate("/marketplace/success");
    }, 1500);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rewards Marketplace</h1>
          <p className="text-muted-foreground">Redeem your FeedCoins for exclusive rewards</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-ff-yellow" />
            <span className="font-medium">{feedCoinBalance} FC Available</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/wallet')}
          >
            <Gift className="h-4 w-4 mr-1" />
            Wallet
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 overflow-x-auto flex w-full justify-start">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : sortedRewards.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No rewards found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRewards.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                {item.popular && (
                  <Badge className="absolute top-2 right-2 bg-ff-yellow text-background">
                    Popular
                  </Badge>
                )}
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="font-bold">
                    {item.price} FC
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Store className="h-3 w-3 mr-1" />
                  <span>By {item.sponsor}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Truck className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.shippingInfo}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button
                  className={`w-full ${feedCoinBalance >= item.price ? "btn-gradient" : ""}`}
                  variant={feedCoinBalance >= item.price ? "default" : "outline"}
                  onClick={() => handleRedeemClick(item)}
                  disabled={item.stock === "out of stock"}
                >
                  {item.stock === "out of stock" ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <Gift className="h-4 w-4 mr-2" /> Redeem Reward
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Featured Sponsors Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Featured Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-ff-green" />
            </div>
            <h3 className="font-medium">Green Earth Co.</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Sustainable products for everyday use
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              <Coffee className="h-8 w-8 text-ff-orange" />
            </div>
            <h3 className="font-medium">Urban Brew</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Locally-sourced coffee and treats
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="h-8 w-8 text-ff-yellow" />
            </div>
            <h3 className="font-medium">FoodShare Foundation</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Fighting food insecurity nationwide
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium">Culinary Institute</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Teaching sustainable cooking techniques
            </p>
          </div>
        </div>
      </div>
      
      {/* Order History Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-2">Your Order History</h2>
        <p className="text-muted-foreground mb-6">Track your previous redemptions and orders</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Eco-Friendly Water Bottle</div>
                    <div className="text-sm text-muted-foreground">Ordered on Apr 15, 2025</div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-ff-green/10 text-ff-green">
                    Delivered
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">$15 Coffee Shop Voucher</div>
                    <div className="text-sm text-muted-foreground">Ordered on Apr 2, 2025</div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-ff-green/10 text-ff-green">
                    Delivered
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Orders
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Redemption Sheet */}
      <Sheet open={showRedemptionSheet} onOpenChange={setShowRedemptionSheet}>
        <SheetContent>
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle>Confirm Redemption</SheetTitle>
                <SheetDescription>
                  You're about to redeem this reward using your FeedCoins
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-32 w-32 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={selectedItem.imageUrl} 
                      alt={selectedItem.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{selectedItem.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{selectedItem.description}</p>
                </div>
                
                <div className="space-y-4 border-y py-4 my-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{selectedItem.price} FC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Balance</span>
                    <span className={feedCoinBalance >= selectedItem.price ? "text-ff-green" : "text-ff-orange"}>
                      {feedCoinBalance} FC
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Balance After Purchase</span>
                    <span>{Math.max(0, feedCoinBalance - selectedItem.price)} FC</span>
                  </div>
                </div>
                
                <div className="space-y-2 mt-6">
                  <Button 
                    className="w-full btn-gradient"
                    onClick={handleConfirmRedeem}
                    disabled={isRedeeming || feedCoinBalance < selectedItem.price}
                  >
                    {isRedeeming ? (
                      <><span className="mr-2">Processing</span><span className="animate-pulse">...</span></>
                    ) : (
                      <>Confirm Redemption</>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowRedemptionSheet(false)}
                    disabled={isRedeeming}
                  >
                    Cancel
                  </Button>
                </div>
                
                {feedCoinBalance < selectedItem.price && (
                  <div className="mt-4 p-4 bg-destructive/10 rounded-md text-sm text-destructive text-center">
                    You need {selectedItem.price - feedCoinBalance} more FeedCoins for this reward.
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
