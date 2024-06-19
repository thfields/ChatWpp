/* eslint-disable react/prop-types */
import { DownloadSimple } from "@phosphor-icons/react";

const ChatMessages = ({ filteredMessages, highlightText, searchTerm }) => {
  return (
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
  );
};

export default ChatMessages;
