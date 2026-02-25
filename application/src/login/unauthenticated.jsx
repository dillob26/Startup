import React from "react";

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [user_name, set_user_name] = React.useState(props.user_name);
    const [password, set_password] = React.useState('');

    async function login_user() {
        localStorage.setItem('userName', user_name);
        props.onLogin(user_name);
    }

    async function create_user() {
        localStorage.setItem('userName', user_name);
        props.onLogin(user_name);
    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="User Name" value={user_name} onChange={(e) => set_user_name(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => set_password(e.target.value)} />
            </div>
            <Button variant="primary" onClick={login_user}>Login</Button>
            <Button variant="secondary" onClick={create_user}>Create User</Button>
        </>
    )
}