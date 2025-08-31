import React, { useState } from 'react';
import { useStyleHelpers } from '../hooks';

const StoreManagementScreen = () => {
    const [activeTab, setActiveTab] = useState('info');
    const [storeInfo, setStoreInfo] = useState({
        name: 'Taverna Mykonos',
        address: '123 Main Street, Athens',
        phone: '+30 210 123 4567',
        email: 'info@tavernamykonos.gr',
        hours: {
            monday: '12:00 - 00:00',
            tuesday: '12:00 - 00:00',
            wednesday: '12:00 - 00:00',
            thursday: '12:00 - 00:00',
            friday: '12:00 - 00:00',
            saturday: '11:00 - 01:00',
            sunday: '11:00 - 01:00',
        },
        discount: 15,
        description: 'Traditional Greek taverna serving authentic Mediterranean cuisine in the heart of Athens.',
    });

    const [uploadedImages, setUploadedImages] = useState([
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    ]);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const handleBack = () => {
        console.log('Navigate back to dashboard');
    };

    const handleSaveChanges = () => {
        console.log('Save store changes');
    };

    const handleUploadImage = () => {
        console.log('Upload new image');
    };

    const handleUploadMenu = () => {
        console.log('Upload menu PDF');
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const tabs = [
        { id: 'info', label: 'Store Info', icon: 'fa-info-circle' },
        { id: 'photos', label: 'Photos', icon: 'fa-images' },
        { id: 'menu', label: 'Menu', icon: 'fa-file-pdf' },
    ];

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <button
                            onClick={handleBack}
                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Manage Store</h1>
                    </div>
                </div>

                <div className="px-4">
                    {/* Tab Navigation */}
                    <div className={`${getSurfaceBgClass()} mb-6 rounded-lg p-1`}>
                        <div className="grid grid-cols-3 gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                                        activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={activeTab === tab.id ? { backgroundColor: customColor } : {}}
                                >
                                    <i className={`fas ${tab.icon} mr-1`}></i>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Store Info Tab */}
                    {activeTab === 'info' && (
                        <div className="space-y-4 pb-6">
                            {/* Discount Setting */}
                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>Discount Setting</h3>
                                
                                <div>
                                    <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Set your discount percentage (minimum 10%)</label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            min="10"
                                            max="90"
                                            value={storeInfo.discount}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                const validValue = isNaN(value) ? 10 : Math.max(10, Math.min(90, value));
                                                setStoreInfo({ ...storeInfo, discount: validValue });
                                            }}
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                        <span className={`${getTextClass('primary')} ml-2 text-lg font-bold`}>%</span>
                                    </div>
                                    <p className={`${getTextClass('tertiary')} mt-2 text-xs`}>
                                        <i className="fas fa-info-circle mr-1" style={{ color: customColor }}></i>
                                        This discount will be applied to all customer transactions
                                    </p>
                                </div>
                            </div>
                            
                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>Basic Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Store Name</label>
                                        <input
                                            type="text"
                                            value={storeInfo.name}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Address</label>
                                        <textarea
                                            value={storeInfo.address}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                                            rows="2"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} resize-none focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Phone</label>
                                            <input
                                                type="tel"
                                                value={storeInfo.phone}
                                                onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                                                className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Email</label>
                                            <input
                                                type="email"
                                                value={storeInfo.email}
                                                onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                                                className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Description</label>
                                        <textarea
                                            value={storeInfo.description}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                                            rows="3"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} resize-none focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>Operating Hours</h3>

                                <div className="space-y-3">
                                    {/* Monday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Monday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.monday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, monday: e.target.value } })}
                                            placeholder="12:00 - 00:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Tuesday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Tuesday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.tuesday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, tuesday: e.target.value } })}
                                            placeholder="12:00 - 00:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Wednesday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Wednesday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.wednesday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, wednesday: e.target.value } })}
                                            placeholder="12:00 - 00:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Thursday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Thursday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.thursday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, thursday: e.target.value } })}
                                            placeholder="12:00 - 00:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Friday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Friday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.friday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, friday: e.target.value } })}
                                            placeholder="12:00 - 00:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Saturday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Saturday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.saturday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, saturday: e.target.value } })}
                                            placeholder="11:00 - 01:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                    
                                    {/* Sunday */}
                                    <div>
                                        <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Sunday</label>
                                        <input
                                            type="text"
                                            value={storeInfo.hours.sunday}
                                            onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, sunday: e.target.value } })}
                                            placeholder="11:00 - 01:00"
                                            className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-3 py-3 ${getTextClass('primary')} focus:border-orange-400 focus:outline-none`}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )}

                    {/* Photos Tab */}
                    {activeTab === 'photos' && (
                        <div className="space-y-4 pb-6">
                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className={`${getTextClass('primary')} font-semibold`}>Store Photos</h3>
                                    <span className={`${getTextClass('tertiary')} text-xs`}>{uploadedImages.length}/5 photos</span>
                                </div>

                                {/* Photo Grid */}
                                <div className="mb-4 grid grid-cols-2 gap-3">
                                    {uploadedImages.map((image, index) => (
                                        <div key={index} className="group relative">
                                            <img src={image} alt={`Store photo ${index + 1}`} className="h-24 w-full rounded-lg object-cover" />
                                            <button className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 opacity-0 transition-opacity group-hover:opacity-100">
                                                <i className="fas fa-times text-xs text-white"></i>
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add Photo Button */}
                                    {uploadedImages.length < 5 && (
                                        <button
                                            onClick={handleUploadImage}
                                            className="flex h-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 transition-all hover:border-orange-400"
                                        >
                                            <i className="fas fa-plus mb-1 text-xl text-gray-500"></i>
                                            <span className={`${getTextClass('tertiary')} text-xs`}>Add Photo</span>
                                        </button>
                                    )}
                                </div>

                                <div className="rounded-lg bg-gray-800/50 p-3">
                                    <p className={`${getTextClass('secondary')} mb-2 text-xs`}>
                                        <i className="fas fa-info-circle mr-1" style={{ color: customColor }}></i>
                                        Photo Guidelines:
                                    </p>
                                    <ul className={`${getTextClass('tertiary')} space-y-1 text-xs`}>
                                        <li>• Upload up to 5 high-quality photos</li>
                                        <li>• Show your store interior, exterior, and food</li>
                                        <li>• Recommended size: 1200x800 pixels</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menu Tab */}
                    {activeTab === 'menu' && (
                        <div className="space-y-4 pb-6">
                            <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>Menu Management</h3>

                                {/* Current Menu */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                                        <div className="flex items-center">
                                            <i className="fas fa-file-pdf mr-3 text-2xl text-red-400"></i>
                                            <div>
                                                <p className={`${getTextClass('primary')} text-sm font-medium`}>Current Menu</p>
                                                <p className={`${getTextClass('tertiary')} text-xs`}>taverna-menu-2025.pdf • 2.3 MB</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="rounded p-2 transition-all hover:scale-105"
                                                style={{ backgroundColor: `${customColor}20` }}
                                            >
                                                <i className="fas fa-eye text-sm" style={{ color: customColor }}></i>
                                            </button>
                                            <button className="rounded bg-red-500/20 p-2 transition-all hover:scale-105">
                                                <i className="fas fa-trash text-sm text-red-400"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload New Menu */}
                                <div className="mb-4 rounded-xl border-2 border-dashed border-gray-600 p-6 text-center">
                                    <i className="fas fa-cloud-upload-alt mb-3 text-3xl text-gray-500"></i>
                                    <h4 className={`${getTextClass('primary')} mb-2 font-medium`}>Upload New Menu</h4>
                                    <p className={`${getTextClass('secondary')} mb-4 text-sm`}>Drag and drop your PDF menu or click to browse</p>
                                    <button
                                        onClick={handleUploadMenu}
                                        className="rounded-lg px-6 py-2 text-sm font-medium transition-all hover:scale-105"
                                        style={{ backgroundColor: customColor, color: 'white' }}
                                    >
                                        <i className="fas fa-upload mr-2"></i>
                                        Choose File
                                    </button>
                                </div>

                                <div className="rounded-lg bg-gray-800/50 p-3">
                                    <p className={`${getTextClass('secondary')} mb-2 text-xs`}>
                                        <i className="fas fa-info-circle mr-1" style={{ color: customColor }}></i>
                                        Menu Requirements:
                                    </p>
                                    <ul className={`${getTextClass('tertiary')} space-y-1 text-xs`}>
                                        <li>• PDF format only</li>
                                        <li>• Maximum file size: 10 MB</li>
                                        <li>• Clear, readable text and prices</li>
                                        <li>• Include all current offerings</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pb-6">
                        <button
                            onClick={handleSaveChanges}
                            className="w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            <i className="fas fa-save mr-2"></i>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreManagementScreen;
