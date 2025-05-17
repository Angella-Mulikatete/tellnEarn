'use client'

import { useState } from "react";
import LeaderboardTable from "../components/LeaderboardTable";
import Navigation from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Mock data for leaderboard
const weeklyUsers = [
  {
    rank: 1,
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 850,
    reviews: 12,
    earnings: 120,
  },
  {
    rank: 2,
    id: "user2",
    name: "Jamie Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    points: 720,
    reviews: 9,
    earnings: 95,
  },
  {
    rank: 3,
    id: "user3",
    name: "Taylor Brown",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: 650,
    reviews: 8,
    earnings: 85,
  },
  {
    rank: 4,
    id: "user4",
    name: "Morgan Williams",
    avatar: "https://i.pravatar.cc/150?img=4",
    points: 590,
    reviews: 7,
    earnings: 70,
  },
  {
    rank: 5,
    id: "user5",
    name: "Casey Miller",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 520,
    reviews: 6,
    earnings: 60,
  },
];

const monthlyUsers = [
  {
    rank: 1,
    id: "user6",
    name: "Jordan Lee",
    avatar: "https://i.pravatar.cc/150?img=6",
    points: 3200,
    reviews: 42,
    earnings: 480,
  },
  {
    rank: 2,
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 2850,
    reviews: 38,
    earnings: 420,
  },
  {
    rank: 3,
    id: "user7",
    name: "Riley Davis",
    avatar: "https://i.pravatar.cc/150?img=7",
    points: 2450,
    reviews: 33,
    earnings: 380,
  },
  {
    rank: 4,
    id: "user2",
    name: "Jamie Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    points: 2100,
    reviews: 28,
    earnings: 320,
  },
  {
    rank: 5,
    id: "user8",
    name: "Quinn Taylor",
    avatar: "https://i.pravatar.cc/150?img=8",
    points: 1950,
    reviews: 25,
    earnings: 290,
  },
];

const allTimeUsers = [
  {
    rank: 1,
    id: "user6",
    name: "Jordan Lee",
    avatar: "https://i.pravatar.cc/150?img=6",
    points: 12500,
    reviews: 165,
    earnings: 1875,
  },
  {
    rank: 2,
    id: "user9",
    name: "Drew Martin",
    avatar: "https://i.pravatar.cc/150?img=9",
    points: 10800,
    reviews: 142,
    earnings: 1620,
  },
  {
    rank: 3,
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 9200,
    reviews: 121,
    earnings: 1380,
  },
  {
    rank: 4,
    id: "user10",
    name: "Skyler Adams",
    avatar: "https://i.pravatar.cc/150?img=10",
    points: 8700,
    reviews: 115,
    earnings: 1305,
  },
  {
    rank: 5,
    id: "user7",
    name: "Riley Davis",
    avatar: "https://i.pravatar.cc/150?img=7",
    points: 8100,
    reviews: 107,
    earnings: 1215,
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <>
      <Navigation />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-6">
          See who is leading the community in feedback and rewards
        </p>
        
        <div className="mb-8">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full md:w-[400px] grid-cols-3 bg-secondary">
              <TabsTrigger 
                value="weekly"
                className="data-[state=active]:bg-tellnearn-yellow data-[state=active]:text-black"
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger 
                value="monthly"
                className="data-[state=active]:bg-tellnearn-yellow data-[state=active]:text-black"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger 
                value="all-time"
                className="data-[state=active]:bg-tellnearn-yellow data-[state=active]:text-black"
              >
                All Time
              </TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <LeaderboardTable users={weeklyUsers} />
            </TabsContent>
            <TabsContent value="monthly">
              <LeaderboardTable users={monthlyUsers} />
            </TabsContent>
            <TabsContent value="all-time">
              <LeaderboardTable users={allTimeUsers} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-secondary rounded-lg border border-border/40 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Your Leaderboard Status</h3>
              <p className="text-muted-foreground mb-4">
                You are currently ranked #42 overall. Keep submitting quality feedback to climb the ranks!
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-card p-4 rounded-lg border border-border/40">
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-lg font-bold text-white">1,250</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/40">
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="text-lg font-bold text-white">28</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/40">
                  <p className="text-sm text-muted-foreground">Earnings</p>
                  <p className="text-lg font-bold text-tellnearn-yellow">$320</p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 border-l border-border/40 pl-6 hidden md:block">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-tellnearn-yellow/20 border-4 border-tellnearn-yellow mb-3">
                  <span className="text-2xl font-bold text-tellnearn-yellow">#42</span>
                </div>
                <p className="text-white font-medium">Your Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
