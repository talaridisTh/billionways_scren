import React from 'react';
import { CategoryLayoutProps } from './types';

export const MasonryLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-3 gap-3">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`${index === 0 ? 'col-span-2 row-span-2' : ''} ${getCardBgClass()} group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl ${
                        selectedItem === category.name ? 'ring- ring-2' + colors.primary.replace('bg-', '') : ''
                    }`}
                    onClick={() => onItemClick(category.name)}
                >
                    <div className="relative aspect-square">
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-2 left-2">
                            <h3 className="text-sm font-medium text-white drop-shadow-lg">{category.name}</h3>
                        </div>
                        {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} opacity-20`}></div>}
                    </div>
                </div>
            ))}
        </div>
    );
};
