import { Buffer } from 'buffer';
import { signTypedData } from 'viem/accounts';
import mongoose from 'mongoose';
import Signature from '../../../utils/models/sign-message'; // Adjust path if needed
import { NextRequest } from 'next/server'; // Import NextRequest

// Define the types for EIP-712
const MessageTypes = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Message: [
    { name: 'to', type: 'address' },
    { name: 'amount', type: 'uint256' },
    { name: 'message', type: 'string' },
    { name: 'nonce', type: 'uint256' },
  ],
} as const; // Use 'as const' for literal types

// Load private key from environment variables
const TRUSTED_SIGNER_PRIVATE_KEY = process.env.TRUSTED_SIGNER_PRIVATE_KEY
  ? Buffer.from(process.env.TRUSTED_SIGNER_PRIVATE_KEY.replace(/^0x/, ''), 'hex')
  : Buffer.alloc(0);

export async function POST(request: NextRequest) { // Use NextRequest and export named POST
  const { userAddress, campaignId, rewardAmount } = await request.json(); // Get body from request.json()

  if (!userAddress || !campaignId || !rewardAmount) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 }); // Use Response.json
  }

  try {
    // Connect to MongoDB (should ideally use a global connection or a connection helper)
    // For now, keeping it here as it was in the original code, but note this is inefficient
    await mongoose.connect(process.env.MONGODB_URI!);

    // Check if user already claimed this campaign
    const existingClaim = await Signature.findOne({ userAddress, campaignId });

    if (existingClaim) {
      return Response.json({ error: 'Already claimed' }, { status: 400 }); // Use Response.json
    }

    // Generate unique message
    const message = `Claim ${rewardAmount} USDC for Campaign #${campaignId}`;
    const amountInUSDC = BigInt(rewardAmount * 1e6); // Assuming USDC has 6 decimals

    // Generate a dummy nonce — replace with DB-based nonces later
    const nonce = Math.floor(Math.random() * 1000000);

    // Define EIP-712 Typed Data
    const typedData = {
      primaryType: 'Message',
      domain: {
        name: 'ReviewReward',
        version: '1',
        chainId: 8453n,
        verifyingContract: process.env.CONTRACT_ADDRESS as `0x${string}`,
      },
      message: {
        to: userAddress as `0x${string}`,
        amount: amountInUSDC,
        message,
        nonce: BigInt(nonce),
      },
    };

    // Sign the message
    const signature = await signTypedData({
      privateKey: `0x${TRUSTED_SIGNER_PRIVATE_KEY.toString('hex')}`,
      domain: typedData.domain,
      types: MessageTypes, // Use the defined MessageTypes constant
      primaryType: 'Message',
      message: typedData.message,
    });

    // Save to MongoDB
    // Reusing the connection from the initial connect call
    await Signature.create({
      userAddress,
      campaignId,
      rewardAmount,
      messageHash: typedData.message.message,
      signature,
      nonce,
    });

    // Return response
    return Response.json({ // Use Response.json
      success: true,
      message,
      amount: amountInUSDC.toString(),
      signature,
      nonce,
    }, { status: 200 });
  } catch (error) {
    console.error('Error signing message:', error);
    return Response.json({ success: false, error: 'Failed to sign message' }, { status: 500 }); // Use Response.json
  }
}

// No default export
