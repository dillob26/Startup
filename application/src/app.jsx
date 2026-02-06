import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className="body bg-dark text-light">
    <header class="container-fluid">
        <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Word Chain</a>
            <menu class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="index.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="play.html">Play</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="leaderboard.html">Leaderboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="guide.html">guide</a>
                </li>
            </menu>
        </nav>
    </header>


    <main>
        main content here
    </main>

    <footer class="bg-dark text-light">
        <div class="container-fluid">
            <p>
                Dillon Birch - <a href="https://github.com/dillob26/Startup">GitHub</a>
            </p>
        </div>    
    </footer>
  </div>
  );
}