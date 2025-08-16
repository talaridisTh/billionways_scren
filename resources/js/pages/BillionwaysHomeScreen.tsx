import React, { useState } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { CategoryRenderer } from './CategoryRenderer';
import { categoryData, mainCategories } from './data';
import { EmptyState } from './EmptyState';
import { FilterButtons } from './FilterButtons';
import { useStyleHelpers } from './hooks';
import { StoreCard } from './StoreCard';
import { ScreenProps } from './types';

export const BillionwaysHomeScreen: React.FC<ScreenProps> = ({ theme, layout, background, customColor }) => {
    const [selectedFilter, setSelectedFilter] = useState('offers');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    const styleHelpers = useStyleHelpers(theme, background, layout, customColor);
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, getAccentClass } = styleHelpers;

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
        if (background === 'dots') {
            return (
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
            );
        }

        if (background === 'neon') {
            return (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            );
        }

        return null;
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
                    {currentStores.slice(0, layout === 'compact' ? 2 : 4).map((store, index) => (
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
                {/* Search Header */}
                <div className={`${getCardBgClass()} p-4`}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search stores, offers..."
                            style={
                                background === 'neon'
                                    ? (
                                          styleHelpers.isCustomTheme
                                              ? {
                                                    ['--tw-ring-color' as string]: styleHelpers.customColor,
                                                    ['--placeholder-color' as string]: styleHelpers.customColor,
                                                }
                                              : {
                                                    ['--placeholder-color' as string]: `var(--color-${styleHelpers.colors.accent.replace('text-', '')})`,
                                                }
                                      )
                                    : styleHelpers.isCustomTheme
                                      ? { ['--tw-ring-color' as string]: styleHelpers.customColor }
                                      : {}
                            }
                            className={`w-full rounded-xl p-3 pl-12 ${getSurfaceBgClass()} border-0 focus:ring-2 ${styleHelpers.isCustomTheme ? '' : `focus:ring-${styleHelpers.colors.primary.replace('bg-', '')}`} outline-none ${getTextClass('primary')} ${
                                background === 'light' || background === 'gradient' || background === 'mesh'
                                    ? 'placeholder:text-gray-400'
                                    : background === 'neon'
                                      ? 'placeholder-accent'
                                      : 'placeholder:text-gray-500'
                            }`}
                        />
                        <i
                            className={`fas fa-search absolute top-4 left-4 ${styleHelpers.isCustomTheme ? '' : getAccentClass()}`}
                            style={styleHelpers.isCustomTheme ? { color: styleHelpers.customColor } : {}}
                        ></i>
                        <button
                            className={`absolute top-3 right-3 ${styleHelpers.isCustomTheme ? '' : getAccentClass()}`}
                            style={styleHelpers.isCustomTheme ? { color: styleHelpers.customColor } : {}}
                        >
                            <i className="fas fa-sliders-h"></i>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {/* Main Categories */}
                    <CategoryRenderer
                        categories={mainCategories}
                        selectedItem={selectedCategory}
                        onItemClick={handleCategoryClick}
                        styleHelpers={styleHelpers}
                    />

                    {/* Subcategories */}
                    {selectedCategory && currentSubcategories.length > 0 && (
                        <div className="mb-6">
                            <h3 className={`${getTextClass('primary')} mb-3 text-lg font-semibold`}>{selectedCategory}</h3>
                            <CategoryRenderer
                                categories={currentSubcategories}
                                selectedItem={selectedSubcategory}
                                onItemClick={handleSubcategoryClick}
                                styleHelpers={styleHelpers}
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className={`${getTextClass('primary')} text-lg font-semibold`}>{getHeaderTitle()}</h3>
                        <div className="flex items-center">
                            <div className="relative mr-2">
                                <select
                                    className={`appearance-none rounded-lg border-0 bg-transparent py-1 pr-8 pl-2 text-sm ${styleHelpers.isCustomTheme ? '' : getAccentClass()} focus:outline-none`}
                                    style={styleHelpers.isCustomTheme ? { color: styleHelpers.customColor } : {}}
                                >
                                    <option value="relevance">Sort by</option>
                                    <option value="distance">Distance</option>
                                    <option value="rating">Rating</option>
                                    <option value="discount">Discount</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <i
                                        className="fas fa-chevron-down text-xs"
                                        style={styleHelpers.isCustomTheme ? { color: styleHelpers.customColor } : {}}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <FilterButtons selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} styleHelpers={styleHelpers} />

                    {/* Stores or Empty State */}
                    {renderStores()}
                </div>

                {/* Bottom Navigation */}
                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};
