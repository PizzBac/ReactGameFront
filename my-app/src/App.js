// 경로 설정

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Game from "./Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/main" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;