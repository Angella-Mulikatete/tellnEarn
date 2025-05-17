'use client'


import { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import SearchFilters from "../components/SearchFilters";
import Navigation from "../components/Navbar";

// Mock data for campaigns
const allCampaigns = [
  {
    id: "1",
    title: "Fintech Mobile App Beta",
    description: "Test our new mobile banking app and get rewarded for your insights.",
    category: "Finance",
    reward: 25,
    rating: 4.8,
    participants: 126,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=500",
  },
  {
    id: "2",
    title: "Social Media Dashboard",
    description: "Help us improve our analytics dashboard for social media managers.",
    category: "Web Platform",
    reward: 20,
    rating: 4.5,
    participants: 89,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500",
  },
  {
    id: "3",
    title: "GamersDelight UI Review",
    description: "Review our new gaming platform UI and help us enhance user experience.",
    category: "Gaming",
    reward: 30,
    rating: 4.7,
    participants: 215,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500",
  },
  {
    id: "4",
    title: "Productivity App Feedback",
    description: "Help us make our productivity app more useful for daily planning.",
    category: "App",
    reward: 15,
    rating: 4.2,
    participants: 56,
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=500",
  },
  {
    id: "5",
    title: "Crypto Wallet UX Research",
    description: "Provide feedback on our blockchain wallet interface for better security and usability.",
    category: "Finance",
    reward: 40,
    rating: 4.9,
    participants: 78,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=500",
  },
  {
    id: "6",
    title: "Video Streaming Platform",
    description: "Test our new video streaming features and recommendation engine.",
    category: "Entertainment",
    reward: 22,
    rating: 4.3,
    participants: 134,
    image: "https://images.unsplash.com/photo-1585247226801-bc613c441316?q=80&w=500",
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    reward: "all",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  // Filter campaigns based on search and filters
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    // Filter by search query
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = filters.category === "all" || campaign.category.toLowerCase() === filters.category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Sort by reward
    if (filters.reward === "high") {
      return b.reward - a.reward;
    } else if (filters.reward === "low") {
      return a.reward - b.reward;
    }
    return 0;
  });

  return (
    <>
      <Navigation />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-2">Available Campaigns</h1>
        <p className="text-muted-foreground mb-6">
          Browse and participate in feedback campaigns to earn rewards
        </p>
        
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
        
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-tellnearn-yellow/10 mb-4">
              <Search size={32} className="text-tellnearn-yellow" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No campaigns found</h3>
            <p className="text-muted-foreground max-w-md">
              We could not find any campaigns matching your search criteria. Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

import { Search } from "lucide-react";

export default Page;
