import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Button, Flex, Space, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderedDish, handleOrderFood, totalOrderPrice } from "../../store/features/table_reservation/table_reservation";
import { useEffect } from "react";

const Dish = ({ dish, setTotalSum, totalSum }) => {
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

    useEffect(() => { dispatch(totalOrderPrice(totalSum)); }, [totalSum]);

    const handleOrder = (dish) => {
        setTotalSum(prev => prev += (dish.price * quantity))
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
                style={{ fontSize: 16 }}
                title={<Tooltip title={dish.foodName}><span style={{ fontSize: 20 }}>{dish.foodName}</span></Tooltip>}
                description={`Калорийность ${dish.calories}`}
            />
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
                        <Button onClick={() => removeOrder(dish.id)}>Отменить</Button>
                    </Space>
                )}
            </div>
        </Card>
    );
}

export default Dish;