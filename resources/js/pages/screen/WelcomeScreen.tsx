import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { useStyleHelpers } from '../hooks';

interface WelcomeScreenProps {
    onNext?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
    const styleHelpers = useStyleHelpers();
    const { customColor, getShadowStyle, getSurfaceBgClass, getTextClass } = styleHelpers;
    const [isBusinessAccount, setIsBusinessAccount] = useState(false);

    const handleMainAction = (action: string) => {
        console.log(`${action} button clicked`);
        if (onNext) onNext();
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`${provider} login clicked`);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black font-sans text-white">
            <div className="absolute inset-0 bg-black"></div>

            <div className="relative mx-auto min-h-screen max-w-sm">
                <div className="flex min-h-screen flex-col justify-center p-6">
                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-lg border-0 bg-transparent"
                        >
                            <img
                                src="/logobil.png"
                                alt="Billionways Logo"
                                className="h-28 w-28 object-contain"
                            />
                        </div>

                        <h1 className="mb-2 text-xl font-bold text-white">Welcome to</h1>
                        <h2 className="mb-4 text-2xl font-bold" style={{ color: customColor }}>
                            Billionways
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-200">Discover offers and save money on every purchase</p>
                    </div>

                    <div className="mb-6 w-full space-y-3">
                        <button
                            onClick={() => handleMainAction('Sign Up')}
                            className="w-full rounded-2xl px-6 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            Sign Up
                        </button>



                        <button
                            onClick={() => handleMainAction('Login')}
                            className="w-full rounded-2xl border border-orange-400/30 bg-gray-900/60 px-6 py-3 text-base font-semibold text-gray-200 transition-all hover:scale-105 hover:bg-gray-900/80"
                        >
                            Login
                        </button>
    <button

                            className={`flex w-full items-center justify-center rounded-2xl border border-orange-400/30 ${getSurfaceBgClass()} px-6 py-3 text-base font-medium transition-all hover:bg-gray-900/80`}
                        >
                            <i className="fas fa-store mr-2" style={{ color: customColor }}></i>
                            <span className={isBusinessAccount ? 'font-bold' : ''}>
                                Register as a Business Owner
                            </span>
                            {isBusinessAccount && (
                                <i className="fas fa-check ml-2" style={{ color: customColor }}></i>
                            )}
                        </button>
                    </div>

                    <div className="w-full">
                        <div className="mb-4 flex items-center">
                            <div className="h-px flex-1 bg-gray-600"></div>
                            <span className="px-3 text-xs text-gray-400">or continue with</span>
                            <div className="h-px flex-1 bg-gray-600"></div>
                        </div>

                        <div className="flex flex-col items-center space-y-3">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                className="flex w-full items-center rounded-xl border border-orange-400/30 bg-gray-900/90 px-4 py-3 text-base font-medium text-white transition-all hover:bg-gray-900"
                            >
                                <div className="mr-4 flex h-7 w-7 items-center justify-center rounded bg-white">
                                    <FcGoogle className="h-4 w-4" />
                                </div>
                                Continue with Google
                            </button>

                            <button
                                onClick={() => handleSocialLogin('Facebook')}
                                className="flex w-full items-center rounded-xl border border-orange-400/30 bg-gray-900/90 px-4 py-3 text-base font-medium text-white transition-all hover:bg-gray-900"
                            >
                                <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-sm bg-blue-600">
                                    <FaFacebookF className="h-4 w-4 text-white" />
                                </div>
                                Continue with Facebook
                            </button>

                            <button
                                onClick={() => handleSocialLogin('Apple')}
                                className="flex w-full items-center rounded-xl border border-orange-400/30 bg-gray-900/90 px-4 py-3 text-base font-medium text-white transition-all hover:bg-gray-900"
                            >
                                <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-sm bg-black">
                                    <FaApple className="h-4 w-4 text-white" />
                                </div>
                                Continue with Apple
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs leading-relaxed text-gray-400">
                            By continuing, you agree to our{' '}
                            <span className="underline" style={{ color: customColor }}>
                                Terms of Service
                            </span>{' '}
                            and{' '}
                            <span className="underline" style={{ color: customColor }}>
                                Privacy Policy
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
