import { create } from "zustand";

interface ClickCooldown {
  clickCount: number;
  setClickCount: () => void;
  resetClickCount: () => void;
}

export const useClickCooldownStore = create<ClickCooldown>((set) => ({
  clickCount: 0,
  setClickCount: () =>
    set((state) => ({ clickCount: state.clickCount + 1 })),
  resetClickCount: () => set(() => ({ clickCount: 0 })),
}));
