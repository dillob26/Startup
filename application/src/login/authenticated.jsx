import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            <div className="player-name"><h2>{props.user_name}</h2></div>
            <Button variant="dark" onClick={() => navigate('/play')}>Play</Button>
            <Button variant="secondary" onClick={() => logout()}>Logout</Button>
        </div>
    )
}