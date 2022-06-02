import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    updateRetreatList: 0,
  },
  reducers: {
    save: (state, param) => {
      const {payload: newFavorite} = param;
      state.items.push(newFavorite);
    },
    remove: (state, param) => {
      const {payload: toBeDeletedItem} = param;
      const stringifyToBeDeletedItem = JSON.stringify(toBeDeletedItem);
      let foundIndex;
      state.items.some((item, index) => {
        if (JSON.stringify(item) === stringifyToBeDeletedItem) {
          foundIndex = index;
          return true;
        }
      });
      if (foundIndex !== undefined) {
        state.items.splice(foundIndex, 1);
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

export const {remove, save, updateRetreatList} = actions;
export default reducer;
