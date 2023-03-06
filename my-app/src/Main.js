import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import Header from './pages/Header';
//  import Profile from './pages/Profile';
//  import Home from './pages/Home';
//  import Board from './pagres/Board';
 import Login from './Login';
 import SignUp from './SignUp';
 function Main() {
     return (
        <BrowserRouter>
            <div className="App">
                
                <Routes>
                    <Route path="/Login" element={<Login />}>route</Route>
                    <Route path="/SignUp" element={<SignUp />}>route</Route>
                    </Routes>
            </div>
        </BrowserRouter>
            );
}

export default Main;