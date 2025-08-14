import React from 'react';
import { CategoryLayoutProps } from './types';

export const ListLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 space-y-3">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`${getCardBgClass()} flex cursor-pointer items-center space-x-4 rounded-2xl p-3 shadow-sm transition-shadow hover:shadow-lg ${
                        selectedItem === category.name ? 'ring- ring-2' + colors.primary.replace('bg-', '') : ''
                    }`}
                    onClick={() => onItemClick(category.name)}
                >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h3 className={`${getTextClass('primary')} text-sm font-medium`}>{category.name}</h3>
                        <p className={`${getTextClass('tertiary')} text-xs`}>Available now</p>
                    </div>
                    <i className={`fas fa-chevron-right ${getTextClass('tertiary')} text-sm`}></i>
                    {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} rounded-2xl opacity-5`}></div>}
                </div>
            ))}
        </div>
    );
};
