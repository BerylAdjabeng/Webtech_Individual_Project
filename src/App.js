import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import RegisterPage from "../src/pages/RegisterPage";
import LoginPage from "../src/pages/LoginPage";
import ApprecPage from "../src/pages/ApprecPage";
import CartPage from "./pages/CartPage";
import CartProvider from "./Store/CartProvider";

const App = () => {
	return (
		<Router>
			<CartProvider>
    
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/cart-page" element={<CartPage />} />
          <Route path="/apprec-page" element={<ApprecPage />} />

				</Routes>
			</CartProvider>
		</Router>
	);
};

export default App;