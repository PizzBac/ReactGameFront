import React from 'react';
import '../css/banker.css';

function Banker() {
  return (
    <div className="banker">
      <p className="announcement turn">
        <span>플레이어 1</span>
        <span>님의 차례입니다.</span>
      </p>
      <p className="announcement anc-message">
        다른 플레이어의 차례를 기다리고 있습니다.
      </p>
    </div>
  )
}

export default Banker;