import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./game/Game";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import Tmp from "./pages/Tmp";
import WaitingRoom1 from "./pages/WaitingRoom1";
import WaitingRoom2 from "./pages/WaitingRoom2";
import WaitingRoom3 from "./pages/WaitingRoom3";
import WaitingRoom4 from "./pages/WaitingRoom4";
import WaitingRoom5 from "./pages/WaitingRoom5";
import WaitingRoom6 from "./pages/WaitingRoom6";
import Modal from "./dummy/modal/Modal";

function App() {
  //Route path =뒤에 있는건 무조건 소문자로 써야한다.
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/lobby" element={<Lobby />}/>
        <Route path="/game" element={<Game />} />
        <Route path="/waitingRoom1" element={<WaitingRoom1 />}/>
        <Route path="/waitingRoom2" element={<WaitingRoom2 />}/>
        <Route path="/waitingRoom3" element={<WaitingRoom3 />}/>
        <Route path="/waitingRoom4" element={<WaitingRoom4 />}/>
        <Route path="/waitingRoom5" element={<WaitingRoom5 />}/>
        <Route path="/waitingRoom6" element={<WaitingRoom6 />}/>
        <Route tmp="/tmp" element={<Tmp />}/>
        <Route path="/modal" element={<Modal />}/>
      </Routes>
    </Router>
  );
}

export default App;