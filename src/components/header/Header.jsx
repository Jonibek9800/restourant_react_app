import { Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import NavBar from "../nav_bar/NavBar"
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from 'antd';
import { setLogout } from "../../store/features/auth/auth";
import { goToRoute } from "../../store/features/navigate/navigate";
import { useNavigate } from "react-router-dom";


const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useSelector(state => state.user)
  return (
    <Header
      style={{
        position: "sticky",
        backgroundColor: "#e6e2d8",
        // top: 0,
        zIndex: 1,
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img

        style={{ maxWidth: 60, backgroundColor: "#e6e2d8", cursor: 'pointer' }}
        src="./img/resto_logo.png"
        onClick={() => { navigate("/"); dispatch(goToRoute("/")) }}
      />
      <NavBar />
      {auth.isAuth ? <div><Avatar
        style={{
          backgroundColor: '#87d068',
        }}
        icon={<UserOutlined />}
      /> <Button onClick={() => dispatch(setLogout())}>Выйти</Button></div> : <Button onClick={() => { navigate("/auth"); dispatch(goToRoute("/auth")) }} icon={<UserOutlined />}>Войти</Button>}
    </Header>
  );
}

export default Headers;