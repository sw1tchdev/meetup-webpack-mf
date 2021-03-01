import React, { useState } from 'react';
import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';

import './App.css';

const RemoteButton = React.lazy(() => import('remote/Button'));

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (<section className='App-section'>
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
      Go to Remote Button
    </a>
    <ErrorBoundary defaultError='Remote is not available'>
      <React.Suspense fallback='Loading Button'>
        <RemoteButton onClick={() => setCount(count + 1)}>
          Update Counter
        </RemoteButton>
      </React.Suspense>
    </ErrorBoundary>
    <p>
      Counter: {count}
    </p>
  </section>);
};

export default HomePage;