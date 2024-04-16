import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedTable: {
    numberOfPeople: "",
    dishesOrder: "",
  },
  orderedFood: [],
  errorMessage: "",
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setOrderedFood: (state, action) => {
      state.orderedFood = action.payload;
    },
    setDishesOrder: (state, action) => {
      state.orderedTable.dishesOrder = action.payload;
    },
    setNumberOfPeople: (state, action) => {
      state.orderedTable.numberOfPeople = action.payload;
    },
    canseledOrderedDish: (state, action) => {
      state.orderedFood = action.payload
    },
  },
});

export const {
  setOrderedFood,
  setDishesOrder,
  setNumberOfPeople,
  canseledOrderedDish,
} = tableSlice.actions;

export const handleOrderFood = (payload) => (dispatch) => {
  dispatch(setOrderedFood(payload));
};

export const handleDishesOrder = (payload) => (dispatch) => {
  dispatch(setDishesOrder(payload));
};

export const handleNumOfPeople = (payload) => (dispatch) => {
  dispatch(setNumberOfPeople(payload));
};

export const cancelOrderedDish = (payload) => (dispatch) => {
  dispatch(canseledOrderedDish(payload));
};

export const handleSetReserveTable = (payload) => async (dispatch) => {
  try {
  } catch (error) {}
};
