/* eslint-disable react/prop-types */
import "./ContactProfile.css";

const ContactProfile = ({ contact, contactProfileImages, onClose }) => {
  if (!contact) {
    return null;
  }

  return (
    <div className="contact-profile">
      <button className="close-button" onClick={onClose}>X</button>
      <img src={contactProfileImages[contact]} alt={`${contact}'s Profile`} className="profile-img-large" />
      <h2>{contact}</h2>
      <p>Phone Number: {contact}</p>
      {/* Adicione mais detalhes do contato aqui */}
    </div>
  );
};

export default ContactProfile;
