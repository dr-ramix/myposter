import React from 'react';
import './toolbar.css';
import Searchbar from '../searchbar/Searchbar';
import SortDropDown from '../sortDropdown/SortDropDown';
import CheckboxFilter from '../checkboxFilter/CheckboxFilter';

const Toolbar = ({filterAndSortProps}) => {
    const {
        searchTerm,
        sortOption,
        filterCurrentYear,
        setSearchTerm, // Now you have access to the setter functions
        setSortOption,
        setFilterCurrentYear
    } = filterAndSortProps;

    return (
        <div className='toolbar'>
                <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SortDropDown sortOption={sortOption} setSortOption={setSortOption} />
                <CheckboxFilter filterCurrentYear={filterCurrentYear} setFilterCurrentYear={setFilterCurrentYear} />
        </div>
    );
}

export default Toolbar;
