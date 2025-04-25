
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Calendar,
  Download,
  FileText,
  PieChart,
  Share2,
  Users,
  Leaf,
  Globe,
} from "lucide-react";

// Mock data
const financialData = {
  totalDonated: 1250000,
  taxBenefits: 437500,
  budgetUsed: 67,
  mealsProvided: 42500,
  communitiesImpacted: 28
};

const impactData = {
  co2Saved: 25.8, // tons
  wasteReduction: 15.3, // tons
  peopleFed: 42500,
  communitiesSupported: 28,
  sdgAlignment: [
    { goal: "2", name: "Zero Hunger", contribution: 75 },
    { goal: "12", name: "Responsible Consumption", contribution: 64 },
    { goal: "13", name: "Climate Action", contribution: 41 }
  ]
};

const utilizationData = {
  allocation: [
    { category: "Food Distribution", percentage: 62 },
    { category: "Logistics", percentage: 23 },
    { category: "Administration", percentage: 10 },
    { category: "Education", percentage: 5 }
  ],
  costPerMeal: 29.4, // rupees
  adminOverhead: 10.4 // percentage
};

const employeeData = {
  volunteerHours: 1240,
  employeeDonations: 385000,
  companyMatched: 385000,
  topDepartments: [
    { name: "Engineering", contribution: 128000 },
    { name: "Sales", contribution: 104500 },
    { name: "Operations", contribution: 87500 },
    { name: "HR", contribution: 65000 }
  ]
};

