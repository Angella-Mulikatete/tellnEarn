import { createConfig, http } from '@wagmi/core'
import { base, baseSepolia } from '@wagmi/core/chains'
import {  coinbaseWallet} from '@wagmi/connectors'


export const config = createConfig({
 chains: [baseSepolia, base],
  connectors: [coinbaseWallet()],
  transports: {
    [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  },
})