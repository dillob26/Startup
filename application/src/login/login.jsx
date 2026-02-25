import React from 'react';
import './login.css';

import { Auth_state } from './authState';
import { Unauthenticated } from './unauthenticated';

export function Login({user_name, auth_state, on_auth_change}) {
  return (
    <main className="main-login container-fluid bg-secondary text-center">
      <div>
        {auth_state !== Auth_state.Unknown && <h1>Welcome to Word Chain</h1>}
        {auth_state === Auth_state.Authenticated && (
          <p>authenticated as {user_name}</p>)}
        
        {auth_state === Auth_state.Unauthenticated && (
          <Unauthenticated 
          user_name={user_name} 
          onLogin={(login_user_name) => 
            on_auth_change(login_user_name, Auth_state.Authenticated)} 
        />)}
      
      </div>
    </main>
  );
}