import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FrontPage.module.css'; // Correct path according to your project structure

const FrontPage = () => {
    const [productData, setProductData] = useState(null);
    /*console.log(productData);*/
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState("Product Data");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7071/api/part1/productsData');
            console.log(response);

            setProductData(response.data);
        } catch (error) {
            setError(error);
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
    };

    return (
        <div>
            <div className={styles.menuContainer}>
                <button onClick={() => handleMenuClick("Product Data")} className={activeMenu === "Product Data" ? styles.activeMenuButton : styles.menuButton}>Product Data</button>
                <button onClick={() => handleMenuClick("Create Profile")} className={activeMenu === "Create Profile" ? styles.activeMenuButton : styles.menuButton}>Create Profile</button>
                <button onClick={() => handleMenuClick("LogIn")} className={activeMenu === "LogIn" ? styles.activeMenuButton : styles.menuButton}>Log In</button>
                <button onClick={() => handleMenuClick("CustomerService")} className={activeMenu === "CustomerService" ? styles.activeMenuButton : styles.menuButton}>CustomerService</button>
            </div>
            <h1>{activeMenu}</h1>
            {error && <p>Error: {error.message}</p>}
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
        </div>
    );
};

export default FrontPage;
