export interface ScreenProps {
    // Fixed values, no props needed
}

export interface StyleHelpers {
    colors: {
        primary: string;
        primaryHover: string;
        primaryDark: string;
        accent: string;
        background: string;
        cardBg: string;
        surfaceBg: string;
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        textMuted: string;
        border: string;
        star: string;
    };
    customColor: string;
    isCustomTheme: boolean;
    getBackgroundClass: () => string;
    getCardBgClass: () => string;
    getSurfaceBgClass: () => string;
    getTextClass: (type: 'primary' | 'secondary' | 'tertiary' | 'muted') => string;
    getAccentClass: () => string;
    getButtonBgClass: (isActive: boolean) => string;
    getShadowClass: (size: 'md' | 'lg' | 'xl' | '2xl', opacity?: number) => string;
    getShadowStyle: (size: 'md' | 'lg' | 'xl' | '2xl', opacity?: number) => React.CSSProperties | undefined;
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
