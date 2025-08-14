import React from 'react';
import { StyleHelpers } from './types';

interface BottomNavigationProps {
    styleHelpers: StyleHelpers;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ styleHelpers }) => {
    const { colors, getCardBgClass, getTextClass } = styleHelpers;

    const navItems = [
        { id: 'home', icon: 'fa-home', label: 'Home', isActive: true },
        { id: 'bills', icon: 'fa-receipt', label: 'My Bills', isActive: false },
        { id: 'qr', icon: 'fa-qrcode', label: 'QR Code', isActive: false, isCenter: true },
        { id: 'invest', icon: 'fa-chart-line', label: 'Invest', isActive: false },
        { id: 'account', icon: 'fa-user', label: 'Account', isActive: false },
    ];

    return (
        <div className={`fixed inset-x-0 bottom-0 z-10 border-t ${getCardBgClass()} p-3 shadow-lg`}>
            <div className="grid grid-cols-5 gap-2">
                {navItems.map((item) => (
                    <button key={item.id} className="flex flex-col items-center justify-center">
                        {item.isCenter ? (
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.primary} mx-auto -mt-5 shadow-lg`}>
                                <i className={`fas ${item.icon} text-lg text-white`}></i>
                                <span className="sr-only">{item.label}</span>
                            </div>
                        ) : (
                            <>
                                <i className={`fas ${item.icon} text-lg ${item.isActive ? colors.accent : getTextClass('tertiary')}`}></i>
                                <span className={`mt-1 text-xs ${getTextClass('secondary')}`}>{item.label}</span>
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
