import React, { useState } from 'react';
import { useStyleHelpers } from '../hooks';

interface SubscriptionPackageScreenProps {
    onNext: () => void;
    onBack: () => void;
}

const SubscriptionPackageScreen: React.FC<SubscriptionPackageScreenProps> = ({ onNext, onBack }) => {
    const styleHelpers = useStyleHelpers();
    const { customColor, getShadowStyle, getCardBgClass, getTextClass, getBackgroundClass } = styleHelpers;
    const [selectedPackage, setSelectedPackage] = useState<'A' | 'B' | 'C' | null>(null);
    const [consentChecked, setConsentChecked] = useState(false);

    const packages = [
        {
            id: 'A' as const,
            name: 'Monthly',
            price: '19.70 €',
            originalPrice: '19.70 €',
            features: ['Monthly billing', 'Cancel anytime', 'Basic discounts 10%', 'Global usage', 'Customer support'],
            popular: false,
        },
        {
            id: 'B' as const,
            name: '6-Month',
            price: '107.00 €',
            originalPrice: '118.20 €',
            features: [
                'Save 9% compared to monthly',
                'All features from Monthly plan',
                'BONUS: Access to discounts up to 15%*',
                'Priority customer support',
                'Exclusive partner deals',
            ],
            popular: true,
        },
        {
            id: 'C' as const,
            name: 'Annual',
            price: '170.00 €',
            originalPrice: '236.40 €',
            features: [
                'Best value - save 28% compared to monthly',
                'All features from 6-Month plan',
                'BONUS: Access to all available discounts*',
                'Premium customer support',
                'VIP exclusive partner deals',
            ],
            popular: false,
        },
    ];

    const handleContinue = () => {
        if (selectedPackage && consentChecked) {
            onNext();
        }
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            <div className="absolute inset-0 bg-black"></div>

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                <div className="flex min-h-screen flex-col p-4">
                    <div className="mb-4 flex items-center">
                        <button
                            onClick={onBack}
                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg border border-orange-400/30 bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Choose Your Plan</h1>
                    </div>

                    <div className="mb-3 text-center">
                        <h2 className={`${getTextClass('primary')} mb-2 text-lg font-semibold`}>Select Subscription Package</h2>
                        <div className={`${getCardBgClass()} rounded-lg p-3`}>
                            <p className={`${getTextClass('secondary')} text-sm`}>
                                <i className="fas fa-gift mr-2" style={{ color: customColor }}></i>
                                <strong style={{ color: customColor }}>First month free</strong> for all plans
                            </p>
                            <p className={`${getTextClass('tertiary')} mt-1 flex items-center justify-center text-xs opacity-70`}>
                                <i className="fas fa-clock mr-1"></i>
                                Limited time
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 flex-1 space-y-3">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`${getCardBgClass()} relative cursor-pointer rounded-xl p-4 transition-all hover:scale-105`}
                                style={
                                    selectedPackage === pkg.id
                                        ? {
                                              ...getShadowStyle('xl', 0.3),
                                              border: `2px solid ${customColor}`,
                                          }
                                        : getShadowStyle('lg', 0.1)
                                }
                            >
                                {pkg.popular && (
                                    <div
                                        className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                                        style={{ backgroundColor: customColor }}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className={`${getTextClass('primary')} text-base font-semibold`}>{pkg.name}</h3>
                                        <p className={`${getTextClass('tertiary')} text-sm`}>Package {pkg.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center">
                                            <span className={`${getTextClass('tertiary')} mr-2 text-sm line-through`}>{pkg.originalPrice}</span>
                                            <span className="text-lg font-bold" style={{ color: customColor }}>
                                                {pkg.price}
                                            </span>
                                        </div>
                                        <p className={`${getTextClass('tertiary')} text-xs`}>
                                            {pkg.id === 'A' ? 'per month' : pkg.id === 'B' ? 'for 6 months' : 'for 12 months'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {pkg.features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <i className="fas fa-check mr-3 text-xs" style={{ color: customColor }}></i>
                                            <span className={`${getTextClass('secondary')} text-sm`}>
                                                {feature.includes('BONUS:') ? (
                                                    <>
                                                        <span style={{ color: customColor, fontWeight: 'bold' }}>BONUS:</span>
                                                        {feature.replace('BONUS:', '')}
                                                    </>
                                                ) : (
                                                    feature
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {selectedPackage === pkg.id && (
                                    <div className="absolute inset-0 rounded-xl opacity-10" style={{ backgroundColor: customColor }}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={`${getCardBgClass()} mb-3 rounded-lg p-2`}>
                        <div className="flex items-start">
                            <div className="flex h-4 items-center">
                                <input
                                    id="consent-checkbox"
                                    type="checkbox"
                                    checked={consentChecked}
                                    onChange={(e) => setConsentChecked(e.target.checked)}
                                    className="h-3 w-3 rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                            </div>
                            <label htmlFor="consent-checkbox" className="ml-1.5 block text-xs text-gray-300">
                                I agree to be charged the selected plan rate after my free trial month ends unless I cancel.
                                <span className="mt-0.5 block text-[10px] text-gray-400">
                                    You can cancel anytime. We'll send a reminder 7 days before trial ends.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={`${getCardBgClass()} mb-3 rounded-lg p-2`}>
                        <p className={`${getTextClass('tertiary')} text-center text-[10px] opacity-70`}>
                            *Bonus discounts are promotional gifts based on your plan selection and depend on partner availability. Not contractually
                            guaranteed.
                        </p>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedPackage || !consentChecked}
                        className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                            selectedPackage && consentChecked ? 'hover:scale-105' : 'opacity-50'
                        }`}
                        style={{
                            backgroundColor: customColor,
                            ...getShadowStyle('lg', 0.4),
                        }}
                    >
                        Continue with {selectedPackage ? packages.find((p) => p.id === selectedPackage)?.name : 'Selected Plan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPackageScreen;
