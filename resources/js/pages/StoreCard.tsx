import React from 'react';
import { Store } from './data';
import { StyleHelpers } from './types';

interface StoreCardProps {
    store: Store;
    styleHelpers: StyleHelpers;
}

const hash = (s: string) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
};

const hsl = (s: string) => {
    const h = hash(s) % 360;
    const sat = 60 + (hash(s + 's') % 15);
    const light = 45 + (hash(s + 'l') % 10);
    return { h, sat, light };
};

const svgPlaceholder = (text: string, w: number, h: number) => {
    const c = hsl(text);
    const size = Math.floor(Math.min(w, h) * 0.22);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="hsl(${c.h},${c.sat}%,${c.light}%)"/><stop offset="100%" stop-color="hsl(${(c.h + 30) % 360},${c.sat}%,${c.light - 5}%)"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial" font-size="${size}" fill="#fff" font-weight="700">${text}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const StoreCard: React.FC<StoreCardProps> = ({ store, styleHelpers }) => {
    const { colors, background, layout, getCardBgClass, getTextClass } = styleHelpers;
    const imgH = layout === 'compact' ? 96 : 128;
    const chain = React.useMemo(() => {
        const alts = Array.isArray(store.alternatives) ? store.alternatives.filter(Boolean) : [];
        const last = svgPlaceholder(store.name, 800, imgH * 4);
        return [store.image, ...alts, last];
    }, [store.image, store.alternatives, store.name, imgH]);
    const [idx, setIdx] = React.useState(0);
    const src = chain[Math.min(idx, chain.length - 1)];

    return (
        <div className={`${getCardBgClass()} overflow-hidden rounded-2xl ${background === 'neon' ? 'shadow-xl shadow-purple-500/10' : 'shadow-lg'}`}>
            <div className="relative">
                <img
                    src={src}
                    alt={store.name}
                    className={`w-full ${layout === 'compact' ? 'h-24' : 'h-32'} object-cover`}
                    loading="lazy"
                    onError={() => setIdx((i) => (i < chain.length - 1 ? i + 1 : i))}
                />
                <div
                    className={`absolute top-3 left-3 ${background === 'neon' ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : colors.primary} rounded-lg px-2 py-1 text-xs text-white shadow-md`}
                >
                    <i className="fas fa-tag mr-1"></i>
                    {store.tag}
                </div>
                {store.hasCredit && (
                    <div
                        className={`absolute right-3 bottom-3 ${background === 'neon' ? 'border border-cyan-500/50 bg-black/80' : 'bg-gray-900/90'} rounded-lg px-2 py-1 text-xs text-white shadow-md backdrop-blur`}
                    >
                        Credit Card Available
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h4 className={`${getTextClass('primary')} font-medium`}>{store.name}</h4>
                    <button className={`${colors.primary} rounded-lg px-3 py-1.5 text-xs text-white`}>
                        <i className="fas fa-directions mr-1"></i>
                        Get Directions
                    </button>
                </div>
                <p className={`${getTextClass('tertiary')} mt-1 text-xs`}>{store.type}</p>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <i className={`fas fa-star ${colors.star} mr-1 text-xs`}></i>
                        <span className={`${getTextClass('secondary')} text-xs`}>
                            {store.rating} ({store.reviews})
                        </span>
                    </div>
                    <span className={`${getTextClass('tertiary')} mx-1 text-xs`}>•</span>
                    <span className={`${getTextClass('tertiary')} text-xs`}>{store.time}</span>
                    <span className={`${getTextClass('tertiary')} mx-1 text-xs`}>•</span>
                    <span className={`${getTextClass('tertiary')} text-xs`}>{store.distance}</span>
                    <span className={`${getTextClass('tertiary')} mx-1 text-xs`}>•</span>
                    <span className={`${getTextClass('secondary')} text-xs`}>Open until {store.openUntil}</span>
                </div>
            </div>
        </div>
    );
};
