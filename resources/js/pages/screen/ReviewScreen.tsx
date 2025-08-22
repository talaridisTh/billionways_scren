import { useState } from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { useStyleHelpers } from '../hooks';

const ReviewScreen = () => {
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

    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    const handleSubmitReview = () => {
        if (rating === 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            console.log('Review submitted:', { rating, comment, store: storeData.name });
        }, 2000);
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
                        <button className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900/60 transition-all hover:scale-105">
                            <i className="fas fa-arrow-left text-gray-200"></i>
                        </button>
                        <h1 className={`${getTextClass('primary')} text-xl font-bold`}>Write Review</h1>
                    </div>
                </div>

                <div className="space-y-6 p-4">
                    {/* Store Info */}
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

                    {/* Rating Section */}
                    <div className={`${getCardBgClass()} rounded-xl p-6`} style={getShadowStyle('lg', 0.1)}>
                        <h3 className={`${getTextClass('primary')} mb-4 text-center font-semibold`}>Rate Your Experience</h3>

                        {/* Star Rating */}
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

                        {/* Rating Label */}
                        {(rating > 0 || hoverRating > 0) && (
                            <div className="mb-4 text-center">
                                <p className="text-lg font-semibold" style={{ color: customColor }}>
                                    {ratingLabels[hoverRating || rating]}
                                </p>
                            </div>
                        )}

                        {/* Quick Rating Buttons */}
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

                    {/* Comment Section */}
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

                    {/* Privacy Notice */}
                    <div className={`${getSurfaceBgClass()} rounded-lg p-3`}>
                        <div className="flex items-start">
                            <i className="fas fa-shield-alt mt-0.5 mr-2 text-xs" style={{ color: customColor }}></i>
                            <p className={`${getTextClass('tertiary')} text-xs`}>
                                Your review will be public and help other users. Your personal information remains private.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
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

                    {/* Skip Option */}
                    <div className="text-center">
                        <button className={`${getTextClass('tertiary')} text-sm hover:${getTextClass('secondary')} transition-all`}>
                            Skip for now
                        </button>
                    </div>
                </div>

                <BottomNavigation styleHelpers={styleHelpers} />
            </div>
        </div>
    );
};

export default ReviewScreen;
