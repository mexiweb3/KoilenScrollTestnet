
import { ethers } from 'ethers';

const RPC_URL = 'https://sepolia-rpc.scroll.io/';
const CONTRACT_ADDRESS = '0xCf4DD864249e0c7f1F7a2c9e317c9Cd11D3FBbCe';

const ABI = [
    "function getTotalClients() view returns (uint256)",
    "function getAllClients() view returns (tuple(uint256 id, address wallet, string businessName, string email, string phoneNumber, bool isActive, uint256 createdAt, uint256 updatedAt)[])",
    "function walletToClientId(address) view returns (uint256)",
    "function getClientBusinessUnits(uint256) view returns (tuple(uint256 id, uint256 clientId, string name, string location, string businessType, string contactName, string contactPhone, string contactEmail, bool isActive, uint256 createdAt, uint256 updatedAt)[])"
];

async function main() {
    console.log(`Connecting to ${RPC_URL}...`);
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    console.log(`Checking contract at ${CONTRACT_ADDRESS}...`);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    try {
        const clientId = 1; // We know the client ID is 1 from previous steps
        console.log(`Fetching business units for Client ID: ${clientId}...`);

        const units = await contract.getClientBusinessUnits(clientId);
        console.log(`Found ${units.length} Business Units:`);

        units.forEach(u => {
            console.log(`- ID: ${u.id}, Name: "${u.name}", Location: ${u.location}`);
        });

    } catch (error) {
        console.error("Error reading contract:", error);
    }
}

main();
