import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx'
import styles from './FrontPage.module.css'; // Correct path according to your project structure

const FrontPage = () => {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState("Product's Details");
    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://localhost:7071/api/part1/productsData');
            setProductData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "Create Profile") {
            navigate("/CreateProfile");
        }
        else if (menu === "LogIn") {
            navigate("/LogIn");
        }
        else if (menu === "CustomerService") {
            navigate("/CustomerService");
        }
        else if (menu === "FrontPage") {
            navigate("/FrontPage");
        }
    };

    return (
        <div>
            <div className={styles.menuContainer}>
                <button onClick={() => handleMenuClick("Product Data")} className={activeMenu === "Product Data" ? styles.activeMenuButton : styles.menuButton}>Product</button>
                <button onClick={() => handleMenuClick("Create Profile")} className={activeMenu === "Create Profile" ? styles.activeMenuButton : styles.menuButton}>Create Profile</button>
                <button onClick={() => handleMenuClick("LogIn")} className={activeMenu === "LogIn" ? styles.activeMenuButton : styles.menuButton}>Log In</button>
                <button onClick={() => handleMenuClick("CustomerService")} className={activeMenu === "CustomerService" ? styles.activeMenuButton : styles.menuButton}>Customer Service</button>
            </div>
            <h1>{activeMenu}</h1>
            {error && <p>Error: {error.message}</p>}
            {isLoading ? (
                <p>Loading ....</p>
            ) : (
            <div className={styles.productsContainer}>
                {productData && productData.map((product, index) => (
                    <div key={product.Id || index} className={styles.productBox}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Author: {product.author}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default FrontPage;
