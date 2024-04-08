import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage';
import CreateProfile from './components/CreateProfile';
import LogIn from './components/LogIn';
import CustomerService from './components/CustomerService';
 
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/CreateProfile" element={<CreateProfile />} />
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/CustomerService" element={<CustomerService />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
