import React from 'react';
import './sortDropDown.css';
const SortDropDown = ({sortOption, setSortOption}) => {

    const handleChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className='sort-dropdown'>
            <select value={sortOption} onChange={handleChange} aria-label="Sort articles by">
                <option value="author-asc">Author (A-Z)</option>
                <option value="date-desc">Date (Newest first)</option>
                <option value="date-asc">Date (Oldest first)</option>
            </select>
        </div>
    );
}

export default SortDropDown;
