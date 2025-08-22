import React, { useState } from 'react';
import { useStyleHelpers } from '../hooks';

interface RegistrationScreenProps {
    onNext: () => void;
    onBack: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onNext, onBack }) => {
    const styleHelpers = useStyleHelpers();
    const { customColor, getShadowStyle, getCardBgClass, getTextClass, getSurfaceBgClass, getBackgroundClass } = styleHelpers;
    const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone'>('email');
    const [inputValue, setInputValue] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleContinue = () => {
        if (inputValue.trim()) {
            if (showVerificationInput && verificationCode.trim()) {
                onNext();
            } else if (!showVerificationInput) {
                setShowVerificationInput(true);
                // Here you would typically trigger an API call to send the verification code
                console.log(`Sending verification code to ${inputValue}`);
            }
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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Create Account</h1>
                    </div>

                    <div className="flex-1">
                        <div className="mb-4 text-center">
                            <h2 className={`${getTextClass('primary')} mb-2 text-lg font-semibold`}>Choose Registration Method</h2>
                            <p className={`${getTextClass('secondary')} text-sm`}>Enter your email address or phone number to get started</p>
                        </div>

                        <div className="mb-4">
                            <div className={`${getSurfaceBgClass()} mb-3 flex rounded-lg p-1`}>
                                <button
                                    onClick={() => setRegistrationMethod('email')}
                                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                        registrationMethod === 'email' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={registrationMethod === 'email' ? { backgroundColor: customColor, ...getShadowStyle('md', 0.3) } : {}}
                                >
                                    <i className="fas fa-envelope mr-2"></i>
                                    Email
                                </button>
                                <button
                                    onClick={() => setRegistrationMethod('phone')}
                                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                        registrationMethod === 'phone' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={registrationMethod === 'phone' ? { backgroundColor: customColor, ...getShadowStyle('md', 0.3) } : {}}
                                >
                                    <i className="fas fa-phone mr-2"></i>
                                    Phone
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className={`${getTextClass('secondary')} mb-2 block text-sm font-medium`}>
                                {registrationMethod === 'email' ? 'Email Address' : 'Phone Number'}
                            </label>
                            <div className="relative">
                                <input
                                    type={registrationMethod === 'email' ? 'email' : 'tel'}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={registrationMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                                    className={`${getSurfaceBgClass()} w-full rounded-lg px-3 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 ${getTextClass('primary')}`}
                                    style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                                    disabled={showVerificationInput}
                                />
                                <div className="absolute top-3 right-3">
                                    <i
                                        className={`fas ${registrationMethod === 'email' ? 'fa-envelope' : 'fa-phone'} text-sm`}
                                        style={{ color: customColor }}
                                    ></i>
                                </div>
                            </div>
                            
                            {showVerificationInput && (
                                <div className="mt-4">
                                    <label className={`${getTextClass('secondary')} mb-2 block text-sm font-medium`}>
                                        Verification Code
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            placeholder="Enter 5-digit code"
                                            className={`${getSurfaceBgClass()} w-full rounded-lg px-3 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 ${getTextClass('primary')}`}
                                            style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                                            maxLength={5}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <i className="fas fa-key text-sm" style={{ color: customColor }}></i>
                                        </div>
                                    </div>
                                    <p className={`${getTextClass('tertiary')} mt-2 text-xs`}>
                                        We've sent a 5-digit verification code to {inputValue}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={`${getCardBgClass()} mb-4 rounded-lg p-3`}>
                            <div className="flex items-start">
                                <i className="fas fa-info-circle mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                                <div>
                                    <p className={`${getTextClass('secondary')} text-sm`}>
                                        {registrationMethod === 'email'
                                            ? "We'll send you a verification code to confirm your email address."
                                            : "We'll send you a verification code via SMS to confirm your phone number."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <button
                            onClick={handleContinue}
                            disabled={!inputValue.trim() || (showVerificationInput && !verificationCode.trim())}
                            className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                                (inputValue.trim() && (!showVerificationInput || verificationCode.trim())) ? 'hover:scale-105' : 'opacity-50'
                            }`}
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            {showVerificationInput ? 'Verify & Continue' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationScreen;
