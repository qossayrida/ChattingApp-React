import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import your login component
import HomePage from './pages/HomePage'; // Import your home page component
import 'bootstrap/dist/css/bootstrap.min.css';
import socketService from "./services/SocketService";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in when the app component mounts
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true'); // Persist login state to local storage
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        socketService.disconnect();
        localStorage.removeItem('isLoggedIn'); // Remove login state from local storage
        setIsLoggedIn(false);
    };

    window.onbeforeunload = handleLogout;


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

