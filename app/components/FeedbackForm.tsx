import { useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Award, Star } from "lucide-react";

// Wagmi hooks
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import abiJson from "../constants/abi.json";
import { config } from "../constants/config";
//import { CONTRACT_ADDRESS } from "../constants/addresses";

// Define schema
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, "Feedback must be at least 10 characters").max(500, "Feedback must be less than 500 characters")
});

const CONTRACT_ADDRESS = "0xCA0d2E3f0504Cdce1cd323ACD8c1bEA1843Ec9fA"; // Replace with your contract address

type FeedbackValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number; // Must be a number
  rewardAmount: number;
}

export default function FeedbackForm({ isOpen, onClose, campaignId, rewardAmount }: FeedbackFormProps) {
  const { address } = useAccount();
  const { toast } = useToast(); // Moved inside the component
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null); // null = not checked yet

  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  const { writeContractAsync } = useWriteContract();

  const fetchClaimStatus = async () => {
    try {
      const response = await fetch(`/api/verify-signature?userAddress=${address}&campaignId=${campaignId}`);
      const data = await response.json();

      if (response.ok && data.claimed) {
        setHasClaimed(true);
      } else {
        setHasClaimed(false);
      }
    } catch (error) {
      console.error("Error checking claim status:", error);
      setHasClaimed(false);
    }
  };

  useEffect(() => {
    if (isOpen && address) {
      fetchClaimStatus();
    }
  }, [isOpen, address]);

  const handleStarClick = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  const onSubmit = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit feedback and claim rewards.",
        variant: "destructive"
      });
      return;
    }

    if (hasClaimed) {
      toast({
        title: "Already Claimed",
        description: "You have already submitted feedback for this campaign.",
        variant: "default"
      });
      return;
    }

    try {
      // Step 1: Send POST to sign-message API
      const signResponse = await fetch('/api/sign-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userAddress: address,
          campaignId,
          rewardAmount,
        })
      });

      const signData = await signResponse.json();

      if (!signData.success) {
        throw new Error(signData.error || 'Failed to get signed message');
      }

      const { message, amount, signature } = signData;

      // Step 2: Call claimReward via contract
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: abiJson.abi,
        functionName: 'claimReward',
        args: [
          BigInt(amount),
          message,
          signature
        ],
      });

      // Wait for transaction receipt
      const receipt = await waitForTransactionReceipt(config,{
        hash: txHash
      });

      if (receipt.status === 'success') {
        toast({
          title: "Feedback submitted!",
          description: `You received ${rewardAmount} USDC.`,
          variant: "default"
        });
        form.reset();
        setRating(0);
        setHasClaimed(true); // Update UI instantly
        onClose();
      } else {
        toast({
          title: "Transaction failed",
          description: "Please try again later.",
          variant: "destructive"
        });
      }

    } catch (err: unknown) {
      console.error('Submission error:', err instanceof Error ? err.message : String(err));
      toast({
        title: "Error submitting feedback",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="glass p-6">
      <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>

      {hasClaimed ? (
        <div className="text-center py-6 text-green-500">
          ✅ You have already claimed this reward.
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Rating Stars */}
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <Star
                      size={24}
                      className={`${star <= rating ? "text-tellnearn-yellow fill-tellnearn-yellow" : "text-gray-400"}`}
                    />
                  </button>
                ))}
              </div>
              {form.formState.errors.rating && (
                <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>
              )}
            </FormItem>

            {/* Feedback Input */}
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts on this product..."
                      className="h-32 resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-tellnearn-yellow">
                <Award size={18} />
                <span className="text-sm font-semibold">Earn {rewardAmount} USDC for quality feedback</span>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || Boolean(hasClaimed)}
                className={`bg-tellnearn-yellow hover:bg-tellnearn-yellow/90 text-black`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : hasClaimed
                  ? "Already Claimed"
                  : "Submit Feedback & Earn"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
