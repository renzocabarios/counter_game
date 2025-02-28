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
