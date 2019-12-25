import React from "react";
import classes from "./Order.module.css";

const Order = props => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingedientOutput = ingredients.map(ingredient => {
        return (
            <span key={ingredient.name} style={{textTransform: "capitalize", display: "inline-block", margin: "0 8px", border: "1px solid #CCC", padding: "5px"}}>
                {ingredient.name} ({ingredient.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingedientOutput}</p>
            <p>Price: {Number.parseFloat(props.price).toFixed(2)} USD</p>
        </div>
    );
};

export default Order;
