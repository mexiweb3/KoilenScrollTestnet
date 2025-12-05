import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

/**
 * Hook para gestionar la conexión a la wallet (MetaMask)
 */
export function useWallet() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setError('Por favor instala MetaMask');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length > 0) {
        await connectWallet();
      }
    } catch (err) {
      console.error('Error checking wallet:', err);
      setError(err.message);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        setError('Por favor instala MetaMask');
        setLoading(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Create provider and signer
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(Number(network.chainId));
      setIsConnected(true);
      setError(null);

      // Check if on correct network
      if (Number(network.chainId) !== BLOCKCHAIN_CONFIG.chainId) {
        await switchNetwork();
      }

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      setLoading(false);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${BLOCKCHAIN_CONFIG.chainId.toString(16)}` }],
      });
    } catch (switchError) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${BLOCKCHAIN_CONFIG.chainId.toString(16)}`,
            chainName: BLOCKCHAIN_CONFIG.networkName,
            rpcUrls: [BLOCKCHAIN_CONFIG.rpcUrl],
            blockExplorerUrls: [BLOCKCHAIN_CONFIG.blockExplorer],
          }],
        });
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setChainId(null);
  };

  return {
    account,
    provider,
    signer,
    isConnected,
    chainId,
    error,
    loading,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
}
