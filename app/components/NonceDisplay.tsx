"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useContract } from "../../lib/web3";

export default function NonceDisplay() {
  const { address } = useAccount();
  const { getNonce } = useContract();
  const [nonce, setNonce] = useState<bigint | null>(null);

  useEffect(() => {
    if (address) {
      getNonce(address).then((nonce) => setNonce(nonce as bigint));
    }
  }, [address, getNonce]);

  return (
    <div>
      <p>Your Nonce: {nonce?.toString()}</p>
    </div>
  );
}
