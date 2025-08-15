import React from 'react';
import { CategoryLayoutProps } from './types';

export const MinimalGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-4 gap-4">
            {categories.map((category, index) => (
                <div key={index} className="group text-center">
                    <div
                        className={`relative mx-auto mb-2 h-16 w-16 cursor-pointer overflow-hidden rounded-2xl transition-all group-hover:scale-105 ${
                            selectedItem === category.name ? 'ring-3 ring-offset-2' + colors.primary.replace('bg-', ' ring-') : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                        <div
                            className={`absolute inset-0 transition-opacity ${selectedItem === category.name ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'} ${colors.primary}`}
                        ></div>
                    </div>
                    <span
                        className={`${getTextClass('primary')} text-sm font-medium transition-colors group-hover:${colors.accent.replace('text-', 'text-')}`}
                    >
                        {category.name}
                    </span>
                </div>
            ))}
        </div>
    );
};
