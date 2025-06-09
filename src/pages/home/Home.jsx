import React from 'react';
import './home.css';
import Header from '../../components/header/Header';
import Cards from '../../components/cards/Cards';

import { useState } from 'react';


const Home = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('author-asc')
    const [filterCurrentYear, setFilterCurrentYear] = useState(false);

     const filterAndSortProps = {
        // State values
        searchTerm: searchTerm,
        sortOption: sortOption,
        filterCurrentYear: filterCurrentYear,
        // Setter functions
        setSearchTerm: setSearchTerm,
        setSortOption: setSortOption,
        setFilterCurrentYear: setFilterCurrentYear,
    };

    return (
        <div className='home'>
            <Header 
                filterAndSortProps={filterAndSortProps}
            />
            <Cards
                searchTerm={searchTerm}
                sortOption={sortOption}
                filterCurrentYear={filterCurrentYear}
            />
        </div>
    );
}

export default Home;
