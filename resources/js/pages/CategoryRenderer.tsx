import React from 'react';
import { CardsLayout } from './CardsLayout';
import { GridLayout } from './GridLayout';
import { ListLayout } from './ListLayout';
import { MagazineLayout } from './MagazineLayout';
import { MasonryLayout } from './MasonryLayout';
import { TimelineLayout } from './TimelineLayout';
import { CategoryLayoutProps } from './types';

export const CategoryRenderer: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { layout } = styleHelpers;

    switch (layout) {
        case 'grid':
        case 'compact':
            return <GridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'cards':
            return <CardsLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'list':
            return <ListLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'timeline':
            return <TimelineLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'magazine':
            return <MagazineLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'masonry':
            return <MasonryLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        default:
            return <GridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
    }
};
