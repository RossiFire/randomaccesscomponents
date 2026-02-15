import { create } from 'zustand'

interface NoisyBackgroundState {
  active: boolean;
  isAnimationActive: boolean;
  opacity: number;
}

type NoisyBackgroundStore = NoisyBackgroundState & {
  updateData: (data: Partial<NoisyBackgroundState>) => void;
}

const useNoisyBackgroundStore = create<NoisyBackgroundStore>((set) => ({
  active: true,
  isAnimationActive: true,
  opacity: 0.2,
  updateData: (data) => set((state) => ({ ...state, ...data })),
}))

export default useNoisyBackgroundStore;