import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css';

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post('https://localhost:7071/logIn', {
                userName: userName,
                passWord: passWord,
            });
            setSuccessMessage(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); 
        if (menu === "FrontPage") {
            navigate("/FrontPage"); 
        } else if (menu === "CreateProfile") {
            navigate("/CreateProfile"); 
        } else if (menu === "CustomerService") {
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