import React from "react";
import classes from "./CartPageCom.module.css"; // Assuming you have a separate CSS module file for CartItem

const CartItem = ({ name, price }) => {
  return (
    <div className={classes["cart-item"]}>
      <div className={classes["cart-item-details"]}>
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <div className={classes["quantity-controls"]}>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
