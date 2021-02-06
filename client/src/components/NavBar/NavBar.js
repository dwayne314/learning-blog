import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NavBar.css';


export const NavBar = (props) => {

    const currentPage = props.location.pathname;

    return (
        <div className="nav-bar-container">
            <div className={`nav-item${currentPage === '/' ? ' active-link' : ''}`}>
                <Link to="/">
                    Home
                </Link>
            </div>
            <div className={`nav-item${currentPage === '/about' ? ' active-link' : ''}`}>
                <Link to="/about">
                    About
                </Link>
            </div>
            <div className={`nav-item${currentPage === '/posts' ? ' active-link' : ''}`}>
                <Link to="/posts">
                    Posts
                </Link>
            </div>
        </div>
    );
};


export default withRouter(NavBar);
