import { BackgroundType, LayoutType, ThemeClasses, ThemeType } from './themes';

export interface ScreenProps {
    theme: ThemeType;
    layout: LayoutType;
    background: BackgroundType;
}

export interface StyleHelpers {
    colors: ThemeClasses;
    background: BackgroundType;
    layout: LayoutType;
    getBackgroundClass: () => string;
    getCardBgClass: () => string;
    getSurfaceBgClass: () => string;
    getTextClass: (type: 'primary' | 'secondary' | 'tertiary' | 'muted') => string;
    getAccentClass: () => string;
    getButtonBgClass: (isActive: boolean) => string;
}

export interface CategoryItemProps {
    category: { name: string; image: string };
    isSelected: boolean;
    onClick: (name: string) => void;
    styleHelpers: StyleHelpers;
    index?: number;
}

export interface CategoryLayoutProps {
    categories: { name: string; image: string; alternatives?: string[] }[];
    selectedItem: string | null;
    onItemClick: (itemName: string) => void;
    styleHelpers: StyleHelpers;
}
