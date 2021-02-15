import React from 'react';
import './button.scss';

export default function Button({ children, onClick }) {
  return (
    <button className={'expose-button'} onClick={onClick}>
      {children}
    </button>
  );
}