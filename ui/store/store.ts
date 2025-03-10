import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { IOnboardingStore, onboardingStore } from "./onboarding.store";
import { coinFlipStore, ICoinFlipStore } from "./coin-flip.store";

type IStore = IOnboardingStore & ICoinFlipStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...onboardingStore(...state),
  ...coinFlipStore(...state),
}));

export const useStore = createSelectors(useStoreBase);
