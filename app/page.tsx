/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useMiniKit,
  //useAddFrame,
  //useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import Image from "next/image";
import StatsCard from "./components/StatsCard";
import TrendsChart from "./components/TrendsChart";
import { Button } from "./components/ui/button";
import CampaignCard from "./components/CampaignCard";
import { Award, FileText, Star, TrendingUp, Upload, Users } from "lucide-react";
import Navbar from "./components/Navbar";
// import { CampaignCard } from "./components/CampaignCard";
 import { useContractInteractions } from "../lib/web3";
import {
  //SignInButton,
  useProfile
} from '@farcaster/auth-kit';
import CreateCampaignForm from "./components/CreateCampaign";


export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [isLoading, setIsLoading] = useState(true);
     const { getAllCampaigns } = useContractInteractions();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {
   // isAuthenticated,
    profile } = useProfile();


  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);


  const mockTrendData = [
  { date: "May 1", feedbacks: 12, rewards: 24 },
  { date: "May 2", feedbacks: 19, rewards: 38 },
  { date: "May 3", feedbacks: 15, rewards: 30 },
  { date: "May 4", feedbacks: 25, rewards: 50 },
  { date: "May 5", feedbacks: 30, rewards: 60 },
  { date: "May 6", feedbacks: 18, rewards: 36 },
  { date: "May 7", feedbacks: 32, rewards: 64 },
  { date: "May 8", feedbacks: 28, rewards: 56 },
  ];



  useEffect(() => {
    const load = async () => {
      try {
        const all = await getAllCampaigns();
        setCampaigns(all);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [getAllCampaigns]);

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  // const featuredCampaigns = [
  //   {
  //     id: "1",
  //     title: "Fintech Mobile App Beta",
  //     description: "Test our new mobile banking app and get rewarded for your insights.",
  //     category: "Finance",
  //     reward: 25,
  //     rating: 4.8,
  //     participants: 126,
  //     image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=500",
  //     creator: "Fintech Innovations Inc.",
  //     productName: "FinApp",
  //     rewardPerResponse: 5n,
  //     maxResponses: 500n,
  //     status: "Active",
  //     duration: "3 weeks",
  //     totalResponses: 450n,
  //     active: true,
  //   },
  //   {
  //     id: "2",
  //     title: "Social Media Dashboard",
  //     description: "Help us improve our analytics dashboard for social media managers.",
  //     category: "Web Platform",
  //     reward: 20,
  //     rating: 4.5,
  //     participants: 89,
  //     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500",
  //     creator: "Data Insights Co.",
  //     productName: "Socialytics",
  //     rewardPerResponse: 4n,
  //     maxResponses: 300n,
  //     status: "Active",
  //     duration: "2 weeks",
  //     totalResponses: 250n,
  //     active: true,
  //   },
  //   {
  //     id: "3",
  //     title: "GamersDelight UI Review",
  //     description: "Review our new gaming platform UI and help us enhance user experience.",
  //     category: "Gaming",
  //     reward: 30,
  //     rating: 4.7,
  //     participants: 215,
  //     image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500",
  //     creator: "Pixel Play Studios",
  //     productName: "GamersDelight",
  //     rewardPerResponse: 6n,
  //     maxResponses: 700n,
  //     status: "Active",
  //     duration: "4 weeks",
  //     totalResponses: 600n,
  //     active: true,
  //   },
  // ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/images/flow.png"
            alt="TellnEarn Logo"
            className="h-20 w-auto animate-pulse"
            height = {100}
            width = {100}
          />
          <p className="text-tellnearn-yellow mt-4 text-lg">Loading TellnEarn...</p>
        </div>
      </div>
    );
  }


  // if (!isAuthenticated) { // Add this authentication check
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-8 p-4">
  //       <div className="text-center space-y-4 max-w-2xl">
  //         <Image
  //           src="/assets/images/flow.png"
  //           alt="TellnEarn Logo"
  //           className="h-32 w-auto mx-auto mb-6"
  //           height={150}
  //           width={150}
  //         />
  //         <h1 className="text-4xl font-bold text-tellnearn-yellow mb-4">
  //           Welcome to TellnEarn
  //         </h1>
  //         <p className="text-lg text-muted-foreground mb-8">
  //           Earn rewards for providing valuable product feedback. Connect with your
  //           Farcaster account to get started.
  //         </p>
  //         <div className="flex justify-center">
  //           <SignInButton />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (

    <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-24 pb-16">
      <Navbar username={profile?.username}/>
    <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
        <p className="text-muted-foreground mt-1">Your feedback dashboard and recent activities</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="border-tellnearn-yellow/20 text-tellnearn-yellow hover:bg-tellnearn-yellow/10">
          <Upload className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button className="bg-tellnearn-yellow hover:bg-tellnearn-yellow/90 text-black">
          Browse Campaigns
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total Earnings"
        value="$320.50"
        icon={TrendingUp}
        change="24.5%"
        positive={true}
      />
      <StatsCard
        title="Reviews Submitted"
        value="28"
        icon={Star}
        change="12%"
        positive={true}
      />
      <StatsCard
        title="Active Campaigns"
        value="15"
        icon={FileText}
        change="5"
        positive={true}
      />
      <StatsCard
        title="Community Rank"
        value="#42"
        icon={Award}
        change="8 positions"
        positive={true}
      />
    </div>

    <div className="mb-8">
      <TrendsChart data={mockTrendData} title="Your Feedback & Rewards Trend" />
    </div>

    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Popular Campaigns</h2>
        <Button variant="link" className="text-tellnearn-yellow">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {featuredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))} */}

           <h1 className="text-3xl font-bold mb-2">Available Campaigns</h1>
      <p className="text-muted-foreground mb-6">Earn USDC by giving product feedback.</p>
       <CreateCampaignForm/>

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <p>No campaigns available yet.</p>
      )}

      </div>
    </div>

    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Your Social Network</h2>
        <Button variant="link" className="text-tellnearn-yellow">
          Invite Friends
        </Button>
      </div>
      <div className="bg-secondary rounded-lg border border-border/40 p-6">
        <div className="flex items-center justify-center flex-col py-8">
          <div className="p-4 rounded-full bg-tellnearn-yellow/10 mb-4">
            <Users size={32} className="text-tellnearn-yellow" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Grow Your Network</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            Connect with friends to see their reviews and earn bonus rewards for referrals.
          </p>
          <Button className="bg-tellnearn-yellow text-black hover:bg-tellnearn-yellow/90">
            Connect Social Graph
          </Button>
        </div>
      </div>
    </div>
  </div>

  );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import { CampaignCard } from "./components/CampaignCard";
// import { useContractInteractions } from "../lib/web3";

// export default function Home() {
//   const { getAllCampaigns } = useContractInteractions();
//   const [campaigns, setCampaigns] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const all = await getAllCampaigns();
//         setCampaigns(all);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   if (loading) {
//     return <div>Loading campaigns...</div>;
//   }

//   return (
//     <main className="container mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold mb-2">Available Campaigns</h1>
//       <p className="text-muted-foreground mb-6">Earn USDC by giving product feedback.</p>

//       {campaigns.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {campaigns.map((campaign) => (
//             <CampaignCard key={campaign.id} campaign={campaign} />
//           ))}
//         </div>
//       ) : (
//         <p>No campaigns available yet.</p>
//       )}
//     </main>
//   );
// }
