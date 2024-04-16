import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import { getUsers } from "../../../services/user_service/user_service";

const initialState = {
  users: [],
  isLoading: false,
  isAuth: false,
  errorMessage: null,
  user: {},
};

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.users = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    authUser: (state, { payload }) => {
      console.log(state.users);
      state.users.forEach((item) => {
        console.log(
          item.name === payload.username && item.password === payload.password
        );
        if (
          item.name === payload.username &&
          item.password === payload.password
        ) {
          console.log(item.password);
          localStorage.setItem("user", JSON.stringify(item));
          state.user = item;
          state.isAuth = true;
        }
      });
    },
    checkIsAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.isAuth = false;
      state.user = null;
      localStorage.setItem("user", "");
    },
  },
});

export const { getUserList, setIsLoading, authUser, checkIsAuth, logout } =
  authSlice.actions;

export const getUsersList = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const data = await getUsers();
    dispatch(getUserList(data));
  } catch (error) {
    alert(`ошибка сервера сервер не доступень попробуйте позже`);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const auth =
  ({ username, password }) =>
  (dispatch) => {
    console.log(username, password);
    try {
      const user = {
        username,
        password,
      };
      dispatch(authUser(user));
    } catch (error) {
      console.log(error);
      alert("ошибка сервера сервер не доступень попробуйте позже");
    }
  };

export const checkAuth = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    dispatch(checkIsAuth({ user, isAuth: true }));
  }
};

export const setLogout = () => (dispatch) => {
  dispatch(logout());
};
