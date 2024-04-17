import React, { useState } from "react";
import { Button, Drawer, Radio, Select, Space } from "antd";
import Dishes from "../dishes/Dishes";
import { useDispatch, useSelector } from "react-redux";
import { handleDishesOrder, handleNumOfPeople, handleSetReserveTable } from "../../store/features/table_reservation/table_reservation";

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
  const { dishes, table, user } = useSelector(state => state)


  const handleOrderChange = (event) => {
    dispatch(handleDishesOrder(event.target.value))
  };
  const handleTableChange = (value) => {
    dispatch(handleNumOfPeople(value))
  };

  const handleOrderedTable = () => {
    const reservTable = {
      id: Date.now(),
      personId: user.user == null ? Date.now() : user.user.id,
      personName: user.user == null ? "Person" : user.user.name,
      peopleQuantity: table.orderedTable.numberOfPeople,
      orderType: table.orderedTable.dishesOrder,
      orderedDishes: table.orderedFood,
      totalPrice: table.totalOrderPrice
    }
    dispatch(handleSetReserveTable(reservTable));

  }

  return (
    <>
      <Drawer style={{ paddingBottom: 30 }} title="Бронирование столика" onClose={onClose} open={open}>
        <Select
          style={{
            width: 180,
          }}
          value={table.orderedTable.numberOfPeople}
          name="table"
          onChange={handleTableChange}
          options={tables}
        />
        <Radio.Group
          name="dishesOrder"
          onChange={handleOrderChange}
          value={table.orderedTable.dishesOrder}
          style={{ padding: 10 }}
        >
          <Space direction="vertical">
            <Radio value="заказать еду на месте">Заказать еду на месте</Radio>
            <Radio value="заказать сейчас">Заказать сейчась</Radio>
          </Space>
        </Radio.Group>
        {table.orderedTable.dishesOrder === "заказать сейчас" ? <Dishes dishes={dishes.dishes} /> : ''}
        <div style={{ position: "fixed", bottom: 0, backgroundColor: "grey", width: "100%" }}>
          {table.totalOrderPrice != 0 && <span style={{ margin: 10, padding: 10, backgroundColor: "#cfe1e5", borderRadius: "10px" }}>{table.totalOrderPrice} c</span>}
          <Button onClick={handleOrderedTable} style={{ margin: 10 }}>Забронировать столик</Button>
        </div>
      </Drawer>
    </>
  );
};

export default ReservMenu;
