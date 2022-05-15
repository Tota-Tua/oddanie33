import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    saveAll: (state, param) => {
      const {payload} = param;
      state.favorites = [...payload];
    },
    save: (state, param) => {
      const {payload} = param;
      state.favorites = [...state.favorites, payload];
    },
    deleteFavorite: (state, param) => {
      const {payload} = param;
      const copy = state.favorites.slice();
      copy.shift();
      state.favorites = copy;
    },
  },
});

const {actions, reducer} = favoritesSlice;

export const {deleteFavorite, save, saveAll} = actions;
export default reducer;
