import React, { useEffect, useRef, useState } from 'react';
import { BillionwaysHomeScreen } from './BillionwaysHomeScreen';
import { backgroundStyles, BackgroundType, LayoutType, themes, ThemeType } from './themes';

interface ScreenConfig {
    id: string;
    name: string;
    component: React.FC<{ theme: ThemeType; layout: LayoutType; background: BackgroundType }>;
    description?: string;
    icon?: string;
}

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

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const screens: ScreenConfig[] = [
        {
            id: 'home',
            name: 'Home',
            component: BillionwaysHomeScreen,
            description: 'Main dashboard',
            icon: 'fa-home',
        },
    ];

    const layouts: Record<LayoutType, { name: string; icon: string }> = {
        grid: { name: 'Grid', icon: 'fa-th' },
        compact: { name: 'Compact', icon: 'fa-compress' },
        dense: { name: 'Dense Grid', icon: 'fa-grip' },
        minimal: { name: 'Minimal', icon: 'fa-circle' },
        circular: { name: 'Circular', icon: 'fa-dot-circle' },
        staggered: { name: 'Staggered', icon: 'fa-layer-group' },
        carousel: { name: 'Carousel', icon: 'fa-film' },
        floating: { name: 'Floating Cards', icon: 'fa-feather-alt' },
        cards: { name: 'Cards', icon: 'fa-id-card' },
        list: { name: 'List', icon: 'fa-list' },
        masonry: { name: 'Masonry', icon: 'fa-th-large' },
        magazine: { name: 'Magazine', icon: 'fa-newspaper' },
    };

    const backgrounds: Record<BackgroundType, { name: string; icon: string; preview: string }> = {
        dark: { name: 'Dark', icon: 'fa-moon', preview: 'bg-gray-500' },
        light: { name: 'Light', icon: 'fa-sun', preview: 'bg-gray-500' },
        gradient: { name: 'Gradient', icon: 'fa-palette', preview: 'bg-gradient-to-r from-purple-500 to-blue-500' },
        mesh: { name: 'Mesh', icon: 'fa-brush', preview: 'bg-gradient-to-r from-rose-500 to-purple-500' },
        dots: { name: 'Dots', icon: 'fa-circle', preview: 'bg-gray-800' },
        glass: { name: 'Glass', icon: 'fa-gem', preview: 'bg-gradient-to-r from-slate-700 to-purple-700' },
        neon: { name: 'Neon', icon: 'fa-bolt', preview: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600' },
    };
    // #009C4A
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
          max-height: 10000px;
        }
      `}</style>

            <div className="flex min-h-screen flex-col bg-gray-100">
                {/* Header */}
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
                    {/* Mobile overlay */}
                    {sidebarOpen && isMobile && (
                        <div className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                    )}

                    {/* Sidebar */}
                    <div
                        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-50 h-full w-80 overflow-hidden border-r bg-white shadow-lg transition-transform duration-300 md:w-72 lg:relative lg:z-auto ${isMobile ? '' : 'lg:translate-x-0'}`}
                    >
                        <div className="h-full overflow-y-auto">
                            {/* Sidebar Header */}
                            <div className="border-b bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h2 className="font-semibold text-gray-800">Design System</h2>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Active</span>
                                </div>
                                <p className="text-xs text-gray-600">Customize your presentation</p>
                            </div>

                            {/* Screens Section */}
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

                            {/* Themes Section */}
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

                            {/* Backgrounds Section */}
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

                            {/* Layouts Section */}
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

                    {/* Main Content Area */}
                    <div
                        className={`flex-1 ${backgroundStyles[currentBackground]} ${currentBackground === 'dots' ? 'dots-pattern' : ''} relative flex items-center justify-center overflow-auto p-8`}
                    >
                        {/* Background Effects */}
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

                        {/* Device Frame */}
                        <div
                            ref={frameRef}
                            className={`origin-center transform transition-transform ${showGrid ? 'bg-grid-pattern' : ''} relative z-10`}
                            style={{ transform: `scale(${zoom / 100})` }}
                        >
                            <div
                                className={`overflow-hidden rounded-xl shadow-2xl ${currentBackground === 'glass' ? 'glass-effect' : currentBackground === 'neon' ? 'border border-purple-500/50 shadow-2xl shadow-purple-500/30' : 'bg-white'}`}
                            >
                                <CurrentComponent theme={currentTheme} layout={currentLayout} background={currentBackground} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PresentationView;
