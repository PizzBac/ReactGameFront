// 카드 분배 등의 기능 서버에서 구현해야 함

function CardDistribution(props) {
    const { howManyPlayers, activate } = props;
    
    // 카드 이미지 설정
    const cardImages = {
        assassin: require("../css/images/assassin.png"),
        contessa: require("../css/images/contessa.png"),
        duke: require("../css/images/duke.png"),
        ambassador: require("../css/images/ambassador.png"),
        captain: require("../css/images/captain.png"),
    };

    // 카드 셔플
    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 카드, 분배
    function distributeCards(players) {
        const cards = ['assassin', 'assassin', 'assassin', 'contessa', 'contessa', 'contessa', 'duke', 'duke', 'duke', 'ambassador', 'ambassador', 'ambassador', 'captain', 'captain', 'captain'];
        shuffleCards(cards);
        players.forEach((player) => {
            player.hand = cards.splice(0, 2).map((card) => ({
                type: card,
                image: cardImages[card],
                // player.name = player.name,
            }));
        });
        return players;
    }

    // 입장 플레이어 수에 따라서 플레이어 생성
    const players = [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
        { id: 4, name: 'Player 4' },
        { id: 5, name: 'Player 5' },
        { id: 6, name: 'Player 6' },
    ].splice(0, howManyPlayers);

    distributeCards(players);
    console.log("카드 분배 완료");
    console.log(players);

    return (
        <div>
          {players.map((player) => (
            <div key={player.id} className={`player player${player.id} ${activate ? "active" : ""}`}>
              <div className={`cardSet ${activate ? "active" : ""}`}>
                <p className={`card-p${player.id} playerId ${activate ? "active" : ""}`}># {player.name}</p>
                {player.hand.map((card, index) => (
                  <img
                    key={index}
                    className={`card card-p${player.id} card${index + 1} ${activate ? "active" : ""}`}
                    src={card.image}
                    alt="card"
                  />
                ))}
              </div>
              <div className={`coin-set coin-set${player.id} ${activate ? "active" : ""}`}>
                <img className="img coin" src={require("../css/images/coin.png")} alt="coin" />
                <span>5</span>
              </div>
            </div>
          ))}
        </div>
      );
}

export default CardDistribution;