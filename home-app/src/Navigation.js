import { NavLink } from "react-router-dom";
import React from 'react';
import './Navigation.scss';

const Navigation = () => (
  <header className='App-header'>
    <nav className='App-navigation'>
      <ul className='App-navigation__list'>
        <li className='App-navigation__item'><NavLink exact={true} to="/">Home</NavLink></li>
        <li className='App-navigation__item'><NavLink exact={true} to="/about">About</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Navigation;