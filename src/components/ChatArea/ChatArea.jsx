/* eslint-disable react/prop-types */
import { useState } from 'react';
import InicialScreen from '../../pages/InicialSreen/InicialScreen';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessages/ChatMessages';

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
          <ChatHeader 
            selectedContact={selectedContact} 
            contactProfileImages={contactProfileImages} 
            toggleSearchBar={toggleSearchBar}
            searchVisible={searchVisible}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <ChatMessages 
            filteredMessages={filteredMessages}
            highlightText={highlightText}
            searchTerm={searchTerm}
          />
        </>
      )}
    </div>
  );
};

export default ChatArea;
