export enum EArcadeRoutes {
  Counter = "/arcade/counter",
  Coinflip = "/arcade/coinflip",
  Dice = "/arcade/dice",
  Tasks = "/arcade/tasks",
  Referral = "/arcade/referral",
  Onboarding = "/arcade/onboarding",
  Faucet = "/arcade/faucet",
  Swap = "/arcade/token-swap",
}

export const ArcadeTitles: Record<EArcadeRoutes, any> = {
  [EArcadeRoutes.Counter]: "Counter",
  [EArcadeRoutes.Coinflip]: "Coinflip",
  [EArcadeRoutes.Dice]: "Dice",
  [EArcadeRoutes.Tasks]: "Tasks",
  [EArcadeRoutes.Referral]: "Referral",
  [EArcadeRoutes.Onboarding]: "CorePlay",
  [EArcadeRoutes.Faucet]: "Faucet",
  [EArcadeRoutes.Swap]: "Swap",
};

export enum EGameType {
  Counter = "counter",
  Coinflip = "coinflip",
  Dice = "dice",
}
