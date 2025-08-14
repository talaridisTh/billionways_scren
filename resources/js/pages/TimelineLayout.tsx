import React from 'react';
import { CategoryLayoutProps } from './types';

export const TimelineLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { background, colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="relative mb-6">
            <div
                className={`absolute top-0 bottom-0 left-6 w-0.5 ${
                    background === 'light' || background === 'gradient' || background === 'mesh'
                        ? 'bg-gray-300'
                        : background === 'neon'
                          ? 'bg-gradient-to-b from-purple-500 to-cyan-500'
                          : 'bg-gray-600'
                }`}
            ></div>
            {categories.map((category, index) => (
                <div key={index} className="relative mb-4 flex items-center">
                    <div
                        className={`h-3 w-3 ${background === 'neon' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : colors.primary} absolute left-5 z-10 cursor-pointer rounded-full ${
                            selectedItem === category.name ? 'ring-2 ring-white' : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    ></div>
                    <div
                        className={`ml-12 ${getCardBgClass()} flex flex-1 cursor-pointer items-center space-x-3 rounded-2xl p-3 shadow-sm transition-all hover:shadow-md ${
                            selectedItem === category.name ? 'ring- ring-2' + colors.primary.replace('bg-', '') : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <h3 className={`${getTextClass('primary')} text-sm font-medium`}>{category.name}</h3>
                            <p className={`${getTextClass('tertiary')} text-xs`}>Available now</p>
                        </div>
                        {selectedItem === category.name && <div className={`absolute inset-0 ${colors.primary} rounded-2xl opacity-5`}></div>}
                    </div>
                </div>
            ))}
        </div>
    );
};
