import React from 'react';
import { StyleHelpers } from './types';

interface FilterButtonsProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    styleHelpers: StyleHelpers;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ selectedFilter, onFilterChange, styleHelpers }) => {
    const { getButtonBgClass, isCustomTheme, customColor } = styleHelpers;

    const filters = [
        { id: 'offers', label: 'All Discounts', icon: 'fa-tag' },
        { id: 'discount20', label: '20% Discount', icon: 'fa-percent' },
        { id: 'discount15', label: '15% Discount', icon: 'fa-percent' },
        { id: 'discount10', label: '10% Discount', icon: 'fa-percent' },
    ];

    return (
        <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    className={`${!isCustomTheme ? getButtonBgClass(selectedFilter === filter.id) : 'bg-white text-gray-800'} flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                    onClick={() => onFilterChange(filter.id)}
                    style={selectedFilter === filter.id && isCustomTheme ? { backgroundColor: customColor, color: '#ffffff' } : {}}
                >
                    <i
                        className={`fas ${filter.icon} text-xs`}
                        style={selectedFilter === filter.id && isCustomTheme ? { color: customColor } : {}}
                    ></i>
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
    );
};
