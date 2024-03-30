import React, { useState} from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import '../styles/Chat.css';

function Chat({ contact,messages, onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage({
                content: message,
                sent: true
            });
            setMessage('');
        }
    };

    const messageElements = messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sent ? 'sent' : 'received'}`}>
            {msg.content}
        </div>
    ));

    return (
        <Container className="chat-container"> {}

            <Container className="chat-header">
                <h5>{contact.name}</h5>
            </Container>

            <Container className="sub-chat-container">
                {messageElements}
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
