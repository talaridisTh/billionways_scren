import React, { useState } from 'react';
import { useStyleHelpers } from '../../pages/hooks';

interface LoginScreenProps {
    onNext?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNext }) => {
    const styleHelpers = useStyleHelpers();
    const { customColor, getShadowStyle } = styleHelpers;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password, rememberMe });
        if (onNext) onNext();
    };
    
    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
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
                            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-lg border-0 bg-transparent"
                        >
                            <img
                                src="/logobil.png"
                                alt="Billionways Logo"
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                        
                        <h1 className="mb-2 text-2xl font-bold" style={{ color: customColor }}>
                            Welcome Back
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-200">
                            Sign in to continue to your account
                        </p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="mb-6 w-full space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <button 
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-xs font-medium hover:underline"
                                    style={{ color: customColor }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-orange-400 focus:ring-orange-400"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full rounded-2xl px-6 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            Sign In
                        </button>
                    </form>
                    
                    <div className="w-full">
                        <div className="mb-4 flex items-center">
                            <div className="h-px flex-1 bg-gray-600"></div>
                            <span className="px-3 text-xs text-gray-400">or continue with</span>
                            <div className="h-px flex-1 bg-gray-600"></div>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Google')}
                                className="flex w-full items-center justify-center rounded-xl border border-orange-400/30 bg-gray-900/60 px-5 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105 hover:bg-gray-900/80"
                            >
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-white">
                                    <span className="text-sm font-bold text-red-500">G</span>
                                </div>
                                Continue with Google
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Facebook')}
                                className="flex w-full items-center justify-center rounded-xl border border-orange-400/30 bg-gray-900/60 px-5 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105 hover:bg-gray-900/80"
                            >
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-blue-600">
                                    <span className="text-sm font-bold text-white">f</span>
                                </div>
                                Continue with Facebook
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('Apple')}
                                className="flex w-full items-center justify-center rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-2.5 text-sm font-medium text-gray-200 transition-all hover:scale-105 hover:bg-gray-900/80"
                            >
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-black">
                                    <i className="fab fa-apple text-sm text-white"></i>
                                </div>
                                Continue with Apple
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-300">
                            Don't have an account?{' '}
                            <span className="font-medium underline" style={{ color: customColor }}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
