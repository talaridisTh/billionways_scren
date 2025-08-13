import React, { useState, useRef, useEffect } from 'react';

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
    star: 'text-orange-500'
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
    star: 'text-blue-500'
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
    star: 'text-purple-500'
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
    star: 'text-emerald-500'
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
    star: 'text-rose-500'
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
    star: 'text-teal-500'
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
    star: 'text-amber-500'
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
    star: 'text-indigo-500'
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
    star: 'text-slate-400'
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
    star: 'text-red-500'
  }
};

const backgroundStyles: Record<BackgroundType, string> = {
  dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
  light: 'bg-gradient-to-br from-gray-100 via-white to-gray-50',
  gradient: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
  mesh: 'bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900',
  dots: 'bg-gray-900',
  glass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
  neon: 'bg-black'
};

const PresentationView = () => {
  const [currentScreenId, setCurrentScreenId] = useState<string>('home');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('orange');
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('grid');
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>('dark');
  const [zoom, setZoom] = useState<number>(100);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string>('screens');
  const frameRef = useRef<HTMLDivElement>(null);

  const screens: ScreenConfig[] = [
    { id: 'home', name: 'Home', component: BillionwaysHomeScreen, description: 'Main dashboard', icon: 'fa-home' },
    { id: 'stores', name: 'Stores', component: BillionwaysHomeScreen, description: 'Browse stores', icon: 'fa-store' },
    { id: 'offers', name: 'Offers', component: BillionwaysHomeScreen, description: 'Special deals', icon: 'fa-tag' },
  ];

  const layouts: Record<LayoutType, { name: string; icon: string }> = {
    grid: { name: 'Grid', icon: 'fa-th' },
    cards: { name: 'Cards', icon: 'fa-id-card' },
    list: { name: 'List', icon: 'fa-list' },
    masonry: { name: 'Masonry', icon: 'fa-th-large' },
    compact: { name: 'Compact', icon: 'fa-compress' },
    timeline: { name: 'Timeline', icon: 'fa-stream' },
    magazine: { name: 'Magazine', icon: 'fa-newspaper' }
  };

  const backgrounds: Record<BackgroundType, { name: string; icon: string; preview: string }> = {
    dark: { name: 'Dark', icon: 'fa-moon', preview: 'bg-gray-900' },
    light: { name: 'Light', icon: 'fa-sun', preview: 'bg-white' },
    gradient: { name: 'Gradient', icon: 'fa-palette', preview: 'bg-gradient-to-r from-purple-500 to-blue-500' },
    mesh: { name: 'Mesh', icon: 'fa-brush', preview: 'bg-gradient-to-r from-rose-500 to-purple-500' },
    dots: { name: 'Dots', icon: 'fa-circle', preview: 'bg-gray-800' },
    glass: { name: 'Glass', icon: 'fa-gem', preview: 'bg-gradient-to-r from-slate-700 to-purple-700' },
    neon: { name: 'Neon', icon: 'fa-bolt', preview: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600' }
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

  const currentScreen = screens.find(screen => screen.id === currentScreenId) || screens[0];
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

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="bg-white shadow-sm p-3 flex items-center justify-between border-b">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Billionways UI Kit</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <button
                onClick={() => handleZoomChange(zoom - 10)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom <= 25}
              >
                <i className="fas fa-minus text-sm"></i>
              </button>
              <span className="font-medium text-sm w-12 text-center">{zoom}%</span>
              <button
                onClick={() => handleZoomChange(zoom + 10)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom >= 200}
              >
                <i className="fas fa-plus text-sm"></i>
              </button>
            </div>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <i className="fas fa-border-all"></i>
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r shadow-lg overflow-hidden transition-all duration-300`}>
            <div className="h-full overflow-y-auto">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-gray-800">Design System</h2>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-xs text-gray-600">Customize your presentation</p>
              </div>

              <div className="sidebar-section">
                <button
                  onClick={() => toggleSection('screens')}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between border-b"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-desktop text-gray-600 w-5"></i>
                    <span className="font-medium text-gray-800">Screens</span>
                  </div>
                  <i className={`fas fa-chevron-${expandedSection === 'screens' ? 'up' : 'down'} text-gray-400 text-sm`}></i>
                </button>
                <div className={`sidebar-section-content ${expandedSection === 'screens' ? 'expanded' : ''}`}>
                  <div className="p-4 space-y-2">
                    {screens.map((screen) => (
                      <button
                        key={screen.id}
                        onClick={() => handleScreenChange(screen.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                          currentScreenId === screen.id
                            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <i className={`fas ${screen.icon} ${currentScreenId === screen.id ? 'text-blue-600' : 'text-gray-400'}`}></i>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{screen.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{screen.description}</div>
                        </div>
                        {currentScreenId === screen.id && (
                          <i className="fas fa-check-circle text-blue-600 text-sm"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <button
                  onClick={() => toggleSection('themes')}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between border-b"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-paint-brush text-gray-600 w-5"></i>
                    <span className="font-medium text-gray-800">Color Themes</span>
                  </div>
                  <i className={`fas fa-chevron-${expandedSection === 'themes' ? 'up' : 'down'} text-gray-400 text-sm`}></i>
                </button>
                <div className={`sidebar-section-content ${expandedSection === 'themes' ? 'expanded' : ''}`}>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(themes).map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => handleThemeChange(themeName as ThemeType)}
                          className={`relative p-3 rounded-xl transition-all ${
                            currentTheme === themeName
                              ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg scale-105'
                              : 'hover:shadow-md hover:scale-105'
                          }`}
                        >
                          <div className={`w-full h-8 rounded-lg ${themes[themeName as ThemeType].primary} mb-1`}></div>
                          <span className="text-xs font-medium capitalize">{themeName}</span>
                          {currentTheme === themeName && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
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
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between border-b"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-image text-gray-600 w-5"></i>
                    <span className="font-medium text-gray-800">Backgrounds</span>
                  </div>
                  <i className={`fas fa-chevron-${expandedSection === 'backgrounds' ? 'up' : 'down'} text-gray-400 text-sm`}></i>
                </button>
                <div className={`sidebar-section-content ${expandedSection === 'backgrounds' ? 'expanded' : ''}`}>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(backgrounds).map(([bgKey, bgInfo]) => (
                        <button
                          key={bgKey}
                          onClick={() => handleBackgroundChange(bgKey as BackgroundType)}
                          className={`relative rounded-xl overflow-hidden transition-all ${
                            currentBackground === bgKey
                              ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                        >
                          <div className={`h-16 ${bgInfo.preview} flex items-center justify-center`}>
                            <i className={`fas ${bgInfo.icon} text-white text-lg opacity-50`}></i>
                          </div>
                          <div className="bg-white p-2">
                            <span className="text-xs font-medium">{bgInfo.name}</span>
                          </div>
                          {currentBackground === bgKey && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <i className="fas fa-check text-white text-xs"></i>
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
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between border-b"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-layer-group text-gray-600 w-5"></i>
                    <span className="font-medium text-gray-800">Layouts</span>
                  </div>
                  <i className={`fas fa-chevron-${expandedSection === 'layouts' ? 'up' : 'down'} text-gray-400 text-sm`}></i>
                </button>
                <div className={`sidebar-section-content ${expandedSection === 'layouts' ? 'expanded' : ''}`}>
                  <div className="p-4 space-y-2">
                    {Object.entries(layouts).map(([layoutKey, layoutInfo]) => (
                      <button
                        key={layoutKey}
                        onClick={() => handleLayoutChange(layoutKey as LayoutType)}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-3 ${
                          currentLayout === layoutKey
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <i className={`fas ${layoutInfo.icon} ${currentLayout === layoutKey ? 'text-blue-600' : 'text-gray-400'} w-5`}></i>
                        <span className="flex-1 text-left">{layoutInfo.name}</span>
                        {currentLayout === layoutKey && (
                          <i className="fas fa-check text-blue-600 text-sm"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-2.5 px-4 font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
                  <i className="fas fa-download mr-2"></i>
                  Export Design
                </button>
              </div>
            </div>
          </div>

          <div className={`flex-1 ${backgroundStyles[currentBackground]} ${currentBackground === 'dots' ? 'dots-pattern' : ''} p-8 overflow-auto flex items-center justify-center relative`}>
            {currentBackground === 'glass' && (
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
              </div>
            )}
            {currentBackground === 'neon' && (
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-pink-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            )}
            <div
              ref={frameRef}
              className={`transform origin-center transition-transform ${showGrid ? 'bg-grid-pattern' : ''} relative z-10`}
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <div className={`shadow-2xl rounded-xl overflow-hidden ${currentBackground === 'glass' ? 'glass-effect' : currentBackground === 'neon' ? 'border border-purple-500/50 shadow-2xl shadow-purple-500/30' : 'bg-white'}`}>
                <div className="p-2 bg-gray-800 flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-white mx-auto flex items-center space-x-2">
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
    { name: 'Restaurants', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Καλοκαίρι', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Φαρμακεία', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Ηλεκτρονικά', image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  const discoveryItems = [
    { name: 'Ιταλική Πίτσα', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Κινέζικο', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Burger', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Ιταλικό', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'Ελληνικό', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  const stores = [
    {
      name: 'Deluxe Pizza- και Burgerhaus',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: '4.1',
      reviews: '84',
      type: 'Ιταλική Πίτσα, Burger',
      time: '15-25 λεπτά',
      distance: '200μ',
      tag: 'Παραγγελίες από 60€ κερδίζουν 15% έκπτωση',
      tagColor: colors.primaryDark,
      hasCredit: true,
    },
    {
      name: 'Burger House Premium',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: '4.5',
      reviews: '156',
      type: 'Gourmet Burgers',
      time: '10-20 λεπτά',
      distance: '350μ',
      tag: '20% Έκπτωση',
      tagColor: 'green-600',
    },
    {
      name: 'Coffee Lab Specialty',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: '4.8',
      reviews: '89',
      type: 'Coffee & Brunch',
      time: '5-15 λεπτά',
      distance: '150μ',
      tag: 'Δωρεάν Παράδοση',
      tagColor: 'yellow-600',
    },
    {
      name: 'Taverna Mykonos',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: '4.2',
      reviews: '127',
      type: 'Ελληνική Κουζίνα',
      time: '20-30 λεπτά',
      distance: '500μ',
      tag: '15% Έκπτωση',
      tagColor: 'blue-600',
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
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      )}
      {background === 'neon' && (
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      )}
      <div className={`max-w-sm mx-auto shadow-lg min-h-screen relative pb-20`}>

        <div className={`${getCardBgClass()} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <button className={`${getTextClass('tertiary')} hover:${getTextClass('primary')}`}>
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div className="text-center">
              <div className={`${getTextClass('primary')} text-lg font-medium`}>BILLIONWAYS</div>
              <div className={`${getTextClass('tertiary')} text-xs`}>Τώρα - Κοντά σας</div>
            </div>
            <button className={`${getTextClass('tertiary')} hover:${getTextClass('primary')}`}>
              <i className="fas fa-ellipsis-vertical text-xl"></i>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Αναζήτηση καταστημάτων, προσφορών..."
              className={`w-full p-3 pl-12 rounded-xl ${getSurfaceBgClass()} border-0 focus:ring-2 focus:ring-${colors.primary.replace('bg-', '')} outline-none ${getTextClass('primary')} ${
                background === 'light' || background === 'gradient' || background === 'mesh' ? 'placeholder:text-gray-400' :
                background === 'neon' ? 'placeholder:text-purple-400' :
                'placeholder:text-gray-500'
              }`}
            />
            <i className={`fas fa-search absolute left-4 top-4 ${getAccentClass()}`}></i>
            <button className={`absolute right-3 top-3 ${getAccentClass()}`}>
              <i className="fas fa-sliders-h"></i>
            </button>
          </div>
        </div>

        <div className="p-4">
          {(layout === 'grid' || layout === 'compact') && (
            <div className={`grid ${layout === 'compact' ? 'grid-cols-5' : 'grid-cols-4'} gap-${layout === 'compact' ? '3' : '4'} mb-6`}>
              {categories.map((category, index) => (
                <div key={index} className="text-center">
                  <div className={`${layout === 'compact' ? 'w-14 h-14' : 'w-16 h-16'} ${getCardBgClass()} rounded-2xl flex items-center justify-center mx-auto mb-2 ${
                    background === 'neon' ? '' : 'shadow-lg'
                  } overflow-hidden relative`}>
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <span className={`${getTextClass('secondary')} ${layout === 'compact' ? 'text-xs' : 'text-sm'}`}>{category.name}</span>
                </div>
              ))}
            </div>
          )}

          {layout === 'cards' && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {categories.map((category, index) => (
                <div key={index} className={`${getCardBgClass()} rounded-3xl p-4 shadow-lg relative overflow-hidden group hover:scale-105 transition-transform`}>
                  <div className="absolute inset-0 opacity-30">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${colors.primary} rounded-2xl flex items-center justify-center mb-3 shadow-md`}>
                      <i className="fas fa-utensils text-white text-lg"></i>
                    </div>
                    <h3 className={`${getTextClass('primary')} font-semibold text-sm`}>{category.name}</h3>
                    <p className={`${getTextClass('tertiary')} text-xs mt-1`}>12+ καταστήματα</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {layout === 'timeline' && (
            <div className="relative mb-6">
              <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${
                background === 'light' || background === 'gradient' || background === 'mesh' ? 'bg-gray-300' :
                background === 'neon' ? 'bg-gradient-to-b from-purple-500 to-cyan-500' :
                'bg-gray-600'
              }`}></div>
              {categories.map((category, index) => (
                <div key={index} className="relative flex items-center mb-4">
                  <div className={`w-3 h-3 ${background === 'neon' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : colors.primary} rounded-full absolute left-5 z-10`}></div>
                  <div className={`ml-12 ${getCardBgClass()} rounded-2xl p-3 flex items-center space-x-3 shadow-sm flex-1`}>
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className={`${getTextClass('primary')} font-medium text-sm`}>{category.name}</h3>
                      <p className={`${getTextClass('tertiary')} text-xs`}>Διαθέσιμο τώρα</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {layout === 'magazine' && (
            <div className="space-y-4 mb-6">
              {categories.map((category, index) => (
                <div key={index} className={`${index === 0 ? 'h-32' : 'h-20'} ${getCardBgClass()} rounded-2xl overflow-hidden shadow-lg relative`}>
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-40" />
                  <div className={`absolute inset-0 ${background === 'light' || background === 'gradient' || background === 'mesh' ? 'bg-gradient-to-r from-gray-900/70 to-transparent' : 'bg-gradient-to-r from-black/60 to-transparent'} flex items-center px-4`}>
                    <div>
                      <h3 className={`text-white font-bold ${index === 0 ? 'text-xl' : 'text-base'}`}>{category.name}</h3>
                      <p className="text-white/80 text-sm">12+ stores</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {layout === 'list' && (
            <div className="space-y-3 mb-6">
              {categories.map((category, index) => (
                <div key={index} className={`${getCardBgClass()} rounded-2xl p-3 flex items-center space-x-4 shadow-sm hover:shadow-lg transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`${getTextClass('primary')} font-medium text-sm`}>{category.name}</h3>
                    <p className={`${getTextClass('tertiary')} text-xs`}>Διαθέσιμο τώρα</p>
                  </div>
                  <i className={`fas fa-chevron-right ${getTextClass('tertiary')} text-sm`}></i>
                </div>
              ))}
            </div>
          )}

          {layout === 'masonry' && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {categories.map((category, index) => (
                <div key={index} className={`${index === 0 ? 'col-span-2 row-span-2' : ''} ${getCardBgClass()} rounded-2xl overflow-hidden shadow-lg relative group`}>
                  <div className="aspect-square relative">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <h3 className="text-white font-medium text-sm drop-shadow-lg">{category.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {layout !== 'list' && layout !== 'timeline' && (
            <div className="mb-6">
              <h3 className={`${getTextClass('primary')} text-lg font-semibold mb-3`}>Ανακάλυψε ό,τι σου αρέσει</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {discoveryItems.map((item, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-2 overflow-hidden relative ${
                      background === 'neon' ? 'border border-purple-500/30 shadow-lg shadow-purple-500/20' : 'shadow-md'
                    }`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 ${
                        background === 'neon' ?
                          (index === 0 ? 'bg-purple-500/20' :
                           index === 1 ? 'bg-cyan-500/20' :
                           index === 2 ? 'bg-pink-500/20' :
                           index === 3 ? 'bg-yellow-500/20' :
                           'bg-blue-500/20') :
                          (index === 0 ? 'bg-orange-500/30' :
                           index === 1 ? 'bg-purple-500/30' :
                           index === 2 ? 'bg-pink-500/30' :
                           index === 3 ? 'bg-gray-600/30' :
                           'bg-blue-500/30')
                      }`}></div>
                    </div>
                    <span className={`${getTextClass('secondary')} text-xs block text-center`}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button
              className={`${getButtonBgClass(selectedFilter === 'offers')} px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium flex items-center space-x-2 transition-all`}
              onClick={() => setSelectedFilter('offers')}
            >
              <i className="fas fa-tag text-xs"></i>
              <span>Προσφορές</span>
            </button>
            <button
              className={`${getButtonBgClass(selectedFilter === 'delivery')} px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all`}
              onClick={() => setSelectedFilter('delivery')}
            >
              Δωρεάν Παράδοση
            </button>
            <button
              className={`${getButtonBgClass(selectedFilter === 'credit')} px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all`}
              onClick={() => setSelectedFilter('credit')}
            >
              Κάρτα Πιστότητας
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className={`${getTextClass('primary')} text-lg font-semibold`}>Παραγγείλετε από 240 συνεργάτες</h3>
            <button className={`${getAccentClass()} text-sm font-medium`}>
              Όλα
            </button>
          </div>

          <div className="space-y-4">
            {stores.slice(0, layout === 'compact' ? 2 : 4).map((store, index) => (
              <div key={index} className={`${getCardBgClass()} rounded-2xl overflow-hidden ${
                background === 'neon' ? 'shadow-xl shadow-purple-500/10' : 'shadow-lg'
              }`}>
                <div className="relative">
                  <img src={store.image} alt={store.name} className={`w-full ${layout === 'compact' ? 'h-24' : 'h-32'} object-cover`} />
                  <div className={`absolute top-3 left-3 ${
                    background === 'neon' ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : colors.primary
                  } text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md`}>
                    <i className="fas fa-tag mr-1"></i>
                    {store.tag}
                  </div>
                  {store.hasCredit && (
                    <div className={`absolute bottom-3 right-3 ${
                      background === 'neon' ? 'bg-black/80 border border-cyan-500/50' : 'bg-gray-900/90'
                    } backdrop-blur text-white px-2 py-1 rounded-lg text-xs shadow-md`}>
                      Κάρτα Πιστότητας Διαθέσιμη
                    </div>
                  )}
                </div>
                <div className={`${layout === 'compact' ? 'p-3' : 'p-4'}`}>
                  <h4 className={`${getTextClass('primary')} font-semibold ${layout === 'compact' ? 'text-sm' : 'text-base'} mb-2`}>{store.name}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`flex ${getAccentClass()} text-xs items-center`}>
                      <i className="fas fa-star"></i>
                      <span className={`ml-1 ${getTextClass('tertiary')}`}>{store.rating} ({store.reviews})</span>
                    </div>
                    <span className={`${getTextClass('muted')} text-xs`}>•</span>
                    <span className={`${getTextClass('tertiary')} text-xs`}>{store.type}</span>
                  </div>
                  <p className={`${getTextClass('muted')} text-xs`}>
                    <i className={`fas fa-map-marker-alt ${getAccentClass()} mr-1`}></i>
                    {store.time} • {store.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm ${getCardBgClass()} shadow-2xl`}>
          <div className="flex justify-around py-3">
            <button className={`flex flex-col items-center p-2 ${getAccentClass()}`}>
              <i className="fas fa-home text-xl mb-1"></i>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className={`flex flex-col items-center p-2 ${getTextClass('tertiary')} hover:${getAccentClass()} transition-colors`}>
              <i className="fas fa-receipt text-xl mb-1"></i>
              <span className="text-xs">Bills</span>
            </button>
            <button className={`flex flex-col items-center p-2 ${getTextClass('tertiary')} hover:${getAccentClass()} transition-colors`}>
              <i className={`fas fa-qrcode text-2xl mb-1 ${getAccentClass()}`}></i>
              <span className={`text-xs font-medium ${getAccentClass()}`}>QR Code</span>
            </button>
            <button className={`flex flex-col items-center p-2 ${getTextClass('tertiary')} hover:${getAccentClass()} transition-colors`}>
              <i className="fas fa-chart-line text-xl mb-1"></i>
              <span className="text-xs">Investment</span>
            </button>
            <button className={`flex flex-col items-center p-2 ${getTextClass('tertiary')} hover:${getAccentClass()} transition-colors`}>
              <i className="fas fa-user text-xl mb-1"></i>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationView;
