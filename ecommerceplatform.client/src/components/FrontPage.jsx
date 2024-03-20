import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FrontPage = () => {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7071/api/products');
                setProductData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <div>
            <h1>Product Data</h1>
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

export default FrontPage;
