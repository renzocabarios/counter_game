import { ethers } from "hardhat";
import { encodeBytes32String } from "ethers";
import { deployContract, retryForever } from "./helpers";
import { IDeployContract } from "./types";

const AIRDROP_USDT = 10_000;
const USER_WALLET = "0xE0a3D6957DA940763550AeFc266614510b4082A6";

// DEV ONLY
async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();

  const start = Date.now();

  console.log("Deploying contracts with the account:", deployer.address);

  //
  const registryContractFactory = await ethers.getContractFactory("Registry");
  const deployedRegistry = await registryContractFactory.deploy(
    deployer.address,
    {
      nonce: await deployer.getNonce(),
    }
  );
  await deployedRegistry.waitForDeployment();
  console.log(
    `Registry Contract deployed to:`,
    await deployedRegistry.getAddress()
  );

  //
  const CounterGameContractFactory = await ethers.getContractFactory(
    "CounterGame"
  );
  const deployedCounterGame = await CounterGameContractFactory.deploy(
    deployer.address,
    {
      nonce: await deployer.getNonce(),
    }
  );
  await deployedCounterGame.waitForDeployment();
  console.log(
    `CounterGame Contract deployed to:`,
    await deployedCounterGame.getAddress()
  );

  //

  const contract = await ethers.getContractAt(
    "Registry",
    await deployedRegistry.getAddress()
  );
  const nonce = await deployer.getNonce();
  await contract.setContractAddress(
    encodeBytes32String("CounterGame"),
    await deployedCounterGame.getAddress(),
    { nonce }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
