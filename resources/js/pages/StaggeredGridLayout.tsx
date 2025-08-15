import React from 'react';
import { CategoryLayoutProps } from './types';

export const StaggeredGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6 grid grid-cols-4 gap-3">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="text-center"
                    style={{
                        transform: `translateY(${(index % 2) * 8}px)`,
                    }}
                >
                    <div
                        className={`h-14 w-14 ${getCardBgClass()} relative mx-auto mb-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${
                            selectedItem === category.name ? 'ring-2 ring-offset-1' + colors.primary.replace('bg-', ' ring-') + ' shadow-xl' : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <img src={category.image} alt={category.name} className="h-full w-full rounded-2xl object-cover" />
                        {selectedItem === category.name && (
                            <>
                                <div className={`absolute inset-0 ${colors.primary} rounded-2xl opacity-25`}></div>
                                <div className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-white">
                                    <div className={`h-1.5 w-1.5 ${colors.primary} rounded-full`}></div>
                                </div>
                            </>
                        )}
                    </div>
                    <span
                        className={`${getTextClass('secondary')} block text-sm font-medium transition-colors hover:${colors.accent.replace('text-', 'text-')}`}
                    >
                        {category.name}
                    </span>
                </div>
            ))}
        </div>
    );
};
