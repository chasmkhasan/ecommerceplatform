import React, { useState } from 'react';
import axios from 'axios';
import styles from './LogIn.module.css';

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        try {
            const response = await axios.post('https://localhost:7071/logIn', {
                username: userName,
                password: passWord,
            });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
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
    );
};

export default LogIn;
