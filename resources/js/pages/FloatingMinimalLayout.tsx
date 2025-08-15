import React from 'react';
import { CategoryLayoutProps } from './types';

export const FloatingMinimalLayout: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { colors, getTextClass } = styleHelpers;

    return (
        <div className="mb-6">
            <div className="space-y-3">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`group relative cursor-pointer transition-all hover:translate-y-[-2px] ${
                            selectedItem === category.name ? 'translate-y-[-4px]' : ''
                        }`}
                        onClick={() => onItemClick(category.name)}
                    >
                        <div
                            className={`flex items-center rounded-2xl p-4 transition-all group-hover:shadow-lg ${
                                selectedItem === category.name
                                    ? `${colors.primary} text-white shadow-xl shadow-${colors.primary.replace('bg-', '')}/30`
                                    : 'border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm'
                            }`}
                        >
                            <div className="relative">
                                <div
                                    className={`h-12 w-12 overflow-hidden rounded-2xl shadow-md ${
                                        selectedItem === category.name ? 'ring-2 ring-white/50' : ''
                                    }`}
                                >
                                    <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                </div>
                                {selectedItem === category.name && (
                                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    </div>
                                )}
                            </div>

                            <div className="ml-4 flex-1">
                                <h3 className={`text-base font-semibold ${selectedItem === category.name ? 'text-white' : getTextClass('primary')}`}>
                                    {category.name}
                                </h3>
                                <p className={`mt-1 text-sm ${selectedItem === category.name ? 'text-white/80' : getTextClass('tertiary')}`}>
                                    Available now • Tap to explore
                                </p>
                            </div>

                            <div className={`transition-all ${selectedItem === category.name ? 'text-white' : getTextClass('tertiary')}`}>
                                <i className={`fas ${selectedItem === category.name ? 'fa-check-circle' : 'fa-chevron-right'} text-lg`}></i>
                            </div>
                        </div>

                        {selectedItem === category.name && (
                            <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
