import { useState } from 'react';
import './ZapChat.css';
import { 
  Chat, Paperclip, Phone, Smiley, 
  DownloadSimple, Microphone, DotsThreeOutlineVertical 
} from "@phosphor-icons/react";
import Picker from 'emoji-picker-react';
import InicialScreen from '../../pages/InicialScreen/InicialScreen'; // Importe o componente InicialScreen

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
      file: null, // Aqui você poderia adicionar lógica para enviar arquivos, se necessário
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

  const onEmojiClick = (event, emojiObject) => {
    setMessageInput(prevInput => prevInput + emojiObject.emoji);
  };

  return (
    <div className="whatsapp-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <Chat size={32} />
            <h2>Contatos</h2>
          </div>
          <DotsThreeOutlineVertical size={22} className="sidebar-header-icon" />
          <input
            type="text"
            placeholder="Pesquisar contatos"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="contact-list">
          {initialContacts.map((contact, index) => (
            <div key={index} className="contact" onClick={() => handleContactClick(contact)}>
              <img src={contactProfileImages[contact]} alt={`${contact}'s Profile`} className="profile-img" />
              <span className="contact-name">{contact}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-area">
        {!selectedContact && <InicialScreen />} {/* Renderiza InicialScreen se nenhum contato estiver selecionado */}
        {selectedContact && (
          <>
            <div className="chat-header">
              {selectedContact && (
                <div className="contact-info">
                  <img src={contactProfileImages[selectedContact]} alt={`${selectedContact}'s Profile`} className="profile-img" />
                  <h2 className="contact-name">{selectedContact}</h2>
                  <Phone size={32} />
                  <DotsThreeOutlineVertical size={22} />
                </div>
              )}
            </div>
            <div className="chat-messages">
              {contactsMessages[selectedContact] && contactsMessages[selectedContact].map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'Me' ? 'sent' : 'received'}`}>
                  {msg.file ? (
                    <div className="file-message">
                      <a href={msg.file} download={msg.content}>
                        <DownloadSimple size={16} /> {msg.content}
                      </a>
                    </div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}><Smiley size={22} /></button>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ZapChat;
