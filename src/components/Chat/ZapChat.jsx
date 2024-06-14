// src/components/ZapChat.jsx

import { useState } from 'react';
import './ZapChat.css';

// Mapeamento de nomes de contatos para URLs das imagens de perfil
const contactProfileImages = {
  "Vitor": "/src/assets/vitor.PNG",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "Thiago": "/src/assets/thiago.PNG",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
};

const ZapChat = () => {
  const initialContacts = [
    "Vitor", "(84) 99617-1333", "Thiago"
    , "(84) 99617-1333"
    , "(84) 99617-1333"
    , "(84) 99617-1333"
    , "(84) 99617-1333"
    , "(84) 99617-1333"
  ];

  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contactsMessages, setContactsMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = initialContacts.filter(contact =>
    contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="whatsapp-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Contatos</h2>
          <input
            type="text"
            placeholder="Pesquisar contatos"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="contact-list">
          {filteredContacts.map((contact, index) => (
            <div key={index} className="contact" onClick={() => handleContactClick(contact)}>
              <img src={contactProfileImages[contact]} alt={`${contact}'s Profile`} className="profile-img" />
              <span className="contact-name">{contact}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          {selectedContact && (
            <div className="contact-info">
              <img src={contactProfileImages[selectedContact]} alt={`${selectedContact}'s Profile`} className="profile-img" />
              <h2 className="contact-name">{selectedContact}</h2>
            </div>
          )}
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
