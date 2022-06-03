import {createSlice} from '@reduxjs/toolkit';

const completedDaysSlice = createSlice({
  name: 'completed',
  initialState: {
    list: [],
  },
  reducers: {
    add: (state, param) => {
      const {payload: newItem} = param;
      state.list.push(newItem);
    },
    remove: (state, param) => {
      const {payload: toBeDeletedItem} = param;
      let foundIndex;

      state.list.some((item, index) => {
        if (item === toBeDeletedItem) {
          foundIndex = index;
          return true;
        }
      });
      if (foundIndex !== undefined) {
        state.list.splice(foundIndex, 1);
      } else {
        console.error('Cannot remove a favorite item');
      }
    },
    removeAll: state => {
      state.list = [];
    },
  },
});

const {actions, reducer} = completedDaysSlice;

export const {add, remove, removeAll} = actions;
export default reducer;
