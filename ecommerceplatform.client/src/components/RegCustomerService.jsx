import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegCustomerService.module.css';
import { AuthContext } from '../AuthContext.jsx';

const RegCustomerService = () => {
    // States for form inputs
    const [productID, setProductID] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    // States for user info and user questions
    const [loggedInUser, setLoggedInUser] = useState({ name: '', email: '' });
    const [userQuestions, setUserQuestions] = useState([]);

    // Navigation and authentication context
    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);
    
    // Effect for setting loggedInUser from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser')) || { name: '', email: '' };
        
        setLoggedInUser({
            name: user.name || '',
            email: user.email || ''
        });
    }, []);
    
    // Effect for fetching user questions based on the logged-in user's email
    useEffect(() => {
        console.log("useEffect triggered with email:", loggedInUser.email); // Add this line for debugging
        const fetchUserQuestions = async () => {
            if (loggedInUser.email)
            {
                try {
                    const url = `https://localhost:7071/api/part4/LogIn/ByEmail/${encodeURIComponent(loggedInUser.email)}`;
                    const response = await axios.get(url);
                    console.log("API Call Successful"); // Log when API call is successful
                    setUserQuestions(response.data);
                } catch (error) {
                    console.error('Error when fetching user questions:', error);
                }
            }
        };
        fetchUserQuestions();
    }, [loggedInUser.email]);

    // Handlers for input changes
    const handleProductIDChange = (event) => setProductID(event.target.value);
    const handleSubjectChange = (event) => setSubject(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    
    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!productID || !subject || !description) {
            alert('Product ID, Subject, and Description are required');
            return;
        }
        try {
            await axios.post('https://localhost:7071/api/part3/CustomerServicesData', {
                name: loggedInUser.name,
                email: loggedInUser.email,
                productID,
                subject,
                description,
            });
            alert('Your request has been submitted successfully!');
            navigate("/SomeSuccessPage");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Registered Customer Service Queries</h1>
            <div className={styles.menuContainer}>
                <button onClick={() => navigate("/FrontPageReg")} className={styles.activeMenuButton}>Products</button>
                <button onClick={() => navigate("/FrontPage")} className={styles.activeMenuButton}>Log Out</button>
            </div>
            <div className={styles.createProfileContainer}>
                <h2>Welcome, {loggedInUser.name}!</h2>
                <form onSubmit={handleSubmit} className={styles.profileForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" value={loggedInUser.name} disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" value={loggedInUser.email} disabled />
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
            <div>
                <h2>Your Customer Service Questions</h2>
                {userQuestions.length > 0 ? (
                    <table className={styles.questionTable}>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userQuestions.map((question, index) => (
                                <tr key={index}>
                                    <td>{question.subject}</td>
                                    <td>{question.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No questions found</p>
                )}
            </div>
        </div>
    );
};

export default RegCustomerService;