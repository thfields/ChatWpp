import { useState } from "react";
import "./ZapChat.css";
import Contacts from "../Contacts/Contacts";
import ChatArea from "../ChatArea/ChatArea";
import MessageInput from "../MessageInput/MessageInput";

const contactProfileImages = {
  Vitor: "/src/assets/vitor.PNG",
  "(84) 99617-1333": "/src/assets/sem-foto.png",
  Thiago: "/src/assets/thiago.PNG",
};

const ZapChat = () => {
  const initialContacts = ["Vitor", "(84) 99617-1333", "Thiago"];

  const [selectedContact, setSelectedContact] = useState(null);
  const [contactsMessages, setContactsMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    if (!contactsMessages[contact]) {
      setContactsMessages({
        ...contactsMessages,
        [contact]: [],
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSendMessage = (contact, message) => {
    const newMessage = {
      sender: "Me",
      content: message,
      file: null,
    };
    setContactsMessages({
      ...contactsMessages,
      [contact]: [...contactsMessages[contact], newMessage],
    });
  };

  const handleFileChange = (event, contact) => {
    const file = event.target.files[0];
    if (file && contact) {
      const newMessage = {
        sender: "Me",
        content: file.name,
        file: URL.createObjectURL(file),
      };
      setContactsMessages({
        ...contactsMessages,
        [contact]: [...contactsMessages[contact], newMessage],
      });
    }
  };

  const handleSendAudio = (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    const newMessage = {
      sender: "Me",
      content: "Audio message",
      file: url,
    };
    setContactsMessages({
      ...contactsMessages,
      [selectedContact]: [...contactsMessages[selectedContact], newMessage],
    });
  };

  return (
    <div className="whatsapp-layout">
      <Contacts
        contacts={initialContacts}
        contactProfileImages={contactProfileImages}
        selectedContact={selectedContact}
        onContactClick={handleContactClick}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />
      <div className="chat-section">
        <ChatArea
          selectedContact={selectedContact}
          contactProfileImages={contactProfileImages}
          contactsMessages={contactsMessages}
        />
        {selectedContact && (
          <MessageInput
            selectedContact={selectedContact}
            onSendMessage={handleSendMessage}
            onFileChange={handleFileChange}
            onSendAudio={handleSendAudio}
          />
        )}
      </div>
    </div>
  );
};

export default ZapChat;
