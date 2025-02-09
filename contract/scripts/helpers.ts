import { ContractFactory } from "ethers";
import fs from "fs/promises";

export async function delay(delayInms: number = 2000) {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
}

export async function deployContract(
  contractFactory: ContractFactory,
  nonce: number
) {
  const deployed = await contractFactory.deploy({ nonce });
  await deployed.waitForDeployment();
  console.log(`Contract deployed to:`, await deployed.getAddress());
  return await deployed.getAddress();
}

export async function retryForever(fn: () => any) {
  return await fn().catch(async function (err: any) {
    // console.log("Retrying Deployment");
    console.log(err);
    return await retryForever(fn);
  });
}
