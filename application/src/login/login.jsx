import React from 'react';
import './login.css';

import { Auth_State } from './auth_state';
import { Unauthenticated } from './unauthenticated';

export function Login({user_name, auth_state, on_auth_change}) {
  return (
    <main className="main-login container-fluid bg-secondary text-center">
      <div>
        {auth_state !== Auth_State.Unknown && <h1>Welcome to Word Chain</h1>}
        {auth_state === Auth_State.Authenticated && (
          <p>authenticated as {user_name}</p>)}
        
        {auth_state === Auth_State.Unauthenticated && (
          <Unauthenticated 
          user_name={user_name} 
          onLogin={(login_user_name) => 
            on_auth_change(login_user_name, Auth_State.Authenticated)} 
        />)}
      
      </div>
    </main>
  );
}