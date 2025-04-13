import { create } from "zustand";

type CurrentQueryStore = {
  currentQuery: string;
  setCurrentQuery: (currentQuery: string) => void;
};

export const useCurrentQueryStore = create<CurrentQueryStore>((set) => ({
  currentQuery: "gabrielcordeiro-dev",
  setCurrentQuery: (currentQuery) => set({ currentQuery }),
}));
