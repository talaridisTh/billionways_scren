import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const QRCodeScreen = () => {
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const userData = {
        name: 'John Doe',
        userId: 'BW-12345',
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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>My QR Code</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    {/* Instruction */}
                    <div className="mb-8 text-center">
                        <h2 className={`${getTextClass('primary')} mb-2 text-lg font-semibold`}>Ready to Save Money?</h2>
                        <p className={`${getTextClass('secondary')} px-4 text-sm leading-relaxed`}>
                            Show this QR code to the store clerk to receive your discount
                        </p>
                    </div>

                    {/* QR Code Container */}
                    <div className={`${getCardBgClass()} mb-6 rounded-2xl p-8`} style={getShadowStyle('xl', 0.3)}>
                        <div className="text-center">
                            {/* QR Code */}
                            <div
                                className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-xl border-4"
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: customColor,
                                }}
                            >
                                <div className="text-center">
                                    <i className="fas fa-qrcode mb-2 text-6xl text-gray-800"></i>
                                    <div className="font-mono text-xs text-gray-600">{userData.userId}</div>
                                </div>
                            </div>

                            {/* User Name */}
                            <div className="mb-4">
                                <p className={`${getTextClass('secondary')} mb-1 text-sm`}>Account Holder</p>
                                <h3 className={`${getTextClass('primary')} text-xl font-bold`} style={{ color: customColor }}>
                                    {userData.name}
                                </h3>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-center">
                                <div className="mr-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                                <span className={`${getTextClass('secondary')} text-sm`}>Ready to scan</span>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className={`${getCardBgClass()} w-full max-w-sm rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h4 className={`${getTextClass('primary')} mb-3 flex items-center font-semibold`}>
                            <i className="fas fa-lightbulb mr-2 text-sm" style={{ color: customColor }}></i>
                            Tips for Better Scanning
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <i className="fas fa-check-circle mt-0.5 mr-2 text-xs text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Ensure good lighting</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-check-circle mt-0.5 mr-2 text-xs text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Keep screen brightness high</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-check-circle mt-0.5 mr-2 text-xs text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Hold phone steady</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 w-full max-w-sm space-y-3">

                        <button className="w-full rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-semibold text-gray-200 transition-all hover:scale-105">
                            <i className="fas fa-download mr-2"></i>
                            Save to Photos
                        </button>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default QRCodeScreen;
