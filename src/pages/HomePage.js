import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import classes from "./HomePage.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartContext from "../Store/cart-context";

function Homepage() {
  const [products, setProducts] = useState([]);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetch("http://localhost/backend/home")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={classes.heading}>
        {/* Add a back button */}
        <button onClick={() => navigate("/login")} className={classes.backButton}>
          Back
        </button>
        <h2>
          Welcome to our Furniture Store <br /> Select Items to add to cart
        </h2>
        <div className={classes["furniture-container"]}>
          {products.map((item) => (
            <div key={item.product_id} className={classes["furniture-item"]}>
              <img
                className={classes.img}
                src={require(`../assets/images/${item.product_image}`)}
                alt={item.product_name}
              />
              <h3>{item.product_name}</h3>
              <p>{item.price}</p>
              <button
                onClick={() => {
                  cartCtx.addItem({
                    name: item.product_name,
                    image: item.product_image,
                    id: item.product_id,
                    count: 1,
                    price: item.price,
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
