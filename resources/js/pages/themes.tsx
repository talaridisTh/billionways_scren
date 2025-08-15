export type ThemeClasses = {
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

export type ThemeType = 'orange' | 'blue' | 'purple' | 'green' | 'rose' | 'teal' | 'amber' | 'indigo' | 'slate' | 'crimson';
export type LayoutType =
    | 'grid'
    | 'cards'
    | 'list'
    | 'masonry'
    | 'compact'
    | 'timeline'
    | 'magazine'
    | 'dense'
    | 'minimal'
    | 'flex'
    | 'circular'
    | 'hexagon'
    | 'staggered';
export type BackgroundType = 'dark' | 'light' | 'gradient' | 'mesh' | 'dots' | 'glass' | 'neon';

export const themes: Record<ThemeType, ThemeClasses> = {
    orange: {
        primary: 'bg-orange-500',
        primaryHover: 'hover:bg-orange-600',
        primaryDark: 'bg-orange-600',
        accent: 'text-orange-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-500',
    },
    blue: {
        primary: 'bg-blue-500',
        primaryHover: 'hover:bg-blue-600',
        primaryDark: 'bg-blue-600',
        accent: 'text-blue-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-blue-500',
    },
    purple: {
        primary: 'bg-purple-500',
        primaryHover: 'hover:bg-purple-600',
        primaryDark: 'bg-purple-600',
        accent: 'text-purple-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-purple-500',
    },
    green: {
        primary: 'bg-emerald-500',
        primaryHover: 'hover:bg-emerald-600',
        primaryDark: 'bg-emerald-600',
        accent: 'text-emerald-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-emerald-500',
    },
    rose: {
        primary: 'bg-rose-500',
        primaryHover: 'hover:bg-rose-600',
        primaryDark: 'bg-rose-600',
        accent: 'text-rose-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-rose-500',
    },
    teal: {
        primary: 'bg-teal-500',
        primaryHover: 'hover:bg-teal-600',
        primaryDark: 'bg-teal-600',
        accent: 'text-teal-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-teal-500',
    },
    amber: {
        primary: 'bg-amber-500',
        primaryHover: 'hover:bg-amber-600',
        primaryDark: 'bg-amber-600',
        accent: 'text-amber-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-amber-500',
    },
    indigo: {
        primary: 'bg-indigo-500',
        primaryHover: 'hover:bg-indigo-600',
        primaryDark: 'bg-indigo-600',
        accent: 'text-indigo-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-indigo-500',
    },
    slate: {
        primary: 'bg-slate-600',
        primaryHover: 'hover:bg-slate-700',
        primaryDark: 'bg-slate-700',
        accent: 'text-slate-400',
        background: 'bg-slate-900',
        cardBg: 'bg-slate-800',
        surfaceBg: 'bg-slate-700',
        textPrimary: 'text-white',
        textSecondary: 'text-slate-300',
        textTertiary: 'text-slate-400',
        textMuted: 'text-slate-500',
        border: 'border-slate-600',
        star: 'text-slate-400',
    },
    crimson: {
        primary: 'bg-red-600',
        primaryHover: 'hover:bg-red-700',
        primaryDark: 'bg-red-700',
        accent: 'text-red-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-red-500',
    },
};

export const backgroundStyles: Record<BackgroundType, string> = {
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    light: 'bg-gradient-to-br from-gray-100 via-white to-gray-50',
    gradient: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    mesh: 'bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900',
    dots: 'bg-gray-900',
    glass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    neon: 'bg-black',
};
