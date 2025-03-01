import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APOLLO_CLIENT } from "./constants";
import { gql } from "@apollo/client";
import { Address } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GET_CONTRACT = gql(`
  query Contract($contractName: String) {
    registryContract(id: $contractName) {
      blockNumber
      address
      blockTimestamp
      id
      transactionHash
    }
  }
`);

export async function getContractAddress(contractName: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_CONTRACT,
    variables: { contractName },
  });

  return data.registryContract.address as Address;
}

export const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const diffInMs = now.getTime() - pastDate.getTime();
  
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};
