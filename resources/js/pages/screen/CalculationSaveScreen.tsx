import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const CalculationSaveScreen = () => {
    const [isSaving, setIsSaving] = useState(false);
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const transactionData = {
        receiptAmount: 50.0,
        discountPercentage: 15,
        discountAmount: 7.5,
        earnings: 7.5,
        storeName: 'Taverna Mykonos',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString().slice(0, 5),
    };

    const netAmount = transactionData.receiptAmount - transactionData.discountAmount;
    const handleSaveTransaction = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            console.log('Transaction saved successfully');
        }, 2000);
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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Transaction Summary</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Success Animation */}
                    <div className="mb-6 text-center">
                        <div
                            className="mx-auto mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-full"
                            style={{ backgroundColor: `${customColor}20`, border: `2px solid ${customColor}` }}
                        >
                            <i className="fas fa-check text-3xl" style={{ color: customColor }}></i>
                        </div>
                        <h2 className={`${getTextClass('primary')} mb-2 text-lg font-bold`}>Calculation Complete!</h2>
                        <p className={`${getTextClass('secondary')} text-sm`}>Your savings have been calculated</p>
                    </div>

                    {/* Transaction Details */}
                    <div className={`${getCardBgClass()} rounded-xl p-6`} style={getShadowStyle('lg', 0.2)}>
                        <h3 className={`${getTextClass('primary')} mb-4 text-center font-semibold`}>Transaction Details</h3>

                        <div className="space-y-4">
                            {/* Store Info */}
                            <div className="border-b border-gray-700 pb-4 text-center">
                                <p className={`${getTextClass('secondary')} mb-1 text-sm`}>Store</p>
                                <p className={`${getTextClass('primary')} font-semibold`}>{transactionData.storeName}</p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>
                                    {transactionData.date} at {transactionData.time}
                                </p>
                            </div>

                            {/* Receipt Amount */}
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <i className="fas fa-receipt mr-3 text-sm" style={{ color: customColor }}></i>
                                    <span className={`${getTextClass('secondary')} text-sm`}>Receipt Amount:</span>
                                </div>
                                <span className={`${getTextClass('primary')} font-semibold`}>€{transactionData.receiptAmount.toFixed(2)}</span>
                            </div>

                            {/* Discount */}
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <i className="fas fa-percentage mr-3 text-sm" style={{ color: customColor }}></i>
                                    <span className={`${getTextClass('secondary')} text-sm`}>Discount ({transactionData.discountPercentage}%):</span>
                                </div>
                                <span className="font-semibold text-green-400">-€{transactionData.discountAmount.toFixed(2)}</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <i className="fas fa-equals mr-3 text-sm" style={{ color: customColor }}></i>
                                    <span className={`${getTextClass('secondary')} text-sm`}>Total after discount:</span>
                                </div>
                                <span className={`${getTextClass('primary')} font-semibold`}>€{netAmount.toFixed(2)}</span>
                            </div>
                            {/* Separator */}
                            <div className="my-4 border-t border-dashed border-gray-600"></div>

                            {/* Your Earnings - Highlighted */}
                            <div
                                className="rounded-xl p-4 text-center"
                                style={{ backgroundColor: `${customColor}10`, border: `1px solid ${customColor}40` }}
                            >
                                <p className={`${getTextClass('secondary')} mb-2 text-sm`}>Your Savings</p>
                                <div className="flex items-center justify-center">
                                    <i className="fas fa-coins mr-2 text-2xl" style={{ color: customColor }}></i>
                                    <span className="text-3xl font-bold" style={{ color: customColor }}>
                                        €{transactionData.earnings.toFixed(2)}
                                    </span>
                                </div>
                                <p className={`${getTextClass('tertiary')} mt-2 text-xs`}>Added to your total savings</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="flex items-start">
                            <i className="fas fa-info-circle mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                            <div>
                                <p className={`${getTextClass('secondary')} mb-2 text-sm`}>
                                    This transaction will be added to your savings history and can be viewed in the Bills section.
                                </p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>Transaction ID: TXN-{Date.now().toString().slice(-8)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSaveTransaction}
                        disabled={isSaving}
                        className={`w-full rounded-xl px-4 py-4 text-base font-semibold text-white transition-all ${
                            isSaving ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'
                        }`}
                        style={{
                            backgroundColor: customColor,
                            ...getShadowStyle('lg', 0.4),
                        }}
                    >
                        {isSaving ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Saving Transaction...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save mr-2"></i>
                                Save Transaction
                            </>
                        )}
                    </button>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105">
                            <i className="fas fa-share-alt mr-2"></i>
                            Share
                        </button>
                        <button className="rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105">
                            <i className="fas fa-download mr-2"></i>
                            Export
                        </button>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default CalculationSaveScreen;
