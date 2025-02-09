import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    core_testnet: {
      url: "https://rpc.test2.btcs.network",
      accounts: [
        "0x8e3ea29ba23bb2852d21a13ab289ffb73e68eb479b41a74b074a59a5cd17ab8c",
      ],
    },
  },

  etherscan: {
    apiKey: {
      core_testnet: "4c18edb883934f1a9f01e5c2827da819",
    },
    customChains: [
      {
        network: "core_testnet",
        chainId: 1114,
        urls: {
          apiURL: "https://scan.test2.btcs.network/api/",
          browserURL: "https://scan.test2.btcs.network/",
        },
      },
    ],
  },
};

export default config;
