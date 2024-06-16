/* eslint-disable react/prop-types */
import { Chat, DotsThreeOutlineVertical } from "@phosphor-icons/react";

const Contacts = ({ contacts, contactProfileImages, selectedContact, onContactClick, searchTerm, onSearchChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-left">
          <Chat size={32} />
          <h2 className="sidebar-header-text">Contatos</h2>
        </div>
        <div className="sidebar-header-right">
          <DotsThreeOutlineVertical size={22} className="sidebar-header-icon" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar contatos"
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`contact ${selectedContact === contact ? 'selected' : ''}`}
            onClick={() => onContactClick(contact)}
          >
            <img src={contactProfileImages[contact]} alt={`${contact}'s Profile`} className="profile-img" />
            <span className="contact-name">{contact}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
