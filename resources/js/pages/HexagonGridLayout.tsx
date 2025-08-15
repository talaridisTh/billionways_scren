import React from 'react';
import { CategoryLayoutProps } from './types';

export const HexagonGridLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    return (
        <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category, index) => (
                    <div key={index} className="mb-2 text-center" style={{ width: '80px' }}>
                        <div
                            className={`h-16 w-16 ${getCardBgClass()} relative mx-auto mb-2 cursor-pointer overflow-hidden transition-all hover:scale-105 ${
                                selectedItem === category.name ? 'ring-2 ring-offset-1' + colors.primary.replace('bg-', ' ring-') : ''
                            }`}
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                filter:
                                    selectedItem === category.name
                                        ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                                        : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                            }}
                            onClick={() => onItemClick(category.name)}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-full w-full object-cover"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                }}
                            />
                            {selectedItem === category.name && (
                                <div
                                    className={`absolute inset-0 ${colors.primary} opacity-25`}
                                    style={{
                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    }}
                                ></div>
                            )}
                        </div>
                        <span className={`${getTextClass('secondary')} block text-xs leading-tight font-medium`}>{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
