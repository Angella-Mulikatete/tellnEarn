import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { signTypedData_v4 } from "eth-sig-util"; // Import signTypedData_v4

// Replace with your trusted signer private key
const TRUSTED_SIGNER_PRIVATE_KEY = Buffer.from("YOUR_32_BYTE_PRIVATE_KEY", "hex");

const app = express();
app.use(bodyParser.json());

const nonces: { [key: string]: number } = {}; // Store per-user nonce to prevent reuse, add type

// Define a type for the EIP-712 typed data
interface TypedData {
  types: {
    EIP712Domain: { name: string; type: string }[];
    Message: { name: "to" | "amount" | "message" | "nonce"; type: "address" | "uint256" | "string" }[]; // Use literal types for names and types
  };
  primaryType: "Message"; // Use literal type for primaryType
  domain: object; // Use 'object' type instead of '{}'
  message: {
    to: string;
    amount: number;
    message: string;
    nonce: number;
  };
}

function signMessage(userAddress: string, amount: number, message: string, nonce: number): string { // Return type is string
  const typedDataContent: TypedData = { // Define the typed data object content and apply the type
    types: {
      EIP712Domain: [],
      Message: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "message", type: "string" },
        { name: "nonce", type: "uint256" }
      ]
    },
    primaryType: "Message",
    domain: {},
    message: {
      to: userAddress,
      amount,
      message,
      nonce
    }
  };

  // Call signTypedData_v4 with the correct arguments structure
  const signature = signTypedData_v4( // Use signTypedData_v4
    TRUSTED_SIGNER_PRIVATE_KEY, // Private key as first argument
    { data: typedDataContent } // Data object wrapped in { data: ... }
  );

  return signature; // Return the signature string
}

app.post("/api/sign-message", async (req: Request, res: Response): Promise<void> => {
  const { userAddress, campaignId, rewardAmount } = req.body;

  if (!userAddress || !campaignId || !rewardAmount) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Generate message and nonce
    const nonce = nonces[userAddress] ? nonces[userAddress] + 1 : 1;
    const message = `Claim ${rewardAmount} USDC for Campaign #${campaignId}`;

    // Sign message
    const signature = signMessage(userAddress, rewardAmount, message, nonce);

    // Update nonce
    nonces[userAddress] = nonce;

    res.json({
      message,
      signature: signature,
      nonce
    });

  } catch (error) {
    console.error("Error signing message:", error);
    res.status(500).json({ error: "Failed to sign message" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
