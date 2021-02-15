import React from 'react';

import logo from './logo.svg';
import './App.css';
import ExposeButton from './expose/Button';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          This is Remote
        </p>
        <a
          className='App-link'
          href='//localhost:9001'
          target='_blank'
          rel='noopener noreferrer'
        >
          Go to Host
        </a>
        <ExposeButton>Expose Button</ExposeButton>
      </header>
    </div>
  );
}

export default App;
