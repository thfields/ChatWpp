/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { DownloadSimple } from "@phosphor-icons/react";

const ChatMessages = ({
  filteredMessages,
  highlightText,
  searchTerm,
  highlightedMessageIndex,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToHighlightedMessage = () => {
    const highlightedMessage = document.querySelector(".highlighted-message");
    if (highlightedMessage) {
      highlightedMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    scrollToHighlightedMessage();
  }, [highlightedMessageIndex]);

  return (
    <div className="chat-messages">
      {filteredMessages.map((msg, index) => (
        <div
          key={index}
          className={`message ${
            msg.sender === "Me" ? "sent" : "received"
          } ${highlightText(msg.content, searchTerm) ? "highlighted-message" : ""}`}
          data-index={index}
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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
