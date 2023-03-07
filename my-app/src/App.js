// 경로 설정

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Game from "./Game";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;