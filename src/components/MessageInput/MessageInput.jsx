/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Paperclip, Smiley } from "@phosphor-icons/react";
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import AudioRecorder from '../AudioRecorder/AudioRecorder';

const MessageInput = ({ selectedContact, onSendMessage, onFileChange, onSendAudio }) => {
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
  const emojiButtonRef = useRef(null);

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

    if (emojiButtonRef.current) {
      const buttonRect = emojiButtonRef.current.getBoundingClientRect();
      const chatAreaRect = document.querySelector('.chat-area').getBoundingClientRect();

      const top = buttonRect.top - chatAreaRect.top - buttonRect.height;
      const left = buttonRect.left - chatAreaRect.left;

      setEmojiPickerPosition({ top, left });
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageInput(prevInput => prevInput + emojiObject.emoji);
  };

  return (
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
      <AudioRecorder onSendAudio={onSendAudio} />
    </div>
  );
};

export default MessageInput;
