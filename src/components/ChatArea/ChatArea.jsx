/* eslint-disable react/prop-types */
import { MagnifyingGlass, DotsThreeOutlineVertical, DownloadSimple } from "@phosphor-icons/react";
import InicialScreen from '../../pages/InicialSreen/InicialScreen';

const ChatArea = ({ selectedContact, contactProfileImages, contactsMessages }) => {
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
        </>
      )}
    </div>
  );
};

export default ChatArea;
