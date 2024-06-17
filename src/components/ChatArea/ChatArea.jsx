/* eslint-disable react/prop-types */
/* ChatArea.jsx */
import { useState, useRef } from 'react';
import { MagnifyingGlass, DotsThreeOutlineVertical, Paperclip, DownloadSimple, Smiley } from "@phosphor-icons/react";
import InicialScreen from '../../pages/InicialSreen/InicialScreen';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import AudioRecorder from '../AudioRecorder/AudioRecorder';

const ChatArea = ({ selectedContact, contactProfileImages, contactsMessages, onSendMessage, onFileChange }) => {
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
  const emojiButtonRef = useRef(null); // Referência ao botão de emoji

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

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);

    // Calculando a posição do seletor de emojis acima do botão de emoji
    if (emojiButtonRef.current) {
      const buttonRect = emojiButtonRef.current.getBoundingClientRect();
      const chatAreaRect = document.querySelector('.chat-area').getBoundingClientRect();

      const top = buttonRect.top - chatAreaRect.top - buttonRect.height; // Posiciona acima do botão
      const left = buttonRect.left - chatAreaRect.left;

      setEmojiPickerPosition({ top, left });
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
              <div className='icon-chat'>
                <MagnifyingGlass size={32} />
                <DotsThreeOutlineVertical size={22} />
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {contactsMessages[selectedContact] && contactsMessages[selectedContact].map((msg, index) => (
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
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <button ref={emojiButtonRef} className="emoji-button" onClick={toggleEmojiPicker}><Smiley size={32} /></button>
            <EmojiPicker visible={showEmojiPicker} position={emojiPickerPosition} onClose={() => setShowEmojiPicker(false)} onEmojiClick={onEmojiClick} />
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={(e) => onFileChange(e, selectedContact)}
            />
            <button onClick={() => document.getElementById('file-input').click()}>
              <Paperclip size={32} />
            </button>
            <input
              type="text"
              className="message-input"
              placeholder={`Enviar mensagem para ${selectedContact}`}
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <AudioRecorder />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
