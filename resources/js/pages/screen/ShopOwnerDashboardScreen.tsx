import { useStyleHelpers } from '../hooks';

const ShopOwnerDashboardScreen = () => {
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const dashboardData = {
        storeName: 'Taverna Mykonos',
        todayScans: 47,
        weeklyDiscounts: 1250.8,
        averageRating: 4.5,
        totalCustomers: 324,
        recentScans: [
            { id: 'BW-12345', time: '14:23', amount: '€8.50', customer: 'John D.' },
            { id: 'BW-67890', time: '14:15', amount: '€5.25', customer: 'Maria S.' },
            { id: 'BW-54321', time: '14:08', amount: '€12.75', customer: 'Alex K.' },
        ],
    };

    const handleManageStore = () => {
        console.log('Navigate to store management');
    };

    const handleViewTransactions = () => {
        console.log('Navigate to transaction history');
    };

    const handleLogout = () => {
        console.log('Logout shop owner');
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star text-sm" style={{ color: customColor }}></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt text-sm" style={{ color: customColor }}></i>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className={`far fa-star text-sm ${getTextClass('tertiary')}`}></i>);
        }

        return stars;
    };

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4 pb-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Business Dashboard</h1>
                            <p className={`${getTextClass('secondary')} text-sm`}>{dashboardData.storeName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-sign-out-alt text-gray-200"></i>
                        </button>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`${getCardBgClass()} rounded-xl p-4 text-center`} style={getShadowStyle('lg', 0.1)}>
                            <i className="fas fa-qrcode mb-2 text-2xl" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Today's Scans</p>
                            <p className={`${getTextClass('primary')} text-2xl font-bold`}>{dashboardData.todayScans}</p>
                        </div>
                        <div className={`${getCardBgClass()} rounded-xl p-4 text-center`} style={getShadowStyle('lg', 0.1)}>
                            <i className="fas fa-star mb-2 text-2xl" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Average Rating</p>
                            <p className={`${getTextClass('primary')} text-2xl font-bold`}>{dashboardData.averageRating}</p>
                        </div>
                    </div>

                    {/* Weekly Performance */}
                    <div className={`${getCardBgClass()} rounded-xl p-5`} style={getShadowStyle('lg', 0.2)}>
                        <h3 className={`${getTextClass('primary')} mb-4 font-semibold`}>This Week's Performance</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <i className="fas fa-percentage mr-3 text-lg" style={{ color: customColor }}></i>
                                    <div>
                                        <p className={`${getTextClass('primary')} text-sm font-medium`}>Total Discounts Given</p>
                                        <p className={`${getTextClass('tertiary')} text-xs`}>Weekly summary</p>
                                    </div>
                                </div>
                                <span className="text-xl font-bold" style={{ color: customColor }}>
                                    €{dashboardData.weeklyDiscounts.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <i className="fas fa-users mr-3 text-lg" style={{ color: customColor }}></i>
                                    <div>
                                        <p className={`${getTextClass('primary')} text-sm font-medium`}>Total Customers</p>
                                        <p className={`${getTextClass('tertiary')} text-xs`}>This week</p>
                                    </div>
                                </div>
                                <span className="text-xl font-bold" style={{ color: customColor }}>
                                    {dashboardData.totalCustomers}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <i className="fas fa-star mr-3 text-lg" style={{ color: customColor }}></i>
                                    <div>
                                        <p className={`${getTextClass('primary')} text-sm font-medium`}>Customer Rating</p>
                                        <div className="flex items-center space-x-1">{renderStars(dashboardData.averageRating)}</div>
                                    </div>
                                </div>
                                <span className="text-xl font-bold" style={{ color: customColor }}>
                                    {dashboardData.averageRating}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>Recent Scans</h3>
                            <button
                                onClick={handleViewTransactions}
                                className="text-sm transition-all hover:underline"
                                style={{ color: customColor }}
                            >
                                View All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {dashboardData.recentScans.map((scan, index) => (
                                <div key={index} className="flex items-center justify-between border-b border-gray-700 py-2 last:border-b-0">
                                    <div className="flex items-center">
                                        <div
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg"
                                            style={{ backgroundColor: `${customColor}20` }}
                                        >
                                            <i className="fas fa-user text-xs" style={{ color: customColor }}></i>
                                        </div>
                                        <div>
                                            <p className={`${getTextClass('primary')} text-sm font-medium`}>{scan.customer}</p>
                                            <p className={`${getTextClass('tertiary')} text-xs`}>
                                                {scan.id} • {scan.time}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: customColor }}>
                                        {scan.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={handleManageStore}
                            className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105`}
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            <i className="fas fa-store mr-2"></i>
                            Manage Store Profile
                        </button>
                    </div>

                    {/* Business Insights */}
                    <div className={`${getSurfaceBgClass()} rounded-xl p-4`}>
                        <h4 className={`${getTextClass('primary')} mb-3 flex items-center font-semibold`}>
                            <i className="fas fa-lightbulb mr-2 text-sm" style={{ color: customColor }}></i>
                            Business Insights
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <i className="fas fa-arrow-up mt-1 mr-2 text-xs text-green-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Customer visits increased by 15% this week</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-star mt-1 mr-2 text-xs text-yellow-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>You have 3 new customer reviews</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-clock mt-1 mr-2 text-xs" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Peak hours: 12:00-14:00 and 19:00-21:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopOwnerDashboardScreen;
