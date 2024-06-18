/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MagnifyingGlass, DotsThreeOutlineVertical, DownloadSimple } from "@phosphor-icons/react";
import InicialScreen from '../../pages/InicialSreen/InicialScreen';

const ChatArea = ({ selectedContact, contactProfileImages, contactsMessages }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    setSearchTerm(''); // Limpar o termo de pesquisa quando a barra de pesquisa for aberta/fechada
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === highlight.toLowerCase() ? <mark key={index}>{part}</mark> : part
    ));
  };

  const filteredMessages = contactsMessages[selectedContact] ? contactsMessages[selectedContact].filter(msg => 
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="chat-area">
      {!selectedContact && <InicialScreen />}
      {selectedContact && (
        <>
          <div className="chat-header">
            <div className="contact-info">
              <img src={contactProfileImages[selectedContact]} alt={`${selectedContact}'s Profile`} className="profile-img" />
              <h2 className="contact-name">{selectedContact}</h2>
              <div className='icon-chat'>
                <button onClick={toggleSearchBar}><MagnifyingGlass size={32} /></button>
                
              </div>
              
            </div>
            {searchVisible && (
              <div className="chat-search-bar">
                <input
                  type="text"
                  placeholder="Pesquisar no chat..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            )}
          <DotsThreeOutlineVertical size={22} />
          </div>
          <div className="chat-messages">
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'Me' ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  {msg.file ? (
                    <div className="file-message">
                      <a href={msg.file} download={msg.content}>
                        <DownloadSimple size={16} /> {msg.content}
                      </a>
                    </div>
                  ) : (
                    <span>{highlightText(msg.content, searchTerm)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
