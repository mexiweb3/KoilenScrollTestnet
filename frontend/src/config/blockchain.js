export const BLOCKCHAIN_CONFIG = {
  // Network
  networkName: 'Scroll Sepolia',
  chainId: 534351,
  evvmId: 1083,
  rpcUrl: 'https://sepolia-rpc.scroll.io/',
  blockExplorer: 'https://sepolia.scrollscan.com',

  // Contract Addresses (Deployed on Scroll Sepolia)
  contracts: {
    koilenRegistry: '0x605d618A3D3ece7aAe6820007a5bF81649632077',
    sensorDataRegistry: '0x3ED5092ab73cc505E9a52a0DE93F00f04Bdb9268',
  },

  // Admin address
  adminAddress: '0xA1Fa6f037CaC8fFc0Be322AD2abf2c4a33989bbF',
};

export const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'supermarket', label: 'Supermarket' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'other', label: 'Other' },
];

export const EQUIPMENT_TYPES = [
  { value: 'cooler', label: 'Cooler' },
  { value: 'freezer', label: 'Freezer' },
  { value: 'refrigerator', label: 'Refrigerator' },
  { value: 'cold_room', label: 'Cold Room' },
  { value: 'display_case', label: 'Display Case' },
  { value: 'other', label: 'Other' },
];
