import React, { useState } from 'react';
import '../styles/LoginPage.css';
import {Container, Button, Form} from 'react-bootstrap';

function LoginPage({onLogin}) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError('Please enter username and password.');
            return;
        }


        onLogin();

    };

    return (
        <Container className="login-container">
            <Form onSubmit={handleLogin} className="content">
                <h1>Login</h1>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {error && <div style={{color: 'red'}}>{error}</div>}
                <Button type="submit" className="send-button">Login</Button>
            </Form>
        </Container>
    );
}

export default LoginPage;
