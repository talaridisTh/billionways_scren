import React from 'react';
import { CardsLayout } from './CardsLayout';
import { CircularGridLayout } from './CircularGridLayout';
import { DenseGridLayout } from './DenseGridLayout';
import { FlexGridLayout } from './FlexGridLayout';
import { GridLayout } from './GridLayout';
import { HexagonGridLayout } from './HexagonGridLayout';
import { ListLayout } from './ListLayout';
import { MagazineLayout } from './MagazineLayout';
import { MasonryLayout } from './MasonryLayout';
import { MinimalGridLayout } from './MinimalGridLayout';
import { StaggeredGridLayout } from './StaggeredGridLayout';
import { TimelineLayout } from './TimelineLayout';
import { CategoryLayoutProps } from './types';

export const CategoryRenderer: React.FC<CategoryLayoutProps> = ({ categories, selectedItem, onItemClick, styleHelpers }) => {
    const { layout } = styleHelpers;

    switch (layout) {
        case 'grid':
        case 'compact':
            return <GridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'dense':
            return <DenseGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'minimal':
            return <MinimalGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'flex':
            return <FlexGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'circular':
            return <CircularGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'hexagon':
            return <HexagonGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'staggered':
            return <StaggeredGridLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
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
