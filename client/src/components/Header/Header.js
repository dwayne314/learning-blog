import React from 'react';
import { NavBar } from '../';
import './Header.css';

export const Header = () => {

    return (
        <div className="header-container">
            <div className="header-sections">
                <div className="title-container">
                    <div className="title-header">
                        Acquire Any Skill
                    </div>
                    <div className="title-sub-header">
                        Learn Everyday
                    </div>
                </div>
                <NavBar />
            </div>
            <div className="header-line"></div>
        </div>
    )
};


export default Header;
