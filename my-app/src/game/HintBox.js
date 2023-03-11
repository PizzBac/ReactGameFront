function HintBox() {
    return (
        <div className="img hintBox">
            <span className="hintTitle">게임 힌트</span>
            <div className="hintTextBox">
                <p className="hintText">사령관 카드 능력으로 상대방 코인 2개를 가져올 수 있습니다.</p>
                <p className="hintText">외교관 카드 능력으로 상대방이 코인 2개를 강탈 하는 것을 막을 수 있습니다.</p>
                <p className="hintText">은행에서 코인 1개를 가져올 수 있습니다.</p>
            </div>
        </div>
    )
}

export default HintBox;