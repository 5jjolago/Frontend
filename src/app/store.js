// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import districtsReducer from "./districtSlice";
import lifestyleReducer from "./lifeStyleSlices";

export const store = configureStore({
  reducer: {
    districts: districtsReducer,
    lifestyle: lifestyleReducer,
  },
});
