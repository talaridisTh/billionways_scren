import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const BillsScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const earningsData = {
        total: 247.85,
        today: 12.5,
        week: 45.2,
        month: 127.6,
        year: 247.85,
        transactions: [
            { store: 'Taverna Mykonos', amount: 8.5, date: '2025-01-15', discount: '15%' },
            { store: 'Coffee Bean', amount: 2.25, date: '2025-01-15', discount: '10%' },
            { store: 'Super Market', amount: 1.75, date: '2025-01-14', discount: '5%' },
            { store: 'Pizza Corner', amount: 6.8, date: '2025-01-14', discount: '20%' },
            { store: 'Book Store', amount: 3.4, date: '2025-01-13', discount: '12%' },
        ],
    };

    const periods = [
        { id: 'today', label: 'Today', value: earningsData.today },
        { id: 'week', label: 'Week', value: earningsData.week },
        { id: 'month', label: 'Month', value: earningsData.month },
        { id: 'year', label: 'Year', value: earningsData.year },
        { id: 'total', label: 'Total', value: earningsData.total },
    ];

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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Bills</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Total Earnings Card */}
                    <div className={`${getCardBgClass()} rounded-xl p-6 text-center`} style={getShadowStyle('lg', 0.2)}>
                        <div className="mb-4">
                            <p className={`${getTextClass('secondary')} mb-2 text-sm`}>Total Savings</p>
                            <h2 className="text-3xl font-bold" style={{ color: customColor }}>
                                €{earningsData.total.toFixed(2)}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-arrow-up mr-2 text-green-400"></i>
                            <span className={`${getTextClass('secondary')} text-sm`}>+€{earningsData.month.toFixed(2)} this month</span>
                        </div>
                    </div>

                    {/* Period Selector */}
                    <div className={`${getSurfaceBgClass()} rounded-lg p-1`}>
                        <div className="grid grid-cols-5 gap-1">
                            {periods.map((period) => (
                                <button
                                    key={period.id}
                                    onClick={() => setSelectedPeriod(period.id)}
                                    className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                                        selectedPeriod === period.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={selectedPeriod === period.id ? { backgroundColor: customColor } : {}}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Period Earnings */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>
                                {periods.find((p) => p.id === selectedPeriod)?.label} Earnings
                            </h3>
                            <span className="text-lg font-bold" style={{ color: customColor }}>
                                €{periods.find((p) => p.id === selectedPeriod)?.value.toFixed(2)}
                            </span>
                        </div>

                        {/* Simple Chart Visualization */}
                        <div className="space-y-2">
                            {periods.slice(0, 4).map((period, index) => (
                                <div key={period.id} className="flex items-center">
                                    <span className={`${getTextClass('secondary')} w-12 text-sm`}>{period.label}</span>
                                    <div className="mx-3 h-2 flex-1 rounded-full bg-gray-700">
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${(period.value / earningsData.total) * 100}%`,
                                                backgroundColor: customColor,
                                                opacity: selectedPeriod === period.id ? 1 : 0.6,
                                            }}
                                        ></div>
                                    </div>
                                    <span className={`${getTextClass('tertiary')} w-12 text-right text-xs`}>€{period.value.toFixed(0)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>Recent Savings</h3>
                            <button className="text-sm" style={{ color: customColor }}>
                                View All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {earningsData.transactions.slice(0, 5).map((transaction, index) => (
                                <div key={index} className="flex items-center justify-between py-2">
                                    <div className="flex items-center">
                                        <div
                                            className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg"
                                            style={{ backgroundColor: `${customColor}20` }}
                                        >
                                            <i className="fas fa-store text-sm" style={{ color: customColor }}></i>
                                        </div>
                                        <div>
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>{transaction.store}</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>
                                                {transaction.discount} discount • {new Date(transaction.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: customColor }}>
                                        +€{transaction.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`${getCardBgClass()} rounded-xl p-4 text-center`} style={getShadowStyle('lg', 0.1)}>
                            <i className="fas fa-receipt mb-2 text-2xl" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Total Bills</p>
                            <p className={`${getTextClass('primary')} text-lg font-bold`}>47</p>
                        </div>
                        <div className={`${getCardBgClass()} rounded-xl p-4 text-center`} style={getShadowStyle('lg', 0.1)}>
                            <i className="fas fa-percentage mb-2 text-2xl" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Avg Discount</p>
                            <p className={`${getTextClass('primary')} text-lg font-bold`}>12.5%</p>
                        </div>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default BillsScreen;
