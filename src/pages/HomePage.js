import React, { useState , useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ContactList from '../components/ContactList';
import Chat from '../components/Chat';
import '../styles/HomePage.css';
import serviceSocket from "../services/SocketService";

function HomePage({onLogout})  {
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactMessages, setContactMessages] = useState({});
    const [nickName, setNickName] = useState(serviceSocket.user.nickName);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        if (!contactMessages[contact.name]) {
            setContactMessages({ ...contactMessages, [contact.name]: [] });
            serviceSocket.fetchChatHistory(nickName,contact.name)
                .then(chatHistory => {

                    const updatedChatHistory = chatHistory.map(chat => ({
                        ...chat,
                        sent: chat.senderId === nickName
                    }));

                    setContactMessages(prevMessages => {
                        return {
                            ...prevMessages,
                            [contact.name]: updatedChatHistory
                        };
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const sendMessageToContact = (contactName, message) => {
        const newMessages = { ...contactMessages, [contactName]: [...contactMessages[contactName], message]};

        setContactMessages(newMessages);

        const chatMessage = {
            senderId: nickName,
            recipientId: selectedContact.name,
            content: message.content,
            timestamp:  new Date()
        };
        serviceSocket.sendChatMessage(chatMessage);
    };

    useEffect(() => {
        serviceSocket.subscribeToUserMessages(handleIncomingMessage);

        return () => {
            serviceSocket.unsubscribeFromUserMessages();
        };
    }, []);

    const handleIncomingMessage = (message) => {
        setContactMessages(prevMessages => {
            const contactName = message.senderId;
            const existingMessages = prevMessages[contactName] || [];
            return {
                ...prevMessages,
                [contactName]: [...existingMessages, message]
            };

        });
    };


    return (
        <Container fluid className="home-container">
            <Row>
                <Col xs={12} md={3} className="contacts-column">
                    <h3 className="user-nickname">{nickName}</h3>
                    <h3>Contacts</h3>
                    <ContactList
                        currentUser={nickName}
                        onSelectContact={handleSelectContact}
                    />
                    <Button onClick={onLogout} className="logout-button">Logout</Button>

                </Col>
                <Col xs={12} md={9} className="chat-column">
                    {selectedContact ? (
                        <Chat
                            contact={selectedContact}
                            messages={contactMessages[selectedContact.name]}
                            onSendMessage={(message) => sendMessageToContact(selectedContact.name, message)}
                        />
                    ) : (
                        <div className="select-contact-prompt">
                            Please select a contact to start chatting.
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
