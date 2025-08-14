import React from 'react';
import { CategoryLayoutProps } from './types';

export const MagazineLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { background, colors, getCardBgClass } = styleHelpers;

    return (
        <div className="mb-6 space-y-4">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`${index === 0 ? 'h-32' : 'h-20'} ${getCardBgClass()} relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl ${
                        selectedItem === category.name ? 'ring- ring-2' + colors.primary.replace('bg-', '') : ''
                    }`}
                    onClick={() => onItemClick(category.name)}
                >
                    <img src={category.image} alt={category.name} className="h-full w-full object-cover opacity-40" />
                    <div
                        className={`absolute inset-0 ${
                            background === 'light' || background === 'gradient' || background === 'mesh'
                                ? 'bg-gradient-to-r from-gray-900/70 to-transparent'
                                : 'bg-gradient-to-r from-black/60 to-transparent'
                        } flex items-center px-4`}
                    >
                        <div>
                            <h3 className={`font-bold text-white ${index === 0 ? 'text-xl' : 'text-base'}`}>{category.name}</h3>
                            <p className="text-sm text-white/80">12+ stores</p>
                        </div>
                    </div>
                    {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} opacity-10`}></div>}
                </div>
            ))}
        </div>
    );
};
