import { create } from "zustand";

type ToggleTypeState = {
  toggleType: string | null | boolean;
  setToggleType: (toggleType: string | null | boolean) => void;
};

export const useToggleTypeStore = create<ToggleTypeState>((set) => ({
  toggleType: null,
  setToggleType: (toggleType) => set({ toggleType }),
}));
