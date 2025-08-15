import React from 'react';
import { CategoryLayoutProps } from './types';

export const CircularGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-4 gap-4">
            {categories.map((category, index) => (
                <div key={index} className="text-center">
                    <div
                        className={`h-16 w-16 ${getCardBgClass()} relative mx-auto mb-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl ${
                            selectedItem === category.name ? 'ring-3 ring-offset-2' + colors.primary.replace('bg-', ' ring-') + ' shadow-2xl' : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <img src={category.image} alt={category.name} className="h-full w-full rounded-full object-cover" />
                        {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} rounded-full opacity-30`}></div>}
                        <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                    </div>
                    <span className={`${getTextClass('secondary')} block text-sm font-medium`}>{category.name}</span>
                </div>
            ))}
        </div>
    );
};
