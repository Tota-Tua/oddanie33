import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    updateRetreatList: 0,
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
    remove: (state, param) => {
      const {payload: toBeDeletedItem} = param;
      const stringifyToBeDeletedItem = JSON.stringify(toBeDeletedItem);
      let foundIndex;
      state.favorites.some((item, index) => {
        if (JSON.stringify(item) === stringifyToBeDeletedItem) {
          foundIndex = index;
          return true;
        }
      });
      if (foundIndex !== undefined) {
        const copy = state.favorites.slice();
        copy.splice(foundIndex, 1);
        state.favorites = copy;
      } else {
        console.error('Cannot remove a favorite item');
      }
    },
    updateRetreatList: state => {
      state.updateRetreatList++;
    },
  },
});

const {actions, reducer} = favoritesSlice;

export const {remove, save, saveAll, updateRetreatList} = actions;
export default reducer;
