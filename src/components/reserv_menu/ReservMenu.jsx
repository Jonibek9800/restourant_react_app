import React from "react";
import { Button, Drawer, Radio, Select, Space } from "antd";
import { useState } from "react";
import Dishes from "../dishes/Dishes";
import { useDispatch, useSelector } from "react-redux";
import { handleDishesOrder, handleNumOfPeople } from "../../store/features/table_reservation/table_reservation";

const tables = [
  {
    value: "столик на одного",
    label: "Столик на одного",
  },
  {
    value: "столик на двоих",
    label: "Столик на двоих",
  },
  {
    value: "столик на троих",
    label: "Столик на троих",
  },
  {
    value: "столик на четверых",
    label: "Столик на четверых",
  },
  {
    value: "столик на пятерых",
    label: "Столик на пятерых",
  },
];

const ReservMenu = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const { dishes, table } = useSelector(state => state)
  const [reservInfo, setReservInfo] = useState({
    table: "столик на одного",
    dishesOrder: "заказать еду на месте",
  });

  const handleOrderChange = (event) => {
    setReservInfo({ ...reservInfo, [event.target.name]: event.target.value });
    dispatch(handleDishesOrder(event.target.value))
  };

  const disableButton = () => {
    if (reservInfo.table === "" || reservInfo.dishesOrder === "" || table.orderedFood.length === 0) {
      return false
    } else {
      return true
    }
  }
  const handleTableChange = (value) => {
    setReservInfo({ ...reservInfo, table: value });
    dispatch(handleNumOfPeople(value))
  };
  console.log(reservInfo.dishesOrder);
  return (
    <>
      <Drawer style={{ paddingBottom: 30 }} title="Бронирование столика" onClose={onClose} open={open}>
        <Select
          style={{
            width: 180,
          }}
          value={reservInfo.table}
          name="table"
          onChange={handleTableChange}
          options={tables}
        />
        <Radio.Group
          name="dishesOrder"
          onChange={handleOrderChange}
          value={reservInfo.dishesOrder}
          style={{ padding: 10 }}
        >
          <Space direction="vertical">
            <Radio value="заказать на месте">Заказать еду на месте</Radio>
            <Radio value="заказать сейчас">Заказать сейчась</Radio>
          </Space>
        </Radio.Group>
        {reservInfo.dishesOrder === "заказать сейчас" ? <Dishes dishes={dishes.dishes} /> : ''}
        <div style={{ position: "fixed", bottom: 0, backgroundColor: "grey", width: "100%" }}><Button style={{ margin: 10 }}>Забронировать столик</Button></div>
      </Drawer>
    </>
  );
};

export default ReservMenu;
