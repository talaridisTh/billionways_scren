import React from 'react';
import { CategoryLayoutProps } from './types';

export const BubbleCloudLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    const bubbleSizes = ['w-24 h-24', 'w-20 h-20', 'w-28 h-28', 'w-22 h-22', 'w-26 h-26', 'w-20 h-20'];
    const positions = [
        'translate-x-2 translate-y-1',
        'translate-x-8 translate-y-4',
        '-translate-x-2 translate-y-2',
        'translate-x-6 -translate-y-1',
        '-translate-x-4 translate-y-3',
        'translate-x-4 translate-y-6',
    ];

    return (
        <div className="relative mb-6 min-h-64">
            <div className="relative flex flex-wrap items-center justify-center gap-2">
                {categories.map((category, index) => {
                    const sizeClass = bubbleSizes[index % bubbleSizes.length];
                    const positionClass = positions[index % positions.length];

                    return (
                        <div
                            key={index}
                            className={`${sizeClass} ${positionClass} group relative cursor-pointer transition-all hover:scale-110`}
                            onClick={() => onItemClick(category.name)}
                        >
                            <div
                                className={`h-full w-full ${getCardBgClass()} relative overflow-hidden rounded-full shadow-lg transition-all group-hover:shadow-xl ${
                                    selectedItem === category.name
                                        ? 'ring-4 ring-offset-2' + colors.primary.replace('bg-', ' ring-') + ' shadow-2xl'
                                        : ''
                                }`}
                                style={{
                                    background:
                                        selectedItem === category.name
                                            ? `linear-gradient(135deg, ${colors.primary.replace('bg-', '')} 0%, ${colors.primaryDark.replace('bg-', '')} 100%)`
                                            : undefined,
                                }}
                            >
                                <img src={category.image} alt={category.name} className="h-full w-full rounded-full object-cover opacity-80" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 transform text-center">
                                    <span className="text-xs font-bold text-white drop-shadow-lg">
                                        {category.name.length > 8 ? category.name.substring(0, 7) + '...' : category.name}
                                    </span>
                                </div>
                                {selectedItem === category.name && (
                                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg">
                                        <i className="fas fa-heart text-xs text-red-500"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
