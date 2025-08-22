import React from 'react';
import { CategoryLayoutProps } from './types';

export const GridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { getCardBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    if (categories.length <= 4) {
        return (
            <div className="mb-6 grid grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="text-center">
                        <div
                            className={`h-16 w-16 ${getCardBgClass()} relative mx-auto mb-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition-transform hover:scale-105 ${
                                selectedItem === category.name ? 'ring-2' : ''
                            }`}
                            style={
                                selectedItem === category.name
                                    ? {
                                          ...getShadowStyle('xl', 0.1),
                                          ringColor: customColor,
                                      }
                                    : getShadowStyle('xl', 0.1)
                            }
                            onClick={() => onItemClick(category.name)}
                        >
                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                            {selectedItem === category.name && (
                                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: customColor }}></div>
                            )}
                        </div>
                        <span className={`${getTextClass('secondary')} text-sm`}>{category.name}</span>
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
                                className={`h-16 w-16 ${getCardBgClass()} relative mx-auto mb-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition-transform hover:scale-105 ${
                                    selectedItem === category.name ? 'ring-2' : ''
                                }`}
                                style={
                                    selectedItem === category.name
                                        ? {
                                              ...getShadowStyle('xl', 0.1),
                                              ringColor: customColor,
                                          }
                                        : getShadowStyle('xl', 0.1)
                                }
                                onClick={() => onItemClick(category.name)}
                            >
                                <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                {selectedItem === category.name && (
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: customColor }}></div>
                                )}
                            </div>
                            <span className={`${getTextClass('secondary')} block w-16 text-sm`}>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
