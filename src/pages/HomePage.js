import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactList from '../components/ContactList';
import Chat from '../components/Chat';
import '../styles/HomePage.css'; // Ensure this path is correct

const HomePage = () => {
    const [selectedContact, setSelectedContact] = useState(null);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        // You might also handle fetching the chat history for the selected contact here
    };

    return (
        <Container fluid className="home-container"> {/* Add class here */}
            <Row>
                <Col xs={12} md={4} className="contacts-column"> {/* Add class here */}
                    <h3>Contacts</h3>
                    <ContactList onSelectContact={handleSelectContact} />
                </Col>
                <Col xs={12} md={8} className="chat-column"> {/* Add class here */}
                    {selectedContact ? (
                        <Chat contact={selectedContact} />
                    ) : (
                        <div className="select-contact-prompt">
                            Please select a contact to start chatting.
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
