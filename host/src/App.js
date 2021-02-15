import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const RemoteButton = React.lazy(() => import('remote/Button'));

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          This is Host
        </p>
        <a
          className='App-link'
          href='//localhost:9002'
          target='_blank'
          rel='noopener noreferrer'
        >
          Go to Remote
        </a>
        <React.Suspense fallback='Loading Button'>
          <RemoteButton onClick={() => setCount(count + 1)}>
            Update Counter
          </RemoteButton>
        </React.Suspense>
        <p>
          Counter: {count}
        </p>
      </header>
    </div>
  );
}

export default App;
