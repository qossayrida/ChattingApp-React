import React, { useState } from 'react';
import '../styles/LoginPage.css';
import {Container, Button, Form} from 'react-bootstrap';
import serviceSocket from '../services/SocketService';

function LoginPage({onLogin}) {
    const [nickName, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!nickName.trim()) {
            setError('Please enter username and password.');
            return;
        }

        const newUser = {
            nickName: nickName,
            status: "ONLINE"
        };

        serviceSocket.connect({
            onConnect: () => {
                console.log('WebSocket connection successfully established.');
                onLogin();
                serviceSocket.addUser(newUser);
            },
            onError: (error) => {
                console.error('Failed to connect to WebSocket:', error);

            }
        });
    };

    return (
        <Container className="login-container">
            <Form onSubmit={handleLogin} className="content">
                <h1>Login</h1>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={nickName}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>

                {error && <div style={{color: 'red'}}>{error}</div>}
                <Button type="submit" className="send-button">Login</Button>
            </Form>
        </Container>
    );
}

export default LoginPage;
