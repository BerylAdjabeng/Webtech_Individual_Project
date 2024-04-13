import React, { useReducer } from "react";

import CartContext from "../Store/cart-context.js";

const defaultCartItems = {
	items: [],
	totalAmount: 0,
};
  
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.count;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				count: existingCartItem.count + action.item.count,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.count === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		} else {
			const updatedItem = {
				...existingItem,
				count: existingItem.count - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		}
	}

	return defaultCartItems;
};

const CartProvider = (props) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartItems);

	const addItemToCartHandler = (item) => {
		cartDispatch({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = (id) => {
		cartDispatch({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler
	};

	return (
		<>
			<CartContext.Provider value={cartContext}>
				{props.children}
			</CartContext.Provider>
		</>
	);
};

export default CartProvider;