import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './login/login';
import { Auth_State } from './login/auth_state';

import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard.jsx';
import { Guide } from './guide/guide';


function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}


export default function App() {
    const [user_name, set_user_name] = React.useState(localStorage.getItem('user_name') || '');
    const current_auth_state = user_name ? Auth_State.Authenticated : Auth_State.Unauthenticated;
    const [auth_state, set_auth_state] = React.useState(current_auth_state);


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
                        
                        {auth_state === Auth_State.Authenticated && <li className="nav-item">
                            <NavLink className="nav-link" to="play">Play</NavLink>
                        </li>}
                        
                        {auth_state === Auth_State.Authenticated && <li className="nav-item">
                            <NavLink className="nav-link" to="leaderboard">Leaderboard</NavLink>
                        </li>}
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="guide">guide</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>


            <Routes>
                <Route path='/' element={
                    <Login 
                        user_name={user_name}
                        auth_state={auth_state}
                        on_auth_change={(user_name, auth_state) => {
                            set_user_name(user_name);
                            set_auth_state(auth_state);
                        }}
                    />} exact 
                />
                <Route path='/play' element={<Play user_name={user_name} />} />
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