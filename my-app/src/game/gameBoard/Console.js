import '../../css/console.css';

function Console() {
  function btnCoup(event) {
    event.preventDefault();

    console.log("쿠를 선택하였습니다.");
  }
  function btnIncome(event) {
    event.preventDefault();

    console.log("소득을 선택하였습니다.");
  }
  function btnForgein(event) {
    event.preventDefault();

    console.log("해외원조를 선택하였습니다.");
  }


  function btnDuke(event) {
    event.preventDefault();

    console.log("캐릭터 대공작을 선택하였습니다.");
  }
  function btnAssassin(event) {
    event.preventDefault();

    console.log("캐릭터 암살자를 선택하였습니다.");
  }
  function btnContessa(event) {
    event.preventDefault();

    console.log("캐릭터 귀족을 선택하였습니다.");
  }
  function btnambassador(event) {
    event.preventDefault();

    console.log("캐릭터 외교관을 선택하였습니다.");
  }
  function btncaptain(event) {
    event.preventDefault();

    console.log("캐릭터 사령관을 선택하였습니다.");
  }
  return (
      <div className="console">
        <div className="line-1">
          <div className="wrapper">
            <div className="hex btn-duke" onClick={btnDuke}>
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-duke"></div>
              </div>
            </div>
            <div className="popup-msg duke-msg"><p>공작은 은행에서 코인을 3개 가져올 수 있습니다. 그리고 다른 플레이어의 해외원조를 방해할 수 있습니다.</p></div>

            <div className="hex btn-assassin" onClick={btnAssassin}>
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-assassin"></div>
              </div>
            </div>
            <div className="popup-msg assassin-msg"><p>암살자는 코인 3개를 사용해 상대방의 카드를 제거할 수 있습니다. (이 공격은 귀부인으로 방해받을 수 있습니다)</p></div>

            <div className="hex btn-contessa" onClick={btnContessa}>
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-contessa"></div>
              </div>
            </div>
            <div className="popup-msg contessa-msg"><p>귀부인은 암살자의 공격을 막을 수 있습니다.(단, 쿠를 막을 수는 없습니다.)</p></div>
          </div>
        </div>



        <div className="line-2">
          <div className="wrapper">
            <div className="hex btn-coup" onClick={btnCoup}>
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action coup"><p className="font">쿠</p></div>
              </div>
            </div>
            <div className="popup-msg coup-msg"><p>코인 7개를 사용하여 상대방의 카드 하나를 어떠한 방해도 없이 제거할 수 있습니다.</p></div>


            <div className="hex btn-income" onClick={btnIncome}>
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action income"><p className="font">소득</p></div>
              </div>
            </div>
            <div className="popup-msg income-msg"><p>은행에서 코인 1개를 가져올 수 있습니다.</p></div>
          
        
            <div className="hex btn-forgein" onClick={btnForgein}>
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action forgien"><p className="font">해외원조</p></div>
              </div>
            </div>
            <div className="popup-msg forgein-msg"><p>은행에서 코인 2개를 가져올 수 있습니다.(공작에 의해 방해될 수 있습니다.)</p></div>
          </div>
        </div>





        <div className="line-3">
          <div className="wrapper">
            <div className="hex btn-ambassador" onClick={btnambassador}>
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-ambassador"></div>
              </div>
            </div>
            <div className="popup-msg ambassador-msg"><p>외교관은 덱에서 카드 두 장을 골라 내 카드와 합친 네 장 중에 2장을 선택하여 교환 할 수 있습니다. 또한 사령관의 코인 강탈을 막을 수 있습니다.</p></div>


            <div className="hex btn-captain" onClick={btncaptain}>
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-captain"></div>
              </div>
            </div>
            <div className="popup-msg captain-msg"><p>사령관은 플레이어의 코인 2개를 강탈 할 수 있습니다. 또한 다른 플레이어가 코인을 강탈하려할 때 막을 수 있습니다.</p></div>
          </div>
        </div>

      </div>
  )
}

export default Console;