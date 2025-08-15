import React from 'react';
import { CategoryLayoutProps } from './types';

export const GridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { layout, background, colors, getCardBgClass, getTextClass, isCustomTheme, customColor } = styleHelpers;

    if (categories.length <= 4) {
        return (
            <div className={`grid ${layout === 'compact' ? 'grid-cols-5' : 'grid-cols-4'} gap-${layout === 'compact' ? '3' : '4'} mb-6`}>
                {categories.map((category, index) => (
                    <div key={index} className="text-center">
                        <div
                            className={`${layout === 'compact' ? 'h-14 w-14' : 'h-16 w-16'} ${getCardBgClass()} mx-auto mb-2 flex items-center justify-center rounded-2xl ${
                                background === 'neon' ? '' : 'shadow-lg'
                            } relative cursor-pointer overflow-hidden transition-transform hover:scale-105 ${
                                selectedItem === category.name && !isCustomTheme ? 'ring-2 ring-' + colors.primary.replace('bg-', '') : ''
                            }`}
                            style={selectedItem === category.name && isCustomTheme ? { boxShadow: `0 0 0 2px ${customColor}` } : {}}
                            onClick={() => onItemClick(category.name)}
                        >
                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                            {selectedItem === category.name && (
                                <div 
                                    className={`absolute inset-0 ${isCustomTheme ? '' : colors.primary} opacity-20`}
                                    style={isCustomTheme ? { backgroundColor: customColor } : {}}
                                ></div>
                            )}
                        </div>
                        <span className={`${getTextClass('secondary')} ${layout === 'compact' ? 'text-xs' : 'text-sm'}`}>{category.name}</span>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="mb-6">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {categories.map((category, index) => (
                        <div key={index} className="flex-shrink-0 text-center">
                            <div
                                className={`${layout === 'compact' ? 'h-14 w-14' : 'h-16 w-16'} ${getCardBgClass()} mx-auto mb-2 flex items-center justify-center rounded-2xl ${
                                    background === 'neon' ? '' : 'shadow-lg'
                                } relative cursor-pointer overflow-hidden transition-transform hover:scale-105 ${
                                    selectedItem === category.name && !isCustomTheme ? 'ring-2 ring-' + colors.primary.replace('bg-', '') : ''
                                }`}
                                style={selectedItem === category.name && isCustomTheme ? { boxShadow: `0 0 0 2px ${customColor}` } : {}}
                                onClick={() => onItemClick(category.name)}
                            >
                                <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                {selectedItem === category.name && (
                                    <div 
                                        className={`absolute inset-0 ${isCustomTheme ? '' : colors.primary} opacity-20`}
                                        style={isCustomTheme ? { backgroundColor: customColor } : {}}
                                    ></div>
                                )}
                            </div>
                            <span className={`${getTextClass('secondary')} ${layout === 'compact' ? 'text-xs' : 'text-sm'} block w-16`}>
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
