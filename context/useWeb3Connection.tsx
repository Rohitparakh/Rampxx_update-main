import { useAccount, useDisconnect } from 'wagmi';

export function useWeb3Connection() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return { 
    isConnected, 
    address,
    disconnect
  };
}