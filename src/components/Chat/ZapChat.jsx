// src/components/WhatsAppLayout.jsx

import { useState } from 'react';
import './ZapChat.css';

const ZapChat = () => {
  const initialContacts = ["Vitor", "Daniel", "Thiago"];

  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contactsMessages, setContactsMessages] = useState({});

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    if (!contactsMessages[contact]) {
      setContactsMessages({
        ...contactsMessages,
        [contact]: []
      });
    }
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !selectedContact) {
      return;
    }
    const newMessage = {
      sender: 'Me',
      content: messageInput.trim()
    };
    setContactsMessages({
      ...contactsMessages,
      [selectedContact]: [...contactsMessages[selectedContact], newMessage]
    });
    setMessageInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="whatsapp-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Contatos</h2>
        </div>
        <div className="contact-list">
          {initialContacts.map((contact, index) => (
            <div key={index} className="contact" onClick={() => handleContactClick(contact)}>{contact}</div>
          ))}
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h2>{selectedContact ? `${selectedContact}` : 'Selecione um contato'}</h2>
        </div>
        <div className="chat-messages">
          {selectedContact && contactsMessages[selectedContact] && contactsMessages[selectedContact].map((msg, index) => (
            <div key={index} className="message">{msg.sender}: {msg.content}</div>
          ))}
        </div>
        {selectedContact && (
          <div className="chat-input">
            <input
              type="text"
              placeholder={`Enviar mensagem para ${selectedContact}`}
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZapChat;
