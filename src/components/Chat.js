import React, { useState} from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import '../styles/Chat.css';

function Chat() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container className="chat-container"> {}
            <Container className="chat-container">

            </Container>

            <Form onSubmit={handleSubmit} className="message-form"> {}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        className="message-input"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="send-button">Send</Button>
            </Form>
        </Container>
    );
}

export default Chat;
