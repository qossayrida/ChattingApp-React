import React, { useState , useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/ContactList.css';
import serviceSocket from '../services/SocketService';

const ContactList = ({currentUser, onSelectContact }) => {
    const [contacts, setContacts] = useState([]);


    useEffect(() => {
        serviceSocket.subscribeToPublic(handleIncomingMessage);
        handleIncomingMessage();
        return () => {
            serviceSocket.unsubscribeFromPublic();
        };
    }, []);

    const handleIncomingMessage = (message) => {
        console.log("This for debug ----> ",message)
        const loadActiveUsers = async () => {
            const activeUsers = await serviceSocket.fetchActiveUsers();
            const filteredUsers = activeUsers.filter(user => user.nickName !== currentUser);
            setContacts(filteredUsers.map(user => ({ name: user.nickName })));
        };

        loadActiveUsers();
    };



    const theContacts = contacts.map((contact, index) => (
        <ListGroup.Item key={index} action onClick={() => onSelectContact(contact)} className="custom-contact-item">
            {contact.name}
        </ListGroup.Item>
    ))

    return (
        <div className="contact-list-container">
            <ListGroup className="custom-contact-list">
                {theContacts}
            </ListGroup>
        </div>
    );
};

export default ContactList;

