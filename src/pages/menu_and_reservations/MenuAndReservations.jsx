import { Button, Spin } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dishes from "../../components/dishes/Dishes";
import ReservMenu from "../../components/reserv_menu/ReservMenu";
import { getDishesList } from "../../store/features/dishes/dishes";

const MenuAndReservations = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { dishes, isLoading } = useSelector((state) => state.dishes);
  console.log(dishes);
  useEffect(() => {
    dispatch(getDishesList());
  }, []);

  const toggleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleOrderDishes = (dish) => {
    console.log(dish);
  }

  return (
    <Content style={{ textAlign: "center", marginTop: "10px" }}>
      <p style={{ fontSize: 22, fontWeight: 500, margin: "10px" }}>Бронирование</p>
      <Card
        hoverable
        style={{
          width: 240,
          margin: "auto",
        }}
        cover={<img alt="example" src="./img/table/table_on_two.jpg" />}
      >
        <Meta
          title={<Button onClick={toggleClose}>Забронировать столик</Button>}
        />
      </Card>
      <ReservMenu onClose={toggleClose} open={open} />
      <p style={{ fontSize: 22, fontWeight: 500 }}>Меню</p>
      <Content
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Spin tip="Loading" size="large">
            <div
              style={{
                padding: "50px",
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: "4px",
              }}
            />
          </Spin>
        ) : (
          <Dishes dishes={dishes} onClick={handleOrderDishes} />
        )}
      </Content>
    </Content>
  );
};

export default MenuAndReservations;
