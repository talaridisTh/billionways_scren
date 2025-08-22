import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';
import PDFViewerScreen from './PDFViewerScreen';

const StoreDetailsScreen = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const storeData = {
        name: 'Taverna Mykonos',
        address: 'Kifisias Avenue 124, Athens 11526',
        rating: 4.5,
        reviewCount: 234,
        discount: '15%',
        category: 'Greek Cuisine',
        hours: {
            today: '12:00 - 00:00',
            weekdays: 'Mon-Fri: 12:00 - 00:00',
            weekend: 'Sat-Sun: 11:00 - 01:00',
        },
        phone: '+30 210 123 4567',
        images: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
        ],
    };

    const handleBack = () => {
        console.log('Navigate back to home screen');
    };

    const handleDownloadMenu = () => {
        console.log('Opening PDF menu viewer');
        setShowPdfViewer(true);
    };

    const handleGetDirections = () => {
        console.log('Open maps for directions');
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star text-sm" style={{ color: customColor }}></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt text-sm" style={{ color: customColor }}></i>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className={`far fa-star text-sm ${getTextClass('tertiary')}`}></i>);
        }

        return stars;
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
    };

    if (showPdfViewer) {
        return <PDFViewerScreen 
            onBack={handleClosePdfViewer} 
            pdfTitle="Taverna Mykonos Menu" 
            pdfPath="/MENU-KARVOUNIARIS.pdf" 
        />;
    }

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm pb-10 shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <button
                            onClick={handleBack}
                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg border border-orange-400/30 bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Details</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Store Images */}
                    <div className={`${getCardBgClass()} overflow-hidden rounded-xl`} style={getShadowStyle('lg', 0.2)}>
                        <div className="relative">
                            <img
                                src={storeData.images[selectedImageIndex]}
                                alt={`${storeData.name} ${selectedImageIndex + 1}`}
                                className="h-48 w-full object-cover"
                            />
                            <div
                                className="absolute top-3 right-3 flex items-center space-x-1 rounded-xl px-3 py-2 text-base font-bold text-white shadow-lg"
                                style={{ backgroundColor: customColor }}
                            >
                                <i className="fas fa-percentage mr-1 text-sm"></i>
                                <span>{storeData.discount} OFF</span>
                            </div>
                        </div>

                        {/* Image thumbnails */}
                        <div className="flex space-x-2 overflow-x-auto p-3">
                            {storeData.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                        selectedImageIndex === index ? 'border-orange-400' : 'border-gray-600'
                                    }`}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Store Info */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-3">
                            <div className="flex items-center justify-between">
                                <h2 className={`${getTextClass('primary')} mb-1 text-xl font-bold`}>{storeData.name}</h2>
                                <div
                                    className="rounded-lg px-2 py-1 text-base font-bold text-white"
                                    style={{ backgroundColor: customColor }}
                                >
                                    {storeData.discount} OFF
                                </div>
                            </div>
                            <p className={`${getTextClass('secondary')} mb-2 text-sm`}>{storeData.category}</p>

                            <div className="mb-3 flex items-center space-x-2">
                                <div className="flex items-center space-x-1">{renderStars(storeData.rating)}</div>
                                <span className={`${getTextClass('secondary')} text-sm`}>
                                    {storeData.rating} ({storeData.reviewCount} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4 flex items-start">
                            <i className="fas fa-map-marker-alt mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                            <div>
                                <p className={`${getTextClass('secondary')} text-sm`}>{storeData.address}</p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="mb-4 flex items-start">
                            <i className="fas fa-clock mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                            <div>
                                <p className={`${getTextClass('primary')} mb-1 text-sm font-medium`}>Today: {storeData.hours.today}</p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>{storeData.hours.weekdays}</p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>{storeData.hours.weekend}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center">
                            <i className="fas fa-phone mr-3 text-sm" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('secondary')} text-sm`}>{storeData.phone}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleDownloadMenu}
                            className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105 ${getCardBgClass()}`}
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            <i className="fas fa-file-pdf mr-2"></i>
                            Menu (PDF)
                        </button>

                        <button
                            onClick={handleGetDirections}
                            className={`w-full rounded-xl px-4 py-3 text-base font-semibold transition-all hover:scale-105 ${getSurfaceBgClass()} ${getTextClass('primary')}`}
                            style={getShadowStyle('lg', 0.2)}
                        >
                            <i className="fas fa-directions mr-2" style={{ color: customColor }}></i>
                            Get Directions
                        </button>
                    </div>

                    {/* Features */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>Available Services</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <i className="fas fa-wifi mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Free WiFi</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-parking mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Parking</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-credit-card mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Card Payment</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-wheelchair mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Accessible</span>
                            </div>
                        </div>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default StoreDetailsScreen;
