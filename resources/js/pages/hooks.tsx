import { BackgroundType, LayoutType, ThemeClasses, themes, ThemeType } from './themes';
import { StyleHelpers } from './types';

export const useStyleHelpers = (theme: ThemeType, background: BackgroundType, layout: LayoutType, customColor?: string): StyleHelpers => {
    const colors = themes[theme];
    
    // Handle custom color when theme is 'custom'
    const isCustomTheme = theme === 'custom' && Boolean(customColor);

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
        if (background === 'neon') return 'bg-gray-900/80 border border-purple-500/30 shadow-lg shadow-purple-500/20';
        return 'bg-gray-800';
    };

    const getSurfaceBgClass = () => {
        if (background === 'light') return 'bg-gray-100';
        if (background === 'gradient' || background === 'mesh') return 'bg-white/80';
        if (background === 'glass') return 'bg-white/5 backdrop-blur-sm';
        if (background === 'neon') return 'bg-gray-900/60 border border-cyan-500/30';
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
        if (background === 'neon') {
            if (type === 'primary') return 'text-cyan-50';
            if (type === 'secondary') return 'text-purple-200';
            if (type === 'tertiary') return 'text-pink-300';
            return 'text-gray-400';
        }
        if (background === 'glass' || background === 'dots' || background === 'dark') {
            if (type === 'primary') return 'text-white';
            if (type === 'secondary') return 'text-gray-200';
            if (type === 'tertiary') return 'text-gray-400';
            return 'text-gray-500';
        }
        return colors[`text${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof ThemeClasses];
    };

    const getAccentClass = () => {
        if (background === 'neon') {
            return 'text-cyan-400';
        }
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
            if (background === 'neon') return 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50';
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
            return `bg-gray-900/60 text-cyan-200 border border-purple-500/30`;
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
    };
};
