import React, { useState } from "react";
import { Menu, Drawer, Button, Row, Col } from "antd";
import {
  HomeOutlined,
  CoffeeOutlined,
  InfoCircleOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { goToRoute } from "../../store/features/navigate/navigate";

const items = [
  {
    label: "Главная",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Меню и Бронирование",
    key: "/dishes",
    icon: <CoffeeOutlined />,
  },
  {
    label: "О нас",
    key: "/about_us",
    icon: <InfoCircleOutlined />,
  },
];

const NavBar = () => {
  const dispath = useDispatch();

  const navigate = useNavigate();
  const route = useSelector(state => state.navigate.current)
  
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onClick = (e) => {
    const key = e.key;
    dispath(goToRoute(key))
    navigate(key);
    onClose();
  };

  return (
    <>
      <div className="mobile-menu">
        <Button style={{ backgroundColor: "#e6e2d8" }} icon={<MenuOutlined />} onClick={showDrawer} />
        <Drawer

          title="Меню"
          placement="right"
          onClose={onClose}
          style={{ backgroundColor: "#e6e2d8" }}
          open={visible}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[route]}
            mode="vertical"
            items={items}
          />
        </Drawer>
      </div>
      <div className="desktop-menu">
        <Row
          justify="space-between"
          align="middle"
          style={{
            padding: "0 20px",
            backgroundColor: "#e6e2d8",
          }}
        >
          <Col flex="auto">
            <Menu
              style={{ backgroundColor: "#e6e2d8" }}
              onClick={onClick}
              selectedKeys={[route]}
              mode="horizontal"
              items={items}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NavBar;
