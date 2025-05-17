/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useContract } from "../../lib/web3";

export default function RewardClaimForm() {
  const { address } = useAccount();
  const { claimReward } = useContract();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const handleClaim = async () => {
    try {
      const success = await claimReward(
        parseInt(amount),
        message,
        signature as `0x${string}`
      );
      alert(success ? "Reward claimed!" : "Failed");
    } catch (e) {
      console.error(e);
      alert("Error claiming reward");
    }
  };

  return (
    <div>
      <h2>Claim Reward</h2>
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        placeholder="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={handleClaim}>Claim</button>
    </div>
  );
}