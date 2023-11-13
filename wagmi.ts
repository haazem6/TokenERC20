import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";

// Configuring the supported blockchain networks (chains)
// In this example, multiple networks including Goerli, Mainnet, Polygon, Optimism, and Arbitrum are included
const chains = [goerli, mainnet, polygon, optimism, arbitrum];

// Creating a Wagmi client using the specified configurations
export const client = createClient(
  getDefaultClient({
    autoConnect: true, // Automatically connect to the blockchain
    appName: "Token ERC-20", // Name of the application
    chains, // Array of supported blockchain networks
  })
);
