// src/features/districts/districtsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    seoulDistricts: [],
  },
  reducers: {
    setDistricts: (state, action) => {
      state.seoulDistricts = action.payload;
    },
  },
});

export const { setDistricts } = districtsSlice.actions;

export default districtsSlice.reducer;
