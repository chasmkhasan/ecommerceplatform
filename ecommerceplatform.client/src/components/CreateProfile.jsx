import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateProfile = () => {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState("Product Data");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7071/api/profile');
                setProductData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={() => handleMenuClick("Product Data")} style={{ fontWeight: activeMenu === "Product Data" ? 'bold' : 'normal' }}>Product Data</button>
                <button onClick={() => handleMenuClick("Profile Data")} style={{ fontWeight: activeMenu === "Profile Data" ? 'bold' : 'normal' }}>Profile Data</button>
            </div>
            <h1>{activeMenu}</h1>
            {error && <p>Error: {error.message}</p>}
            {productData && (
                <div>
                    <p>{productData}</p>
                    {/* Render other product data as needed */}
                </div>
            )}
        </div>
    );
};

export default CreateProfile;
