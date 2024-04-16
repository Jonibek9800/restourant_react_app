import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/about_us/AboutUs";
import Home from "./pages/home/Home";
import Headers from "./components/header/Header";
import GuestRoute from "./routes/GuestRoutes";
import Login from "./pages/login/Login";
import MenuAndReservations from "./pages/menu_and_reservations/MenuAndReservations";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth, getUsersList } from "./store/features/auth/auth";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getUsersList());
  }, []);

  return (
    <>
      <Headers />
      <Routes>
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/dishes" element={<MenuAndReservations />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
