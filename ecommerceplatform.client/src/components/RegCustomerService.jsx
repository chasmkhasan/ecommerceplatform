import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import styles from './RegCustomerService.module.css';
import { AuthContext } from '../AuthContext.jsx';

const RegCustomerService = () => {
    // State hooks for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productID, setProductID] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [activeMenu, setActiveMenu] = useState('');
    const { authenticated } = useContext(AuthContext); // Accessing authentication context
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();  // Navigation function from useNavigate

    // Function to get logged-in user's name based on stored credentials
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user && user.name) {
            setLoggedInUser(user.name);
        }
    }, [])

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleProductIDChange = (event) => setProductID(event.target.value);
    const handleSubjectChange = (event) => setSubject(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !productID || !subject || !description) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await axios.post('https://localhost:7071/api/part3/CustomerServicesData', {
                name,
                email,
                productID,
                subject,
                description,
            });
            alert('Your request has been submitted successfully!');
            navigate("/SomeSuccessPage"); // Redirect on success
        } catch (error) {
            alert(error.message);
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "FrontPage") {
            navigate("/FrontPage");
        }
    };

    return (
        <div>
            <h1>Registered Customer Service Queries</h1>
            <div className={styles.menuContainer}>
                <button onClick={() => handleMenuClick("FrontPage")} className={activeMenu === "FrontPage" ? styles.activeMenuButton : styles.menuButton}>Product Data</button>
            </div>
            <div className={styles.createProfileContainer}>
                <h2>Welcome, {loggedInUser}!</h2> {/* Display logged-in user's name */}
                <form onSubmit={handleSubmit} className={styles.profileForm}>
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
                        <textarea id="description" value={description} onChange={handleDescriptionChange} />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RegCustomerService;
