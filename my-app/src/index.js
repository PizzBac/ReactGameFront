import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Game';
import Game from "./Game";
import Login from './Login';
import SignUp from './SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Game />
    {/* <SignUp /> */}
    {/* <Login /> */}
  </div>
);