import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedTable: {
    numberOfPeople: "столик на одного",
    dishesOrder: "заказать еду на месте",
  },
  orderedFood: [],
  totalOrderPrice: 0,
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
      state.orderedFood = action.payload;
    },
    setOrderedTable: (state, action) => {
      localStorage.setItem("reserveTables", JSON.stringify(action.payload));
      (state.orderedFood = []),
        (state.orderedTable.dishesOrder = "заказать еду на месте");
      state.orderedTable.numberOfPeople = "столик на одного";
    },
    setTotalSum: (state, action) => {
      state.totalOrderPrice = action.payload;
    },
  },
});

export const {
  setOrderedFood,
  setDishesOrder,
  setNumberOfPeople,
  canseledOrderedDish,
  setOrderedTable,
  setTotalSum,
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

export const totalOrderPrice = (payload) => (dispatch) => {
  dispatch(setTotalSum(payload));
};

export const handleSetReserveTable = (payload) => async (dispatch) => {
  try {
    if (localStorage.getItem("reserveTables")) {
      const reserveTables = JSON.parse(localStorage.getItem("reserveTables"));
      reserveTables.push(payload);
      dispatch(setOrderedTable(reserveTables));
    } else {
      const reserveTables = [];
      reserveTables.push(payload);
      dispatch(setOrderedTable(reserveTables));
    }
    alert("Ваш столик успешно забронирован");
  } catch (error) {
    alert("server error try again later");
  }
};
