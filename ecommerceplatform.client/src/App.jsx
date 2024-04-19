import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage';
import CreateProfile from './components/CreateProfile';
import LogIn from './components/LogIn';
import CustomerService from './components/CustomerService';
import RegCustomerService from './components/RegCustomerService';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/FrontPage" element={<FrontPage />} />
            <Route path="/CreateProfile" element={<CreateProfile />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/CustomerService" element={<CustomerService />} />
            <Route path="/RegCustomerService" element={<RegCustomerService />} />
        </Routes>
    );
};

export default App;
