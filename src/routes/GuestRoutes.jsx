import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goToRoute } from "../store/features/navigate/navigate";

const GuestRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  console.log(isAuth);
  const navigate = useNavigate();
  const goTo = () => {
    navigate("/");
    dispatch(goToRoute("/"))
  }
  return isAuth ? goTo() : children;
};

export default GuestRoute;
