/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
// server.ts
import express, { Request, Response } from 'express';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { ethers } from 'ethers';

// Type Definitions
type UserNonces = Map<number, number>; // fid -> nonce

interface FrameValidation {
  valid: boolean;
  user: {
    verifiedAddresses: {
      eth_address: string;
    };
  };
}

interface VerifyActionRequest {
  fid: number;
  actionHash: string;
}

interface VerifyActionResponse {
  amount: string;
  nonce: number;
  signature: string;
  userAddress: string;
}

interface ErrorResponse {
  error: string;
}

// Initialize Express
const app = express();
app.use(express.json());

// Config (validate env vars)
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
if (!NEYNAR_API_KEY) throw new Error('NEYNAR_API_KEY is required');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error('PRIVATE_KEY is required');
const RPC_URL = process.env.ALCHEMY_SEPOLIA_BASE_URL;
if (!RPC_URL) throw new Error('BASE_RPC_URL is required');

// Contract addresses (should be in env vars)
const CONTRACT_ADDRESS = '0x...'; 
const NFT_CONTRACT_ADDRESS = '0x...';

// Initialize clients
const neynar = new NeynarAPIClient({ apiKey: NEYNAR_API_KEY });
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Track used nonces
const userNonces: UserNonces = new Map();

// Endpoint to verify Farcaster action and generate signature
app.post('/verify-action', async (req: Request<{}, {}, VerifyActionRequest>, res: Response<VerifyActionResponse | ErrorResponse>) => {
  const { fid, actionHash } = req.body;
  
  try {
    // Verify action with Neynar
    const validation = await neynar.validateFrameAction({ messageBytesInHex: actionHash }) as unknown as FrameValidation;
    if (!validation.valid) throw new Error('Invalid action');

    if (!validation.user?.verifiedAddresses?.eth_address) {
      throw new Error('No verified Ethereum address found');
    }

    // Get user's current nonce (default to 0)
    const nonce = userNonces.get(fid) ?? 0;
    
    // Create message hash
    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'uint256', 'string', 'uint256'],
      [
        validation.user.verifiedAddresses.eth_address, 
        ethers.parseEther('0.1').toString(), 
        'fc-action', 
        nonce
      ]
    );

    // Sign message
    const signature = await signer.signMessage(ethers.getBytes(messageHash));

    // Update nonce
    userNonces.set(fid, nonce + 1);

    const response: VerifyActionResponse = {
      amount: ethers.parseEther('0.1').toString(),
      nonce,
      signature,
      userAddress: validation.user.verifiedAddresses.eth_address
    };

    res.json(response);
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: errorMessage });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});