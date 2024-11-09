import { create } from "zustand";

interface ClickCooldown {
  clickCount: number;
  cooldown: number;
  incrementClickCount: () => void;
  resetClickCount: () => void;
  startCooldown: () => void;
  decrementCooldown: () => void;
}

export const useClickCooldownStore = create<ClickCooldown>((set) => ({
  clickCount: 0,
  cooldown: 0,
  incrementClickCount: () =>
    set((state) => ({ clickCount: state.clickCount + 1 })),
  resetClickCount: () => set({ clickCount: 0 }),
  startCooldown: () => set({ cooldown: 60 }),
  decrementCooldown: () =>
    set((state) => ({ cooldown: state.cooldown > 0 ? state.cooldown - 1 : 0 })),
}));
