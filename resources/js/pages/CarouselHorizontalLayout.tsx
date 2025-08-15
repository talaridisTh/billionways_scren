import React from 'react';
import { CategoryLayoutProps } from './types';

export const CarouselHorizontalLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6">
            <div className="scrollbar-hide flex space-x-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="group flex-shrink-0 cursor-pointer text-center"
                        style={{ scrollSnapAlign: 'start', minWidth: '100px' }}
                        onClick={() => onItemClick(category.name)}
                    >
                        <div
                            className={`h-28 w-20 ${getCardBgClass()} relative overflow-hidden rounded-3xl shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl ${
                                selectedItem === category.name ? 'ring-3 ring-offset-2' + colors.primary.replace('bg-', ' ring-') + ' shadow-2xl' : ''
                            }`}
                        >
                            <img src={category.image} alt={category.name} className="h-20 w-full rounded-t-3xl object-cover" />
                            <div className="flex h-8 items-center justify-center p-2">
                                <span className={`${getTextClass('primary')} text-center text-xs leading-tight font-semibold`}>
                                    {category.name.length > 12 ? category.name.substring(0, 10) + '...' : category.name}
                                </span>
                            </div>
                            {selectedItem === category.name && (
                                <>
                                    <div className={`absolute inset-0 ${colors.primary} rounded-3xl opacity-20`}></div>
                                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                                        <i className={`fas fa-check text-xs ${colors.accent}`}></i>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex justify-center">
                <div className="flex space-x-1">
                    {Array.from({ length: Math.ceil(categories.length / 3) }).map((_, index) => (
                        <div key={index} className={`h-2 w-2 rounded-full ${index === 0 ? colors.primary : 'bg-gray-300'} transition-colors`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
