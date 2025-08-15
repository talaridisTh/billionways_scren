import React from 'react';
import { CategoryLayoutProps } from './types';

export const DenseGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-6 gap-2">
            {categories.map((category, index) => (
                <div key={index} className="text-center">
                    <div
                        className={`h-12 w-12 ${getCardBgClass()} relative mx-auto mb-1.5 flex cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-sm transition-all hover:scale-110 hover:shadow-md ${
                            selectedItem === category.name ? 'ring-2 ring-offset-1' + colors.primary.replace('bg-', ' ring-') : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <img src={category.image} alt={category.name} className="h-full w-full rounded-xl object-cover" />
                        {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} rounded-xl opacity-25`}></div>}
                    </div>
                    <span className={`${getTextClass('secondary')} block text-xs leading-tight`}>
                        {category.name.length > 8 ? category.name.substring(0, 7) + '...' : category.name}
                    </span>
                </div>
            ))}
        </div>
    );
};
