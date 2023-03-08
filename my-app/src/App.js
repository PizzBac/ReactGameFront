// 경로 설정

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Game from "./Game";
import SignUp from "./SignUp";
import Lobby from "./Lobby";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/lobby" element={<Lobby />}/>
      </Routes>
    </Router>
  );
}

export default App;