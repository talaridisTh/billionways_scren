import { useState } from 'react';
import { useStyleHelpers } from '../hooks';

const ShopOwnerLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const handleLogin = () => {
        if (email && password) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                console.log('Shop owner login successful');
            }, 2000);
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
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
                                       <img
                                src="/logobil.png"
                                alt="Billionways Logo"
                                className="h-28 w-28 object-contain"
                            />
                        </div>

                        <h2 className="mb-4 text-2xl font-bold" style={{ color: customColor }}>
                            Shop Owner Login
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-200">Access your store management dashboard</p>
                    </div>

                    {/* Login Form */}
                    <div className={`${getCardBgClass()} mb-6 rounded-2xl p-6`} style={getShadowStyle('xl', 0.2)}>
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Business Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your business email"
                                        className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} pl-12 placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                    />
                                    <i className="fas fa-envelope absolute top-3.5 left-4 text-sm" style={{ color: customColor }}></i>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} pl-12 placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                    />
                                    <i className="fas fa-lock absolute top-3.5 left-4 text-sm" style={{ color: customColor }}></i>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-1 focus:ring-orange-500"
                                    />
                                    <span className={`ml-2 text-sm ${getTextClass('secondary')}`}>Remember me</span>
                                </label>
                                <button
                                    onClick={handleForgotPassword}
                                    className="text-sm transition-all hover:underline"
                                    style={{ color: customColor }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={!email || !password || isLoading}
                                className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                                    email && password && !isLoading ? 'hover:scale-105' : 'opacity-50'
                                }`}
                                style={{
                                    backgroundColor: customColor,
                                    ...getShadowStyle('lg', 0.4),
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Sign In to Dashboard
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Business Features */}
                    <div className={`${getSurfaceBgClass()} mb-6 rounded-xl p-4`}>
                        <h3 className={`${getTextClass('primary')} mb-3 text-center font-semibold`}>Manage Your Business</h3>
                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div>
                                <i className="fas fa-chart-bar mb-2 text-2xl" style={{ color: customColor }}></i>
                                <p className={`${getTextClass('secondary')} text-xs`}>Sales Analytics</p>
                            </div>
                            <div>
                                <i className="fas fa-users mb-2 text-2xl" style={{ color: customColor }}></i>
                                <p className={`${getTextClass('secondary')} text-xs`}>Customer Insights</p>
                            </div>
                            <div>
                                <i className="fas fa-qrcode mb-2 text-2xl" style={{ color: customColor }}></i>
                                <p className={`${getTextClass('secondary')} text-xs`}>QR Code Scanner</p>
                            </div>
                            <div>
                                <i className="fas fa-cog mb-2 text-2xl" style={{ color: customColor }}></i>
                                <p className={`${getTextClass('secondary')} text-xs`}>Store Settings</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <button className={`${getTextClass('tertiary')} text-xs hover:${getTextClass('secondary')} transition-all`}>
                            ← Back to Consumer App
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopOwnerLoginScreen;
