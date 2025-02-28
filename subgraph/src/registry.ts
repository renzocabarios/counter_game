import { RegisterContract as RegisterContractEvent } from "../generated/Registry/Registry";
import { RegistryContract } from "../generated/schema";
import { bytes32ToString } from "./helpers";

export function handleRegisterContract(event: RegisterContractEvent): void {
  let entity = new RegistryContract(bytes32ToString(event.params.name));
  entity.address = event.params.contractAddress;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
