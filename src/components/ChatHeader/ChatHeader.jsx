/* eslint-disable react/prop-types */
import { MagnifyingGlass, DotsThreeOutlineVertical } from "@phosphor-icons/react";

const ChatHeader = ({ selectedContact, contactProfileImages, toggleSearchBar, searchVisible, searchTerm, handleSearchChange }) => {
  return (
    <div className="chat-header">
      <div className="contact-info">
        <img src={contactProfileImages[selectedContact]} alt={`${selectedContact}'s Profile`} className="profile-img" />
        <h2 className="contact-name">{selectedContact}</h2>
        <div className='icon-chat'>
          <button onClick={toggleSearchBar}><MagnifyingGlass size={32} /></button>
        </div>
      </div>
      {searchVisible && (
        <div className="chat-search-bar">
          <input
            type="text"
            placeholder="Pesquisar no chat..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}
      <DotsThreeOutlineVertical size={22} />
    </div>
  );
};

export default ChatHeader;
