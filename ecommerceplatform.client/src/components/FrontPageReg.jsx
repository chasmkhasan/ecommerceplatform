import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './FrontPage.module.css'; // Correct path according to your project structure
import { AuthContext } from '../AuthContext.jsx';

const FrontPageReg = () => {
    const [productData, setProductData] = useState(null);
    console.log(productData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState("Product Data");
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({ name: '', email: '' });
    const { authenticated } = useContext(AuthContext);

    // Effect for setting loggedInUser from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser')) || { name: '', email: '' };

        setLoggedInUser({
            name: user.name || '',
            email: user.email || ''
        });
    }, []);

    useEffect(() => {
        console.log("useEffect triggered with authenticated:", authenticated); // Add this line for debugging
        if (authenticated && loggedInUser.email) {
            const fetchUserData = async () => {
                setIsLoading(true);
                try{
                    const response = await axios.get('https://localhost:7071/api/part1/productsData');
                    console.log(response);
                    setProductData(response.data);
                    setIsLoading(false);
                } catch (error){
                    setError(error);
                    setIsLoading(false);
                }
            };
            fetchUserData();
        }
    }, [authenticated, loggedInUser.email]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "RegCustomerService") {
            navigate('/RegCustomerService');
        }
        else if (menu === "FrontPage") {
            navigate("/FrontPage");
        }
    }

    return (
        <div>
            <div className={styles.menuContainer}>
                <button onClick={() => handleMenuClick("RegCustomerService")} className={activeMenu === "RegCustomerService" ? styles.activeMenuButton : styles.menuButton}>Service Queries</button>
                <button onClick={() => handleMenuClick("FrontPage")} className={activeMenu === "FrontPage" ? styles.activeMenuButton : styles.menuButton}>Log Out</button>
            </div>
            <h1>{activeMenu}</h1>
            {error && <p>Error: {error.message}</p>}
            {isLoading ? (
                <p> Loading ....</p>
            ) : (
                <div className={styles.productsContainer}>
                    {productData && productData.map((product, index) => (
                        <div key={product.Id || index} className={styles.productBox}>
                            <h2>{product.name}</h2>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Author: {product.author}</p>
                            <button className={styles.downloadButton}>Download</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FrontPageReg;