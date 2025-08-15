import React from 'react';
import { BubbleCloudLayout } from './BubbleCloudLayout';
import { CardsLayout } from './CardsLayout';
import { CarouselHorizontalLayout } from './CarouselHorizontalLayout';
import { CircularGridLayout } from './CircularGridLayout';
import { DenseGridLayout } from './DenseGridLayout';
import { FlexGridLayout } from './FlexGridLayout';
import { FloatingMinimalLayout } from './FloatingMinimalLayout';
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
        case 'carousel':
            return (
                <CarouselHorizontalLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />
            );
        case 'bubble':
            return <BubbleCloudLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />;
        case 'floating':
            return (
                <FloatingMinimalLayout categories={categories} selectedItem={selectedItem} onItemClick={onItemClick} styleHelpers={styleHelpers} />
            );
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
