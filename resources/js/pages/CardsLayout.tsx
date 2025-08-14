import React from 'react';
import { CategoryLayoutProps } from './types';

export const CardsLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`${getCardBgClass()} group relative cursor-pointer overflow-hidden rounded-3xl p-4 shadow-lg transition-transform hover:scale-105 ${
                        selectedItem === category.name ? 'ring- ring-2' + colors.primary.replace('bg-', '') : ''
                    }`}
                    onClick={() => onItemClick(category.name)}
                >
                    <div className="absolute inset-0 opacity-30">
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="relative z-10">
                        <div className={`h-12 w-12 ${colors.primary} mb-3 flex items-center justify-center rounded-2xl shadow-md`}>
                            <i className="fas fa-utensils text-lg text-white"></i>
                        </div>
                        <h3 className={`${getTextClass('primary')} text-sm font-semibold`}>{category.name}</h3>
                        <p className={`${getTextClass('tertiary')} mt-1 text-xs`}>12+ stores</p>
                    </div>
                    {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} opacity-10`}></div>}
                </div>
            ))}
        </div>
    );
};
