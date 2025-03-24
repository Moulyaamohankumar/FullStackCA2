import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Component/profile';
import { CartComp } from './Component/CartComp';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<CartComp />} />
                {/* Add more routes here if needed */}
            </Routes>
        </Router>
    );
}

export default App;
