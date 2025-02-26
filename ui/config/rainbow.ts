import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { coreTestnet } from './networks/core.testnet';

export const wagmiConfig = getDefaultConfig({
  appName: 'testo',
  projectId: 'bc7f202ceec67920b18ce1b42e6d715a',
  chains: [coreTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});