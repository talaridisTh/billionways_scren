import BillsScreen from '@/pages/screen/BillsScreen';
import CalculationSaveScreen from '@/pages/screen/CalculationSaveScreen';
import InvestmentScreen from '@/pages/screen/InvestmentScreen';
import LocationDetectionScreen from '@/pages/screen/LocationDetectionScreen';
import LoginScreen from '@/pages/screen/LoginScreen';
import MapWithQRScreen from '@/pages/screen/MapWithQRScreen';
import PaymentMethodScreen from '@/pages/screen/PaymentMethodScreen';
import ProfileScreen from '@/pages/screen/ProfileScreen';
import QRCodeScreen from '@/pages/screen/QRCodeScreen';
import RegistrationScreen from '@/pages/screen/RegistrationScreen';
import ReviewPromptScreen from '@/pages/screen/ReviewPromptScreen';
import ShopOwnerDashboardScreen from '@/pages/screen/ShopOwnerDashboardScreen';
import ShopOwnerLoginScreen from '@/pages/screen/ShopOwnerLoginScreen';
import ShopOwnerQRScannerScreen from '@/pages/screen/ShopOwnerQRScannerScreen';
import StoreDetailsScreen from '@/pages/screen/StoreDetailsScreen';
import StoreManagementScreen from '@/pages/screen/StoreManagementScreen';
import SubscriptionPackageScreen from '@/pages/screen/SubscriptionPackageScreen';
import TransactionHistoryScreen from '@/pages/screen/TransactionHistoryScreen';
import WelcomeScreen from '@/pages/screen/WelcomeScreen';
import React, { useEffect, useState } from 'react';
import { BillionwaysHomeScreen } from './screen/BillionwaysHomeScreen';
import ReceiptInputScreen from './screen/ReceiptInputScreen';

interface ScreenConfig {
    id: string;
    name: string;
    component: React.FC;
    description?: string;
    icon?: string;
    visible: boolean;
}

