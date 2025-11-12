import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavouriteTrack {
  name: string;
  artist: string;
}

interface FavouritesState {
  favourites: Set<FavouriteTrack>;
  isFavourite: (track: FavouriteTrack) => boolean;
  toggleFavourite: (track: FavouriteTrack) => void;
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: new Set(),
      isFavourite: (track: FavouriteTrack) => Array.from(get().favourites).some((f) => f.name === track.name && f.artist === track.artist),
      toggleFavourite: (track: FavouriteTrack) =>
        set((state) => {
          const newFavourites = new Set(state.favourites);
          const existing = Array.from(newFavourites).find((f) => f.name === track.name && f.artist === track.artist);
          if (existing) {
            newFavourites.delete(existing);
          } else {
            newFavourites.add(track);
          }
          return { favourites: newFavourites };
        }),
    }),
    {
      name: 'favourites-storage',
      partialize: (state) => ({ favourites: Array.from(state.favourites) }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.favourites = new Set(state.favourites);
        }
      },
    },
  ),
);
