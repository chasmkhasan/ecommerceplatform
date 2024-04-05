import React, { useState } from 'react';
import axios from 'axios';
import styles from './CustomerService.module.css';

const CustomerService = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productID, setProductID] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleProductIDChange = (event) => setProductID(event.target.value);
    const handleSubjectChange = (event) => setSubject(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

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

    return (
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
    );
};

export default CustomerService;
