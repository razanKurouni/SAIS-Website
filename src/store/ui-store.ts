import { create } from "zustand";

const defaultExpandedSections = {
  About: true,
  Academics: true,
  "Our Community": true,
  "Student Life": true,
} as const;

type ExpandedSections = Record<string, boolean>;

type UiStore = {
  isMenuOpen: boolean;
  searchQuery: string;
  expandedSections: ExpandedSections;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setSearchQuery: (query: string) => void;
  toggleExpandedSection: (sectionTitle: string) => void;
};

function resetExpandedSections(): ExpandedSections {
  return { ...defaultExpandedSections };
}

export const useUiStore = create<UiStore>((set) => ({
  isMenuOpen: false,
  searchQuery: "",
  expandedSections: resetExpandedSections(),
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () =>
    set({
      isMenuOpen: false,
      searchQuery: "",
      expandedSections: resetExpandedSections(),
    }),
  toggleMenu: () =>
    set((state) =>
      state.isMenuOpen
        ? {
            isMenuOpen: false,
            searchQuery: "",
            expandedSections: resetExpandedSections(),
          }
        : { isMenuOpen: true },
    ),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleExpandedSection: (sectionTitle) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [sectionTitle]: !state.expandedSections[sectionTitle],
      },
    })),
}));
