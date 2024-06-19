/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import InicialScreen from '../../pages/InicialSreen/InicialScreen';
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";

const ChatArea = ({ selectedContact, contactProfileImages, contactsMessages }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(-1);

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    setSearchTerm(""); // Limpar o termo de pesquisa quando a barra de pesquisa for aberta/fechada
    setHighlightedMessageIndex(-1); // Limpar o índice da mensagem destacada ao fechar a barra de pesquisa
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar envio de formulário (se aplicável)
      const highlightedMessage = document.querySelector(".highlighted-message");
      if (highlightedMessage) {
        const index = parseInt(highlightedMessage.getAttribute("data-index"), 10);
        setHighlightedMessageIndex(index);
      }
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return <>{text}</>; // Retorna o texto completo se não houver termo de pesquisa

    // Cria uma expressão regular global (gi) para encontrar todas as ocorrências do termo de pesquisa
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index}>{part}</mark>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  const filteredMessages = contactsMessages[selectedContact]
    ? contactsMessages[selectedContact].map((msg, index) => ({
        ...msg,
        index, // Adicionando o índice da mensagem para referência
      }))
    : [];

  useEffect(() => {
    if (highlightedMessageIndex !== -1) {
      const highlightedMessage = document.querySelector(`.message[data-index="${highlightedMessageIndex}"]`);
      if (highlightedMessage) {
        highlightedMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedMessageIndex]);

  useEffect(() => {
    setSearchTerm(""); // Limpar o termo de pesquisa ao mudar de contato
    setSearchVisible(false); // Esconder a barra de pesquisa ao mudar de contato
    setHighlightedMessageIndex(-1); // Limpar o índice da mensagem destacada ao mudar de contato
  }, [selectedContact]);

  return (
    <div className="chat-area">
      {!selectedContact && <InicialScreen />}
      {selectedContact && (
        <>
          <ChatHeader
            selectedContact={selectedContact}
            contactProfileImages={contactProfileImages}
            toggleSearchBar={toggleSearchBar}
            searchVisible={searchVisible}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleSearchKeyPress={handleSearchKeyPress} // Adicionado o evento de tecla pressionada
          />
          <ChatMessages
            filteredMessages={filteredMessages}
            highlightText={highlightText}
            searchTerm={searchTerm}
            highlightedMessageIndex={highlightedMessageIndex} // Passando o índice da mensagem destacada
          />
        </>
      )}
    </div>
  );
};

export default ChatArea;
