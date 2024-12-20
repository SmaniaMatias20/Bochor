// FilterSelect.jsx
import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../shadcn/select';  // Asegúrate de que la ruta es correcta

const FilterSelect = ({ filterOptions, filterValue, onFilterChange }) => {
    return (
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <Select onValueChange={onFilterChange} value={filterValue} className="w-full">
                <SelectTrigger className="border border-gray-300 rounded p-2 text-gray-800">
                    <span>{filterValue || 'Todos'}</span>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md">
                    {filterOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterSelect;
