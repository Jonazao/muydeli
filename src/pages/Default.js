import React from 'react';
import '../App.css';
import logo from '../assets/logos/logo.svg';
import useAddToHomeScreenPrompt from '../hooks/useAddToHomeScreenPrompt';

export default function Default() {
  const { isReady, promptToInstall, hasFinishedInstallation } = useAddToHomeScreenPrompt();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>💛 Muy Deli</h1>
        <p>Instala esta aplicación en tu dispositivo</p>
        <p>{isReady && !hasFinishedInstallation && <button onClick={() => promptToInstall()}>Instalar</button>}</p>
        <p>{hasFinishedInstallation ? 'Estás usando la Web App' : 'Aplicación todavía no instalada'}</p>
      </header>
    </div>
  );
}
