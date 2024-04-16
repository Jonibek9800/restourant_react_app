import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth";
import { dishesSlise } from "./features/dishes/dishes";
import { navigateSlice } from "./features/navigate/navigate";
import { tableSlice } from "./features/table_reservation/table_reservation";

export const stores = configureStore({
  reducer: {
    dishes: dishesSlise.reducer,
    user: authSlice.reducer,
    table: tableSlice.reducer,
    navigate: navigateSlice.reducer
  },
});
