export type ContractName = "CounterToken" | "CounterGame" | "Registry";

export interface IDeployContract {
  name: ContractName;
  proxy: boolean;
}
export type Network = "local" | "sepolia" | "bsc" | "polygon";
