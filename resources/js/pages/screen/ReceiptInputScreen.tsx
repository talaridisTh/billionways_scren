import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

interface Product {
    id: string;
    name: string;
    price: string;
    quantity: string;
}

const ReceiptInputScreen = () => {
    const [inputMethod, setInputMethod] = useState('manual');
    const [receiptAmount, setReceiptAmount] = useState('');
    const [receiptDateTime, setReceiptDateTime] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
    });

    // Product repeater state
    const [products, setProducts] = useState<Product[]>([
        { id: uuidv4(), name: '', price: '', quantity: '1' }
    ]);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const discountInfo = {
        percentage: 15,
        storeName: 'Taverna Mykonos',
    };

    const handleAddProduct = () => {
        setProducts([...products, { id: uuidv4(), name: '', price: '', quantity: '1' }]);
    };

    const handleRemoveProduct = (id: string) => {
        if (products.length > 1) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleProductChange = (id: string, field: keyof Product, value: string) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ));

        // Auto-calculate total amount
        const total = products.reduce((sum, product) => {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.quantity) || 0;
            return sum + (price * quantity);
        }, 0);

        setReceiptAmount(total.toFixed(2));
    };

    const handleCalculateEarnings = () => {
        if (receiptAmount) {
            console.log('Calculate earnings with amount:', receiptAmount);
            console.log('Products:', products);
        }
    };

    const handleScanReceipt = () => {
        console.log('Open camera for OCR scanning');
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

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                {/* Header */}
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Add Receipt</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Success Message */}
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: `${customColor}20`, border: `1px solid ${customColor}40` }}>
                        <div className="mb-2 flex items-center justify-center">
                            <i className="fas fa-check-circle mr-2 text-2xl" style={{ color: customColor }}></i>
                            <h2 className={`${getTextClass('primary')} text-lg font-bold`}>Discount Applied!</h2>
                        </div>
                        <p className={`${getTextClass('secondary')} text-sm`}>
                            {discountInfo.percentage}% discount at {discountInfo.storeName}
                        </p>
                    </div>

                    {/* Input Method Selector */}
                    <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>How would you like to add your receipt?</h3>

                        <div className={`${getSurfaceBgClass()} mb-4 rounded-lg p-1`}>
                            <div className="grid grid-cols-2 gap-1">
                                <button
                                    onClick={() => setInputMethod('scan')}
                                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                        inputMethod === 'scan' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={inputMethod === 'scan' ? { backgroundColor: customColor } : {}}
                                >
                                    <i className="fas fa-camera mr-2"></i>
                                    Scan
                                </button>
                                <button
                                    onClick={() => setInputMethod('manual')}
                                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                        inputMethod === 'manual' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    style={inputMethod === 'manual' ? { backgroundColor: customColor } : {}}
                                >
                                    <i className="fas fa-keyboard mr-2"></i>
                                    Manual
                                </button>
                            </div>
                        </div>

                        {/* Scan Method */}
                        {inputMethod === 'scan' && (
                            <div className="space-y-4">
                                <div className="rounded-xl border-2 border-dashed border-gray-600 p-8 text-center">
                                    <i className="fas fa-receipt mb-4 text-4xl text-gray-500"></i>
                                    <p className={`${getTextClass('secondary')} mb-4 text-sm`}>Scan your receipt with camera</p>
                                    <button
                                        onClick={handleScanReceipt}
                                        className="rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                                        style={{ backgroundColor: customColor, ...getShadowStyle('lg', 0.4) }}
                                    >
                                        <i className="fas fa-camera mr-2"></i>
                                        Scan Receipt (OCR)
                                    </button>
                                </div>
                                <div className="flex items-center text-center">
                                    <div className="h-px flex-1 bg-gray-600"></div>
                                    <span className={`${getTextClass('tertiary')} px-3 text-xs`}>or enter manually</span>
                                    <div className="h-px flex-1 bg-gray-600"></div>
                                </div>
                            </div>
                        )}

                        {/* Manual Method */}
                        {inputMethod === 'manual' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="receiptDateTime" className={`${getTextClass('secondary')} mb-1 block text-sm`}>
                                        Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="receiptDateTime"
                                        value={receiptDateTime}
                                        onChange={(e) => setReceiptDateTime(e.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                                    />
                                </div>

                                {/* Products Repeater */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className={`${getTextClass('secondary')} text-sm font-medium`}>Products</label>
                                        <button
                                            type="button"
                                            onClick={handleAddProduct}
                                            className="flex items-center rounded-lg bg-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-plus mr-1"></i> Add Product
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {products.map((product) => (
                                            <div key={product.id} className="rounded-lg border border-gray-600 p-3">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className={`${getTextClass('secondary')} text-xs`}>Product Item</span>
                                                    {products.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveProduct(product.id)}
                                                            className="rounded-full bg-gray-700 p-1 text-xs text-gray-400 hover:text-red-400"
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="mb-2">
                                                    <input
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                                                        className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-orange-400 focus:outline-none"
                                                        placeholder="Product name"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <div className="relative">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <span className="text-gray-400">€</span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                value={product.price}
                                                                onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 pl-8 pr-3 py-2 text-sm text-white focus:border-orange-400 focus:outline-none"
                                                                placeholder="0.00"
                                                                step="0.01"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                value={product.quantity}
                                                                onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-orange-400 focus:outline-none"
                                                                placeholder="Qty"
                                                                min="1"
                                                            />
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                <span className="text-gray-400">qty</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="receiptAmount" className={`${getTextClass('secondary')} mb-1 block text-sm font-medium`}>
                                         Amount (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="receiptAmount"
                                        value={receiptAmount}
                                        onChange={(e) => setReceiptAmount(e.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        )}</div>

                    {/* Receipt Preview */}
                    {receiptAmount && (
                        <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                            <h4 className={`${getTextClass('primary')} mb-3 font-semibold`}>Receipt Preview</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className={`${getTextClass('secondary')} text-sm`}>Store:</span>
                                    <span className={`${getTextClass('primary')} text-sm font-medium`}>{discountInfo.storeName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={`${getTextClass('secondary')} text-sm`}>Amount:</span>
                                    <span className={`${getTextClass('primary')} text-sm font-medium`}>€{receiptAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={`${getTextClass('secondary')} text-sm`}>Date & Time:</span>
                                    <span className={`${getTextClass('primary')} text-sm font-medium`}>
                                        {receiptDateTime.replace('T', ' ')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={`${getTextClass('secondary')} text-sm`}>Discount:</span>
                                    <span className="text-sm font-medium text-green-500" >
                                        {discountInfo.percentage}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculateEarnings}
                        disabled={!receiptAmount}
                        className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                            receiptAmount ? 'hover:scale-105' : 'opacity-50'
                        }`}
                        style={{
                            backgroundColor: customColor,
                            ...getShadowStyle('lg', 0.4),
                        }}
                    >
                        <i className="fas fa-calculator mr-2"></i>
                        Calculate Earnings
                    </button>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default ReceiptInputScreen;
