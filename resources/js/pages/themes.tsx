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

export type ThemeType =
    | 'lime'
    | 'emerald'
    | 'green'
    | 'forest'
    | 'mint'
    | 'sage'
    | 'olive'
    | 'pine'
    | 'jade'
    | 'moss'
    | 'orange'
    | 'tangerine'
    | 'coral'
    | 'peach'
    | 'amber'
    | 'sunset'
    | 'copper'
    | 'rust'
    | 'apricot'
    | 'flame'
    | 'custom';

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
    | 'staggered'
    | 'carousel'
    | 'bubble'
    | 'floating';

export type BackgroundType = 'dark' | 'light' | 'gradient' | 'mesh' | 'dots' | 'glass' | 'neon';

export const themes: Record<ThemeType, ThemeClasses> = {
    custom: {
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
    lime: {
        primary: 'bg-lime-500',
        primaryHover: 'hover:bg-lime-600',
        primaryDark: 'bg-lime-600',
        accent: 'text-lime-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-lime-500',
    },
    emerald: {
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
    green: {
        primary: 'bg-green-500',
        primaryHover: 'hover:bg-green-600',
        primaryDark: 'bg-green-600',
        accent: 'text-green-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-green-500',
    },
    forest: {
        primary: 'bg-green-700',
        primaryHover: 'hover:bg-green-800',
        primaryDark: 'bg-green-800',
        accent: 'text-green-600',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-green-600',
    },
    mint: {
        primary: 'bg-green-400',
        primaryHover: 'hover:bg-green-500',
        primaryDark: 'bg-green-500',
        accent: 'text-green-400',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-green-400',
    },
    sage: {
        primary: 'bg-green-600',
        primaryHover: 'hover:bg-green-700',
        primaryDark: 'bg-green-700',
        accent: 'text-green-500',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-green-500',
    },
    olive: {
        primary: 'bg-yellow-600',
        primaryHover: 'hover:bg-yellow-700',
        primaryDark: 'bg-yellow-700',
        accent: 'text-yellow-600',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-yellow-600',
    },
    pine: {
        primary: 'bg-emerald-700',
        primaryHover: 'hover:bg-emerald-800',
        primaryDark: 'bg-emerald-800',
        accent: 'text-emerald-600',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-emerald-600',
    },
    jade: {
        primary: 'bg-emerald-600',
        primaryHover: 'hover:bg-emerald-700',
        primaryDark: 'bg-emerald-700',
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
    moss: {
        primary: 'bg-lime-700',
        primaryHover: 'hover:bg-lime-800',
        primaryDark: 'bg-lime-800',
        accent: 'text-lime-600',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-lime-600',
    },
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
    tangerine: {
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
    },
    coral: {
        primary: 'bg-orange-200',
        primaryHover: 'hover:bg-orange-300',
        primaryDark: 'bg-orange-300',
        accent: 'text-orange-200',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-200',
    },
    peach: {
        primary: 'bg-orange-300',
        primaryHover: 'hover:bg-orange-400',
        primaryDark: 'bg-orange-400',
        accent: 'text-orange-300',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-300',
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
    sunset: {
        primary: 'bg-orange-600',
        primaryHover: 'hover:bg-orange-700',
        primaryDark: 'bg-orange-700',
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
    copper: {
        primary: 'bg-orange-700',
        primaryHover: 'hover:bg-orange-800',
        primaryDark: 'bg-orange-800',
        accent: 'text-orange-600',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-600',
    },
    rust: {
        primary: 'bg-orange-800',
        primaryHover: 'hover:bg-orange-900',
        primaryDark: 'bg-orange-900',
        accent: 'text-orange-700',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-orange-700',
    },
    apricot: {
        primary: 'bg-yellow-400',
        primaryHover: 'hover:bg-yellow-500',
        primaryDark: 'bg-yellow-500',
        accent: 'text-yellow-400',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-yellow-400',
    },
    flame: {
        primary: 'bg-red-500',
        primaryHover: 'hover:bg-red-600',
        primaryDark: 'bg-red-600',
        accent: 'text-red-400',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        surfaceBg: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        textMuted: 'text-gray-500',
        border: 'border-gray-600',
        star: 'text-red-400',
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
