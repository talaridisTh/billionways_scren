import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const MapWithQRScreen = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const userData = {
        name: 'John Doe',
        userId: 'BW-12345',
    };

    const nearbyStores = [
        {
            id: 1,
            name: 'Taverna Mykonos',
            distance: '0.2km',
            discount: '15%',
            type: 'restaurant',
            position: { top: '35%', left: '45%' },
        },
        {
            id: 2,
            name: 'Coffee Corner',
            distance: '0.4km',
            discount: '10%',
            type: 'cafe',
            position: { top: '60%', left: '25%' },
        },
        {
            id: 3,
            name: 'Fresh Market',
            distance: '0.6km',
            discount: '8%',
            type: 'market',
            position: { top: '25%', left: '65%' },
        },
        {
            id: 4,
            name: 'Bella Vista',
            distance: '0.8km',
            discount: '20%',
            type: 'restaurant',
            position: { top: '45%', left: '20%' },
        },
        {
            id: 5,
            name: 'Tech Store',
            distance: '1.1km',
            discount: '12%',
            type: 'electronics',
            position: { top: '70%', left: '70%' },
        },
    ];

    const getStoreIcon = (type) => {
        switch (type) {
            case 'restaurant':
                return 'fa-utensils';
            case 'cafe':
                return 'fa-coffee';
            case 'market':
                return 'fa-shopping-basket';
            case 'electronics':
                return 'fa-mobile-alt';
            default:
                return 'fa-store';
        }
    };

    const handleStoreClick = (store) => {
        setSelectedStore(store);
    };

    const handleShowMyQR = () => {
        console.log('Navigate to QR screen');
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Nearby Stores</h1>
                    </div>
                    <div className="mb-4">
                        <p className={`${getTextClass('secondary')} text-sm`}>Find stores near you and show your QR to save money</p>
                    </div>
                </div>

                <div className="space-y-4 p-4">
                    {/* Map Container */}
                    <div className={`${getCardBgClass()} relative rounded-xl p-1`} style={getShadowStyle('lg', 0.1)}>
                        {/* Mock Map Interface */}
                        <div
                            className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-green-900 to-green-700"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
                                    linear-gradient(45deg, rgba(22, 101, 52, 0.8) 0%, rgba(21, 128, 61, 0.8) 100%)
                                `,
                            }}
                        >
                            {/* Map Grid Pattern */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '20px 20px',
                                }}
                            ></div>

                            {/* User Location (Center) */}
                            <div
                                className="absolute z-20 h-4 w-4 rounded-full border-2 border-white shadow-lg"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: customColor,
                                }}
                            >
                                <div
                                    className="absolute inset-0 animate-ping rounded-full"
                                    style={{ backgroundColor: customColor, opacity: 0.4 }}
                                ></div>
                            </div>

                            {/* Store Markers */}
                            {nearbyStores.map((store) => (
                                <div
                                    key={store.id}
                                    className="absolute z-10 cursor-pointer"
                                    style={{
                                        top: store.position.top,
                                        left: store.position.left,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onClick={() => handleStoreClick(store)}
                                >
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${selectedStore?.id === store.id ? 'scale-110' : ''} `}
                                        style={{ backgroundColor: selectedStore?.id === store.id ? customColor : '#059669' }}
                                    >
                                        <i className={`fas ${getStoreIcon(store.type)} text-xs text-white`}></i>
                                    </div>

                                    {/* Store popup on hover/select */}
                                    {selectedStore?.id === store.id && (
                                        <div
                                            className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform ${getCardBgClass()} min-w-max rounded-lg px-2 py-1 shadow-lg`}
                                            style={getShadowStyle('md', 0.2)}
                                        >
                                            <div className="text-center">
                                                <p className={`${getTextClass('primary')} text-xs font-semibold`}>{store.name}</p>
                                                <p className={`${getTextClass('secondary')} text-xs`}>
                                                    {store.discount} • {store.distance}
                                                </p>
                                            </div>
                                            {/* Arrow */}
                                            <div
                                                className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform"
                                                style={{
                                                    borderLeft: '4px solid transparent',
                                                    borderRight: '4px solid transparent',
                                                    borderTop: '4px solid rgb(31, 41, 55)',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Map Controls */}
                            <div className="absolute top-2 right-2 flex flex-col space-y-1">
                                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 shadow-md">
                                    <i className="fas fa-plus text-xs text-gray-700"></i>
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 shadow-md">
                                    <i className="fas fa-minus text-xs text-gray-700"></i>
                                </button>
                            </div>

                            {/* Current Location Button */}
                            <button className="absolute right-2 bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md">
                                <i className="fas fa-crosshairs text-gray-700"></i>
                            </button>
                        </div>

                        {/* Map Legend */}
                        <div className="mt-2 flex items-center justify-between px-2 py-1">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: customColor }}></div>
                                    <span className={`${getTextClass('secondary')} text-xs`}>You</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-1 h-3 w-3 rounded-full bg-green-600"></div>
                                    <span className={`${getTextClass('secondary')} text-xs`}>Stores</span>
                                </div>
                            </div>
                            <span className={`${getTextClass('tertiary')} text-xs`}>Tap markers for details</span>
                        </div>
                    </div>

                    {/* Quick Store List */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>Nearby Offers</h3>
                            <span className={`${getTextClass('tertiary')} text-xs`}>{nearbyStores.length} stores</span>
                        </div>

                        <div className="space-y-2">
                            {nearbyStores.slice(0, 3).map((store) => (
                                <button
                                    key={store.id}
                                    onClick={() => handleStoreClick(store)}
                                    className={`flex w-full items-center justify-between rounded-lg p-2 transition-all ${
                                        selectedStore?.id === store.id
                                            ? 'border border-orange-500/30 bg-orange-500/20'
                                            : 'bg-gray-800/50 hover:bg-gray-800/70'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg"
                                            style={{ backgroundColor: `${customColor}20` }}
                                        >
                                            <i className={`fas ${getStoreIcon(store.type)} text-sm`} style={{ color: customColor }}></i>
                                        </div>
                                        <div className="text-left">
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>{store.name}</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>{store.distance} away</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-semibold" style={{ color: customColor }}>
                                            {store.discount}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* My QR Code Section */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-4 flex items-center justify-between font-semibold`}>
                            <div className="flex items-center">
                                <i className="fas fa-qrcode mr-2 text-sm" style={{ color: customColor }}></i>
                                My QR Code
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                <span className={`${getTextClass('tertiary')} text-xs`}>Ready to scan</span>
                            </div>
                        </h3>

                        <div className="text-center">
                            {/* QR Code Display */}
                            <div
                                className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border-3"
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: customColor,
                                }}
                            >
                                <div className="text-center">
                                    <i className="fas fa-qrcode mb-2 text-4xl text-gray-800"></i>
                                    <div className="font-mono text-xs text-gray-600">{userData.userId}</div>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="mb-4">
                                <p className={`${getTextClass('secondary')} mb-1 text-sm`}>Account Holder</p>
                                <h4 className={`${getTextClass('primary')} text-lg font-bold`} style={{ color: customColor }}>
                                    {userData.name}
                                </h4>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleShowMyQR}
                                    className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-white transition-all hover:scale-105"
                                    style={{ backgroundColor: customColor }}
                                >
                                    <i className="fas fa-expand-alt mr-1"></i>
                                    Full Screen
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className={`${getSurfaceBgClass()} rounded-lg p-3`}>
                        <div className="flex items-start">
                            <i className="fas fa-info-circle mt-0.5 mr-2 text-xs" style={{ color: customColor }}></i>
                            <div>
                                <p className={`${getTextClass('secondary')} mb-1 text-xs`}>
                                    <strong>How to save:</strong>
                                </p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>
                                    1. Visit any store on the map • 2. Show your QR code • 3. Get instant discount
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default MapWithQRScreen;
