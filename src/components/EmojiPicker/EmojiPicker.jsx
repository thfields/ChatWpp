/* eslint-disable react/prop-types */
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ visible, position, onClose, onEmojiClick }) => {
  if (!visible) return null;

  return (
    <div className="emoji-picker" style={{ top: position.top, left: position.left }}>
      <Picker onEmojiClick={onEmojiClick} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EmojiPicker;
