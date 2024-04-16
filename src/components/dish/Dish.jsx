import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Button, Flex, Space, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderedDish, handleOrderFood } from "../../store/features/table_reservation/table_reservation";

const Dish = ({ dish, }) => {
    const orderedFood = useSelector(state => state.table.orderedFood)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const isAddFood = () => {
        const reserFood = orderedFood.filter(food => food.dish.id == dish.id)
        if (reserFood.length !== 0) {
            return true
        } else {
            return false
        }
    }


    const removeOrder = (dishId) => {

        const newArr = orderedFood.filter(item => item.dish.id !== dishId)
        dispatch(cancelOrderedDish(newArr))
        console.log(newArr);
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleOrder = (dish) => {
        const updateOrderedFood = [...orderedFood, { dish, quantity }]
        dispatch(handleOrderFood(updateOrderedFood))
    };

    return (
        <Card
            key={dish.id}
            style={{ width: "300px", textAlign: "start" }}
            cover={<img style={{ height: 200, borderRadius: 10 }} alt="" src={dish.image} />}
        >
            <Meta
                style={{ fontSize: 18 }}
                title={<Tooltip title={dish.foodName}><span style={{ fontSize: 24 }}>{dish.foodName}</span></Tooltip>}
                description={`Калорийность ${dish.calories}`}
            />
            {/* <Title style={{ fontSize: 24 }}>{dish.foodName}</Title> */}
            <h4 style={{ fontSize: 16 }}>{dish.price} c</h4>
            <div>
                {!isAddFood() ? (
                    <Space>
                        <Button onClick={handleDecrement}>-</Button>
                        <span>{quantity}</span>
                        <Button onClick={handleIncrement}>+</Button>
                        <Button onClick={() => handleOrder(dish)}>Заказать</Button>
                    </Space>
                ) : (
                    <Space>
                        {/* <Button onClick={() => upgradeOrder(dish.id)}>Изменить</Button> */}
                        <Button onClick={() => removeOrder(dish.id)}>Отменить</Button>
                    </Space>
                )}
            </div>
        </Card>
    );
}

export default Dish;