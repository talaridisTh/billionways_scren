import { useState } from 'react';
import { useStyleHelpers } from '../hooks';

const TransactionHistoryScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const [searchQuery, setSearchQuery] = useState('');

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const transactionData = {
        today: [
            { id: 'BW-12345', customer: 'John D.', time: '14:23', amount: '€8.50', discount: '15%', status: 'completed' },
            { id: 'BW-67890', customer: 'Maria S.', time: '14:15', amount: '€5.25', discount: '10%', status: 'completed' },
            { id: 'BW-54321', customer: 'Alex K.', time: '14:08', amount: '€12.75', discount: '20%', status: 'completed' },
            { id: 'BW-98765', customer: 'Sarah M.', time: '13:45', amount: '€6.80', discount: '15%', status: 'completed' },
            { id: 'BW-11111', customer: 'David L.', time: '13:30', amount: '€9.25', discount: '12%', status: 'completed' },
        ],
        week: [
            { id: 'BW-22222', customer: 'Emma W.', time: 'Yesterday 19:20', amount: '€15.40', discount: '18%', status: 'completed' },
            { id: 'BW-33333', customer: 'Mike R.', time: 'Yesterday 18:15', amount: '€7.60', discount: '10%', status: 'completed' },
            { id: 'BW-44444', customer: 'Lisa P.', time: '2 days ago 20:10', amount: '€11.30', discount: '15%', status: 'completed' },
        ],
        month: [
            { id: 'BW-55555', customer: 'Tom H.', time: 'Jan 15, 16:30', amount: '€22.50', discount: '25%', status: 'completed' },
            { id: 'BW-66666', customer: 'Anna K.', time: 'Jan 14, 14:20', amount: '€8.90', discount: '12%', status: 'completed' },
        ],
    };

    const periods = [
        { id: 'today', label: 'Today', count: transactionData.today.length },
        { id: 'week', label: 'This Week', count: transactionData.week.length },
        { id: 'month', label: 'This Month', count: transactionData.month.length },
    ];

    const currentTransactions = transactionData[selectedPeriod] || [];
    const filteredTransactions = searchQuery
        ? currentTransactions.filter(
              (t) => t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : currentTransactions;

    const handleBack = () => {
        console.log('Navigate back to dashboard');
    };

    const handleExport = () => {
        console.log('Export transaction data');
    };

    const handleTransactionDetails = (transactionId) => {
        console.log('View transaction details:', transactionId);
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const getTotalAmount = () => {
        return filteredTransactions.reduce((sum, t) => {
            const amount = parseFloat(t.amount.replace('€', ''));
            return sum + amount;
        }, 0);
    };

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
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Transaction History</h1>
                    </div>
                </div>

                <div className="space-y-4 p-4">
                    {/* Search & Export */}
                    <div className="flex items-center space-x-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by customer or ID..."
                                className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-2 pl-10 ${getTextClass('primary')} placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                            />
                            <i className="fas fa-search absolute top-2.5 left-3 text-sm" style={{ color: customColor }}></i>
                        </div>
                        <button
                            onClick={handleExport}
                            className="rounded-xl border border-orange-400/30 bg-gray-900/60 p-2 transition-all hover:scale-105"
                        >
                            <i className="fas fa-download text-sm" style={{ color: customColor }}></i>
                        </button>
                    </div>

                    {/* Period Selector */}
                    <div className={`${getSurfaceBgClass()} rounded-lg p-1`}>
                        <div className="grid grid-cols-3 gap-1">
                            {periods.map((period) => (
                                <button
                                    key={period.id}
                                    onClick={() => setSelectedPeriod(period.id)}
                                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                                        selectedPeriod === period.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={selectedPeriod === period.id ? { backgroundColor: customColor } : {}}
                                >
                                    {period.label}
                                    <span className="block text-xs opacity-75">({period.count})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Total Transactions</p>
                                <p className="text-xl font-bold" style={{ color: customColor }}>
                                    {filteredTransactions.length}
                                </p>
                            </div>
                            <div>
                                <p className={`${getTextClass('tertiary')} mb-1 text-xs`}>Total Discounts Given</p>
                                <p className="text-xl font-bold" style={{ color: customColor }}>
                                    €{getTotalAmount().toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className={`${getTextClass('primary')} font-semibold`}>
                                {periods.find((p) => p.id === selectedPeriod)?.label} Transactions
                            </h3>
                            {searchQuery && <span className={`${getTextClass('tertiary')} text-xs`}>{filteredTransactions.length} results</span>}
                        </div>

                        {filteredTransactions.length > 0 ? (
                            <div className="max-h-96 space-y-3 overflow-y-auto">
                                {filteredTransactions.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-800/50 p-3 transition-all hover:bg-gray-800/70"
                                        onClick={() => handleTransactionDetails(transaction.id)}
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg"
                                                style={{ backgroundColor: `${customColor}20` }}
                                            >
                                                <i className="fas fa-qrcode text-sm" style={{ color: customColor }}></i>
                                            </div>
                                            <div>
                                                <p className={`${getTextClass('primary')} text-sm font-medium`}>{transaction.customer}</p>
                                                <p className={`${getTextClass('tertiary')} text-xs`}>
                                                    {transaction.id} • {transaction.time}
                                                </p>
                                                <div className="mt-1 flex items-center">
                                                    <span
                                                        className="rounded px-2 py-0.5 text-xs"
                                                        style={{ backgroundColor: `${customColor}20`, color: customColor }}
                                                    >
                                                        {transaction.discount} discount
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold" style={{ color: customColor }}>
                                                {transaction.amount}
                                            </p>
                                            <div className="mt-1 flex items-center">
                                                <div className="mr-1 h-2 w-2 rounded-full bg-green-400"></div>
                                                <span className={`${getTextClass('tertiary')} text-xs capitalize`}>{transaction.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <i className="fas fa-receipt mb-3 text-3xl text-gray-500"></i>
                                <h4 className={`${getTextClass('primary')} mb-2 font-medium`}>No Transactions Found</h4>
                                <p className={`${getTextClass('secondary')} text-sm`}>
                                    {searchQuery ? 'Try adjusting your search terms' : 'No transactions for this period yet'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105">
                            <i className="fas fa-chart-bar mr-2"></i>
                            Analytics
                        </button>
                        <button className="rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105">
                            <i className="fas fa-filter mr-2"></i>
                            Filters
                        </button>
                    </div>

                    {/* Business Insights */}
                    <div className={`${getSurfaceBgClass()} rounded-xl p-4`}>
                        <h4 className={`${getTextClass('primary')} mb-3 flex items-center font-semibold`}>
                            <i className="fas fa-lightbulb mr-2 text-sm" style={{ color: customColor }}></i>
                            Transaction Insights
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <i className="fas fa-clock mt-1 mr-2 text-xs" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Peak transaction time: 13:30 - 14:30</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-star mt-1 mr-2 text-xs text-yellow-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Average discount given: 14.5%</span>
                            </div>
                            <div className="flex items-start">
                                <i className="fas fa-users mt-1 mr-2 text-xs text-blue-400"></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Most frequent customer: John D. (3 visits)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistoryScreen;
