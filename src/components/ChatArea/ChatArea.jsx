/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Phone, Smiley, Paperclip, Microphone, DownloadSimple, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import Picker from 'emoji-picker-react';
import InicialScreen from '../../pages/InicialSreen/InicialScreen';

const ChatArea = ({ selectedContact, contactProfileImages, contactsMessages, onSendMessage, onFileChange }) => {
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !selectedContact) {
      return;
    }

    onSendMessage(selectedContact, messageInput.trim());
    setMessageInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageInput(prevInput => prevInput + emojiObject.emoji);
  };

  return (
    <div className="chat-area">
      {!selectedContact && <InicialScreen />}
      {selectedContact && (
        <>
          <div className="chat-header">
            <div className="contact-info">
              <img src={contactProfileImages[selectedContact]} alt={`${selectedContact}'s Profile`} className="profile-img" />
              <h2 className="contact-name">{selectedContact}</h2>
              <Phone size={32} />
              <DotsThreeOutlineVertical size={22} />
            </div>
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
              onChange={(e) => onFileChange(e, selectedContact)}
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
            <button onClick={handleSendMessage}><Microphone size={22} /></button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
