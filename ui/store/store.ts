import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { IOnboardingStore, onboardingStore } from "./onboarding.store";

type IStore = IOnboardingStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...onboardingStore(...state),
}));

export const useStore = createSelectors(useStoreBase);
