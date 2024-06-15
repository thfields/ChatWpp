import { useState } from 'react';
import './ZapChat.css';
import { Chat, Microphone, Paperclip, Phone, Smiley, DownloadSimple } from "@phosphor-icons/react";

// Mapeamento de nomes de contatos para URLs das imagens de perfil
const contactProfileImages = {
  "Vitor": "/src/assets/vitor.PNG",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  "Thiago": "/src/assets/thiago.PNG",
};

const ZapChat = () => {
  const initialContacts = [
    "Vitor", 
    "(84) 99617-1333", 
    "Thiago"
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
      content: messageInput.trim(),
      file: null
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && selectedContact) {
      const newMessage = {
        sender: 'Me',
        content: file.name,
        file: URL.createObjectURL(file) // Gera uma URL temporária para o arquivo
      };
      setContactsMessages({
        ...contactsMessages,
        [selectedContact]: [...contactsMessages[selectedContact], newMessage]
      });
    }
  };

  const filteredContacts = initialContacts.filter(contact =>
    contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="whatsapp-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2><Chat size={32} /> Contatos</h2>
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
              <h2 className="contact-name">{selectedContact}</h2><Phone size={32} />
            </div>
          )}
        </div>
        <div className="chat-messages">
          {selectedContact && contactsMessages[selectedContact] && contactsMessages[selectedContact].map((msg, index) => (
            <div key={index} className="message">
              <span>{msg.sender}: {msg.file ? '' : msg.content}</span>
              {msg.file && (
                <div className="file-message">
                  <a href={msg.file} download={msg.content}>
                    <DownloadSimple size={16} /> {msg.content}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedContact && (
          <div className="chat-input">
            <button><Smiley size={22} /></button>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={() => document.getElementById('file-input').click()}>
              <Paperclip size={22} />
            </button>
            <input
              type="text"
              placeholder={`Enviar mensagem para ${selectedContact}`}
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button><Microphone size={22} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZapChat;
