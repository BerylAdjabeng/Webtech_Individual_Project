import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewHeader.module.css";
import logo from "../assets/images/logo.png";

const NewHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	// const toggleDropdown = () => {
	// 	setIsOpen(!isOpen);
	// };

	// const logout = () => {
	// 	localStorage.removeItem("token");
	// 	navigate("/login");
	// };

	return (
		<header className={classes.header}>
			{/* Logo */}
			<div className={classes.logo}>
				<img className={classes["company-logo"]} src={logo} alt="Logo" />
			</div>

			<h1 className={classes.h1}>NOVA DECOR</h1>

		</header>
	);
};

export default NewHeader;