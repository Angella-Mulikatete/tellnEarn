import React, {useMemo, useCallback, useState } from 'react'
import {
    Name,
    Identity,
    Address,
    Avatar,
    EthBalance,
  } from "@coinbase/onchainkit/identity";
  import {
    useMiniKit,
    useAddFrame,
  } from "@coinbase/onchainkit/minikit";
  import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
  } from "@coinbase/onchainkit/wallet";
  import { Button } from "./ui/button";
  import { Icon } from "./DemoComponents";
 // import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  const { context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
 
   const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          //icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);



  return (
    <div className="flex justify-between items-center mb-3 h-11">
        <div>
        <div className="flex items-center space-x-2">
            <Wallet className="z-10">
            <ConnectWallet>
                <Name className="text-inherit" />
            </ConnectWallet>
            <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
            </WalletDropdown>
            </Wallet>
        </div>
        </div>
        <div>{saveFrameButton}</div>
    </div>
  )
}

export default WalletConnect
