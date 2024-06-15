import './InicialScreen.css';

const InicialScreen = () => {
  return (
    <div className="initial-screen">
      <img src="/src/assets/whatsapp.png" alt="Initial Screen" className="initial-screen-image" />
      <h2 className="initial-screen-message">Escolha um contato para iniciar o chat</h2>
    </div>
  );
};

export default InicialScreen;