const CSRDashboardPage = () => {
  const [dateRange, setDateRange] = useState("thisYear");
  
  // Function to handle export
  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format...`);
    // This would connect to a real export functionality
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">CSR Dashboard</h1>
          <p className="text-muted-foreground">Track your company's social impact and contributions</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="pdf">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Report</SelectItem>
              <SelectItem value="csv">CSV Data</SelectItem>
              <SelectItem value="ppt">Presentation</SelectItem>
            </SelectContent>
          </Select>
          
          <Button size="icon" variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto mb-6">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        {/* Financial Overview Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Contributed</CardDescription>
                <CardTitle className="text-3xl">₹{(financialData.totalDonated/100000).toFixed(1)}L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Monetary + In-kind donations
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tax Benefits</CardDescription>
                <CardTitle className="text-3xl">₹{(financialData.taxBenefits/100000).toFixed(1)}L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  35% of total contributions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Budget Utilized</CardDescription>
                <CardTitle className="text-3xl">{financialData.budgetUsed}%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={financialData.budgetUsed} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Communities Impacted</CardDescription>
                <CardTitle className="text-3xl">{financialData.communitiesImpacted}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Across 12 states
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Monthly Contributions</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  [Bar Chart Visualization - Monthly Donations]
                </p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Donation Categories</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  [Pie Chart Visualization - Donation Categories]
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Impact Metrics Tab */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>CO₂ Saved</CardDescription>
                <CardTitle className="text-3xl">{impactData.co2Saved} tons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-600">
                    Equivalent to planting 430 trees
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Waste Reduced</CardDescription>
                <CardTitle className="text-3xl">{impactData.wasteReduction} tons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-600">
                    From landfills and incineration
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>People Fed</CardDescription>
                <CardTitle className="text-3xl">{impactData.peopleFed.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <p className="text-xs text-blue-600">
                    Throughout the year
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Communities Supported</CardDescription>
                <CardTitle className="text-3xl">{impactData.communitiesSupported}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-blue-500 mr-1" />
                  <p className="text-xs text-blue-600">
                    In 12 states
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Impact Map</CardTitle>
                <CardDescription>Geographic distribution of your impact</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
                <p className="text-muted-foreground text-sm">
                  [Geographic Map Visualization]
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SDG Alignment</CardTitle>
                <CardDescription>UN Sustainable Development Goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {impactData.sdgAlignment.map((sdg, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded flex items-center justify-center bg-[#48773e] text-white mr-2 text-xs font-bold`}>
                          {sdg.goal}
                        </div>
                        <span className="text-sm">{sdg.name}</span>
                      </div>
                      <span className="text-sm font-medium">{sdg.contribution}%</span>
                    </div>
                    <Progress value={sdg.contribution} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Fund Utilization Tab */}
        <TabsContent value="utilization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Allocation Chart</CardTitle>
                <CardDescription>How your donations are being utilized</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  [Allocation Chart Visualization]
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fund Distribution</CardTitle>
                <CardDescription>Breakdown of utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {utilizationData.allocation.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cost Per Meal</CardDescription>
                <CardTitle className="text-3xl">₹{utilizationData.costPerMeal}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Including logistics and distribution
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Admin Overhead</CardDescription>
                <CardTitle className="text-3xl">{utilizationData.adminOverhead}%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-green-600">
                  Below industry average of 15%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Transparency Score</CardDescription>
                <CardTitle className="text-3xl">92/100</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={92} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Reporting Tools Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <CardTitle>CSR Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Annual Impact Report</p>
                      <p className="text-xs text-muted-foreground">Comprehensive overview of your impact</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Financial Summary</p>
                      <p className="text-xs text-muted-foreground">Detailed fund allocation</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Environmental Impact</p>
                      <p className="text-xs text-muted-foreground">Carbon footprint reduction</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button className="w-full">Generate Custom Report</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  <CardTitle>Tax Documentation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">80G Certificate</p>
                      <p className="text-xs text-muted-foreground">Tax exemption document</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Donation Receipts</p>
                      <p className="text-xs text-muted-foreground">All transactions</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">CSR Statement</p>
                      <p className="text-xs text-muted-foreground">For corporate filing</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">Request Custom Certificate</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5 text-purple-500" />
                  <CardTitle>Shareable Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Impact Story</p>
                      <p className="text-xs text-muted-foreground">Community transformation</p>
                    </div>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Impact Metrics</p>
                      <p className="text-xs text-muted-foreground">Key statistics for social media</p>
                    </div>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Photo Gallery</p>
                      <p className="text-xs text-muted-foreground">15 high-quality images</p>
                    </div>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">Create Social Post</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reporting Calendar</CardTitle>
              <CardDescription>Upcoming report schedules and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upcoming reporting deadlines and scheduled reports</p>
              </div>
              <div className="border rounded-md divide-y">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Quarterly CSR Report</p>
                    <p className="text-xs text-muted-foreground">Due in 15 days</p>
                  </div>
                  <Button size="sm">Prepare</Button>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Annual Compliance Filing</p>
                    <p className="text-xs text-muted-foreground">Due in 45 days</p>
                  </div>
                  <Button size="sm" variant="outline">Schedule</Button>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Impact Newsletter</p>
                    <p className="text-xs text-muted-foreground">Monthly - Next: 7 days</p>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Engagement Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Volunteer Hours</CardDescription>
                <CardTitle className="text-3xl">{employeeData.volunteerHours}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  By 85 employees this year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Employee Donations</CardDescription>
                <CardTitle className="text-3xl">₹{(employeeData.employeeDonations/100000).toFixed(1)}L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  From 124 team members
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Company Matched</CardDescription>
                <CardTitle className="text-3xl">₹{(employeeData.companyMatched/100000).toFixed(1)}L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  100% matching program
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Contributions</CardTitle>
                <CardDescription>Top contributing teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {employeeData.topDepartments.map((dept, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{dept.name}</span>
                      <span className="text-sm font-medium">₹{(dept.contribution/1000).toFixed(1)}K</span>
                    </div>
                    <Progress 
                      value={(dept.contribution / employeeData.topDepartments[0].contribution) * 100} 
                      className="h-1.5" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recognition Highlights</CardTitle>
                <CardDescription>Top contributors this quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Engineering Team</p>
                      <p className="text-xs text-muted-foreground">Most volunteer hours: 450 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Rajeev Kumar</p>
                      <p className="text-xs text-muted-foreground">Highest individual donation: ₹45K</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Marketing Team</p>
                      <p className="text-xs text-muted-foreground">Most consistent participation: 92%</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">View All Contributors</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Engagement Activities</CardTitle>
              <CardDescription>Upcoming and recent events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Food Distribution Drive</p>
                    <p className="text-xs text-muted-foreground">Next Saturday, 10 AM - 2 PM</p>
                  </div>
                  <Button size="sm">Sign Up</Button>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">CSR Awareness Workshop</p>
                    <p className="text-xs text-muted-foreground">Aug 15, Virtual Event</p>
                  </div>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Team Fundraising Challenge</p>
                    <p className="text-xs text-muted-foreground">Ongoing until Sep 30</p>
                  </div>
                  <Button size="sm" variant="outline">View Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CSRDashboardPage;
