import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  darkMode: false,
  selectedMainSliderSlide: 0,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    setDarkMode: (state, param) => {
      const {payload: newMode} = param;
      state.darkMode = newMode;
    },
    setSelectedMainSliderItem: (state, param) => {
      const {payload: currSlide} = param;
      state.selectedMainSliderSlide = currSlide;
    },
    setInitialValues: (state, param) => {
      state = Object.assign(state, INITIAL_STATE);
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {setDarkMode, setInitialValues, setSelectedMainSliderItem} =
  actions;
export default reducer;
