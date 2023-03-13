import '../../css/console.css';

function Console() {
  return (
      <div className="console">
        <div className="line-1">
          <div className="wrapper">
            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-duke"></div>
              </div>
            </div>

            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-assassin"></div>
              </div>
            </div>

            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-contessa"></div>
              </div>
            </div>
          </div>
        </div>



        <div className="line-2">
          <div className="wrapper">
            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action coup"><p className="font">쿠</p></div>
              </div>
            </div>


            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action income"><p className="font">소득</p></div>
              </div>
            </div>
          
        
            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 basic-action forgien"><p className="font">해외원조</p></div>
              </div>
            </div>
          </div>
        </div>





        <div className="line-3">
          <div className="wrapper">
            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-ambassador"></div>
              </div>
            </div>


            <div className="hex">
              <div className="hex-inner1">
                <div className="hex-inner2 job-action job-captain"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
  )
}

export default Console;