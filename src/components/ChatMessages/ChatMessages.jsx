/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { DownloadSimple } from "@phosphor-icons/react";

const ChatMessages = ({
  filteredMessages = [], // Valor padrão para garantir que seja um array
  highlightText,
  searchTerm,
  highlightedMessageIndex,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHighlightedMessage = () => {
    const highlightedMessage = document.querySelector(".highlighted-message");
    if (highlightedMessage) {
      highlightedMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    scrollToHighlightedMessage();
  }, [highlightedMessageIndex]);

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const renderFileContent = (file, content) => {
    if (file) {
      const fileExtension = file.split('.').pop().toLowerCase();
      if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        return <img src={file} alt={content} className="message-image" />;
      } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
        return (
          <video controls className="message-video">
            <source src={file} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
        return (
          <audio controls className="message-audio">
            <source src={file} type={`audio/${fileExtension}`} />
            Your browser does not support the audio element.
          </audio>
        );
      } else {
        return (
          <div className="file-message">
            <a href={file} download={content}>
              <DownloadSimple size={16} /> {content}
            </a>
          </div>
        );
      }
    } else {
      return <span>{highlightText(content, searchTerm)}</span>;
    }
  };

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
            {renderFileContent(msg.file, msg.content)}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
