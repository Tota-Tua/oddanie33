import {createSlice} from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkMode: (state, param) => {
      const {payload: newMode} = param;
      state.darkMode = newMode;
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {setDarkMode} = actions;
export default reducer;
