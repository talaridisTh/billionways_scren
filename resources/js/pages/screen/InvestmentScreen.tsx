import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const InvestmentScreen = () => {
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Investment</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    {/* Under Development Card */}
                    <div className={`${getCardBgClass()} w-full max-w-sm rounded-xl p-8 text-center`} style={getShadowStyle('lg', 0.2)}>
                        <div className="mb-6">
                            <div
                                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                                style={{ backgroundColor: `${customColor}20` }}
                            >
                                <i className="fas fa-chart-line text-3xl" style={{ color: customColor }}></i>
                            </div>
                            <h2 className={`${getTextClass('primary')} mb-2 text-xl font-bold`}>Coming Soon</h2>
                            <p className={`${getTextClass('secondary')} text-sm leading-relaxed`}>
                                Our investment feature is currently under development. You'll be able to invest your savings and grow your money soon!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center text-left">
                                <i className="fas fa-check-circle mr-3 text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Low-risk investment options</span>
                            </div>
                            <div className="flex items-center text-left">
                                <i className="fas fa-check-circle mr-3 text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Automated savings investment</span>
                            </div>
                            <div className="flex items-center text-left">
                                <i className="fas fa-check-circle mr-3 text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Real-time portfolio tracking</span>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-700 pt-4">
                            <p className={`${getTextClass('tertiary')} text-xs`}>Get notified when this feature launches</p>
                            <button
                                className="mt-3 rounded-lg px-6 py-2 text-sm font-medium transition-all hover:scale-105"
                                style={{ backgroundColor: `${customColor}20`, color: customColor }}
                            >
                                <i className="fas fa-bell mr-2"></i>
                                Notify Me
                            </button>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className={`${getCardBgClass()} mt-6 w-full max-w-sm rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-2 flex items-center justify-between">
                            <span className={`${getTextClass('secondary')} text-sm`}>Development Progress</span>
                            <span className={`${getTextClass('secondary')} text-sm`}>75%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-700">
                            <div
                                className="h-2 rounded-full transition-all duration-1000"
                                style={{
                                    width: '75%',
                                    backgroundColor: customColor,
                                }}
                            ></div>
                        </div>
                        <p className={`${getTextClass('tertiary')} mt-2 text-xs`}>Expected launch: Q2 2025</p>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default InvestmentScreen;
