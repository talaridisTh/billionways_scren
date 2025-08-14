import React, { useEffect, useRef, useState } from 'react';

type ThemeClasses = {
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

type ThemeType = 'orange' | 'blue' | 'purple' | 'green' | 'rose' | 'teal' | 'amber' | 'indigo' | 'slate' | 'crimson';
type LayoutType = 'grid' | 'cards' | 'list' | 'masonry' | 'compact' | 'timeline' | 'magazine';
type BackgroundType = 'dark' | 'light' | 'gradient' | 'mesh' | 'dots' | 'glass' | 'neon';

interface ScreenProps {
    theme: ThemeType;
    layout: LayoutType;
    background: BackgroundType;
}

interface ScreenConfig {
    id: string;
    name: string;
    component: React.FC<ScreenProps>;
    description?: string;
    icon?: string;
}

const themes: Record<ThemeType, ThemeClasses> = {
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

const backgroundStyles: Record<BackgroundType, string> = {
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    light: 'bg-gradient-to-br from-gray-100 via-white to-gray-50',
    gradient: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    mesh: 'bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900',
    dots: 'bg-gray-900',
    glass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    neon: 'bg-black',
};

const PresentationView = () => {
    const [currentScreenId, setCurrentScreenId] = useState<string>('home');
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('orange');
    const [currentLayout, setCurrentLayout] = useState<LayoutType>('grid');
    const [currentBackground, setCurrentBackground] = useState<BackgroundType>('dark');
    const [zoom, setZoom] = useState<number>(100);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [expandedSection, setExpandedSection] = useState<string>('screens');
    const frameRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Check if device is mobile on component mount and window resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            // Close sidebar automatically on mobile
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const screens: ScreenConfig[] = [{ id: 'home', name: 'Home', component: BillionwaysHomeScreen, description: 'Main dashboard', icon: 'fa-home' }];

    const layouts: Record<LayoutType, { name: string; icon: string }> = {
        grid: { name: 'Grid', icon: 'fa-th' },
        cards: { name: 'Cards', icon: 'fa-id-card' },
        list: { name: 'List', icon: 'fa-list' },
        masonry: { name: 'Masonry', icon: 'fa-th-large' },
        compact: { name: 'Compact', icon: 'fa-compress' },
        timeline: { name: 'Timeline', icon: 'fa-stream' },
        magazine: { name: 'Magazine', icon: 'fa-newspaper' },
    };

    const backgrounds: Record<BackgroundType, { name: string; icon: string; preview: string }> = {
        dark: { name: 'Dark', icon: 'fa-moon', preview: 'bg-gray-900' },
        light: { name: 'Light', icon: 'fa-sun', preview: 'bg-white' },
        gradient: { name: 'Gradient', icon: 'fa-palette', preview: 'bg-gradient-to-r from-purple-500 to-blue-500' },
        mesh: { name: 'Mesh', icon: 'fa-brush', preview: 'bg-gradient-to-r from-rose-500 to-purple-500' },
        dots: { name: 'Dots', icon: 'fa-circle', preview: 'bg-gray-800' },
        glass: { name: 'Glass', icon: 'fa-gem', preview: 'bg-gradient-to-r from-slate-700 to-purple-700' },
        neon: { name: 'Neon', icon: 'fa-bolt', preview: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600' },
    };

    const handleThemeChange = (themeName: ThemeType) => {
        setCurrentTheme(themeName);
    };

    const handleLayoutChange = (layoutKey: LayoutType) => {
        setCurrentLayout(layoutKey);
    };

    const handleBackgroundChange = (bgKey: BackgroundType) => {
        setCurrentBackground(bgKey);
    };

    const handleScreenChange = (screenId: string) => {
        setCurrentScreenId(screenId);
    };

    const handleZoomChange = (newZoom: number) => {
        setZoom(Math.max(25, Math.min(200, newZoom)));
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? '' : section);
    };

    const currentScreen = screens.find((screen) => screen.id === currentScreenId) || screens[0];
    const CurrentComponent = currentScreen.component;

    return (
        <>
            <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        .dots-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .glass-effect {
          backdrop-filter: blur(16px);
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .sidebar-section {
          transition: all 0.3s ease;
        }

        .sidebar-section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .sidebar-section-content.expanded {
          max-height: 500px;
        }
      `}</style>

            <div className="flex min-h-screen flex-col bg-gray-100">
                <div className="flex items-center justify-between border-b bg-white p-3 shadow-sm">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="mr-3 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
                            aria-label="Toggle sidebar"
                        >
                            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                                <span className="text-sm font-bold text-white">B</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-1.5">
                            <button
                                onClick={() => handleZoomChange(zoom - 10)}
                                className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
                                disabled={zoom <= 25}
                            >
                                <i className="fas fa-minus text-sm"></i>
                            </button>
                            <span className="w-12 text-center text-sm font-medium text-gray-700">{zoom}%</span>
                            <button
                                onClick={() => handleZoomChange(zoom + 10)}
                                className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
                                disabled={zoom >= 200}
                            >
                                <i className="fas fa-plus text-sm"></i>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`rounded-lg p-2 transition-colors ${showGrid ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}
                        >
                            <i className="fas fa-border-all"></i>
                        </button>

                        <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800">
                            <i className="fas fa-expand"></i>
                        </button>
                    </div>
                </div>

                <div className="relative flex flex-1 overflow-hidden">
                    {sidebarOpen && isMobile && (
                        <div className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                    )}

                    <div
                        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-50 h-full w-80 overflow-hidden border-r bg-white shadow-lg transition-transform duration-300 md:w-72 lg:relative lg:z-auto ${isMobile ? '' : 'lg:translate-x-0'}`}
                    >
                        <div className="h-full overflow-y-auto">
                            <div className="border-b bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h2 className="font-semibold text-gray-800">Design System</h2>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Active</span>
                                </div>
                                <p className="text-xs text-gray-600">Customize your presentation</p>
                            </div>

                            <div className="sidebar-section">
                                <button
                                    onClick={() => toggleSection('screens')}
                                    className="flex w-full items-center justify-between border-b bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <i className="fas fa-desktop w-5 text-gray-600"></i>
                                        <span className="font-medium text-gray-800">Screens</span>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedSection === 'screens' ? 'up' : 'down'} text-sm text-gray-400`}></i>
                                </button>
                                <div className={`sidebar-section-content ${expandedSection === 'screens' ? 'expanded' : ''}`}>
                                    <div className="space-y-2 p-4">
                                        {screens.map((screen) => (
                                            <button
                                                key={screen.id}
                                                onClick={() => handleScreenChange(screen.id)}
                                                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all ${
                                                    currentScreenId === screen.id
                                                        ? 'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
                                                        : 'border border-transparent hover:bg-gray-50'
                                                }`}
                                            >
                                                <i
                                                    className={`fas ${screen.icon} ${currentScreenId === screen.id ? 'text-blue-600' : 'text-gray-400'}`}
                                                ></i>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{screen.name}</div>
                                                    <div className="mt-0.5 text-xs text-gray-500">{screen.description}</div>
                                                </div>
                                                {currentScreenId === screen.id && <i className="fas fa-check-circle text-sm text-blue-600"></i>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <button
                                    onClick={() => toggleSection('themes')}
                                    className="flex w-full items-center justify-between border-b bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <i className="fas fa-paint-brush w-5 text-gray-600"></i>
                                        <span className="font-medium text-gray-800">Color Themes</span>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedSection === 'themes' ? 'up' : 'down'} text-sm text-gray-400`}></i>
                                </button>
                                <div className={`sidebar-section-content ${expandedSection === 'themes' ? 'expanded' : ''}`}>
                                    <div className="p-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            {Object.keys(themes).map((themeName) => (
                                                <button
                                                    key={themeName}
                                                    onClick={() => handleThemeChange(themeName as ThemeType)}
                                                    className={`relative rounded-xl p-3 transition-all ${
                                                        currentTheme === themeName
                                                            ? 'scale-105 shadow-lg ring-2 ring-blue-500 ring-offset-2'
                                                            : 'hover:scale-105 hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className={`h-8 w-full rounded-lg ${themes[themeName as ThemeType].primary} mb-1`}></div>
                                                    <span className="text-xs font-medium capitalize">{themeName}</span>
                                                    {currentTheme === themeName && (
                                                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                                                            <i className="fas fa-check text-xs text-white"></i>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <button
                                    onClick={() => toggleSection('backgrounds')}
                                    className="flex w-full items-center justify-between border-b bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <i className="fas fa-image w-5 text-gray-600"></i>
                                        <span className="font-medium text-gray-800">Backgrounds</span>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedSection === 'backgrounds' ? 'up' : 'down'} text-sm text-gray-400`}></i>
                                </button>
                                <div className={`sidebar-section-content ${expandedSection === 'backgrounds' ? 'expanded' : ''}`}>
                                    <div className="p-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            {Object.entries(backgrounds).map(([bgKey, bgInfo]) => (
                                                <button
                                                    key={bgKey}
                                                    onClick={() => handleBackgroundChange(bgKey as BackgroundType)}
                                                    className={`relative overflow-hidden rounded-xl transition-all ${
                                                        currentBackground === bgKey
                                                            ? 'shadow-lg ring-2 ring-blue-500 ring-offset-2'
                                                            : 'hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className={`h-16 ${bgInfo.preview} flex items-center justify-center`}>
                                                        <i className={`fas ${bgInfo.icon} text-lg text-white opacity-50`}></i>
                                                    </div>
                                                    <div className="bg-white p-2">
                                                        <span className="text-xs font-medium">{bgInfo.name}</span>
                                                    </div>
                                                    {currentBackground === bgKey && (
                                                        <div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                                                            <i className="fas fa-check text-xs text-white"></i>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <button
                                    onClick={() => toggleSection('layouts')}
                                    className="flex w-full items-center justify-between border-b bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <i className="fas fa-layer-group w-5 text-gray-600"></i>
                                        <span className="font-medium text-gray-800">Layouts</span>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedSection === 'layouts' ? 'up' : 'down'} text-sm text-gray-400`}></i>
                                </button>
                                <div className={`sidebar-section-content ${expandedSection === 'layouts' ? 'expanded' : ''}`}>
                                    <div className="space-y-2 p-4">
                                        {Object.entries(layouts).map(([layoutKey, layoutInfo]) => (
                                            <button
                                                key={layoutKey}
                                                onClick={() => handleLayoutChange(layoutKey as LayoutType)}
                                                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                                                    currentLayout === layoutKey
                                                        ? 'border border-blue-200 bg-blue-50 text-blue-700'
                                                        : 'border border-transparent hover:bg-gray-50'
                                                }`}
                                            >
                                                <i
                                                    className={`fas ${layoutInfo.icon} ${currentLayout === layoutKey ? 'text-blue-600' : 'text-gray-400'} w-5`}
                                                ></i>
                                                <span className="flex-1 text-left text-gray-800">{layoutInfo.name}</span>
                                                {currentLayout === layoutKey && <i className="fas fa-check text-sm text-blue-600"></i>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`flex-1 ${backgroundStyles[currentBackground]} ${currentBackground === 'dots' ? 'dots-pattern' : ''} relative flex items-center justify-center overflow-auto p-8`}
                    >
                        {currentBackground === 'glass' && (
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-purple-500 blur-3xl filter"></div>
                                <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-blue-500 blur-3xl filter"></div>
                                <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-pink-500 blur-3xl filter"></div>
                            </div>
                        )}
                        {currentBackground === 'neon' && (
                            <div className="absolute inset-0">
                                <div className="absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-purple-600 blur-3xl filter"></div>
                                <div
                                    className="absolute right-10 bottom-10 h-72 w-72 animate-pulse rounded-full bg-cyan-600 blur-3xl filter"
                                    style={{ animationDelay: '1s' }}
                                ></div>
                                <div
                                    className="absolute top-1/2 left-1/4 h-72 w-72 animate-pulse rounded-full bg-pink-600 blur-3xl filter"
                                    style={{ animationDelay: '2s' }}
                                ></div>
                            </div>
                        )}
                        <div
                            ref={frameRef}
                            className={`origin-center transform transition-transform ${showGrid ? 'bg-grid-pattern' : ''} relative z-10`}
                            style={{ transform: `scale(${zoom / 100})` }}
                        >
                            <div
                                className={`overflow-hidden rounded-xl shadow-2xl ${currentBackground === 'glass' ? 'glass-effect' : currentBackground === 'neon' ? 'border border-purple-500/50 shadow-2xl shadow-purple-500/30' : 'bg-white'}`}
                            >
                                <div className="flex items-center space-x-1 bg-gray-800 p-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="mx-auto flex items-center space-x-2 text-xs text-white">
                                        <i className={`fas ${currentScreen.icon} text-xs`}></i>
                                        <span>{currentScreen.name}</span>
                                    </div>
                                </div>
                                <CurrentComponent theme={currentTheme} layout={currentLayout} background={currentBackground} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const BillionwaysHomeScreen = ({ theme, layout, background }: ScreenProps) => {
    const [selectedFilter, setSelectedFilter] = useState('offers');
    const colors = themes[theme];

    const categories = [
        { name: 'Gastronomy', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { name: 'Cosmetics', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        {
            name: 'Electrical',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        },
        { name: 'Restaurants', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    ];

    const discoveryItems = [
        {
            name: 'Restaurants',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        },
        { name: 'Cafés', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { name: 'Bars', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { name: 'Hair Salons', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        {
            name: 'Nail Studios',
            image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        },
    ];

    const stores = [
        {
            name: 'Deluxe Restaurant',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            rating: '4.1',
            reviews: '84',
            type: 'Gastronomy, Restaurant',
            time: '15-25 min',
            distance: '200m',
            tag: '10% Discount',
            tagColor: colors.primaryDark,
            openUntil: '22:00',
        },
        {
            name: 'Stylish Hair Salon',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            rating: '4.5',
            reviews: '156',
            type: 'Cosmetics, Hair Salon',
            time: '10-20 min',
            distance: '350m',
            tag: '20% Discount',
            tagColor: 'green-600',
            openUntil: '20:00',
        },
        {
            name: 'Café Specialty',
            image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            rating: '4.8',
            reviews: '89',
            type: 'Gastronomy, Café',
            time: '5-15 min',
            distance: '150m',
            tag: '20% Discount',
            tagColor: 'yellow-600',
            openUntil: '23:00',
        },
        {
            name: 'Expert Electricians',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            rating: '4.2',
            reviews: '127',
            type: 'Electrical/Craftsmen, Electrician',
            time: '20-30 min',
            distance: '500m',
            tag: '15% Discount',
            tagColor: 'blue-600',
            openUntil: '18:00',
        },
    ];

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
        if (background === 'light' || background === 'gradient' || background === 'mesh') {
            return colors.accent.replace('text-', 'text-');
        }
        return colors.accent;
    };

    const getButtonBgClass = (isActive: boolean) => {
        if (isActive) {
            if (background === 'neon') return 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50';
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

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {background === 'dots' && (
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                ></div>
            )}
            {background === 'neon' && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)`,
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            )}
            <div className={`relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg`}>
                <div className={`${getCardBgClass()} p-4`}>
                    <div className="mb-4 flex items-center justify-between">
                        <button className={`${getTextClass('tertiary')} hover:${getTextClass('primary')}`}>
                            <i className="fas fa-arrow-left text-xl"></i>
                        </button>
                        <div className="text-center">
                            <div className={`${getTextClass('tertiary')} text-xs`}>Now - Near You</div>
                        </div>
                        <button className={`${getTextClass('tertiary')} hover:${getTextClass('primary')}`}>
                            <i className="fas fa-ellipsis-vertical text-xl"></i>
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search stores, offers..."
                            className={`w-full rounded-xl p-3 pl-12 ${getSurfaceBgClass()} border-0 focus:ring-2 focus:ring-${colors.primary.replace('bg-', '')} outline-none ${getTextClass('primary')} ${
                                background === 'light' || background === 'gradient' || background === 'mesh'
                                    ? 'placeholder:text-gray-400'
                                    : background === 'neon'
                                      ? 'placeholder:text-purple-400'
                                      : 'placeholder:text-gray-500'
                            }`}
                        />
                        <i className={`fas fa-search absolute top-4 left-4 ${getAccentClass()}`}></i>
                        <button className={`absolute top-3 right-3 ${getAccentClass()}`}>
                            <i className="fas fa-sliders-h"></i>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {(layout === 'grid' || layout === 'compact') && (
                        <div className={`grid ${layout === 'compact' ? 'grid-cols-5' : 'grid-cols-4'} gap-${layout === 'compact' ? '3' : '4'} mb-6`}>
                            {categories.map((category, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className={`${layout === 'compact' ? 'h-14 w-14' : 'h-16 w-16'} ${getCardBgClass()} mx-auto mb-2 flex items-center justify-center rounded-2xl ${
                                            background === 'neon' ? '' : 'shadow-lg'
                                        } relative overflow-hidden`}
                                    >
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                    </div>
                                    <span className={`${getTextClass('secondary')} ${layout === 'compact' ? 'text-xs' : 'text-sm'}`}>
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'cards' && (
                        <div className="mb-6 grid grid-cols-2 gap-4">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${getCardBgClass()} group relative overflow-hidden rounded-3xl p-4 shadow-lg transition-transform hover:scale-105`}
                                >
                                    <div className="absolute inset-0 opacity-30">
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className={`h-12 w-12 ${colors.primary} mb-3 flex items-center justify-center rounded-2xl shadow-md`}>
                                            <i className="fas fa-utensils text-lg text-white"></i>
                                        </div>
                                        <h3 className={`${getTextClass('primary')} text-sm font-semibold`}>{category.name}</h3>
                                        <p className={`${getTextClass('tertiary')} mt-1 text-xs`}>12+ stores</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'timeline' && (
                        <div className="relative mb-6">
                            <div
                                className={`absolute top-0 bottom-0 left-6 w-0.5 ${
                                    background === 'light' || background === 'gradient' || background === 'mesh'
                                        ? 'bg-gray-300'
                                        : background === 'neon'
                                          ? 'bg-gradient-to-b from-purple-500 to-cyan-500'
                                          : 'bg-gray-600'
                                }`}
                            ></div>
                            {categories.map((category, index) => (
                                <div key={index} className="relative mb-4 flex items-center">
                                    <div
                                        className={`h-3 w-3 ${background === 'neon' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : colors.primary} absolute left-5 z-10 rounded-full`}
                                    ></div>
                                    <div className={`ml-12 ${getCardBgClass()} flex flex-1 items-center space-x-3 rounded-2xl p-3 shadow-sm`}>
                                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className={`${getTextClass('primary')} text-sm font-medium`}>{category.name}</h3>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>Available now</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'magazine' && (
                        <div className="mb-6 space-y-4">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${index === 0 ? 'h-32' : 'h-20'} ${getCardBgClass()} relative overflow-hidden rounded-2xl shadow-lg`}
                                >
                                    <img src={category.image} alt={category.name} className="h-full w-full object-cover opacity-40" />
                                    <div
                                        className={`absolute inset-0 ${
                                            background === 'light' || background === 'gradient' || background === 'mesh'
                                                ? 'bg-gradient-to-r from-gray-900/70 to-transparent'
                                                : 'bg-gradient-to-r from-black/60 to-transparent'
                                        } flex items-center px-4`}
                                    >
                                        <div>
                                            <h3 className={`font-bold text-white ${index === 0 ? 'text-xl' : 'text-base'}`}>{category.name}</h3>
                                            <p className="text-sm text-white/80">12+ stores</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'list' && (
                        <div className="mb-6 space-y-3">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${getCardBgClass()} flex items-center space-x-4 rounded-2xl p-3 shadow-sm transition-shadow hover:shadow-lg`}
                                >
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${getTextClass('primary')} text-sm font-medium`}>{category.name}</h3>
                                        <p className={`${getTextClass('tertiary')} text-xs`}>Available now</p>
                                    </div>
                                    <i className={`fas fa-chevron-right ${getTextClass('tertiary')} text-sm`}></i>
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === 'masonry' && (
                        <div className="mb-6 grid grid-cols-3 gap-3">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${index === 0 ? 'col-span-2 row-span-2' : ''} ${getCardBgClass()} group relative overflow-hidden rounded-2xl shadow-lg`}
                                >
                                    <div className="relative aspect-square">
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-2 left-2">
                                            <h3 className="text-sm font-medium text-white drop-shadow-lg">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mb-4 flex items-center justify-between">
                        <h3 className={`${getTextClass('primary')} text-lg font-semibold`}>Offers from 240 partners</h3>
                        <div className="flex items-center">
                            <div className="relative mr-2">
                                <select
                                    className={`appearance-none rounded-lg border-0 bg-transparent py-1 pr-8 pl-2 text-sm ${getAccentClass()} focus:outline-none`}
                                >
                                    <option value="relevance">Sort by</option>
                                    <option value="distance">Distance</option>
                                    <option value="rating">Rating</option>
                                    <option value="discount">Discount</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                            <button className={`${getAccentClass()} text-sm font-medium`}>All</button>
                        </div>
                    </div>

                    <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
                        <button
                            className={`${getButtonBgClass(selectedFilter === 'offers')} flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                            onClick={() => setSelectedFilter('offers')}
                        >
                            <i className="fas fa-tag text-xs"></i>
                            <span>All Discounts</span>
                        </button>
                        <button
                            className={`${getButtonBgClass(selectedFilter === 'discount20')} flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                            onClick={() => setSelectedFilter('discount20')}
                        >
                            <i className="fas fa-percent text-xs"></i>
                            <span>20% Discount</span>
                        </button>
                        <button
                            className={`${getButtonBgClass(selectedFilter === 'discount15')} flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                            onClick={() => setSelectedFilter('discount15')}
                        >
                            <i className="fas fa-percent text-xs"></i>
                            <span>15% Discount</span>
                        </button>
                        <button
                            className={`${getButtonBgClass(selectedFilter === 'discount10')} flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                            onClick={() => setSelectedFilter('discount10')}
                        >
                            <i className="fas fa-percent text-xs"></i>
                            <span>10% Discount</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {stores.slice(0, layout === 'compact' ? 2 : 4).map((store, index) => (
                            <div
                                key={index}
                                className={`${getCardBgClass()} overflow-hidden rounded-2xl ${
                                    background === 'neon' ? 'shadow-xl shadow-purple-500/10' : 'shadow-lg'
                                }`}
                            >
                                <div className="relative">
                                    <img
                                        src={store.image}
                                        alt={store.name}
                                        className={`w-full ${layout === 'compact' ? 'h-24' : 'h-32'} object-cover`}
                                    />
                                    <div
                                        className={`absolute top-3 left-3 ${
                                            background === 'neon' ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : colors.primary
                                        } rounded-lg px-2 py-1 text-xs text-white shadow-md`}
                                    >
                                        <i className="fas fa-tag mr-1"></i>
                                        {store.tag}
                                    </div>
                                    {store.hasCredit && (
                                        <div
                                            className={`absolute right-3 bottom-3 ${
                                                background === 'neon' ? 'border border-cyan-500/50 bg-black/80' : 'bg-gray-900/90'
                                            } rounded-lg px-2 py-1 text-xs text-white shadow-md backdrop-blur`}
                                        >
                                            Credit Card Available
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`${getTextClass('primary')} font-medium`}>{store.name}</h4>
                                        <button className={`${colors.primary} rounded-lg px-3 py-1.5 text-xs text-white`}>
                                            <i className="fas fa-directions mr-1"></i>
                                            Get Directions
                                        </button>
                                    </div>
                                    <p className={`${getTextClass('tertiary')} mt-1 text-xs`}>{store.type}</p>
                                    <div className="mt-2 flex items-center">
                                        <div className="flex items-center">
                                            <i className={`fas fa-star ${colors.star} mr-1 text-xs`}></i>
                                            <span className={`${getTextClass('secondary')} text-xs`}>
                                                {store.rating} ({store.reviews})
                                            </span>
                                        </div>
                                        <span className={`${getTextClass('tertiary')} mx-2 text-xs`}>•</span>
                                        <span className={`${getTextClass('tertiary')} text-xs`}>{store.time}</span>
                                        <span className={`${getTextClass('tertiary')} mx-2 text-xs`}>•</span>
                                        <span className={`${getTextClass('tertiary')} text-xs`}>{store.distance}</span>
                                        <span className={`${getTextClass('tertiary')} mx-2 text-xs`}>•</span>
                                        <span className={`${getTextClass('secondary')} text-xs`}>
                                            <i className="far fa-clock mr-1"></i>
                                            Open until {store.openUntil}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`fixed inset-x-0 bottom-0 z-10 border-t ${getCardBgClass()} p-3 shadow-lg`}>
                    <div className="grid grid-cols-5 gap-2">
                        <button className="flex flex-col items-center justify-center">
                            <i className={`fas fa-home ${colors.accent} text-lg`}></i>
                            <span className={`mt-1 text-xs ${getTextClass('secondary')}`}>Home</span>
                        </button>
                        <button className="flex flex-col items-center justify-center">
                            <i className={`fas fa-receipt text-lg ${getTextClass('tertiary')}`}></i>
                            <span className={`mt-1 text-xs ${getTextClass('secondary')}`}>My Bills</span>
                        </button>
                        <button className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.primary} mx-auto -mt-5 shadow-lg`}>
                            <i className="fas fa-qrcode text-lg text-white"></i>
                            <span className="sr-only">QR Code</span>
                        </button>
                        <button className="flex flex-col items-center justify-center">
                            <i className={`fas fa-chart-line text-lg ${getTextClass('tertiary')}`}></i>
                            <span className={`mt-1 text-xs ${getTextClass('secondary')}`}>Invest</span>
                        </button>
                        <button className="flex flex-col items-center justify-center">
                            <i className={`fas fa-user text-lg ${getTextClass('tertiary')}`}></i>
                            <span className={`mt-1 text-xs ${getTextClass('secondary')}`}>Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresentationView;
