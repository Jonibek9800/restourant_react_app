import { useState } from "react";
import Dish from "../dish/Dish";

const Dishes = ({ dishes }) => {

    return (
        <>
            {dishes.map((dish) => (
                <Dish key={dish.id} dish={dish} />
            ))}
        </>
    );
};

export default Dishes;
