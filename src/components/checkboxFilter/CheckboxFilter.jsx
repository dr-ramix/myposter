import React from 'react';
import './checkboxFilter.css';


const CheckboxFilter = ({filterCurrentYear, setFilterCurrentYear}) => {

    const handleChange = (event) => {
        setFilterCurrentYear(event.target.checked);
    }
    return (
        <div className='checkbox-filter'>
            <label className='checkbox-container'>
                <input
                    type='checkbox'
                    id='currentYearFilter'
                    checked={filterCurrentYear}
                    onChange={handleChange}
                    className='checkbox-input'
                />
                 Latest only
            </label>
        </div>
    );
}

export default CheckboxFilter;
