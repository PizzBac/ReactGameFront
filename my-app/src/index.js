import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Login />
    {/*{status = 1 ? <Login /> : null} 값에 따라서 화면 바뀌게 설정하기*/}
  </div>
);