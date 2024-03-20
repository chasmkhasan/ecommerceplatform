import { useEffect, useState } from 'react';
import './App.css';
import FrontPage from './components/FrontPage'; 

const App = () => {
    return (
        <div>
            <h1>Product Messages</h1>
            <FrontPage />
        </div>
    );
};

export default App;