export enum EArcadeRoutes {
  Counter = "/arcade/counter",
  Coinflip = "/arcade/coinflip",
  Dice = "/arcade/dice",
  Tasks = "/arcade/tasks",
  Referral = "/arcade/referral",
  Onboarding = "/arcade/onboarding",
}

export const ArcadeTitles: Record<EArcadeRoutes, any> = {
  [EArcadeRoutes.Counter]: "Counter",
  [EArcadeRoutes.Coinflip]: "Coinflip",
  [EArcadeRoutes.Dice]: "Dice",
  [EArcadeRoutes.Tasks]: "Tasks",
  [EArcadeRoutes.Referral]: "Referral",
  [EArcadeRoutes.Onboarding]: "CorePlay",
};

export enum EGameType {
  Counter = "counter",
  Coinflip = "coinflip",
  Dice = "dice",
}
