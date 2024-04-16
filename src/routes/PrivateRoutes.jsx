import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goToRoute } from "../store/features/navigate/navigate";

const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const goTo = () => {
    dispatch(goToRoute("/auth"));
    navigate("/auth")
  }
  return !isAuth ? goTo() : children;
};

export default PrivateRoutes;
