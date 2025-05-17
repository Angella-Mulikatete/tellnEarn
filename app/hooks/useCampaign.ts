/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCampaigns.ts
import { readContract} from "@wagmi/core";

import {abi} from "../constants/abi.json";
import { config } from "../constants/config";

const CONTRACT_ADDRESS = "0xB4c8bA6F750ABD0C94Ea4c4d25501D7A03612e7A"; // Replace with your deployed address

export const useCampaigns = () => {
  //const publicClient = usePublicClient();

  const getCampaignCount = async () => {
    const count = await readContract(config,{
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "getCampaignCount",
      args: [],
    });
    return Number(count);
  };

  const getCampaign = async (id: number) => {
    const campaign = await readContract(config,{
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "getCampaign",
      args: [BigInt(id)],
    });
    return campaign as any;
  };

  const getAllCampaigns = async () => {
    const count = await getCampaignCount();
    const campaigns = [];

    for (let i = 0; i < count; i++) {
      const campaign = await getCampaign(i);
      campaigns.push({ ...campaign, id: i });
    }

    return campaigns;
  };

  return {
    getAllCampaigns,
    getCampaignCount,
    getCampaign
  };
};