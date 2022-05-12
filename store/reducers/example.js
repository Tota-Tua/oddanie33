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
  },
});

const {actions, reducer} = favoritesSlice;

export const {save, saveAll} = actions;
export default reducer;
