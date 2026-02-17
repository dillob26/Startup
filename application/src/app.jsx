import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './login/login';
import { AuthState } from './login/authState';

import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { Guide } from './guide/guide';


function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}


export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);


  return (
    <BrowserRouter>
        <div className="body bg-dark text-dark">
            <header className="container-fluid">
                <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="#">Word Chain</a>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="play">Play</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="leaderboard">Leaderboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="guide">guide</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>


            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/guide' element={<Guide />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-light">
                <div className="container-fluid">
                    <p>
                        Dillon Birch - <a href="https://github.com/dillob26/Startup">GitHub</a>
                    </p>
                </div>    
            </footer>
        </div>
    </BrowserRouter> 
  );
}