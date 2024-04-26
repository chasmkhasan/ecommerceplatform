import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import styles from './LogIn.module.css';

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState('');

    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.get('https://localhost:7071/api/part4/LogIn', {
                params: {
                    userName: userName,
                    passWord: passWord,
                }
            });
            const users = response.data;
            const user = users.find(u => u.userName === userName && u.passWord === passWord);
            if (user) {
                console.log(`User Found: ${user.name}, setting welcome message...`);
                setSuccessMessage(`Welcome ${user.name}!`);
                setAuthenticated(true);
                // Store user's name and other necessary details in localStorage
                localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, userName: user.userName, email: user.email }));
                setTimeout(() => navigate("/RegCustomerService"), 2000); // Delay navigation to test message display
            } else {
                console.log("No matching user found or invalid credentials.");
                throw new Error("Invalid user data");
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setError(error.response ? (error.response.data || error.response.statusText) : 'An error occurred');
            setAuthenticated(false);
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "CreateProfile") {
            navigate("/CreateProfile");
        }
        else if (menu === "FrontPage") {
            navigate("/FrontPage");
        }
        else if (menu === "CustomerService") {
            navigate("/CustomerService");
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => handleMenuClick("FrontPage")} className={activeMenu === "FrontPage" ? styles.activeMenuButton : styles.menuButton}>Product Data</button>
                <button onClick={() => handleMenuClick("CreateProfile")} className={activeMenu === "CreateProfile" ? styles.activeMenuButton : styles.menuButton}>Create Profile</button>
                <button onClick={() => handleMenuClick("CustomerService")} className={activeMenu === "CustomerService" ? styles.activeMenuButton : styles.menuButton}>Customer Service</button>
            </div>
            <h2> </h2>
            <div className={styles.logInContainer}>
                <form onSubmit={handleSubmit} className={styles.logInForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="userName">Username:</label>
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="passWord">Password:</label>
                        <input
                            id="passWord"
                            type="password"
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.logInButton}>Log In</button>
                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default LogIn;