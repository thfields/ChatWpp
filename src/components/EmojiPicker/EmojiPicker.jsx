/* eslint-disable react/prop-types */
/* EmojiPicker.jsx */
import { Smiley } from "@phosphor-icons/react";
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ visible, position, onClose, onEmojiClick }) => {
  if (!visible) return null;

  return (
    <div className="emoji-picker" style={{ top: position.top, left: position.left }}>
      <Picker onEmojiClick={onEmojiClick} />
      <button className="emoji-close-button" onClick={onClose}><Smiley size={32} /></button>
    </div>
  );
};

export default EmojiPicker;
