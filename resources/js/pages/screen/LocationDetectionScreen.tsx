import { useState } from 'react';
import { useStyleHelpers } from '../hooks';

const LocationDetectionScreen = () => {
    const [locationStatus, setLocationStatus] = useState('pending'); // pending, detecting, found, denied, manual
    const [manualLocation, setManualLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [nearbyProviders, setNearbyProviders] = useState([]);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const mockNearbyProviders = [
        { name: 'Taverna Mykonos', category: 'Greek Cuisine', distance: '0.3 km', discount: '15%' },
        { name: 'Coffee Central', category: 'Café', distance: '0.5 km', discount: '10%' },
        { name: 'Hair Studio Maria', category: 'Hair Salon', distance: '0.8 km', discount: '20%' },
        { name: 'Pizza Corner', category: 'Italian Food', distance: '1.2 km', discount: '12%' },
    ];

    const handleDetectLocation = () => {
        setLocationStatus('detecting');

        // Simulate GPS detection
        setTimeout(() => {
            setCurrentLocation('Thessaloniki, Central Macedonia, GR');
            setNearbyProviders(mockNearbyProviders);
            setLocationStatus('found');
        }, 2000);
    };

    const handleManualLocation = () => {
        if (manualLocation.trim()) {
            setCurrentLocation(manualLocation);
            setNearbyProviders(mockNearbyProviders);
            setLocationStatus('found');
        }
    };

    const handleSkipLocation = () => {
        setLocationStatus('found');
        setCurrentLocation('Location not specified');
        setNearbyProviders([]);
    };

    const handleContinue = () => {
        console.log('Continue to main app with location:', currentLocation);
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

            <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                <div className="flex min-h-screen flex-col justify-center p-6">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-orange-400/30 bg-gray-900/80"
                            style={getShadowStyle('lg', 0.3)}
                        >
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white"
                                style={{ backgroundColor: customColor }}
                            >
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>

                        <h1 className="mb-2 text-xl font-bold text-white">Find Local Deals</h1>
                        <h2 className="mb-4 text-2xl font-bold" style={{ color: customColor }}>
                            What's Your Location?
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-200">We'll show you nearby stores and exclusive discounts in your area</p>
                    </div>

                    {/* Location Detection */}
                    {locationStatus === 'pending' && (
                        <div className={`${getCardBgClass()} mb-6 rounded-2xl p-6`} style={getShadowStyle('xl', 0.2)}>
                            <div className="mb-6 text-center">
                                <i className="fas fa-location-dot mb-4 text-4xl" style={{ color: customColor }}></i>
                                <h3 className={`${getTextClass('primary')} mb-3 text-lg font-semibold`}>Enable Location Services</h3>
                                <p className={`${getTextClass('secondary')} mb-6 text-sm leading-relaxed`}>
                                    Allow location access to discover amazing deals and discounts within 5-10 km of your area
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleDetectLocation}
                                    className="w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                                    style={{
                                        backgroundColor: customColor,
                                        ...getShadowStyle('lg', 0.4),
                                    }}
                                >
                                    <i className="fas fa-location-crosshairs mr-2"></i>
                                    Use My Current Location
                                </button>

                                <button
                                    onClick={() => setLocationStatus('manual')}
                                    className="w-full rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105"
                                >
                                    <i className="fas fa-edit mr-2"></i>
                                    Enter Location Manually
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={handleSkipLocation}
                                    className={`${getTextClass('tertiary')} text-sm hover:${getTextClass('secondary')} transition-all`}
                                >
                                    Skip for now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Detecting Location */}
                    {locationStatus === 'detecting' && (
                        <div className={`${getCardBgClass()} mb-6 rounded-2xl p-6 text-center`} style={getShadowStyle('xl', 0.2)}>
                            <div className="mb-4">
                                <i className="fas fa-spinner fa-spin mb-4 text-4xl" style={{ color: customColor }}></i>
                                <h3 className={`${getTextClass('primary')} mb-2 text-lg font-semibold`}>Detecting Your Location</h3>
                                <p className={`${getTextClass('secondary')} text-sm`}>Finding nearby stores and deals...</p>
                            </div>
                        </div>
                    )}

                    {/* Manual Location Input */}
                    {locationStatus === 'manual' && (
                        <div className={`${getCardBgClass()} mb-6 rounded-2xl p-6`} style={getShadowStyle('xl', 0.2)}>
                            <h3 className={`${getTextClass('primary')} mb-4 text-lg font-semibold`}>Enter Your Location</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>City or Address</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={manualLocation}
                                            onChange={(e) => setManualLocation(e.target.value)}
                                            placeholder="e.g., Thessaloniki, Athens, or full address"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} pl-12 placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                        />
                                        <i className="fas fa-search absolute top-3.5 left-4 text-sm" style={{ color: customColor }}></i>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setLocationStatus('pending')}
                                        className="rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleManualLocation}
                                        disabled={!manualLocation.trim()}
                                        className={`rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:scale-105 ${
                                            manualLocation.trim() ? '' : 'opacity-50'
                                        }`}
                                        style={{ backgroundColor: customColor }}
                                    >
                                        Find Deals
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Location Found & Nearby Providers */}
                    {locationStatus === 'found' && (
                        <div className="space-y-4">
                            {/* Current Location */}
                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <div className="mb-2 flex items-center">
                                    <i className="fas fa-map-marker-alt mr-3 text-lg" style={{ color: customColor }}></i>
                                    <div>
                                        <p className={`${getTextClass('primary')} font-semibold`}>Current Location</p>
                                        <p className={`${getTextClass('secondary')} text-sm`}>{currentLocation}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLocationStatus('pending')}
                                    className="text-sm transition-all hover:underline"
                                    style={{ color: customColor }}
                                >
                                    Change Location
                                </button>
                            </div>

                            {/* Nearby Providers */}
                            {nearbyProviders.length > 0 && (
                                <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                    <h3 className={`${getTextClass('primary')} mb-4 flex items-center font-semibold`}>
                                        <i className="fas fa-store mr-2" style={{ color: customColor }}></i>
                                        Nearby Deals ({nearbyProviders.length})
                                    </h3>

                                    <div className="max-h-48 space-y-3 overflow-y-auto">
                                        {nearbyProviders.map((provider, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                                                <div className="flex items-center">
                                                    <div
                                                        className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg"
                                                        style={{ backgroundColor: `${customColor}20` }}
                                                    >
                                                        <i className="fas fa-store text-xs" style={{ color: customColor }}></i>
                                                    </div>
                                                    <div>
                                                        <p className={`${getTextClass('primary')} text-sm font-medium`}>{provider.name}</p>
                                                        <p className={`${getTextClass('tertiary')} text-xs`}>
                                                            {provider.category} • {provider.distance}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className="rounded px-2 py-1 text-xs font-medium"
                                                    style={{ backgroundColor: `${customColor}20`, color: customColor }}
                                                >
                                                    {provider.discount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Continue Button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleContinue}
                                    className="w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                                    style={{
                                        backgroundColor: customColor,
                                        ...getShadowStyle('lg', 0.4),
                                    }}
                                >
                                    <i className="fas fa-arrow-right mr-2"></i>
                                    Continue to App
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Location Benefits */}
                    <div className={`${getSurfaceBgClass()} mt-6 rounded-xl p-4`}>
                        <h4 className={`${getTextClass('primary')} mb-3 flex items-center font-semibold`}>
                            <i className="fas fa-star mr-2 text-sm" style={{ color: customColor }}></i>
                            Why Share Your Location?
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <i className="fas fa-percentage mt-1 mr-2 text-xs" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Discover exclusive discounts near you</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-map-marked-alt mt-1 mr-2 text-xs" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Get directions to participating stores</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-bell mt-1 mr-2 text-xs" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Receive notifications about nearby deals</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetectionScreen;
