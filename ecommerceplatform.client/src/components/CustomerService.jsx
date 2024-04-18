import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import to use navigate function for routing
import styles from './CustomerService.module.css';

const CustomerService = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productID, setProductID] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [activeMenu, setActiveMenu] = useState(''); // Added missing state for activeMenu

    const navigate = useNavigate(); // Hook to handle navigation

    // Handlers for input changes
    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleProductIDChange = (event) => setProductID(event.target.value);
    const handleSubjectChange = (event) => setSubject(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !email || !productID || !subject || !description) {
                throw new Error('All fields are required');
            }
            const response = await axios.post('https://localhost:7071/api/part3/CustomerServicesData', {
                name,
                email,
                productID,
                subject,
                description,
            });
            alert('Your request has been submitted successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    // Handler for menu click events
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "FrontPage") {
            navigate("/FrontPage");
        } else if (menu === "LogIn") {
            navigate("/LogIn");
        } else if (menu === "CreateProfile") {
            navigate("/CreateProfile");
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => handleMenuClick("FrontPage")} className={activeMenu === "FrontPage" ? styles.activeMenuButton : styles.menuButton}>Product Data</button>
                <button onClick={() => handleMenuClick("CreateProfile")} className={activeMenu === "CreateProfile" ? styles.activeMenuButton : styles.menuButton}>Create Profile</button>
                <button onClick={() => handleMenuClick("LogIn")} className={activeMenu === "LogIn" ? styles.activeMenuButton : styles.menuButton}>Log In</button>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formBox}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" value={name} onChange={handleNameChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input id="email" type="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="productID">Product ID:</label>
                            <input id="productID" type="text" value={productID} onChange={handleProductIDChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Subject:</label>
                            <input id="subject" type="text" value={subject} onChange={handleSubjectChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;