import { BackgroundType, LayoutType, ThemeClasses, themes, ThemeType } from './themes';
import { StyleHelpers } from './types';

export const useStyleHelpers = (theme: ThemeType, background: BackgroundType, layout: LayoutType, customColor?: string): StyleHelpers => {
    const colors = themes[theme];

    // Handle custom color when theme is 'custom'
    const isCustomTheme = theme === 'custom' && Boolean(customColor);

    const parseBgToBase = (bg: string) => (bg.startsWith('bg-') ? bg.slice(3) : bg);
    const colorBase = parseBgToBase(colors.primary);
    const shadowByBase: Record<string, Record<number, string>> = {
        'blue-500': { 10: 'shadow-blue-500/10', 20: 'shadow-blue-500/20', 30: 'shadow-blue-500/30', 50: 'shadow-blue-500/50' },
        'lime-500': { 10: 'shadow-lime-500/10', 20: 'shadow-lime-500/20', 30: 'shadow-lime-500/30', 50: 'shadow-lime-500/50' },
        'lime-700': { 10: 'shadow-lime-700/10', 20: 'shadow-lime-700/20', 30: 'shadow-lime-700/30', 50: 'shadow-lime-700/50' },
        'emerald-500': { 10: 'shadow-emerald-500/10', 20: 'shadow-emerald-500/20', 30: 'shadow-emerald-500/30', 50: 'shadow-emerald-500/50' },
        'emerald-600': { 10: 'shadow-emerald-600/10', 20: 'shadow-emerald-600/20', 30: 'shadow-emerald-600/30', 50: 'shadow-emerald-600/50' },
        'emerald-700': { 10: 'shadow-emerald-700/10', 20: 'shadow-emerald-700/20', 30: 'shadow-emerald-700/30', 50: 'shadow-emerald-700/50' },
        'green-400': { 10: 'shadow-green-400/10', 20: 'shadow-green-400/20', 30: 'shadow-green-400/30', 50: 'shadow-green-400/50' },
        'green-500': { 10: 'shadow-green-500/10', 20: 'shadow-green-500/20', 30: 'shadow-green-500/30', 50: 'shadow-green-500/50' },
        'green-600': { 10: 'shadow-green-600/10', 20: 'shadow-green-600/20', 30: 'shadow-green-600/30', 50: 'shadow-green-600/50' },
        'green-700': { 10: 'shadow-green-700/10', 20: 'shadow-green-700/20', 30: 'shadow-green-700/30', 50: 'shadow-green-700/50' },
        'yellow-400': { 10: 'shadow-yellow-400/10', 20: 'shadow-yellow-400/20', 30: 'shadow-yellow-400/30', 50: 'shadow-yellow-400/50' },
        'yellow-600': { 10: 'shadow-yellow-600/10', 20: 'shadow-yellow-600/20', 30: 'shadow-yellow-600/30', 50: 'shadow-yellow-600/50' },
        'amber-500': { 10: 'shadow-amber-500/10', 20: 'shadow-amber-500/20', 30: 'shadow-amber-500/30', 50: 'shadow-amber-500/50' },
        'orange-200': { 10: 'shadow-orange-200/10', 20: 'shadow-orange-200/20', 30: 'shadow-orange-200/30', 50: 'shadow-orange-200/50' },
        'orange-300': { 10: 'shadow-orange-300/10', 20: 'shadow-orange-300/20', 30: 'shadow-orange-300/30', 50: 'shadow-orange-300/50' },
        'orange-400': { 10: 'shadow-orange-400/10', 20: 'shadow-orange-400/20', 30: 'shadow-orange-400/30', 50: 'shadow-orange-400/50' },
        'orange-500': { 10: 'shadow-orange-500/10', 20: 'shadow-orange-500/20', 30: 'shadow-orange-500/30', 50: 'shadow-orange-500/50' },
        'orange-600': { 10: 'shadow-orange-600/10', 20: 'shadow-orange-600/20', 30: 'shadow-orange-600/30', 50: 'shadow-orange-600/50' },
        'orange-700': { 10: 'shadow-orange-700/10', 20: 'shadow-orange-700/20', 30: 'shadow-orange-700/30', 50: 'shadow-orange-700/50' },
        'orange-800': { 10: 'shadow-orange-800/10', 20: 'shadow-orange-800/20', 30: 'shadow-orange-800/30', 50: 'shadow-orange-800/50' },
        'red-500': { 10: 'shadow-red-500/10', 20: 'shadow-red-500/20', 30: 'shadow-red-500/30', 50: 'shadow-red-500/50' },
        'purple-500': { 10: 'shadow-purple-500/10', 20: 'shadow-purple-500/20', 30: 'shadow-purple-500/30', 50: 'shadow-purple-500/50' },
    };
    const borderByBase: Record<string, Record<number, string>> = {
        'blue-500': { 30: 'border-blue-500/30', 50: 'border-blue-500/50' },
        'lime-500': { 30: 'border-lime-500/30', 50: 'border-lime-500/50' },
        'lime-700': { 30: 'border-lime-700/30', 50: 'border-lime-700/50' },
        'emerald-500': { 30: 'border-emerald-500/30', 50: 'border-emerald-500/50' },
        'emerald-600': { 30: 'border-emerald-600/30', 50: 'border-emerald-600/50' },
        'emerald-700': { 30: 'border-emerald-700/30', 50: 'border-emerald-700/50' },
        'green-400': { 30: 'border-green-400/30', 50: 'border-green-400/50' },
        'green-500': { 30: 'border-green-500/30', 50: 'border-green-500/50' },
        'green-600': { 30: 'border-green-600/30', 50: 'border-green-600/50' },
        'green-700': { 30: 'border-green-700/30', 50: 'border-green-700/50' },
        'yellow-400': { 30: 'border-yellow-400/30', 50: 'border-yellow-400/50' },
        'yellow-600': { 30: 'border-yellow-600/30', 50: 'border-yellow-600/50' },
        'amber-500': { 30: 'border-amber-500/30', 50: 'border-amber-500/50' },
        'orange-200': { 30: 'border-orange-200/30', 50: 'border-orange-200/50' },
        'orange-300': { 30: 'border-orange-300/30', 50: 'border-orange-300/50' },
        'orange-400': { 30: 'border-orange-400/30', 50: 'border-orange-400/50' },
        'orange-500': { 30: 'border-orange-500/30', 50: 'border-orange-500/50' },
        'orange-600': { 30: 'border-orange-600/30', 50: 'border-orange-600/50' },
        'orange-700': { 30: 'border-orange-700/30', 50: 'border-orange-700/50' },
        'orange-800': { 30: 'border-orange-800/30', 50: 'border-orange-800/50' },
        'red-500': { 30: 'border-red-500/30', 50: 'border-red-500/50' },
        'purple-500': { 30: 'border-purple-500/30', 50: 'border-purple-500/50' },
        };
    const hexToRgba = (hex: string, alpha: number) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const shadowSizeClass = (size: 'md' | 'lg' | 'xl' | '2xl') =>
        size === 'md' ? 'shadow-md' : size === 'lg' ? 'shadow-lg' : size === 'xl' ? 'shadow-xl' : 'shadow-2xl';
    const getShadowClass = (size: 'md' | 'lg' | 'xl' | '2xl', opacity: number = 0.2) => {
        const sz = shadowSizeClass(size);
        if (isCustomTheme) return sz;
        const allowed = [10, 20, 30, 50];
        const raw = Math.round(opacity * 100);
        const pct = allowed.reduce((a, b) => (Math.abs(b - raw) < Math.abs(a - raw) ? b : a), allowed[0]);
        const literal = shadowByBase[colorBase]?.[pct];
        return literal ? `${sz} ${literal}` : sz;
    };
    const getShadowStyle = (size: 'md' | 'lg' | 'xl' | '2xl', opacity: number = 0.2) => {
        if (!isCustomTheme || !customColor) return undefined;
        const c = hexToRgba(customColor, opacity);
        const map: Record<'md' | 'lg' | 'xl' | '2xl', string> = {
            md: `0 4px 6px -1px ${c}, 0 2px 4px -2px ${c}`,
            lg: `0 10px 15px -3px ${c}, 0 4px 6px -4px ${c}`,
            xl: `0 20px 25px -5px ${c}, 0 10px 10px -5px ${c}`,
            '2xl': `0 25px 50px -12px ${c}`,
        };
        return { boxShadow: map[size] };
    };

    const getBackgroundClass = () => {
        if (background === 'light') return 'bg-white';
        if (background === 'gradient') return 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100';
        if (background === 'mesh') return 'bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100';
        if (background === 'dots') return 'bg-gray-900';
        if (background === 'glass') return 'bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95';
        if (background === 'neon') return 'bg-black';
        return 'bg-gray-900';
    };

    const getCardBgClass = () => {
        if (background === 'light') return 'bg-gray-50 border border-gray-100';
        if (background === 'gradient') return 'bg-white/95 backdrop-blur-sm shadow-sm';
        if (background === 'mesh') return 'bg-white/90 backdrop-blur-sm shadow-sm';
        if (background === 'dots') return 'bg-gray-800/90 backdrop-blur-sm';
        if (background === 'glass') return 'bg-white/10 backdrop-blur-md border border-white/20';
        if (background === 'neon') {
            const borderLiteral = isCustomTheme ? '' : borderByBase[colorBase]?.[30] || '';
            return `bg-gray-900/80 border ${borderLiteral} ${getShadowClass('lg', 0.2)}`;
        }
        return 'bg-gray-800';
    };

    const getSurfaceBgClass = () => {
        if (background === 'light') return 'bg-gray-100';
        if (background === 'gradient' || background === 'mesh') return 'bg-white/80';
        if (background === 'glass') return 'bg-white/5 backdrop-blur-sm';
        if (background === 'neon') {
            const borderLiteral = isCustomTheme ? '' : borderByBase[colorBase]?.[30] || '';
            return `bg-gray-900/60 border ${borderLiteral}`;
        }
        if (isCustomTheme) return `bg-[${customColor}]/10`;
        return colors.surfaceBg;
    };

    const getTextClass = (type: 'primary' | 'secondary' | 'tertiary' | 'muted') => {
        if (background === 'light' || background === 'gradient' || background === 'mesh') {
            if (type === 'primary') return 'text-gray-900';
            if (type === 'secondary') return 'text-gray-700';
            if (type === 'tertiary') return 'text-gray-600';
            return 'text-gray-500';
        }
        if (background === 'neon' || background === 'glass' || background === 'dots' || background === 'dark') {
            if (type === 'primary') return 'text-white';
            if (type === 'secondary') return 'text-gray-200';
            if (type === 'tertiary') return 'text-gray-400';
            return 'text-gray-500';
        }
        return colors[`text${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof ThemeClasses];
    };

    const getAccentClass = () => {
        if (isCustomTheme) {
            return `text-[${customColor}]`;
        }
        if (background === 'light' || background === 'gradient' || background === 'mesh') {
            return colors.accent.replace('text-', 'text-');
        }
        return colors.accent;
    };

    const getButtonBgClass = (isActive: boolean) => {
        if (isActive) {
            if (background === 'neon') {
                if (isCustomTheme) return `bg-[${customColor}] text-white ${getShadowClass('lg', 0.5)}`;
                return `${colors.primary} text-white ${getShadowClass('lg', 0.5)}`;
            }
            if (isCustomTheme) return `bg-[${customColor}] text-white`;
            return `${colors.primary} text-white`;
        }

        if (background === 'light' || background === 'gradient' || background === 'mesh') {
            return `bg-white/80 text-gray-700 border border-gray-200`;
        }
        if (background === 'glass') {
            return `bg-white/10 text-gray-200 border border-white/20`;
        }
        if (background === 'neon') {
            return `bg-gray-900/60 text-gray-200 border ${colors.primary.replace('bg-', 'border-')}/30`;
        }
        if (background === 'dots' || background === 'dark') {
            return `${getSurfaceBgClass()} text-gray-300 border ${colors.border}`;
        }
        return `${getSurfaceBgClass()} ${getTextClass('secondary')} border ${colors.border}`;
    };

    return {
        colors,
        background,
        layout,
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
