import { useState, useEffect } from 'react';
import { useStyleHelpers } from '../hooks';

const ShopOwnerQRScannerScreen = () => {
    const [scanning, setScanning] = useState(true);
    const [scannedResult, setScannedResult] = useState<string | null>(null);
    const [scanSuccess, setScanSuccess] = useState(false);
    const [flashOn, setFlashOn] = useState(false);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const handleBack = () => {
        console.log('Navigate back to dashboard');
    };

    const handleToggleFlash = () => {
        setFlashOn(!flashOn);
        console.log('Toggle flash:', !flashOn);
    };

    const handleManualEntry = () => {
        console.log('Open manual entry dialog');
    };

    const handleScanAgain = () => {
        setScannedResult(null);
        setScanSuccess(false);
        setScanning(true);
    };

    const simulateScan = () => {
        if (scanning && !scannedResult) {
            setTimeout(() => {
                setScannedResult('BW-12345');
                setScanSuccess(true);
                setScanning(false);
            }, 3000);
        }
    };

    useEffect(() => {
        simulateScan();
    }, [scanning]);

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const renderScannerOverlay = () => {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <div className="h-64 w-64 rounded-lg border-2 border-white/30 bg-transparent">
                        <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-orange-500"></div>
                        <div className="absolute top-0 right-0 h-10 w-10 border-t-2 border-r-2 border-orange-500"></div>
                        <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-orange-500"></div>
                        <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-orange-500"></div>
                    </div>

                    {scanning && (
                        <div className="absolute top-1/2 left-0 h-0.5 w-full animate-scan bg-orange-500">
                            <div className="absolute -top-2 left-0 h-4 w-full bg-gradient-to-b from-orange-500/50 to-transparent"></div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderScanResult = () => {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className={`${getCardBgClass()} w-5/6 rounded-xl p-6 text-center`} style={getShadowStyle('xl', 0.3)}>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mx-auto">
                        <i className="fas fa-check text-2xl text-green-500"></i>
                    </div>
                    <h3 className={`${getTextClass('primary')} mb-2 text-xl font-bold`}>QR Code Scanned!</h3>
                    <p className={`${getTextClass('secondary')} mb-4`}>Customer code verified</p>
                    
                    <div className="mb-4 flex justify-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2" style={{ borderColor: customColor }}>
                            <img 
                                src="https://randomuser.me/api/portraits/men/32.jpg" 
                                alt="Customer Photo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className={`${getSurfaceBgClass()} mb-4 rounded-lg p-4`}>
                        <div className="flex items-center justify-between">
                            <span className={`${getTextClass('tertiary')} text-sm`}>Customer ID:</span>
                            <span className={`${getTextClass('primary')} font-medium`}>{scannedResult}</span>
                        </div>
                        <div className="my-2 border-t border-gray-700"></div>
                        <div className="flex items-center justify-between">
                            <span className={`${getTextClass('tertiary')} text-sm`}>Discount:</span>
                            <span className="font-medium text-green-500">15%</span>
                        </div>
                        <div className="my-2 border-t border-gray-700"></div>
                        <div className="flex items-center justify-between">
                            <span className={`${getTextClass('tertiary')} text-sm`}>Customer:</span>
                            <span className={`${getTextClass('primary')} font-medium`}>John D.</span>
                        </div>
                        <div className="my-2 border-t border-gray-700"></div>
                        <div className="flex items-center justify-between">
                            <span className={`${getTextClass('tertiary')} text-sm`}>Status:</span>
                            <span className="flex items-center font-medium text-green-500">
                                <i className="fas fa-circle mr-1 text-xs"></i> Active
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleScanAgain}
                        className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105`}
                        style={{
                            backgroundColor: customColor,
                            ...getShadowStyle('lg', 0.4),
                        }}
                    >
                        <i className="fas fa-qrcode mr-2"></i>
                        Scan Another Code
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Scan QR Code</h1>
                        <button
                            onClick={handleToggleFlash}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:scale-105 ${
                                flashOn ? 'bg-orange-500/80' : 'bg-gray-900/60'
                            }`}
                        >
                            <i className={`fas fa-bolt text-gray-200`}></i>
                        </button>
                    </div>
                </div>

                <div className="relative h-[calc(100vh-200px)]">
                    <div className="absolute inset-0 bg-black">
                        <div className="h-full w-full bg-gradient-to-b from-gray-900/20 to-black/80"></div>
                    </div>

                    {renderScannerOverlay()}

                    {scanSuccess && renderScanResult()}
                </div>

            </div>
        </div>
    );
};

export default ShopOwnerQRScannerScreen;
