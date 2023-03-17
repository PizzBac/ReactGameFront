import { useState } from "react";

function Coin(props) {
    const { player, activate } = props;

    return (
        <div>
            <div key={player.id + 1} className={`coin-set coin-set${player.id + 1} ${activate === true ? "active" : ""}`}>
                <img className="img coin" src={require("../../../../css/images/coin.png")} alt="coin" />
                <span>{player.coins}</span>
            </div>
        </div>
    )
}

export default Coin;