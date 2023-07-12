import { create } from "zustand";

export const useItemsStore = create((set) => ({
  selected: { items: [], sections: [] },
  setItems: (items, sections) =>
    set((state) => ({ selected: { ...state.selected, items, sections } })),
  resetStore: () => set({ items: [], section: [] }),
}));
