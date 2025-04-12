import { create } from "zustand";

type QueryStore = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const useQueryStore = create<QueryStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
