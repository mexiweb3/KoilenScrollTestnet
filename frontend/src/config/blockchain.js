// Blockchain configuration for Koilen Web3

export const BLOCKCHAIN_CONFIG = {
  // Network
  networkName: 'Scroll Sepolia',
  chainId: 534351,
  rpcUrl: 'https://sepolia-rpc.scroll.io/',
  blockExplorer: 'https://sepolia.scrollscan.com',

  // Contract Addresses (UPDATE AFTER DEPLOYMENT)
  contracts: {
    koilenRegistry: '0x...', // Update with deployed address
    sensorDataRegistry: '0x...', // Update with deployed address
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
