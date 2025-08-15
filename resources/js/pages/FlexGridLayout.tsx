import React from 'react';
import { CategoryLayoutProps } from './types';

export const FlexGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 flex flex-wrap gap-3">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 text-center"
                    style={{
                        flexBasis: categories.length <= 3 ? '30%' : categories.length <= 6 ? '15%' : '12%',
                        minWidth: '80px',
                    }}
                >
                    <div
                        className={`aspect-square ${getCardBgClass()} relative mx-auto mb-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105 hover:shadow-lg ${
                            selectedItem === category.name ? 'ring-2 ring-offset-1' + colors.primary.replace('bg-', ' ring-') + ' shadow-xl' : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <img src={category.image} alt={category.name} className="h-full w-full rounded-2xl object-cover" />
                        {selectedItem === category.name && (
                            <>
                                <div className={`absolute inset-0 ${colors.primary} rounded-2xl opacity-20`}></div>
                                <div className="absolute inset-2 rounded-xl border-2 border-white opacity-80"></div>
                            </>
                        )}
                    </div>
                    <span className={`${getTextClass('secondary')} block text-xs leading-tight font-medium`}>{category.name}</span>
                </div>
            ))}
        </div>
    );
};
