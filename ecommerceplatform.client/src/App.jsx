import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage';
import CreateProfile from './components/CreateProfile';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/profile" element={<CreateProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
