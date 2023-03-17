import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./game/Game";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import Tmp from "./pages/Tmp";
import WaitingRoom1 from "./pages/WaitingRoom1";
// import MyComponent from "./pages/MyComponent";
import ReactStompHook from "./pages/reactStompHook";

function App() {
  //Route path =뒤에 있는건 무조건 소문자로 써야한다.
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        <Route path="/signUp" element={<ReactStompHook />} />
        <Route path="/lobby" element={<Lobby />}/>
        <Route path="/game" element={<Game />} />
        <Route path="/waitingRoom1" element={<WaitingRoom1 />}/>
        <Route tmp="/tmp" element={<Tmp />}/>
        {/* <Route path="/myComponent" element={<MyComponent />}/> */}
        
      </Routes>
    </Router>
  );
}

export default App;