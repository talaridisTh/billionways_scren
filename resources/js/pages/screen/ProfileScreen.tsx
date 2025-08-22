import { useState, useRef } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const ProfileScreen = () => {
    const [show2FA, setShow2FA] = useState(false);
    const [showCancelSubscription, setShowCancelSubscription] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [showContactSection, setShowContactSection] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const userProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+30 698 556 4693',
        address: '123 Main Street, Athens',
        subscription: 'Monthly Plan',
        subscriptionExpiry: '2025-02-15',
    };

    const paymentMethods = [
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'PayPal', email: 'john.doe@example.com', isDefault: false },
    ];

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const handleCancelSubscription = () => {
        console.log('Cancel subscription clicked');
    };

    const handleToggle2FA = () => {
        setShow2FA(!show2FA);
        console.log('Toggle 2FA:', !show2FA);
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Profile</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* User Info */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-4 flex items-center">
                            <div className="relative mr-4">
                                <div
                                    className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full"
                                    style={avatarUrl ? {} : { backgroundColor: customColor }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-white">
                                            {userProfile.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md"
                                    style={{ backgroundColor: customColor }}
                                >
                                    <i className="fas fa-camera text-xs"></i>
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) setAvatarUrl(URL.createObjectURL(f));
                                    }}
                                />
                            </div>
                            <div>
                                <h2 className={`${getTextClass('primary')} text-lg font-semibold`}>{userProfile.name}</h2>
                                <p className={`${getTextClass('secondary')} text-sm`}>{userProfile.email}</p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-1 inline-flex items-center text-xs"
                                    style={{ color: customColor }}
                                >
                                    <i className="fas fa-camera mr-1"></i>
                                    Upload Photo
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center">
                                <i className="fas fa-phone mr-3 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>{userProfile.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-3 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>{userProfile.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Info */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>Subscription</h3>
                        <div className="mb-2 flex items-center justify-between">
                            <span className={`${getTextClass('secondary')} text-sm`}>Current Plan</span>
                            <span className="text-sm font-medium" style={{ color: customColor }}>
                                {userProfile.subscription}
                            </span>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <span className={`${getTextClass('secondary')} text-sm`}>Next Billing</span>
                            <span className={`${getTextClass('secondary')} text-sm`}>
                                {new Date(userProfile.subscriptionExpiry).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Hidden Cancel Subscription - revealed on multiple taps */}
                        <div className="text-center">
                            <button
                                onClick={() => setShowCancelSubscription((prev) => !prev)}
                                className={`text-xs ${getTextClass('tertiary')} transition-all`}
                            >
                                Manage Plan
                            </button>

                            {showCancelSubscription && (
                                <div className="mt-3 border-t border-gray-700 pt-3 flex flex-col space-y-5">
                                    <button className=" text-orange-400 transition-all hover:text-blue-300 text-base">Update Subscription</button>
                                    <button onClick={handleCancelSubscription} className="text-xs text-red-400 transition-all hover:text-red-300 text-lg">
                                        Cancel Subscription
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>Payment Methods</h3>
                            <button className="text-sm" style={{ color: customColor }}>
                                <i className="fas fa-plus mr-1"></i>Add
                            </button>
                        </div>

                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-gray-700">
                                            <i
                                                className={`fab ${method.type === 'Visa' ? 'fa-cc-visa' : 'fa-paypal'} text-sm`}
                                                style={{ color: customColor }}
                                            ></i>
                                        </div>
                                        <div>
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>
                                                {method.type === 'Visa' ? `•••• ${method.last4}` : method.email}
                                            </p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>
                                                {method.type === 'Visa' ? `Expires ${method.expiry}` : 'PayPal Account'}
                                            </p>
                                        </div>
                                    </div>
                                    {method.isDefault && (
                                        <span
                                            className="rounded px-2 py-1 text-xs"
                                            style={{ backgroundColor: `${customColor}20`, color: customColor }}
                                        >
                                            Default
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>Security</h3>

                        <div className="space-y-3">
                            {/* Change Password */}
                            <div className="rounded-lg bg-gray-800/50">
                                <button
                                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                                    className="flex w-full items-center justify-between p-3 transition-all hover:bg-gray-800/70"
                                >
                                    <div className="flex items-center">
                                        <i className="fas fa-lock mr-3 text-sm" style={{ color: customColor }}></i>
                                        <div className="text-left">
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>Change Password</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>Update your password</p>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-${showPasswordSection ? 'up' : 'down'} text-xs ${getTextClass('tertiary')}`}></i>
                                </button>

                                {showPasswordSection && (
                                    <div className="space-y-3 px-3 pb-3">
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter current password"
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>Confirm Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <button
                                            className="w-full rounded-lg py-2 text-sm font-medium transition-all hover:scale-105"
                                            style={{ backgroundColor: customColor, color: 'white' }}
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Change Email/Phone */}
                            <div className="rounded-lg bg-gray-800/50">
                                <button
                                    onClick={() => setShowContactSection(!showContactSection)}
                                    className="flex w-full items-center justify-between p-3 transition-all hover:bg-gray-800/70"
                                >
                                    <div className="flex items-center">
                                        <i className="fas fa-envelope mr-3 text-sm" style={{ color: customColor }}></i>
                                        <div className="text-left">
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>Contact Information</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>Update email, phone & address</p>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-${showContactSection ? 'up' : 'down'} text-xs ${getTextClass('tertiary')}`}></i>
                                </button>

                                {showContactSection && (
                                    <div className="space-y-3 px-3 pb-3">
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue={userProfile.email}
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>Phone Number</label>
                                            <input
                                                type="tel"
                                                defaultValue={userProfile.phone}
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-1 block text-xs`}>Address</label>
                                            <textarea
                                                defaultValue={userProfile.address}
                                                rows="2"
                                                className={`w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm ${getTextClass('primary')} resize-none placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <button
                                            className="w-full rounded-lg py-2 text-sm font-medium transition-all hover:scale-105"
                                            style={{ backgroundColor: customColor, color: 'white' }}
                                        >
                                            Update Information
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="rounded-lg bg-gray-800/50 p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="fas fa-shield-alt mr-3 text-sm" style={{ color: customColor }}></i>
                                        <div>
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>Two-Factor Authentication</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>Google Authenticator</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleToggle2FA}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            show2FA ? '' : 'bg-gray-600'
                                        }`}
                                        style={{ backgroundColor: show2FA ? customColor : undefined }}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                show2FA ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                {show2FA && (
                                    <div className="mt-3 border-t border-gray-700 pt-3">
                                        <p className={`${getTextClass('tertiary')} mb-2 text-xs`}>Scan this QR code with Google Authenticator:</p>
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-lg bg-gray-700">
                                            <i className="fas fa-qrcode text-xl" style={{ color: customColor }}></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                            <div className="flex items-start">
                                <i className="fas fa-exclamation-triangle mt-0.5 mr-2 text-xs text-yellow-400"></i>
                                <p className={`${getTextClass('tertiary')} text-xs`}>
                                    All transactions require completed verification steps for security.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>Settings</h3>

                        <div className="space-y-3">
                            <button className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-all hover:bg-gray-800/70">
                                <div className="flex items-center">
                                    <i className="fas fa-globe mr-3 text-sm" style={{ color: customColor }}></i>
                                    <div className="text-left">
                                        <span className={`${getTextClass('primary')} text-sm`}>Language</span>
                                        <span className={`${getTextClass('tertiary')} block text-xs`}>English</span>
                                    </div>
                                </div>
                                <i className={`fas fa-chevron-right text-xs ${getTextClass('tertiary')}`}></i>
                            </button>

                            <button className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-all hover:bg-gray-800/70">
                                <div className="flex items-center">
                                    <i className="fas fa-question-circle mr-3 text-sm" style={{ color: customColor }}></i>
                                    <span className={`${getTextClass('primary')} text-sm`}>Help & Support</span>
                                </div>
                                <i className={`fas fa-chevron-right text-xs ${getTextClass('tertiary')}`}></i>
                            </button>

                            <button className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-all hover:bg-gray-800/70">
                                <div className="flex items-center">
                                    <i className="fas fa-sign-out-alt mr-3 text-sm text-red-400"></i>
                                    <span className="text-sm text-red-400">Logout</span>
                                </div>
                                <i className="fas fa-chevron-right text-xs text-red-400"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default ProfileScreen;
