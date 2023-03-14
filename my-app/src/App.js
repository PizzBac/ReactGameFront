import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./game/Game";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import Tmp from "./pages/Tmp";

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
        <Route path="/Tmp" element={<Tmp />} />
      </Routes>
    </Router>
  );
}

export default App;