import { StyleHelpers } from './types';

export const useStyleHelpers = (): StyleHelpers => {
    // Fixed tangerine color and neon background
    const customColor = '#FF9500';
    const isCustomTheme = true;

    const colors = {
        primary: 'bg-orange-400',
        primaryHover: 'hover:bg-orange-500',
        primaryDark: 'bg-orange-500',
        accent: 'text-orange-400',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-400',
    };

    const hexToRgba = (hex: string, alpha: number) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(
            h.length === 3
                ? h
                      .split('')
                      .map((c) => c + c)
                      .join('')
                : h,
            16,
        );
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const shadowSizeClass = (size: 'md' | 'lg' | 'xl' | '2xl') =>
        size === 'md' ? 'shadow-md' : size === 'lg' ? 'shadow-lg' : size === 'xl' ? 'shadow-xl' : 'shadow-2xl';

    const getShadowClass = (size: 'md' | 'lg' | 'xl' | '2xl', opacity: number = 0.2) => {
        const sz = shadowSizeClass(size);
        return sz; // Simplified for custom theme
    };

    const getShadowStyle = (size: 'md' | 'lg' | 'xl' | '2xl', opacity: number = 0.2) => {
        const c = hexToRgba(customColor, opacity);
        const map: Record<'md' | 'lg' | 'xl' | '2xl', string> = {
            md: `0 4px 6px -1px ${c}, 0 2px 4px -2px ${c}`,
            lg: `0 10px 15px -3px ${c}, 0 4px 6px -4px ${c}`,
            xl: `0 20px 25px -5px ${c}, 0 10px 10px -5px ${c}`,
            '2xl': `0 25px 50px -12px ${c}`,
        };
        return { boxShadow: map[size] };
    };

    // Fixed neon background
    const getBackgroundClass = () => 'bg-black';

    const getCardBgClass = () => 'bg-gray-900/80 border border-orange-400/30';

    const getSurfaceBgClass = () => 'bg-gray-900/60 border border-orange-400/30';

    const getTextClass = (type: 'primary' | 'secondary' | 'tertiary' | 'muted') => {
        if (type === 'primary') return 'text-white';
        if (type === 'secondary') return 'text-gray-200';
        if (type === 'tertiary') return 'text-gray-400';
        return 'text-gray-500';
    };

    const getAccentClass = () => `text-[${customColor}]`;

    const getButtonBgClass = (isActive: boolean) => {
        if (isActive) {
            return `bg-[${customColor}] text-white ${getShadowClass('lg', 0.5)}`;
        }
        return `bg-gray-900/60 text-gray-200 border border-orange-400/30`;
    };

    return {
        colors,
        customColor,
        isCustomTheme,
        getBackgroundClass,
        getCardBgClass,
        getSurfaceBgClass,
        getTextClass,
        getAccentClass,
        getButtonBgClass,
        getShadowClass,
        getShadowStyle,
    };
};
