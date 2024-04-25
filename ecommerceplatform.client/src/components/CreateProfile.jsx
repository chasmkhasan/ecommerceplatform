import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import styles from './CreateProfile.module.css';

const CreateProfile = () => {
    // State hooks for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [activeMenu, setActiveMenu] = useState("Create Profile");
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

    const navigate = useNavigate();  // Navigation function from useNavigate

    // Handlers for input changes
    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // Auto-fill username based on email
        const username = event.target.value.split('@')[0]; // if user want to use only use first word or before @, active this code.
        setUserName(username);
        /*setUserName(event.target.value);*/
    };
    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handlePassWordChange = (event) => setPassWord(event.target.value);

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !userName || !passWord) {
            alert('All fields are required');
            return;  // Prevent the form from being submitted
        }
        setIsSubmitting(true);  // Indicate the start of form submission
        try {
            await axios.post('https://localhost:7071/api/part2/profilesData', {
                name,
                email,
                userName,
                passWord,
            });
            alert('Your profile has been created successfully!');
            navigate('/LogIn');  // Navigate to the LogIn page on success
        } catch (error) {
            alert(`Error: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setIsSubmitting(false);  // Reset submission status
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === "FrontPage") {
            navigate("/FrontPage");
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
                <button onClick={() => handleMenuClick("FrontPage")} className={activeMenu === "FrontPage" ? styles.activeMenuButton : styles.menuButton}>Product Data</button>
                {/*<button onClick={() => handleMenuClick("Create Profile")} className={activeMenu === "Create Profile" ? styles.activeMenuButton : styles.menuButton}>Create Profile</button>*/}
                <button onClick={() => handleMenuClick("LogIn")} className={activeMenu === "LogIn" ? styles.activeMenuButton : styles.menuButton}>Log In</button>
                <button onClick={() => handleMenuClick("CustomerService")} className={activeMenu === "CustomerService" ? styles.activeMenuButton : styles.menuButton}>Customer Service</button>
            </div>
            <div className={styles.createProfileContainer}>
                <h1>Create Profile</h1>
                <form onSubmit={handleSubmit} className={styles.profileForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" value={name} onChange={handleNameChange} aria-label="Name" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" value={email} onChange={handleEmailChange} aria-label="Email" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="userName">Username:</label>
                        <input id="userName" type="text" value={userName} onChange={handleUserNameChange} aria-label="Username" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="passWord">Password:</label>
                        <input id="passWord" type="password" value={passWord} onChange={handlePassWordChange} aria-label="Password" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className={styles.submitButton}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;