const PresentationView = () => {
    const [currentScreenId, setCurrentScreenId] = useState<string>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const screenParam = urlParams.get('screen');
        return screenParam || 'dashboard';
    });
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const screens: ScreenConfig[] = [
        {
            id: 'welcome',
            name: 'Welcome',
            component: WelcomeScreen,
            description: 'App introduction with Sign Up and Login options',
            icon: 'fa-rocket',
            visible: true,
        },
        {
            id: 'login',
            name: 'Login',
            component: LoginScreen,
            description: 'User login with email and password',
            icon: 'fa-sign-in-alt',
            visible: true,
        },
        {
            id: 'registration',
            name: 'Registration Method',
            component: RegistrationScreen,
            description: 'Email or phone number registration form',
            icon: 'fa-user-plus',
            visible: true,
        },
        {
            id: 'pricing',
            name: 'Subscription Package',
            component: SubscriptionPackageScreen,
            description: 'Package selection (A, B, C) with free trial info',
            icon: 'fa-credit-card',
            visible: true,
        },
        {
            id: 'payment-method',
            name: 'Payment Method',
            component: PaymentMethodScreen,
            description: 'Select payment method (PayPal, Stripe, Google Pay, etc.)',
            icon: 'fa-credit-card',
            visible: true,
        },
        {
            id: 'location-detection',
            name: 'Location Permission',
            component: LocationDetectionScreen,
            description: 'Location access permission for nearby providers',
            icon: 'fa-map-marker-alt',
            visible: true,
        },
        {
            id: 'dashboard',
            name: 'Home Screen',
            component: BillionwaysHomeScreen,
            description: 'Main screen with search, categories and nearby providers',
            icon: 'fa-home',
            visible: true,
        },
        {
            id: 'store-details',
            name: 'Store Details',
            component: StoreDetailsScreen,
            description: 'Store info, photos, hours, menu PDF and directions',
            icon: 'fa-store',
            visible: true,
        },
        {
            id: 'bills',
            name: 'Bills Screen',
            component: BillsScreen,
            description: 'Total earnings and detailed earnings by period',
            icon: 'fa-file-alt',
            visible: true,
        },
        {
            id: 'investment',
            name: 'Investment Screen',
            component: InvestmentScreen,
            description: 'Investment feature - under development message',
            icon: 'fa-chart-line',
            visible: true,
        },
        {
            id: 'profile',
            name: 'Profile Screen',
            component: ProfileScreen,
            description: 'Payment methods, cancel subscription, security settings',
            icon: 'fa-user',
            visible: true,
        },
        {
            id: 'map-with-qr',
            name: 'Stores Map & QR',
            component: MapWithQRScreen,
            description: 'Interactive map showing nearby stores with personal QR code',
            icon: 'fa-map-marked-alt',
            visible: true,
        },
        {
            id: 'qr-code',
            name: 'Personal QR Code',
            component: QRCodeScreen,
            description: 'Display QR code with user name for store scanning',
            icon: 'fa-qrcode',
            visible: false,
        },
        {
            id: 'receipt-input',
            name: 'Step 1: Receipt Confirmation & Input',
            component: ReceiptInputScreen,
            description: 'Discount confirmation, receipt scan or manual entry',
            icon: 'fa-receipt',
            visible: true,
        },
        {
            id: 'confirmation-consent',
            name: 'Step 2: Confirmation & Consent',
            component: CalculationSaveScreen,
            description: 'Package summary and auto-billing consent checkbox',
            icon: 'fa-check-circle',
            visible: true,
        },
        {
            id: 'review-prompt',
            name: 'Step 3: Review Invitation',
            component: ReviewPromptScreen,
            description: 'Prompt to review store experience',
            icon: 'fa-comment-dots',
            visible: true,
        },
        {
            id: 'shop-owner-login',
            name: 'Shop Owner Login',
            component: ShopOwnerLoginScreen,
            description: 'Partner login interface for store management',
            icon: 'fa-store-alt',
            visible: true,
        },
        {
            id: 'shop-owner-dashboard',
            name: 'Shop Owner Dashboard',
            component: ShopOwnerDashboardScreen,
            description: 'Daily scans, weekly discounts, average rating stats',
            icon: 'fa-chart-pie',
            visible: true,
        },
        {
            id: 'store-management',
            name: 'Store Profile Management',
            component: StoreManagementScreen,
            description: 'Edit photos, basic info, hours and menu PDF',
            icon: 'fa-edit',
            visible: true,
        },
        {
            id: 'transaction-history',
            name: 'Transaction History',
            component: TransactionHistoryScreen,
            description: 'All QR scan transactions with customer ID, date, discount',
            icon: 'fa-history',
            visible: true,
        },
        {
            id: 'shop-owner-qr-scanner',
            name: 'QR Code Scanner',
            component: ShopOwnerQRScannerScreen,
            description: 'Scan customer QR codes to apply discounts',
            icon: 'fa-qrcode',
            visible: true,
        },
    ];

    const currentScreen =
        screens.find((screen) => screen.id === currentScreenId && screen.visible) || screens.find((screen) => screen.visible) || screens[0];
    const CurrentComponent = currentScreen.component;

    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('screen', currentScreenId);
        window.history.replaceState({}, '', url);
    }, [currentScreenId]);

    return (
        <>
            <style>{`
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

                .mobile-device {
                    width: 375px;
                    height: 812px;
                    position: relative;
                    overflow: hidden;
                    border-radius: 45px;
                    box-shadow: 0 0 0 10px #222, 0 0 0 11px #000;
                    background-color: #000;
                    padding: 10px;
                    box-sizing: border-box;
                }

                .mobile-frame {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border: 10px solid #111;
                    border-radius: 45px;
                    pointer-events: none;
                    z-index: 2000;
                }

                .iphone-notch {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 150px;
                    height: 30px;
                    background-color: #000;
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 16px;
                    z-index: 2001;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .notch-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100px;
                    height: 20px;
                }

                .notch-camera {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #222;
                    border: 2px solid #444;
                }

                .notch-speaker {
                    width: 40px;
                    height: 6px;
                    border-radius: 3px;
                    background: #222;
                }

                .notch-sensor {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #222;
                }

                .status-bar {
                    position: absolute;
                    top: 6px;
                    left: 0;
                    right: 0;
                    height: 30px;
                    padding: 0 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1001;
                    pointer-events: none;
                }

                .status-time {
                    font-weight: 600;
                    font-size: 14px;
                    color: white;
                    margin-left: 16px;
                }

                .status-icons {
                    display: flex;
                    align-items: center;
                    margin-right: 16px;
                }

                .status-icon {
                    margin-left: 6px;
                    color: white;
                    font-size: 14px;
                }

                .mobile-screen {
                    width: 100%;
                    height: 100%;
                    background-color: #000;
                    position: relative;
                    overflow: hidden;
                    border-radius: 44px;
                }

                .mobile-content {
                    position: absolute;
                    top: 36px;
                    left: 0;
                    right: 0;
                    bottom: 75px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 0 2px;
                }

                .mobile-content > * {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                }

                .mobile-content .relative {
                    position: relative !important;
                }

                .mobile-content .mx-auto {
                    margin-left: auto !important;
                    margin-right: auto !important;
                    margin-top: 0 !important;
                    margin-bottom: 0 !important;
                }

                .mobile-content .max-w-sm {
                    max-width: 100% !important;
                }

                .mobile-content .min-h-screen {
                    min-height: 100% !important;
                    height: auto !important;
                }

                .mobile-content .pb-20 {
                    padding-bottom: 0 !important;
                }

                .mobile-nav {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 75px;
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0 8px 20px 8px;
                    z-index: 1000;
                }

                .home-indicator {
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 4px;
                    background-color: white;
                    border-radius: 2px;
                    z-index: 1001;
                }

                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 6px 10px;
                    width: 60px;
                    position: relative;
                }

                .nav-item:hover {
                    transform: scale(1.05);
                }

                .nav-icon {
                    font-size: 20px;
                    margin-bottom: 3px;
                }

                .nav-label {
                    font-size: 10px;
                    font-weight: 500;
                }

                .nav-add-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #FF9500;
                    box-shadow: 0 4px 10px rgba(255, 149, 0, 0.4);
                    transition: all 0.2s ease;
                }

                .nav-add-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(255, 149, 0, 0.6);
                }

                .coming-soon-badge {
                    position: absolute;
                    top: -8px;
                    right: -14px;
                    background: #FF9500;
                    color: white;
                    font-size: 8px;
                    font-weight: 600;
                    padding: 2px 6px;
                    border-radius: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 4px rgba(255, 149, 0, 0.3);
                    animation: pulse-badge 2s infinite;
                }

                @keyframes pulse-badge {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                }

                .screen-selector {
                    background: rgba(17, 24, 39, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 149, 0, 0.3);
                    border-radius: 12px;
                    padding: 12px 16px;
                    color: white;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .screen-selector:focus {
                    border-color: #FF9500;
                    box-shadow: 0 0 0 2px rgba(255, 149, 0, 0.2);
                }

                .screen-selector option {
                    background: #1f2937;
                    color: white;
                    padding: 8px;
                }
            `}</style>

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
                <div className="mb-6 w-full max-w-md">
                    <select className="screen-selector w-full" value={currentScreenId} onChange={(e) => setCurrentScreenId(e.target.value)}>
                        {screens
                            .filter((screen) => screen.visible)
                            .map((screen) => (
                                <option key={screen.id} value={screen.id}>
                                    {screen.name} Screen
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mobile-device">
                    <div className="mobile-frame"></div>
                    <div className="iphone-notch">
                        <div className="notch-content">
                            <div className="notch-camera"></div>
                            <div className="notch-speaker"></div>
                            <div className="notch-sensor"></div>
                        </div>
                    </div>
                    <div className="status-bar">
                        <div className="status-time">{currentTime}</div>
                        <div className="status-icons">
                            <div className="status-icon">
                                <i className="fas fa-signal"></i>
                            </div>
                            <div className="status-icon">
                                <i className="fas fa-wifi"></i>
                            </div>
                            <div className="status-icon">
                                <i className="fas fa-battery-full"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-screen">
                        <div className="mobile-content">
                            <CurrentComponent />
                        </div>
                        <div className="mobile-nav">
                            <button className="nav-item text-orange-400">
                                <i className="nav-icon fas fa-home"></i>
                                <span className="nav-label">Home</span>
                            </button>
                            <button className="nav-item text-gray-400 hover:text-gray-300">
                                <i className="nav-icon fas fa-file-alt"></i>
                                <span className="nav-label"> Bills</span>
                            </button>
                            <button className="nav-item">
                                <div className="nav-add-button">
                                    <i className="fas fa-qrcode text-lg text-white"></i>
                                </div>
                            </button>
                            <button className="nav-item text-gray-400 hover:text-gray-300">
                                <div className="coming-soon-badge">Soon</div>
                                <i className="nav-icon fas fa-chart-line"></i>
                                <span className="nav-label">Invest</span>
                            </button>
                            <button className="nav-item text-gray-400 hover:text-gray-300">
                                <i className="nav-icon fas fa-user"></i>
                                <span className="nav-label">Account</span>
                            </button>
                        </div>
                        <div className="home-indicator"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PresentationView;
