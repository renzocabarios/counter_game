export enum ArcadeRoutes {
  Counter = "/arcade/counter",
  Coinflip = "/arcade/coinflip",
  Dice = "/arcade/dice",
  Tasks = "/arcade/tasks",
  Referral = "/arcade/referral",
}

export const ArcadeTitles: Record<ArcadeRoutes, any> = {
  [ArcadeRoutes.Counter]: "Counter",
  [ArcadeRoutes.Coinflip]: "Coinflip",
  [ArcadeRoutes.Dice]: "Dice",
  [ArcadeRoutes.Tasks]: "Tasks",
  [ArcadeRoutes.Referral]: "Referral",
};
