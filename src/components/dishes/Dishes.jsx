import { useState } from "react";
import Dish from "../dish/Dish";

const Dishes = ({ dishes }) => {
    
    const [totalSum, setTotalSum] = useState(0);
    return (
        <>
            {dishes.map((dish) => (
                <Dish key={dish.id} dish={dish} setTotalSum={setTotalSum} totalSum={totalSum} />
            ))}
        </>
    );
};

export default Dishes;
