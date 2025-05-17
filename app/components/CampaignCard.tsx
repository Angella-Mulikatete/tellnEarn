/* eslint-disable react-hooks/rules-of-hooks */

// // import Image from "next/image";
// // import { Badge } from "../components/ui/badge";
// // import { Button } from "../components/ui/button";
// // import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
// // import { cn } from "@/lib/utils";
// // import { Award, Star, Users } from "lucide-react";
// // import Link  from "next/link";

// // interface CampaignCardProps {
// //   id: string;
// //   title: string;
// //   description: string;
// //   category: string;
// //   reward: number;
// //   rating: number;
// //   participants: number;
// //   image: string;
// //   className?: string;
// // }

// // const CampaignCard: React.FC<CampaignCardProps> = ({
// //   id,
// //   title,
// //   description,
// //   category,
// //   reward,
// //   rating,
// //   participants,
// //   image,
// //   className,
// // }) => {
// //   return (
// //     <Card className={cn("overflow-hidden card-hover bg-secondary border-border/40", className)}>
// //       <div className="relative h-40 w-full">
// //         <Image 
// //           src={image} 
// //           alt={title} 
// //           className="w-full h-full object-cover" 
// //           height={100}
// //           width={100}
// //         />
// //         <Badge className="absolute top-2 right-2 bg-tellnearn-yellow text-black font-medium">
// //           {category}
// //         </Badge>
// //       </div>
// //       <CardHeader className="pb-2">
// //         <h3 className="text-lg font-semibold text-white">{title}</h3>
// //         <div className="flex items-center gap-1 text-tellnearn-yellow">
// //           <Star size={16} fill="currentColor" />
// //           <span className="text-sm">{rating.toFixed(1)}</span>
// //         </div>
// //       </CardHeader>
// //       <CardContent className="pb-2">
// //         <p className="text-sm text-white/70 line-clamp-2">{description}</p>
// //         <div className="flex items-center gap-2 mt-2">
// //           <div className="flex items-center gap-1 text-white/70 text-xs">
// //             <Users size={14} />
// //             <span>{participants} participants</span>
// //           </div>
// //           <div className="flex items-center gap-1 text-tellnearn-yellow text-xs">
// //             <Award size={14} />
// //             <span>${reward} USDC</span>
// //           </div>
// //         </div>
// //       </CardContent>
// //       <CardFooter>
// //         <Link href={`/product/${id}`} className="w-full">
// //           <Button 
// //             className="w-full bg-gradient-to-r from-tellnearn-yellow to-tellnearn-yellow-light hover:opacity-90 text-black font-medium"
// //           >
// //             Give Feedback
// //           </Button>
// //         </Link>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default CampaignCard;




// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import FeedbackForm from "./FeedbackForm";

// interface Campaign {
//   id: number;
//   creator: string;
//   productName: string;
//   description: string;
//   productLink?: string;
//   rewardPerResponse: bigint;
//   maxResponses: bigint;
//   totalResponses: bigint;
//   active: boolean;
// }

// export default function CampaignCard({ campaign }: { campaign?: Campaign | null }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Conditionally render the component only if campaign is defined
//   if (!campaign) {
//     return null; // Or a loading/skeleton state
//   }

//   const rewardInUSDC = Number(campaign.rewardPerResponse) / 1e6; // Convert from USDC decimals
//   //const remaining = Number(campaign.maxResponses) - Number(campaign.totalResponses);

//   return (
//     <>
//       <div className="bg-secondary border border-border/40 rounded-xl overflow-hidden transition-all hover:border-tellnearn-yellow/50">
//         <Image src="/campaign.jpg" alt={campaign.productName} width={500} height={300} className="w-full h-48 object-cover" />
//         <div className="p-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="font-bold text-white">{campaign.productName}</h3>
//               <p className="text-sm text-muted-foreground">{campaign.description}</p>
//             </div>
//             <span className="text-xs px-2 py-1 bg-tellnearn-yellow/10 text-tellnearn-yellow rounded">
//               Product
//             </span>
//           </div>
//           <div className="mt-4 flex justify-between items-center">
//             <div className="text-sm">
//               <span className="text-tellnearn-yellow">${rewardInUSDC}</span> per review
//             </div>
//             <Button size="sm" onClick={() => setIsModalOpen(true)}>
//               Give Feedback
//             </Button>
//           </div>
//         </div>
//       </div>

//       <FeedbackForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         campaignId={campaign.id}
//         rewardAmount={rewardInUSDC}
//       />
//     </>
//   );
// };





// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import FeedbackForm from "./FeedbackForm";

// interface Campaign {
//   id: number;
//   creator: string;
//   productName: string;
//   description: string;
//   productLink?: string;
//   rewardPerResponse: bigint;
//   maxResponses: bigint;
//   totalResponses: bigint;
//   active: boolean;
// }

// export default function CampaignCard({ campaign }: { campaign: Campaign }) {
//   const rewardInUSDC = Number(campaign.rewardPerResponse) / 1e6; // Convert from USDC decimals

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div className="bg-secondary border border-border/40 rounded-xl overflow-hidden transition-all hover:border-tellnearn-yellow/50">
//         <Image src="/campaign.jpg" alt={campaign.productName} width={500} height={300} className="w-full h-48 object-cover" />
//         <div className="p-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="font-bold text-white">{campaign.productName}</h3>
//               <p className="text-sm text-muted-foreground">{campaign.description}</p>
//             </div>
//             <span className="text-xs px-2 py-1 bg-tellnearn-yellow/10 text-tellnearn-yellow rounded">
//               Product
//             </span>
//           </div>
//           <div className="mt-4 flex justify-between items-center">
//             <div className="text-sm">
//               <span className="text-tellnearn-yellow">${rewardInUSDC}</span> per review
//             </div>
//             <Button size="sm" onClick={() => setIsModalOpen(true)}>
//               Give Feedback
//             </Button>
//           </div>
//         </div>
//       </div>

//       <FeedbackForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         campaignId={campaign.id}
//         rewardAmount={rewardInUSDC}
//       />
//     </>
//   );
// };




"use client";

import React, { useState } from "react";
import Image from "next/image";
import FeedbackFormModal from "./FeedbackForm";
import { Button } from "../components/ui/button";

export interface Campaign {
  id: string;
  creator: string;
  productName: string;
  description: string;
  productLink?: string;
  rewardPerResponse: bigint;
  maxResponses: bigint;
  totalResponses: bigint;
  active: boolean;
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  if (!campaign) {
    return null; // Handle case where campaign is undefined
  }
  const rewardInUSDC = Number(campaign.rewardPerResponse) / 1e6;
  //const remaining = Number(campaign.maxResponses) - Number(campaign.totalResponses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-secondary border border-border/40 rounded-xl overflow-hidden transition-all hover:border-tellnearn-yellow/50">
        <Image src="/campaign.jpg" alt={campaign.productName} width={500} height={300} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white">{campaign.productName}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-tellnearn-yellow/10 text-tellnearn-yellow rounded">
              Product
            </span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-tellnearn-yellow">${rewardInUSDC}</span> per review
            </div>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              Give Feedback
            </Button>
          </div>
        </div>
      </div>

      <FeedbackFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaignId={Number(campaign.id)}
        rewardAmount={rewardInUSDC}
      />
    </>
  );
}
