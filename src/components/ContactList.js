import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/ContactList.css';

const contacts = [
    { name: 'Qossay Rida' },
    { name: 'Ali Ahmad' }
];

const ContactList = ({ onSelectContact }) => {
    const theContacts = contacts.map((contact, index) => (
        <ListGroup.Item key={index} action onClick={() => onSelectContact(contact)} className="custom-contact-item">
            {contact.name}
        </ListGroup.Item>
    ))

    return (
        <div className="contact-list-container"> {/* Add a wrapper div with a class */}
            <ListGroup className="custom-contact-list">
                {theContacts}
            </ListGroup>
        </div>
    );
};

export default ContactList;

