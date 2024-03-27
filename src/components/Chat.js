import React, { useState, useEffect } from 'react';
import { connectSocket, subscribeToChat, sendMessage, disconnectSocket } from '../services/SocketService';
import { Container, Form, Button} from 'react-bootstrap';
import '../styles/Chat.css'; // Ensure this path is correct

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        connectSocket();

        subscribeToChat((newMessage) => {
            setChat((oldChat) => [...oldChat, newMessage]);
        });

        return () => disconnectSocket();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container className="chat-container"> {/* Add class */}

            <Form onSubmit={handleSubmit} className="message-form"> {/* Add class */}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        className="message-input"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="send-button"> {/* Add class */}
                    Send
                </Button>
            </Form>
        </Container>
    );
}

export default Chat;
