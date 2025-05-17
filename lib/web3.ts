/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { encodeFunctionData, parseEther } from "viem";
// import { useAccount, usePublicClient, useWalletClient } from "wagmi";
// import { readContract,writeContract,waitForTransactionReceipt } from '@wagmi/core'
// import { config } from "../app/constants/config";

// const CONTRACT_ADDRESS = "0xCca863029b884bAC7a9E882c87f22f953deE206d"; 


// export const useContract = () => {
//  // const publicClient = usePublicClient();
//   const { address } = useAccount();

//   const getNonce = async (user: string) => {
//     const result = await readContract(config, {
//       address: CONTRACT_ADDRESS,
//       abi,
//       functionName: "nonces",
//       args: [user],
//     });
//     return result;
//   };

//   const getMessageHash = async (
//     to: string,
//     amount: number,
//     message: string,
//     nonce: number
//   ) => {
//     const result = await readContract(config,{
//       address: CONTRACT_ADDRESS,
//       abi,
//       functionName: "getMessageHash",
//       args: [to, BigInt(amount), message, BigInt(nonce)],
//     });
//     return result;
//   };

//   const verifySignature = async (
//     signer: string,
//     to: string,
//     amount: number,
//     message: string,
//     nonce: number,
//     signature: `0x${string}`
//   ) => {
//     const result = await readContract(config,{
//       address: CONTRACT_ADDRESS,
//       abi,
//       functionName: "verify",
//       args: [signer, to, BigInt(amount), message, BigInt(nonce), signature],
//     });
//     return result;
//   };

//   const claimReward = async (
//     amount: number,
//     message: string,
//     signature: `0x${string}`
//   ) => {
//     const hash = await writeContract(config,{
//       address: CONTRACT_ADDRESS,
//       abi,
//       functionName: "claimReward",
//       args: [BigInt(amount), message, signature],
//       account: address!,
//     });

//     const receipt = await waitForTransactionReceipt(config,{ hash });
//     return receipt.status === "success";
//   };

//   return {
//     getNonce,
//     getMessageHash,
//     verifySignature,
//     claimReward,
//   };
// };




import abi from "../app/constants/abi.json";
import { config } from "../app/constants/config";
import { readContract } from '@wagmi/core'
import { Abi } from 'viem';

const CONTRACT_ADDRESS = "0xCA0d2E3f0504Cdce1cd323ACD8c1bEA1843Ec9fA"; // Replace with your deployed contract address

export const useContractInteractions = () => {
  //const publicClient = usePublicClient();

  const getCampaignCount = async () => {
    const count = await readContract(config,{
      address: CONTRACT_ADDRESS,
      abi: abi.abi as Abi,
      functionName: "getCampaignCount",
      args: [],
    });
    return Number(count);
  };

  const getCampaign = async (id: number) => {
    const campaign = await readContract(config,{
      address: CONTRACT_ADDRESS,
      abi: abi.abi as Abi,
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
    getCampaignCount,
    getCampaign,
    getAllCampaigns,
    
  };
};
