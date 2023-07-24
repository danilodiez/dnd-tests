import { create } from "zustand";

// This is being used to handle multiple DnD and multiple select
export const useItemsStore = create((set) => ({
  selected: [],
  setItems: ({ node, section }) =>
    set((state) => {
      let newSelected = [...state.selected];
      if (newSelected.some((selected) => selected.node === node)) {
        newSelected = newSelected.filter((selected) => selected.node !== node);
      } else {
        newSelected = [...newSelected, { node, section }];
      }
      return { selected: newSelected };
    }),
  resetStore: () => set({ selected: [] }),
}));

// Just to open Dialogs
export const useDialogStore = create((set) => ({
  isOpen: false,
  toggleDialog: (isOpen) => set((state) => ({ isOpen })),
  isConfirmationOpen: false,
  toggleConfirmationDialog: () =>
    set((state) => ({ isConfirmationOpen: !state.isConfirmationOpen })),
}));
