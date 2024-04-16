import { createSlice } from "@reduxjs/toolkit";
import { getDishes } from "../../../services/dishes_service/dishes_service";

const initialState = {
  dishes: [],
  isLoading: false,
};

export const dishesSlise = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    getDishList: (state, action) => {
      state.dishes = action.payload;
    },
    setIsLoad: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { getDishList, setIsLoad } = dishesSlise.actions;

export const getDishesList = () => async (dispatch) => {
  dispatch(setIsLoad(true));
  try {
    const data = await getDishes();
    dispatch(getDishList(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsLoad(false));
};
