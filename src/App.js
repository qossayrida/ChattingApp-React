import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import your login component
import HomePage from './pages/HomePage'; // Import your home page component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {isLoggedIn ? (
                        <Route path="/" element={<HomePage onLogout={handleLogout}/>}  />
                    ) : (
                        <Route
                            path="/"
                            element={<LoginPage onLogin={handleLogin} />}
                        />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

