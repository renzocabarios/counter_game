import { StateCreator } from "zustand";

export enum CoinFlipType {
  HEADS = "HEADS",
  TAILS = "TAILS",
}

export enum CoinFlipStatus {
  WON = "WON",
  LOSE = "LOSE",
}

interface IState {
  coinFlipSessionId?: number | null | undefined;
  coinFlipGuess: CoinFlipType;
  coinFlipHouseGuess: CoinFlipType;
  // TODO: add types
  coinFlipFlips: any[];
  coinFlipCurrentBet: number;
}

const initialState: IState = {
  coinFlipSessionId: undefined,
  coinFlipGuess: CoinFlipType.HEADS,
  coinFlipHouseGuess: CoinFlipType.HEADS,
  coinFlipFlips: [],
  coinFlipCurrentBet: 0,
};

interface IActions {
  setCoinFlipSessionId: (value: number | null | undefined) => void;
  setCoinFlipGuess: (value: CoinFlipType) => void;
  setCoinFlipHouseGuess: (value: CoinFlipType) => void;
  setCoinFlipFlips: (value: any[]) => void;
  setCoinFlipCurrentBet: (value: number) => void;
}

export type ICoinFlipStore = IState & IActions;

export const coinFlipStore: StateCreator<ICoinFlipStore> = (set) => ({
  setCoinFlipCurrentBet: (value) => set(() => ({ coinFlipCurrentBet: value })),
  setCoinFlipFlips: (value) => set(() => ({ coinFlipFlips: value })),
  setCoinFlipHouseGuess: (value) => set(() => ({ coinFlipHouseGuess: value })),
  setCoinFlipGuess: (value) => set(() => ({ coinFlipGuess: value })),
  setCoinFlipSessionId: (value) => set(() => ({ coinFlipSessionId: value })),
  ...initialState,
});
