import React, { useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ContactList from '../components/ContactList';
import Chat from '../components/Chat';
import '../styles/HomePage.css';

function HomePage({onLogout})  {
    const [selectedContact, setSelectedContact] = useState(null);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    return (
        <Container fluid className="home-container"> {/* Add class here */}
            <Row>
                <Col xs={12} md={4} className="contacts-column"> {/* Add class here */}
                    <h3>Contacts</h3>
                    <ContactList onSelectContact={handleSelectContact} />
                    <Button onClick={onLogout} className="logout-button">Logout</Button>
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
