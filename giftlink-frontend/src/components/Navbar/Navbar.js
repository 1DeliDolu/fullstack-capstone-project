import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">

                    <li className="nav-item">
                    <a className="nav-link" href="/home.html">Home</a> {/* Link to home.html */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app">Gifts</a> {/* Updated Link */}
                    </li>
                    {/* search */}
                    <li className="nav-item">
                        <a className="nav-link" href="/search">Search</a> {/* Link to search page */}
                    </li>
                    {/* LOGIN */}
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a> {/* Link to login page */}
                    </li>
                    {/* SIGNUP */}
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a> {/* Link to signup page */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
