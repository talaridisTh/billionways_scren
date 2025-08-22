import React, { useState } from 'react';
import { useStyleHelpers } from '../hooks';
import { BottomNavigation } from '../BottomNavigation';

interface PaymentMethodScreenProps {
    onBack?: () => void;
    onComplete?: (method: string) => void;
    amount?: number;
}

const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
    onBack,
    onComplete,
    amount = 29.99
}) => {
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const paymentMethods = [
        {
            id: 'credit_card',
            name: 'Credit / Debit Card',
            icon: 'fa-credit-card',
            provider: 'Stripe',
            description: 'Pay securely with Visa, Mastercard, or other cards'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: 'fa-paypal',
            provider: 'PayPal',
            description: 'Fast and secure payment with PayPal'
        },
        {
            id: 'google_pay',
            name: 'Google Pay',
            icon: 'fa-google',
            provider: 'Google Pay',
            description: 'Quick checkout with Google Pay'
        },
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            icon: 'fa-university',
            provider: 'Bank',
            description: 'Direct transfer from your bank account'
        }
    ];

    const handleSelectMethod = (methodId: string) => {
        setSelectedMethod(methodId);
    };

    const handleProceedToPayment = () => {
        if (!selectedMethod) return;

        setIsProcessing(true);

        const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

        console.log(`Redirecting to ${selectedPaymentMethod?.provider} for payment of €${amount}`);

        setTimeout(() => {
            setIsProcessing(false);
            if (onComplete) {
                onComplete(selectedMethod);
            }
        }, 1500);
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
                        {onBack && (
                            <button
                                onClick={onBack}
                                className={`mr-3 rounded-full p-2 ${getSurfaceBgClass()} hover:bg-gray-700`}
                            >
                                <i className="fas fa-arrow-left text-sm"></i>
                            </button>
                        )}
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Payment Method</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Amount Summary */}
                    <div
                        className="rounded-xl p-4 text-center"
                        style={{ backgroundColor: `${customColor}20`, border: `1px solid ${customColor}40` }}
                    >
                        <p className={`${getTextClass('secondary')} mb-1 text-sm`}>Total Amount</p>
                        <p className="text-2xl font-bold" style={{ color: customColor }}>€{amount.toFixed(2)}</p>
                    </div>

                    {/* Payment Methods */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>Select Payment Method</h3>

                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => handleSelectMethod(method.id)}
                                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                                        selectedMethod === method.id
                                            ? 'border-2'
                                            : `border-gray-600 ${getSurfaceBgClass()} hover:border-gray-500`
                                    }`}
                                    style={selectedMethod === method.id ? { borderColor: customColor } : {}}
                                    disabled={isProcessing}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full"
                                            style={{ backgroundColor: `${customColor}30` }}
                                        >
                                            <i
                                                className={`fab ${method.icon} text-lg`}
                                                style={{ color: customColor }}
                                            ></i>
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className={`${getTextClass('primary')} font-medium`}>{method.name}</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>{method.description}</p>
                                        </div>
                                        {selectedMethod === method.id && (
                                            <div className="ml-2">
                                                <i
                                                    className="fas fa-check-circle text-lg"
                                                    style={{ color: customColor }}
                                                ></i>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start rounded-lg p-3">
                        <i className="fas fa-shield-alt mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                        <p className={`${getTextClass('tertiary')} text-xs`}>
                            All payments are processed securely by our payment partners.
                            Your payment details are never stored on our servers.
                        </p>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleProceedToPayment}
                        disabled={!selectedMethod || isProcessing}
                        className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                            selectedMethod && !isProcessing ? 'hover:scale-105' : 'opacity-50'
                        }`}
                        style={{
                            backgroundColor: customColor,
                            ...getShadowStyle('lg', 0.4),
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                Processing...
                            </>
                        ) : (
                            <>
                                Continue to Payment
                                <i className="fas fa-arrow-right ml-2"></i>
                            </>
                        )}
                    </button>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default PaymentMethodScreen;
