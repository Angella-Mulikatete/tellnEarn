// /* eslint-disable @typescript-eslint/no-unused-vars */
// // components/FarcasterAction.tsx
// 'use client';
// import { useSignMessage, useAccount } from 'wagmi';
// import { useProfile } from '@farcaster/auth-kit';

// export default function FarcasterAction() {
//   const { isAuthenticated, profile } = useProfile();
//   const { address } = useAccount();
//   const { signMessageAsync } = useSignMessage();

//   const handleAction = async () => {
//     try {
//       // 1. Get signature from backend
//       const response = await fetch('/api/verify-action', {
//         method: 'POST',
//         body: JSON.stringify({ fid: profile?.fid })
//       });
      
//       const { amount, nonce, signature, userAddress } = await response.json();

//       // 2. Claim reward
//       const contract = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         ReviewRewardABI,
//         signer
//       );
      
//       const tx = await contract.claimReward(
//         amount,
//         'fc-action',
//         signature,
//         { value: amount }
//       );
      
//       await tx.wait();

//       // 3. Optional: Mint NFT
//       const nftContract = new ethers.Contract(
//         NFT_CONTRACT_ADDRESS,
//         NFTABI,
//         signer
//       );
      
//       const mintTx = await nftContract.mint(address, Date.now());
//       await mintTx.wait();

//     } catch (error) {
//       console.error('Action failed:', error);
//     }
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <button 
//           onClick={handleAction}
//           className="fc-action-button"
//         >
//           Perform Verified Action 🚀
//         </button>
//       ) : (
//         <SignInButton />
//       )}
//     </div>
//   );
// }
