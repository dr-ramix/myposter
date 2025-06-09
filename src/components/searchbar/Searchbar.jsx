import React from 'react';
import './searchbar.css';

import searchIcon from '../../assets/search-icon.svg';



const Searchbar = ({searchTerm, setSearchTerm}) => {

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className='searchbar'>
            <img src={searchIcon} alt='icon for search' />
            <input
                type="text"
                placeholder="Filter by title, author..."
                value={searchTerm}
                onChange={handleChange}
                className="search-input"
                aria-label="Filter by title, author..."
            />
        </div>
    );
}

export default Searchbar;
