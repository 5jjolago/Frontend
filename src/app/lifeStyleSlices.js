// features/lifestyle/lifestyleSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const lifestyleSlice = createSlice({
  name: "lifestyle",
  initialState: {
    selectedLifestyle: null,
  },
  reducers: {
    setSelectedLifestyle: (state, action) => {
      state.selectedLifestyle = action.payload;
    },
  },
});

export const { setSelectedLifestyle } = lifestyleSlice.actions;

export default lifestyleSlice.reducer;
