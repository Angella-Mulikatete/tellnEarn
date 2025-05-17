'use client'
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToast } from "../hooks/use-toast";
import Navigation from "../components/Navbar";
import FeedbackForm from "../components/FeedbackForm";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Award, Calendar, FileImage, Share, Star, Users, FileText, FileVideo } from "lucide-react";
import Image from "next/image";

// Mock data for a single product
const mockProduct = {
  id: "1",
  title: "Fintech Mobile App Beta",
  description: "Test our new mobile banking app and get rewarded for your insights. We're looking for feedback on usability, feature suggestions, and overall experience.",
  category: "Finance",
  reward: 25,
  rating: 4.8,
  participants: 126,
  image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=500",
  company: "MoneyWise Tech",
  deadline: "2025-06-15",
  assets: [
    { type: "image", url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=500", title: "App Dashboard" },
    { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "App Walkthrough" },
    { type: "figma", url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FabcdefgSampleFigmaLink", title: "Interactive Prototype" },
  ]
};

interface ProductFeedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userImage: string;
}

// Mock feedback data
const mockFeedbacks: ProductFeedback[] = [
  {
    id: "f1",
    userName: "Alex Johnson",
    rating: 5,
    comment: "The interface is intuitive and clean. I especially like the transaction history visualization. Would be great to add a dark mode option.",
    date: "3 days ago",
    userImage: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "f2",
    userName: "Sam Wong",
    rating: 4,
    comment: "Good app overall, but I found the account linking process a bit confusing. Adding clearer instructions would help new users.",
    date: "1 week ago",
    userImage: "https://i.pravatar.cc/150?img=2",
  },
];

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product] = useState(mockProduct);
  const [feedbacks, setFeedbacks] = useState<ProductFeedback[]>(mockFeedbacks);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  

  useEffect(() => {
    // Simulate API call to fetch product data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, we would fetch the product data based on the ID
      // For now, we're using the mock data
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleFeedbackSubmit = () => {
    // In a real app, we would refresh the feedbacks list
    // For now, let's just add a mock feedback at the top
    const newFeedback: ProductFeedback = {
      id: `f${feedbacks.length + 1}`,
      userName: "You",
      rating: 5,
      comment: "This is great! I love the simplicity and clean design.",
      date: "Just now",
      userImage: "https://i.pravatar.cc/150?img=3",
    };
    
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const handleShareClick = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "You can now share this product with others.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Image 
            src="/lovable-uploads/c02f0f42-706b-43ff-ae26-f7ea82d4cd16.png" 
            alt="TellnEarn Logo"
            className="h-20 w-auto animate-pulse" 
            height={100}
            width={100}
          />
          <p className="text-tellnearn-yellow mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-24 pb-16">
        <div className="mb-6">
          <Link href="/campaigns" className="text-tellnearn-yellow hover:underline">
            &larr; Back to Campaigns
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass overflow-hidden mb-6">
              <div className="relative h-64 w-full">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover" 
                  height={100}
                  width={100}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <Badge className="mb-2 bg-tellnearn-yellow text-black">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-white">{product.title}</h1>
                  <p className="text-white/80">by {product.company}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={18} fill="currentColor" className="text-tellnearn-yellow" />
                      <span>{product.rating.toFixed(1)} rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={18} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{product.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={18} className="text-tellnearn-yellow" />
                      <span className="text-tellnearn-yellow font-semibold">${product.reward} USDC reward</span>
                    </div>
                  </div>
                  <Button variant="outline" className="border-tellnearn-yellow/20 text-tellnearn-yellow hover:bg-tellnearn-yellow/10" onClick={handleShareClick}>
                    <Share size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Deadline: {product.deadline}</span>
                  </div>
                  <p className="text-white/80">{product.description}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Tabs defaultValue="assets">
                <TabsList className="bg-secondary border border-border/40">
                  <TabsTrigger value="assets">Product Assets</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback ({feedbacks.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="assets" className="pt-4">
                  <div className="glass p-6">
                    <h3 className="text-xl font-semibold mb-4">Review These Assets</h3>
                    <div className="space-y-6">
                      {product.assets.map((asset, index) => (
                        <div key={index} className="border border-border/40 rounded-lg overflow-hidden">
                          <div className="bg-secondary p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {asset.type === "image" && <FileImage size={16} className="text-tellnearn-yellow" />}
                              {asset.type === "video" && <FileVideo size={16} className="text-tellnearn-yellow" />}
                              {asset.type === "figma" && <FileText size={16} className="text-tellnearn-yellow" />}
                              <span>{asset.title}</span>
                            </div>
                          </div>
                          <div className="bg-black/50">
                            {asset.type === "image" && (
                              <Image src={asset.url} alt={asset.title} className="w-full h-auto max-h-96 object-contain height={100} width={100}" />
                            )}
                            {asset.type === "video" && (
                              <div className="relative pt-[56.25%]">
                                <iframe
                                  src={asset.url}
                                  title={asset.title}
                                  className="absolute top-0 left-0 w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                            {asset.type === "figma" && (
                              <div className="relative pt-[56.25%]">
                                <iframe
                                  src={asset.url}
                                  title={asset.title}
                                  className="absolute top-0 left-0 w-full h-full border-0"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="feedback" className="pt-4">
                  <div className="glass p-6">
                    <h3 className="text-xl font-semibold mb-4">Community Feedback</h3>
                    {feedbacks.length > 0 ? (
                      <div className="space-y-4">
                        {feedbacks.map((feedback) => (
                          <div key={feedback.id} className="border border-border/40 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Image 
                                src={feedback.userImage} 
                                alt={feedback.userName} 
                                className="w-10 h-10 rounded-full"
                                height={100}
                                width={100}
                              />
                              <div>
                                <div className="font-medium">{feedback.userName}</div>
                                <div className="text-xs text-muted-foreground">{feedback.date}</div>
                              </div>
                            </div>
                            <div className="flex mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  size={16} 
                                  className={star <= feedback.rating ? "text-tellnearn-yellow fill-tellnearn-yellow" : "text-gray-400"} 
                                />
                              ))}
                            </div>
                            <p className="text-white/80">{feedback.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <FeedbackForm productId={product.id} productTitle={product.title} onFeedbackSubmit={handleFeedbackSubmit} />
            
            <div className="glass p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">About This Campaign</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">What We are Looking For:</h4>
                  <ul className="list-disc pl-5 text-white/80 space-y-1">
                    <li>User interface feedback</li>
                    <li>Feature suggestions</li>
                    <li>Bug reports</li>
                    <li>Overall user experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">How Rewards Work:</h4>
                  <p className="text-white/80">
                    Submit quality feedback and receive USDC rewards instantly to your connected wallet. 
                    Higher quality feedback leads to higher rewards and community recognition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
