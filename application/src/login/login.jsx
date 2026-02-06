import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Welcome to Word Chain</h1>
        <p>Please login to play</p>
        <form method="get" action="play.html">
            <div>
                <input type="text" placeholder="Username" className="form-control"/>
            </div>
            <div>
                <input type="password" placeholder="Password" className="form-control"/>
            </div>
            <div className="account-buttons">
                <button type="submit" className="btn btn-dark">Login</button>
                <button type="submit" className="btn">Create</button>
            </div>

        </form>
    </main>
  );
}