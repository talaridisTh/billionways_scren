import { useState } from 'react';
import { useStyleHelpers } from '../hooks';

const BusinessVerificationScreen = () => {
    const [businessName, setBusinessName] = useState('');
    const [vatNumber, setVatNumber] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'uploading' | 'success' | 'error'>('pending');

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const acceptedFileTypes: Record<string, string[]> = {
        'application/pdf': ['.pdf'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp']
    };

    const maxFileSize = 5 * 1024 * 1024;
    const maxFiles = 3;

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const validFiles: File[] = [];
        const errors: string[] = [];

        Array.from(files).forEach(file => {
            if (selectedFiles.length + validFiles.length >= maxFiles) {
                errors.push(`Maximum ${maxFiles} files allowed`);
                return;
            }

            if (file.size > maxFileSize) {
                errors.push(`${file.name} is too large (max 5MB)`);
                return;
            }

            const isValidType = Object.keys(acceptedFileTypes).some(type => 
                file.type === type || acceptedFileTypes[type].some(ext => file.name.toLowerCase().endsWith(ext))
            );

            if (!isValidType) {
                errors.push(`${file.name} is not a supported file type`);
                return;
            }

            validFiles.push(file);
        });

        if (errors.length > 0) {
            console.log('File errors:', errors);
        }

        setSelectedFiles(prev => [...prev, ...validFiles]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!businessName.trim() || !vatNumber.trim() || selectedFiles.length === 0) {
            return;
        }

        setIsUploading(true);
        setVerificationStatus('uploading');
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setVerificationStatus('success');
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleBack = () => {
        console.log('Navigate back to shop owner login');
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    const getFileIcon = (file: File) => {
        if (file.type.includes('pdf')) return 'fas fa-file-pdf';
        if (file.type.includes('image')) return 'fas fa-file-image';
        return 'fas fa-file';
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (verificationStatus === 'success') {
        return (
            <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
                {renderBackgroundEffects()}
                <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                    <div className="flex min-h-screen flex-col justify-center p-6">
                        <div className="text-center">
                            <div
                                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/30 bg-green-900/30"
                                style={getShadowStyle('lg', 0.3)}
                            >
                                <i className="fas fa-check text-3xl text-green-400"></i>
                            </div>
                            <h2 className="mb-4 text-2xl font-bold" style={{ color: customColor }}>
                                Verification Submitted
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-gray-200">
                                Your business verification documents have been successfully uploaded. We'll review them within 24-48 hours and notify you via email.
                            </p>
                            <div className={`${getCardBgClass()} mb-6 rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                                <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>Next Steps</h3>
                                <div className="space-y-2 text-left">
                                    <div className="flex items-start">
                                        <i className="fas fa-clock mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                                        <span className={`${getTextClass('secondary')} text-sm`}>Review process: 24-48 hours</span>
                                    </div>
                                    <div className="flex items-start">
                                        <i className="fas fa-envelope mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                                        <span className={`${getTextClass('secondary')} text-sm`}>Email notification upon approval</span>
                                    </div>
                                    <div className="flex items-start">
                                        <i className="fas fa-key mt-1 mr-3 text-sm" style={{ color: customColor }}></i>
                                        <span className={`${getTextClass('secondary')} text-sm`}>Access to dashboard after verification</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleBack}
                                className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105`}
                                style={{
                                    backgroundColor: customColor,
                                    ...getShadowStyle('lg', 0.4),
                                }}
                            >
                                <i className="fas fa-arrow-left mr-2"></i>
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm shadow-lg">
                <div className="flex min-h-screen flex-col justify-center p-6">
                    <div className="mb-4">
                        <button
                            onClick={handleBack}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105"
                        >
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                    </div>

                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-orange-400/30 bg-gray-900/80"
                            style={getShadowStyle('lg', 0.3)}
                        >
                            <i className="fas fa-shield-alt text-2xl" style={{ color: customColor }}></i>
                        </div>

                        <h2 className="mb-4 text-2xl font-bold" style={{ color: customColor }}>
                            Business Verification
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-200">
                            Upload your business documents to verify your company and access the shop owner dashboard
                        </p>
                    </div>

                    <div className={`${getCardBgClass()} mb-6 rounded-2xl p-6`} style={getShadowStyle('xl', 0.2)}>
                        <div className="space-y-4">
                            <div>
                                <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>Business Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="Enter your business name"
                                        className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} pl-12 placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                    />
                                    <i className="fas fa-store absolute top-3.5 left-4 text-sm" style={{ color: customColor }}></i>
                                </div>
                            </div>

                            <div>
                                <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>VAT Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={vatNumber}
                                        onChange={(e) => setVatNumber(e.target.value)}
                                        placeholder="Enter your VAT number"
                                        className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} pl-12 placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                                    />
                                    <i className="fas fa-hashtag absolute top-3.5 left-4 text-sm" style={{ color: customColor }}></i>
                                </div>
                            </div>

                            <div>
                                <label className={`${getTextClass('secondary')} mb-2 block text-sm`}>
                                    Business Documents
                                    <span className={`${getTextClass('tertiary')} ml-1 text-xs`}>(Max 3 files, 5MB each)</span>
                                </label>
                                
                                <div
                                    className={`relative rounded-xl border-2 border-dashed transition-all ${
                                        dragOver 
                                            ? 'border-orange-400 bg-orange-400/10' 
                                            : 'border-gray-600 bg-gray-700/50'
                                    } p-6 text-center`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                                        onChange={(e) => handleFileSelect(e.target.files)}
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                    <i className="fas fa-cloud-upload-alt mb-3 text-3xl" style={{ color: customColor }}></i>
                                    <p className={`${getTextClass('primary')} mb-2 font-medium`}>
                                        Drop files here or click to browse
                                    </p>
                                    <p className={`${getTextClass('tertiary')} text-xs`}>
                                        PDF, JPG, PNG, WEBP up to 5MB
                                    </p>
                                </div>

                                {selectedFiles.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                                                <div className="flex items-center">
                                                    <i className={`${getFileIcon(file)} mr-3 text-lg`} style={{ color: customColor }}></i>
                                                    <div>
                                                        <p className={`${getTextClass('primary')} text-sm font-medium`}>
                                                            {file.name}
                                                        </p>
                                                        <p className={`${getTextClass('tertiary')} text-xs`}>
                                                            {formatFileSize(file.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(index)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-900/30 text-red-400 transition-all hover:bg-red-900/50"
                                                >
                                                    <i className="fas fa-times text-sm"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {isUploading && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`${getTextClass('secondary')} text-sm`}>Uploading...</span>
                                        <span className={`${getTextClass('secondary')} text-sm`}>{uploadProgress}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                                        <div
                                            className="h-full transition-all duration-300"
                                            style={{
                                                backgroundColor: customColor,
                                                width: `${uploadProgress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={!businessName.trim() || !vatNumber.trim() || selectedFiles.length === 0 || isUploading}
                                className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                                    businessName.trim() && vatNumber.trim() && selectedFiles.length > 0 && !isUploading 
                                        ? 'hover:scale-105' 
                                        : 'opacity-50'
                                }`}
                                style={{
                                    backgroundColor: customColor,
                                    ...getShadowStyle('lg', 0.4),
                                }}
                            >
                                {isUploading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Uploading Documents...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-shield-check mr-2"></i>
                                        Submit for Verification
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={`${getSurfaceBgClass()} mb-6 rounded-xl p-4`}>
                        <h3 className={`${getTextClass('primary')} mb-3 text-center font-semibold`}>Required Documents</h3>
                        <div className="space-y-2 text-center">
                            <div className="flex items-center justify-center">
                                <i className="fas fa-file-alt mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Business Registration Certificate</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <i className="fas fa-receipt mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>VAT Registration Document</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <i className="fas fa-id-card mr-2 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-xs`}>Business Owner ID (Optional)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessVerificationScreen;
