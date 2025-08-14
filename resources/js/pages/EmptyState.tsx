import React from 'react';
import { StyleHelpers } from './types';

interface EmptyStateProps {
    type: 'select-category' | 'select-subcategory' | 'no-offers';
    selectedCategory?: string;
    styleHelpers: StyleHelpers;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, selectedCategory, styleHelpers }) => {
    const { getCardBgClass, getTextClass } = styleHelpers;

    const getContent = () => {
        switch (type) {
            case 'select-category':
                return {
                    icon: 'fa-search',
                    title: 'Select a category',
                    description: 'Choose a category above to see available options',
                };
            case 'select-subcategory':
                return {
                    icon: 'fa-list',
                    title: 'Select a type',
                    description: `Choose from ${selectedCategory?.toLowerCase()} options above to see available offers`,
                };
            case 'no-offers':
                return {
                    icon: 'fa-store-slash',
                    title: 'No offers available',
                    description: 'Try selecting a different type',
                };
            default:
                return {
                    icon: 'fa-search',
                    title: 'Select a category',
                    description: 'Choose a category above to see available options',
                };
        }
    };

    const content = getContent();

    return (
        <div className={`${getCardBgClass()} rounded-2xl p-8 text-center`}>
            <i className={`fas ${content.icon} ${getTextClass('tertiary')} mb-4 text-4xl`}></i>
            <h3 className={`${getTextClass('primary')} mb-2 text-lg font-semibold`}>{content.title}</h3>
            <p className={`${getTextClass('secondary')} text-sm`}>{content.description}</p>
        </div>
    );
};
