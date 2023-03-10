import React, { useState, useEffect } from 'react';

function Card(props) {
    const { players, activate, loginPlayerNumber } = props;
    return (
        <div>
            {
                players.map((player) => (
                    <div key={player.id} className={`player player${player.id} ${activate === true ? "active" : ""}`}>
                        <div className={`cardSet ${activate === true ? "active" : ""}`}>
                            <p className={`card-p${player.id} playerId ${activate === true ? "active" : ""}`}># {player.name}</p>
                            {player.hand.map((card, index) => (
                                <img
                                    key={index}
                                    className={`card card-p${player.id} card${index + 1} ${activate === true ? "active" : ""}`}
                                    src={
                                        player.id === loginPlayerNumber
                                            ? card.image.front
                                            : card.image.back
                                    }
                                    alt="card"
                                />
                            ))}
                        </div>
                        <div className={`coin-set coin-set${player.id} ${activate === true ? "active" : ""}`}>
                            <img className="img coin" src={require("../css/images/coin.png")} alt="coin" />
                            <span>2</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Card;