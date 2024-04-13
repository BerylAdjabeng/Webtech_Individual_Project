import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import classes from "./CartPage.module.css";
import CartContext from "../Store/cart-context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ApprecPage from "../pages/ApprecPage";

const CartPage = () => {
    const navigate = useNavigate(); 
	const cartCtx = useContext(CartContext);
	const cartItems = cartCtx.items;
	const total = cartCtx.totalAmount;
    const [open, setOpen] = useState(false);

    const handlePopUp = () => {
        setOpen(true);
    }
	
	return (
		<>
			<Header />
                {/* Add a back button */}
                    <button onClick={() => navigate("/")} className={classes.backButton}>
                    Back
                </button>
			<div>
				{cartItems.map((item) => (
					<div key={item.id} className={classes["cart-item"]}>
						<img
							src={require(`../assets/images/${item.image}`)}
							alt={item.name}
						/>
						<div>Name: {item.name}</div>
						<div>Price: ${item.price}</div>
						<div>ID: {item.id}</div>
                        {/* Plus and minus buttons to add/remove items */}
                        <button 
                            onClick={() => {
                                cartCtx.addItem({
                                  name: item.name,
                                  image: item.image,
                                  id: item.id,
                                  count: 1,
                                  price: item.price,
                                });
                              }}>+</button>
                        <button onClickHandler={() => cartCtx.removeItem(item.id)}>-</button>
					</div>
				))}

                <h2>Total items in your cart: ${total.toFixed(2)}</h2>

				<div className={classes["buy-container"]}>
					<button onClick={handlePopUp} className={classes["buy-button"]}>Buy</button>
				</div>
			</div>
            <ApprecPage isOpen={open} setOpen={setOpen}/>

			<Footer />
		</>
	);
};

export default CartPage;
