import React from 'react';
import './header.css';
import Toolbar from '../toolbar/Toolbar';
const Header = ({filterAndSortProps}) => {
    return (
        <div className='header'>
            <div className='container'>
                <h1 className='header-title'>dev articles</h1>
                <nav>
                   <Toolbar filterAndSortProps={filterAndSortProps} />
                </nav>
            </div>
        </div>
    );
}

export default Header;
