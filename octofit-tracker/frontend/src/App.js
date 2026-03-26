import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <Router>
      {/* ── Navigation Bar ── */}
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src={octofitLogo} alt="OctoFit logo" height="30" className="me-2" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {[
                { to: '/users',       label: 'Users',       icon: '👤' },
                { to: '/teams',       label: 'Teams',       icon: '🏆' },
                { to: '/activities',  label: 'Activities',  icon: '🏃' },
                { to: '/leaderboard', label: 'Leaderboard', icon: '📊' },
                { to: '/workouts',    label: 'Workouts',    icon: '💪' },
              ].map(({ to, label, icon }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link px-3' + (isActive ? ' active fw-semibold' : '')
                    }
                    to={to}
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="octofit-hero text-center mt-2">
                <img src={octofitLogo} alt="OctoFit" height="80" className="mb-3" />
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead mt-2">
                  Track activities, manage teams, and climb the leaderboard.
                </p>
                <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
                  {[
                    { to: '/users',       label: 'View Users',       variant: 'outline-light' },
                    { to: '/teams',       label: 'View Teams',       variant: 'outline-light' },
                    { to: '/activities',  label: 'View Activities',  variant: 'outline-light' },
                    { to: '/leaderboard', label: 'Leaderboard',      variant: 'light' },
                    { to: '/workouts',    label: 'Workouts',         variant: 'outline-light' },
                  ].map(({ to, label, variant }) => (
                    <NavLink key={to} to={to} className={`btn btn-${variant}`}>
                      {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </div>

      {/* ── Footer ── */}
      <footer className="text-center py-3 mt-auto text-muted small border-top">
        &copy; {new Date().getFullYear()} OctoFit Tracker
      </footer>
    </Router>
  );
}

export default App;
