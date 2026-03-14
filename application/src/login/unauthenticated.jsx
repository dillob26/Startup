import React from "react";

import Button from 'react-bootstrap/Button';

import { Popup } from "./popup";

export function Unauthenticated(props) {
    const [user_name, set_user_name] = React.useState(props.user_name);
    const [password, set_password] = React.useState('');
    const [msg, set_msg] = React.useState('');

    async function login_user() {
        login_or_create(`/api/authenticate/login`);
    }

    async function create_user() {
        login_or_create(`/api/authenticate/create`);
    }
 
    async function login_or_create(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ user_name:user_name, password:password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (data.msg === 'User created' || data.msg === 'User authenticated') {
            localStorage.setItem('userName', user_name);
            props.onLogin(user_name);
        } else if (data.msg === 'Invalid credentials') {
            set_msg('Wrong username or password');
        } else if (data.msg === 'Existing user') {
            set_msg('User already exists');
        }
    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="User Name" value={user_name} onChange={(e) => set_user_name(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => set_password(e.target.value)} />
            </div>
            <Button variant="dark" onClick={login_user} disabled={!user_name || !password}>Login</Button>
            <Button variant="secondary" onClick={create_user} disabled={!user_name || !password}>Create</Button>
            <Popup msg={msg} onClose={() => set_msg('')} />
        </>
    )
}