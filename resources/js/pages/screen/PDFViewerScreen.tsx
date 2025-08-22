import React, { useState } from 'react';
import { useStyleHelpers } from '../hooks';

interface PDFViewerScreenProps {
    onBack: () => void;
    pdfTitle?: string;
    pdfUrl?: string;
    pdfPath?: string;
}

const PDFViewerScreen: React.FC<PDFViewerScreenProps> = ({
    onBack,
    pdfTitle = 'Menu',
    pdfUrl,
    pdfPath = '/MENU-KARVOUNIARIS.pdf'
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const handleDownload = () => {
        console.log('Download PDF file');
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfTitle.replace(/\s+/g, '-').toLowerCase() + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
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
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={onBack}
                                className={`mr-3 rounded-full p-2 ${getSurfaceBgClass()} hover:bg-gray-700`}
                            >
                                <i className="fas fa-arrow-left text-sm"></i>
                            </button>
                            <h1 className={`${getTextClass('primary')} text-xl font-bold`}>{pdfTitle}</h1>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="p-4">
                    <div
                        className={`${getCardBgClass()} mb-4 rounded-xl p-4`}
                        style={getShadowStyle('lg', 0.1)}
                    >
                        <div className="flex items-center justify-center">
                            <i className="fas fa-file-pdf mr-2 text-2xl" style={{ color: customColor }}></i>
                            <h2 className={`${getTextClass('primary')} text-lg font-bold`}>
                                {pdfTitle}
                            </h2>
                        </div>
                    </div>

                    {/* PDF Viewer Container */}
                    <div
                        className={`${getSurfaceBgClass()} relative rounded-xl border border-gray-700`}
                        style={{
                            ...getShadowStyle('lg', 0.1),
                            height: '500px',
                            overflow: 'hidden'
                        }}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                                <div className="flex flex-col items-center">
                                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${customColor}40`, borderTopColor: 'transparent' }}></div>
                                    <p className={`${getTextClass('secondary')} mt-3`}>Loading PDF...</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            src={pdfPath}
                            className="h-full w-full rounded-xl"
                            onLoad={handleIframeLoad}
                            title={pdfTitle}
                        />
                    </div>

                    {/* Zoom Controls */}
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={handleDownload}
                            className={`flex items-center rounded-lg px-4 py-2 ${getTextClass('primary')}`}
                            style={{ backgroundColor: customColor }}
                        >
                            <i className="fas fa-download mr-2"></i>
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFViewerScreen;
