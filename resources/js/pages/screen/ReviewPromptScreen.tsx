import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const ReviewPromptScreen = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const styleHelpers = useStyleHelpers();
    const { getBackgroundClass, getCardBgClass, getSurfaceBgClass, getTextClass, customColor, getShadowStyle } = styleHelpers;

    const storeData = {
        name: 'Taverna Mykonos',
        category: 'Greek Cuisine',
        savings: 7.5,
    };

    const ratingLabels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
    };

    const handleReviewNow = () => {
        setShowReviewForm(true);
    };

    const handleSkipReview = () => {
        console.log('Skip review, return to home');
    };

    const handleBackToPrompt = () => {
        setShowReviewForm(false);
        setRating(0);
        setHoverRating(0);
        setComment('');
    };

    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    const handleSubmitReview = () => {
        if (rating === 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            console.log('Review submitted:', { rating, comment, store: storeData.name });
            setShowReviewForm(false);
        }, 2000);
    };

    const renderBackgroundEffects = () => {
        return (
            <>
                <div className="absolute inset-0 bg-black"></div>
            </>
        );
    };

    if (showReviewForm) {
        return (
            <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
                {renderBackgroundEffects()}

                <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                    <div className="px-5 pt-4">
                        <div className="mb-4 flex items-center">
                            <button
                                onClick={handleBackToPrompt}
                                className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105"
                            >
                                <i className="fas fa-arrow-left text-gray-200"></i>
                            </button>
                            <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Write Review</h1>
                        </div>
                    </div>

                    <div className="space-y-6 p-4">
                        <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                            <div className="mb-3 flex items-center">
                                <div
                                    className="mr-3 flex h-12 w-12 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: `${customColor}20` }}
                                >
                                    <i className="fas fa-store text-lg" style={{ color: customColor }}></i>
                                </div>
                                <div>
                                    <h3 className={`${getTextClass('primary')} font-semibold`}>{storeData.name}</h3>
                                    <p className={`${getTextClass('secondary')} text-sm`}>{storeData.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className={`${getTextClass('secondary')}`}>Your savings:</span>
                                <span className="font-semibold" style={{ color: customColor }}>
                                    €{storeData.savings.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className={`${getCardBgClass()} rounded-xl p-6`} style={getShadowStyle('lg', 0.1)}>
                            <h3 className={`${getTextClass('primary')} mb-4 text-center font-semibold`}>Rate Your Experience</h3>

                            <div className="mb-4 flex justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="mx-1 p-2 transition-all hover:scale-110"
                                    >
                                        <i
                                            className={`text-3xl ${star <= (hoverRating || rating) ? 'fas fa-star' : 'far fa-star'}`}
                                            style={{
                                                color: star <= (hoverRating || rating) ? customColor : '#6B7280',
                                            }}
                                        ></i>
                                    </button>
                                ))}
                            </div>

                            {(rating > 0 || hoverRating > 0) && (
                                <div className="mb-4 text-center">
                                    <p className="text-lg font-semibold" style={{ color: customColor }}>
                                        {ratingLabels[hoverRating || rating]}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { rating: 5, icon: 'fa-heart', label: 'Love it!' },
                                    { rating: 4, icon: 'fa-thumbs-up', label: 'Good!' },
                                    { rating: 3, icon: 'fa-meh', label: 'Okay' },
                                ].map((option) => (
                                    <button
                                        key={option.rating}
                                        onClick={() => setRating(option.rating)}
                                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-all hover:scale-105 ${
                                            rating === option.rating ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                        style={rating === option.rating ? { backgroundColor: customColor } : { backgroundColor: '#374151' }}
                                    >
                                        <i className={`fas ${option.icon} mr-1`}></i>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`${getCardBgClass()} rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                            <h3 className={`${getTextClass('primary')} mb-3 font-semibold`}>
                                Share Your Experience <span className={`${getTextClass('tertiary')} text-sm font-normal`}>(Optional)</span>
                            </h3>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell others what made your experience special..."
                                maxLength={500}
                                rows={4}
                                className={`w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 ${getTextClass('primary')} resize-none placeholder-gray-400 focus:border-orange-400 focus:outline-none`}
                            />

                            <div className="mt-2 flex items-center justify-between">
                                <div className="flex space-x-2">
                                    {['Great food!', 'Fast service', 'Good value'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => setComment(comment + (comment ? ' ' : '') + suggestion)}
                                            className="rounded px-2 py-1 text-xs transition-all hover:scale-105"
                                            style={{ backgroundColor: `${customColor}20`, color: customColor }}
                                        >
                                            + {suggestion}
                                        </button>
                                    ))}
                                </div>
                                <span className={`${getTextClass('tertiary')} text-xs`}>{comment.length}/500</span>
                            </div>
                        </div>

                        <div className={`${getSurfaceBgClass()} rounded-lg p-3`}>
                            <div className="flex items-start">
                                <i className="fas fa-shield-alt mt-0.5 mr-2 text-xs" style={{ color: customColor }}></i>
                                <p className={`${getTextClass('tertiary')} text-xs`}>
                                    Your review will be public and help other users. Your personal information remains private.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            disabled={rating === 0 || isSubmitting}
                            className={`w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${
                                rating > 0 && !isSubmitting ? 'hover:scale-105' : 'opacity-50'
                            }`}
                            style={{
                                backgroundColor: customColor,
                                ...getShadowStyle('lg', 0.4),
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Submitting Review...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane mr-2"></i>
                                    Submit Review
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                onClick={handleBackToPrompt}
                                className={`${getTextClass('tertiary')} text-sm hover:${getTextClass('secondary')} transition-all`}
                            >
                                Skip for now
                            </button>
                        </div>
                    </div>

                    <BottomNavigation styleHelpers={styleHelpers} />
                </div>
            </div>
        );
    }

    return (
        <div className={`${getBackgroundClass()} min-h-screen font-sans ${getTextClass('primary')} relative`}>
            {renderBackgroundEffects()}

            <div className="relative mx-auto min-h-screen max-w-sm pb-20 shadow-lg">
                <div className="px-5 pt-4">
                    <div className="mb-4 flex items-center">
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Transaction Complete</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-6 flex h-16 w-16 animate-bounce items-center justify-center rounded-full"
                            style={{ backgroundColor: `${customColor}20`, border: `3px solid ${customColor}` }}
                        >
                            <i className="fas fa-check text-4xl" style={{ color: customColor }}></i>
                        </div>

                        <h2 className={`${getTextClass('primary')} mb-2 text-2xl font-bold`}>Success!</h2>
                        <p className={`${getTextClass('secondary')} mb-2 text-lg`}>
                            You saved{' '}
                            <span className="font-bold" style={{ color: customColor }}>
                                €{storeData.savings.toFixed(2)}
                            </span>
                        </p>
                        <p className={`${getTextClass('tertiary')} text-sm`}>at {storeData.name}</p>
                    </div>

                    <div className={`${getCardBgClass()} mb-6 w-full max-w-sm rounded-2xl p-6`} style={getShadowStyle('xl', 0.2)}>
                        <div className="mb-6 text-center">
                            <div className="mb-4 flex justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i key={star} className="fas fa-star mx-1 text-2xl" style={{ color: customColor }}></i>
                                ))}
                            </div>

                            <h3 className={`${getTextClass('primary')} mb-3 text-lg font-semibold`}>How was your experience?</h3>
                            <p className={`${getTextClass('secondary')} text-sm leading-relaxed`}>
                                Your feedback helps us improve our service and helps other users discover great places to save money.
                            </p>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div className="flex items-center">
                                <i className="fas fa-heart mr-3 text-sm text-red-400"></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Help other users find great deals</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-thumbs-up mr-3 text-sm text-blue-400"></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Support local businesses</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-gift mr-3 text-sm" style={{ color: customColor }}></i>
                                <span className={`${getTextClass('secondary')} text-sm`}>Earn bonus rewards points</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleReviewNow}
                                className="w-full rounded-xl px-4 py-3 text-base font-semibold text-white transition-all hover:scale-105"
                                style={{
                                    backgroundColor: customColor,
                                    ...getShadowStyle('lg', 0.4),
                                }}
                            >
                                <i className="fas fa-star mr-2"></i>
                                Review Now
                            </button>

                            <button
                                onClick={handleSkipReview}
                                className="w-full rounded-xl border border-orange-400/30 bg-gray-900/60 px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:scale-105"
                            >
                                No Thanks, Maybe Later
                            </button>
                        </div>
                    </div>

                    <div className={`${getCardBgClass()} w-full max-w-sm rounded-xl p-4`} style={getShadowStyle('lg', 0.1)}>
                        <h4 className={`${getTextClass('primary')} mb-3 text-center font-semibold`}>Your Impact Today</h4>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold" style={{ color: customColor }}>
                                    €{storeData.savings.toFixed(2)}
                                </p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>Saved Today</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: customColor }}>
                                    1
                                </p>
                                <p className={`${getTextClass('tertiary')} text-xs`}>Transaction</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className={`${getTextClass('tertiary')} text-xs`}>You can always review your transactions later in the Bills section</p>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default ReviewPromptScreen
