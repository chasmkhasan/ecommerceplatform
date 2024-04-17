import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateProfile.module.css';

const CreateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handlePassWordChange = (event) => setPassWord(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !email || !userName || !passWord) {
                throw new Error('All fields are required');
            }
            await axios.post('https://localhost:7071/api/part2/profilesData', {
                name,
                email,
                userName,
                passWord,
            });
            alert('Your profile has been created successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.createProfileContainer}>
            <h1>Create Profile</h1>
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
                    <label htmlFor="userName">Username:</label>
                    <input id="userName" type="text" value={userName} onChange={handleUserNameChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="passWord">Password:</label>
                    <input id="passWord" type="password" value={passWord} onChange={handlePassWordChange} />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default CreateProfile;
