import { create } from "zustand";

// export const useItemsStore = create((set) => ({
//   selected: { items: [{ node, section }] },
//   setItems: (node, section) =>
//     set((state) => ({ selected: { ...state.selected, items, sections } })),
//   resetStore: () => set({ items: [], section: [] }),
// }));

export const useItemsStore = create((set) => ({
  selected: [],
  setItems: ({node, section}) =>
    set((state) => {
    let newSelected = [...state.selected];
    if (newSelected.some((selected) => selected.node === node)) {
      newSelected = newSelected.filter((selected) => selected.node !== node);
    } else {
      newSelected = [...newSelected, { node, section }];
    }
      return { selected: newSelected};
    }),
  resetStore: () => set({ selected: [] }),
}));
