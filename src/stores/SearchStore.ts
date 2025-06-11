import { create } from 'zustand';

type SearchStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const useSearchStore = create<SearchStore>()((set) => ({
  searchTerm: '',
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));

export default useSearchStore;
