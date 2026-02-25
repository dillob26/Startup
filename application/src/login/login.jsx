import React from 'react';
import './login.css';

import { Auth_state } from './authState';

export function Login({user_name, auth_state, on_auth_change}) {
  return (
    <main className="main-login container-fluid bg-secondary text-center">
      <div>
        {auth_state !== Auth_state.Unknown && <h1>Welcome to Word Chain</h1>}
        {auth_state === Auth_state.Authenticated && (
          <p>authenticated as {user_name}</p>)}
        {auth_state === Auth_state.Unauthenticated && (
          <p>unauthenticated</p>)}
      </div>
    </main>
  );
}