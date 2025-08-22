import React, { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { categoryData, mainCategories } from '../data';
import { EmptyState } from '../EmptyState';
import { FilterButtons } from '../FilterButtons';
import { GridLayout } from '../GridLayout';
import { useStyleHelpers } from '../hooks';
import { StoreCard } from '../StoreCard';
import { ScreenProps } from '../types';

export const BillionwaysHomeScreen: React.FC<ScreenProps> = () => {
    const [selectedFilter, setSelectedFilter] = useState('offers');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, getAccentClass, customColor } = styleHelpers;

    const handleCategoryClick = (categoryName: string) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        } else {
            setSelectedCategory(categoryName);
            setSelectedSubcategory(null);
        }
    };

    const handleSubcategoryClick = (subcategoryName: string) => {
        if (selectedSubcategory === subcategoryName) {
            setSelectedSubcategory(null);
        } else {
            setSelectedSubcategory(subcategoryName);
        }
    };

    const currentSubcategories = selectedCategory ? categoryData[selectedCategory]?.subcategories || [] : [];
    const currentStores = selectedCategory && selectedSubcategory ? categoryData[selectedCategory]?.stores[selectedSubcategory] || [] : [];

    const renderBackgroundEffects = () => {
        return (
            <>
                {/* Black background - no effects */}
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const getHeaderTitle = () => {
        if (selectedSubcategory) {
            return `${selectedSubcategory} offers`;
        }
        if (selectedCategory) {
            return `Choose ${selectedCategory.toLowerCase()} type`;
        }
        return 'Choose a category';
    };

    const renderStores = () => {
        if (selectedSubcategory && currentStores.length > 0) {
            return (
                <div className="space-y-4">
                    {currentStores.slice(0, 4).map((store, index) => (
                        <StoreCard key={index} store={store} styleHelpers={styleHelpers} />
                    ))}
                </div>
            );
        }

        if (!selectedCategory) {
            return <EmptyState type="select-category" styleHelpers={styleHelpers} />;
        }

        if (!selectedSubcategory) {
            return <EmptyState type="select-subcategory" selectedCategory={selectedCategory} styleHelpers={styleHelpers} />;
        }

        return <EmptyState type="no-offers" styleHelpers={styleHelpers} />;
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                <div className={`p-4`}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search stores, offers..."
                            className={`w-full rounded-xl p-3 pl-12 ${getSurfaceBgClass()} border-0 outline-none focus:ring-2 ${getTextClass('primary')} placeholder:text-orange-400`}
                            style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        />
                        <i className="fas fa-search absolute top-4 left-4" style={{ color: customColor }}></i>
                        <button className="absolute top-3 right-3" style={{ color: customColor }}>
                            <i className="fas fa-map-marker-alt"></i>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <GridLayout
                        categories={mainCategories}
                        selectedItem={selectedCategory}
                        onItemClick={handleCategoryClick}
                        styleHelpers={styleHelpers}
                    />

                    {selectedCategory && currentSubcategories.length > 0 && (
                        <div className="mb-6">
                            <h3 className={`${getTextClass('primary')} mb-3 text-lg font-semibold`}>{selectedCategory}</h3>
                            <GridLayout
                                categories={currentSubcategories}
                                selectedItem={selectedSubcategory}
                                onItemClick={handleSubcategoryClick}
                                styleHelpers={styleHelpers}
                            />
                        </div>
                    )}

                    <div className="mb-4 flex items-center justify-between">
                        <h3 className={`${getTextClass('primary')} text-lg font-semibold`}>{getHeaderTitle()}</h3>
                        <div className="flex items-center">
                            <div className="relative mr-2">
                                <select
                                    className="appearance-none rounded-lg border-0 bg-transparent py-1 pr-8 pl-2 text-sm focus:outline-none"
                                    style={{ color: customColor }}
                                >
                                    <option value="relevance">Sort by</option>
                                    <option value="distance">Distance</option>
                                    <option value="rating">Rating</option>
                                    <option value="discount">Discount</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <i className="fas fa-chevron-down text-xs" style={{ color: customColor }}></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FilterButtons selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} styleHelpers={styleHelpers} />

                    {renderStores()}
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};
